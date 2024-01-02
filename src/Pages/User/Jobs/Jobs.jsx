import React, { useState, useEffect } from 'react';
import { faCaretDown, faRemove, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Menu, MenuHandler, MenuItem, MenuList, Typography, Input } from '@material-tailwind/react';
import { UserCircleIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { JobListUser, JobSearch, Job_ApplicationsListPersonal, SavePostAdd, SavePostDetail, UserProfileDetails } from '../../../Constants/Constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';



function Jobs() {
    const userInfo = useSelector((state) => state.user.userInfo)

    const navigate = useNavigate()
    const [jobList, setjobList] = useState([])
    const [dateFilters, setdateFilters] = useState('')
    const [job_types, setJob_types] = useState('')
    const [jobExperience, setJobExperience] = useState('')
    const [titleSearch, settitleSearch] = useState('')
    const [LocationSearch, setLocationSearch] = useState('')
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDay, setStartDay] = useState(new Date());
    const [manageState, setmanageState] = useState(false)
    const [CheckApplyJobs, setCheckApplyJobs] = useState([])



    const formatPostedDate = (postedDate) => {

        const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
        const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    const SearchJobs = async (keyword) => {
        if (keyword) {
            try {
                if (LocationSearch === '' && job_types === '' && jobExperience === '' && startDay.toISOString() === currentDate.toISOString() && titleSearch !== '' || LocationSearch !== '') {

                    const SearchRequest = await axios.get(`${JobSearch}?search=${keyword}`);
                    setjobList(SearchRequest.data);
                }

                const SearchRequest = await axios.get(`${JobSearch}?search=${titleSearch}&${LocationSearch}&job_type=${job_types}
                &Experience=${jobExperience}&start=${startDay.toISOString()}&end=${currentDate.toISOString()}`);
                setjobList(SearchRequest.data);
            }
            catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
    };

    // search title and loactions
    const handleTitleInputChange = (e) => { settitleSearch(e.target.value); SearchJobs(titleSearch) };
    const handleLocationInputChange = (e) => { setLocationSearch(e.target.value); SearchJobs(LocationSearch) };
    // job_types functions
    const handleRemoteClick = () => { setJob_types('Remote'); };
    const handleOnsiteClick = () => { setJob_types('Onsite'); };
    const handleHybridClick = () => { setJob_types('Hybrid'); };
    //  jobExperience functions
    const handleFresherClick = () => { setJobExperience(0); };
    const handle1_yearsClick = () => { setJobExperience(1); };
    const handle2_yearsClick = () => { setJobExperience(2); };
    const handle3_yearsClick = () => { setJobExperience(3); };
    const handle_morethan3_yearsClick = () => { setJobExperience(4); };
    // search date functions
    const handle_1_Day = () => { const newStartDay = new Date(currentDate); newStartDay.setDate(currentDate.getDate() - 1); setStartDay(newStartDay); setdateFilters('Last 24 Hours'); };
    const handle_3_Day = () => { const newStartDay = new Date(currentDate); newStartDay.setDate(currentDate.getDate() - 3); setStartDay(newStartDay); setdateFilters('Last 3 Days') };
    const handle_7_Day = () => { const newStartDay = new Date(currentDate); newStartDay.setDate(currentDate.getDate() - 7); setStartDay(newStartDay); setdateFilters('Last 7 Days') };
    const handle_14_Day = () => { const newStartDay = new Date(currentDate); newStartDay.setDate(currentDate.getDate() - 14); setStartDay(newStartDay); setdateFilters('Last 14 Days') };
    const handle_All_Day = () => { const newStartDay = new Date(currentDate); newStartDay.setDate(currentDate.getDate() - 364); setStartDay(newStartDay); setdateFilters('All Jobs') };



    useEffect(() => {
        setmanageState(false)
        const response = axios.get(JobListUser).then((response) => {
            setjobList(response.data);
        }).catch((error) => {
            console.error("Error fetching job details:", error);
        });
        axios.get(`${UserProfileDetails}${userInfo.id}/`).then((response) => {
            const Profiledata = response.data[0]
            if (response.status === 200) {
                // console.log(Profiledata.id, '=============================<<<<<<<<<<<>>>>>>>>>>');
                axios.get(`${Job_ApplicationsListPersonal}${Profiledata.id}/`).then((response) => {
                    // const getData = response.data
                    // let obj = {}
                    // let allData = []
                    // for (let applyJobData = 0; applyJobData < response.data.length; applyJobData++) {
                    //     obj = getData[applyJobData]
                    //     allData.push(obj.job_post)
                    // }
                    setCheckApplyJobs(response.data)
                }).catch((error) => {
                    console.error("Error fetching Apply job details:", error);
                });
            }

        }).catch((error) => {
            console.error("Error fetching Apply job details:", error);
        });



    }, [titleSearch, LocationSearch, manageState])


    console.log('Current Date:', currentDate.toISOString());
    console.log('startDay:', startDay.toISOString());

    const savedPost = (event) => {
        axios.get(`${SavePostDetail}${userInfo.id}/`).then((response) => {
            let check = response.data
            let exist = check.find((obj) => obj.job_post.id === event)
            if (exist) {
                toast.error("already saved!")
            }
            else {
                const saveData = {
                    user: userInfo.id,
                    job_post: event
                }
                axios.post(SavePostAdd, saveData).then((response) => {
                    if (response.status === 201) {
                        toast.success('Job Saved')
                    }
                }).catch((error) => {
                    console.error("Error saved details:", error);
                });

            }
        }).catch((error) => {
            console.error("Error fetching saved details:", error);
        });

    }
    const ClearAll = () => {
        setdateFilters('')
        setJob_types('')
        setJobExperience('')
        settitleSearch('')
        setLocationSearch('')
        setmanageState(true)
    }
    const getApplicationStatus = (jobId) => {
        const appliedJob = CheckApplyJobs.find((checkJob) => checkJob.job_post === jobId);
        return appliedJob ? 'Applied' : 'Apply';
    };
    return (
        <div>

            <div className='flex flex-col ml-16 mt-8 justify-center w-[90%]'>
                <Card className=" bg-[#ededed]  rounded-md  shadow-xl shadow-blue-gray-900/2">
                    <div className='  '>
                        <Typography className='font-prompt text-black ml-10 mt-4' variant='h4'> Filter Job Searches</Typography>
                        <div className='flex justify-start gap-10 ml-28'>

                            <input onChange={handleTitleInputChange} type="search" className='w-[30%] h-12 border-[1px] border-black rounded-sm placeholder:text-black placeholder:font-prompt  focus:border-0' placeholder="  Job title or Company" style={{ paddingLeft: '20px' }} />
                            <input onChange={handleLocationInputChange} type="search" className='w-[30%] h-12 border-[1px] border-black rounded-sm  placeholder:text-black placeholder:font-prompt focus:border-0 ' placeholder="   State or City" style={{ paddingLeft: '20px' }} />
                            <div className='flex flex-row gap-2 absolute right-16'>
                                <Button onClick={SearchJobs} className='h-12 bg-[#0A3863] font-prompt text-sm rounded-sm' >Filter</Button>
                                <Button onClick={ClearAll} className='h-12 bg-[#0A3863] font-prompt text-sm rounded-sm' >Clear all</Button>
                            </div>
                        </div>
                        <div className='mb-4 mt-6 ml-28 flex gap-16'>
                            <Menu>
                                <MenuHandler>
                                    <Button className='h-12 bg-[#0A3863] font-prompt text-sm rounded-sm' ><FontAwesomeIcon icon={faCaretDown} className='mr-2 w-4 h-4' />{(dateFilters ? dateFilters : 'Posted Date')}</Button>
                                </MenuHandler>
                                <MenuList className="max-h-72 font-prompt text-black">
                                    <MenuItem onClick={(e) => handle_All_Day()}>All Jobs</MenuItem>
                                    <MenuItem onClick={(e) => handle_1_Day()}>Last 24 Hours</MenuItem>
                                    <MenuItem onClick={(e) => handle_3_Day()}>Last 3 Days</MenuItem>
                                    <MenuItem onClick={(e) => handle_7_Day()}>Last 7 days</MenuItem>
                                    <MenuItem onClick={(e) => handle_14_Day()}>Last 14 days</MenuItem>

                                </MenuList>
                            </Menu>
                            <Menu>
                                <MenuHandler>
                                    <Button className='h-12 bg-[#0A3863] font-prompt text-sm rounded-sm' ><FontAwesomeIcon icon={faCaretDown} className='mr-2 w-4 h-4' />{(jobExperience === 0 ? 'Fresher' : jobExperience > 0 ? jobExperience + ' Years' : 'Experience')}</Button>
                                </MenuHandler>
                                <MenuList className="max-h-72 font-prompt text-black">
                                    <MenuItem onClick={(e) => handleFresherClick()} >Fresher</MenuItem>
                                    <MenuItem onClick={(e) => handle1_yearsClick()} >1 years</MenuItem>
                                    <MenuItem onClick={(e) => handle2_yearsClick()} >2 years</MenuItem>
                                    <MenuItem onClick={(e) => handle3_yearsClick()} >3 years</MenuItem>
                                    <MenuItem onClick={(e) => handle_morethan3_yearsClick()} >3+ years</MenuItem>
                                </MenuList>
                            </Menu>
                            <Menu>
                                <MenuHandler>
                                    <Button className='h-12 bg-[#0A3863] font-prompt text-sm rounded-sm' ><FontAwesomeIcon icon={faCaretDown} className='mr-2 w-4 h-4' /> {(job_types ? job_types : 'Job Type')}</Button>
                                </MenuHandler>
                                <MenuList className="max-h-72 font-prompt text-black">
                                    <MenuItem onClick={(e) => handleHybridClick()} >Hybrid</MenuItem>
                                    <MenuItem onClick={(e) => handleOnsiteClick()} >Onsite</MenuItem>
                                    <MenuItem onClick={(e) => handleRemoteClick()} >Remote</MenuItem>

                                </MenuList>
                            </Menu>

                        </div>


                    </div>
                </Card>

                <Card className="bg-[#ededed] rounded-md shadow-xl mt-8 shadow-blue-gray-900/2" >
                    <Typography className='font-prompt text-black ml-10 mt-4' variant='h4'>Job List</Typography>
                    {jobList.map((job, index) => (
                        <Card className='ml-16 flex flex-row mb-3 rounded-md w-[90%] mt-5 justify-between' key={index}>




                            <div className=' flex gap-2'>
                                <div>
                                    {(job.company.user.profile_image ? <img src={job.company.user.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
                                        <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-4 " />)}
                                </div>
                                <div >
                                    <Typography onClick={() => navigate('/jobview', { state: { data: job.id } })} className='mt-2 font-prompt text-xl text-black hover:cursor-pointer hover:text-[#4e576f] '>{job.Job_title}</Typography>
                                    <Typography className='font-prompt text-lg text-black'>{job.company.company_name}</Typography>
                                    <Typography className='font-prompt text-sm text-black'>{job.company.Location}</Typography>
                                    <Typography className='font-prompt text-sm text-black'>Jobtype : {job.job_type}</Typography>
                                    <Typography className='font-prompt text-sm text-black'>Salary : {job.salary}</Typography>
                                    <Typography className='font-prompt text-sm text-black mb-1'>Posted Date : {formatPostedDate(job.posted_date)}</Typography>
                                    <div onClick={() => navigate('/jobview', { state: { data: job.id } })} className='font-prompt-normal text-sm text-white hover:cursor-pointer w-20 mb-1 rounded-sm  bg-[#0A3863] hover:bg-[#777778]' >
                                        <Typography style={{paddingLeft: '10px'}}>{getApplicationStatus(job.id)}</Typography>

                                    </div>
                                </div>

                            </div>
                            <div className='mr-10'>
                                <FontAwesomeIcon onClick={(e) => savedPost(job.id)} className='mt-10 mr-20 h-6 text-[#051339] hover:cursor-pointer hover:text-[#4e576f] font-prompt-normal' icon={faSave} />
                                {/* <FontAwesomeIcon className='mt-10 h-6 text-[#051339] hover:cursor-pointer hover:text-[#4e576f] font-prompt-normal' icon={faRemove} /> */}
                            </div>
                        </Card>
                    ))}
                </Card>

            </div>
            <Toaster />
        </div>
    )
}

export default Jobs





// SearchJobs('?job_type=remote');
// ?search=
// ?job_type=Hybrid&search=broto