import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Menu, MenuHandler, MenuList, MenuItem, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Select, Option } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { faEdit, faPen, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setCompanyDetails } from '../../../Redux/Companyees';
import { setUserDetails } from '../../../Redux/Users';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CompanyDetails, CompanyUpdate, Company_Profile } from '../../../Constants/Constants';
import { size } from '../../../Helpers/Size';
import { allIndustries } from '../../../Helpers/Industries ';
import toast, { Toaster } from 'react-hot-toast'


function ProfileCompany() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [companyData, setCompanyData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [editManage, setEditManage] = useState(false);
    //edit profile states
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyLocation, setCompanyLoacation] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyContact, setCompanyContact] = useState('');

    //Image states
    const fileInputCoverRef = useRef(null);
    const fileInputProfileRef = useRef(null);

    const [addProfileImage, setaddProfileImage] = useState(null)
    const [addProfileCoverImage, setaddProfileCoverImage] = useState(null)

    useEffect(() => {
        setEditManage(false)
        if (userInfo) {
            const userData = axios.get(`${Company_Profile}${userInfo.id}/`).then((response) => {
                const responseData = response.data[0];
                const { user } = responseData
                setUserData(user)
                setCompanyData(responseData)
                const setCompany = {
                    Company_id: responseData.id,
                    user: responseData.user,
                    Address: responseData.Address,
                    Company_Size: responseData.Company_Size,
                    Industry: responseData.Industry,
                    Location: responseData.Location,
                    company_name: responseData.company_name,
                    is_available: responseData.is_available,
                    Description: responseData.Description
                }
                setCompanyName(responseData.company_name)
                setSelectedIndustry(responseData.Industry)
                setCompanyContact(user.phone_number)
                setCompanyLoacation(responseData.Location)
                setCompanyAddress(responseData.Address)
                setSelectedSize(responseData.Company_Size)
                setCompanyDescription(responseData.Description)
                dispatch(setCompanyDetails(setCompany));
                dispatch(setUserDetails(responseData.user));
            })
                .catch((error) => {
                    navigate('/company/profileverify')
                    console.error("Error fetching user data:", error);
                });
        }
    }, [editManage]);

    // console.log(companyData, "company data");
    // console.log(userData, "user data");
    // console.log(companyName, "company name data");

    const editCompanyDetails = () => {
        const editForm = {
            company_name: companyName,
            Industry: selectedIndustry,
            Company_Size: selectedSize,
            Location: companyLocation,
            Address: companyAddress,
            Description: companyDescription,
        }
        const validForm = () => {
            if (companyName.trim() === "") {
                toast.error('Company Name should not be empty!');
                return false;
            } else if (selectedIndustry.trim() === "") {
                toast.error('Industry should not be empty!');
                return false;
            } else if (selectedSize.trim() === "") {
                toast.error(' Size should not be empty!');
                return false;
            } else if (companyLocation.trim() === "") {
                toast.error('Location should not be empty!');
                return false;
            } else if (companyAddress.trim() === "") {
                toast.error('Address should not be empty!');
                return false;
            }
            else if (companyDescription.trim() === "") {
                toast.error('Description should not be empty!');
                return false;
            }
            else if (companyContact.trim() === "") {
                toast.error('Phonenumber should not be empty!');
                return false;
            }
            else if (companyContact[0] !== '+') {
                toast.error('Phone Must be want country code!');
                return false;
            }
            return true;
        }
        if (validForm()) {

            console.log(companyData.id, 'function is working proper');
            try {
                axios.patch(`${CompanyUpdate}${companyData.id}/`, editForm).then((response) => {
                    if (response.status === 200 && companyContact) {
                        const userContact = {
                            phone_number: companyContact
                        }
                        axios.patch(`${CompanyDetails}${userInfo.id}/`, userContact).catch((error) => {
                            if (error.response.data.phone_number[0]) {
                                toast.error(error.response.data.phone_number[0]);
                            }
                        })
                        console.log('=============<<<<<<<???done');
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
        if (userInfo.profile_image) {

            const removeImageProfile = {
                profile_image: null
            }
            axios.patch(`${CompanyDetails}${userInfo.id}/`, removeImageProfile).then((response) => {
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
        axios.patch(`${CompanyDetails}${userInfo.id}/`, Addprofile).then((response) => {
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
        axios.patch(`${CompanyDetails}${userInfo.id}/`, AddcoverImage).then((response) => {
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
        if (userInfo.profile_image) {

            const removeImageProfile = {
                profile_cover_image: null
            }
            axios.patch(`${CompanyDetails}${userInfo.id}/`, removeImageProfile).then((response) => {
                if (response.status === 200) {
                    setEditManage(true)
                    toast.success('Cover Image removed !');
                }
            }).catch((error) => {
                if (error.response.data.profile_image[0]) {
                    toast.error(error.response.data.profile_image[0]);
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

                            <Typography className='font-prompt-normal ml-7 mb-1 ' variant='h5'>
                                {companyData.company_name}
                            </Typography>
                            <Typography className='font-prompt' variant='h5'>
                                {userData.email}
                            </Typography>
                            <Typography className='font-prompt' variant='h6'>
                                {companyData.Location}
                            </Typography>
                            <Typography className='font-prompt' variant='h5'>
                                74  connections
                            </Typography>

                        </div>

                    </div>
                </Card>

                <Card className='mt-4 rounded-sm'>
                    <Typography className='font-prompt mt-2 ml-6' variant='h5'>
                        About Your Company
                    </Typography>
                    <div className='absolute right-2 -top-5'>
                        <FontAwesomeIcon onClick={handleOpen} icon={faPen} color='#FAFAFA' className=' w-5 h-5 mt-9 rounded-md shadow-2xl shadow-black 
                        hover:text-[#ffffff] bg-[#051339] border-4 border-[#051339] mr-4 hover:cursor-pointer hover:bg-[#1e2d56] hover:border-[#1e2d56] ' />
                    </div>
                    <div className='flex flex-col ml-10 mb-4 mt-1 gap-2 text-black'>
                        <Typography className='font-prompt' variant='h6'>
                            Company Name : {companyData.company_name}
                        </Typography>
                        <Typography className='font-prompt ' variant='h6'>
                            Company type : {companyData.Industry}
                        </Typography>
                        <Typography className='font-prompt ' variant='h6'>
                            Company Contacts : {userData.phone_number}
                        </Typography>
                        <Typography className='font-prompt ' variant='h6'>
                            Company Location : {companyData.Location}
                        </Typography>
                        <Typography className='font-prompt ' variant='h6'>
                            Company Address : {companyData.Address}
                        </Typography>
                        <Typography className='font-prompt ' variant='h6'>
                            Company Size : {companyData.Company_Size}
                        </Typography>
                        <Typography className='font-prompt ' variant='h6'>
                            Company Description : {companyData.Description}
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
                <DialogHeader className='font-prompt text-black'>Edit Company Profile</DialogHeader>
                <div className='flex flex-col gap-4'>

                    <input type="text" placeholder='Company Name' onChange={(e) => setCompanyName(e.target.value)} value={companyName} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="!border-black bg-white focus:!border-t-black border-2 w-[90%] ml-[4%] h-12 rounded-sm"
                        style={{ paddingLeft: '20px' }}>
                        <option value="" disabled hidden>
                            {selectedIndustry ? '' : 'Select a Company type'}
                        </option>
                        {allIndustries.map((industry, index) => (
                            <option key={`${index}:${industry}`} value={industry} className='font-prompt text-black'>
                                {industry}
                            </option>
                        ))}
                    </select>

                    <input type="text" placeholder='Company Contacts' onChange={(e) => setCompanyContact(e.target.value)} value={companyContact} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <input type="text" placeholder='Company Location' onChange={(e) => setCompanyLoacation(e.target.value)} value={companyLocation} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <input type="text" placeholder='Company Address' onChange={(e) => setCompanyAddress(e.target.value)} value={companyAddress} className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="!border-black bg-white focus:!border-t-black border-2 w-[90%] ml-[4%] h-12 rounded-sm"
                        style={{ paddingLeft: '20px' }}>
                        <option value="" disabled hidden>
                            {selectedSize ? '' : 'Select a Company Size'}
                        </option>
                        {size.map((companySize, index) => (
                            <option key={`${index}:${companySize}`} value={companySize} className='font-prompt text-black' >
                                {companySize}
                            </option>
                        ))}
                    </select>
                    <textarea type="text" placeholder='Company Description' onChange={(e) => setCompanyDescription(e.target.value)} value={companyDescription} className='border-2 w-[90%] ml-[4%] h-28 rounded-sm
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
export default ProfileCompany
