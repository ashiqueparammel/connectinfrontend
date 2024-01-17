import React, { useState, useEffect } from 'react';
import { Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { JobUpdate, ReportJobPostList, } from '../../Constants/Constants';
const TABLE_HEAD = ["ID", "REPORTER NAME", "REPORTED COMPANY", "VIEW", "ACTION"];

// ReportJobPostList

function JobReports() {
    const [ListReportJob, setListReportJob] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = useState(null)
    const [selectedState, setSelectedState] = useState(null)
    const [checkState, setcheckState] = useState(null)


    // report view
    const [openReportView, setReportViewOpen] = useState(false);
    const handleOpenReportView = () => {
        setReportViewOpen(!openReportView);
    }

    const handleOpen = () => setOpen(!open);

    const ModalOpen = (id, is_available) => {
        setSelectedId(id)
        setSelectedState(is_available)
        handleOpen()
    }
    const Job_block = async () => {
        const blockData = {
            is_available: !selectedState
        };
        try {
            const response = await axios.patch(`${JobUpdate}${selectedId}/`, blockData);
            if (response.status === 200) {
                setcheckState(true);
                if (selectedState) {

                    toast.success('Job Blocked Successfully!');
                }
                else {
                    toast.success('Job UnBlocked Successfully!');

                }
            }
        } catch (error) {
            console.error(error);
        }
        handleOpen();
    };


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
        <div className='w-full'>

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
                    {ListReportJob.map((Reports, index) => {
                        const classes = "p-4 border-b border-blue-gray-50";
                        return (
                            <tr key={index}>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg ">
                                        {Reports.id}
                                    </Typography>
                                </td>

                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg">
                                        {Reports.user.email}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg">
                                        {Reports.Post.company.company_name}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Button onClick={handleOpenReportView} className='bg-[#878686] font-prompt-normal w-24'>view</Button>
                                    {/* report view */}
                                    <div>
                                        <>

                                            <Dialog open={openReportView} handler={handleOpenReportView}>
                                                <DialogHeader>Report View</DialogHeader>
                                                <DialogBody className="h-[34rem] overflow-scroll hidescroll">
                                                    <div className='font-prompt'>
                                                        <Typography className="font-prompt text-black text-lg">
                                                            About Job
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            company name:{Reports.Post.company.company_name}
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            Jobtitle:{Reports.Post.Job_title}
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            Openings: {Reports.Post.Openings}
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            Job discription:{Reports.Post.job_description}
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            Post date:{Reports.Post.posted_date}
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            salary:{Reports.Post.salary}
                                                        </Typography>
                                                    </div>
                                                    <div className='font-prompt mt-2'>
                                                        <Typography className="font-prompt text-black text-lg">
                                                            About Company
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            company name:{Reports.Post.company.company_name}
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            Address:{Reports.Post.company.Address}
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            Company Size: {Reports.Post.company.Company_Size}
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            Description:{Reports.Post.company.Description}
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            Location:{Reports.Post.company.Location}
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            Industry:{Reports.Post.company.Industry}
                                                        </Typography>
                                                    </div>
                                                    <div className='font-prompt mt-2'>
                                                        <Typography className="font-prompt text-black text-lg">
                                                            About Report
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            Reason:{Reports.Reason}
                                                        </Typography>
                                                        <Typography className="font-prompt text-black">
                                                            Reported By:{Reports.user.username}
                                                        </Typography>
                                                    </div>
                                                </DialogBody>
                                            </Dialog>
                                        </>
                                    </div>

                                </td>
                                <td className={classes}>
                                    {Reports.Post.is_available ? (
                                        <Button onClick={() => ModalOpen(Reports.Post.id, Reports.Post.is_available)} className='bg-[#b03838] font-prompt-normal w-24'>Block</Button>
                                    ) : (
                                        <Button onClick={() => ModalOpen(Reports.Post.id, Reports.Post.is_available)} className='bg-[#236941] font-prompt-normal  w-24'><span className='-ml-2'>UnBlock</span></Button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    <>
                        <Dialog open={open} handler={handleOpen}>
                            <DialogHeader className='font-prompt-normal'>Job {(selectedState ? 'Block' : 'UnBlock')}</DialogHeader>
                            <DialogBody className='font-prompt text-black text-lg'>
                                Are You Sure Do You Want to Confirm This Job {(selectedState ? 'Block' : 'UnBlock')}?

                            </DialogBody>
                            <DialogFooter className='gap-2'>
                                <Button
                                    variant="filled"

                                    onClick={handleOpen}
                                    className="bg-[#236941] font-prompt-normal"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button onClick={Job_block} variant="filled" className='bg-[#c63030] font-prompt-normal' >
                                    <span>Confirm</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </>
                </tbody>
            </table>

            <Toaster />
        </div>
        // <div> </div>
    )
}

export default JobReports




























