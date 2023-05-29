import {Button, TextField} from '@mui/material';
import React from "react";
import {makeStyles} from "tss-react/mui";

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

export const CreateLecturerPage = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const addLecturer = () => {
        fetch('http://localhost:8080/api/lecturer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Lecturer added successfully:', data);
            })
            .catch(error => console.error('Error while adding lecturer:', error));
    };

    return (
        <div style={{ margin: "0 2em", display: "flex", flexDirection: "column", gap: "0.3em" }}>
            <div className={classes.header}>
                <h1 className={classes.red} style={{ fontWeight: "bold" }}>Dodaj nowego prowadzącego</h1>
            </div>
            <div>
                <h2 className={classes.red}>Imię</h2>
                <TextField
                    className={classes.textInput}
                    id="outlined-basic"
                    label="Wpisz imię prowadzącego"
                    variant="outlined"
                    required
                    value={name}
                    onChange={handleNameChange}
                    InputProps={{ className: classes.textTopic }}
                />
            </div>
            <div>
                <h2 className={classes.red}>Nazwisko</h2>
                <TextField
                    className={classes.textInput}
                    id="outlined-multiline-static"
                    label="Wpisz nazwisko prowadzącego"
                    variant="outlined"
                    required
                    value={surname}
                    onChange={handleSurnameChange}
                    InputProps={{ className: classes.textTopic }}
                />
            </div>
            <div>
                <h2 className={classes.red}>Email</h2>
                <TextField
                    className={classes.textInput}
                    id="outlined-basic"
                    label="Wpisz email prowadzącego"
                    variant="outlined"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    InputProps={{ className: classes.textTopic }}
                />
            </div>
            <Button
                variant="contained"
                style={{ fontSize: "1.15rem", alignSelf: "flex-end", marginTop: "1em" }}
                disabled={name === "" || surname === "" || email === ""}
                onClick={addLecturer}
            >
                Dodaj
            </Button>
        </div>
    );
};