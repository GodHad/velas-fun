'use client';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useMutation } from 'react-query';
import { getProfitData } from '@/utils/api'; // Assume an API function that fetches profit data
import moment from 'moment';

const options: ApexOptions = {
    legend: {
        show: false,
        position: 'top',
        horizontalAlign: 'left',
    },
    colors: ['#28A745'], // Use green for profit
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        height: 335,
        type: 'area',
        dropShadow: {
            enabled: true,
            color: '#28A74533',
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
        },
        toolbar: {
            show: false,
        },
    },
    responsive: [
        {
            breakpoint: 1024,
            options: {
                chart: {
                    height: 300,
                },
            },
        },
        {
            breakpoint: 1366,
            options: {
                chart: {
                    height: 350,
                },
            },
        },
    ],
    stroke: {
        width: [2],
        curve: 'straight',
    },
    grid: {
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 4,
        colors: '#fff',
        strokeColors: ['#28A745'],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        hover: {
            sizeOffset: 5,
        },
    },
    xaxis: {
        type: 'category',
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        title: {
            style: {
                fontSize: '0px',
            },
        },
        labels: {
            formatter: function (value) {
                return value.toFixed(6);
            },
        },
        min: 0,
    },
};

interface ProfitState {
    series: {
        name: string;
        data: number[];
    }[];
}

const ProfitChart: React.FC = () => {
    const [option, setOption] = useState<string>('day');
    const [categories, setCategories] = useState<string[]>([]);
    const [state, setState] = useState<ProfitState>({
        series: [
            {
                name: 'Profit',
                data: [],
            },
        ],
    });
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const getProfitMutation = useMutation(getProfitData, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
            setState({
                series: [
                    {
                        name: 'Profit',
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        data: data.map((_: any) => parseFloat(_.profit.toFixed(6))),
                    },
                ],
            });
            setCategories(
                data.map((item: { time: string; profit: number }) => item.time) 
            );
        },
    });

    useEffect(() => {
        const currentDate = moment();
        if (option === 'day') {
            setStartDate(currentDate.startOf('day').format('MM.DD HH:mm:ss'));
            setEndDate(currentDate.endOf('day').format('MM.DD HH:mm:ss'));
        } else if (option === 'week') {
            setStartDate(currentDate.clone().startOf('week').format('MM.DD'));
            setEndDate(currentDate.clone().endOf('week').format('MM.DD'));
        } else if (option === 'month') {
            setStartDate(currentDate.clone().startOf('month').format('MM.DD'));
            setEndDate(currentDate.clone().endOf('month').format('MM.DD'));
        }

        getProfitMutation.mutate(option);
    }, [option]);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 mt-4">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                    <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-green-500">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-green-500"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-green-500">Profit</p>
                            <p className="text-sm font-medium">
                                {startDate} - {endDate}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex w-full max-w-45 justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
                        <button
                            className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                                option === 'day' ? 'bg-white shadow-card dark:bg-boxdark' : ''
                            }`}
                            onClick={() => setOption('day')}
                        >
                            Day
                        </button>
                        <button
                            className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                                option === 'week' ? 'bg-white shadow-card dark:bg-boxdark' : ''
                            }`}
                            onClick={() => setOption('week')}
                        >
                            Week
                        </button>
                        <button
                            className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                                option === 'month' ? 'bg-white shadow-card dark:bg-boxdark' : ''
                            }`}
                            onClick={() => setOption('month')}
                        >
                            Month
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div id="ProfitChart" className="-ml-5">
                    <ReactApexChart
                        options={{
                            ...options,
                            xaxis: {
                                ...options.xaxis,
                                categories: categories,
                            },
                        }}
                        series={state.series}
                        type="area"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfitChart;
