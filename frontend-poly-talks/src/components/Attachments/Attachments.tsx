import {FileUploadComponent} from "./FileUploadComponent";
import {FileDownload} from "./FileDownload";

export const Attachments = () => {
    return (
        <>
            <FileDownload/>
            <FileUploadComponent/>
        </>
    );
};