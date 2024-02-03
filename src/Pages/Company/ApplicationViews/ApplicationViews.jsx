import React, { useEffect, useState } from 'react'
import { Button, Card, Typography, Dialog, DialogHeader, DialogFooter, CardBody, CardFooter, } from '@material-tailwind/react';
import { Tabs, TabsHeader, TabsBody, Tab, } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { MyApplicationList, MySingleJobsAccepted, MySingleJobsListRead, MySingleJobsListUnRead, job_ApplicationsUpdate } from '../../../Constants/Constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { UserCircleIcon } from '@heroicons/react/24/solid';

function ApplicationViews() {
  const location = useLocation()
  const job_id = location.state.data || ''
  const navigate = useNavigate()

  const Head = [{ Heading: 'All' }, { Heading: 'Read' }, { Heading: 'UnRead' }, { Heading: 'Accepted' }]
  const [activeTab, setActiveTab] = useState('All');

  const formatPostedDate = (postedDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
    const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const [JobDetail, setJobDetail] = useState([])
  const [ReadApplication, setReadApplication] = useState([])
  const [UnReadApplication, setUnReadApplication] = useState([])
  const [AcceptedApplication, setAcceptedApplication] = useState([])
  const [unReadManage, setunReadManage] = useState(false)
  const [ReadManage, setReadManage] = useState(false)
  const [AcceptedManage, setAcceptedManage] = useState(false)
//MySingleJobsAccepted
  useEffect(() => {
    if (job_id) {
      axios.get(`${MyApplicationList}${job_id}/`).then((response) => {
        if (response.data.length === 0) {
          setJobDetail([])
        } else {
          const ApplicationAllData = response.data
          setJobDetail(ApplicationAllData)
        }
      }).catch((error) => {
        console.error("Error fetching MyApplicationList:", error);
      })
      axios.get(`${MySingleJobsAccepted}${job_id}/`).then((response) => {
        
        if (response.data.length === 0) {
          setAcceptedApplication([])
        } else {
          const ApplicationAllData = response.data
          setAcceptedManage(true)
          setAcceptedApplication(ApplicationAllData)
        }
      }).catch((error) => {
        console.error("Error fetching MyApplicationList:", error);
      })
      axios.get(`${MySingleJobsListRead}${job_id}/`).then((response) => {
        if (response.data.length === 0) {
          setReadApplication([])

        } else {

          const ApplicationAllData = response.data
          setReadApplication(ApplicationAllData)
          if (ApplicationAllData) {
            setReadManage(true)
          }
        }


      }).catch((error) => {
        console.error("Error fetching MyApplicationList:", error);
      })
      axios.get(`${MySingleJobsListUnRead}${job_id}/`).then((response) => {
        const ApplicationAllData = response.data
        if (ApplicationAllData) {
          setunReadManage(true)
        }
        setUnReadApplication(ApplicationAllData)
      }).catch((error) => {
        console.error("Error fetching MyApplicationList:", error);
      })
    }

  }, [])

  const readManage = (event) => {
    const updateData = {
      Read: true
    };

    axios.patch(`${job_ApplicationsUpdate}${event}/`, updateData)
      .then((response) => {
        if (response.status === 200) {
          navigate('/company/applicationprofile', { state: { data: event } });
        } else {
          console.error("Unexpected response status:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error fetching job_ApplicationsUpdate:", error);
      });
  };
  return (

    <div className='flex justify-center'>
      <Card className='w-[80rem] mt-14 bg-gray-200'>
        <div className='flex justify-between border-b-[1px] border-[#a39f9f] ' >
          <Typography className='font-prompt mt-4 ml-4' variant='h4'>
            Job Applications
          </Typography>
        </div>

        <div>
          <Tabs value={activeTab}>
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
              {(activeTab === 'All' ?
                <div className='flex flex-col w-full ml-24'>
                  {JobDetail.length !== 0 ? JobDetail.map((job, index) => (

                    <Card className=' flex flex-row mb-3 rounded-md w-[90%] mt-5 justify-between' key={index}>
                      <div className='flex gap-5'>
                        <div>
                          {(job.profile.user.profile_image ? <img src={job.profile.user.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
                            <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-4 " />)}
                        </div>
                        <div>
                          <Typography className='mt-2 font-prompt text-xl text-black uppercase'>{job.profile.header}</Typography>
                          <Typography className='font-prompt text-md text-black'>{job.profile.user.username}</Typography>
                          <Typography className='font-prompt text-sm text-black'>{job.profile.user.email}</Typography>
                          <Typography className='font-prompt text-sm text-black'>{formatPostedDate(job.posted_date)}</Typography>
                        </div>
                      </div>
                      <Button onClick={() => navigate('/company/applicationprofile', { state: { data: job.id } })} className='mt-8 mr-16 h-10 mb-4 bg-[#051339] font-prompt-normal flex gap-4'><FontAwesomeIcon icon={faEye} /><span>View</span></Button>
                    </Card>

                  )) : ''}
                </div>

                : '')}

              {(activeTab === 'Read' ? (ReadManage ? <div className='flex flex-col w-full ml-24'>
                {ReadApplication.map((job, index) => (

                  <Card className=' flex flex-row mb-3 rounded-md w-[90%] mt-5 justify-between' key={index}>
                    <div className='flex gap-5'>
                      <div>
                        {(job.profile.user.profile_image ? <img src={job.profile.user.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
                          <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-4 " />)}
                      </div>
                      <div>
                        <Typography className='mt-2 font-prompt text-xl uppercase text-black'>{job.profile.header}</Typography>
                        <Typography className='font-prompt text-md text-black'>{job.profile.user.username}</Typography>
                        <Typography className='font-prompt text-sm text-black'>{job.profile.user.email}</Typography>
                        <Typography className='font-prompt text-sm text-black'>{formatPostedDate(job.posted_date)}</Typography>
                      </div>
                    </div>
                    <Button onClick={() => navigate('/company/applicationprofile', { state: { data: job.id } })} className='mt-8 mr-16 h-10 mb-4 bg-[#051339] font-prompt-normal flex gap-4'><FontAwesomeIcon icon={faEye} /><span>View</span></Button>
                  </Card>

                ))}
              </div> : '') : '')}
              {(activeTab === 'UnRead' ? (unReadManage ? <div className='flex flex-col w-full ml-24'>
                {UnReadApplication.map((job, index) => (

                  <Card className=' flex flex-row mb-3 rounded-md w-[90%] mt-5 justify-between' key={index}>
                    <div className='flex gap-5'>
                      <div>
                        {(job.profile.user.profile_image ? <img src={job.profile.user.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
                          <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-4 " />)}
                      </div>
                      <div>
                        <Typography className='mt-2 font-prompt text-xl uppercase text-black'>{job.profile.header}</Typography>
                        <Typography className='font-prompt text-md text-black'>{job.profile.user.username}</Typography>
                        <Typography className='font-prompt text-sm text-black'>{job.profile.user.email}</Typography>
                        <Typography className='font-prompt text-sm text-black'>{formatPostedDate(job.posted_date)}</Typography>
                      </div>
                    </div>
                    <Button onClick={(e) => readManage(job.id)} className='mt-8 mr-16 h-10 mb-4 bg-[#051339] font-prompt-normal flex gap-4'><FontAwesomeIcon icon={faEye} /><span>View</span></Button>
                  </Card>

                ))}
              </div> : '') : '')}
              {(activeTab === 'Accepted' ? (AcceptedManage ? <div className='flex flex-col w-full ml-24'>
                {AcceptedApplication.map((job, index) => (

                  <Card className=' flex flex-row mb-3 rounded-md w-[90%] mt-5 justify-between' key={index}>
                    <div className='flex gap-5'>
                      <div>
                        {(job.profile.user.profile_image ? <img src={job.profile.user.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
                          <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-4 " />)}
                      </div>
                      <div>
                        <Typography className='mt-2 font-prompt text-xl uppercase text-black'>{job.profile.header}</Typography>
                        <Typography className='font-prompt text-md text-black'>{job.profile.user.username}</Typography>
                        <Typography className='font-prompt text-sm text-black'>{job.profile.user.email}</Typography>
                        <Typography className='font-prompt text-sm text-black'>{formatPostedDate(job.posted_date)}</Typography>
                      </div>
                    </div>
                    <Button onClick={() => navigate('/company/applicationprofile', { state: { data: job.id } })} className='mt-8 mr-16 h-10 mb-4 bg-[#051339] font-prompt-normal flex gap-4'><FontAwesomeIcon icon={faEye} /><span>View</span></Button>
                  </Card>

                ))}
              </div> : '') : '')}
            </TabsBody>
          </Tabs>
        </div>

      </Card>


      <Toaster />
    </div>
  )
}

export default ApplicationViews


