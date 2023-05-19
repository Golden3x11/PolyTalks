import React, {useState} from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    Input,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {AddTagDialog} from "../AddTagDialog";
import {TagDto} from "../../dto/tag.dto";
import {makeStyles} from "tss-react/mui";
import {Add} from "@mui/icons-material"

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

interface FileData {
    filename: string;
    uploadTime: string;
    value: string;
    description: string;
    tags: string[];
}

export const FileUploadComponent = ({cid, onFileUpload}: { cid: any, onFileUpload: any}) => {
    const [file, setFile] = useState<File | null>(null);
    const [tags, setTags] = React.useState<string[]>([]);
    const {classes, cx} = useStyles(undefined, undefined);
    const [description, setDescription] = React.useState("");
    const [tagsList, setTagsList] = React.useState<string[]>([]);
    const [isAddTagDialogOpen, setIsAddTagDialogOpen] = React.useState(false);

    React.useEffect(() => {
        fetch('http://localhost:8080/api/tag')
            .then(response => response.json())
            .then(data => setTagsList(data.map((tag: TagDto) => tag.name)))
            .catch(error => console.error(error));
    }, []);

    const handleOpenAddTagDialog = () => {
        setIsAddTagDialogOpen(true);
    };

    const handleCloseAddTagDialog = () => {
        setIsAddTagDialogOpen(false);
    };

    const handleAddTag = (tagName: string) => {
        setTags([...tags, tagName]);
        setTagsList([...tagsList, tagName])
        setIsAddTagDialogOpen(false);
    };

    const handleTagsChange = (event: SelectChangeEvent<typeof tags>) => {
        const {
            target: {value},
        } = event;
        setTags(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

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
                description: description, // add your description here
                tags: tags, // add your tags here
            };
            fetch(`http://localhost:8080/api/course/${cid}/attachments`, {
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
                    setDescription("");
                    setTags([]);
                    onFileUpload();
                })
                .catch(error => console.error('Error uploading file:', error));
        };
        reader.readAsDataURL(file); // read the selected file
    };

    return (
        <>
            <form onSubmit={handleFileSubmit} style={{width: "100%"}}>
                <div style={{width: "100%"}}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                        <div>
                            <h2 className={`${classes.red}`}>Plik</h2>
                            <Input type="file" onChange={handleFileUpload}/>
                        </div>
                        <div>
                            <h2 className={`${classes.red}`}>Tagi</h2>
                            <div style={{display: "flex", alignItems: 'baseline', gap: '0.25em'}}>
                                <FormControl sx={{m: 1, width: 250}}>
                                    <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={tags}
                                        onChange={handleTagsChange}
                                        input={<OutlinedInput label="Tag"/>}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {tagsList.map((tag) => (
                                            <MenuItem key={tag} value={tag}>
                                                <Checkbox checked={tags.indexOf(tag) > -1}/>
                                                <ListItemText primary={tag}/>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button variant="contained"
                                        onClick={handleOpenAddTagDialog}><Add/></Button>
                                <AddTagDialog open={isAddTagDialogOpen} onClose={handleCloseAddTagDialog}
                                              onAdd={handleAddTag}/>
                            </div>
                        </div>

                    </div>
                    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                        <div>
                            <h2 className={`${classes.red}`}>Opis</h2>
                            <TextField className={`${classes.textInput}`}
                                       label="Opisz bardziej plik"
                                       multiline
                                       rows={2}
                                       required
                                       value={description}
                                       onChange={handleDescriptionChange}
                            />
                        </div>
                    </div>
                </div>
                <div style={{width: "100%", display: "flex", flexDirection: "row-reverse"}}>
                    <Button
                        style={{fontSize: '1.5rem', marginTop: "1em"}}
                        variant={'contained'}
                        type="submit"
                        disabled={!file || description === "" || !tags.length}>Dodaj Plik</Button>
                </div>
            </form>

        </>
    );
};
