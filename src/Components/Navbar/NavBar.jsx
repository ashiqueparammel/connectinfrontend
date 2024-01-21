import React, { useEffect, useState } from "react";
import {
    Navbar, MobileNav, Typography, Button, IconButton, Card,
    List, ListItem, ListItemPrefix, Avatar,
    Menu, MenuHandler, MenuList, MenuItem, Dialog, DialogHeader
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faMessage, faBell, faUser, faSearch, faArrowRightToBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../Assets/Frame 20.png'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../Redux/Users";
import { CompanyResetState } from "../../Redux/Companyees";
import { LogoutBlackList, UserSearchList } from "../../Constants/Constants";
import axios from "axios";
import blankImage from '../../Assets/blankprofile.png'




function NavBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.user.userInfo);
    const [openNav, setOpenNav] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValues, setsearchValues] = useState('')
    const [searchUsersData, setsearchUsersData] = useState([])
    // const SearchhandleOpen = () => searchSetOpen(!searchOpen);/

    const logout = async () => {
        try {
            const AuthCheck = JSON.parse(localStorage.getItem('token'));
            const { access } = AuthCheck;
            const { refresh } = AuthCheck;
            const config = { headers: { Authorization: `Bearer ${access}` } };
            const token = { refresh_token: String(refresh) };
            // console.log(token, 'shhhhhhhhhhhhhhhhhhhhhhhahahhhafi');
            const LogoutUser = await axios.post(LogoutBlackList, token, config);
            const response = LogoutUser.data;
            localStorage.removeItem('token')
            dispatch(resetState);
            navigate('/login');
            // console.log(response, 'Authentication response data');
        } catch (error) {
            console.log("Error: ", error);
        }
    };





    useEffect(() => {
        if (searchValues !== '') {
            axios.get(UserSearchList + searchValues).then((response) => {
                setsearchUsersData(response.data)
            }).catch((error) => {
                console.error("Error fetching Searching user :", error);
            });
            setSearchOpen(true)
        }
        else {
            setSearchOpen(false)
        }


    }, [searchValues])





    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const Profileview = (event) => {
        setSearchOpen(false)
        setsearchValues('')
        navigate('/profileview', { state: { data: event } })
    }

    const navList = (
        <div>
            <div className="flex flex-col gap-2 absolute left-80 top-5">

                <input
                    type="search"
                    value={searchValues}
                    onChange={(e) => setsearchValues(e.target.value)}
                    placeholder="Search..."
                    style={{ paddingLeft: '14px' }}
                    className="text-black w-72 h-11 border-[1px] border-black rounded-md ml-2 focus:!border-black placeholder:font-prompt  "
                />
                {(searchOpen ?
                    <Card className="w-96 max-h-60">
                        <List className="min-h-20 max-h-60 overflow-y-auto z-50 hidescroll">
                            {(searchUsersData.length === 0 ? <h1 className="text-center text-lg font-prompt-normal" style={{ paddingTop: '15px' }} >User not found</h1> :
                                (searchUsersData.map((user, index) => (
                                    (userInfo.id !== user.id ? <ListItem key={index} className="min-h-16" onClick={(e) => Profileview(user.id)} >
                                        <ListItemPrefix>
                                            {user.profile_image ? (
                                                <Avatar variant="circular" alt="candice" src={user.profile_image} />
                                            ) : (
                                                <Avatar variant="circular" alt="candice" src={blankImage} />
                                            )}
                                        </ListItemPrefix>
                                        <div>
                                            <Typography variant="h6" color="blue-gray">
                                                {user.username}
                                            </Typography>
                                            <Typography variant="small" color="gray" className="font-normal">
                                                {user.email}
                                            </Typography>
                                        </div>
                                    </ListItem> : '')
                                ))))}
                        </List>
                    </Card>

                    : '')}

            </div>

            <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <Button onClick={() => navigate('/')} className='bg-[#051339] '><FontAwesomeIcon icon={faHome} className='w-12 h-6' /></Button>
                </Typography>
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <Button className='bg-[#051339] '><FontAwesomeIcon icon={faUsers} className='w-12 h-6' /></Button>
                </Typography>
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <Button onClick={() => navigate('/jobs')} className='bg-[#051339] '><FontAwesomeIcon icon={faBriefcase} className='w-12 h-6' /></Button>
                </Typography>
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <Button className='bg-[#051339] ' onClick={() => navigate('/chat')}><FontAwesomeIcon icon={faMessage} className='w-12 h-6' /></Button>
                </Typography>
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <Button className='bg-[#051339] '><FontAwesomeIcon icon={faBell} className='w-12 h-6' /></Button>
                </Typography>
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <Button className='bg-[#051339] '>
                        <Menu>
                            <MenuHandler>
                                <FontAwesomeIcon icon={faUser} className='text-white w-12 h-6' />
                            </MenuHandler>
                            <MenuList className="max-h-72">
                                <MenuItem onClick={() => navigate('/profile')} className="font-prompt text-black" ><FontAwesomeIcon icon={faCircleUser} className='text-[#051339] w-6 h-4' />Profile</MenuItem>
                                <MenuItem onClick={logout} className="font-prompt text-black"><FontAwesomeIcon icon={faArrowRightToBracket} className='text-[#051339] w-6 h-4' />Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Button>
                </Typography>
            </ul>
        </div>
    );




    return (
        <div className="-m-6  max-h-[550px]  w-[calc(100%+24px)] ">
            <Navbar className="sticky top-0 z-10 mt-6 h-[80px] max-w-full bg-[#051339] rounded-none px-4 py-2 lg:px-8 lg:py-4" color="bg-[#051339]">
                <div className="flex items-center justify-between text-white">
                    <Typography as="a" href="#" className="mr-4  cursor-pointer py-1.5 font-medium">
                        <img className='w-9 h-9 ml-10  ' src={Logo} alt=" logo" />
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="flex items-center gap-x-1">
                            {/* <Button
                                variant="text"
                                size="sm"
                                className="hidden lg:inline-block "
                            >
                                <span>Log In</span>
                            </Button>
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <span>Sign in</span>
                            </Button> */}
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 mr-3 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <MobileNav open={openNav} className="bg-white">
                    {navList}
                </MobileNav>
            </Navbar>




        </div>

    )


}

export default NavBar





























