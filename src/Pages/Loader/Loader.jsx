import React from 'react'
import { ScaleLoader } from 'react-spinners'

function Loader() {
    return (
        <div className='flex justify-center items-center'><ScaleLoader color="#051339" /></div>
    )
}

export default Loader