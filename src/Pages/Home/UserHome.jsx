import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Card, Menu, MenuHandler, MenuList, MenuItem, Typography, } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { EmployeeProfileAdd, UserDetails, UserProfileDetails } from '../../Constants/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faBookBookmark, faUsers, faUserPlus, faEllipsisVertical, faComment, faHeart, faThumbsUp, faCommenting, faShareAlt, faSave, faUser, faCamera, } from '@fortawesome/free-solid-svg-icons';
import logo from '../../Assets/Connectlogo.png';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'


function UserHome() {
  const navigate = useNavigate()
  const [userDetail, setuserDetail] = useState([])
  const userInfo = useSelector((state) => state.user.userInfo)
  const fileInputRef = useRef(null);
  const fileInputProfileRef = useRef(null);

  const [CompanyuserDetails, setCompanyuserDetails] = useState([]);
  const [companyDetail, setCompanyDetail] = useState([]);
  const [ImageManage, setImageManage] = useState(false);
  // console.log(userInfo, '=================>>>>>>>>>>>>>>>')



  useEffect(() => {
    setImageManage(false)
    if (userInfo) {
      const userData = axios.get(`${UserDetails}${userInfo.id}/`).then((response) => {
        const responseData = response.data;
        setuserDetail(responseData)
      })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [ImageManage]);


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


  //Profile Cover Image setting 
  const handleProfileCoverImage = () => {
    fileInputRef.current.click();
  };

  const profile_cover_Image_Add = (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('profile_cover_image', file);
      const updateProfileImage = axios.patch(`${UserDetails}${userInfo.id}/`, formData)
      setImageManage(true)
      console.log('done profile updated redy!');
    } catch (error) {
      console.log(error);
      toast.error('Somthing Wrong!');
    }
  }

  // Profile Image setting
  const handleProfileImage = () => {
    fileInputProfileRef.current.click();
  };



  const profile_Image_Add = (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('profile_image', file);
      const updateProfileImage = axios.patch(`${UserDetails}${userInfo.id}/`, formData)
      setImageManage(true)
      console.log('done profile updated redy!');
    } catch (error) {
      console.log(error);
      toast.error('Somthing Wrong!');
    }
  }


  const checkProfile = () => {
    const userData = axios.get(`${UserProfileDetails}${userInfo.id}/`).then((response) => {
      let userprofiledata = response.data
      if (userprofiledata.length > 0) {
        navigate('/profile/')
      }
      else {
        let profileData = {
          user: userInfo.id,
          Job_titile: null,
          cv_file: null,
        }
        axios.post(EmployeeProfileAdd, profileData).then((response) => {
          console.log(response.data, 'created profile');
          navigate('/profile/')

        }).catch((error) => {
          console.error("Error create user profile:", error);
        })
      }
    })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  return (
    <div className=' flex mt-5'>
      <div className='mt-2'>
        <Card className="h-[310px] bg-[#ededed] max-w-[20rem]  ml-16  shadow-xl shadow-blue-gray-900/2">
          {(userDetail.profile_cover_image ?
            <Card style={{ backgroundImage: `url(${userDetail.profile_cover_image})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className='  h-28 rounded-b-none   shadow-xl shadow-[#b9b7b7]'>
              <div  >
                {(userDetail.profile_image ? <img onClick={checkProfile} src={userDetail.profile_image} alt="profile photo" className='hover:cursor-pointer  ml-28 rounded-md shadow-2xl w-24 h-24 mt-14' /> :
                  <div>
                    <div className="h-24 w-24 mt-14 ml-28  bg-[#e7e7e7] shadow-2xl rounded-md" ><FontAwesomeIcon onClick={() => navigate('/profile/')} icon={faUser} color='#051339' className='hover:cursor-pointer w-10 h-10 mt-1 ml-1 absolute left-[43%] -bottom-[8%]' /></div>
                    <div>
                      <div onClick={handleProfileImage} className='hover:bg-white rounded-md w-7 h-7   absolute right-28 -bottom-10'>
                        <FontAwesomeIcon icon={faCamera} color='#4c4e4f' className='w-5 h-5   hover:cursor-pointer hover:text-[#051339] mt-1 ml-1' />
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputProfileRef}
                      style={{ display: 'none' }}
                      onChange={profile_Image_Add}
                    />
                  </div>)}
              </div>

            </Card> :
            <Card className='bg-[#c1e0b7]  h-28  shadow-xl w-full rounded-b-none  shadow-[#b9b7b7]'>
              <div>
                <div onClick={handleProfileCoverImage} className='hover:bg-white rounded-md w-8 h-8 absolute right-2 bottom-2'>
                  <FontAwesomeIcon icon={faCamera} color='#4c4e4f' className='w-6 h-6 hover:cursor-pointer hover:text-[#051339] mt-1 ml-1' />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={profile_cover_Image_Add}
                />
              </div>
              <div >
                {(userDetail.profile_image ?
                  <img onClick={checkProfile} src={userDetail.profile_image} alt="profile photo" className='hover:cursor-pointer ml-28 rounded-md shadow-2xl w-24 h-24 mt-14 ' />
                  :
                  <div>
                    <div className="h-24 w-24 mt-14 ml-28  bg-[#e7e7e7] shadow-2xl rounded-md" ><FontAwesomeIcon onClick={() => navigate('/profile/')} icon={faUser} color='#051339' className='hover:cursor-pointer w-10 h-10 mt-1 ml-1 absolute left-[43%] -bottom-[8%]' /></div>
                    <div>
                      <div onClick={handleProfileImage} className='hover:bg-white rounded-md w-7 h-7   absolute right-28 -bottom-10'>
                        <FontAwesomeIcon icon={faCamera} color='#4c4e4f' className='w-5 h-5   hover:cursor-pointer hover:text-[#051339] mt-1 ml-1' />
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputProfileRef}
                      style={{ display: 'none' }}
                      onChange={profile_Image_Add}
                    />
                  </div>
                )}
              </div>
            </Card>)}
          <div className='mt-10 p-3 text-center'>
            <h1 className='font-prompt text-2xl'>{userDetail.username}</h1>
            <h1 className='font-prompt text-md'>{userDetail.email}</h1>

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
            <Button onClick={() => navigate('/myitems')} className='bg-[#051339]  rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faBookBookmark} className='w-7 h-7 mt-1' /> <span className='mt-1 '>My Jobs</span></Button>
            <Button className='bg-[#051339] rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faUsers} className='w-7 h-7 mt-1' /><span className='mt-1 '>Following & Followers</span></Button>
            <Button className='bg-[#051339] rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faMessage} className='w-7 h-7 mt-1' /><span className='mt-1 '>Messages</span></Button>
            <Button className='bg-[#051339] rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faUserPlus} className='w-7 h-7 mt-1' /><span className='mt-1 '>Connections</span></Button>
          </div>
        </Card>
      </div>
      <div className='max-w-[45rem] w-full '>
        <Card className="h-32 bg-[#ededed]  ml-16  shadow-xl shadow-blue-gray-900/2">
                  <div className='flex flex-col gap-2 mb-5 '>

                  </div>
              </Card>

        <Card className="h-[40rem] bg-[#ededed] mt-2 ml-16  shadow-2xl shadow-blue-gray-900/2">
          <div className='flex justify-between' >
            <div className='flex'>
              {(userDetail.profile_image ? <img src={userDetail.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl w-16 h-16  mt-4 ' /> :
                <UserCircleIcon className="ml-4 rounded-full w-16 h-16  mt-4 " />)}
              <div className='flex flex-col ml-2 mt-5'>
                <h1 className='font-prompt-normal text-sm '>{userDetail.username}</h1>
                <h1 className='font-prompt text-sm '>{userDetail.email}</h1>
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
              <h1 className='font-prompt ml-5 mb-2 mt-4'><FontAwesomeIcon icon={faHeart} color='#051339' className=' w-5 h-5 ' /> liked <span className='font-prompt-semibold'>{userDetail.id}</span></h1>
              <h1 className='font-prompt mr-5 mb-2 mt-4'><span className='font-prompt-semibold'>{userDetail.id}</span> Commented <FontAwesomeIcon icon={faComment} color='#051339' className=' w-5 h-5 ' /></h1>
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
          {(userDetail.profile_image ? <img src={userDetail.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
            <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-4 " />)}
          <h1 className='font-prompt-normal ml-3 mt-9 text-sm '>{userDetail.username}</h1>
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

