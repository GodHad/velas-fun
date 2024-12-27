'use client'
import { useState, useEffect } from 'react';
import { createFAQ, deleteFAQ, getFAQs, updateFAQ } from '@/utils/api';
import { errorAlert, successAlert } from '@/components/ToastGroup';

interface FAQProps {
    _id: string | null;
    question: string;
    answer: string;
}

const FAQSetting = () => {
    const [faqs, setFaqs] = useState<FAQProps[]>([]);
    const [formData, setFormData] = useState<FAQProps>({ _id: null, question: '', answer: '' });

    const fetchFaqs = async () => {
        const data = await getFAQs();
        setFaqs(data);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            if (formData._id) {
                await updateFAQ(formData);
                successAlert('Update FAQ Successfully')
            } else {
                await createFAQ(formData);
                successAlert('Create FAQ Successfully')
            }
            setFormData({ _id: null, question: '', answer: '' });
            fetchFaqs();
        } catch {
            if (formData._id) errorAlert('Failed to update FAQ');
            else errorAlert('Failed to create FAQ');
        }
    };

    const handleEdit = (faq: FAQProps) => {
        setFormData(faq);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteFAQ(id)
            fetchFaqs();
            successAlert('Delete FAQ Successfully');
        } catch {
            errorAlert('Failed to delete FAQ');
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    return (
        <div className="mx-auto my-2">
            <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            FAQ
                        </h3>
                    </div>
                    <div className="p-7">
                        <div className='space-y-4'>
                            <form onSubmit={handleSubmit} className='space-y-2'>
                                <div className="mb-5.5">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="question"
                                    >
                                        Question
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        id="question"
                                        value={formData.question}
                                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-5 5">
                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="answer"
                                        >
                                            Answer
                                        </label>
                                        <textarea
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            id="answer"
                                            rows={6}
                                            placeholder="Velas Fun bla bla bla"
                                            value={formData.answer}
                                            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <button
                                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </form>
                            <div className='mt-4'>
                                {faqs.map((faq) => (
                                    <div key={faq._id} className='border-b py-2 flex justify-between'>
                                        <div>
                                            <h4 className='font-bold'>{faq.question}</h4>
                                            <p className='text-gray-600'>{faq.answer}</p>
                                        </div>
                                        <div className='flex gap-2'>
                                            <button className="rounded-lg w-8 h-8 flex justify-center items-center transition-transform duration-300 ease-in-out transform group-hover:scale-110" onClick={() => handleEdit(faq)}>
                                                <svg className="fill-primary" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8" clipPath="url(#clip0_88_10224)"><path fillRule="evenodd" clipRule="evenodd" d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z" fill=""></path><path fillRule="evenodd" clipRule="evenodd" d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z" fill=""></path></g><defs><clipPath id="clip0_88_10224"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg>
                                            </button>
                                            <button className="rounded-lg w-8 h-8 flex justify-center items-center transition-transform duration-300 ease-in-out transform group-hover:scale-110" onClick={() => {
                                                if (faq._id) handleDelete(faq._id)
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M2.02637 4H14.3689" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.65527 7.19971V11.9996" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.7373 7.19971V11.9996" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.79785 4L3.56926 13.5997C3.56926 14.024 3.7318 14.431 4.02114 14.731C4.31047 15.0311 4.70289 15.1997 5.11207 15.1997H11.2833C11.6925 15.1997 12.0849 15.0311 12.3743 14.731C12.6636 14.431 12.8261 14.024 12.8261 13.5997L13.5975 4" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.02246 3.99971V1.59978C6.02246 1.38761 6.10373 1.18414 6.2484 1.03411C6.39307 0.884088 6.58928 0.799805 6.79387 0.799805H9.8795C10.0841 0.799805 10.2803 0.884088 10.425 1.03411C10.5696 1.18414 10.6509 1.38761 10.6509 1.59978V3.99971" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQSetting;
