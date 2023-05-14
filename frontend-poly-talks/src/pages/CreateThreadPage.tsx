import {
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';
import {makeStyles} from "tss-react/mui";
import React, {useEffect} from "react";
import * as http from "http";
import {TagDto} from "../dto/tag.dto";
import {AddTagDialog} from "../components/AddTagDialog";


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

export const CreateThreadPage = () => {
    const { classes, cx } = useStyles(undefined, undefined);
    const [tags, setTags] = React.useState<string[]>([]);
    const [topic, setTopic] = React.useState("");
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
            target: { value },
        } = event;
        setTags(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTopic(event.target.value);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const addThread = () => {
        fetch('http://localhost:8080/api/thread', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: topic,
                description: description,
                tags: tags
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Thread added successfully:', data);
            })
            .catch(error => console.error('Error while adding thread:', error));
    };

    return (
    <div style={{margin: '1em 2em', display: 'flex', flexDirection: 'column', gap: '0.3em'}}>
        <div className={`${classes.header}`}>
            <h1 className={`${classes.red}`} style={{fontWeight: 'bold'}}>Utwórz nowy wątek</h1>
            <Button variant="contained"
                    style={{fontSize: '1.15rem'}}
                    disabled={topic === "" || description === "" || !tags.length}
                    onClick={addThread}
            >
                Utwórz
            </Button>
        </div>
        <div>
            <h2 className={`${classes.red}`}>Temat</h2>
            <TextField className={`${classes.textInput}`}
                       id="outlined-basic"
                       label="Wpisz nazwę wątku"
                       variant="outlined"
                       required
                       value={topic}
                       onChange={handleTopicChange}
                       InputProps={{className: `${classes.textTopic}`}}/>
        </div>
        <div>
            <h2 className={`${classes.red}`}>Opis</h2>
            <TextField  className={`${classes.textInput}`}
                        id="outlined-multiline-static"
                        label="Opisz bardziej temat wątku"
                        multiline
                        rows={5}
                        required
                        value={description}
                        onChange={handleDescriptionChange}
            />
        </div>
        <div>
            <h2 className={`${classes.red}`}>Tagi</h2>
            <div style={{display: "flex", alignItems: 'baseline', gap: '0.25em'}}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={tags}
                    onChange={handleTagsChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {tagsList.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                            <Checkbox checked={tags.indexOf(tag) > -1} />
                            <ListItemText primary={tag} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" style={{fontSize: '1.15rem'}} onClick={handleOpenAddTagDialog}>Dodaj</Button>
            <AddTagDialog open={isAddTagDialogOpen} onClose={handleCloseAddTagDialog} onAdd={handleAddTag} />
            </div>
        </div>
    </div>
  );
};