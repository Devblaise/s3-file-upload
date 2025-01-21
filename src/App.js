import React, { useState, useRef } from 'react'; 
import AWS from 'aws-sdk';
import './App.css';

// Environment variables
const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
const REGION = process.env.REACT_APP_AWS_REGION;

// AWS S3 configuration
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadKey, setUploadKey] = useState(0); 
  const fileInputRef = useRef(null); 

  const handleFileInput = (e) => {
    setSelectedFiles(Array.from(e.target.files)); 
    setUploadProgress(0); 
    console.log("Files selected:", e.target.files);
  };

  const uploadFiles = () => {
    if (selectedFiles.length === 0) {
      alert('Please select files to upload.');
      return;
    }

    selectedFiles.forEach((file) => {
      console.log('Uploading file:', file.name);
      const params = {
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
      };

      myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err) => {
          if (err) console.log(err);
          else {
            console.log("Successfully uploaded file:", file.name);
            if (file === selectedFiles[selectedFiles.length - 1]) { 
              alert("Successfully uploaded all files!");
              setUploadKey(prevKey => prevKey + 1); 
              setSelectedFiles([]); 
            }
          }
        });
    });
  };

  return (
    <div className="App">
      <div className="upload-container">
        <h1>Upload Files to S3</h1>
        {/* Add ref and key to input, change onChange to handleFileInput */}
        <input type="file" multiple onChange={handleFileInput} ref={fileInputRef} key={uploadKey} />
        <button onClick={uploadFiles}>Upload to S3</button>
        <div className="progress-container">
          <div className="progress-bar" style={{width: `${uploadProgress}%`}}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
