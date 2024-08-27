import React, { useState } from 'react';

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };


  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert('Please select a video file.');
        return;
      }
  
      const formData = new FormData();
      formData.append('video', selectedFile);
  
      const url = 'http://localhost:5000/upload/hindi';
      console.log('Request URL:', url);
  
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        alert('Video uploaded successfully.');
      } else {
        console.error('Failed to upload video. Status:', response.status);
        const errorText = await response.text();
        console.error('Error text:', errorText);
        alert('Failed to upload video.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Upload a Video</h1>
      
      <div className="relative w-60 h-10 m-3">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <button
          className="w-full h-full rounded-xl bg-zinc-800 shadow-inner text-white font-bold font-myFont text-center pointer-events-none"
        >
          {selectedFile ? selectedFile.name : 'Choose File'}
        </button>
      </div>

      <button
        onClick={handleUpload}
        className="text-center rounded-xl w-60 h-10 bg-zinc-800 shadow-inner text-white font-bold font-myFont m-4"
      >
        Upload
      </button>
    </div>
    
  );
}

export default VideoUpload;
