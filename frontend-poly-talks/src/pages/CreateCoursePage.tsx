import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';
import React from "react";
import {makeStyles} from "tss-react/mui";
import {AddMajorDialog} from "../components/AddMajorDialog";
import {CourseDto} from "../dto/course.dto";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textInput: {
        width: '100%'
    },
    textTopic: {
        fontSize: 'larger',
        fontWeight: 'bold'
    }
}));

export const CreateCoursePage = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [name, setName] = React.useState("");
    const [code, setCode] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [major, setMajor] = React.useState("");
    const [majorList, setMajorList] = React.useState<string[]>([]);
    const [isAddMajorDialogOpen, setIsAddMajorDialogOpen] = React.useState(false);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleMajorChange = (event: SelectChangeEvent<string>) => {
        setMajor(event.target.value);
    };

    const handleOpenAddMajorDialog = () => {
        setIsAddMajorDialogOpen(true);
    };

    const handleCloseAddMajorDialog = () => {
        setIsAddMajorDialogOpen(false);
    };

    const handleAddMajor = (majorName: string) => {
        setMajor(majorName);
        setMajorList([...majorList, majorName])
        setIsAddMajorDialogOpen(false);
    };


    React.useEffect(() => {
        getAllMajorNames();
    }, []);

    const getAllMajorNames = () => {
        fetch("http://localhost:8080/api/course")
            .then(response => response.json())
            .then(data => {
                const majorNames = data.map((course: CourseDto) => course.major);
                const uniqueMajorNames = majorNames.filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index);
                setMajorList(uniqueMajorNames);
            })
            .catch(error => console.error("Error while retrieving major names:", error));
    };


    const addCourse = () => {
        fetch('http://localhost:8080/api/course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                code: code,
                description: description,
                major: major
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Course added successfully:', data);
            })
            .catch(error => console.error('Error while adding course:', error));
    };

    return (
        <div style={{margin: '1em 2em', display: 'flex', flexDirection: 'column', gap: '0.3em'}}>
            <div className={`${classes.header}`}>
                <h1 className={`${classes.red}`} style={{fontWeight: 'bold'}}>Dodaj nowy kurs</h1>
                <Button variant="contained"
                        style={{fontSize: '1.15rem'}}
                        disabled={name === "" || description === "" || major === "" || code === ""}
                        onClick={addCourse}
                >
                    Dodaj
                </Button>
            </div>
            <div>
                <h2 className={`${classes.red}`}>Nazwa</h2>
                <TextField className={`${classes.textInput}`}
                           id="outlined-basic"
                           label="Wpisz nazwę kursu"
                           variant="outlined"
                           required
                           value={name}
                           onChange={handleNameChange}
                           InputProps={{className: `${classes.textTopic}`}}/>
            </div>
            <div>
                <h2 className={`${classes.red}`}>Kod kursu</h2>
                <TextField className={`${classes.textInput}`}
                           id="outlined-basic"
                           label="Wpisz kod kursu"
                           variant="outlined"
                           required
                           value={code}
                           onChange={handleCodeChange}
                           InputProps={{className: `${classes.textTopic}`}}/>
            </div>
            <div>
                <h2 className={`${classes.red}`}>Opis</h2>
                <TextField className={`${classes.textInput}`}
                           id="outlined-multiline-static"
                           label="Opisz bardziej temat kursu"
                           multiline
                           rows={5}
                           required
                           value={description}
                           onChange={handleDescriptionChange}
                />
            </div>
            <div>
                <h2 className={`${classes.red}`}>Kierunek</h2>
                <div style={{display: "flex", alignItems: 'baseline', gap: '0.25em'}}>
                    <FormControl sx={{m: 1, width: 300}}>
                        <InputLabel id="demo-single-checkbox-label">Kierunek</InputLabel>
                        <Select
                            labelId="demo-single-checkbox-label"
                            id="demo-single-checkbox"
                            value={major}
                            onChange={handleMajorChange}
                            input={<OutlinedInput label="Tag"/>}
                            MenuProps={MenuProps}
                        >
                            {majorList.map((major) => (
                                <MenuItem key={major} value={major}>
                                    {major}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" style={{fontSize: '1.15rem'}}
                            onClick={handleOpenAddMajorDialog}>Dodaj</Button>
                    <AddMajorDialog open={isAddMajorDialogOpen} onClose={handleCloseAddMajorDialog}
                                    onAdd={handleAddMajor}/>
                </div>
            </div>
        </div>
    );
};