import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Card, Menu, MenuHandler, MenuList, MenuItem, Typography, } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { UserDetails } from '../../Constants/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faBookBookmark, faUsers, faUserPlus, faEllipsisVertical, faComment, faHeart, faThumbsUp, faCommenting, faShareAlt, faSave, } from '@fortawesome/free-solid-svg-icons';
import logo from '../../Assets/Connectlogo.png';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'


function UserHome() {
  const navigate = useNavigate()
  const [userDetails, setuserDetails] = useState([])
  const userInfo = useSelector((state) => state.user.userInfo)
  console.log(userInfo, '=================>>>>>>>>>>>>>>>')



  useEffect(() => {
    if (userInfo) {
      const userData = axios.get(`${UserDetails}${userInfo.id}/`).then((response) => {
        const responseData = response.data;
        setuserDetails(responseData)
      })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleshare = async () => {
    if (navigator.share) {
      try {

        await navigator.share({
          title: "hloo ",
          text: "hlofss ",
          url: window.location.href
        })

      } catch (error) {

      }
    }
  }


  return (
    <div className=' flex mt-5'>
      <div className='mt-2'>
        <Card className="h-[310px] bg-[#ededed] max-w-[20rem]  ml-16  shadow-xl shadow-blue-gray-900/2">
          {(userDetails.profile_cover_image ?
            <Card style={{ backgroundImage: `url(${userDetails.profile_cover_image})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className='  h-28 rounded-b-none   shadow-xl shadow-[#b9b7b7]'>
              <div >
                {(userDetails.profile_image ? <img src={userDetails.profile_image} alt="profile photo" className=' ml-28 rounded-md shadow-2xl w-24 h-24 mt-14' /> :
                  <UserCircleIcon className="h-24 w-24 mt-14 ml-28 bg-[#e7e7e7] rounded-full" />)}
              </div>

            </Card> :
            <Card className='bg-[#c1e0b7]  h-28  shadow-xl w-full rounded-b-none  shadow-[#b9b7b7]'>

              <div >
                {(userDetails.profile_image ? <img src={userDetails.profile_image} alt="profile photo" className='ml-28 rounded-md shadow-2xl w-24 h-24 mt-14 ' /> :
                  <UserCircleIcon className="h-24 w-24 mt-14 ml-28  bg-[#e7e7e7] rounded-full" />)}
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
            <Button onClick={() => navigate('/myitems')} className='bg-[#051339]  rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faBookBookmark} className='w-7 h-7 mt-1' /> <span className='mt-1 '>My Items</span></Button>
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
              {(userDetails.profile_image ? <img src={userDetails.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl w-16 h-16  mt-4 ' /> :
                <UserCircleIcon className="ml-4 rounded-full w-16 h-16  mt-4 " />)}
              <div className='flex flex-col ml-2 mt-5'>
                <h1 className='font-prompt-normal text-sm '>{userDetails.username}</h1>
                <h1 className='font-prompt text-sm '>{userDetails.email}</h1>
                {/* <h1 className='font-prompt text-sm '>{userDetails.id}</h1> */}
              </div>
            </div>
            <div>
              <Menu>
                <MenuHandler>
                  <FontAwesomeIcon icon={faEllipsisVertical} color='#051339' className='rounded-full hover:text-[#000000]  w-7 h-7 mt-5 mr-4 hover:bg-gray-600 hover:bg-opacity-20 hover:cursor-pointer' />
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
            <img className="max-h-96 mt-1 w-full " src='https://t3.ftcdn.net/jpg/05/55/05/20/360_F_555052045_pR45HJOz1KhZjZPRNkSY0dkU6Pt3WsLz.jpg' alt="nature" />
            <div className='flex justify-between' style={{ borderBottom: '1px solid #9da3a3 ' }}>
              <h1 className='font-prompt ml-5 mb-2 mt-4'><FontAwesomeIcon icon={faHeart} color='#051339' className=' w-5 h-5 ' /> liked <span className='font-prompt-semibold'>{userDetails.id}</span></h1>
              <h1 className='font-prompt mr-5 mb-2 mt-4'><span className='font-prompt-semibold'>{userDetails.id}</span> Commented <FontAwesomeIcon icon={faComment} color='#051339' className=' w-5 h-5 ' /></h1>
            </div>
            <div className='flex justify-around mt-7'>
              <h1 className='font-prompt-normal ml-5 mb-2'><FontAwesomeIcon icon={faThumbsUp} color='#051339' className=' w-7 h-7' /> like</h1>
              <h1 className='font-prompt-normal ml-5 mb-2 '><FontAwesomeIcon icon={faCommenting} color='#051339' className=' w-7 h-7 ' />Comment</h1>
              <h1 className='font-prompt-normal ml-5 mb-2 '><FontAwesomeIcon icon={faSave} color='#051339' className=' w-7 h-7 ' /> Save</h1>
              <h1 className='font-prompt-normal ml-5 mb-2 '><FontAwesomeIcon onClick={handleshare} icon={faShareAlt} color='#051339' className=' w-7 h-7 ' /> Share</h1>
            </div>
          </div>
        </Card>
      </div>
      <div className='flex flex-col max-w-[24rem] w-full'>
        <h1 className='ml-20  font-prompt-normal'>Recent Chats </h1>
        <Card className=" flex flex-row gap-2 h-[6rem] rounded-b-none bg-[#ededed] mt-2 ml-16  shadow-2xl shadow-blue-gray-900/2" style={{ borderBottom: '1px solid #9da3a3 ' }}>
          {(userDetails.profile_image ? <img src={userDetails.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
            <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-4 " />)}
          <h1 className='font-prompt-normal ml-3 mt-9 text-sm '>{userDetails.username}</h1>
          <div className='text-center w-24  mt-8 h-7 ml-12 font-prompt bg-[#051339] rounded-md text-white  hover:bg-[#1e2c51] hover:cursor-pointer'>
            <p className='mt-[2px]'><span className='text-[#051339] ml-1'>.</span>Message<span className='text-[#051339] mr-1'>.</span></p>

          </div>
          <Menu>
            <MenuHandler>
              <FontAwesomeIcon icon={faEllipsisVertical} color='#051339' className=' w-5 h-5 mt-9 rounded-full hover:text-[#000000]   mr-4 hover:bg-gray-600 hover:bg-opacity-20 hover:cursor-pointer ' />
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
      <Toaster />

    </div>
  )
}

export default UserHome

