import { useState } from 'react';
import {FileDownload} from "./FileDownload";
import {Button, Input} from "@mui/material";

interface FileData {
  filename: string;
  uploadTime: string;
  value: string;
  description: string;
  tags: string[];
}

export const FileUploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return; // do nothing if no file selected

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData: FileData = {
        filename: file.name,
        uploadTime: new Date().toISOString(),
        value: event.target?.result?.toString()?.split(',')[1] || '',
        description: 'desc', // add your description here
        tags: ['plik'], // add your tags here
      };
      fetch('http://localhost:8080/api/course/645a6c26be0d6f886fa131d8/attachments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fileData),
      })
          .then(response => response.json())
          .then(data => {
            console.log('File uploaded successfully:', data);
            setFile(null);
          })
          .catch(error => console.error('Error uploading file:', error));
    };
    reader.readAsDataURL(file); // read the selected file
  };

  return (
      <>
        <form onSubmit={handleFileSubmit} >
          <Input type="file" onChange={handleFileUpload}/>
          <Button
              variant={'contained'}
              type="submit"
              disabled={!file}>Upload</Button>
        </form>
      </>
  );
};
