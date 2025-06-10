// ApryseSignApp.jsx
import React, { useState, useRef } from 'react';
import { Upload, FileText, Edit3, Calendar, Settings, Send, ChevronDown, ZoomIn, ZoomOut, RotateCw, Maximize2, Download } from 'lucide-react';
import './signapp.css';

const Signapp = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedSigner, setSelectedSigner] = useState('cassie');
  const [zoomLevel, setZoomLevel] = useState(92);
  const [isDragOver, setIsDragOver] = useState(false);
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

  // Drag and Drop Handlers
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
      {/* Header */}
      <header className="app-header">
        <div>
          <h1 className="app-title">Apryse Sign App</h1>
        </div>
        <div className="header-user-section">
          <span className="user-email">andy@aardvark.test</span>
          <div className="user-avatar">
            <span>A</span>
          </div>
          <button className="sign-button">
            Sign
          </button>
        </div>
      </header>

      <div className="main-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <h2 className="sidebar-title">Prepare Document</h2>
          
          {/* Step 1 */}
          <div className="step-section">
            <span className="step-label">Step 1</span>
            
            <div
              className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
              onClick={triggerFileUpload}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="upload-content">
                <Upload className="upload-icon" />
                <span className="upload-text">Upload a document</span>
                <span className="upload-subtext">
                  {isDragOver ? 'Drop PDF file here' : 'Click to upload or drag & drop PDF'}
                </span>
              </div>
              <div className="help-icon">
                <span>?</span>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileInputChange}
              className="hidden-input"
            />
            
            {uploadedFile && (
              <div className="upload-success">
                Uploaded: {uploadedFile.name}
              </div>
            )}
          </div>

          {/* Step 2 */}
          <div className="step-section">
            <span className="step-label">Step 2</span>
            
            <div className="form-group">
              <label className="form-label">
                Adding signature for
              </label>
              <div className="select-wrapper">
                <select 
                  value={selectedSigner}
                  onChange={(e) => setSelectedSigner(e.target.value)}
                  className="form-select"
                >
                  <option value="cassie">cassie</option>
                  <option value="john">john</option>
                  <option value="sarah">sarah</option>
                </select>
                <ChevronDown className="select-icon" />
              </div>
            </div>

            <button className="action-button">
              <Edit3 className="button-icon" />
              <span>Add signature</span>
            </button>

            <button className="action-button">
              <FileText className="button-icon" />
              <span>Add text</span>
            </button>

            <button className="action-button">
              <Calendar className="button-icon" />
              <span>Add date</span>
            </button>
          </div>

          {/* Step 3 */}
          <div className="step-section">
            <span className="step-label">Step 3</span>
            
            <button className="action-button help-button">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings className="button-icon" />
                <span>Apply Fields</span>
              </div>
              <div className="help-icon">
                <span>?</span>
              </div>
            </button>

            <button className="action-button primary-button">
              <Send className="button-icon" />
              <span>Send</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="content-area">
          {/* Document Toolbar */}
          <div className="document-toolbar">
            <div className="toolbar-section">
              <button className="toolbar-button">
                <div className="toolbar-border"></div>
              </button>
              <button className="toolbar-button">
                <FileText className="toolbar-icon" />
              </button>
            </div>
            
            <div className="toolbar-section">
              <span className="zoom-text">{zoomLevel}%</span>
              <button 
                onClick={handleZoomOut}
                className="toolbar-button"
              >
                <ZoomOut className="toolbar-icon" />
              </button>
              <button 
                onClick={handleZoomIn}
                className="toolbar-button"
              >
                <ZoomIn className="toolbar-icon" />
              </button>
            </div>

            <div className="toolbar-section">
              <button className="toolbar-button">
                <RotateCw className="toolbar-icon" />
              </button>
              <button className="toolbar-button">
                <Download className="toolbar-icon" />
              </button>
              <button className="toolbar-button">
                <Maximize2 className="toolbar-icon" />
              </button>
            </div>
          </div>

          {/* Document Viewer */}
          <div className="document-viewer">
            <div className="document-container">
              {uploadedFile ? (
                <div className="document-frame">
                  <iframe
                    src={uploadedFile.url}
                    className="pdf-viewer"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                    title="PDF Viewer"
                  />
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-content">
                    <div className="empty-icon-wrapper">
                      <FileText className="empty-icon" />
                    </div>
                    <h3 className="empty-title">
                      No document uploaded
                    </h3>
                    <p className="empty-description">
                      Upload a PDF document to get started with the signing process.
                    </p>
                    <button 
                      onClick={triggerFileUpload}
                      className="upload-cta-button"
                    >
                      <Upload className="toolbar-icon" />
                      Upload Document
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signapp;

