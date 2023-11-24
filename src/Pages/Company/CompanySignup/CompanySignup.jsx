import React, { useRef, useState } from 'react'
import { Card, Input, Checkbox, Button, Typography, Textarea, Option, Select, } from "@material-tailwind/react";
import logo from '../../../Assets/ConnectWhitelogo.png';
import temp from '../../../Assets/Add image.png';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast, { Toaster } from 'react-hot-toast'
import { allIndustries } from '../../../Helpers/Industries ';
import { size } from '../../../Helpers/Size';
// import { Option, Select } from '@mui/material';




function CompanySignup() {


  const fileInputRef = useRef(null);
  const [profileImage, setprofileImage] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your form submission logic here
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleIndustryChange = (e) => {
    setSelectedIndustry(e);
  };
  const handleSizeChange = (e) => {
    setSelectedSize(e);
  };


  const handleFileInputChange = (event) => {

    setprofileImage(URL.createObjectURL(event.target.files[0]));
    setTimeout(() => {
      toast.success('Profile Image Added Successfully !');
    }, 500);


  };
  console.log(selectedIndustry, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>check');




  return (
    <div className='flex justify-center  '>
      <Card className='bg-[#051339] 2xl:w-[950px] w-fit xl:w-[950px] lg:w-[800px] md:w-[600px] sm:w-[450px] w-300px  mt-16 ' >
        <Typography variant="h4" className='text-white font-roboto-mono text-center 2xl:mt-3 '>
          Company Details
        </Typography>
        <div className='2xl:flex flex-row justify-between'>

          <form onSubmit={handleSubmit} className="mt-2 mb-22 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-3 ml-5 ">
              <Typography variant="h6" color="white" className="-mb-3 font-prompt">
                Company Name
              </Typography>
              <Input size="lg" placeholder="Company Name" className=" !border-black bg-white  focus:!border-t-black" />
              <Typography variant="h6" color="white" className="-mb-3 font-prompt">
                Industry
              </Typography>
              <Select label='Select an industry'
                value={selectedIndustry}
                onChange={handleIndustryChange}
                className="!border-black bg-white  focus:!border-t-black"
              >

                {allIndustries.map((industry, index) => (
                  <Option key={`${index}:${industry}`} value={industry}>
                    {industry}
                  </Option>
                ))}
              </Select>


              <Typography variant="h6" color="white" className="-mb-3 font-prompt">
                Company Size
              </Typography>
              <Select label='Select an Company Size'
                value={selectedSize}
                onChange={handleSizeChange}
                className="!border-black bg-white  focus:!border-t-black "
              >

                {size.map((companySize, index) => (
                  <Option key={`${index}:${companySize}`} value={companySize}>
                    {companySize}
                  </Option>
                ))}
              </Select>
              <Typography variant="h6" color="white" className="-mb-3 font-prompt">
                Location
              </Typography>
              <Input size="lg" placeholder="Location" className=" !border-black bg-white  focus:!border-t-black" />
              <Typography variant="h6" color="white" className="-mb-3  font-prompt">
                Address
              </Typography>

              <Textarea label="Address" className=" !border-black bg-white  focus:!border-t-black" />
              <Button type='submit' variant="filled" className='bg-[#0A3863] font-prompt text-xl font-prompt-normal' fullWidth >
                Continue
              </Button>
            </div>


          </form>
          <div>
            <img src={logo} alt=" Connect Logo" className='2xl:w-[400px] 2xl:mr-10  xl:w-[380px] xl:mr-8 lg:w-0 md:w-0  sm:w-0 w-0  ' />
            <img
              className="h-60 w-50 rounded-lg object-cover object-center mt-6 "
              src={(profileImage ? profileImage : temp)}
              alt=''
            />
            <div>
              <Button onClick={handleButtonClick} className='bg-[#0A3863] font-prompt mt-6 '>
                <FontAwesomeIcon icon={faPlus} className='' />

                Add Profile Image
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
              />
            </div>
          </div>
        </div>

        <Checkbox className='ml-5'
          label={
            <Typography variant="small" color="white" className="flex items-center font-normal  font-prompt" >
              <p> Yes, I understand and agree to the <span className='hover:text-yellow-500'>Terms of Service</span> ,
                including the User Agreement and
                <span className='hover:text-yellow-500'> Privacy Policy</span>.</p>

            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
      </Card>
      <Toaster />

    </div>
  )
}

export default CompanySignup








