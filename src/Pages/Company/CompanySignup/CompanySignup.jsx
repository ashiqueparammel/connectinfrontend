import React, { useEffect, useRef, useState } from 'react'
import { Card, Input, Checkbox, Button, Typography, Textarea, Option, Select, } from "@material-tailwind/react";
import logo from '../../../Assets/ConnectWhitelogo.png';
import temp from '../../../Assets/Add image.png';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast, { Toaster } from 'react-hot-toast'
import { allIndustries } from '../../../Helpers/Industries ';
import { size } from '../../../Helpers/Size';
import { CompanyAdd, CompanyDetails, Company_Profile } from '../../../Constants/Constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';


function CompanySignup() {

  const userInfo = useSelector((state) => state.user.userInfo)
  const companyInfo = useSelector((state) => state.company.companyInfo)
  console.log(userInfo.id, companyInfo, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>i<<<<<<<<<<<<<<<<<<<<<<<<');
  const navigate = useNavigate()
  const fileInputRef = useRef(null);
  const [profileImage, setprofileImage] = useState(null)
  const [ShowprofileImage, setShowprofileImage] = useState(null)
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [is_Checked, setIs_Checked] = useState(true);

  useEffect(() => {

    if (userInfo.id) {
      const userData = axios.get(`${Company_Profile}${userInfo.id}/`).then((response) => {
        const responseData = response.data[0];
        if (responseData.id) {
          navigate('/company/');
        }
      })
        .catch((error) => {
          navigate('/company/profileverify')
          console.error("Error fetching user data:", error);
        });
    }
  }, [])

  // //validation yup form
  //   const companySchema = Yup.object().shape({
  //     company_name: Yup.string().required('Company Name should not be empty!'),
  //     Industry: Yup.string().required('Industry should not be empty!'),
  //     Company_Size: Yup.string().required('Size should not be empty!'),
  //     Location: Yup.string().required('Location should not be empty!'),
  //     Address: Yup.string().required('Address should not be empty!'),
  //     is_Checked: Yup.boolean().oneOf([true], 'Please Click Terms of Service & Privacy Policy!'),
  //   });

  // image getting
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  //company industry getting
  const handleIndustryChange = (e) => {
    setSelectedIndustry(e);
  };
  // company size getting
  const handleSizeChange = (e) => {
    setSelectedSize(e);
  };
  //image setting  
  const handleFileInputChange = (event) => {
    setShowprofileImage(URL.createObjectURL(event.target.files[0]));
    const file = event.target.files[0];
    setprofileImage(file);
    setTimeout(() => {
      toast.success('Profile Image Added Successfully !');
    }, 500);
  };
  //company signup
  const Signupcompany = async (e) => {
    e.preventDefault();

    const CompanyData = {
      user: userInfo.id,
      company_name: e.target.company_name.value,
      Industry: selectedIndustry,
      Company_Size: selectedSize,
      Location: e.target.Location.value,
      Address: e.target.Address.value,

    };

    const validateForm = () => {

      if (CompanyData.company_name.trim() === "") {
        toast.error('Company Name should not be empty!');
        return false;
      } else if (CompanyData.Industry.trim() === "") {
        toast.error('Industry should not be empty!');
        return false;
      } else if (CompanyData.Company_Size.trim() === "") {
        toast.error(' Size should not be empty!');
        return false;
      } else if (CompanyData.Location.trim() === "") {
        toast.error('Location should not be empty!');
        return false;
      } else if (CompanyData.Address.trim() === "") {
        toast.error('Address should not be empty!');
        return false;
      } if (is_Checked === false) {
        toast.error('Please Click Terms of Service & Privacy Policy!');
        return false;
      }

      return true;
    };

    // //validation function
    //     const validateForm = async () => {
    //       try {
    //         await companySchema.validate(CompanyData, { abortEarly: false });
    //         return true;
    //       } catch (validationError) {
    //         validationError.inner.forEach(error => {
    //           toast.error(error.message);
    //         });
    //         return false;
    //       }
    //     };

    if (validateForm()) {
      console.log('chcek data');
      try {
        const responseData = await axios.post(CompanyAdd, CompanyData);
        // console.log(responseData.status, responseData.statusText, '[[[[[[[[[[[]]]]]]]]]]]]]');

        if (responseData.status === 201 && responseData.statusText === 'Created') {
          toast.success('Company profile updated successfully!')
          if (profileImage) {
            try {
              const formData = new FormData();
              formData.append('profile_image', profileImage);
              const updateProfileImage = await axios.patch(`${CompanyDetails}${CompanyData.user}/`, formData)
            } catch (error) {
              console.log(error);
              toast.error('Somthing Wrong!');
            }
            navigate('/company/')
          }
        }
      } catch (error) {
        console.error('Error during Company:', error);
        if (error.response.data.company_name) {
          toast.error(error.response.data.company_name[0]);
        }
        else {
          console.error('Error :', error);

          toast.error('Somthing Wrong!')
        }
      }
    }
  }


  return (
    <div className='flex justify-center  '>
      <Card className='bg-[#051339] 2xl:w-[950px] w-fit xl:w-[950px] lg:w-[800px] md:w-[600px] sm:w-[450px] w-300px  mt-16 ' >
        <Typography variant="h4" className='text-white font-roboto-mono text-center 2xl:mt-3 '>
          Company Details
        </Typography>
        <div className='2xl:flex flex-row justify-between'>

          <form onSubmit={(e) => Signupcompany(e)} className="mt-2 mb-22 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-3 ml-5 ">
              <Typography variant="h6" color="white" className="-mb-3 font-prompt">
                Company Name
              </Typography>
              <Input size="lg" placeholder="Company Name" name='company_name' className=" !border-black bg-white  focus:!border-t-black" />
              <Typography variant="h6" color="white" className="-mb-3 font-prompt">
                Industry
              </Typography>
              <Select label={(selectedIndustry ? '' : 'Select an industry')}
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
              <Select label={(selectedSize ? '' : 'Select an Company Size')}
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
              <Input size="lg" placeholder="Location" name='Location' className=" !border-black bg-white  focus:!border-t-black" />
              <Typography variant="h6" color="white" className="-mb-3  font-prompt">
                Address
              </Typography>

              <Textarea label="Address" name='Address' className=" !border-black bg-white  focus:!border-t-black" />
              <Button type='submit' variant="filled" className='bg-[#0A3863] font-prompt text-xl font-prompt-normal' fullWidth >
                Continue
              </Button>
            </div>


          </form>
          <div>
            <img src={logo} alt=" Connect Logo" className='2xl:w-[400px] 2xl:mr-10  xl:w-[380px] xl:mr-8 lg:w-0 md:w-0  sm:w-0 w-0  ' />
            <img
              className="h-60 w-50 rounded-lg object-cover object-center mt-6 "
              src={(ShowprofileImage ? ShowprofileImage : temp)}
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

        <div className='ml-5'>
          <Checkbox className='' defaultChecked onClick={(e) => setIs_Checked(!is_Checked)}
            label={
              <Typography variant="small" color="white" className="flex items-center font-normal  font-prompt" >
                <p> Yes, I understand and agree to the <span className='hover:text-yellow-500'>Terms of Service</span> ,
                  including the User Agreement and
                  <span className='hover:text-yellow-500'> Privacy Policy</span>.</p>

              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
        </div>
      </Card>
      <Toaster />

    </div>
  )
}

export default CompanySignup








