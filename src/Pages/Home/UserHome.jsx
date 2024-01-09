import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Card, Menu, MenuHandler, MenuList, MenuItem, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { EmployeeProfileAdd, NotInterestedPosts, PublicPostAdd, PublicPostList, PublicPostReport, PublicPostReportUser, UserDetails, UserProfileDetails } from '../../Constants/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faBookBookmark, faUsers, faUserPlus, faEllipsisVertical, faComment, faHeart, faThumbsUp, faCommenting, faShareAlt, faSave, faUser, faCamera, faPaperPlane, faImage, faAdd, } from '@fortawesome/free-solid-svg-icons';
import logo from '../../Assets/Connectlogo.png';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'


function UserHome() {
  const navigate = useNavigate()
  const [userDetail, setuserDetail] = useState([])
  const userInfo = useSelector((state) => state.user.userInfo)
  const fileInputRef = useRef(null);
  const fileInputProfileRef = useRef(null);
  const fileInputImageRef = useRef(null);

  const [CompanyuserDetails, setCompanyuserDetails] = useState([]);
  const [companyDetail, setCompanyDetail] = useState([]);
  const [ImageManage, setImageManage] = useState(false);
  // console.log(userInfo, '=================>>>>>>>>>>>>>>>')

const [checkState, setcheckState] = useState(true)

  //add post 
  const [postDetails, setPostDetails] = useState([])
  const [userNotIntrustedPost, setUserNotIntrustedPost] = useState([])
  let PostImagefile = null
  const [postText, setPostText] = useState('')
  // report post
  const [reprotText, setReprotText] = useState('')
  const [reportPostId, setReportPostId] = useState('')
  const [Reportopen, setreportOpen] = useState(false);
  const ReporthandleOpen = (e) => {
    setreportOpen(!Reportopen); if (Reportopen === false) { setReportPostId(e); } {

    }
  };
  const [reportedPosts, setReportedPosts] = useState([])

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
      axios.get(`${PublicPostList}${userInfo.id}/`).then((response) => {
        setPostDetails(response.data)
      }).catch((error) => {
        console.log('error fetching public post', error);
      })
      axios.get(`${PublicPostReportUser}${userInfo.id}/`).then((response) => {
        setReportedPosts(response.data)
      }).catch((error => {
        console.log('error fetching public post', error);

      }))

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
    // console.log('1111111111111111111111111111111111111111111111111');
    const userData = axios.get(`${UserProfileDetails}${userInfo.id}/`).then((response) => {
      let userprofiledata = response.data
      if (userprofiledata.length > 0) {
        navigate('/profile/')
        // console.log('2222222222222222222222222222222222222222222');
      }
      else {
        let profileData = {
          user: userInfo.id,
          Job_titile: null,
          cv_file: null,

        }
        // console.log('3333333333333333333333333333333333333333333');
        axios.post(EmployeeProfileAdd, profileData).then((response) => {
          console.log(response.data, 'created profile');
          // console.log('444444444444444444444444444444444444444444');

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

  const notIntrested = (event) => {
    const Data = {
      user: userInfo.id,
      Post: event,
    }
    try {
      axios.post(NotInterestedPosts, Data).then((response) => {
        if (response.status === 201) {
          setImageManage(true)
        }
      })
    } catch (error) {
      console.log('error not Intrusted ', error);
    }
  }

  const addPublicPost = () => {
    if (postText === '') {
      toast.error('Field cannot be empty!')
    }
    else if (PostImagefile === null) {
      toast.error('Image cannot be empty!')
    } else {
      const formData = new FormData();
      formData.append('user', userInfo.id);
      formData.append('description', postText);
      formData.append('Post_Image', PostImagefile);
      formData.append('is_available', true);
      axios.post(PublicPostAdd, formData)
        .then((response) => {
          if (response.status === 201) {
            setImageManage(true)
            toast.success('Public Post Added Successfully!');
          }
        }).catch((err) => {
          toast.error(err);
        })

    }
  }

  const Post_Image_Add = (event) => {
    PostImagefile = event.target.files[0];
    toast.success('Image Added')

  }
  const handlePostImage = () => {
    fileInputImageRef.current.click();
  };


  const ReportPublicPost = (event) => {
    const postDatas = {
      user: userInfo.id,
      Post: reportPostId,
      Reason: reprotText
    }
    if (reprotText) {

      try {
        axios.post(PublicPostReport,postDatas)
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
      setImageManage(true)
      ReporthandleOpen()
    } else {
      toast.error('Text field canout empty!')
    }

  }

  const getReportStatus = (postId) => {
    const ReportedJob= reportedPosts.find((checkPost) => checkPost.Post === postId);
    return ReportedJob ? 'Reported':'Report'
};

const likeAddPost =()=>{
  setcheckState(!checkState)
  toast.success('working')
}
  return (
    <div className=' flex flex-row mt-5   '>
      <div className='mt-2 '>
        <Card className=" bg-[#ededed] max-w-[20rem]   ml-16  shadow-xl shadow-blue-gray-900/2">
          {(userDetail.profile_cover_image ?
            <Card style={{ backgroundImage: `url(${userDetail.profile_cover_image})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className='  h-28 rounded-b-none   shadow-xl shadow-[#b9b7b7]'>
              <div  >
                {(userDetail.profile_image ? <img onClick={checkProfile} src={userDetail.profile_image} alt="profile photo" className='hover:cursor-pointer  ml-28 rounded-md shadow-2xl w-24 h-24 mt-14' /> :
                  <div>
                    <div className="h-24 w-24 mt-14 ml-28  bg-[#e7e7e7] shadow-2xl rounded-md" ><FontAwesomeIcon onClick={checkProfile} icon={faUser} color='#051339' className='hover:cursor-pointer w-10 h-10 mt-1 ml-1 absolute left-[43%] -bottom-[8%]' /></div>
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
                    <div className="h-24 w-24 mt-14 ml-28  bg-[#e7e7e7] shadow-2xl rounded-md" ><FontAwesomeIcon onClick={checkProfile} icon={faUser} color='#051339' className='hover:cursor-pointer w-10 h-10 mt-1 ml-1 absolute left-[43%] -bottom-[8%]' /></div>
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
          <div className='mt-8 p-3 text-center'>
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

        <Card className="  bg-[#ededed] w-full max-w-[20rem] mt-10 ml-16  shadow-2xl shadow-blue-gray-900/2">
          <div className='flex  flex-col gap-2    '>
            <Button onClick={() => navigate('/myitems')} className='bg-[#051339]  rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faBookBookmark} className='w-7 h-7 mt-1' /> <span className='mt-1 '>My Jobs</span></Button>
            <Button className='bg-[#051339] rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faUsers} className='w-7 h-7 mt-1' /><span className='mt-1 '>Following & Followers</span></Button>
            <Button className='bg-[#051339] rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faMessage} className='w-7 h-7 mt-1' /><span className='mt-1 '>Messages</span></Button>
            <Button className='bg-[#051339] rounded-md h-14 font-prompt-normal text-md flex gap-5'><FontAwesomeIcon icon={faUserPlus} className='w-7 h-7 mt-1' /><span className='mt-1 '>Connections</span></Button>
          </div>
        </Card>
      </div>
      <div className='max-w-[45rem] w-full overflow-hidden'>

        <Card className="h-32 bg-[#ededed]  ml-16  shadow-xl shadow-blue-gray-900/2">
          <div className='flex  gap-2 mt-5 '>
            {(userDetail.profile_image ? <img src={userDetail.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl w-16 h-16  mt-4 ' /> :
              <UserCircleIcon className="ml-4 rounded-full w-16 h-16  " />)}
            <input type="text" className='w-[70%] h-14  mt-1 border-[1px] font-prompt border-black rounded-md' value={postText} onChange={(e) => setPostText(e.target.value)} placeholder='Share Your Post ...' style={{ paddingLeft: '20px' }} />
            <Button title='Add New Public Post' onClick={addPublicPost} className='h-14 mt-1 bg-[#051339]'><FontAwesomeIcon icon={faPaperPlane} className='w-7 h-7 rotate-45 ' /></Button>
          </div>
          <div title='Add Image' onClick={handlePostImage} className='flex  text-[#051339] hover:text-[#6f6b6b] mt-3 absolute right-32 bottom-5 hover:cursor-pointer h-6'>
            <FontAwesomeIcon icon={faAdd} className='w-4 h-4 mt-1' />
            <FontAwesomeIcon icon={faImage} className='w-7 h-7 mt-1' />
          </div>
          <input
            type="file"
            ref={fileInputImageRef}
            style={{ display: 'none' }}
            onChange={Post_Image_Add}
          />
        </Card>

        <div className=' mt-2 max-h-[28.4rem] overflow-y-auto z-50 hidescroll'>
          {postDetails.map((post, index) => (
            <Card key={index} className="bg-[#ededed] mb-2  ml-16 border-[1px] border-[#cbcaca]   shadow-blue-gray-900/2">
              <div className='flex justify-between' >
                <div className='flex'>
                  {(post.user.profile_image ? <img src={post.user.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl w-16 h-16  mt-4 ' /> :
                    <UserCircleIcon className="ml-4 rounded-full w-16 h-16  mt-4 " />)}
                  <div className='flex flex-col ml-2 mt-5'>
                    <h1 className='font-prompt-normal text-sm '>{post.user.username}</h1>
                    <h1 className='font-prompt text-sm '>{post.user.email}</h1>
                    {/* <h1 className='font-prompt text-sm '>{userDetails.id}</h1> */}
                  </div>
                </div>
                <div title='Options'>
                  <Menu>
                    <MenuHandler>
                      <FontAwesomeIcon icon={faEllipsisVertical} color='#051339' className='rounded-full hover:text-[#000000]  w-7 h-7 mt-5 mr-4 hover:bg-gray-600 hover:bg-opacity-20 hover:cursor-pointer' />
                    </MenuHandler>
                    <MenuList className="max-h-72">
                      {(getReportStatus(post.id)==='Report'?<MenuItem onClick={(e) => ReporthandleOpen(post.id)}>Report</MenuItem>:<MenuItem className='bg-[#dbdbdb] text-black'>Reported</MenuItem>)}
                      <MenuItem onClick={(e) => notIntrested(post.id)} >Not intrested</MenuItem>
                      <MenuItem>Share</MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
              <div className="mt-2">
                {(post.description ? <Typography color="black" className="font-prompt ml-2">
                  {post.description}
                </Typography> : '')}
                {(post.Post_Image ? <img className="max-h-96 mt-1 w-full " src={post.Post_Image} alt="nature" /> : '')}
                <div className='flex justify-between' style={{ borderBottom: '1px solid #9da3a3 ' }}>
                  <h1 className='font-prompt ml-5 mb-2 mt-4'><FontAwesomeIcon icon={faHeart} color='#051339' className=' w-5 h-5 ' /> liked <span className='font-prompt-semibold'>{post.likes}</span></h1>
                  <h1 className='font-prompt mr-5 mb-2 mt-4'><span className='font-prompt-semibold'>{userDetail.id}</span> Commented <FontAwesomeIcon icon={faComment} color='#051339' className=' w-5 h-5 ' /></h1>
                </div>
                <div className='flex justify-around mt-7'>
                  {(checkState?<h1 className='font-prompt-normal ml-5 mb-2'><FontAwesomeIcon icon={faThumbsUp} onClick={likeAddPost} color='#294b8d' className=' w-7 h-7 hover:cursor-pointer' /> like</h1>:
                  <h1 className='font-prompt-normal ml-5 mb-2'><FontAwesomeIcon icon={faThumbsUp} onClick={likeAddPost} color='#051339' className=' w-7 h-7 hover:cursor-pointer' /> like</h1>)}
                  <h1 className='font-prompt-normal ml-5 mb-2 '><FontAwesomeIcon icon={faCommenting} color='#051339' className=' w-7 h-7 ' />Comment</h1>
                  <h1 className='font-prompt-normal ml-5 mb-2 '><FontAwesomeIcon icon={faSave} color='#051339' className=' w-7 h-7 ' /> Save</h1>
                  <h1 className='font-prompt-normal ml-5 mb-2 '><FontAwesomeIcon onClick={handleshare} icon={faShareAlt} color='#051339' className=' w-7 h-7 ' /> Share</h1>
                </div>
              </div>
            </Card>
          ))}

        </div>




      </div>
      <div className='flex flex-col max-w-[24rem] w-full'>
        <h1 className='ml-20  font-prompt-normal'>Recent Chats </h1>
        <Card className=" flex flex-row gap-2 h-[6rem] rounded-b-none bg-[#ededed] mt-2 ml-16  shadow-2xl shadow-blue-gray-900/2" style={{ borderBottom: '1px solid #9da3a3 ' }}>
          {(userDetail.profile_image ? <img src={userDetail.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
            <UserCircleIcon className="ml-4 rounded-full w-14 h-14  mt-4 " />)}
          <h1 className='font-prompt-normal ml-3 mt-9 text-sm '>{userDetail.username}</h1>
          <div className='text-center w-24  mt-8 h-7 ml-8 font-prompt bg-[#051339] rounded-md text-white  hover:bg-[#1e2c51] hover:cursor-pointer'>
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

              <textarea label="Message" className='h-28 border-[1px] border-black font-prompt text-black' value={reprotText} onChange={(e) => setReprotText(e.target.value)} placeholder='Enter your Reporting Reason' style={{ paddingLeft: '10px' }} />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="text" className="bg-[#7c7c7d] font-prompt-normal text-black" onClick={ReporthandleOpen}>
              cancel
            </Button>
            <Button variant="filled" className="bg-[#051339] font-prompt-normal hover:bg-[#233156]" onClick={ReportPublicPost}>
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

export default UserHome





