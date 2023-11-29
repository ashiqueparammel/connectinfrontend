import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { UserCircleIcon, UsersIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { CompanyDetails } from '../../Constants/Constants';


function CompanyHome() {
    const [userDetails, setuserDetails] = useState([])

    const userInfo = useSelector((state) => state.user.userInfo)


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
        <div className='text-center mt-5'>This Is Company Home
            <Card className="h-1/2 bg-[#ededed] w-full max-w-[20rem]  ml-16 p-4 shadow-xl shadow-blue-gray-900/2">
                {(userDetails.profile_cover_image ?
                    <div style={{ backgroundImage: `url(${userDetails.profile_cover_image})` }} className='rounded-lg h-28  shadow-xl shadow-[#b9b7b7]'>
                        <div >
                            {(userDetails.profile_image ? <img src={userDetails.profile_image} alt="profile photo" className='rounded-full w-24 h-24 mt-14 ml-24' /> :
                                <UserCircleIcon className="h-24 w-24 ml-24" />)}
                        </div>

                    </div> :
                    <div className='bg-[#c1e0b7] rounded-lg h-28 shadow-xl shadow-[#b9b7b7]'>

                        <div >
                            {(userDetails.profile_image ? <img src={userDetails.profile_image} alt="profile photo" className='rounded-full w-24 h-24 mt-14 ml-24' /> :
                                <UserCircleIcon className="h-24 w-24 ml-24" />)}
                        </div>
                    </div>)}
                <div className='mt-10'>
                    <h1 className='font-prompt text-2xl'>{userDetails.username}</h1>
                    <h1 className='font-prompt text-left text-lg'>followes <span></span></h1>
                    <h1 className='font-prompt text-left text-lg'>following</h1>


                </div>

                {/* <List>
                    <ListItem>
                        <ListItemPrefix>
                            <UserCircleIcon className="h-8 w-8" />
                        </ListItemPrefix>
                        My items
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <UsersIcon className="h-8 w-8" />
                        </ListItemPrefix>
                        E-Commerce
                    </ListItem>


                    <ListItem>
                        <ListItemPrefix>
                            <UserGroupIcon className="h-8 w-8" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List> */}
            </Card>
        </div>
    )
}

export default CompanyHome