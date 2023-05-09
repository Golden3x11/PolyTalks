import { useState } from 'react';

export const FileUploadComponent = () => {
  const [file, setFile] = useState(null);

  // const handleFileUpload = (event) => {
  //   setFile(event.target.files[0]);
  // };
  //
  // const handleFileSubmit = (event) => {
  //   event.preventDefault();
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const fileData = {
  //       filename: file.name,
  //       uploadTime: new Date().toISOString(),
  //       value: event.target.result.split(',')[1],
  //       description: 'desc', // add your description here
  //       tags: ['plik'], // add your tags here
  //     };
  //     fetch('http://localhost:8080/api/course/64593d575712a4984e0d070e/attachments', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(fileData),
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('File uploaded successfully:', data);
  //         setFile(null);
  //       })
  //       .catch(error => console.error('Error uploading file:', error));
  //   };
  //   reader.readAsDataURL(file); // read the selected file
  // };
  //
  // return (
  //   <form onSubmit={handleFileSubmit} style={{ marginTop: '10em' }}>
  //     <label>
  //       Choose a file:
  //       <input type="file" onChange={handleFileUpload} />
  //     </label>
  //     <button type="submit" disabled={!file}>Upload</button>
  //   </form>
  // );
};
