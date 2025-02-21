import React, { FC, useEffect, useState } from "react";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";


type Props = {
    open?: boolean;
    value?: number;
};


const DashboardWidgets: FC<Props> = ({ open }) => {
    const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
    const [userComparePercentage, setuserComparePercentage] = useState<any>();



    return (
        <div className="mt-[30px] min-h-screen">
            <div className="grid grid-cols-[75%,25%]">


                <div className="pt-[80px] pr-8">
                    <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
                        <div className="flex items-center p-5 justify-between">
                            <div className="">
                                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                                    {ordersComparePercentage?.currentMonth}
                                </h5>
                                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                                    Sales Obtained
                                </h5>
                            </div>
                            <div>

                                <h5 className="text-center pt-4">
                                    {
                                        ordersComparePercentage?.percentChange > 0
                                            ? "+" + ordersComparePercentage?.percentChange.toFixed(2)
                                            : "-" + ordersComparePercentage?.percentChange.toFixed(2)
                                    } %
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
                        <div className="flex items-center p-5 justify-between">
                            <div className="">
                                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                                    {userComparePercentage?.currentMonth}
                                </h5>
                                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                                    New Users
                                </h5>
                            </div>
                            <div>

                                <h5 className="text-center pt-4">
                                    {userComparePercentage?.percentChange > 0
                                        ? "+" + userComparePercentage?.percentChange.toFixed(2)
                                        : "-" + userComparePercentage?.percentChange.toFixed(2)} %
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-[65%,35%] mt-[-20px]">

            </div>
        </div>
    );
};

export default DashboardWidgets;
