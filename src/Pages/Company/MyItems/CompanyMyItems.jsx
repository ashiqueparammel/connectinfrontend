import React, { useEffect, useState } from 'react'
import { faEye, faPlus, faRemove, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Typography, Dialog, DialogHeader, DialogFooter, CardBody, CardFooter, } from '@material-tailwind/react';
import { Tabs, TabsHeader, TabsBody, Tab, } from "@material-tailwind/react";
import axios, { Axios } from 'axios';
import { Company_Profile, JobAdd, JobList, JobSkillsAdd, List_Skills } from '../../../Constants/Constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast'
import { AllExperiance } from '../../../Helpers/Experiance';
import { AllJobType } from '../../../Helpers/JobType';


function CompanyMyItems() {

  const UserDetails = useSelector((state) => state.user.userInfo)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Posts');
  const Head = [{ Heading: 'Posts' }] //{ Heading: 'Applications' }
  const [JobDetails, setJobDetails] = useState([]);
  const [CompanyDetail, setCompanyDetails] = useState([])
  const [jobAllSkills, setJobAllSkills] = useState([])
  const [jobAllSkillsid, setJobAllSkillsid] = useState([])
  const [allSkills, setAllSkills] = useState([])
  const [JobExperiance, setJobExperiance] = useState('')
  const [JobType, setJobType] = useState('')
  const [addNewSkills, setaddNewSkills] = useState('')
  const [addOnNewSkills, setaddOnNewSkills] = useState('')
  const [open, setOpen] = useState(false);
  const [openSkill, setSkillOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleSkillOpen = () => setSkillOpen((cur) => !cur);
  const [ManageState, setManageState] = useState(false)

  const formatPostedDate = (postedDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
    const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  useEffect(() => {
    setManageState(false)
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
    axios.get(List_Skills).then((response) => {
      setAllSkills(response.data)
    }).catch((error) => {
      console.log(error, 'error get skills');

    })


  }, [ManageState])

  const AddNewOnskills = () => {
    const addOnskill = {
      skills: addOnNewSkills
    }
    try {
      axios.post(List_Skills, addOnskill).then((response) => {
        if (response.status === 201) {
          const res = response.data
          setJobAllSkills([...jobAllSkills, res])
          setJobAllSkillsid([...jobAllSkillsid, res.id])
          toast.success('Your On skill Added');
        }
      }).catch((error) => {
        if (error.response.data.skills) {
          toast.error('This skill already there!');
        }
      });
    } catch (error) {
      console.log('error add skills', error);
    }
    handleSkillOpen()
  }

  const addOptionalskills = (value) => {
    const exist = jobAllSkills.find((obj) => obj.id === parseInt(value))
    if (exist) {
      toast.error(' This skill already enterd!')
    } else {
      setaddNewSkills(value)
      setJobAllSkills([...jobAllSkills, allSkills[value - 1]])
      setJobAllSkillsid([...jobAllSkillsid, value])
      toast.success('skill Added');
      handleSkillOpen()
    }

  }

  const removeSelectedSkills = (skills) => {
    setJobAllSkillsid(jobAllSkillsid.filter((obj) => parseInt(obj) !== skills))
    setJobAllSkills(jobAllSkills.filter((obj2) => obj2.id !== skills))
  }


  const AddJobform = async (e) => {
    e.preventDefault();
    const postdata = {
      company: CompanyDetail.id,
      Job_title: e.target.Job_title.value,
      Experience: JobExperiance,
      job_type: JobType,
      salary: e.target.salary.value,
      Openings: e.target.openings.value,
      job_description: e.target.Description.value,
    }
    console.log('postdata data:', postdata);


    const validateForm = () => {
      if (postdata.Job_title.trim() === "") {
        toast.error('Job title should not be empty!');
        return false;
      }
      else if (postdata.Experience.trim() === "") {
        toast.error('Experience should not be empty!');
        return false;
      }
      else if (postdata.job_type.trim() === "") {
        toast.error('Job type should not be empty!');
        return false;
      }
      else if (postdata.salary.trim() === "") {
        toast.error('salary Should not be empty!');
        return false;
      }
      else if (postdata.Openings.trim() === "") {
        toast.error('Openings should not be empty!');
        return false;
      }
      else if (postdata.job_description.trim() === "") {
        toast.error('Description should not be empty!');
        return false;
      }

      return true;
    };

    if (validateForm()) {
      try {
        const responseData = await axios.post(JobAdd, postdata);
        const response = responseData.data
        if (responseData.status === 201) {
          toast.success('Job Added successfully!')
          const job_id = response.id
          try {
            for (let skill = 0; skill < jobAllSkillsid.length; skill++) {
              let skillData = {
                Job_post: job_id,
                skills: jobAllSkillsid[skill]
              }
              axios.post(JobSkillsAdd, skillData);
            }

          } catch (error) {
            console.error('Error during SKill add:', error);
            toast.error(error);
          }
          setManageState(true)
          handleOpen()

        }
      } catch (error) {
        console.error('Error during JOb add:', error);
        toast.error(error);
      }
    }
  };



  return (
    <div className='flex justify-center'>
      <Card className='w-[80rem] mt-14 bg-gray-200'>
        <div className='flex justify-between border-b-[1px] border-[#a39f9f] ' >
          <Typography className='font-prompt mt-4 ml-4' variant='h4'>
            MyJobs
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

              {/* {(activeTab === 'Interviews' ? 'interview' : '')} */}
              {/* {(activeTab === 'Applications' ? 'Applications' : '')} */}

            </TabsBody>
          </Tabs>
        </div>

      </Card>
      {/* {add job modal} */}
      <Dialog className='w-full rounded-sm'
        open={open}
        size={'lg'}
        // handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 1, y: -100 },
        }}>
        <form onSubmit={(e) => AddJobform(e)}>

          <DialogHeader className='font-prompt text-black'>Add Job</DialogHeader>
          <div className='flex flex-col gap-4 '>
            <input type="text" placeholder='Job Title' name='Job_title' className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
            <div className='flex flex-row gap-4 ml-[4%] '>
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


              <input type="text" placeholder='Salary eg: 0 - 1000' name='salary' className='border-2 2xl:w-[40%] xl:w-[40%] lg:w-[39%] md:w-[38%] sm:w-[35%] w-[34%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
            </div>
            <input type="number" placeholder='Opengins (In numbers)' name='openings' className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
            <div type="text" placeholder='Skills' className='border-2 w-[90%] ml-[4%] h-28 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} >
              <label >Skills:-</label>
              <Button onClick={handleSkillOpen} className='bg-[#051339] mt-1 absolute rounded-sm 2xl:left-[86%] xl:left-[85%] lg:left-[84%] md:left-[80%] sm:left-[76%] left-[71%] '><FontAwesomeIcon icon={faPlus} /></Button>
              <div className='flex flex-row gap-2  '>
                {jobAllSkills.map((skills) => (
                  < div key={skills.id} value={skills.id} className='font-prompt text-black flex flex-row '>
                    <div className='bg-[#cacbcb] border-[1px] border-black flex gap-1 rounded-sm text-black'>   <p className='font-prompt ml-1'> {skills.skills}</p><FontAwesomeIcon icon={faRemove} onClick={(e) => removeSelectedSkills(skills.id)} className='mr-1 mt-1 hover:opacity-50 hover:cursor-pointer' />  </div>
                  </div>
                ))}
              </div>



            </div>

            <textarea type="text" placeholder='Job Description' name='Description' className='border-2 w-[90%] ml-[4%] h-28 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />

          </div>
          <DialogFooter>
            <Button variant="text" className='bg-[#d9dbdb] font-prompt-normal mr-1 rounded-sm text-black hover:bg-[#a4a4a4]' onClick={handleOpen}>
              <span>Cancel</span>
            </Button>
            <Button variant="filled" type='submit' className='bg-[#051339] font-prompt-normal rounded-sm'>
              <span>Add Job</span>
            </Button>
          </DialogFooter>
        </form>
        <Toaster />

      </Dialog>
      {/* {add skills} */}
      <Dialog
        size="xs"
        open={openSkill}
        handler={handleSkillOpen}
        className="bg-transparent shadow-none rounded-sm">
        <Card className="mx-auto w-full max-w-[24rem] rounded-sm">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="black" className='font-prompt'>
              Add Skills
            </Typography>

            <Typography className="-mb-2 font-prompt ml-[2%]" variant="h6" >
              Select skills
            </Typography>

            <select
              value={addNewSkills}
              onChange={(e) => addOptionalskills(e.target.value)}
              className="!border-black bg-white focus:!border-t-black border-2 w-[95%] ml-[2%] h-12 rounded-sm"
              style={{ paddingLeft: '20px' }}>
              <option value="" disabled hidden>
                {addNewSkills ? '' : 'Select skills'}
              </option>

              {allSkills.map((skills) => (
                <option key={skills.id} value={skills.id} className='font-prompt text-black'>
                  {skills.skills}
                </option>
              ))}
            </select>

            <Typography className="-mb-2 font-prompt ml-[2%]" variant="h6" >
              Add your on skills
            </Typography>
            <input type="text" placeholder='Add your on skills' onChange={(e) => setaddOnNewSkills(e.target.value)} className='border-2 w-[95%] ml-[2%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />

          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="filled" className='bg-[#051339] w-[50%] rounded-sm h-12 mt-3 ml-20' onClick={AddNewOnskills} fullWidth>
              Add skills
            </Button>


          </CardFooter>
        </Card>
        <Toaster />

      </Dialog>
      <Toaster />
    </div>
  )
}

export default CompanyMyItems










