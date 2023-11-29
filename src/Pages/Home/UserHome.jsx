import React from 'react'
import { useSelector } from 'react-redux';

function UserHome() {
    const userInfo = useSelector((state) => state.user.userInfo.userinfo)
    console.log(userInfo, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<');
  return (
    <div className='text-center mt-5'>This Is User Home</div>
  )
}

export default UserHome