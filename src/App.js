import React, { useState, useRef } from 'react'; 
import AWS from 'aws-sdk';
import './App.css';

// Environment variables
const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
const REGION = process.env.REACT_APP_AWS_REGION;

// AWS S3 configuration
const configureAWS = () => {
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: REGION
  });
};

configureAWS();

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET }
});

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [loading, setLoading] = useState(false); 
  const fileInputRef = useRef(null); 

  const handleFileInput = (e) => {
    setSelectedFiles(Array.from(e.target.files)); 
    setUploadProgress({});
    setLoading(false);
    console.log("Files selected:", e.target.files);
  };

  const updateProgress = (fileName, progress) => {
    setUploadProgress((prevProgress) => ({
      ...prevProgress,
      [fileName]: progress
    }));
  };

  const uploadFiles = () => {
    if (selectedFiles.length === 0) {
      alert('Please select files to upload.');
      return;
    }

    setLoading(true);

    selectedFiles.forEach((file) => {
      console.log('Uploading file:', file.name);
      const params = {
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
      };

      myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          const progress = Math.round((evt.loaded / evt.total) * 100);
          updateProgress(file.name, progress);
        })
        .send((err) => {
          if (err) {
            console.error("Error uploading file:", file.name, err);
            alert(`Error uploading ${file.name}`);
          } else {
            console.log("Successfully uploaded file:", file.name);
          }
          if (file === selectedFiles[selectedFiles.length - 1]) {
            setLoading(false);
            alert("Successfully uploaded all files!");
            setSelectedFiles([]);
          }
        });
    });
  };

  return (
    <div className="App">
      <div className="upload-container">
        <h1>Upload Files to S3</h1>
        <input 
          type="file" 
          multiple 
          onChange={handleFileInput} 
          ref={fileInputRef} 
        />
        <button onClick={uploadFiles} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload to S3'}
        </button>

        <div className="progress-container">
          {selectedFiles.map((file) => (
            <div key={file.name} className="progress-bar-container">
              <span>{file.name}</span>
              <div 
                className="progress-bar" 
                style={{width: `${uploadProgress[file.name] || 0}%`}} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
