
import React, { useState, useRef } from 'react';

import './ApryseSignApp.css';

import Sidebar from './Sidebar';
import DocumentToolbar from './DocumentToolbar';
import DocumentViewer from './DocumentViewer';

const ApryseSignApp = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedSigner, setSelectedSigner] = useState('cassie');
  const [zoomLevel, setZoomLevel] = useState(92);
  const [isDragOver, setIsDragOver] = useState(false);
  const [signatureImage, setSignatureImage] = useState(null); 

  const fileInputRef = useRef(null);

  const handleFileUpload = (file) => {
    if (file && file.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(file);
      setUploadedFile({
        name: file.name,
        url: fileURL
      });
    } else {
      alert('Please upload a PDF file only.');
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 25));
  };

  return (
    <div className="apryse-app">


      <div className="main-layout">
        <Sidebar 
          selectedSigner={selectedSigner}
          setSelectedSigner={setSelectedSigner}
          isDragOver={isDragOver}
          uploadedFile={uploadedFile}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          triggerFileUpload={triggerFileUpload}
          setSignatureImage={setSignatureImage} 
        />

        <div className="content-area">
          <DocumentToolbar
            zoomLevel={zoomLevel}
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
          />

          <DocumentViewer
            uploadedFile={uploadedFile}
            zoomLevel={zoomLevel}
            triggerFileUpload={triggerFileUpload}
            signatureImage={signatureImage} 
          />
        </div>
      </div>

   
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileInputChange}
        className="hidden-input"
      />
    </div>
  );
};

export default ApryseSignApp;
