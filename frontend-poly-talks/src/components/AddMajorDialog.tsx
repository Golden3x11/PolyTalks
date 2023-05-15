import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,} from '@mui/material';

export function AddMajorDialog(props: {
    open: boolean;
    onClose: () => void;
    onAdd: (majorName: string) => void;
}) {
    const [majorName, setMajorName] = useState('');

    const handleMajorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMajorName(event.target.value);
    };

    const handleCancel = () => {
        props.onClose();
    };

    const handleAdd = () => {
        props.onAdd(majorName);
        setMajorName('');
    };

    return (
        <Dialog open={props.open} onClose={handleCancel}>
            <DialogTitle>Dodaj Kierunek</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="major-name"
                    label="Nazwa Kierunku"
                    type="text"
                    fullWidth
                    value={majorName}
                    onChange={handleMajorNameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Anuluj
                </Button>
                <Button onClick={handleAdd} color="primary">
                    Dodaj
                </Button>
            </DialogActions>
        </Dialog>
    );
}
