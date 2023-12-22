import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Menu, MenuHandler, MenuList, MenuItem, Typography, Dialog, DialogHeader, DialogFooter,} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { faEdit, faPen, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EmployeeProfileUpdate, UserDetails, UserProfileDetails } from '../../../Constants/Constants';
import toast, { Toaster } from 'react-hot-toast'


function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [UserProfile, setUserProfile] = useState([])
    const [userData, setUserData] = useState([]);
    const [editManage, setEditManage] = useState(false);
    //edit profile states

    const [userName, setUserName] = useState('');
    const [userLocation, setUserLoacation] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userHeader, setUserHeader] = useState('');
    const [userContact, setUserContact] = useState('');

    //Image states
    const fileInputCoverRef = useRef(null);
    const fileInputProfileRef = useRef(null);

    // const [addProfileImage, setaddProfileImage] = useState(null)
    // const [addProfileCoverImage, setaddProfileCoverImage] = useState(null)

    useEffect(() => {
        setEditManage(false)
        if (userInfo) {
            const userData = axios.get(`${UserProfileDetails}${userInfo.id}/`).then((response) => {
                let userprofiledata = response.data
                if (userprofiledata.length > 0) {
                    let { user } = response.data[0]
                    setUserData(user)
                    setUserProfile(response.data[0])
                    setUserName(user.username)
                    setUserLoacation(response.data[0].Location)
                    setUserDescription(response.data[0].description)
                    setUserHeader(response.data[0].header)
                    setUserContact(user.phone_number)
                    // console.log(response.data[0], 'first daaaaaaaaaaaaattta')
                }
            })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [editManage]);

    // console.log(companyData, "company data");
    // console.log(userData, "user data");
    // console.log(companyName, "company name data");

    const editCompanyDetails = () => {
        const editForm = {
            header: userHeader,
            Location: userLocation,
            description: userDescription,
        }
        const validForm = () => {
            if (userName === "") {
                toast.error('User Name should not be empty!');
                return false;
            } 
            else if (userLocation=== "") {
                toast.error('Location should not be empty!');
                return false;
            } else if (userHeader=== "") {
                toast.error('Header should not be empty!');
                return false;
            }
            else if (userDescription === "") {
                toast.error('Description should not be empty!');
                return false;
            }
            else if (userContact=== "") {
                toast.error('Phonenumber should not be empty!');
                return false;
            }
            else if (userContact[0] !== '+') {
                toast.error('Phone Must be want country code!');
                return false;
            }
            return true;
        }
        if (validForm()) {

            try {
                axios.patch(`${EmployeeProfileUpdate}${UserProfile.id}/`, editForm).then((response) => {
                    if (response.status === 200) {
                        const userForm = {
                            phone_number: userContact,
                            username:userName
                        }
                        axios.patch(`${UserDetails}${userInfo.id}/`, userForm).catch((error) => {
                            if (error.response.data.phone_number[0]) {
                                toast.error(error.response.data.phone_number[0]);
                            }
                            else if (error.response.data.username[0]) {
                                toast.error(error.response.data.username[0]);
                            }
                        })
                    }
                    console.log(response, 'check response data ');
                    setEditManage(true)
                    toast.success('Profile Updated!')

                }).catch((error) => {
                    if (error.response.data.company_name[0]) {
                        toast.error(error.response.data.company_name[0]);
                    }
                    else if (error.response.data.Address[0]) {
                        toast.error(error.response.data.Address[0]);
                    }
                    else {
                        toast.error('Somthing wrong!')
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
        handleOpen()
    }

    const removeProfileImage = () => {
        if (userData.profile_image) {

            const removeImageProfile = {
                profile_image: null
            }
            axios.patch(`${UserDetails}${userInfo.id}/`, removeImageProfile).then((response) => {
                if (response.status === 200) {
                    setEditManage(true)
                    toast.success('Profile Image removed !');
                }
            }).catch((error) => {
                if (error.response.data.profile_image[0]) {
                    toast.error(error.response.data.profile_image[0]);
                }
            })
        } else {
            toast.error('No Profile Image');
        }
    }
    const AddProfileImageHandle = (event) => {
        console.log('checkthis datachenge eork or not');
        const file = event.target.files[0];
        const Addprofile = new FormData();
        Addprofile.append('profile_image', file);
        axios.patch(`${UserDetails}${userInfo.id}/`, Addprofile).then((response) => {
            if (response.status === 200) {
                setEditManage(true)
                toast.success('Profile Image Updated !');
            }
        }).catch((error) => {
            if (error.response.data.profile_image[0]) {
                toast.error(error.response.data.profile_image[0]);
            }
        })

    }
    const handleProfileImage = () => {
        fileInputProfileRef.current.click();
    };

    const AddProfileCoverImageHandle = (event) => {
        console.log('checkthis datachenge eork or not');
        const file = event.target.files[0];
        const AddcoverImage = new FormData();
        AddcoverImage.append('profile_cover_image', file);
        axios.patch(`${UserDetails}${userInfo.id}/`, AddcoverImage).then((response) => {
            if (response.status === 200) {
                setEditManage(true)
                toast.success('Cover Image Updated !');
            }
        }).catch((error) => {
            if (error.response.data.profile_image[0]) {
                toast.error(error.response.data.profile_image[0]);
            }
        })

    }
    const handleProfileCoverImage = () => {
        fileInputCoverRef.current.click();
    };

    const removeCoverImage = () => {
        if (userData.profile_cover_image) {

            const removecover_image = {
                profile_cover_image: null
            }
            axios.patch(`${UserDetails}${userInfo.id}/`, removecover_image).then((response) => {
                if (response.status === 200) {
                    setEditManage(true)
                    toast.success('Cover Image removed !');
                }
            }).catch((error) => {
                if (error.response.data.profile_cover_image[0]) {
                    toast.error(error.response.data.profile_cover_image[0]);
                }
            })
        } else {
            toast.error('No Cover Image');
        }
    }
    return (
        <div>
            <Card className='w-[80%] ml-[10%] mt-10 mb-8 bg-[#dfdfdf] rounded-sm' >
                <Card className='rounded-sm'>
                    <div>
                        {(userData.profile_cover_image ? <img src={userData.profile_cover_image} alt="Cover image" className='w-full h-48 rounded-sm' /> :
                            <Card className='bg-[#c1e0b7]  h-48 rounded-sm  shadow-[#b9b7b7]'></Card>
                        )}
                        <div className='absolute right-3 -top-5'>
                            <Menu>
                                <MenuHandler>
                                    <FontAwesomeIcon icon={faPen} color='#051339' className=' w-5 h-5 mt-9 rounded-md shadow-2xl shadow-black hover:text-[#403f3f] bg-white border-4 border-white mr-4 hover:cursor-pointer ' />
                                </MenuHandler>
                                <MenuList className="max-h-72 font-prompt text-black">
                                    <MenuItem onClick={removeCoverImage}><FontAwesomeIcon icon={faTrash} color='#051339' className='mr-2' />Reomve Photo</MenuItem>
                                    <MenuItem onClick={handleProfileCoverImage}><FontAwesomeIcon icon={faEdit} color='#051339' className='mr-2' />Edit Photo</MenuItem>
                                </MenuList>
                            </Menu>
                            <input
                                type="file"
                                ref={fileInputCoverRef}
                                style={{ display: 'none' }}
                                onChange={AddProfileCoverImageHandle}
                            />
                        </div>
                        <div className=''>
                            <div className='absolute left-16 top-32 w-32 h-32 bg-[#e2e2e2] shadow-black rounded-md '>
                                {(userData.profile_image ? <img src={userData.profile_image} className='w-full h-full rounded-md' alt=" Profile image" /> : <FontAwesomeIcon icon={faUser} color='#051339' className='mt-8 ml-8 w-16 h-16' />)}
                                <div className='absolute -right-3 bottom-0'>
                                    <Menu>
                                        <MenuHandler>
                                            <FontAwesomeIcon icon={faPen} color='#051339' className=' w-4 h-4 mt-9 rounded-md shadow-2xl shadow-black hover:text-[#403f3f] bg-white border-4 border-white mr-4 hover:cursor-pointer ' />
                                        </MenuHandler>
                                        <MenuList className="max-h-72 font-prompt text-black">
                                            <MenuItem onClick={removeProfileImage}><FontAwesomeIcon icon={faTrash} color='#051339' className='mr-2' />Reomve Photo</MenuItem>
                                            <MenuItem onClick={handleProfileImage}><FontAwesomeIcon icon={faEdit} color='#051339' className='mr-2' />Edit Photo</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputProfileRef}
                                style={{ display: 'none' }}
                                onChange={AddProfileImageHandle}
                            />
                        </div>
                        <div className='mt-20 ml-10 mb-4 text-black'>

                            <Typography className='font-prompt-normal uppercase mb-1 ' variant='h5'>
                                {userData.username}
                            </Typography>
                            <Typography className='font-prompt uppercase' variant='h6'>
                                {UserProfile.header}
                            </Typography>
                            <Typography className='font-prompt uppercase' variant='h6'>
                                {UserProfile.description}
                            </Typography>
                            <Typography className='font-prompt capitalize' variant='h6'>
                                {UserProfile.Location}
                            </Typography>
                            <Typography className='font-prompt' variant='h5'>
                                74  connections
                            </Typography>

                        </div>

                    </div>
                </Card>

                <Card className='mt-4 rounded-sm'>
                    <Typography className='font-prompt mt-2 ml-6' variant='h5'>
                        About Your Profile
                    </Typography>
                    <div className='absolute right-2 -top-5'>
                        <FontAwesomeIcon onClick={handleOpen} icon={faPen} color='#FAFAFA' className=' w-5 h-5 mt-9 rounded-md shadow-2xl shadow-black 
                        hover:text-[#ffffff] bg-[#051339] border-4 border-[#051339] mr-4 hover:cursor-pointer hover:bg-[#1e2d56] hover:border-[#1e2d56] ' />
                    </div>
                    <div className='flex flex-col ml-10 mb-4 mt-1 gap-2 text-black'>
                        <Typography className='font-prompt' variant='h6'>
                            Name : {userData.username}
                        </Typography>
                        <Typography className='font-prompt ' variant='h6'>
                            Header : {UserProfile.header}
                        </Typography>
                        <Typography className='font-prompt ' variant='h6'>
                            Description : {UserProfile.description}
                        </Typography>
                        <Typography className='font-prompt ' variant='h6'>
                            Location : {UserProfile.Location}
                        </Typography>
                        <Typography className='font-prompt ' variant='h6'>
                            Email : {userData.email}
                        </Typography>
                        <Typography className='font-prompt ' variant='h6'>
                            Contacts : {userData.phone_number}
                        </Typography>



                    </div>
                </Card>

            </Card>

            {/* {edit modal} */}
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 1, y: -100 },
                }}>
                <DialogHeader className='font-prompt text-black'>Edit Profile</DialogHeader>
                <div className='flex flex-col gap-4'>

                    <input type="text" placeholder=' Name' onChange={(e) => setUserName(e.target.value)} value={userName} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />

                    <input type="text" placeholder=' Contacts' onChange={(e) => setUserContact(e.target.value)} value={userContact} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <input type="text" placeholder=' Location' onChange={(e) => setUserLoacation(e.target.value)} value={userLocation} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <input type="text" placeholder=' Header' onChange={(e) => setUserHeader(e.target.value)} value={userHeader} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />

                    <textarea type="text" placeholder=' Description' onChange={(e) => setUserDescription(e.target.value)} value={userDescription} className='border-2 w-[90%] ml-[4%] h-28 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />

                </div>
                <DialogFooter>
                    <Button variant="text" className='bg-[#d9dbdb] font-prompt-normal mr-1 text-black hover:bg-[#a4a4a4]' onClick={handleOpen}>
                        <span>Cancel</span>
                    </Button>
                    <Button variant="filled" className='bg-[#051339] font-prompt-normal' onClick={editCompanyDetails}>
                        <span>Update</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <Toaster />
        </div>
    )
}

export default UserProfile








