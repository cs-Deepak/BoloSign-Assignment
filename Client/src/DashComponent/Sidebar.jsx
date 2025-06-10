
// import React, { useState, useRef } from 'react';
// import SignatureCanvas from 'react-signature-canvas';
// import {
//   Upload, Edit3, FileText, Calendar, Settings, Send, Image, Type,
// } from 'lucide-react';
// import './Sidebar.css';



// function useSignatureHandler(setSignatureImage, closeModal) {
//   const sigCanvasRef = useRef(null);
//   const [signatureMode, setSignatureMode] = useState("draw");
//   const [typedSignature, setTypedSignature] = useState("");

//   const handleSignatureSave = () => {
//     console.log("🖊️ Save clicked - Mode:", signatureMode);

//     if (signatureMode === "draw" && sigCanvasRef.current) {
//       const canvas = sigCanvasRef.current.getTrimmedCanvas();
//       if (canvas.width && canvas.height) {
//         const dataUrl = canvas.toDataURL('image/png');
//         setSignatureImage(dataUrl);
//         alert("Drawn signature saved!");
//       } else {
//         alert("⚠️ Please draw something first.");
//       }
//     } else if (signatureMode === "text") {
//       if (!typedSignature.trim()) {
//         alert("⚠️ Please type a signature.");
//         return;
//       }
//       const canvas = document.createElement("canvas");
//       canvas.width = 400;
//       canvas.height = 100;
//       const ctx = canvas.getContext("2d");
//       ctx.font = "30px cursive";
//       ctx.fillStyle = "black";
//       ctx.fillText(typedSignature, 10, 50);
//       setSignatureImage(canvas.toDataURL("image/png"));
//       alert("Typed signature saved!");
//     }
//     closeModal();
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSignatureImage(reader.result);
//         alert("Image signature uploaded!");
//         closeModal();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return {
//     signatureMode,
//     setSignatureMode,
//     typedSignature,
//     setTypedSignature,
//     sigCanvasRef,
//     handleSignatureSave,
//     handleImageUpload,
//   };
// }



// const Sidebar = ({
//   selectedSigner,
//   setSelectedSigner,
//   isDragOver,
//   uploadedFile,
//   handleDragEnter,
//   handleDragLeave,
//   handleDragOver,
//   handleDrop,
//   triggerFileUpload,
//   setSignatureImage,
// }) => {
//   const [showSignatureModal, setShowSignatureModal] = useState(false);

//   const {
//     signatureMode,
//     setSignatureMode,
//     typedSignature,
//     setTypedSignature,
//     sigCanvasRef,
//     handleSignatureSave,
//     handleImageUpload
//   } = useSignatureHandler(setSignatureImage, () => setShowSignatureModal(false));

//   const handleSend = () => {
//     console.log("📤 Sending to:", selectedSigner);
//     console.log("📄 File:", uploadedFile?.name);
//     alert("Pretend we're sending the signed document to: " + selectedSigner);
//   };

//   return (
//     <div className="sidebar">
//       <h2 className="sidebar-title">Prepare Document</h2>

    
//       <div className="step-section">
//         <span className="step-label">Step 1</span>
//         <div
//           className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
//           onClick={triggerFileUpload}
//           onDragEnter={handleDragEnter}
//           onDragLeave={handleDragLeave}
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         >
//           <div className="upload-content">
//             <Upload className="upload-icon" />
//             <span className="upload-text">Upload a document</span>
//             <span className="upload-subtext">
//               {isDragOver ? 'Drop PDF file here' : 'Click to upload or drag & drop PDF'}
//             </span>
//           </div>
//           <div className="help-icon"><span>?</span></div>
//         </div>
//         {uploadedFile && <div className="upload-success">Uploaded: {uploadedFile.name}</div>}
//       </div>

    
//       <div className="step-section">
//         <span className="step-label">Step 2</span>
//         <div className="form-group">
//           <label className="form-label">Assign field to email</label>
//           <input
//             type="email"
//             className="form-input"
//             placeholder="Enter email address"
//             value={selectedSigner}
//             onChange={(e) => setSelectedSigner(e.target.value)}
//           />
//         </div>

//         <button className="action-button" onClick={() => setShowSignatureModal(true)}>
//           <Edit3 className="button-icon" />
//           <span>Add signature</span>
//         </button>


//       </div>

//       <div className="step-section">
//         <span className="step-label">Step 3</span>


//         <button className="action-button primary-button" onClick={handleSend}>
//           <Send className="button-icon" />
//           <span>Send</span>
//         </button>
//       </div>


//       {showSignatureModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Create Signature</h3>

//             <div className="signature-options">
//               <button onClick={() => setSignatureMode("draw")}><Edit3 /> Draw</button>
//               <button onClick={() => setSignatureMode("text")}><Type /> Type</button>
//               <button onClick={() => setSignatureMode("image")}><Image /> Upload</button>
//             </div>

//             {signatureMode === "draw" && (
//               <SignatureCanvas
//                 penColor="black"
//                 canvasProps={{ width: 400, height: 200, className: 'sig-canvas' }}
//                 ref={sigCanvasRef}
//               />
//             )}

