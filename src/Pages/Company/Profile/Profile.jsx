import React, { useEffect, useState } from 'react'
import { Button, Card, Menu, MenuHandler, MenuList, MenuItem, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Select, Option } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { faEdit, faPen, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setCompanyDetails } from '../../../Redux/Companyees';
import { setUserDetails } from '../../../Redux/Users';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Company_Profile } from '../../../Constants/Constants';
import { size } from '../../../Helpers/Size';
import { allIndustries } from '../../../Helpers/Industries ';


function ProfileCompany() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [profile_cover_image, setprofile_cover_image] = useState(null);
    const [companyData, setCompanyData] = useState([]);
    const [userData, setUserData] = useState([]);
    
    //edit profile states
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [companyName, setCompanyName] = useState('')//companyData.company_name
    const [companyLocation, setCompanyLoacation] = useState('')
    const [companyDescription, setCompanyDescription] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companyContact, setCompanyContact] = useState('')




    useEffect(() => {

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
                    is_available: responseData.is_available
                }
                console.log(setCompany, '<<<user setting >>>');
                dispatch(setCompanyDetails(setCompany));
                dispatch(setUserDetails(responseData.user));

            })
                .catch((error) => {
                    navigate('/company/profileverify')
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    console.log(companyData, "company data");
    console.log(userData, "user data");

    const handleIndustryChange = (event) => {
        setSelectedIndustry(event.target.value);
    };
    // company size getting

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };



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
                                    <MenuItem><FontAwesomeIcon icon={faTrash} color='#051339' className='mr-2' />Reomve Photo</MenuItem>
                                    <MenuItem><FontAwesomeIcon icon={faEdit} color='#051339' className='mr-2' />Edit Photo</MenuItem>
                                </MenuList>
                            </Menu>
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
                                            <MenuItem><FontAwesomeIcon icon={faTrash} color='#051339' className='mr-2' />Reomve Photo</MenuItem>
                                            <MenuItem><FontAwesomeIcon icon={faEdit} color='#051339' className='mr-2' />Edit Photo</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </div>
                            </div>

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

                    <input type="text" placeholder='Company name' className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <select
                        value={selectedIndustry}
                        onChange={handleIndustryChange}
                        className="!border-black bg-white focus:!border-t-black border-2 w-[90%] ml-[4%] h-12 rounded-sm"
                        style={{ paddingLeft: '20px' }}>
                        <option value="" disabled hidden>
                            {selectedIndustry ? '' : 'Select a Company type'}
                        </option>
                        {allIndustries.map((industry, index) => (
                            <option key={`${index}:${industry}`} value={industry} >
                                {industry}
                            </option>
                        ))}
                    </select>

                    <input type="text" placeholder='Company Contacts' className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <input type="text" placeholder='Company Location' className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <input type="text" placeholder='Company Address' className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <select
                        value={selectedSize}
                        onChange={handleSizeChange}
                        className="!border-black bg-white focus:!border-t-black border-2 w-[90%] ml-[4%] h-12 rounded-sm"
                        style={{ paddingLeft: '20px' }}>
                        <option value="" disabled hidden>
                            {selectedSize ? '' : 'Select a Company Size'}
                        </option>
                        {size.map((companySize, index) => (
                            <option key={`${index}:${companySize}`} value={companySize} >
                                {companySize}
                            </option>
                        ))}
                    </select>
                    <textarea type="text" placeholder='Company Description' className='border-2 w-[90%] ml-[4%] h-28 rounded-sm
                         border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />

                </div>
                <DialogFooter>
                    <Button
                        variant="text"
                        className='bg-[#d9dbdb] font-prompt-normal mr-1 text-black hover:bg-[#a4a4a4]'
                        onClick={handleOpen}

                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="filled" className='bg-[#051339] font-prompt-normal' onClick={handleOpen}>
                        <span>Update</span>
                    </Button>
                </DialogFooter>
            </Dialog>

        </div>
    )
}

export default ProfileCompany
