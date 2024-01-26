import React, { useState, useEffect } from 'react';
import { faCaretDown, faRemove, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Menu, MenuHandler, MenuItem, MenuList, Typography, Input } from '@material-tailwind/react';
import { UserCircleIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { EmployeeListing } from '../../../Constants/Constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';



function JobSearchCompany() {
    const userInfo = useSelector((state) => state.user.userInfo)

    const navigate = useNavigate()
    const [jobList, setjobList] = useState([])
    const [manageState, setmanageState] = useState(false)





    const SearchJobs = async (keyword) => {
        if (keyword) {
            try {
                    const SearchRequest = await axios.get(`${EmployeeListing}?search=${keyword}`);
                    setjobList(SearchRequest.data);

            }
            catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
    };

    // search title and loactions
    const handleTitleInputChange = (e) => { SearchJobs(e.target.value) };


    useEffect(() => {
        setmanageState(false)
        const response = axios.get(EmployeeListing).then((response) => {
            setjobList(response.data);
            console.log(response.data, '===================>>>>>>>>>>>>>>>>>>>');
        }).catch((error) => {
            console.error("Error fetching job details:", error);
        });




    }, [manageState])




    

    return (
        <div>

            <div className='flex flex-col ml-16 mt-8 justify-center w-[90%]'>
                <Card className=" bg-[#ededed]  rounded-md  shadow-xl shadow-blue-gray-900/2">
                    <div className='  '>
                        <Typography className='font-prompt text-black ml-10 mt-4' variant='h4'> Filter Job Seekers Searches</Typography>
                        <div className='flex justify-start gap-10 ml-28'>

                            <input onChange={handleTitleInputChange} type="search" className=' mt-3 w-[90%] h-12 border-[1px] border-black rounded-sm placeholder:text-black placeholder:font-prompt  focus:border-0' placeholder="  Job Seekers Name or Title or Location" style={{ paddingLeft: '20px' }} />
                         
                        </div>
                        <div className='mb-4 mt-6 ml-28 flex gap-16'>


                        </div>


                    </div>
                </Card>

                <Card className="bg-[#ededed] rounded-md shadow-xl mt-8 shadow-blue-gray-900/2" >
                    <Typography className='font-prompt text-black ml-10 mt-4' variant='h4'>Job Seekers List</Typography>
                    {jobList.map((job, index) => (
                        <Card className='ml-16 flex flex-row mb-3 rounded-md w-[90%] mt-5 justify-between' key={index}>




                            <div className=' flex gap-2'>
                                <div>
                                    {(job.user.profile_image ? <img src={job.user.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
                                        <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-4 " />)}
                                </div>
                                <div >
                                    <Typography onClick={() => navigate('/jobview', { state: { data: job.id } })} className='mt-2 font-prompt text-xl text-black hover:cursor-pointer uppercase hover:text-[#4e576f] '>{job.header}</Typography>
                                    <Typography className='font-prompt text-md text-black'>{job.user.email}</Typography>
                                    <Typography className='font-prompt text-md text-black'>{job.description}</Typography>
                                    <Typography className='font-prompt text-sm text-black'>Location : {job.Location}</Typography>

                                    <div onClick={() => navigate('/profileview', { state: { data: job.user.id } })} className='font-prompt-normal text-sm text-white hover:cursor-pointer w-fit mb-1 rounded-sm  bg-[#0A3863] hover:bg-[#777778]' >
                                        <h1 className='' style={{ paddingLeft: '10px', paddingRight: '10px', padding: '2px' }}>Profile View</h1>
                                    </div>
                                </div>

                            </div>
                            <div className='mr-10'>
                            </div>
                        </Card>
                    ))}
                </Card>

            </div>
            <Toaster />
        </div>
    )
}

export default JobSearchCompany





// SearchJobs('?job_type=remote');
// ?search=
// ?job_type=Hybrid&search=broto