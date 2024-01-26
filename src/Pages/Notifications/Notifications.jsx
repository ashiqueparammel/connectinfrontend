import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NotificationListingUser, NotificationUpdateUser } from '../../Constants/Constants'
import { useSelector } from 'react-redux'
import { Button, Card, Typography, Dialog, DialogHeader, DialogFooter, CardBody, CardFooter, } from '@material-tailwind/react';
import { Tabs, TabsHeader, TabsBody, Tab, } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast'
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';


function Notifications() {
    const navigate = useNavigate()

    const Head = [{ Heading: 'All' }, { Heading: 'Read' }, { Heading: 'UnRead' }]
    const [activeTab, setActiveTab] = useState('All');

    const formatPostedDate = (postedDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
        const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    const [unReadManage, setunReadManage] = useState(false)
    const [ReadManage, setReadManage] = useState(false)

    const userInfo = useSelector((state) => state.user.userInfo)
    const [NotificationsListUsers, setNotificationsListUsers] = useState([])

    useEffect(() => {
        axios.get(`${NotificationListingUser}${userInfo.id}/`).then((response) => {
            setNotificationsListUsers(response.data)
        }).catch((error) => {
            console.log(error);
        })

    }, [])

    const manageReadNotifications = (user_id, Notification_id) => {

        const data = { is_read: true }
        axios.patch(`${NotificationUpdateUser}${Notification_id}/`, data).then((response) => {
            if (response.status === 200) {
                navigate('/profileview', { state: { data: user_id } })
            }

        }).catch((error) => { toast.error(error) })
    }

    return (

        <div className='flex justify-center'>
            <Card className='w-[80rem] mt-14 bg-gray-200'>
                <div className='flex justify-between border-b-[1px] border-[#a39f9f] ' >
                    <Typography className='font-prompt mt-4 ml-4' variant='h4'>
                        Notifications
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
                                    {NotificationsListUsers.length !== 0 ? NotificationsListUsers.map((Notification, index) => (

                                        <Card className=' flex flex-row mb-2 rounded-md w-[90%] mt-2 justify-between' key={index}>
                                            <div className='flex gap-5'>
                                                <div className='mt-1 mb-1'>
                                                    {(Notification.NotifyUser.profile_image ? <img src={Notification.NotifyUser.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14   ' /> :
                                                        <UserCircleIcon className="ml-4 rounded-full w-14 h-14   " />)}
                                                </div>
                                                <div className='flex  gap-10 justify-center  items-center mt-1 mb-1'>
                                                    <div>
                                                        <Typography className='font-prompt text-md   text-black'><span className='font-prompt-normal text-lg text-black mr-4'>{Notification.NotifyUser.username}</span>{Notification.text} </Typography>
                                                        <Typography className='font-prompt text-md   text-black'>{Notification.NotifyUser.email}</Typography>
                                                        <Typography className='absolute right-5 bottom-5 font-prompt text-md  text-black'>{formatPostedDate(Notification.created_at)}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>

                                    )) : ''}
                                </div>

                                : '')}

                            {(activeTab === 'Read' ? <div className='flex flex-col w-full ml-24'>
                                {NotificationsListUsers.length !== 0 ? NotificationsListUsers.map((Notification, index) => (
                                    (Notification.is_read ?
                                        <Card className=' flex flex-row mb-2 rounded-md w-[90%] mt-2 justify-between' key={index}>
                                            <div className='flex gap-5'>
                                                <div className='mt-1 mb-1'>
                                                    {(Notification.NotifyUser.profile_image ? <img src={Notification.NotifyUser.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14   ' /> :
                                                        <UserCircleIcon className="ml-4 rounded-full w-14 h-14   " />)}
                                                </div>
                                                <div className='flex  gap-10 justify-center  items-center mt-1 mb-1'>
                                                    <div>
                                                        <Typography className='font-prompt text-md   text-black'><span className='font-prompt-normal text-lg text-black mr-4'>{Notification.NotifyUser.username}</span>{Notification.text} </Typography>
                                                        <Typography className='font-prompt text-md   text-black'>{Notification.NotifyUser.email}</Typography>
                                                        <Typography className='absolute right-5 bottom-5 font-prompt text-md  text-black'>{formatPostedDate(Notification.created_at)}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                        : '')
                                )) : ''}
                            </div> : '')}
                            {(activeTab === 'UnRead' ? <div className='flex flex-col w-full ml-24'>
                                {NotificationsListUsers.length !== 0 ? NotificationsListUsers.map((Notification, index) => (
                                    (!Notification.is_read ?
                                        <Card onClick={(e) => manageReadNotifications(Notification.NotifyUser.id, Notification.id)} className=' cursor-pointer flex flex-row mb-2 rounded-md w-[90%] mt-2 justify-between' key={index}>
                                            <div className='flex gap-5'>
                                                <div className='mt-1 mb-1'>
                                                    {(Notification.NotifyUser.profile_image ? <img src={Notification.NotifyUser.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14   ' /> :
                                                        <UserCircleIcon className="ml-4 rounded-full w-14 h-14   " />)}
                                                </div>
                                                <div className='flex  gap-10 justify-center  items-center mt-1 mb-1'>
                                                    <div>
                                                        <Typography className='font-prompt text-md   text-black'><span className='font-prompt-normal text-lg text-black mr-4'>{Notification.NotifyUser.username}</span>{Notification.text} </Typography>
                                                        <Typography className='font-prompt text-md   text-black'>{Notification.NotifyUser.email}</Typography>
                                                        <Typography className='absolute right-5 bottom-5 font-prompt text-md  text-black'>{formatPostedDate(Notification.created_at)}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                        : '')
                                )) : ''}
                            </div> : '')}
                        </TabsBody>
                    </Tabs>
                </div>
            </Card>
            <Toaster />
        </div>
    )
}

export default Notifications