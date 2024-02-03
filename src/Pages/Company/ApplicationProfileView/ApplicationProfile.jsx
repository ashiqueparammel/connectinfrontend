import React, { useEffect, useState } from 'react'
import { Button, Card, Dialog, Typography } from '@material-tailwind/react';
import { faFilePdf, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { ListPersonalSkills, MySingleJobsList, UserFollow, job_ApplicationsUpdate } from '../../../Constants/Constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import PdfHelper from '../../../Helpers/PdfHelper';
import { pdfjs } from 'react-pdf';
import { useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url,).toString();


function ApplicationProfile() {

    const location = useLocation()
    const job_id = location.state.data || ''
    const navigate = useNavigate()
    const userInfo = useSelector((state) => state.user.userInfo);

    const formatPostedDate = (postedDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
        const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    //  view cv 
    const [Cvopen, setCvOpen] = React.useState(false);
    const CvViewOpen = () => setCvOpen((cur) => !cur);
    const [LoadingManage, setLoadingManage] = useState(false)


    const [JobDetail, setJobDetail] = useState([])
    const [UserProfile, setUserProfile] = useState([])
    const [UserData, setUserData] = useState([])
    const [ApplicationData, setApplicationData] = useState([])
    const [RequiredSkills, setRequiredSkills] = useState([])
    const [ManagePage, setManagePage] = useState(false)

    useEffect(() => {
        setManagePage(false)
        if (job_id) {
            setLoadingManage(true)
            axios.get(`${MySingleJobsList}${job_id}/`).then((response) => {
                const ApplicationAllData = response.data
                setApplicationData(ApplicationAllData)
                const { job_post } = ApplicationAllData
                let { profile } = ApplicationAllData
                const profileData = profile
                if (profile.cv_file) {
                    let temp = profile.cv_file;
                    temp = temp.substring(0, 4) + "s" + temp.substring(4);
                    profile.cv_file = temp
                }
                setUserProfile(profile)
                const { user } = profile
                setUserData(user)
                setJobDetail(job_post)
                if (profile) {
                    axios.get(`${ListPersonalSkills}${profile.id}/`)
                        .then((response) => {
                            setRequiredSkills(response.data)
                        }).catch((error) => {
                            console.error("Error fetching ListPersonalSkills:", error);
                        })
                        setLoadingManage(false)
                }
            }).catch((error) => {
                setLoadingManage(false)
                console.error("Error fetching MySingleJobsList:", error);
            })
        }


    }, [ManagePage])

    const UpdateApplication = (event) => {
        const data = {
            ApplicationStatus: event,
            Updated: true
        }
        setLoadingManage(true)
        axios.patch(`${job_ApplicationsUpdate}${ApplicationData.id}/`, data).then((response) => {
            if (response.status === 200) {
                setManagePage(true)
                setLoadingManage(false)
                toast.success('updated Status')

            }
        }).catch((error) => {
            setLoadingManage(false)
            console.error("Error Updating status:", error);
        })

    }

    const ContactHandle = (event) => {
        navigate('/chat', { state: { data: event } })

    }

    return (
        <div>
            
            <>
                {(LoadingManage ? <div className='absolute ml-[50%] mt-[20%] bg-opacity-50 items-center '><Loader /></div> : '')}
            </>
            <div className='flex justify-center'>
                <Card className='bg-[#e7e7e7] rounded-md w-[90%] mt-10   '>

                    <div className='xl:ml-28 lg:ml-24 2xl:28 sm:ml-6 md:ml-8 ml-8 mt-6 mb-3 '>
                        <Card className='bg-[#FAFAFA] shadow-2xl mt-2  rounded-md w-[90%]'>
                            <div style={{ borderBottom: '1px solid #9da3a3' }} className='h-16'>
                                <Typography className='font-prompt text-2xl text-center ml-6 mt-1 text-black'>Application OverView</Typography>
                            </div>

                            <Typography className='font-prompt text-xl ml-6 uppercase '> {UserProfile.header}</Typography>
                            <h1 className='ml-6 mt-2'>{UserProfile.description}</h1>
                            <div className='flex'>
                                <div>
                                    {(UserData.profile_image ? <img src={UserData.profile_image} alt="profile photo" className=' ml-4 rounded-md shadow-2xl  w-14 h-14 mt-10  ' /> :
                                        <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-10 " />)}
                                </div>
                                <div className='flex flex-col gap-3 ml-6 mt-4 mb-3 font-prompt'>
                                    <h1>Candidate Name : {UserData.username}</h1>
                                    <h1>Candidate Email : {UserData.email}</h1>
                                    <h1>Candidate Contact : {UserData.phone_number}</h1>
                                    <h1>Candidate Location : {UserProfile.Location}</h1>
                                    <h1> Related Experiance : {ApplicationData.Experience} Years</h1>
                                    <h1> Expected CTC : {ApplicationData.ExpectedSalary} LPA</h1>
                                    <h1> Current Salary CTC  : {ApplicationData.currentSalary} LPA</h1>
                                    {/* <h1> Cover letter  : {ApplicationData.description} LPA</h1> */}


                                </div>

                                <Card className='w-[30%] h-14  absolute top-36  right-12 shadow-2xl border-[1px] text-center font-prompt  text-black text-lg border-[#000000]  rounded-sm'>
                                    <div className='flex flex-row justify-center mt-1 ml-4'>

                                        <h1 className='mt-2'>{(UserProfile.cv_file ? <div onClick={CvViewOpen} className='flex flex-row gap-10 bg-[#dfdbdb] hover:cursor-pointer hover:bg-[#b6b3b3] rounded-sm '><FontAwesomeIcon icon={faFilePdf} color='#051339' className='w-6 h-8' /><h1 className='ml-2' >view cv </h1><FontAwesomeIcon icon={faEye} color='#051339' className=' w-6 h-8 mr-2' /></div> : 'Upload Your CV')}</h1>


                                    </div>

                                </Card>
                            </div>

                        </Card>
                        <Card className='bg-[#FAFAFA] shadow-2xl mt-2  rounded-md w-[90%]'>
                            <div style={{ borderBottom: '1px solid #9da3a3' }} className='h-16'>
                                <Typography className='font-prompt text-2xl text-center ml-6 mt-1 text-black'>Skills</Typography>

                            </div>
                            <div className='flex flex-row gap-2 ml-6'>
                                {RequiredSkills.map((skills) => (
                                    < div key={skills.id} className='font-prompt text-black flex flex-row mb-4 mt-4 '>
                                        <div className='bg-[#cacbcb] border-[1px] border-black flex gap-1 rounded-md text-black'><p className='font-prompt ml-1 mr-1'>{skills.skills.skills} </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card className='bg-[#FAFAFA] shadow-2xl mt-2  rounded-md w-[90%]'>
                            <div style={{ borderBottom: '1px solid #9da3a3' }} className='h-16'>
                                <Typography className='font-prompt text-2xl text-center ml-6 mt-1 text-black'>Application Status</Typography>

                            </div>
                            {(ApplicationData.Updated ? <div className='flex flex-row justify-end gap-2 mt-6 mb-6 mr-6'>
                                <h1 className='absolute left-6 font-prompt text-lg'>This Application status updated </h1>
                                {(ApplicationData.ApplicationStatus === 'Accept' ? <div><Button disabled className='bg-[#1b681c] font-prompt-normal'>Accepted</Button> <Button onClick={(e) => ContactHandle(UserData)} className='bg-[#1f1a49] font-prompt-normal'>Contact</Button></div> : '')}
                                {(ApplicationData.ApplicationStatus === 'Reject' ? <Button disabled className='bg-[#7e2222] font-prompt-normal'>Rejected</Button> : '')}

                            </div> : <div className='flex flex-row justify-end gap-2 mt-6 mb-6 mr-6'>
                                <h1 className='absolute left-6 font-prompt text-lg'>Please Update the Application Status</h1>
                                <Button onClick={(e) => UpdateApplication('Accept')} className='bg-[#1b681c] font-prompt-normal'>Accept</Button>
                                <Button onClick={(e) => UpdateApplication('Reject')} className='bg-[#7e2222] font-prompt-normal'>Reject</Button>
                            </div>)}



                        </Card>


                    </div>
                </Card>
            </div>
            <div>
                <Dialog size="md" open={Cvopen} handler={CvViewOpen} className="bg-transparent border-none border-0 shadow-none  rounded-none " style={{ position: 'absolute', top: '0', }}>
                    <Card style={{ maxHeight: '670px', overflowY: 'auto' }} className='rounded-none border-0'>
                        <PdfHelper cvFileUrl={UserProfile.cv_file} />
                    </Card>
                </Dialog>
            </div>
            <Toaster />

        </div>
    )
}

export default ApplicationProfile