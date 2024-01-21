import { faAdd, faEllipsisVertical, faPaperPlane, faSmileBeam, faVideoCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Avatar, Button, Card, List, ListItem, ListItemPrefix, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'

import React, { useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { ConnectionChatList, Previos_Chat, WebSocket } from '../../Constants/Constants';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import blankImage from '../../Assets/blankprofile.png'

// import { jwtDecode } from 'jwt-decode'
// const token = localStorage.getItem("token");
// const decode = jwtDecode(token);
// console.log(decode,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');


function Chat() {
    const userInfo = useSelector((state) => state.user.userInfo)
    const [clientstate, setClientState] = useState('');
    const [senderdetails, setSenderDetails] = useState(userInfo);
    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState([]);
    const [ChatList, setChatList] = useState([])
    const [recipientDetails, setrecipientDetails] = useState([])
    const [manageEmoji, setmanageEmoji] = useState(false)
    const setUpChat = async () => {
        await axios.get(`${Previos_Chat}${senderdetails.id}/${recipientDetails.id}/`).then(
            (response) => {
                if (response.status == 200) {
                    setMessages(response.data);
                }
            }
        );

        const client = new W3CWebSocket(
            `${WebSocket}${senderdetails.id}/?${recipientDetails.id}`
        );
        setClientState(client);
        client.onopen = () => {
            console.log("WebSocket Client Connected");
        };

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);

            if (dataFromServer) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        message: dataFromServer.message,
                        sender_email: dataFromServer.senderUsername,
                    },
                ]);
            }
        };

        client.onclose = () => {
            console.log("Websocket disconnected");
        };

    }
    const sendMessage = () => {
        if (messageText === '') {
            return;
        } else {
            clientstate.send(
                JSON.stringify({
                    message: messageText,
                    senderUsername: senderdetails.email,
                    recieverUsername: recipientDetails.email,
                })
            );
            setMessageText('');
        };
    }

    const StartChat = (event) => {

        const chatFound = ChatList.find(({ following }) => following.email === event);
        if (chatFound) {
            const { following } = chatFound
            setrecipientDetails(following)
        }
    }

    useEffect(() => {
        axios.get(`${ConnectionChatList}${userInfo.id}/`).then((response) => {
            setChatList(response.data)
        }).catch((error) => { console.log(error); })

        if (senderdetails.id != null && recipientDetails.id != null) {
            setUpChat();
        }

    }, [senderdetails, recipientDetails]);
    const openEmoji = () => {

        console.log('Windows key + ; pressed');
        setmanageEmoji(!manageEmoji)

    }





    const handlevideoClick = () => {
        if (senderdetails && recipientDetails) {
          const videodata = [senderdetails, recipientDetails];
    
          if (videodata[1]) {
            const messagedata = {
              message: `${window.location.origin}/videocall?roomId=${senderdetails.id}&receiverId=${recipientDetails.id}`,
              senderUsername: senderdetails.email,
              recieverUsername: recipientDetails.email,
            };
    
            clientstate.send(JSON.stringify(messagedata));
    
            navigate("/videocall", { state: { data: videodata } });
          } else {
            console.error("Data is empty. Unable to initiate video call.");
          }
        } else {
          console.error("Recipient details or sender details are missing.");
        }
      };
    
      const renderButtonIfLink = (message) => {
        const linkRegex = /https?:\/\/[^\s]+/g; // Regular expression to match URLs
    
        // Check if the message contains a link
        const hasLink = linkRegex.test(message);
    
        if (hasLink) {
          return (
            <button
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
              onClick={() => {
                // Handle button click action (e.g., navigate to the link)
                window.open(message, "_blank");
              }}
            >
              Video Call Link
            </button>
          );
        }
    
        return null; // Return null if there is no link
      };
    

    return (
        <div>
            <div className='flex'>
                <Card className=' border-[1px]  ml-5 mt-2  '>

                    <Card className="w-full ">
                        <List className="min-h-20 max-h-full overflow-y-auto hidescroll">
                            {(ChatList.length === 0 ? <h1 className="text-center text-lg font-prompt-normal" style={{ paddingTop: '15px' }} >User not found</h1> :
                                (ChatList.map(({ following }, index) => (
                                    (userInfo.email != following.email ?
                                        <div >
                                            <ListItem key={index} className='grid grid-cols-5'>
                                                <ListItemPrefix className='col-span-1'>
                                                    {following.profile_image ? (
                                                        <Avatar variant="circular" alt="candice" src={following.profile_image} />
                                                    ) : (
                                                        <Avatar variant="circular" alt="candice" src={blankImage} />
                                                    )}
                                                </ListItemPrefix>
                                                <div className='col-span-2'>
                                                    <Typography variant="h6" color="blue-gray">
                                                        {following.username}
                                                    </Typography>

                                                </div>
                                                <div onClick={(e) => StartChat(following.email)} className='text-center w-10 h-9  ml-5   font-prompt bg-[#dadada] rounded-md text-white  '>
                                                    <FontAwesomeIcon icon={faPaperPlane} className=' text-[#051339]   w-6 h-6 mt-1    rounded-full hover:text-[#4c4b4b] rotate-45  ' />

                                                </div>
                                                <div>
                                                    <Menu>
                                                        <MenuHandler>
                                                            <FontAwesomeIcon icon={faEllipsisVertical} color='#051339' className=' w-5 h-5   rounded-full hover:text-[#000000]    hover:bg-gray-600 hover:bg-opacity-20 hover:cursor-pointer ' />
                                                        </MenuHandler>
                                                        <MenuList className="max-h-72">
                                                            <MenuItem>Block</MenuItem>
                                                            <MenuItem>Archive</MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </div>

                                            </ListItem>
                                        </div> : null)
                                ))))}
                        </List>
                    </Card>

                </Card>

                {(recipientDetails.length != 0 ? <Card className='ml-24 w-[60%] h-[35rem]   mt-2 border-[1px]'>
                    <Card className=' w-full  rounded-b-none  h-20 bg-[#051339] '>
                        <div className='flex'>
                            <div>
                                {(recipientDetails.profile_image ? <img src={recipientDetails.profile_image} alt="profile photo" className='ml-4 rounded-md shadow-2xl  w-14 h-14  mt-4 ' /> :
                                    <UserCircleIcon className="ml-10 rounded-full w-14 h-14  mt-4 text-[#FAFAFA] " />)}
                            </div>
                            <h1 className='font-prompt-normal ml-3 mt-7 text-[#FAFAFA] text-lg uppercase '>{recipientDetails.username}</h1>
                            <FontAwesomeIcon onClick={handlevideoClick} icon={faVideoCamera} color='#FAFAFA' className=' absolute right-24 w-6 h-6 mt-7 rounded-full hover:text-[#c5c3c3]    e  ' />

                            <Menu>
                                <MenuHandler>
                                    <FontAwesomeIcon icon={faEllipsisVertical} color='#FAFAFA' className=' absolute right-10 w-6 h-6 mt-7 rounded-full hover:text-[#000000]    hover:bg-white hover:bg-opacity-100 hover:cursor-pointer ' />
                                </MenuHandler>
                                <MenuList className="max-h-72">
                                    <MenuItem>Block</MenuItem>
                                    <MenuItem>Archive</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </Card>
                    <div className='overflow-y-auto max-h-[75%] z-50 hidescroll '>

                        <div className='mt-2 flex flex-col mb-5'>
                            {messages.map((message) => (
                                <div key={message.id} className={message.sender_email === userInfo.email ? 'mt-2 ml-auto' : 'mt-2 mr-auto'}>
                                    <div className={`font-prompt-normal text-lg ${message.sender_email === userInfo.email ? 'text-white bg-[#324674df] float-right max-w-96 mr-4 ' : 'text-black bg-[#d4d2d2] float-left max-w-96 ml-4 '} rounded-md shadow-black w-fit`} style={{ overflow: 'hidden', wordWrap: 'break-word', whiteSpace: 'pre-wrap', paddingLeft: '8px', paddingRight: '8px', paddingBottom: '2px', paddingTop: '2px' }}>
                                    {message.message}
                                    </div>
                                    <h1 className={`${message.sender_email === userInfo.email ? 'text-right mr-4' : 'text-left ml-4'} text-xs`}>11.30PM</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='absolute bottom-0 w-full bg-[#e3e2e2]'>
                        {(manageEmoji ? '' : '')}
                        <FontAwesomeIcon icon={faAdd} color='#000000' className='  w-6 h-6 mt-4 ml-2 mr-2 rounded-full hover:text-[#000000]    hover:bg-white hover:bg-opacity-100 hover:cursor-pointer ' />
                        <FontAwesomeIcon onClick={openEmoji} icon={faSmileBeam} className=' text-[#e8dd43] border-[1px]  w-6 h-6 mt-4 ml-2 mr-2 rounded-full hover:text-[#000000]    hover:bg-white hover:bg-opacity-100 hover:cursor-pointer ' />
                        <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} className='w-[80%] h-12  rounded-md  border-[1px] border-black font-prompt' placeholder='Type a message' style={{ paddingLeft: '20px' }} />
                        <Button onClick={sendMessage} className='w-16 h-12 ml-4 bg-[#051339] -mt-1'>
                            <FontAwesomeIcon icon={faPaperPlane} className=' text-[#FAFAFA]   w-6 h-6    rounded-full hover:text-[#aeaaaa] rotate-45  ' />

                        </Button>
                    </div>

                </Card> : '')}
            </div>
        </div>
    )
}

export default Chat




