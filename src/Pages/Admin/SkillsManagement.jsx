import React, { useState, useEffect } from 'react';
import { Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { UserDetails, UserList, UserSearch } from '../../Constants/Constants';
const TABLE_HEAD = ["ID", "SKILL", "ACTION"];

function SkillsManagement() {
    const [skills, setSkills] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = useState(null)
    const [selectedState, setSelectedState] = useState(null)
    const [checkState, setcheckState] = useState(null)


    // const SearchUser = async (keyword) => {
    //     if (keyword) {
    //         try {
    //             const SearchRequest = await axios.get(`${UserSearch}${keyword}`);
    //             setUsers(SearchRequest.data);
    //         }
    //         catch (error) {
    //             console.log(error);
    //             toast.error(error);
    //         }
    //     }
    // };


    // const SortingUser = async (keyword) => {
    //     if (keyword) {
    //         try {
    //             let SortRequest;
    //             switch (keyword) {
    //                 case 'sorting':
    //                     SortRequest = await axios.get(`${UserSearch}${''}`);
    //                     setUsers(SortRequest.data);
    //                     break;
    //                 case 'block':
    //                     SortRequest = await axios.get(`${UserSearch}${false}`);
    //                     setUsers(SortRequest.data);
    //                     break;
    //                 case 'unblock':
    //                     SortRequest = await axios.get(`${UserSearch}${true}`);
    //                     setUsers(SortRequest.data);
    //                     break;
    //             }
    //         } catch (error) {
    //             console.log(error);
    //             toast.error(error);
    //         }
    //     }
    // };


    useEffect(() => {
        setcheckState(null)
        const getSkills = axios.get(UserList)
            .then((response) => {
                const responseData = response.data;
                setSkills(responseData);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);


    return (
        <div className='w-full'>
            <div className='flex justify-between border-blue-gray-200 bg-blue-gray-50 p-4' >
                <input  className='w-96 rounded-lg h-11 ml-16 border-2 border-gray-300  font-roboto-mono text-black' type="text" placeholder='  Search' />
                <select  className='w-32 rounded-md bg-white border-2 border-gray-300 font-prompt'>
                    <option value="sorting">Sort</option>
                    <option value="block">A-Z</option>
                    <option value="unblock">Z-A</option>
                </select>
            </div>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-200 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"

                                    className="text-black font-prompt-normal  "
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {/* {users.map(({ id, username, email, phone_number, is_active }) => {
                        const classes = "p-4 border-b border-blue-gray-50";
                        return (
                            <tr key={username}>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg ">
                                        {id}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg ">
                                        {username}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg">
                                        {email}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg">
                                        {phone_number}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    {is_active ? (
                                        <Button onClick={() => ModalOpen(id, is_active)} className='bg-[#b03838] font-prompt-normal w-24'>Block</Button>
                                    ) : (
                                        <Button onClick={() => ModalOpen(id, is_active)} className='bg-[#236941] font-prompt-normal  w-24'><span className='-ml-2'>UnBlock</span></Button>
                                    )}
                                </td>
                            </tr>
                        );
                    })} */}
                    {/* <>
                        <Dialog open={open} handler={handleOpen}>
                            <DialogHeader className='font-prompt-normal'>Company {(selectedState ? 'Block' : 'UnBlock')}</DialogHeader>
                            <DialogBody className='font-prompt text-black text-lg'>
                                Are You Sure Do You Want to Confirm Company {(selectedState ? 'Block' : 'UnBlock')}?

                            </DialogBody>
                            <DialogFooter className='gap-2'>
                                <Button
                                    variant="filled"

                                    onClick={handleOpen}
                                    className="bg-[#236941] font-prompt-normal"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button variant="filled" className='bg-[#c63030] font-prompt-normal' onClick={userblock}>
                                    <span>Confirm</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </> */}
                </tbody>
            </table>
            <Toaster />
        </div>
    )
}

export default SkillsManagement










// const handleOpen = () => setOpen(!open);

// const ModalOpen = (id, is_active) => {
//     setSelectedId(id)
//     setSelectedState(is_active)
//     handleOpen()
// }
// const userblock = () => {
//     const blockData = {
//         is_active: !selectedState
//     }
//     try {
//         axios.patch(`${UserDetails}${selectedId}/`, blockData);
//         setcheckState(true)
//     } catch (error) {
//         console.log(error);
//     }
//     handleOpen()
// }


















