import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Card, Menu, MenuHandler, MenuList, MenuItem, Typography, } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { CompanyDetails } from '../../Constants/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faBookBookmark, faUsers, faUserPlus, faEllipsisVertical, faComment, faHeart, faThumbsUp, faCommenting, faShareAlt, faSave, } from '@fortawesome/free-solid-svg-icons';
import logo from '../../Assets/Connectlogo.png';


function CompanyHome() {
    const [userDetails, setuserDetails] = useState([])

    const userInfo = useSelector((state) => state.user.userInfo)
    console.log(userInfo, '=================>>>>>>>>>>>>>>>')



    useEffect(() => {
        if (userInfo) {
            const userData = axios.get(`${CompanyDetails}${userInfo.user_id}/`).then((response) => {
                const responseData = response.data;
                setuserDetails(responseData)
            })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);


    return (
        <div className=' flex mt-5'>
            <div className='mt-2'>
                <Card className="h-[310px] bg-[#ededed] w-full max-w-[20rem]  ml-16  shadow-xl shadow-blue-gray-900/2">
                    {(userDetails.profile_cover_image ?
                        <Card style={{ backgroundImage: `url(${userDetails.profile_cover_image})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className='  h-28 rounded-b-none   shadow-xl shadow-[#b9b7b7]'>
                            <div >
                                {(userDetails.profile_image ? <img src={userDetails.profile_image} alt="profile photo" className=' ml-28 rounded-full w-24 h-24 mt-14' /> :
                                    <UserCircleIcon className="h-24 w-24 mt-14 ml-28" />)}
                            </div>

                        </Card> :
                        <Card className='bg-[#c1e0b7]  h-28  shadow-xl w-full rounded-b-none  shadow-[#b9b7b7]'>

                            <div >
                                {(userDetails.profile_image ? <img src={userDetails.profile_image} alt="profile photo" className='ml-28 rounded-full w-24 h-24 mt-14 ' /> :
                                    <UserCircleIcon className="h-24 w-24 mt-14 ml-28" />)}
                            </div>
                        </Card>)}
                    <div className='mt-10 p-3 text-center'>
                        <h1 className='font-prompt text-2xl'>{userDetails.username}</h1>
                        <h1 className='font-prompt text-md'>{userDetails.email}</h1>

                        <div className='flex justify-between mt-2'>
                            <h1 className='font-prompt text-left text-lg'>followes</h1>
                            <h1 className='font-prompt text-left text-lg text-[#5871c8]'>9</h1>
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='font-prompt text-left text-lg'>following</h1>
                            <h1 className='font-prompt text-left text-lg text-[#5871c8]'>10</h1>
                        </div>
                    </div>
                </Card>

                <Card className="h-[247px]  bg-[#ededed] w-full max-w-[20rem] mt-10 ml-16  shadow-2xl shadow-blue-gray-900/2">
                    <div className='flex  flex-col gap-2    '>
                        <Button className='bg-[#051339]  rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faBookBookmark} className='w-7 h-7 mt-1' /> <span className='mt-1 '>My Items</span></Button>
                        <Button className='bg-[#051339] rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faUsers} className='w-7 h-7 mt-1' /><span className='mt-1 '>Following & Followers</span></Button>
                        <Button className='bg-[#051339] rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faMessage} className='w-7 h-7 mt-1' /><span className='mt-1 '>Messages</span></Button>
                        <Button className='bg-[#051339] rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faUserPlus} className='w-7 h-7 mt-1' /><span className='mt-1 '>Connections</span></Button>
                    </div>
                </Card>
            </div>
            <div className='max-w-[45rem] w-full '>
                {/* <Card className="h-32 bg-[#ededed]  ml-16  shadow-xl shadow-blue-gray-900/2">
                    <div className='flex flex-col gap-2 mb-5 '>

                    </div>
                </Card> */}

                <Card className="h-[40rem] bg-[#ededed] mt-2 ml-16  shadow-2xl shadow-blue-gray-900/2">
                    <div className='flex justify-between' >
                        <div className='flex'>
                            {(userDetails.profile_image ? <img src={userDetails.profile_image} alt="profile photo" className='ml-4 rounded-full w-16 h-16  mt-4 ' /> :
                                <UserCircleIcon className="ml-4 rounded-full w-16 h-16  mt-4 " />)}
                            <div className='flex flex-col ml-2 mt-5'>
                                <h1 className='font-prompt-normal text-sm '>{userDetails.username}</h1>
                                <h1 className='font-prompt text-sm '>{userDetails.email}</h1>
                                <h1 className='font-prompt text-sm '>{userDetails.id}</h1>
                            </div>
                        </div>
                        <div>
                            <Menu>
                                <MenuHandler>
                                    <Button className='bg-0 mt-3 w-2  flex justify-center mr-3'><FontAwesomeIcon icon={faEllipsisVertical} color='#051339' className=' w-7 h-7 ' /></Button>
                                </MenuHandler>
                                <MenuList className="max-h-72">
                                    <MenuItem>Report</MenuItem>
                                    <MenuItem>Not intrested</MenuItem>
                                    <MenuItem>Share</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Typography color="gray" className="font-normal">
                            {/* {userDetails.email} */}
                            space post text showing this side
                        </Typography>
                        <img className="max-h-96 mt-1 w-full " src={userDetails.profile_image} alt="nature" />
                        <div className='flex justify-between' style={{ borderBottom: '1px solid #9da3a3 ' }}>
                            <h1 className='font-prompt ml-5 mb-2 mt-4'><FontAwesomeIcon icon={faHeart} color='#051339' className=' w-5 h-5 ' /> liked <span className='font-prompt-semibold'>{userDetails.id}</span></h1>
                            <h1 className='font-prompt mr-5 mb-2 mt-4'><span className='font-prompt-semibold'>{userDetails.id}</span> Commented <FontAwesomeIcon icon={faComment} color='#051339' className=' w-5 h-5 ' /></h1>
                        </div>
                        <div className='flex justify-around mt-7'>
                            <h1 className='font-prompt-normal ml-5 mb-2'><FontAwesomeIcon icon={faThumbsUp} color='#051339' className=' w-7 h-7' /> like</h1>
                            <h1 className='font-prompt-normal ml-5 mb-2 '><FontAwesomeIcon icon={faCommenting} color='#051339' className=' w-7 h-7 ' />Comment</h1>
                            <h1 className='font-prompt-normal ml-5 mb-2 '><FontAwesomeIcon icon={faSave} color='#051339' className=' w-7 h-7 ' /> Save</h1>
                            <h1 className='font-prompt-normal ml-5 mb-2 '><FontAwesomeIcon icon={faShareAlt} color='#051339' className=' w-7 h-7 ' /> Share</h1>
                        </div>
                    </div>
                </Card>
            </div>
            <div className='flex flex-col max-w-[24rem] w-full'>
                <h1 className='ml-20  font-prompt-normal'>Recent Chats </h1>
                <Card className=" flex flex-row gap-2 h-[6rem] rounded-b-none bg-[#ededed] mt-2 ml-16  shadow-2xl shadow-blue-gray-900/2" style={{ borderBottom: '1px solid #9da3a3 ' }}>
                    {(userDetails.profile_image ? <img src={userDetails.profile_image} alt="profile photo" className='ml-4 rounded-full w-14 h-14  mt-4 ' /> :
                        <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-4 " />)}
                    <h1 className='font-prompt-normal mt-9 text-sm '>{userDetails.username}</h1>
                    <Button className='w-24 h-9 mt-7 text-center font-prompt-normal bg-[#051339] rounded-md'>Message</Button>
                    <Menu>
                        <MenuHandler>
                            <Button className='bg-0 mt-6 w-1 h-10 flex justify-center '><FontAwesomeIcon icon={faEllipsisVertical} color='#051339' className=' w-5 h-5 ' /></Button>
                        </MenuHandler>
                        <MenuList className="max-h-72">
                            <MenuItem>Delete</MenuItem>
                            <MenuItem>Archive</MenuItem>
                        </MenuList>
                    </Menu>
                </Card>
                <Card className="flex flex-col  h-[8rem] bg-[#ededed] mt-16 ml-16  shadow-2xl shadow-blue-gray-900/2">
                    <img src={logo} alt="logo " className='w-[80%]  ml-10' />
                    <h1 className='font-prompt text-lg text-center text-[#051339]'>Connect In 2023</h1>
                </Card>
            </div>
        </div>
    )
}

export default CompanyHome