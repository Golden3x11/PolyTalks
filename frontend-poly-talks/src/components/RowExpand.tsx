import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import React, { useState } from 'react';

const RowExpand = ({ value }: { value: string }) => {
    const CHAR_SHOWED = 30;
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        if(value.length > CHAR_SHOWED){
            setOpenDialog(true)
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const formattedValue = value.length > CHAR_SHOWED ? `${value.substring(0, CHAR_SHOWED)}...` : value;

    return (
        <div
            style={{
                fontWeight: "400",
                fontSize: "0.875rem",
                lineHeight: "1.43",
                letterSpacing: "0.01071",
                display: "table-cell",
                verticalAlign: "inherit",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
            }}
        >
            <div onClick={handleOpenDialog}>{formattedValue}</div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <DialogContentText>{value}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RowExpand;