//             {signatureMode === "text" && (
//               <input
//                 type="text"
//                 placeholder="Type your name"
//                 value={typedSignature}
//                 onChange={(e) => setTypedSignature(e.target.value)}
//               />
//             )}

//             {signatureMode === "image" && (
//               <input type="file" accept="image/*" onChange={handleImageUpload} />
//             )}

//             {signatureMode !== "image" && (
//               <div className="modal-actions">
//                 <button onClick={handleSignatureSave}>Save</button>
//                 <button onClick={() => setShowSignatureModal(false)}>Cancel</button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {
  Upload, Edit3, FileText, Calendar, Settings, Send, Image, Type,
} from 'lucide-react';
import './Sidebar.css';

function useSignatureHandler(setSignatureImage, closeModal) {
  const sigCanvasRef = useRef(null);
  const [signatureMode, setSignatureMode] = useState("draw");
  const [typedSignature, setTypedSignature] = useState("");

  const handleSignatureSave = () => {
    console.log("🖊️ Save clicked - Mode:", signatureMode);

    if (signatureMode === "draw" && sigCanvasRef.current) {
      const canvas = sigCanvasRef.current.getTrimmedCanvas();
      if (canvas.width && canvas.height) {
        const dataUrl = canvas.toDataURL('image/png');
        setSignatureImage(dataUrl);
        alert("Drawn signature saved!");
      } else {
        alert("⚠️ Please draw something first.");
      }
    } else if (signatureMode === "text") {
      if (!typedSignature.trim()) {
        alert("⚠️ Please type a signature.");
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      ctx.font = "30px cursive";
      ctx.fillStyle = "black";
      ctx.fillText(typedSignature, 10, 50);
      setSignatureImage(canvas.toDataURL("image/png"));
      alert("Typed signature saved!");
    }
    closeModal();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result);
        alert("Image signature uploaded!");
        closeModal();
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    signatureMode,
    setSignatureMode,
    typedSignature,
    setTypedSignature,
    sigCanvasRef,
    handleSignatureSave,
    handleImageUpload,
  };
}

const Sidebar = ({
  selectedSigner,
  setSelectedSigner,
  isDragOver,
  uploadedFile,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  triggerFileUpload,
  setSignatureImage,
  signatureImage,
  signatureSize, // 👈 make sure you're passing this from parent
}) => {
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  const {
    signatureMode,
    setSignatureMode,
    typedSignature,
    setTypedSignature,
    sigCanvasRef,
    handleSignatureSave,
    handleImageUpload
  } = useSignatureHandler(setSignatureImage, () => setShowSignatureModal(false));

  const handleSend = () => {
    if (!uploadedFile?.file || !signatureImage) {
      alert("Upload PDF and add signature first.");
      return;
    }

    const formData = new FormData();
    formData.append('pdf', uploadedFile.file); // The real file object
    formData.append('signatureDataURL', signatureImage);
    formData.append('position', JSON.stringify(signatureSize));

    fetch('http://localhost:6005/sign', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        alert("✅ Signed PDF saved to database!");
      })
      .catch(err => {
        console.error(err);
        alert("❌ Failed to send signed PDF.");
      });
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Prepare Document</h2>

      {/* Step 1: Upload */}
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
          <div className="help-icon"><span>?</span></div>
        </div>
        {uploadedFile && <div className="upload-success">Uploaded: {uploadedFile.name}</div>}
      </div>

      {/* Step 2: Assign + Add Signature */}
      <div className="step-section">
        <span className="step-label">Step 2</span>
        <div className="form-group">
          <label className="form-label">Assign field to email</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter email address"
            value={selectedSigner}
            onChange={(e) => setSelectedSigner(e.target.value)}
          />
        </div>

        <button className="action-button" onClick={() => setShowSignatureModal(true)}>
          <Edit3 className="button-icon" />
          <span>Add signature</span>
        </button>
      </div>

      {/* Step 3: Send */}
      <div className="step-section">
        <span className="step-label">Step 3</span>
        <button className="action-button primary-button" onClick={handleSend}>
          <Send className="button-icon" />
          <span>Send</span>
        </button>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create Signature</h3>

            <div className="signature-options">
              <button onClick={() => setSignatureMode("draw")}><Edit3 /> Draw</button>
              <button onClick={() => setSignatureMode("text")}><Type /> Type</button>
              <button onClick={() => setSignatureMode("image")}><Image /> Upload</button>
            </div>

            {signatureMode === "draw" && (
              <SignatureCanvas
                penColor="black"
                canvasProps={{ width: 400, height: 200, className: 'sig-canvas' }}
                ref={sigCanvasRef}
              />
            )}

            {signatureMode === "text" && (
              <input
                type="text"
                placeholder="Type your name"
                value={typedSignature}
                onChange={(e) => setTypedSignature(e.target.value)}
              />
            )}

            {signatureMode === "image" && (
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            )}

            {signatureMode !== "image" && (
              <div className="modal-actions">
                <button onClick={handleSignatureSave}>Save</button>
                <button onClick={() => setShowSignatureModal(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
