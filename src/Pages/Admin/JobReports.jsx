import React, { useState, useEffect } from 'react';
import { Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { JobUpdate, ReportJobPostList, UserDetails, UserList, UserSearch } from '../../Constants/Constants';
const TABLE_HEAD = ["REPORTER NAME", "VIEW",  "ACTION"];

// ReportJobPostList

function JobReports() {
    const [ListReportJob, setListReportJob] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = useState(null)
    const [selectedState, setSelectedState] = useState(null)
    const [checkState, setcheckState] = useState(null)

  

    

    const handleOpen = () => setOpen(!open);

    const ModalOpen = (id, is_active) => {
        setSelectedId(id)
        setSelectedState(is_active)
        handleOpen()
    }
    const Jobblock = () => {
        const blockData = {
            is_available: !selectedState
        }
        try {
            axios.patch(`${JobUpdate}${selectedId}/`, blockData);
            setcheckState(true)
        } catch (error) {
            console.log(error);
        }
        handleOpen()
    }


    useEffect(() => {
        setcheckState(null)
        const ListData = axios.get(ReportJobPostList)
            .then((response) => {
                const responseData = response.data;
                setListReportJob(responseData);
            })
            .catch((error) => {
                console.error("Error fetching setListReportJob data:", error);
            });
    }, [checkState]);


    return (
        // <div className='w-full'>
            
        //     <table className="w-full min-w-max table-auto text-left">
        //         <thead>
        //             <tr>
        //                 {TABLE_HEAD.map((head) => (
        //                     <th key={head} className="border-b border-blue-gray-200 bg-blue-gray-50 p-4">
        //                         <Typography
        //                             variant="small"

        //                             className="text-black font-prompt-normal  "
        //                         >
        //                             {head}
        //                         </Typography>
        //                     </th>
        //                 ))}
        //             </tr>
        //         </thead>

        //         <tbody>
        //             {users.map(({ id, username, email, phone_number, is_active }) => {
        //                 const classes = "p-4 border-b border-blue-gray-50";
        //                 return (
        //                     <tr key={username}>
        //                         <td className={classes}>
        //                             <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg ">
        //                                 {id}
        //                             </Typography>
        //                         </td>
                               
        //                         <td className={classes}>
        //                             <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg">
        //                                 {phone_number}
        //                             </Typography>
        //                         </td>
        //                         <td className={classes}>
        //                             {is_active ? (
        //                                 <Button onClick={() => ModalOpen(id, is_active)} className='bg-[#b03838] font-prompt-normal w-24'>Block</Button>
        //                             ) : (
        //                                 <Button onClick={() => ModalOpen(id, is_active)} className='bg-[#236941] font-prompt-normal  w-24'><span className='-ml-2'>UnBlock</span></Button>
        //                             )}
        //                         </td>
        //                     </tr>
        //                 );
        //             })}
        //             <>
        //                 <Dialog open={open} handler={handleOpen}>
        //                     <DialogHeader className='font-prompt-normal'>Company {(selectedState ? 'Block' : 'UnBlock')}</DialogHeader>
        //                     <DialogBody className='font-prompt text-black text-lg'>
        //                         Are You Sure Do You Want to Confirm Company {(selectedState ? 'Block' : 'UnBlock')}?

        //                     </DialogBody>
        //                     <DialogFooter className='gap-2'>
        //                         <Button
        //                             variant="filled"

        //                             onClick={handleOpen}
        //                             className="bg-[#236941] font-prompt-normal"
        //                         >
        //                             <span>Cancel</span>
        //                         </Button>
        //                         <Button variant="filled" className='bg-[#c63030] font-prompt-normal' onClick={userblock}>
        //                             <span>Confirm</span>
        //                         </Button>
        //                     </DialogFooter>
        //                 </Dialog>
        //             </>
        //         </tbody>
        //     </table>
        //     <Toaster />
        // </div>
        <div> </div>
    )
}

export default JobReports



















