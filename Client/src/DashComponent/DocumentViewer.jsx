
import React, { useState } from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { Rnd } from 'react-rnd';
import './DocumentViewer.css';

const DocumentViewer = ({ uploadedFile, zoomLevel, triggerFileUpload, signatureImage }) => {
  const [showSignature, setShowSignature] = useState(true);

  const handleDeleteSignature = () => {
    setShowSignature(false);
  };

  return (
    <div className="document-viewer">
      <div className="document-container" style={{ position: 'relative' }}>
        {uploadedFile ? (
          <div className="document-frame" style={{ position: 'relative' }}>
            <iframe
              src={uploadedFile.url}
              className="pdf-viewer"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top left',
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="PDF Viewer"
            />

            {signatureImage && showSignature && (
              <Rnd
                default={{
                  x: 100,
                  y: 100,
                  width: 150,
                  height: 70,
                }}
                bounds="parent"
              >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src={signatureImage}
                    alt="Signature"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      pointerEvents: 'auto',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                    }}
                  />
                  <button
                    onClick={handleDeleteSignature}
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      backgroundColor: '#ff4d4d',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              </Rnd>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-content">
              <div className="empty-icon-wrapper">
                <FileText className="empty-icon" />
              </div>
              <h3 className="empty-title">No document uploaded</h3>
              <p className="empty-description">
                Upload a PDF document to get started with the signing process.
              </p>
              <button onClick={triggerFileUpload} className="upload-cta-button">
                <Upload className="toolbar-icon" />
                Upload Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;
