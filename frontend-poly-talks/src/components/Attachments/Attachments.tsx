import {FileUploadComponent} from "./FileUploadComponent";
import {FileDownload} from "./FileDownload";

export const Attachments = () => {
    return (
        <div style={{display: 'flex', marginTop: '10em', marginLeft: '50em'}} >
            <FileDownload/>
            <FileUploadComponent/>
        </div>
    );
};