import React, { useState, useEffect } from 'react';
import { faCaretDown, faRemove, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Menu, MenuHandler, MenuItem, MenuList, Typography, Input } from '@material-tailwind/react';
import { UserCircleIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { JobListUser, JobSearch } from '../../../Constants/Constants';
import { useNavigate } from 'react-router-dom';



function Jobs() {
    
    const navigate = useNavigate()
    const [jobList, setjobList] = useState([])
    const [dateFilters, setdateFilters] = useState('')
    const [job_types, setJob_types] = useState('')
    const [jobExperience, setJobExperience] = useState('')
    const [titleSearch, settitleSearch] = useState('')
    const [LocationSearch, setLocationSearch] = useState('')
    const formatPostedDate = (postedDate) => {

        const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
        const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    const SearchJobs = async (keyword) => {
        if (keyword) {
            try {
                // ?search=
                // ?job_type=Hybrid&search=broto
                const SearchRequest = await axios.get(`${JobSearch}?search=${titleSearch}&${LocationSearch}&job_type=${job_types}&Experience=${jobExperience}`);
                setjobList(SearchRequest.data);
            }
            catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
    };


    // job_types functions

    const handleRemoteClick = () => {
        // SearchJobs('?job_type=remote');
        setJob_types('remote');
    };
    const handleOnsiteClick = () => {
        // SearchJobs('?job_type=onsite');
        setJob_types('onsite');
    };
    const handleHybridClick = () => {
        // SearchJobs('?job_type=Hybrid');
        setJob_types('Hybrid');
    };


    //  jobExperience functions

    const handleFresherClick = () => {
        // SearchJobs('?Experience=Fresher');
        setJobExperience('Fresher');
    };
    const handle1_yearsClick = () => {
        // SearchJobs('?Experience=1 years');
        setJobExperience('1 years');
    };
    const handle2_yearsClick = () => {
        // SearchJobs('?Experience=2 years');
        setJobExperience('2 years');
    };
    const handle3_yearsClick = () => {
        // SearchJobs('?Experience=2 years');
        setJobExperience('3 years');
    };
    const handle_morethan3_yearsClick = () => {
        // SearchJobs('?Experience=');
        setJobExperience('');
    };

// serach title and loactions


    const handleTitleInputChange = (e) => {
        
        // SearchJobs(e.target.value);
        settitleSearch(e.target.value);
      };
      const handleLocationInputChange = (e) => {
        // SearchJobs(e.target.value);
        setLocationSearch(e.target.value);
      };

    useEffect(() => {
        const response = axios.get(JobListUser).then((response) => {
            setjobList(response.data);
        }).catch((error) => {
            console.error("Error fetching job details:", error);
        });


    }, [titleSearch,job_types])
    console.log(jobList, '=====================================>>>>>>>.');

    return (
        <div>

            <div className='flex flex-col ml-16 mt-8 justify-center w-[90%]'>
                <Card className=" bg-[#ededed]  rounded-md  shadow-xl shadow-blue-gray-900/2">
                    <div className='  '>
                        <Typography className='font-prompt text-black ml-10 mt-4' variant='h4'> Filter Job Searches</Typography>
                        <div className='flex justify-evenly'>

                            <input onChange={handleTitleInputChange} type="search" className='w-[30%] h-12 border-[1px] border-black rounded-sm placeholder:text-black placeholder:font-prompt  focus:border-0' placeholder="  Job title or Company" style={{ paddingLeft: '20px' }} />
                            <input onChange={ handleLocationInputChange} type="search" className='w-[30%] h-12 border-[1px] border-black rounded-sm  placeholder:text-black placeholder:font-prompt focus:border-0 ' placeholder="   State or City" style={{ paddingLeft: '20px' }} />
                            <Button onClick={SearchJobs} className='h-12 bg-[#0A3863] font-prompt text-sm rounded-sm' >Filter</Button>
                        </div>
                        <div className='mb-4 mt-6 ml-28 flex gap-16'>
                            <Menu>
                                <MenuHandler>
                                    <Button className='h-12 bg-[#0A3863] font-prompt text-sm rounded-sm' ><FontAwesomeIcon icon={faCaretDown} className='mr-2 w-4 h-4' />Posted Date</Button>
                                </MenuHandler>
                                <MenuList className="max-h-72 font-prompt text-black">
                                    <MenuItem>All Jobs</MenuItem>
                                    <MenuItem >Last 24 Hours</MenuItem>
                                    <MenuItem>Last 3 Days</MenuItem>
                                    <MenuItem>Last 7 days</MenuItem>
                                    <MenuItem>Last 14 days</MenuItem>

                                </MenuList>
                            </Menu>
                            <Menu>
                                <MenuHandler>
                                    <Button className='h-12 bg-[#0A3863] font-prompt text-sm rounded-sm' ><FontAwesomeIcon icon={faCaretDown} className='mr-2 w-4 h-4' />{(jobExperience?jobExperience:'Experience')}</Button>
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
                                    <Button className='h-12 bg-[#0A3863] font-prompt text-sm rounded-sm' ><FontAwesomeIcon icon={faCaretDown} className='mr-2 w-4 h-4' /> {(job_types?job_types:'Job Type')}</Button>
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
                                    {(job.company_id.user_id.profile_image ? <img src={job.company_id.user_id.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
                                        <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-4 " />)}
                                </div>
                                <div >
                                    <Typography onClick={() => navigate('/jobview',{ state: { data: job.id } }) } className='mt-2 font-prompt text-xl text-black hover:cursor-pointer hover:text-[#4e576f] '>{job.Job_title}</Typography>
                                    <Typography className='font-prompt text-lg text-black'>{job.company_id.company_name}</Typography>
                                    <Typography className='font-prompt text-sm text-black'>{job.company_id.Location}</Typography>
                                    <Typography className='font-prompt text-sm text-black'>Jobtype : {job.job_type}</Typography>
                                    <Typography className='font-prompt text-sm text-black'>Salary : {job.salary}</Typography>
                                    <Typography className='font-prompt text-sm text-black mb-1'>Posted Date : {formatPostedDate(job.posted_date)}</Typography>
                                </div>

                            </div>
                            <div className='mr-10'>
                                <FontAwesomeIcon className='mt-10 mr-20 h-6 text-[#051339] hover:cursor-pointer hover:text-[#4e576f] font-prompt-normal' icon={faSave} />
                                <FontAwesomeIcon className='mt-10 h-6 text-[#051339] hover:cursor-pointer hover:text-[#4e576f] font-prompt-normal' icon={faRemove} />
                            </div>
                        </Card>
                    ))}
                </Card>

            </div>
        </div>
    )
}

export default Jobs
