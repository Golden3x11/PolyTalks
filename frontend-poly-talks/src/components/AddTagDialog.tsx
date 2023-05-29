import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import {enqueueSnackbar} from "notistack";

export function AddTagDialog(props: any) {
    const [tagName, setTagName] = useState('');

    const handleTagNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagName(event.target.value);
    };

    const handleCancel = () => {
        props.onClose();
    };

    const handleAdd = () => {
        fetch('http://localhost:8080/api/tag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: tagName}),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Tag added successfully:', data);
                props.onAdd(tagName);
                setTagName('');
            })
            .catch(error => {
                enqueueSnackbar('Nie dodano tagu');
                props.onClose();
            });
    };

    return (
        <Dialog open={props.open} onClose={handleCancel}>
            <DialogTitle>Dodaj Tag</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="tag-name"
                    label="Nazwa Tagu"
                    type="text"
                    fullWidth
                    value={tagName}
                    onChange={handleTagNameChange}
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