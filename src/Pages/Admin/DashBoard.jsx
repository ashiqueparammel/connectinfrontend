import { Card, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { AdmindashBoardCount, AdmindashBoardRecentCompany, AdmindashBoardRecentUser, JobListAdminside, PublicPostAdd } from '../../Constants/Constants';



function DashBoard() {
    var [date, setDate] = useState(new Date());
    const options = { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };

    const [ActiveUser, setActiveUser] = useState('');
    const [TotalUser, setTotalUser] = useState('');
    const [ActiveCompany, setActiveCompany] = useState('');
    const [TotalCompany, setTotalCompany] = useState('');
    const [UsersList, setUsersList] = useState([]);
    const [CompanyList, setCompanyList] = useState([]);
    let ActivePosts = null
    let BlockedPosts = null
    let TotalPosts = null
    let ActiveJobPosts = null
    let BlockedJobPost = null
    let TotalJobPosts = null


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
        }).catch((error) => {
            console.log(error);
        })
        axios.get(PublicPostAdd).then((response) => {
            const checkData = response.data
            let postActive = checkData.filter((obj) => (obj.is_available === true))
            let postBlocked = checkData.filter((obj) => (obj.is_available === false))
            ActivePosts = postActive.length
            BlockedPosts = postBlocked.length
            TotalPosts = checkData.length
            const updatedSeries = [ActivePosts, TotalPosts, BlockedPosts];
            setChartData({ ...chartData, series: updatedSeries, });
        }).catch((error) => {
            console.log(error);
        })
        axios.get(JobListAdminside).then((response) => {
            const checkData = response.data
            let jobPostActive = checkData.filter((obj) => (obj.is_available === true))
            let jobPostBlocked = checkData.filter((obj) => (obj.is_available === false))
            ActiveJobPosts = jobPostActive.length
            BlockedJobPost = jobPostBlocked.length
            TotalJobPosts = checkData.length
            const updatedSeries = [ActiveJobPosts, TotalJobPosts, BlockedJobPost];
            setAmountData({ ...amountData, series: updatedSeries, });
        }).catch((error) => {
            console.log(error);
        })

        axios.get(AdmindashBoardRecentUser).then((response) => {
            setUsersList(response.data)
        }).catch((error) => {
            console.log(error);
        })
        axios.get(AdmindashBoardRecentCompany).then((response) => {
            setCompanyList(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [])


    const [chartData, setChartData] = useState({
        series: [],
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
                        "Active Posts",
                        "Total Posts",
                        "Blocked Posts",
                    ];
                    return (
                        categories[opts.seriesIndex] +
                        " - " +
                        opts.w.globals.series[opts.seriesIndex]
                    );
                },
            }, // Correct placement of the closing curly brace
            title: {
                text: "PUBLIC POST OVERVIEW",
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

    const [amountData, setAmountData] = useState({
        series: [],
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
                    const categories = ["Active Jobs", "Total Jobs", "Blocked Jobs"];
                    return (
                        categories[opts.seriesIndex] +
                        " - " +
                        opts.w.globals.series[opts.seriesIndex]
                    );
                },
            },
            title: {
                text: "JOB POST OVERVIEW",
            },
            colors: ['#06859c', '#0b9614', '#a80513',],

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

    const TABLE_HEAD = ["USERNAME", "EMAIL", "STATUS"];
    const TABLE_HEAD2 = ["COMPANYNAME", "EMAIL", "STATUS"];

    const tableData = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Smith', age: 30 },
        { id: 3, name: 'Bob Johnson', age: 28 },
        { id: 3, name: 'Bob Johnson', age: 28 },
        { id: 3, name: 'Bob Johnson', age: 28 },
    ];

    return (
        <div className='flex'>
            <div>
                <div className="">
                    <div className="flex justify-between  mb-5 mt-5 ml-5">
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
                        <div className="border-[#d9d9d9] mr-8 rounded-lg p-1 w-[12rem] text-white  h-[6rem] shadow-md shadow-blue-gray-200  bg-[#335a91]">
                            <div className="flex flex-col items-center ">
                                <Typography className='font-prompt mt-2' variant="h5">Total Users</Typography>
                                <Typography variant="h2">{TotalUser}</Typography>
                            </div>
                        </div>
                    </div>

                    <div className="flex ml-10 ">
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

                        <div className=" row ml-10">
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

                  <div className='flex justify-around'>
                  <h1 className='ml-10 font-prompt text-xl'>Recent Users</h1>
                    <h1 className='ml-10 font-prompt text-xl'>Recent Companies</h1>
                  </div>

                <div className='flex'>
                    <div className='ml-1 overflow-y-auto max-h-60 hidescroll'>
                        <table className="w-full min-w-max table-auto text-left border-[1px]">
                            <thead className=''>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b border-blue-gray-200 bg-blue-gray-50 p-4">
                                            <Typography
                                                variant="small"

                                                className="text-black font-prompt-normal  "
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody >
                                {UsersList.map((obj) => {
                                    const classes = "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={obj.id}>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg">
                                                    {obj.username}
                                                </Typography>
                                            </td>

                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg">
                                                    {obj.email}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                {(obj.is_active === true ? <Typography variant="small" color="blue-gray" className="font-roboto-mono bg-[rgb(69,158,85)] text-white rounded-lg text-center text-lg border-[1px] w-20 ">
                                                    Active
                                                </Typography> : <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg rounded-lg border-[1px] bg-[#a93f3f] text-white text-center w-24 ">
                                                    DeActive
                                                </Typography>)}


                                            </td>

                                        </tr>
                                    );
                                })}


                            </tbody>
                        </table>


                    </div>

                    <div className='ml-1 overflow-y-auto max-h-60 hidescroll'>
                        <table className="w-full min-w-max table-auto text-left border-[1px]">
                            <thead className=''>
                                <tr>
                                    {TABLE_HEAD2.map((head) => (
                                        <th key={head} className="border-b border-blue-gray-200 bg-blue-gray-50 p-4">
                                            <Typography
                                                variant="small"

                                                className="text-black font-prompt-normal  "
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody >
                                {CompanyList.map((obj) => {
                                    const classes = "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={obj.id}>
                                             <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg">
                                                    {obj.username}
                                                </Typography>
                                            </td>

                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg">
                                                    {obj.email}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                {(obj.is_active === true ? <Typography variant="small" color="blue-gray" className="font-roboto-mono bg-[rgb(69,158,85)] text-white rounded-lg text-center text-lg border-[1px] w-20 ">
                                                    Active
                                                </Typography> : <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg rounded-lg border-[1px] bg-[#a93f3f] text-white text-center w-24 ">
                                                    DeActive
                                                </Typography>)}


                                            </td>

                                        </tr>
                                    );
                                })}


                            </tbody>
                        </table>


                    </div>
                </div>

            </div>

            {(date ?
                <div className=''>
                    <Card className=' w-52 h-52 mt-5 contact-highlights shadow-xl  bg-[#ececec]  absolute right-2 bottom-[16.5rem] text-center'>
                        <h1 className='mt-5 font-prompt-normal  text-black text-5xl'>{time}</h1>
                        <h1 className='mt-2 uppercase  font-prompt-normal text-black text-5xl'>{ampm}</h1>
                        <div className='flex gap-3 ml-5  '>
                            <h1 className='mt-5   text-black text-3xl'>{day} </h1>
                            <h1 className='mt-5   text-black text-3xl'>{month} </h1>
                            <h1 className='mt-5   text-black text-3xl'>{year} </h1>
                        </div>
                    </Card>


                </div> : '')}
        </div>

    )
}

export default DashBoard


