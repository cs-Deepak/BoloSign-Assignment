
import React from 'react';
import { FileText, ZoomIn, ZoomOut, RotateCw, Download, Maximize2 } from 'lucide-react';
import './DocumentToolbar.css';

const DocumentToolbar = ({ zoomLevel, handleZoomIn, handleZoomOut }) => {
  return (
    <div className="document-toolbar">
      <div className="toolbar-section">
        <button className="toolbar-button">
        </button>
        <button className="toolbar-button">
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
        </button>
        <button className="toolbar-button">
        </button>
        <button className="toolbar-button">
        </button>
      </div>
    </div>
  );
};

export default DocumentToolbar;