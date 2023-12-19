import React, { useEffect, useState } from 'react'
import { faEye, faPlus, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Typography, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import { Tabs, TabsHeader, TabsBody, Tab, } from "@material-tailwind/react";
import axios from 'axios';
import { Company_Profile, JobAdd, JobList } from '../../../Constants/Constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast'
import { AllExperiance } from '../../../Helpers/Experiance';
import { AllJobType } from '../../../Helpers/JobType';


function CompanyMyItems() {

  // const company_Data
  const UserDetails = useSelector((state) => state.user.userInfo)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Posts');
  const Head = [{ Heading: 'Posts' }, { Heading: 'Interviews' }, { Heading: 'Applications' }]
  const [JobDetails, setJobDetails] = useState([]);
  const [CompanyDetail, setCompanyDetails] = useState([])
  const [JobExperiance, setJobExperiance] = useState('')
  const [JobType, setJobType] = useState('')
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);



  const formatPostedDate = (postedDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
    const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  useEffect(() => {
    axios.get(`${Company_Profile}${UserDetails.id}/`).then((response) => {
      setCompanyDetails(response.data[0])
      if (response.status === 200) {
        axios.get(`${JobList}${response.data[0].id}/`).then((response) => {
          setJobDetails(response.data);
        }).catch((error) => {
          console.error("Error fetching job details:", error);
        });
      }
    }).catch((error) => {
      console.error("Error fetching company details:", error);
    })




  }, [])
  console.log(JobDetails, '=====================================>>>>>>>.');
  // console.log(JobExperiance, '==============+++=======================>>>>>>>.');


  return (
    <div className='flex justify-center'>
      <Card className='w-[80rem] mt-14 bg-gray-200'>
        <div className='flex justify-between border-b-[1px] border-[#a39f9f] ' >
          <Typography className='font-prompt mt-4 ml-4' variant='h4'>
            MyItems
          </Typography>
          <Button onClick={handleOpen} className='mt-4 mr-4 mb-4 bg-[#051339] font-prompt-normal flex gap-4'><FontAwesomeIcon icon={faPlus} /><span>Add Post</span></Button>
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
              {(activeTab === 'Posts' ?
                <div className='flex flex-col w-full ml-24'>
                  {JobDetails.map((job, index) => (
                    <Card className=' flex flex-row mb-3 rounded-md w-[90%] mt-5 justify-between' key={index}>
                      <div className='ml-16'>
                        <Typography className='mt-2 font-prompt text-xl text-black'>{job.Job_title}</Typography>
                        <Typography className='font-prompt text-lg text-black'>{job.company.company_name}</Typography>
                        <Typography className='font-prompt text-sm text-black'>{job.company.Location}</Typography>
                        <Typography className='font-prompt text-sm text-black'>{formatPostedDate(job.posted_date)}</Typography>
                      </div>
                      <Button onClick={() => navigate('/company/postview', { state: { data: job.id } })} className='mt-8 mr-16 h-10 mb-4 bg-[#051339] font-prompt-normal flex gap-4'><FontAwesomeIcon icon={faEye} /><span>View</span></Button>
                    </Card>

                  ))}
                </div> : '')}

              {(activeTab === 'Interviews' ? 'interview' : '')}
              {(activeTab === 'Applications' ? 'Applications' : '')}

            </TabsBody>
          </Tabs>
        </div>

      </Card>
      {/* {edit modal} */}
      <Dialog className='w-full'
        open={open}
        size={'lg'}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 1, y: -100 },
        }}>
        <DialogHeader className='font-prompt text-black'>Add Job</DialogHeader>
        <div className='flex flex-col gap-4'>

          <input type="text" placeholder='Job Title' className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
          <div className='flex flex-row gap-4 ml-[4%]'>
            <select
              value={JobExperiance}
              onChange={(e) => setJobExperiance(e.target.value)}
              className="!border-black bg-white focus:!border-t-black border-2 w-[25%] h-12 rounded-sm"
              style={{ paddingLeft: '20px' }}>
              <option value="" disabled hidden>
                {JobExperiance ? '' : 'Job Experiance'}
              </option>

              {AllExperiance.map((Experiance, index) => (
                <option key={`${index}:${Experiance}`} value={index} className='font-prompt text-black'>
                  {Experiance}
                </option>
              ))}
            </select>
            <select
              value={JobType}
              onChange={(e) => setJobType(e.target.value)}
              className="!border-black bg-white focus:!border-t-black border-2 w-[25%] h-12 rounded-sm"
              style={{ paddingLeft: '20px' }}>
              <option value="" disabled hidden>
                {JobType ? '' : 'Job Type'}
              </option>

              {AllJobType.map((Type, index) => (
                <option key={`${index}:${Type}`} value={Type} className='font-prompt text-black'>
                  {Type}
                </option>
              ))}
            </select>


            <input type="text" placeholder='Salary' className='border-2 w-[40%]  h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
          </div>
          <input type="text" placeholder='Opengins (In numbers)' className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
          <div type="text" placeholder='Skills' className='border-2 w-[90%] ml-[4%] h-28 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} >

            <Button>Add skills</Button>
          </div>

          <textarea type="text" placeholder='Job Description' className='border-2 w-[90%] ml-[4%] h-28 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />

        </div>
        <DialogFooter>
          <Button variant="text" className='bg-[#d9dbdb] font-prompt-normal mr-1 text-black hover:bg-[#a4a4a4]' onClick={handleOpen}>
            <span>Cancel</span>
          </Button>
          <Button variant="filled" className='bg-[#051339] font-prompt-normal' onClick={handleOpen}>
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Toaster />

    </div>
  )
}

export default CompanyMyItems

