import React, { useState, useEffect } from 'react';
import { Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { CompanyDetails, CompanySearchs, CompanyListAdmin, CompanyUpdate } from '../../Constants/Constants';
const TABLE_HEAD = ["ID", "NAME", "EMAIL", "PHONENUMBER", "ACTION"];

function CompanyManagement() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [Companyid, setCompanyid] = useState(null)
  const [checkState, setcheckState] = useState(null)

  const SearchUser = async (keyword) => {
    if (keyword) {
      try {
        const SearchRequest = await axios.get(`${CompanySearchs}${keyword}`);
        setUsers(SearchRequest.data);
      }
      catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  const SortingUser = async (keyword) => {
    if (keyword) {
      try {
        let SortRequest;
        switch (keyword) {
          case 'sorting':
            SortRequest = await axios.get(`${CompanySearchs}${''}`);
            setUsers(SortRequest.data);
            break;
          case 'block':
            SortRequest = await axios.get(`${CompanySearchs}${false}`);
            setUsers(SortRequest.data);
            break;
          case 'unblock':
            SortRequest = await axios.get(`${CompanySearchs}${true}`);
            setUsers(SortRequest.data);

            break;
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  // console.log(users, '+++++++++++++++++++>>>>>>>>>>>>>>>>>>>>>>>');
  const handleOpen = () => setOpen(!open);

  const ModalOpen = (userid, is_active, id) => {
    // console.log(userid, is_active, id, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa>>><<<<');
    setSelectedId(userid)
    setSelectedState(is_active)
    setCompanyid(id)
    handleOpen()
  }
  const userblock = () => {
    const blockData = {
      is_active: !selectedState
    }
    try {
      axios.patch(`${CompanyDetails}${selectedId}/`, blockData);
      const blockCompany = {
        is_available: !selectedState
      }
      axios.patch(`${CompanyUpdate}${Companyid}/`, blockCompany).catch((error) => {
        console.error("Error fetching user data:", error);
      });

      setcheckState(true)
    } catch (error) {
      console.log(error);
    }
    handleOpen()

  }

  useEffect(() => {
    setcheckState(null)
    axios.get(CompanyListAdmin)
      .then((response) => {
        const responseData = response.data;
        setUsers(responseData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [checkState]);

  console.log(users, 'hloooooooooooooooooooooooooooooooo');
  return (
    <div className='w-full'>
      <div className='flex justify-between border-blue-gray-200 bg-blue-gray-50 p-4' >
        <input onChange={(e) => SearchUser(e.target.value)} className='w-96 rounded-lg h-11 ml-16 border-2 border-gray-300  font-roboto-mono text-black' type="text" placeholder='  Search' style={{ paddingLeft: '20px' }} />
        <select onChange={(e) => SortingUser(e.target.value)} className='w-32 rounded-md bg-white border-2 border-gray-300 font-prompt'>
          <option value="sorting">All</option>
          <option value="block">Block</option>
          <option value="unblock">UnBlock</option>
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
          {users.map(({ id, company_name, user }) => {
            const classes = "p-4 border-b border-blue-gray-50";
            return (
              <tr key={id}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg ">
                    {id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg ">
                    {company_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg">
                    {user.email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-roboto-mono text-lg">
                    {user.phone_number}
                  </Typography>
                </td>
                <td className={classes}>
                  {user.is_active ? (
                    <Button onClick={() => ModalOpen(user.id, user.is_active, id)} className='bg-[#b03838] font-prompt-normal w-24'>Block</Button>
                  ) : (
                    <Button onClick={() => ModalOpen(user.id, user.is_active, id)} className='bg-[#236941] font-prompt-normal  w-24'><span className='-ml-2'>UnBlock</span></Button>
                  )}
                </td>
              </tr>
            );
          })}
          <>
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
          </>
        </tbody>
      </table>
      <Toaster />

    </div>
  );
}

export default CompanyManagement;








