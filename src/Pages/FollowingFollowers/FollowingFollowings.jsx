import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UserFollowers, UserFollowing, UserUnFollow } from '../../Constants/Constants'
import { useSelector } from 'react-redux'
import { Button, Card, Typography, Dialog, DialogHeader, DialogFooter, CardBody, CardFooter, } from '@material-tailwind/react';
import { Tabs, TabsHeader, TabsBody, Tab, } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast'
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

function FollowingFollowings() {
    const [followingCount, setfollowingCount] = useState('')
    const [followersCount, setfollowersCount] = useState('')
    const [ManagePage, setManagePage] = useState(false)
    const userInfo = useSelector((state) => state.user.userInfo)

    const navigate = useNavigate()
    const [FollowingUsers, setFollowingUsers] = useState([])
    const [FollowresUsers, setFollowresUsers] = useState([])

    const Head = [{ Heading: `Following (${followingCount})` }, { Heading: `Followers (${followersCount})` }]
    const [activeTab, setActiveTab] = useState('Following ');

    const formatPostedDate = (postedDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
        const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
        return formattedDate;
    };



    useEffect(() => {
        setManagePage(false)
        axios.get(`${UserFollowing}${userInfo.id}/`).then((response) => {
            let count = response.data.length
            setfollowingCount(count)
            setFollowingUsers(response.data)
            setActiveTab(`Following (${count})`)
        }).catch((error) => {
            console.log(err);
        })
        axios.get(`${UserFollowers}${userInfo.id}/`).then((response) => {
            let count = response.data.length
            setfollowersCount(count)
            setFollowresUsers(response.data)
            console.log(response.data, '=======================>>>>>>>>>>>>>>>>>>');
        }).catch((error) => {
            console.log(error);
        })

    }, [ManagePage])

    const unfollowFunction = (event) => {
        axios.delete(`${UserUnFollow}${event}/`).then((response) => {
            if (response.status === 204) {
                toast.success('Unfollowed')
                setManagePage(true)
            }
        }).catch((error) => { console.log(error); })
    }


    return (

        <div className='flex justify-center'>
            <Card className='w-[80rem] mt-14 bg-gray-200'>
                <div className='flex justify-between border-b-[1px] border-[#a39f9f] ' >
                    <Typography className='font-prompt mt-4 ml-4' variant='h4'>
                        Followings
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
                            {(activeTab === `Following (${followingCount})` ?
                                <div className='flex flex-col w-full ml-24'>
                                    {FollowingUsers.length !== 0 ? FollowingUsers.map((Following, index) => (

                                        <Card className=' flex flex-row mb-2 rounded-md w-[90%] mt-2 justify-between' key={index}>
                                            <div className='flex gap-5'>
                                                <div className='mt-1 mb-1'>
                                                    {(Following.following.profile_image ? <img src={Following.following.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14   ' /> :
                                                        <UserCircleIcon className="ml-4 rounded-full w-14 h-14   " />)}
                                                </div>
                                                <div className='flex  gap-10 justify-center  items-center mt-1 mb-1'>
                                                    <div className=''>
                                                        <div className=''>
                                                            <Typography className='font-prompt text-md   text-black'><span className='font-prompt-normal text-lg text-black mr-4'>{Following.following.username}</span></Typography>
                                                            <Typography className='font-prompt text-md   text-black'>{Following.following.email}</Typography>
                                                        </div>
                                                        {/* <Typography className='absolute right-5 bottom-5 font-prompt text-md  text-black'>Unfollow</Typography> */}
                                                        <div className='absolute right-5 bottom-4'>
                                                            <Button onClick={(e)=>unfollowFunction(Following.id)} className="bg-[#051339]    mt-2 text-white font-prompt-normal  px-4 py-2 rounded-md mr-1">Unfollow</Button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </Card>

                                    )) : ''}
                                </div>

                                : '')}

                            {(activeTab === `Followers (${followersCount})` ? <div className='flex flex-col w-full ml-24'>
                                {FollowresUsers.length !== 0 ? FollowresUsers.map((Followers, index) => (

                                    <Card className=' flex flex-row mb-2 rounded-md w-[90%] mt-2 justify-between' key={index}>
                                        <div className='flex gap-5'>
                                            <div className='mt-1 mb-1'>
                                                {(Followers.followers.profile_image ? <img src={Followers.followers.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14   ' /> :
                                                    <UserCircleIcon className="ml-4 rounded-full w-14 h-14   " />)}
                                            </div>
                                            <div className='flex  gap-10 justify-center  items-center mt-1 mb-1'>
                                                <div>
                                                    <Typography className='font-prompt text-md   text-black'><span className='font-prompt-normal text-lg text-black mr-4'>{Followers.followers.username}</span> </Typography>
                                                    <Typography className='font-prompt text-md   text-black'>{Followers.followers.email}</Typography>
                                                    <Typography className='absolute right-5 bottom-5 font-prompt text-md  text-black'>null</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

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

export default FollowingFollowings