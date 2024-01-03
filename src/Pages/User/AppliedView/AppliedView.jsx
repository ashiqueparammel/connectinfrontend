import React, { useEffect, useState } from 'react'
import { faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Menu, MenuHandler, MenuItem, MenuList, Typography, } from '@material-tailwind/react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MySingleJobsList } from '../../../Constants/Constants'
import { UserCircleIcon } from '@heroicons/react/24/solid'




function AppliedView() {
    const location = useLocation()
    const navigate = useNavigate()
    const apply_Id = location.state.data || ''
    // const [UserDetail, setUserDetail] = useState([])
    // const [ProfileUserdata, setProfileUserdata] = useState([])
    const [ProfileDetail, setProfileDetail] = useState([])
    const [CompanyDetail, setCompanyDetail] = useState([])
    const [JobDetail, setJobDetail] = useState([])
    const [RequiredJobSkills, setRequiredJobSkills] = useState([])
    const [AppliedDetail, setAppliedDetail] = useState([])
    const [CompanyUserData, setCompanyUserData] = useState([])
    const formatPostedDate = (postedDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
        const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    console.log(apply_Id, 'checking data getting');

    useEffect(() => {
        if (apply_Id) {
            axios.get(`${MySingleJobsList}${apply_Id}/`)
                .then((response) => {
                    console.log(response.data, '=====================<<<<<<<<<<<<<<<<<printed>>>>>>>>>>>>>');
                    const { job_post } = response.data
                    const { profile } = response.data
                    const { company } = job_post
                    const {user} = company 
                    const { Required_Skill } = job_post
                    console.log(Required_Skill,'job post+++++++++++++111');
                    // console.log(profile,'profile+++++++++++++111');
                    // console.log(company,'company+++++++++++++111');
                    setRequiredJobSkills(Required_Skill)
                    setCompanyUserData(user)
                    setAppliedDetail(response.data)
                    setCompanyDetail(company);
                    setProfileDetail(profile);
                    setJobDetail(job_post);

                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, []);



    return (
        <div className='flex justify-center'>
            <Card className='bg-[#e7e7e7] rounded-md w-[90%] mt-10   '>

                <div className='xl:ml-28 lg:ml-24 2xl:28 sm:ml-6 md:ml-8 ml-8 mt-6 mb-3 '>
                    <Card className='bg-[#FAFAFA] shadow-2xl mt-2  rounded-md w-[90%]'>
                        <div style={{ borderBottom: '1px solid #9da3a3' }} className='h-16'>
                            <Typography className='font-prompt text-2xl text-center ml-6 mt-1 text-black'>JobOverView</Typography>
                        </div>

                        <Typography className='font-prompt text-md ml-6 '>{CompanyDetail.company_name}</Typography>
                        <Typography className='font-prompt text-md ml-6 '>{CompanyDetail.Location}</Typography>

                        <div className='flex ml-6 '>
                            <FontAwesomeIcon icon={faSuitcase} color='#051339' className=' w-5 h-5  rounded-full hover:text-[#000000] mr-4 hover:bg-gray-600 hover:bg-opacity-20 hover:cursor-pointer ' />
                            <h1 className='font-prompt text-sm bg-[#143345] text-white rounded-md'><span className='text-[#143345]'>.</span> {JobDetail.job_type} <span className='text-[#143345]'>.</span></h1>
                        </div>
                        <Typography className='font-prompt text-sm ml-6 mt-1 '>salary : {JobDetail.salary}  </Typography>
                        <div className='flex justify-center'>
                            <p className='w-[96%] mt-2 ' style={{ borderBottom: '1px solid #9da3a3 ' }}></p>
                        </div>
                        <div className='flex gap-6 ml-6 mt-4 mb-3 font-prompt'>
                            <h1>Posted : {formatPostedDate(JobDetail.posted_date)}</h1>
                            |
                            <h1>Openings : {JobDetail.Openings}</h1>
                            |
                            <h1>Applications : 2</h1>
                            |
                            <h1>Applied : {formatPostedDate(AppliedDetail.posted_date)}</h1>

                        </div>

                    </Card>

                    <Card className='bg-[#FAFAFA] shadow-2xl mt-2 mb-2  rounded-md w-[90%]'>
                        <div className='m-6 font-prompt'>
                            <Typography className='font-prompt text-lg  mb-1 '  >About The Job </Typography >
                            <h1>Company name :{CompanyDetail.company_name} </h1>
                            <h1>Location : {CompanyDetail.Location}</h1>
                            <h1>Job Title : {JobDetail.Job_title}</h1>
                            <h1>Experiance : {(JobDetail.Experience === 0 ? 'Fresher' : JobDetail.Experience + 'Years')}</h1>
                            <h1>job type : {JobDetail.job_type}</h1>
                            <h1>salary : {JobDetail.salary}</h1>
                            <h1 >posted date : {formatPostedDate(JobDetail.posted_date)}</h1>

                        </div>
                    </Card>
                   
                    <Card className='bg-[#FAFAFA] shadow-2xl mt-2 mb-2  rounded-md w-[90%]'>
                        <div className='m-6 font-prompt'>
                            <Typography className='font-prompt text-lg mb-1'>Job Discription </Typography>

                            <h1 >job discription : {JobDetail.job_description}</h1>

                        </div>
                    </Card>
                    <Card className='bg-[#FAFAFA] shadow-2xl py-2 px-5 rounded-md w-[90%]'>
                        <Typography className='font-prompt text-lg '>Required Skills</Typography>
                        <div className='flex flex-row gap-2'>
                            {RequiredJobSkills.map((skills) => (
                                < div key={skills.id} className='font-prompt text-black flex flex-row mb-4 mt-4 '>
                                    <div className='bg-[#cacbcb] border-[1px] border-black flex gap-1 rounded-md text-black'><p className='font-prompt ml-1 mr-1'> {skills.skills.skills}</p></div>
                                </div>
                            ))}
                        </div>

                    </Card>
                    <Card className='bg-[#FAFAFA] shadow-2xl mt-2 mb-2  rounded-md w-[90%]'>
                        <div className='m-6 font-prompt'>
                            <Typography className='font-prompt text-lg  mb-1 '  > Company details</Typography >
                            {/* {(CompanyUserData.profile_image ? <img src={CompanyUserData.profile_image} alt="profile photo" className=' absolute right-10 top-10  ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
                                        <UserCircleIcon className=" rounded-none w-14 h-14  mt-4 absolute right-10 top-10  " />)} */}
                            <h1>Company name :{CompanyDetail.company_name} </h1>
                            <h1>Location : {CompanyDetail.Location}</h1>
                            <h1>Company Address : {CompanyDetail.Address}</h1>
                            <h1>Company Size : {CompanyDetail.Company_Size } Employees</h1>
                            <h1>Industry : {CompanyDetail.Industry}</h1>
                            <h1>Company Email : {CompanyUserData.email}</h1>
                            <h1>Company Contact : {CompanyUserData.phone_number}</h1>

                            <Typography className='font-prompt text-lg  mb-1 '  >About The Company </Typography >
                            <h1> {CompanyDetail.Description}</h1>

                        </div>
                    </Card>
                </div>
            </Card>
        </div>

    )
}

export default AppliedView