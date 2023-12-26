import React, { useEffect, useState } from 'react'
import { faEye, faPlus, faRemove, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Typography } from '@material-tailwind/react'
import { Tabs, TabsHeader, TabsBody, Tab, } from "@material-tailwind/react";
import axios from 'axios';
// import {  } from '../../../Constants/Constants';
import { useNavigate } from 'react-router-dom';
import { SavePostDetail, SavePostUpdate } from '../../../Constants/Constants';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';



function UserMyItems() {

    const userInfo = useSelector((state) => state.user.userInfo)

    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('Applied');
    const [savedJobs, setSavedJobs] = useState([])
    const [Managestate, setManagestate] = useState(false)
    const Head = [{ Heading: 'Applied' }, { Heading: 'Interviews' }, { Heading: 'Saved' }]

    const formatPostedDate = (postedDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
        const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    useEffect(() => {
        setManagestate(false)
        axios.get(`${SavePostDetail}${userInfo.id}/`).then((response) => {
            setSavedJobs(response.data)

        }).catch((error) => {
            console.error("Error fetching saved details:", error);
        });
    }, [Managestate])

    const removeSavedJobs = (event) => {
        console.log(event, 'remove value check');
        axios.delete(`${SavePostUpdate}${event}/`).then((response) => {
            // console.log(response.data, "delete data");
            setManagestate(true)
            toast.success('Remove Saved job !')
        }).catch((error) => {
            console.error("Error delete saved details:", error);

        })
    }
                                    
console.log(savedJobs,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa====');
    return (
        <div className='flex justify-center'>
            <Card className='w-[80rem] mt-14 bg-gray-200'>
                <div className='flex justify-between border-b-[1px] border-[#a39f9f] ' >
                    <Typography className='font-prompt mt-4 ml-4' variant='h4'>
                        MyItems
                    </Typography>
                    {/* <Button className='mt-4 mr-4 mb-4 bg-[#051339] font-prompt-normal flex gap-4'><FontAwesomeIcon icon={faPlus} /><span>Add Post</span></Button> */}
                </div>

                <div>
                    <Tabs value={activeTab} className='mt-1 mb-1'>
                        <TabsHeader
                            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                            indicatorProps={{
                                className:
                                    "bg-transparent border-b-2 border-[#051339] shadow-nonex rounded-none",
                            }}
                        >
                            {Head.map(({ Heading }) => (
                                <Tab
                                    key={Heading}
                                    value={Heading}
                                    onClick={() => setActiveTab(Heading)}
                                    className={activeTab === Heading ? "text-2xl" : ""}>
                                    <h1 className='font-prompt text-lg'>{Heading}</h1>
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody className='flex justify-center'>
                            {(activeTab === 'Applied' ?
                                'Applied' : '')}

                            {(activeTab === 'Interviews' ? 'interview' : '')}

                            {(activeTab === 'Saved' ? < div className='flex flex-col w-full ml-24' >
                                {
                                    savedJobs.map((job, index) => (
                                        <Card className=' flex flex-row mb-3 rounded-md w-[90%] mt-5 justify-between' key={index}>
                                            <div className='ml-16'>
                                                <Typography className='mt-2 font-prompt text-xl text-black'>{job.job_post.Job_title}</Typography>
                                                <Typography className='font-prompt text-lg text-black'>{job.job_post.company.company_name}</Typography>
                                                <Typography className='font-prompt text-sm text-black'>{job.job_post.company.Location}</Typography>
                                                <Typography className='font-prompt text-sm text-black'>{job.job_post.salary}</Typography>
                                                <Typography className='font-prompt text-sm text-black'>{formatPostedDate(job.job_post.posted_date)}</Typography>
                                            </div>
                                            <Button onClick={() => navigate('/jobview', { state: { data: job.job_post.id } })} className='mt-8 absolute right-40  h-10 mb-4 bg-[#051339] font-prompt-normal flex gap-4'><FontAwesomeIcon icon={faEye} /><span>View</span></Button>
                                            <FontAwesomeIcon onClick={(e) => removeSavedJobs(job.id)} className='mt-10 h-6 text-[#051339] hover:cursor-pointer hover:text-[#4e576f] absolute right-16 font-prompt-normal' icon={faRemove} />

                                        </Card>

                                    ))
                                }
                            </div > : '')}

                        </TabsBody>
                    </Tabs>
                </div>

            </Card>
            <Toaster/>
        </div>
    )
}

export default UserMyItems












