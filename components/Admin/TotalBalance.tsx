'use client'
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useMutation } from "react-query";
import { getTotalBalanceAndToken } from '@/utils/api';
import moment from 'moment';

const options: ApexOptions = {
    legend: {
        show: false,
        position: 'top',
        horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        height: 335,
        type: 'area',
        dropShadow: {
            enabled: true,
            color: '#623CEA14',
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
        width: [2, 2],
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
        strokeColors: ['#3056D3', '#80CAEE'],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
            size: undefined,
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
                if (Number.isInteger(value)) {
                    return value.toFixed(0);
                }
                return value.toFixed(2);
            }
        },
        min: 0,
    },
};

interface TotalBalanceState {
    series: {
        name: string;
        data: number[];
    }[];
}

const TotalBalance: React.FC = () => {
    const [option, setOption] = useState<string>('day');
    const [categories, setCategories] = useState<string[]>([]);
    const [state, setState] = useState<TotalBalanceState>({
        series: [
            {
                name: 'Total Coins',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
            },

            {
                name: 'Total Balance',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
            },
        ],
    });
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const getBalanceAndTokenMutation = useMutation(getTotalBalanceAndToken, {
        onSuccess: (data) => {
            setState({
                series: [
                    {
                        name: 'Total Coins',
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        data: data.map((_: any) => _.createdTokens)
                    },
                    {
                        name: 'Total Balance',
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        data: data.map((_: any) => parseFloat(_.balance.toFixed(2)))
                    }
                ]
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            console.log(data.map((_: any) => parseFloat(_.balance.toFixed(2))), data.map((_: any) => _.createdTokens))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setCategories(data.map((_: any) =>
                option === 'day' ? moment(_.time).format('HH') :
                    option === 'week' ? moment(_.time).format('ddd') :
                        moment(_.time).format('MM-DD')
            ));

            handleReset();
        }
    })

    const handleReset = () => {
        setState((prevState) => ({
            ...prevState,
        }));
    };

    useEffect(() => {
        handleReset();
        getBalanceAndTokenMutation.mutate(option);

        const currentDate = moment();
        if (option === 'day') {
            setStartDate(currentDate.startOf('day').format('MM.DD HH:mm:ss'))
            setEndDate(currentDate.endOf('day').format('MM.DD HH:mm:ss'))
        } else if (option === 'week') {
            setStartDate(currentDate.clone().startOf('week').format('MM.DD'))
            setEndDate(currentDate.clone().endOf('week').format('MM.DD'))
        } else if (option === 'month') {
            setStartDate(currentDate.clone().startOf('month').format('MM.DD'))
            setEndDate(currentDate.clone().endOf('month').format('MM.DD'))
        }
    }, [option])

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                    <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-primary">Total Coins</p>
                            <p className="text-sm font-medium">{startDate} - {endDate}</p>
                        </div>
                    </div>
                    <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-secondary">Total Balance</p>
                            <p className="text-sm font-medium">{startDate} - {endDate}</p>
                        </div>
                    </div>
                </div>
                <div className="flex w-full max-w-45 justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
                        <button
                            className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${option === 'day' ? 'bg-white shadow-card dark:bg-boxdark' : ''}`}
                            onClick={() => setOption('day')}
                        >
                            Day
                        </button>
                        <button
                            className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdar ${option === 'week' ? 'bg-white shadow-card dark:bg-boxdark' : ''}`}
                            onClick={() => setOption('week')}
                        >
                            Week
                        </button>
                        <button
                            className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdar ${option === 'month' ? 'bg-white shadow-card dark:bg-boxdark' : ''}`}
                            onClick={() => setOption('month')}
                        >
                            Month
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div id="TotalBalance" className="-ml-5">
                    <ReactApexChart
                        options={{
                            ...options,
                            xaxis: {
                                ...options.xaxis,
                                categories: categories
                            }
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

export default TotalBalance;
