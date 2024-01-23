import { Card, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";



function DashBoard() {
    var [date, setDate] = useState(new Date());
    const options = { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
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
        series: [15, 0, 10],
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
                                {/* <Typography variant="h2">{data && data.data && data.data.activeUsers}</Typography> */}
                            </div>
                        </div>
                        <div className="border-[#d9d9d9] ml-5 rounded-lg p-1 w-[12rem] text-white  h-[6rem] shadow-md shadow-blue-gray-200  bg-[#335a91]">
                            <div className="flex flex-col items-center ">
                                <Typography className='font-prompt mt-2' variant="h5">Active Users</Typography>
                                {/* <Typography variant="h2">{data && data.data && data.data.grandTotal}/-</Typography> */}
                            </div>
                        </div>
                        <div className="border-[#d9d9d9] ml-5 rounded-lg p-1 w-[12rem] text-white  h-[6rem] shadow-md shadow-blue-gray-200  bg-[#335a91]">
                            <div className="flex flex-col items-center ">
                                <Typography className='font-prompt mt-2' variant="h5">Total companies</Typography>
                                {/* <Typography variant="h2">{data && data.data && data.data.activeJobs}</Typography> */}
                            </div>
                        </div>
                        <div className="border-[#d9d9d9] ml-5 rounded-lg p-1 w-[12rem] text-white  h-[6rem] shadow-md shadow-blue-gray-200  bg-[#335a91]">
                            <div className="flex flex-col items-center ">
                                <Typography className='font-prompt mt-2' variant="h5">Active jobs</Typography>
                                {/* <Typography variant="h2">{data && data.data && data.data.applications}</Typography> */}
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


