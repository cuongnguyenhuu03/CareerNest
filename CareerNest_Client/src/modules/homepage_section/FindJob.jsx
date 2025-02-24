import { Button } from 'flowbite-react';
import React from 'react';

const FindJob = () => {
    return (
        <div className={`w-full h-[500px] bg-slider-bg bg-cover bg-no-repeat bg-bottom mb-6 md:mb-16`}>
            <div className='w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-60'>
                <div className='mx-16 text-white text-center'>
                    <div className='mt-12 sm:mt-0 font-medium text-2xl sm:text-4xl mb-6'>Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.</div>
                    <div className='font-medium text-sm sm:text-lg lg:text-base mb-8'>Tiếp cận 40,000+ tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam</div>
                    <div className='hidden sm:flex gap-x-4 lg:gap-x-8'>
                        <div className="basis-2/4">
                            <input type="text" id="default-input" placeholder="Từ khóa công việc..."
                                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <form className="basis-1/4 max-w-sm mx-auto">
                            <select id="countries" className="bg-gray-50 border text-xs lg:text-sm border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue={''}>Chọn cấp bậc</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </form>

                        <form className="basis-1/4  max-w-sm mx-auto">
                            <select id="countries" className="bg-gray-50 border text-xs lg:text-sm border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue={''}>Chọn tỉnh thành</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </form>

                        <Button className="w-fit" gradientMonochrome="info">
                            <span className='flex items-center justify-center' >
                                <svg className="text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /> </svg>
                            </span>
                        </Button>
                    </div>
                    <div className='sm:hidden flex flex-col gap-3'>
                        <div className="w-full">
                            <input type="text" id="default-input" placeholder="Từ khóa công việc..."
                                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className='flex gap-3'>
                            <form className="w-full max-w-sm">
                                <select id="countries" className="bg-gray-50 border text-xs lg:text-sm border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option defaultValue={''}>Chọn cấp bậc</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                </select>
                            </form>

                            <form className="w-full max-w-sm">
                                <select id="countries" className="bg-gray-50 border text-xs lg:text-sm border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option defaultValue={''}>Chọn tỉnh thành</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                </select>
                            </form>
                        </div>
                        <div className='w-full mt-3 flex justify-center'>
                            <Button className="w-fit" gradientMonochrome="info">
                                <span className='flex items-center justify-center gap-2' >
                                    Tìm kiếm
                                    <svg className="text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /> </svg>
                                </span>
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default FindJob;