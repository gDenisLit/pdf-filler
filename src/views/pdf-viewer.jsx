import { pdfjs, Document, Page } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import React, { useState, useEffect } from 'react'

export function PdfViewer() {
    const [pageCount, setPageCount] = useState(1)
    const [currPage, setCurrPage] = useState(1)

    const onLoad = ({ numPages }) => {
        setPageCount(numPages)
    }

    const onChangePage = (diff) => {
        if (currPage === 1 && diff < 0) return
        else if (currPage === pageCount && diff > 0) return
        setCurrPage(currPage + diff)
    }

    return (
        <div>
            <Document
                file="src/assets/pdf/pdf-1.pdf"
                onLoadSuccess={onLoad}
            >
                <Page pageNumber={currPage} />
            </Document>
            <p>Page {currPage} of {pageCount}</p>
            <button onClick={() => { onChangePage(-1) }}>Previous</button>
            <button onClick={() => { onChangePage(1) }}>Next</button>
        </div>
    )
}