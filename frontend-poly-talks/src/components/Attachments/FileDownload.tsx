import React from 'react';
import {Button} from "@mui/material";

export const FileDownload = ({cid, aid}: { cid: any, aid: string }) => {
    const downloadFile = async () => {
        const response = await fetch(
            `http://localhost:8080/api/course/${cid}/attachment/${aid}`
        );
        const data = await response.json();

        const byteCharacters = atob(data.value);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.name;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Button variant={'contained'} onClick={downloadFile}>
            Download File
        </Button>
    );
};