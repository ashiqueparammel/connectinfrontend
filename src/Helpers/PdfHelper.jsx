import React, { useState } from 'react'
import { Document, Page } from 'react-pdf';



function PdfHelper({ cvFileUrl }) {

  console.log('=========>>>>>>.',cvFileUrl);

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div>
      
      <Document file={cvFileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />

      </Document>
    
      <p>
        Page{pageNumber}of {numPages}
      </p>
    </div>
  )
}

export default PdfHelper