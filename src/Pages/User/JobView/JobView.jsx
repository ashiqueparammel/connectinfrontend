import { faEllipsisVertical, faRemove, faSave, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { JobUserView, ListRequiredSkills } from '../../../Constants/Constants'
import axios from 'axios'
// import { useSelector } from 'react-redux'

function JobView() {

    // const CompanyDetails = useSelector((state) => state.company.companyInfo)
    const location = useLocation()
    const navigate = useNavigate()
    const job_id = location.state.data || ''
    const [jobViews, setJobViews] = useState([])
    const [CompanyDetails, setCompanyDetails] = useState([])
    const [RequiredSkills, setRequiredSkills] = useState([])


    // there is want to if condition  if job id show this page or else render to back page  not now want later



    const formatPostedDate = (postedDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }; //  hour: 'numeric', minute: 'numeric', second: 'numeric'
        const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    console.log(job_id, 'hllllllllllllllllo');
    useEffect(() => {
        const response = axios.get(`${JobUserView}${job_id}/`).then((response) => {
            setJobViews(response.data);
            setCompanyDetails(response.data.company)

        }).catch((error) => {
            console.error("Error fetching job details:", error);
        });
        axios.get(`${ListRequiredSkills}${job_id}/`).then((response) => {
            setRequiredSkills(response.data); 
        }).catch((error) => {
            console.error("Error fetching job details:", error);
        });
    }, [])
    console.log(jobViews, '==============>>>>>>>>>>>>');



    return (
        <div className='flex justify-center'>
            <Card className='bg-[#e7e7e7] rounded-md w-[90%] mt-10   '>

                <div className='xl:ml-28 lg:ml-24 2xl:28 sm:ml-6 md:ml-8 ml-8 mt-6 mb-3 '>
                    <Card className='bg-[#FAFAFA] shadow-2xl mt-2  rounded-md w-[90%]'>
                        <div className='flex justify-between'>
                            <Typography className='font-prompt text-lg ml-6 mt-1 text-black'>{jobViews.Job_title}</Typography>
                            <Menu>
                                <MenuHandler>
                                    <FontAwesomeIcon icon={faEllipsisVertical} color='#051339' className=' w-5 h-5 mt-3  rounded-full hover:text-[#000000]   mr-4 hover:bg-gray-600 hover:bg-opacity-20 hover:cursor-pointer ' />
                                </MenuHandler>
                                <MenuList className="max-h-72">
                                    <MenuItem className='text-black font-prompt'><FontAwesomeIcon icon={faSave} color='#051339' className='mr-4' />Save</MenuItem>
                                    <MenuItem className='text-black font-prompt'><FontAwesomeIcon icon={faRemove} color='#051339' className='mr-4' />Not Interested</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                        <Typography className='font-prompt text-md ml-6 '>{CompanyDetails.company_name}</Typography>
                        <Typography className='font-prompt text-md ml-6 '>{CompanyDetails.Location}</Typography>

                        <div className='flex ml-6 '>
                            <FontAwesomeIcon icon={faSuitcase} color='#051339' className=' w-5 h-5  rounded-full hover:text-[#000000] mr-4 hover:bg-gray-600 hover:bg-opacity-20 hover:cursor-pointer ' />
                            <h1 className='font-prompt text-sm bg-[#143345] text-white rounded-md'><span className='text-[#143345]'>.</span> {jobViews.job_type} <span className='text-[#143345]'>.</span></h1>
                        </div>
                        <Typography className='font-prompt text-sm ml-6 mt-1 '>salary : {jobViews.salary}  </Typography>
                        <div className='flex justify-center'>
                            <p className='w-[96%] mt-2 ' style={{ borderBottom: '1px solid #9da3a3 ' }}></p>
                        </div>
                        <div className='flex gap-6 ml-6 mt-4 mb-3 font-prompt'>
                            <h1>Posted : {formatPostedDate(jobViews.posted_date)}</h1>
                            |
                            <h1>Openings : {jobViews.Openings}</h1>
                            |
                            <h1>Applications : 19</h1>

                        </div>

                    </Card>

                    <Card className='bg-[#FAFAFA] shadow-2xl mt-2 mb-2  rounded-md w-[90%]'>
                        <div className='m-6 font-prompt'>
                            <Typography className='font-prompt text-lg  mb-1 '  >About The Job </Typography >
                            <h1>Company name :{CompanyDetails.company_name} </h1>
                            <h1>Location : {CompanyDetails.Location}</h1>
                            <h1>Job Title : {jobViews.Job_title}</h1>
                            <h1>Experiance : {(jobViews.Experience===0?'Fresher':jobViews.Experience+'Years')}</h1>
                            <h1>job type : {jobViews.job_type}</h1>
                            <h1>salary : {jobViews.salary}</h1>
                            <h1 >posted date : {formatPostedDate(jobViews.posted_date)}</h1>

                        </div>
                    </Card>
                    <Card className='bg-[#FAFAFA] shadow-2xl mt-2 mb-2  rounded-md w-[90%]'>
                        <div className='m-6 font-prompt'>
                            <Typography className='font-prompt text-lg mb-1'>Job Discription </Typography>

                            <h1 >job discription : {jobViews.job_description}</h1>

                        </div>
                    </Card>
                    <Card className='bg-[#FAFAFA] shadow-2xl py-2 px-5 rounded-md w-[90%]'>
                        <Typography className='font-prompt text-lg '>Required Skills</Typography>
                        <div className='flex flex-row gap-2'>
                            {RequiredSkills.map((skills) => (
                                < div key={skills.id} className='font-prompt text-black flex flex-row mb-4 mt-4 '>
                                    <div className='bg-[#cacbcb] border-[1px] border-black flex gap-1 rounded-md text-black'><p className='font-prompt ml-1 mr-1'> {skills.skills.skills}</p></div>
                                </div>
                            ))}
                        </div>

                    </Card>
                </div>


            </Card>

        </div>
    )
}

export default JobView