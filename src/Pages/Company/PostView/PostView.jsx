import { faEdit, faEllipsisVertical, faPlus, faRemove, faSuitcase, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Menu, MenuHandler, MenuItem, MenuList, Button, Typography, Dialog, DialogHeader, DialogFooter, CardBody, CardFooter, } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Company_Profile, JobSkillsAdd, JobUpdate, ListRequiredSkills, List_Skills, UpdateJobSkills } from '../../../Constants/Constants'
import axios from 'axios'
import { useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { AllJobType } from '../../../Helpers/JobType';
import { AllExperiance } from '../../../Helpers/Experiance';



function PostView() {
    const userDetails = useSelector((state) => state.user.userInfo)
    const location = useLocation()
    const navigate = useNavigate()
    const job_id = location.state.data || ''
    const [jobViews, setJobViews] = useState([])
    const [CompanyDetail, setCompanyDetail] = useState([])
    const [RequiredSkills, setRequiredSkills] = useState([])

    // there is want to if condition  if job id show this page or else render to back page  not now want later

    const [jobAllSkills, setJobAllSkills] = useState([])
    const [jobAllSkillsid, setJobAllSkillsid] = useState([])
    const [allSkills, setAllSkills] = useState([])
    const [addNewSkills, setaddNewSkills] = useState('')
    const [addOnNewSkills, setaddOnNewSkills] = useState('')
    const [open, setOpen] = useState(false);
    const [openSkill, setSkillOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const handleSkillOpen = () => setSkillOpen((cur) => !cur);

    // edit states
    const [JobExperiance, setJobExperiance] = useState('')
    const [JobType, setJobType] = useState('')
    const [Jobtitle, setJobtitle] = useState('')
    const [salary, setsalary] = useState('')
    const [openings, setOpenings] = useState('')
    const [Description, setDescription] = useState('')
    const [updateSkills, setUpdateSkills] = useState([])
    const [ManageState, setManageState] = useState(false)



    const formatPostedDate = (postedDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }; //  hour: 'numeric', minute: 'numeric', second: 'numeric'
        const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
        return formattedDate;
    };


    useEffect(() => {
        setManageState(false)
        axios.get(`${Company_Profile}${userDetails.id}/`).then((response) => {
            setCompanyDetail(response.data[0])
        }).catch((error) => {
            console.error("Error fetching company details:", error);
        })
        axios.get(`${JobUpdate}${job_id}/`).then((response) => {
            setJobViews(response.data);
            setJobExperiance(response.data.Experience);
            setJobType(response.data.job_type);
            setJobtitle(response.data.Job_title);
            setDescription(response.data.job_description);
            setsalary(response.data.salary)
            setOpenings(response.data.Openings)

        }).catch((error) => {
            console.error("Error fetching job details:", error);
        });
        axios.get(`${ListRequiredSkills}${job_id}/`).then((response) => {
            setRequiredSkills(response.data);
            console.log('finaljob skills get', response.data);
            const oldskill = response.data
            let obj = {}
            const updateskill = []
            const objskill = []
            const objskillid = []
            for (let skill = 0; skill < response.data.length; skill++) {
                obj = oldskill[skill]
                updateskill.push(obj.id)
                objskill.push(obj.skills)
                objskillid.push(obj.skills.id)
            }
            setUpdateSkills(updateskill)
            setJobAllSkills(objskill)
            setJobAllSkillsid(objskillid)
        }).catch((error) => {
            console.error("Error fetching job details:", error);
        });
        axios.get(List_Skills).then((response) => {
            setAllSkills(response.data)
        }).catch((error) => {
            console.log(error, 'error get skills');

        })
    }, [ManageState])

    const deletePost = (e) => {
        const data = {
            is_available: false
        }
        axios.patch(`${JobUpdate}${job_id}/`, data).then((response) => {
            navigate('/company/myitems')
            // toast.success('Job Post Deleted!',5000)
        }).catch((error) => {
            console.error("Error fetching remove details:", error);
        });
        console.log('lotta delete', e);
    }

    const addOptionalskills = (value) => {
        const exist = jobAllSkills.find((obj) => obj.id === parseInt(value))
        // console.log(exist,'exist');
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
                // console.error("Error fetching skills add details:", error);
            });
        } catch (error) {

            console.log('error add skills', error);
        }
        handleSkillOpen()
    }

    const removeSelectedSkills = (skills) => {
        console.log('ashique value', skills);

        setJobAllSkillsid(jobAllSkillsid.filter((obj) => parseInt(obj) !== skills))
        setJobAllSkills(jobAllSkills.filter((obj2) => obj2.id !== skills))

    }

    const updateJob = () => {
        const postdata = {
            company: CompanyDetail.id,
            Job_title: Jobtitle,
            Experience: JobExperiance,
            job_type: JobType,
            salary: salary,
            Openings: openings,
            job_description: Description,
        }
        console.log('postdata data:', postdata);
        const validateForm = () => {
            if (Jobtitle === "") {
                toast.error('Job title should not be empty!');
                return false;
            }
            else if (salary === "") {
                toast.error('salary Should not be empty!');
                return false;
            }
            else if (openings === "") {
                toast.error('Openings should not be empty!');
                return false;
            }
            else if (Description === "") {
                toast.error('Description should not be empty!');
                return false;
            }
            return true;
        };

        if (validateForm()) {
            try {
                axios.patch(`${JobUpdate}${job_id}/`, postdata)
                    .then((response) => {
                        const responseData = response.data
                        console.log(response, 'respose job add');
                        console.log(responseData, 'respose job adddataa');
                        if (response.status === 200) {
                            toast.success('Job Updated successfully!')
                            if (updateSkills.length > 0) {
                                try {
                                    for (let skill = 0; skill < updateSkills.length; skill++) {
                                        let skill_id = updateSkills[skill]
                                        axios.delete(`${UpdateJobSkills}${skill_id}/`);
                                    }
                                    setUpdateSkills([])
                                }
                                catch (error) {
                                    console.error('Error during SKill update:', error);
                                    toast.error(error);
                                }
                            }
                            if (jobAllSkillsid.length > 0) {
                                try {

                                    for (let skill = 0; skill < jobAllSkillsid.length; skill++) {
                                        let skillData = {
                                            Job_post: job_id,
                                            skills: jobAllSkillsid[skill]
                                        }
                                        axios.post(JobSkillsAdd, skillData);
                                    }
                                    setJobAllSkillsid([])
                                    setJobAllSkills([])
                                } catch (error) {
                                    console.error('Error during SKill add:', error);
                                    toast.error(error);
                                }
                            }
                        }
                    });
            } catch (error) {
                console.error('Error during JOb add:', error);
                toast.error(error);
            }
            setManageState(true)
            handleOpen()
        }
    }

    return (
        <div className='flex justify-center'>
            <Card className='bg-[#e7e7e7] rounded-md w-[90%] mt-10   '>

                <div className='xl:ml-28 lg:ml-24 2xl:28 sm:ml-6 md:ml-8 ml-8 mt-6 mb-3 '>
                    <Card className='bg-[#FAFAFA] shadow-2xl mt-2  rounded-md w-[90%]'>
                        <div className='flex justify-between'>
                            <Typography className='font-prompt ml-6 mt-2 text-black' variant='h4'>{jobViews.Job_title}</Typography>
                            <Menu>
                                <MenuHandler>
                                    <FontAwesomeIcon icon={faEllipsisVertical} color='#051339' className=' w-5 h-5 mt-3  rounded-full hover:text-[#000000]   mr-4 hover:bg-gray-600 hover:bg-opacity-20 hover:cursor-pointer ' />
                                </MenuHandler>
                                <MenuList className="max-h-72">
                                    <MenuItem onClick={(e) => deletePost(jobViews.id)} className='text-black font-prompt'><FontAwesomeIcon icon={faRemove} color='#051339' className='mr-4' />Closed</MenuItem>
                                    <MenuItem onClick={handleOpen} className='text-black font-prompt'><FontAwesomeIcon icon={faEdit} color='#051339' className='mr-4' />Edit</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                        <Typography className='font-prompt ml-6 text-black ' variant='h5'>{CompanyDetail.company_name}</Typography>
                        <Typography className='font-prompt text-md ml-6 '>{CompanyDetail.Location}</Typography>

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
                        <div className='m-6 font-prompt flex flex-col gap-2'>
                            <Typography className='font-prompt text-lg  mb-1 '  >About The Job </Typography >
                            <h1>Company name :{CompanyDetail.company_name} </h1>
                            <h1>Location : {CompanyDetail.Location}</h1>
                            <h1>Job Title : {jobViews.Job_title}</h1>
                            <h1>Experiance : {(jobViews.Experience === 0 ? 'Fresher' : jobViews.Experience + ' Years')}</h1>
                            <h1>job type : {jobViews.job_type}</h1>
                            <h1>salary : {jobViews.salary}</h1>
                            <h1 >posted date : {formatPostedDate(jobViews.posted_date)}</h1>

                        </div>
                    </Card>
                    <Card className='bg-[#FAFAFA] shadow-2xl mt-2 mb-2  rounded-md w-[90%]'>
                        <div className='m-6 font-prompt'>
                            <Typography className='font-prompt text-lg mb-1'>Job Discription </Typography>

                            <h1 >{jobViews.job_description}</h1>

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
            <div>

                {/* {add job modal} */}
                <Dialog className='w-full rounded-sm'
                    open={open}
                    size={'lg'}
                    // handler={handleOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 1, y: -100 },
                    }}>


                    <DialogHeader className='font-prompt text-black'>Edit Job</DialogHeader>
                    <div className='flex flex-col gap-4 '>
                        <input type="text" placeholder='Job Title' name='Job_title' value={Jobtitle} onChange={(e) => setJobtitle(e.target.value)} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
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


                            <input type="text" placeholder='Salary eg: 0 - 1000' name='salary' value={salary} onChange={(e) => setsalary(e.target.value)} className='border-2 2xl:w-[40%] xl:w-[40%] lg:w-[39%] md:w-[38%] sm:w-[35%] w-[34%] h-12 rounded-sm
                      border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                        </div>
                        <input type="number" placeholder='Opengins (In numbers)' name='openings' value={openings} onChange={(e) => setOpenings(e.target.value)} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                      border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                        <div type="text" placeholder='Skills' className='border-2 w-[90%] ml-[4%] h-28 rounded-sm
                      border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} >
                            <label >Skills:-</label>
                            <Button onClick={handleSkillOpen} className='bg-[#051339] mt-1 absolute rounded-sm 2xl:left-[86%] xl:left-[85%] lg:left-[84%] md:left-[80%] sm:left-[76%] left-[71%] '><FontAwesomeIcon icon={faPlus} /></Button>
                            <div className='flex flex-row gap-2  '>
                                {jobAllSkills.map((skills) => (
                                    < div key={skills.id} value={skills.id} className='font-prompt text-black flex flex-row '>
                                        <div className='bg-[#cacbcb] border-[1px] border-black flex gap-1 rounded-sm text-black'>   <p className='font-prompt ml-1'> {skills.skills}</p>  </div>
                                    </div>
                                ))}
                            </div>



                        </div>

                        <textarea type="text" placeholder='Job Description' name='Description' value={Description} onChange={(e) => setDescription(e.target.value)} className='border-2 w-[90%] ml-[4%] h-28 rounded-sm
                      border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />

                    </div>
                    <DialogFooter>
                        <Button variant="text" className='bg-[#d9dbdb] font-prompt-normal mr-1 rounded-sm text-black hover:bg-[#a4a4a4]' onClick={handleOpen}>
                            <span>Cancel</span>
                        </Button>
                        <Button variant="filled" onClick={updateJob} className='bg-[#051339] font-prompt-normal rounded-sm'>
                            <span>Update Job</span>
                        </Button>
                    </DialogFooter>

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

            </div>

        </div>
    )
}

export default PostView







