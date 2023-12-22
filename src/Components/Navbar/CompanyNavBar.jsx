import React from "react";
import { Navbar, MobileNav, Typography, Button, IconButton, Card, Input, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faMessage, faBell, faUser, faSearch, faArrowRightToBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../Assets/Frame 20.png'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetState } from "../../Redux/Users";
import { CompanyResetState } from "../../Redux/Companyees";

function CompanyNavBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const logout = () => {
        localStorage.removeItem('token')
        dispatch(resetState);
        dispatch(CompanyResetState);
        navigate('/login');
    }
    
    const [openNav, setOpenNav] = React.useState(false);
    
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);
    
    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Input
                type="search"
                placeholder="Search"
                containerProps={{
                    className: "min-w-[288px]",
                }}
                className=" !border-black placeholder:text-black focus:!border-black placeholder:font-prompt bg-white "
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            />
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
                <Button onClick={() => navigate('/')} className='bg-[#051339] '><FontAwesomeIcon icon={faBriefcase} className='w-12 h-6' /></Button>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Button className='bg-[#051339] '><FontAwesomeIcon icon={faMessage} className='w-12 h-6' /></Button>
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
                        <MenuItem onClick={() => navigate('/company/profile')} className="font-prompt text-black" ><FontAwesomeIcon icon={faCircleUser} className='text-[#051339] w-6 h-4' />Profile</MenuItem>
                        <MenuItem onClick={logout} className="font-prompt text-black"><FontAwesomeIcon icon={faArrowRightToBracket} className='text-[#051339] w-6 h-4' />Logout</MenuItem>
                    </MenuList>
                </Menu>
                </Button>
            </Typography>
        </ul>
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

export default CompanyNavBar












































