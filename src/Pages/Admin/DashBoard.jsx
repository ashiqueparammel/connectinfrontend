import { Card, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { AdmindashBoardCount } from '../../Constants/Constants';



function DashBoard() {
    var [date, setDate] = useState(new Date());
    const options = { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };

    const [ActiveUser, setActiveUser] = useState('')
    const [TotalUser, setTotalUser] = useState('')
    const [ActiveCompany, setActiveCompany] = useState('')
    const [TotalCompany, setTotalCompany] = useState('')

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    });

    const time12hrWithSeconds = date.toLocaleTimeString(undefined, options);
    const [time, ampm] = time12hrWithSeconds.split(' ');

    const dateTimeString = date.toLocaleDateString(undefined, optionsDate);
    const [month, day, year] = dateTimeString.split('/');

    useEffect(() => {
        axios.get(AdmindashBoardCount).then((response) => {
            response.data
            const checkData = response.data
            let userActive = checkData.filter((obj) => (obj.is_company === false && obj.is_active === true))
            let companyActive = checkData.filter((obj) => (obj.is_company === true && obj.is_active === true))
            let totalCompany = checkData.filter((obj) => (obj.is_company === true))
            let totalUser = checkData.filter((obj) => (obj.is_company === false))
            setActiveCompany(companyActive.length)
            setTotalCompany(totalCompany.length)
            setTotalUser(totalUser.length)
            setActiveUser(userActive.length)
            // console.log(response.data,'=========<<<<<<<<<<<<<<<<<<<data cheking in admin side');
        }).catch((error) => {
            console.log(error);
        })
    }, [])



    const [chartData, setChartData] = useState({
        series: [20, 10, 30, 40],
        options: {
            chart: {
                width: 380,
                type: "donut",
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270,
                },
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                type: "gradient",
            },
            legend: {
                formatter: function (val, opts) {
                    const categories = [
                        "active companies",
                        "Total users",
                        "active jobs",
                        "activeUsers",
                    ];
                    return (
                        categories[opts.seriesIndex] +
                        " - " +
                        opts.w.globals.series[opts.seriesIndex]
                    );
                },
            }, // Correct placement of the closing curly brace
            title: {
                text: "Overview",
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        },
    });

    const [amountData, setamountData] = useState({
        series: [15, 75, 10],
        options: {
            chart: {
                width: 380,
                type: "donut",
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270,
                },
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                type: "gradient",
            },
            legend: {
                formatter: function (val, opts) {
                    const categories = ["basic", "standard", "premium"];
                    return (
                        categories[opts.seriesIndex] +
                        " - " +
                        opts.w.globals.series[opts.seriesIndex]
                    );
                },
            },
            title: {
                text: "Payment types",
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        },
    });


    return (
        <div className='flex'>
            <div>
                <div className="">
                    <div className="flex justify-between  mb-14 mt-10 ml-10">
                        <div className="border-[#d9d9d9]  p-1 w-[12rem] text-white   h-[6rem] shadow-md shadow-blue-gray-200 rounded-lg  bg-[#335a91]">
                            <div className="flex flex-col items-center ">
                                <Typography className='font-prompt mt-2' variant="h5">Active companies</Typography>
                                <Typography variant="h2">{ActiveCompany}</Typography>
                            </div>
                        </div>
                        <div className="border-[#d9d9d9] ml-5 rounded-lg p-1 w-[12rem] text-white  h-[6rem] shadow-md shadow-blue-gray-200  bg-[#335a91]">
                            <div className="flex flex-col items-center ">
                                <Typography className='font-prompt mt-2' variant="h5">Active Users</Typography>
                                <Typography variant="h2">{ActiveUser}</Typography>
                            </div>
                        </div>
                        <div className="border-[#d9d9d9] ml-5 rounded-lg p-1 w-[12rem] text-white  h-[6rem] shadow-md shadow-blue-gray-200  bg-[#335a91]">
                            <div className="flex flex-col items-center ">
                                <Typography className='font-prompt mt-2' variant="h5">Total companies</Typography>
                                <Typography variant="h2">{TotalCompany}</Typography>
                            </div>
                        </div>
                        <div className="border-[#d9d9d9] ml-5 rounded-lg p-1 w-[12rem] text-white  h-[6rem] shadow-md shadow-blue-gray-200  bg-[#335a91]">
                            <div className="flex flex-col items-center ">
                                <Typography className='font-prompt mt-2' variant="h5">Total Users</Typography>
                                <Typography variant="h2">{TotalUser}</Typography>
                            </div>
                        </div>
                    </div>

                    <div className="flex ">
                        <div className=" row">
                            <div className="mixed-chart">
                                <Chart
                                    options={chartData.options}
                                    series={chartData.series}
                                    type="donut"
                                    width="400"
                                />
                            </div>
                        </div>

                        <div className=" row">
                            <div className="mixed-chart">
                                <Chart
                                    options={amountData.options}
                                    series={amountData.series}
                                    type="donut"
                                    width="390"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {(date ?
                <div className=''>
                    <Card className=' w-52 h-52 mt-5 border-[#d9d9d9] border-[1px] bg-[#ececec] contact-highlight absolute right-10 text-center'>
                        <h1 className='mt-5 font-prompt-normal text-black text-5xl'>{time}</h1>
                        <h1 className='mt-2 uppercase font-prompt-normal text-black text-5xl'>{ampm}</h1>
                        <div className='flex gap-3 ml-5  '>
                            <h1 className='mt-5  text-black text-3xl'>{day} </h1>
                            <h1 className='mt-5  text-black text-3xl'>{month} </h1>
                            <h1 className='mt-5  text-black text-3xl'>{year} </h1>
                        </div>
                    </Card>


                </div> : '')}
        </div>

    )
}

export default DashBoard


