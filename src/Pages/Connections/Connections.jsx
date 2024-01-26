import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ConnectionChatList} from '../../Constants/Constants'
import { useSelector } from 'react-redux'
import { Button, Card, Typography, Dialog, DialogHeader, DialogFooter, CardBody, CardFooter, } from '@material-tailwind/react';
import { Tabs, TabsHeader, TabsBody, Tab, } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast'
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Connections() {

    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('Connections');
    const [ConnectionsCount, setConnectionsCount] = useState('')
    
    const Head = [{ Heading: `Connections (${ConnectionsCount})` }]
    const formatPostedDate = (postedDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
        const formattedDate = new Date(postedDate).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    const userInfo = useSelector((state) => state.user.userInfo)
    const [ChatList, setChatList] = useState([]);


    useEffect(() => {
        axios.get(`${ConnectionChatList}${userInfo.id}/`).then((response) => {
            setChatList(response.data)
            console.log(response.data,'======================,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,');
            const count = response.data.length
            setConnectionsCount(count)
            setActiveTab(`Connections (${count})`)

        }).catch((error) => { console.log(error); })

    }, [])
    const manageMessage = (user_id) => {
        // navigate('/profileview', { state: { data: user_id } })
 
    }
    return (

        <div className='flex justify-center'>
            <Card className='w-[80rem] mt-14 bg-gray-200'>
                <div className='flex justify-between border-b-[1px] border-[#a39f9f] ' >
                    <Typography className='font-prompt mt-4 ml-4' variant='h4'>
                        Connections
                    </Typography>
                </div>

                <div>
                    <Tabs value={activeTab}>
                        <TabsHeader
                            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                            indicatorProps={{
                                className:
                                    "bg-transparent border-b-2 border-[#051339] shadow-nonex rounded-none",
                            }}
                        >
                            {Head.map(({ Heading }) => (
                                <Tab
                                    key={Heading}
                                    value={Heading}
                                    onClick={() => setActiveTab(Heading)}
                                    className={activeTab === Heading ? "text-2xl" : ""}>
                                    <h1 className='font-prompt text-lg'>{Heading}</h1>
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody className='flex justify-center'>
                            {(activeTab === `Connections (${ConnectionsCount})` ?
                                <div className='flex flex-col w-full ml-24'>
                                    {ChatList.length !== 0 ? ChatList.map(({following}, index) => (
                                       ( userInfo.email != following.email?

                                        <Card className=' flex flex-row mb-2 rounded-md w-[90%] mt-2 justify-between' key={index}>
                                            <div className='flex gap-5'>
                                                <div className='mt-1 mb-1'>
                                                    {(following.profile_image ? <img src={following.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14   ' /> :
                                                        <UserCircleIcon className="ml-4 rounded-full w-14 h-14   " />)}
                                                </div>
                                                <div className='flex  gap-10 justify-center  items-center mt-1 mb-1'>
                                                    <div className=''>
                                                        <div className=''>
                                                            <Typography className='font-prompt text-md   text-black'><span className='font-prompt-normal text-lg text-black mr-4'>{following.username}</span></Typography>
                                                            <Typography className='font-prompt text-md   text-black'>{following.email}</Typography>
                                                        </div>
                                                        <div className='absolute right-5 bottom-3'>
                                                            <Button onClick={(e) =>manageMessage(following.id)} className="bg-[#051339]    mt-3 text-white font-prompt-normal  px-4 py-2 rounded-md mr-1"><FontAwesomeIcon icon={faMessage} className='w-5 h-5   ' /></Button>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </Card>:'')

                                    )) : ''}
                                </div>

                                : '')}



                        </TabsBody>
                    </Tabs>
                </div>
            </Card>
            <Toaster />
        </div>
    )
}

export default Connections




