import { faEdit, faEllipsisVertical, faEye, faFilePdf, faRemove, faSave, faSuitcase, faTrash, faPlus, faAdd, faUpload, faFlag, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, CardBody, Dialog, DialogFooter, DialogHeader, Menu, MenuHandler, MenuItem, MenuList, Typography, CardFooter, DialogBody, } from '@material-tailwind/react'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { EmployeeProfileUpdate, JobApplicationsAdd, JobUserView, Job_ApplicationsListPersonal, ListPersonalEducation, ListPersonalSkills, ListRequiredSkills, List_Skills, PersonalSkillsAdd, RemovePersonalSkills, ReportJobPostAdd, UserProfileDetails } from '../../../Constants/Constants'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import PdfHelper from '../../../Helpers/PdfHelper';


pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url,).toString();
// import { useSelector } from 'react-redux'

function JobView() {

    // const CompanyDetails = useSelector((state) => state.company.companyInfo)
    const userInfo = useSelector((state) => state.user.userInfo);

    const location = useLocation()
    const navigate = useNavigate()
    const job_id = location.state.data || ''
    const [jobViews, setJobViews] = useState([])
    const [CompanyDetails, setCompanyDetails] = useState([])
    const [RequiredJobSkills, setRequiredJobSkills] = useState([])
    const [RequiredSkills, setRequiredSkills] = useState([])
    const [UserProfile, setUserProfile] = useState([])
    const [editManage, setEditManage] = useState(false);
    const [userData, setUserData] = useState([]);
    const fileInputCVRef = useRef(null);

    //modal apply job  
    const [addEducationopen, setaddEducationopen] = useState(false);
    const handleOpenAddEducation = () => setaddEducationopen(!addEducationopen);
    const [removeskillsManage, setRemoveskillsManage] = useState(false);
    const handleRemove = () => setRemoveskillsManage(!removeskillsManage);
    const [expriance, setExpriance] = useState('')
    const [description, setDescription] = useState(null)
    const [currentCtc, setcurrentCtc] = useState('')
    const [ExpetedCtc, setExpetedCtc] = useState('')

    // there is want to if condition  if job id show this page or else render to back page  not now want later
    //report
    const [Reportopen, setreportOpen] = useState(false);
    const ReporthandleOpen = () => setreportOpen(!Reportopen);
    const [ReportText, setReportText] = useState('')
    //cv
    const [Cvopen, setCvOpen] = React.useState(false);
    const CvViewOpen = () => setCvOpen((cur) => !cur);
    // skills
    const [addOnNewSkills, setaddOnNewSkills] = useState('')
    const [profileAllSkills, setprofileAllSkills] = useState([])
    const [profileAllSkillsid, setprofileAllSkillsid] = useState([])
    const [allSkills, setAllSkills] = useState([])
    const [currentStep, setCurrentStep] = useState(1);
    const [openSkill, setSkillOpen] = useState(false);
    const [manageApplyButton, setManageApplyButton] = useState(false)
    const [ReportManage, setReportManage] = useState(false)
    const handleSkillOpen = () => setSkillOpen((cur) => !cur);

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };
    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };


    const formatPostedDate = (postedDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }; //  hour: 'numeric', minute: 'numeric', second: 'numeric'
        const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    // console.log(job_id, 'hllllllllllllllllo');
    useEffect(() => {
        const response = axios.get(`${JobUserView}${job_id}/`).then((response) => {
            setJobViews(response.data);
            setCompanyDetails(response.data.company)

        }).catch((error) => {
            console.error("Error fetching job details:", error);
        });
        axios.get(`${ListRequiredSkills}${job_id}/`).then((response) => {
            setRequiredJobSkills(response.data);
        }).catch((error) => {
            console.error("Error fetching job details:", error);
        });

    }, [])


    useEffect(() => {
        setEditManage(false)
        if (userInfo) {
            const userData = axios.get(`${UserProfileDetails}${userInfo.id}/`).then((response) => {
                let userprofiledata = response.data
                if (userprofiledata.length > 0) {
                    let { user } = response.data[0]
                    setUserData(user)
                    let profile = response.data[0]
                    if (profile.cv_file) {
                        let temp = profile.cv_file;
                        temp = temp.substring(0, 4) + "s" + temp.substring(4);
                        profile.cv_file = temp
                    }
                    setUserProfile(profile)
                    axios.get(`${ListPersonalSkills}${response.data[0].id}/`).then((response) => {
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

                        setprofileAllSkills(objskill)
                        setprofileAllSkillsid(objskillid)
                    }).catch((error) => {
                        console.error("Error fetching job details:", error);
                    });
                    axios.get(List_Skills).then((response) => {
                        setAllSkills(response.data)
                    }).catch((error) => {
                        console.log(error, 'error get skills');

                    })
                    axios.get(`${Job_ApplicationsListPersonal}${response.data[0].id}/`).then((response) => {

                        const CheckApplyJobs = response.data
                        const appliedJob = CheckApplyJobs.find((checkJob) => checkJob.job_post === job_id);
                        if (appliedJob) {
                            setManageApplyButton(true)
                        }

                    }).catch((error) => {
                        console.error("Error fetching Apply job details:", error);
                    });

                    axios.get(ReportJobPostAdd).then((response) => {

                        const CheckReportJobs = response.data
                        const ReportingJob = CheckReportJobs.find((reportjob) => reportjob.Post === job_id);
                        if (ReportingJob) {
                            setReportManage(true)
                        }

                    }).catch((error) => {
                        console.error("Error fetching Apply job details:", error);
                    });

                }
            })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [editManage]);





    const removeCV = () => {
        if (UserProfile.cv_file) {
            const remove_cv_file = {
                cv_file: null
            }
            axios.patch(`${EmployeeProfileUpdate}${UserProfile.id}/`, remove_cv_file).then((response) => {
                if (response.status === 200) {
                    setEditManage(true)
                    toast.success('Your CV removed !');
                }
            }).catch((error) => {
                if (error.response.data.cv_file[0]) {
                    toast.error(error.response.data.cv_file[0]);
                }
            })
        } else {
            toast.error('No CV');
        }
    }
    const updateCV = (event) => {
        console.log('hello', event.target.files[0]);
        const file = event.target.files[0];
        if (file.type === "application/pdf") {
            // console.log(true);
            const AddCV = new FormData();
            AddCV.append('cv_file', file);
            axios.patch(`${EmployeeProfileUpdate}${UserProfile.id}/`, AddCV).then((response) => {
                if (response.status === 200) {
                    setEditManage(true)
                    toast.success(' Your CV Updated !');
                }
            }).catch((error) => {
                if (error.response.data.cv_file[0]) {
                    toast.error(error.response.data.cv_file[0]);
                }
            })
        }
        else {
            // console.log(false)
            toast.error(' CV should be Pdf file !');
        }
    }

    const HandleCV = () => {
        fileInputCVRef.current.click();
    }


    const AddNewOnskills = () => {
        const addOnskill = {
            skills: addOnNewSkills
        }
        try {
            axios.post(List_Skills, addOnskill).then((response) => {
                if (response.status === 201) {
                    const res = response.data
                    setprofileAllSkills([...profileAllSkills, res])
                    setprofileAllSkillsid([...profileAllSkillsid, res.id])
                    toast.success('Your On skill Added');
                    const addOnskill = {
                        skills: res.id,
                        profile: UserProfile.id
                    }
                    try {
                        axios.post(PersonalSkillsAdd, addOnskill).then((response) => {
                            if (response.status === 201) {
                                const res = response.data
                                setprofileAllSkills([...profileAllSkills, res])
                                setprofileAllSkillsid([...profileAllSkillsid, res.id])
                                // toast.success(' Skill Added');
                            }
                        }).catch((error) => {
                            if (error.response.data.skills) {
                                toast.error('This skill already there!');
                            }
                        });
                    } catch (error) {
                        console.log('error add skills', error);
                    }
                }
            }).catch((error) => {
                if (error.response.data.skills) {
                    toast.error('This skill already there!');
                }
            });
        } catch (error) {
            console.log('error add skills', error);
        }
        setEditManage(true)
        handleSkillOpen()
    }

    const addOptionalskills = (value) => {
        const exist = profileAllSkills.find((obj) => obj.id === parseInt(value))
        if (exist) {
            toast.error(' This skill already enterd!')
        } else {
            console.log(value, 'check skills id true');
            const addOnskill = {
                skills: parseInt(value),
                profile: UserProfile.id
            }
            try {
                axios.post(PersonalSkillsAdd, addOnskill).then((response) => {
                    if (response.status === 201) {
                        const res = response.data
                        toast.success(' Skill Added');
                    }
                }).catch((error) => {
                    if (error.response.data.skills) {
                        toast.error('This skill already there!');
                    }
                });
            } catch (error) {
                console.log('error add skills', error);
            }
            setEditManage(true)
            handleSkillOpen()
        }
    }
    const removeSelectedSkills = (skills) => {
        console.log(skills, 'helllllloooomanog');
        try {
            axios.delete(`${RemovePersonalSkills}${parseInt(skills)}/`,).then((response) => {
                if (response.status === 204) {
                    toast.success(' Skill Removed!');

                    setEditManage(true)
                }
            }).catch((error) => {
                if (error.response.data.skills) {
                    toast.error('error!!');
                }
            });
        } catch (error) {
            console.log('error add skills', error);
        }

        setprofileAllSkillsid(profileAllSkillsid.filter((obj) => parseInt(obj) !== skills))
        setprofileAllSkills(profileAllSkills.filter((obj2) => obj2.id !== skills))
    }

    const ApplyJobHandle = () => {

        let Cv_file = null
        const formData = new FormData();

        if (UserProfile.cv_file) {
            fetch(fileUrl)
                .then((response) => response.blob())
                .then((blob) => {
                    const Cv_file = new File([blob], { type: 'application/pdf' });
                })

            formData.append('cv_file', Cv_file);

        }
        formData.append('profile',UserProfile.id);
        formData.append('job_post',job_id);
        formData.append('Experience',expriance);
        formData.append('currentSalary',currentCtc);
        formData.append('ExpectedSalary',ExpetedCtc);
        formData.append('description',description);



        // const postData = {
        //     profile: UserProfile.id,
        //     job_post: job_id,
        //     Experience: expriance,
        //     currentSalary: currentCtc,
        //     ExpectedSalary: ExpetedCtc,
        //     description: description,
        // }


        // console.log('postdata data:', postData);
        const validateForm = () => {
            if (expriance === "") {
                toast.error('Experience should not be empty!');
                return false;
            }
            else if (currentCtc === "") {
                toast.error('Current CTC Should not be empty!');
                return false;
            }
            else if (ExpetedCtc === "") {
                toast.error('Expeted CTC should not be empty!');
                return false;
            }
            return true;
        };

        if (validateForm()) {
            try {
                axios.post(JobApplicationsAdd, formData)
                    .then((response) => {
                        const responseData = response.data
                        console.log(response, 'respose Apply Job add');
                        console.log(responseData, 'respose job adddataa');
                        if (response.status === 201) {
                            toast.success('Job Apply successfully!')
                            navigate('/applyjob', { state: { data: userInfo.email } })

                        }
                    })

            } catch (error) {
                console.error('Error during JOb add:', error);
                toast.error(error);
            }
            handleOpenAddEducation()
        }
    }

    const ReportJob = () => {
        const postDatas = {
            user: userInfo.id,
            Post: job_id,
            Reason: ReportText
        }
        if (ReportText) {

            try {
                axios.post(ReportJobPostAdd, postDatas)
                    .then((response) => {
                        if (response.status === 201) {
                            toast.success('Your Job Reported has been Recived!')
                        }
                    }).catch((error) => {
                        toast.error('error!!');
                    });

            } catch (error) {
                console.error('Error during ReportJobPostAdd:', error);
                toast.error(error);
            }
            setEditManage(true)
            ReporthandleOpen()
        } else {
            toast.error('Text field canout empty!')
        }

    }


    return (
        <div className='flex justify-center'>
            <Card className='bg-[#e7e7e7] rounded-md w-[90%] mt-10   '>

                <div className='xl:ml-28 lg:ml-24 2xl:28 sm:ml-6 md:ml-8 ml-8 mt-6 mb-3 '>
                    <Card className='bg-[#FAFAFA] shadow-2xl mt-2  rounded-md w-[90%]'>
                        <div style={{ borderBottom: '1px solid #9da3a3' }} className='h-16'>
                            <Typography className='font-prompt text-2xl text-center ml-6 mt-1 text-black'>JobOverView</Typography>
                        </div>
                        <div className='flex justify-between'>

                            <Typography className='font-prompt text-lg ml-6 mt-1 text-black'>{jobViews.Job_title}</Typography>
                            {(manageApplyButton ? (ReportManage ? '' : <Menu>
                                <MenuHandler>
                                    <FontAwesomeIcon icon={faEllipsisVertical} color='#051339' className=' w-5 h-5 mt-3  rounded-full hover:text-[#000000]   mr-4 hover:bg-gray-600 hover:bg-opacity-20 hover:cursor-pointer ' />
                                </MenuHandler>
                                <MenuList className="max-h-72">
                                    <MenuItem onClick={ReporthandleOpen} className='text-black font-prompt'><FontAwesomeIcon icon={faFlag} color='#051339' className='mr-4' />Report</MenuItem>
                                    {/* <MenuItem className='text-black font-prompt'><FontAwesomeIcon icon={faRemove} color='#051339' className='mr-4' />Not Interested</MenuItem> */}
                                </MenuList>
                            </Menu>) : '')}
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
                            <h1>Applications : {jobViews.ApplicationCount}</h1>

                            {(manageApplyButton ? <Button disabled className='bg-[#6b6b6c] w-28 h-10 ml-[33%] hover:bg-[#46484e] font-prompt'>Applied</Button> : <Button onClick={handleOpenAddEducation} className='bg-[#051339] w-28 h-10 ml-[33%] hover:bg-[#1c284a] font-prompt'>Apply Job</Button>)}
                        </div>

                    </Card>

                    <Card className='bg-[#FAFAFA] shadow-2xl mt-2 mb-2  rounded-md w-[90%]'>
                        <div className='m-6 font-prompt'>
                            <Typography className='font-prompt text-lg  mb-1 '  >About The Job </Typography >
                            <h1>Company name :{CompanyDetails.company_name} </h1>
                            <h1>Location : {CompanyDetails.Location}</h1>
                            <h1>Job Title : {jobViews.Job_title}</h1>
                            <h1>Experiance : {(jobViews.Experience === 0 ? 'Fresher' : jobViews.Experience + 'Years')}</h1>
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
                            {RequiredJobSkills.map((skills) => (
                                < div key={skills.id} className='font-prompt text-black flex flex-row mb-4 mt-4 '>
                                    <div className='bg-[#cacbcb] border-[1px] border-black flex gap-1 rounded-md text-black'><p className='font-prompt ml-1 mr-1'> {skills.skills.skills}</p></div>
                                </div>
                            ))}
                        </div>

                    </Card>
                </div>


            </Card>

            {/* {Add Education modal} */}
            <Dialog
                open={addEducationopen}
                handler={handleOpenAddEducation}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 1, y: -100 },
                }}>
                {/* <form onSubmit={(e) => AddEducationform(e)}> */}

                <DialogHeader className='font-prompt text-black'>Apply Job</DialogHeader>
                {(currentStep === 1 && (
                    <div className='flex flex-col gap-4'>

                        <input type="text" placeholder=' Full name' disabled value={userData.username} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                            border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                        <input type="text" placeholder=' Email' disabled value={userData.email} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                            border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                        <input type="text" placeholder='Phone number' disabled value={userData.phone_number} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                            border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                        <div className=' shadow-2xl border-[1px] text-center font-prompt ml-6 w-[90%]   text-black text-lg border-[#000000] top-80 rounded-sm'>
                            <div className='flex flex-row justify-between mt-1 ml-4'>
                                <FontAwesomeIcon icon={faFilePdf} color='#051339' className='w-6 h-12' />
                                <h1 className='mt-2'>{(UserProfile.cv_file ? <div onClick={CvViewOpen} className='flex flex-row gap-10 bg-[#dfdbdb] hover:cursor-pointer hover:bg-[#b6b3b3] rounded-sm '><h1 className='ml-2' >view your cv </h1><FontAwesomeIcon icon={faEye} color='#051339' className=' w-6 h-8 mr-2' /></div> : <div onClick={HandleCV} className='flex flex-row gap-10 bg-[#dfdbdb] hover:cursor-pointer hover:bg-[#b6b3b3] rounded-sm '><h1 className='ml-2' >upload your cv </h1><FontAwesomeIcon icon={faUpload} color='#051339' className=' w-6 h-8 mr-2' /></div>)}</h1>
                                <div>
                                    <FontAwesomeIcon onClick={removeCV} title='Remove your CV' icon={faTrash} color='#051339' className='mr-2 mt-2 hover:text-[#403f3f] bg-white border-4 border-white  hover:cursor-pointer' />
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputCVRef}
                                style={{ display: 'none' }}
                                onChange={updateCV}
                            />
                        </div>
                        <div className='bg-[#FAFAFA] shadow-2xl py-2 px-5 font-prompt ml-6 w-[90%]   text-black text-lg border-[#000000] top-80 rounded-sm  '>
                            <div className='flex flex-row gap-5 mb-4'>
                                <Typography className='font-prompt text-lg'>Your Skills</Typography>
                                <p onClick={handleSkillOpen} ><FontAwesomeIcon icon={faPlus} color='#051339' className=' hover:text-[#403f3f] bg-white border-4 border-white  hover:cursor-pointer' title='Add Skill' /></p>
                                <p onClick={handleRemove}><FontAwesomeIcon icon={faTrash} color='#051339' className=' hover:text-[#403f3f] bg-white border-4 border-white  hover:cursor-pointer' title='Remove Skill' /></p>

                            </div>


                            <div className='flex flex-row  max-w-[90%] gap-1  '>
                                {RequiredSkills.map((skills) => (
                                    < div key={skills.id} className='font-prompt text-black text-xs flex flex-row mb-4 mt-4  '>
                                        <div className='bg-[#cacbcb] border-[1px] border-black flex gap-1 rounded-md capitalize text-black'><p className='font-prompt ml-1 mr-1'>{skills.skills.skills} </p>
                                            {(removeskillsManage && <FontAwesomeIcon icon={faRemove} onClick={(e) => removeSelectedSkills(skills.id)} className='mr-1 mt-[2px] hover:opacity-50 hover:cursor-pointer' />)}
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </div>

                        <DialogFooter>
                            <Button variant="text" className='bg-[#d9dbdb] font-prompt-normal mr-1 text-black hover:bg-[#a4a4a4]' onClick={handleOpenAddEducation}>
                                <span>Cancel</span>
                            </Button>
                            <Button variant="filled" onClick={handleNext} className='bg-[#051339] font-prompt-normal'>
                                <span>Next </span>
                            </Button>
                        </DialogFooter>
                    </div>



                ))}
                {(currentStep === 2 && (
                    <div className='flex flex-col gap-4'>
                        <input type="number" placeholder='How many years of experience do you have? (in years)' value={expriance} onChange={(e) => setExpriance(e.target.value)} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                            border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                        <input type="number" placeholder=' What is Your expected CTC? (in LPA)' value={ExpetedCtc} onChange={(e) => setExpetedCtc(e.target.value)} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                            border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                        <input type="number" placeholder=' What is Your Current CTC? (in LPA)' value={currentCtc} onChange={(e) => setcurrentCtc(e.target.value)} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                            border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                        <textarea placeholder='Cover Letter (optional)' value={description} onChange={(e) => setDescription(e.target.value)} className='border-2 w-[90%] ml-[4%] h-20 rounded-sm border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                        <DialogFooter>
                            <Button onClick={handleBack} variant="text" className='bg-[#d9dbdb] font-prompt-normal mr-1 text-black hover:bg-[#a4a4a4]' >
                                <span>Back</span>
                            </Button>
                            <Button onClick={ApplyJobHandle} variant="filled" className='bg-[#051339] font-prompt-normal'>
                                <span>Apply </span>
                            </Button>
                        </DialogFooter>
                    </div>
                ))}


                <Toaster />

                {/* </form> */}
                {/* cv view modal */}
                <div>
                    <Dialog size="md" open={Cvopen} handler={CvViewOpen} className="bg-transparent border-none border-0 shadow-none  rounded-none " style={{ position: 'absolute', top: '0', }}>
                        <Card style={{ maxHeight: '670px', overflowY: 'auto' }} className='rounded-none border-0'>
                            <PdfHelper cvFileUrl={UserProfile.cv_file} />
                        </Card>
                    </Dialog>
                </div>

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
                                onChange={(e) => addOptionalskills(e.target.value)}
                                className="!border-black bg-white focus:!border-t-black border-2 w-[95%] ml-[2%] h-12 rounded-sm"
                                style={{ paddingLeft: '20px' }}>
                                <option value="" disabled hidden>
                                    {'Select skills'}
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
            </Dialog>
            < div >

                <Dialog open={Reportopen} size="xs" handler={ReporthandleOpen}>
                    <div className="flex items-center justify-between">
                        <DialogHeader className="flex flex-col items-start">
                            {" "}
                            <Typography className="mb-1" variant="h4">
                                Report
                            </Typography>
                        </DialogHeader>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-3 h-5 w-5"
                            onClick={ReporthandleOpen}
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <DialogBody>

                        <div className="grid gap-6">

                            <textarea label="Message" className='h-28 border-[1px] border-black font-prompt text-black' value={ReportText} onChange={(e) => setReportText(e.target.value)} placeholder='Enter your Reporting Reason' style={{ paddingLeft: '10px' }} />
                        </div>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <Button variant="text" className="bg-[#7c7c7d] font-prompt-normal text-black" onClick={ReporthandleOpen}>
                            cancel
                        </Button>
                        <Button variant="filled" className="bg-[#051339] font-prompt-normal hover:bg-[#233156]" onClick={ReportJob}>
                            Report
                        </Button>
                    </DialogFooter>
                    <Toaster />

                </Dialog>
            </div >

            <Toaster />
        </div>
    )
}

export default JobView





