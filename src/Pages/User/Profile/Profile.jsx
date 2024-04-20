import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Menu, MenuHandler, MenuList, MenuItem, Typography, Dialog, DialogHeader, DialogFooter, CardFooter, CardBody, } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { faClose, faEdit, faEllipsisVertical, faEye, faFilePdf, faPen, faPlus, faRemove, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ConnectionChatList, EducationAdd, EducationUpdate, EmployeeProfileUpdate, ListPersonalEducation, ListPersonalSkills, List_Skills, PersonalSkillsAdd, RemovePersonalSkills, UserDetails, UserProfileDetails } from '../../../Constants/Constants';
import toast, { Toaster } from 'react-hot-toast'
import { pdfjs } from 'react-pdf';
import PdfHelper from '../../../Helpers/PdfHelper';
import Loader from '../../Loader/Loader';



pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url,).toString();

function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [UserProfile, setUserProfile] = useState([])
    const [userData, setUserData] = useState([]);
    const [editManage, setEditManage] = useState(false);
    const [removeskillsManage, setRemoveskillsManage] = useState(false);
    const handleRemove = () => setRemoveskillsManage(!removeskillsManage);
    const [EducationList, setEducationList] = useState([])
    const [ConnetionCount, setConnetionCount] = useState('')
    const [LoadingManage, setLoadingManage] = useState(false)
    
    // education
    const [addEducationopen, setaddEducationopen] = useState(false);
    const handleOpenAddEducation = () => setaddEducationopen(!addEducationopen);


    //  view cv 
    const [Cvopen, setCvOpen] = useState(false);
    const CvViewOpen = () => setCvOpen((cur) => !cur);

    //edit Education
    const [editEducationopen, setEditEducationopen] = useState(false);
    const handleOpenEditEducation = () => setEditEducationopen(!editEducationopen);
    const [Qualifications, setQualifications] = useState('');
    const [Institutes, setInstitutes] = useState('');
    const [Years, setYears] = useState('');
    const [Descriptions, setDescriptions] = useState('');
    const [EducationId, setEducationId] = useState('')




    //edit profile states
    const [userName, setUserName] = useState('');
    const [userLocation, setUserLoacation] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userHeader, setUserHeader] = useState('');
    const [userContact, setUserContact] = useState('');
    const [allSkills, setAllSkills] = useState([])

    //Image states
    const fileInputCoverRef = useRef(null);
    const fileInputProfileRef = useRef(null);
    const fileInputCVRef = useRef(null);
    //  skills
    const [addOnNewSkills, setaddOnNewSkills] = useState('')
    const [RequiredSkills, setRequiredSkills] = useState([])
    const [profileAllSkills, setprofileAllSkills] = useState([])
    const [profileAllSkillsid, setprofileAllSkillsid] = useState([])
    const [addNewSkills, setaddNewSkills] = useState('')
    const [updateSkills, setUpdateSkills] = useState([])
    const [openSkill, setSkillOpen] = useState(false);
    let tempre = '';

    const handleSkillOpen = () => setSkillOpen((cur) => !cur);

    useEffect(() => {
        setEditManage(false)
        if (userInfo) {
            setLoadingManage(true)
            const userData = axios.get(`${UserProfileDetails}${userInfo.id}/`).then((response) => {
                let userprofiledata = response.data
                if (userprofiledata.length > 0) {
                    let { user } = response.data[0]
                    setUserData(user)
                    let temp1 = response.data[0]
                    if (temp1.cv_file){
                        let tempre = temp1.cv_file;
                        tempre = tempre.substring(0, 4) + "" + tempre.substring(4);
                        temp1.cv_file = tempre
                    }
                    setUserProfile(temp1)

                    setUserName(user.username)
                    setUserLoacation(response.data[0].Location)
                    setUserDescription(response.data[0].description)
                    setUserHeader(response.data[0].header)
                    setUserContact(user.phone_number)
                    axios.get(`${ListPersonalSkills}${response.data[0].id}/`).then((response) => {
                        setRequiredSkills(response.data);
                        console.log('finaljob skills get', response.data);
                        const oldskill = response.data
                        let obj = {}
                        const updateskill = []
                        const objskill = []
                        const objskillid = []
                        for (let skill = 0; skill < response.data.length; skill++) {
                            obj = oldskill[skill]
                            updateskill.push(obj.id)
                            objskill.push(obj.skills)
                            objskillid.push(obj.skills.id)
                        }
                        setUpdateSkills(updateskill)
                        setprofileAllSkills(objskill)
                        setprofileAllSkillsid(objskillid)
                    }).catch((error) => {
                        console.error("Error fetching job details:", error);
                    });
                    axios.get(List_Skills).then((response) => {
                        setAllSkills(response.data)
                    }).catch((error) => {
                        console.log(error, 'error get skills');

                    })
                    axios.get(`${ListPersonalEducation}${response.data[0].id}/`).then((response) => {
                        setEducationList(response.data)
                        console.log('educations:', response.data);
                    }).catch((error) => {
                        console.log(error, 'error get Education');

                    })

                    axios.get(`${ConnectionChatList}${userInfo.id}/`).then((response) => {
                        
                        const count = response.data.length
                        setConnetionCount(count)
            
                    }).catch((error) => { console.log(error); })
            
                }
                setLoadingManage(false)
            })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [editManage]);



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
            else if (userLocation === "") {
                toast.error('Location should not be empty!');
                return false;
            } else if (userHeader === "") {
                toast.error('Header should not be empty!');
                return false;
            }
            else if (userDescription === "") {
                toast.error('Description should not be empty!');
                return false;
            }
            else if (userContact === "") {
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
                setLoadingManage(true)
                axios.patch(`${EmployeeProfileUpdate}${UserProfile.id}/`, editForm).then((response) => {
                    if (response.status === 200) {
                        const userForm = {
                            phone_number: userContact,
                            username: userName
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
                    setLoadingManage(false)
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

    const removeCV = () => {
        if (UserProfile.cv_file) {
            const remove_cv_file = {
                cv_file: null
            }
            axios.patch(`${EmployeeProfileUpdate}${UserProfile.id}/`, remove_cv_file).then((response) => {
                if (response.status === 200) {
                    setEditManage(true)
                    toast.success('Your CV removed !');
                }
            }).catch((error) => {
                if (error.response.data.cv_file[0]) {
                    toast.error(error.response.data.cv_file[0]);
                }
            })
        } else {
            toast.error('No CV');
        }
    }
    const updateCV = (event) => {
        console.log('hello', event.target.files[0]);
        const file = event.target.files[0];
        if (file.type === "application/pdf") {
            const AddCV = new FormData();
            AddCV.append('cv_file', file);
            axios.patch(`${EmployeeProfileUpdate}${UserProfile.id}/`, AddCV).then((response) => {
                if (response.status === 200) {
                    setEditManage(true)
                    toast.success(' Your CV Updated !');
                }
            }).catch((error) => {
                if (error.response.data.cv_file[0]) {
                    toast.error(error.response.data.cv_file[0]);
                }
            })
        }
        else {

            toast.error(' CV should be Pdf file !');
        }
    }

    const HandleCV = () => {
        fileInputCVRef.current.click();
    }

    const AddNewOnskills = () => {
        const addOnskill = {
            skills: addOnNewSkills
        }
        try {
            setLoadingManage(true)
            axios.post(List_Skills, addOnskill).then((response) => {
                if (response.status === 201) {
                    const res = response.data
                    setprofileAllSkills([...profileAllSkills, res])
                    setprofileAllSkillsid([...profileAllSkillsid, res.id])
                    toast.success('Your On skill Added');
                    const addOnskill = {
                        skills: res.id,
                        profile: UserProfile.id
                    }
                    try {
                        axios.post(PersonalSkillsAdd, addOnskill).then((response) => {
                            if (response.status === 201) {
                                const res = response.data
                                setprofileAllSkills([...profileAllSkills, res])
                                setprofileAllSkillsid([...profileAllSkillsid, res.id])

                            }
                        }).catch((error) => {
                            if (error.response.data.skills) {
                                toast.error('This skill already there!');
                            }
                        });
                    } catch (error) {
                        console.log('error add skills', error);
                    }
                }
            }).catch((error) => {
                if (error.response.data.skills) {
                    toast.error('This skill already there!');
                }
            });
            setLoadingManage(false)
        } catch (error) {
            console.log('error add skills', error);
        }
        setEditManage(true)
        handleSkillOpen()
    }

    const addOptionalskills = (value) => {
        const exist = profileAllSkills.find((obj) => obj.id === parseInt(value))
        if (exist) {
            toast.error(' This skill already enterd!')
        } else {
            console.log(value, 'check skills id true');
            setaddNewSkills(value)
            setprofileAllSkills([...profileAllSkills, allSkills[value - 1]])
            setprofileAllSkillsid([...profileAllSkillsid, value])
            const addOnskill = {
                skills: parseInt(value),
                profile: UserProfile.id
            }
            try {
                axios.post(PersonalSkillsAdd, addOnskill).then((response) => {
                    if (response.status === 201) {
                        const res = response.data
                        setprofileAllSkills([...profileAllSkills, res])
                        setprofileAllSkillsid([...profileAllSkillsid, res.id])
                        toast.success(' Skill Added');
                    }
                }).catch((error) => {
                    if (error.response.data.skills) {
                        toast.error('This skill already there!');
                    }
                });
            } catch (error) {
                console.log('error add skills', error);
            }
            setEditManage(true)
            handleSkillOpen()
        }

    }

    const removeSelectedSkills = (skills) => {
      
        try {
            axios.delete(`${RemovePersonalSkills}${parseInt(skills)}/`,).then((response) => {
                if (response.status === 204) {
                    setEditManage(true)
                }
            }).catch((error) => {
                if (error.response.data.skills) {
                    toast.error('error!!');
                }
            });
        } catch (error) {
            console.log('error add skills', error);
        }

        setprofileAllSkillsid(profileAllSkillsid.filter((obj) => parseInt(obj) !== skills))
        setprofileAllSkills(profileAllSkills.filter((obj2) => obj2.id !== skills))
    }


    const AddEducationform = async (e) => {
        e.preventDefault();

        const Education = {
            profile: UserProfile.id,
            qualification: e.target.qualification.value,
            Institute_name: e.target.institute.value,
            Studied_year: e.target.studyyear.value,
            description: e.target.description.value,
        };
        console.log('Education data:', Education);
        const validateForm = () => {
            if (Education.qualification.trim() === "") {
                toast.error('Qualification should not be empty!');
                return false;
            }
            else if (Education.Institute_name.trim() === "") {
                toast.error('Institute name should not be empty!');
                return false;
            }
            else if (Education.Studied_year.trim() === "") {
                toast.error('Studied year should not be empty!');
                return false;
            }
            else if (Education.description.trim() === "") {
                toast.error('description should not be empty!');
                return false;
            }
            return true;
        };
        if (validateForm()) {
            try {
                setLoadingManage(true)
                const responseData = await axios.post(EducationAdd, Education);
                const response = responseData.data
                console.log(responseData);
                if (responseData.status === 201) {
                    toast.success('Education Added successfully!')
                    setLoadingManage(false)
                    setEditManage(true)
                    handleOpenAddEducation()
                }
            } catch (error) {
                console.error('Error during Education addd:', error);
                toast.error(error);
            }
        }
    }


    const removeEducation = (event) => {
        console.log(event, 'removeid');
        try {
            setLoadingManage(true)
            const responseData = axios.delete(`${EducationUpdate}${event}/`,).then((response) => {
                if (response.status === 204) {
                    setLoadingManage(false)
                    toast.success('Education deleted successfully!')

                    setEditManage(true)
                }
            })

        } catch (error) {
            console.error('Error during Education delete:', error);
            toast.error(error);
        }

    }


    const editEducation = (event) => {

        const editData = EducationList.find((education) => education.id === event)
        setQualifications(editData.qualification)
        setInstitutes(editData.Institute_name)
        setYears(editData.Studied_year)
        setDescriptions(editData.description)
        setEducationId(editData.id)
        console.log(editData, 'edit education');
        handleOpenEditEducation()

    }

    const updateEducation = () => {
        const Education = {
            profile: UserProfile.id,
            qualification: Qualifications,
            Institute_name: Institutes,
            Studied_year: Years,
            description: Descriptions,
        };
        const validateForm = () => {
            if (Education.qualification.trim() === "") {
                toast.error('Qualification should not be empty!');
                return false;
            }
            else if (Education.Institute_name.trim() === "") {
                toast.error('Institute name should not be empty!');
                return false;
            }
            else if (Education.Studied_year.trim() === "") {
                toast.error('Studied year should not be empty!');
                return false;
            }
            else if (Education.description.trim() === "") {
                toast.error('description should not be empty!');
                return false;
            }
            return true;
        };
        if (validateForm()) {
            try {
                const responseData = axios.patch(`${EducationUpdate}${EducationId}/`, Education).then((response) => {
                    if (response.status === 200) {
                        toast.success('Education Updated successfully!')
                        setEditManage(true)
                        handleOpenEditEducation()

                    }
                })

            } catch (error) {
                console.error('Error during Education delete:', error);
                toast.error(error);
            }
        }

    }

    return (
        <div>
              <>
                {(LoadingManage ? <div className='absolute ml-[50%] mt-[20%] bg-opacity-50 items-center '><Loader /></div> : '')}
            </>
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
                            {ConnetionCount}  connections
                            </Typography>
                            <Card className='w-[40%] h-14 absolute right-12  shadow-2xl border-[1px] text-center font-prompt  text-black text-lg border-[#000000] top-64 rounded-sm'>
                                <div className='flex flex-row justify-between mt-1 ml-4'>
                                    <FontAwesomeIcon icon={faFilePdf} color='#051339' className='w-6 h-12' />
                                    <h1 className='mt-2'>{(UserProfile.cv_file ? <div onClick={CvViewOpen} className='flex flex-row gap-10 bg-[#dfdbdb] hover:cursor-pointer hover:bg-[#b6b3b3] rounded-sm '><h1 className='ml-2' >view your cv </h1><FontAwesomeIcon icon={faEye} color='#051339' className=' w-6 h-8 mr-2' /></div> : 'Upload Your CV')}</h1>

                                    <Menu>
                                        <MenuHandler>
                                            <FontAwesomeIcon icon={faEllipsisVertical} color='#051339' className=' w-5 h-5 mt-2  rounded-md shadow-2xl shadow-black hover:text-[#403f3f] bg-white border-4 border-white mr-4 hover:cursor-pointer ' />
                                        </MenuHandler>
                                        <MenuList className="max-h-72 font-prompt text-black">
                                            <MenuItem onClick={removeCV}><FontAwesomeIcon icon={faTrash} color='#051339' className='mr-2' />Remove CV</MenuItem>
                                            <MenuItem onClick={HandleCV}><FontAwesomeIcon icon={faEdit} color='#051339' className='mr-2' />{(UserProfile.cv_file ? 'Update CV' : 'Upload CV')}</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputCVRef}
                                    style={{ display: 'none' }}
                                    onChange={updateCV}
                                />
                            </Card>

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
                <Card className='mt-1 rounded-sm'>
                    <Typography className='font-prompt mt-2 ml-6' variant='h5'>
                        About Your Education
                        <div className=' right-24 top-[35.5px]'>
                            <FontAwesomeIcon onClick={handleOpenAddEducation} icon={faPlus} title="Add Education" color='#FAFAFA' className=' w-5 h-5 mt-3  rounded-md shadow-2xl shadow-black 
                                hover:text-[#ffffff] bg-[#051339] border-4 border-[#051339] mr-4 hover:cursor-pointer hover:bg-[#1e2d56] hover:border-[#1e2d56] ' />
                        </div>
                    </Typography>
                    {EducationList.map((education) => (
                        <div key={education.id} style={{ borderBottom: '1px solid #9da3a3' }}>

                            <div className='ml-[1120px] flex flex-row'>
                                <div className=''>
                                    <FontAwesomeIcon onClick={(e) => editEducation(education.id)} icon={faPen} title="Update Education" color='#FAFAFA' className=' w-5 h-5 mt-3  rounded-md shadow-2xl shadow-black 
                                hover:text-[#ffffff] bg-[#051339] border-4 border-[#051339] mr-4 hover:cursor-pointer hover:bg-[#1e2d56] hover:border-[#1e2d56] ' />



                                </div>
                                <div className=''>
                                    <FontAwesomeIcon onClick={(e) => removeEducation(education.id)} title="Remove Education" icon={faClose} color='#FAFAFA' className=' w-5 h-5 mt-3  rounded-md shadow-2xl shadow-black 
                                hover:text-[#ffffff] bg-[#051339] border-4 border-[#051339] mr-4 hover:cursor-pointer hover:bg-[#1e2d56] hover:border-[#1e2d56] ' />
                                </div>
                            </div>
                            <div className='flex flex-col ml-10 mb-4   text-black'>
                                <Typography className='font-prompt' variant='h6'>
                                    Qualification : <span className='text-lg'>{education.qualification}</span>
                                </Typography>
                                <Typography className='font-prompt ' variant='h6'>
                                    Institute : {education.Institute_name}
                                </Typography>
                                <Typography className='font-prompt ' variant='h6'>
                                    Description : {education.description}
                                </Typography>
                                <Typography className='font-prompt ' variant='h6'>
                                    Study year : {education.Studied_year}
                                </Typography>
                            </div>
                        </div>




                    ))}

                </Card>


                <Card className='bg-[#FAFAFA] shadow-2xl py-2 px-5 rounded-sm mt-1 w-full  '>
                    <div className='flex flex-row gap-5 mb-4'>
                        <Typography className='font-prompt text-lg'>Your Skills</Typography>
                        <Button onClick={handleSkillOpen} className='bg-[#051339] mt-1 rounded-md  w-14 left-5'><FontAwesomeIcon icon={faPlus} /></Button>
                        <Button onClick={handleRemove} className='bg-[#051339] mt-1 rounded-md  w-14 left-5 ml-2'><FontAwesomeIcon icon={faTrash} /></Button>

                    </div>


                    <div className='flex flex-row gap-2'>
                        {RequiredSkills.map((skills) => (
                            < div key={skills.id} className='font-prompt text-black flex flex-row mb-4 mt-4 '>
                                <div className='bg-[#cacbcb] border-[1px] border-black flex gap-1 rounded-md text-black'><p className='font-prompt ml-1 mr-1'>{skills.skills.skills} </p>
                                    {(removeskillsManage ? <FontAwesomeIcon icon={faRemove} onClick={(e) => removeSelectedSkills(skills.id)} className='mr-1 mt-1 hover:opacity-50 hover:cursor-pointer' /> : '')}
                                </div>
                            </div>
                        ))}
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

            {/* cv view modal */}
            <div>
                <Dialog size="md" open={Cvopen} handler={CvViewOpen} className="bg-transparent border-none border-0 shadow-none  rounded-none " style={{ position: 'absolute', top: '0', }}>
                    <Card style={{ maxHeight: '670px', overflowY: 'auto' }} className='rounded-none border-0'>
                        <PdfHelper cvFileUrl={UserProfile.cv_file} />
                    </Card>
                </Dialog>
            </div>

            {/* {add skills} */}
            <Dialog
                size="xs"
                open={openSkill}
                handler={handleSkillOpen}
                className="bg-transparent shadow-none rounded-sm">
                <Card className="mx-auto w-full max-w-[24rem] rounded-sm">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="black" className='font-prompt'>
                            Add Skills
                        </Typography>

                        <Typography className="-mb-2 font-prompt ml-[2%]" variant="h6" >
                            Select skills
                        </Typography>

                        <select
                            value={addNewSkills}
                            onChange={(e) => addOptionalskills(e.target.value)}
                            className="!border-black bg-white focus:!border-t-black border-2 w-[95%] ml-[2%] h-12 rounded-sm"
                            style={{ paddingLeft: '20px' }}>
                            <option value="" disabled hidden>
                                {addNewSkills ? '' : 'Select skills'}
                            </option>

                            {allSkills.map((skills) => (
                                <option key={skills.id} value={skills.id} className='font-prompt text-black'>
                                    {skills.skills}
                                </option>
                            ))}
                        </select>

                        <Typography className="-mb-2 font-prompt ml-[2%]" variant="h6" >
                            Add your on skills
                        </Typography>
                        <input type="text" placeholder='Add your on skills' onChange={(e) => setaddOnNewSkills(e.target.value)} className='border-2 w-[95%] ml-[2%] h-12 rounded-sm
                      border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="filled" className='bg-[#051339] w-[50%] rounded-sm h-12 mt-3 ml-20' onClick={AddNewOnskills} fullWidth>
                            Add skills
                        </Button>


                    </CardFooter>
                </Card>
                <Toaster />

            </Dialog>

            {/* {Add Education modal} */}
            <Dialog
                open={addEducationopen}
                handler={handleOpenAddEducation}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 1, y: -100 },
                }}>
                <form onSubmit={(e) => AddEducationform(e)}>

                    <DialogHeader className='font-prompt text-black'>Add Education</DialogHeader>
                    <div className='flex flex-col gap-4'>

                        <input type="text" placeholder=' Qualification' name="qualification" className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                        border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                        <input type="text" placeholder=' Institute' name='institute' className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                        border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                        <input type="text" placeholder=' Study year' name='studyyear' className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                        border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                        <textarea type="text" placeholder=' Description' name='description' className='border-2 w-[90%] ml-[4%] h-28 rounded-sm
                        border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    </div>
                    <DialogFooter>
                        <Button variant="text" className='bg-[#d9dbdb] font-prompt-normal mr-1 text-black hover:bg-[#a4a4a4]' onClick={handleOpenAddEducation}>
                            <span>Cancel</span>
                        </Button>
                        <Button type='submit' variant="filled" className='bg-[#051339] font-prompt-normal'>
                            <span>Add Education</span>
                        </Button>
                    </DialogFooter>
                    <Toaster />

                </form>
            </Dialog>


            {/* {edit Education modal} */}
            <Dialog
                open={editEducationopen}
                handler={handleOpenEditEducation}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 1, y: -100 },
                }}>
                <DialogHeader className='font-prompt text-black'>Edit Education</DialogHeader>
                <div className='flex flex-col gap-4'>

                    <input type="text" placeholder=' Qualification' onChange={(e) => setQualifications(e.target.value)} value={Qualifications} name="qualification" className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                                                border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <input type="text" placeholder=' Institute' onChange={(e) => setInstitutes(e.target.value)} value={Institutes} name='institute' className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                                                border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <input type="text" placeholder=' Study year' onChange={(e) => setYears(e.target.value)} value={Years} name='studyyear' className='border-2 w-[90%] ml-[4%] h-12 rounded-sm
                                                border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                    <textarea type="text" placeholder=' Description' onChange={(e) => setDescriptions(e.target.value)} value={Descriptions} name='description' className='border-2 w-[90%] ml-[4%] h-28 rounded-sm
                                                border-[#434242] font-prompt text-black' style={{ paddingLeft: '20px' }} />
                </div>
                <DialogFooter>
                    <Button variant="text" className='bg-[#d9dbdb] font-prompt-normal mr-1 text-black hover:bg-[#a4a4a4]' onClick={handleOpenEditEducation}>
                        <span>Cancel</span>
                    </Button>
                    <Button variant="filled" onClick={updateEducation} className='bg-[#051339] font-prompt-normal'>
                        <span>Update</span>
                    </Button>
                </DialogFooter>
                <Toaster />

            </Dialog>

            <Toaster />
        </div>
    )
}

export default UserProfile

























