import React from 'react'
import { ScaleLoader } from 'react-spinners'

function Loader() {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 bg-gray-200'><ScaleLoader color="#051339" /></div>
    )
}

export default Loader