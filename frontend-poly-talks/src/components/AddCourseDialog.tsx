import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';

interface CourseDictionary {
    [key: string]: string;
}

export function AddCourseDialog(props: {
    open: boolean;
    onClose: () => void;
    onAdd: (selectedCourse: string) => void;
    courses: CourseDictionary;
}) {
    const [selectedCourse, setSelectedCourse] = useState('');

    const handleCourseChange = (event: SelectChangeEvent) => {
        setSelectedCourse(event.target.value);
    };

    const handleCancel = () => {
        props.onClose();
    };

    const handleAdd = () => {
        props.onAdd(selectedCourse);
        setSelectedCourse('');
    };

    return (
        <Dialog open={props.open} onClose={handleCancel}>
            <DialogTitle>Dodaj kurs do prowadzącego</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel id="course-select-label">Wybierz kurs</InputLabel>
                    <Select
                        labelId="course-select-label"
                        id="course-select"
                        value={selectedCourse}
                        onChange={handleCourseChange}
                    >
                        {Object.entries(props.courses).map(([courseKey, courseValue]) => (
                            <MenuItem key={courseKey} value={courseValue}>
                                {courseKey}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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