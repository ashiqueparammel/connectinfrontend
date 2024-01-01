import React,{useState} from 'react'
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import PdfHelper from '../../../Helpers/PdfHelper';
import { useSelector } from 'react-redux';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url,).toString();
const userInfo = useSelector((state) => state.user.userInfo);
const [UserProfile, setUserProfile] = useState([])
const [editManage, setEditManage] = useState(false);
const [userData, setUserData] = useState([]);
const fileInputCVRef = useRef(null);
function ApplyJobs() {
  return (
    <div>apply job</div>
  )
}

export default ApplyJobs