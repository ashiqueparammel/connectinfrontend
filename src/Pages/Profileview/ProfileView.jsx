import React, { useEffect, useState } from 'react'
import blankImage from '../../Assets/blankprofile.png'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Company_Profile, UserFollow, UserFollowers, UserFollowing, UserProfileDetails, UserProfileView, UserUnFollow } from '../../Constants/Constants';
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast'

function ProfileView() {
    const location = useLocation()
    const navigate = useNavigate()
    const userInfo = useSelector((state) => state.user.userInfo);
    const user_Id = location.state.data || ''
    const [userDetails, setuserDetails] = useState([])
    const [ProfileDetails, setProfileDetails] = useState([])
    const [followingCount, setfollowingCount] = useState('')
    const [followersCount, setfollowersCount] = useState('')
    const [followersData, setfollowersData] = useState([])
    const [ManagePage, setManagePage] = useState(false)
    useEffect(() => {
        if (user_Id) {
            setManagePage(false)
            axios.get(`${UserProfileView}${user_Id}/`).then((response) => {
                setuserDetails(response.data)
                if (response.data.is_company === true) {
                    axios.get(`${Company_Profile}${response.data.id}/`).then((response) => {
                        setProfileDetails(response.data[0])
                    }).catch((error) => {
                        console.error("Error fetching Company_Profile data:", error);
                    });
                } else {
                    axios.get(`${UserProfileDetails}${response.data.id}/`).then((response) => {
                        setProfileDetails(response.data[0])
                    }).catch((error) => {
                        console.error("Error fetching UserProfileDetails data:", error);
                    });
                }
                axios.get(`${UserFollowing}${user_Id}/`).then((response) => {
                    let count = response.data.length
                    setfollowingCount(count)
                }).catch((error) => {
                    console.log(err);
                })
                axios.get(`${UserFollowers}${user_Id}/`).then((response) => {
                    let count = response.data.length
                    setfollowersCount(count)
                    if (response.data) {
                        let followersAllData = response.data
                        let checkData = followersAllData.find((obj) => obj.following.id === user_Id && obj.followers.id === userInfo.id)
                        setfollowersData(checkData)
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }).catch((err) => { console.log(err); })

        }
        else {
            navigate('/')
        }


    }, [user_Id, ManagePage])


    const FllowFunction = () => {
        const data = {
            following: user_Id,
            followers: userInfo.id
        }
        axios.post(UserFollow, data).then((response) => {
            if (response.status === 201) {
                toast.success('Followed')
                setManagePage(true)

            }
        })

    }
    const unfollowFunction = () => {
        axios.delete(`${UserUnFollow}${followersData.id}/`).then((response) => {
            if (response.status === 204) {
                toast.success('Unfollowed')
                setManagePage(true)
            }
        }).catch((error) => { console.log(error); })
    }


    return (
        <section className="bg-gray-200">
            <div className="container py-5 xl:ml-24 2xl:ml-24 lg:ml-20  ">

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                    <div className="lg:col-span-1" >
                        <div className="mb-6">
                            <div className="bg-white p-1 rounded-md text-center">
                                <div>
                                    {(userDetails.profile_cover_image ? <img
                                        src={userDetails.profile_cover_image}
                                        alt="avatar"
                                        className="rounded-md mx-auto mb-4 w-full h-44"
                                    /> : <div className='w-full h-44 bg-[#d5ffc4]'> </div>)}
                                </div>
                                <div className='mt-6 '>
                                    {(userDetails.profile_image ? <img
                                        src={userDetails.profile_image}
                                        alt="avatar"
                                        className="rounded-md mx-auto h-32 mb-4"
                                        style={{ width: '150px' }}
                                    /> : <img
                                        src={blankImage}
                                        alt="avatar"
                                        className="rounded-md mx-auto mb-4"
                                        style={{ width: '150px' }}
                                    />)}
                                </div>


                                <p className="text-black font-prompt-normal uppercase">{userDetails.username}</p>
                                <p className="text-black mb-2 font-prompt ">{userDetails.email}</p>

                                <div className="flex justify-center font-prompt mb-2 gap-4">
                                    <h1>following <span className=' text-[#3a6aad]'>{followingCount}</span></h1>
                                    <h1>followers <span className=' text-[#3a6aad]'>{followersCount}</span></h1>
                                </div>
                                <div className="flex justify-center mb-2 gap-4">

                                    {(followersData ? <Button onClick={unfollowFunction} className="bg-[#051339] text-white font-prompt-normal mb-4 px-4 py-2 rounded-md mr-1">Unfollow</Button> : <Button onClick={FllowFunction} className="bg-[#051339] text-white font-prompt-normal mb-4 px-4 py-2 rounded-md mr-1">Follow</Button>)}
                                    {(followersData ? (followersData.Connection ? <Button className="border border-[#051339] bg-white text-[#051339] mb-4 font-prompt-normal px-4 py-2 rounded-md">Message</Button> : '') : '')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1 text-black font-prompt">
                        <div className="mb-4">
                            <div className="bg-white p-4 rounded-md">
                                <div className="flex mb-4">
                                    <div className="w-1/3">
                                        <p className="text-gray-700">Name</p>
                                    </div>
                                    <div className="w-2/3">
                                        <p className="text-gray-600">{userDetails.username}</p>
                                    </div>
                                </div>
                                <hr className="my-2" />
                                {(userDetails.is_company ? <>
                                    <div className="flex mb-4">
                                        <div className="w-1/3">
                                            <p className="text-gray-700">Description</p>
                                        </div>
                                        <div className="w-2/3">
                                            <p className="text-gray-600">{ProfileDetails.Description}</p>
                                        </div>
                                    </div>
                                    <hr className="my-2" />
                                </> : <>
                                    <div className="flex mb-4">
                                        <div className="w-1/3">
                                            <p className="text-gray-700">Position</p>
                                        </div>
                                        <div className="w-2/3">
                                            <p className="text-gray-600 uppercase">{ProfileDetails.header}</p>
                                        </div>
                                    </div>
                                    <hr className="my-2" />
                                </>)}
                                <div className="flex mb-4">
                                    <div className="w-1/3">
                                        <p className="text-gray-700">Email</p>
                                    </div>
                                    <div className="w-2/3">
                                        <p className="text-gray-600">{userDetails.email}</p>
                                    </div>
                                </div>
                                <hr className="my-2" />
                                <div className="flex mb-4">
                                    <div className="w-1/3">
                                        <p className="text-gray-700">Phone</p>
                                    </div>
                                    <div className="w-2/3">
                                        <p className="text-gray-600">{userDetails.phone_number}</p>
                                    </div>
                                </div>
                                {(userDetails.is_company ? <><hr className="my-2" />
                                    <div className="flex mb-4">
                                        <div className="w-1/3">
                                            <p className="text-gray-700">Address</p>
                                        </div>
                                        <div className="w-2/3">
                                            <p className="text-gray-600 mb-4">{ProfileDetails.Address}</p>
                                        </div>
                                    </div></> : <><hr className="my-2" />
                                    <div className="flex mb-4">
                                        <div className="w-1/3">
                                            <p className="text-gray-700">Description</p>
                                        </div>
                                        <div className="w-2/3">
                                            <p className="text-gray-600 mb-4">{ProfileDetails.description}</p>
                                        </div>
                                    </div></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster />

            </div>
        </section>

    );
}

export default ProfileView


