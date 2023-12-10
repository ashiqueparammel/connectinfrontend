import React, { useEffect, useState } from 'react'
import { faEye, faPlus, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Typography } from '@material-tailwind/react'
import { Tabs, TabsHeader, TabsBody, Tab, } from "@material-tailwind/react";
import axios from 'axios';
// import {  } from '../../../Constants/Constants';
import { useNavigate } from 'react-router-dom';


function UserMyItems() {


    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('');
    const Head = [{ Heading: 'Applied' }, { Heading: 'Interviews' }, { Heading: 'Saved' }]

    // const formatPostedDate = (postedDate) => {
    //     const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
    //     const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
    //     return formattedDate;
    // };

    // useEffect(() => {
    //     const response = axios.get(`${}${}/`).then((response) => {
    //         setJobDetails(response.data);
    //     }).catch((error) => {
    //         console.error("Error fetching job details:", error);
    //     });


    // }, [])
    // console.log(Applications, '=====================================>>>>>>>.');


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
                            {(activeTab === 'Saved' ? 'Saved' : '')}

                        </TabsBody>
                    </Tabs>
                </div>

            </Card>
        </div>
    )
}

export default UserMyItems

{/* <div className='flex flex-col w-full ml-24'>
{JobDetails.map((job, index) => (
    <Card className=' flex flex-row mb-3 rounded-md w-[90%] mt-5 justify-between' key={index}>
        <div className='ml-16'>
            <Typography className='mt-2 font-prompt text-xl text-black'>{job.Job_titile}</Typography>
            <Typography className='font-prompt text-lg text-black'>{job.company_id.company_name}</Typography>
            <Typography className='font-prompt text-sm text-black'>{job.company_id.Location}</Typography>
            <Typography className='font-prompt text-sm text-black'>{formatPostedDate(job.posted_date)}</Typography>
        </div>
        <Button onClick={() => navigate('/company/postview')} className='mt-8 mr-16 h-10 mb-4 bg-[#051339] font-prompt-normal flex gap-4'><FontAwesomeIcon icon={faEye} /><span>View</span></Button>
    </Card>

))}
</div> */}








