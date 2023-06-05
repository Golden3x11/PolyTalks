import React, {useState} from 'react';
import {StarRating} from './StarRating';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {getToken} from "../../authentication/Authentication";
import {enqueueSnackbar} from "notistack";
import {LecturerDto} from "../../dto/lecturer.dto";
import {CourseDto} from "../../dto/course.dto";
import {AddCourseDialog} from "../AddCourseDialog";


const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    },
    textInput: {
        width: '100%'
    },
    textTopic: {
        fontSize: 'larger',
        fontWeight: 'bold'
    }
}));

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

interface RatingBoxCreateProps {
    id: string | undefined;
    handleRatingCreated: any;
}

interface CourseDictionary {
    [key: string]: string;
}

export const RatingBoxCreate = (props: RatingBoxCreateProps) => {
    const {id, handleRatingCreated} = props;
    const {classes, cx} = useStyles(undefined, undefined);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [course, setCourse] = React.useState("");
    const [courseList, setCourseList] = React.useState<any[]>([]);

    const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = React.useState(false);
    const [allCourseList, setAllCourseList] = React.useState<any[]>([]);
    const [courseDictionary, setCourseDictionary] = React.useState<CourseDictionary>({});

    const [ratingValues, setRatingValues] = useState({
        difficulty: 0,
        knowledge: 0,
        communication: 0,
        friendliness: 0,
    });

    const handleRatingChange = (category: string, rating: number) => {
        setRatingValues((prevValues) => ({
            ...prevValues,
            [category]: rating,
        }));
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleCourseChange = (event: SelectChangeEvent) => {
        setCourse(event.target.value);
    };

    const handleOpenAddCourseDialog = () => {
        setIsAddCourseDialogOpen(true);
    };

    const handleCloseAddCourseDialog = () => {
        setIsAddCourseDialogOpen(false);
    };

    const handleAddCourse = (courseId: string) => {
        setCourse(courseId);
        let courseAdded = allCourseList.find((course: CourseDto) => course._id === courseId);
        setCourseList([...courseList, courseAdded])
        setIsAddCourseDialogOpen(false);
    };


    const getAllLecturerCourse = () => {
        fetch("http://localhost:8080/api/lecturer")
            .then(response => response.json())
            .then(data => {
                const courses = data.map((lecturer: LecturerDto) => lecturer.courses);
                setCourseList(courses[0]);
            })
            .catch(error => console.error("Error while retrieving courses id:", error));
    };

    const getAllCourses = () => {
        fetch("http://localhost:8080/api/course")
            .then(response => response.json())
            .then(data => {
                setAllCourseList(data);
            })
            .catch(error => console.error("Error while retrieving courses id:", error));
    };

    const generateCourseDictionary = () => {
        const courseDtoList = allCourseList.map((course : CourseDto) => course);
        const excludedIds = courseList.map((course : CourseDto) => course._id);
        const filteredCourseDtoList = courseDtoList.filter(
            (course) => !excludedIds.includes(course._id)
        );

        const dictionary: CourseDictionary = {};

        for (const course of filteredCourseDtoList) {
            dictionary[course.name] = course._id;
        }
        setCourseDictionary(dictionary);
    };

    React.useEffect(() => {
        getAllLecturerCourse();
        getAllCourses();
    }, []);

    React.useEffect(() => {
        generateCourseDictionary();
    }, [allCourseList, courseList]);


    const addRating = () => {
        if (!getToken()) {
            enqueueSnackbar('Zaloguj się kontem Google');
            return
        }
        const url = "http://localhost:8080/api/lecturer/" + id + "/ratings";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                course: course,
                rating_difficulty: ratingValues.difficulty,
                rating_knowledge: ratingValues.knowledge,
                rating_communication: ratingValues.communication,
                rating_friendliness: ratingValues.friendliness,
                userToken: getToken()
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Rating added successfully:', data);
                handleRatingCreated();
            })
            .catch(error => console.error('Error while adding rating:', error));
    };

    return (
        <div>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                <tr>
                    <th style={{
                        backgroundColor: '#f2f2f2',
                        padding: '10px',
                        textAlign: 'center',
                        border: '1px solid #ccc'
                    }}>Trudność zdania
                    </th>
                    <th style={{
                        backgroundColor: '#f2f2f2',
                        padding: '10px',
                        textAlign: 'center',
                        border: '1px solid #ccc'
                    }}>Wiedza
                    </th>
                    <th style={{
                        backgroundColor: '#f2f2f2',
                        padding: '10px',
                        textAlign: 'center',
                        border: '1px solid #ccc'
                    }}>Komunikatywność
                    </th>
                    <th style={{
                        backgroundColor: '#f2f2f2',
                        padding: '10px',
                        textAlign: 'center',
                        border: '1px solid #ccc'
                    }}>Podejście do studenta
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{padding: '10px', textAlign: 'center', border: '1px solid #ccc'}}>
                        <StarRating
                            value={ratingValues.difficulty}
                            onRatingChange={(rating) =>
                                handleRatingChange('difficulty', rating)
                            }
                        />
                    </td>
                    <td style={{padding: '10px', textAlign: 'center', border: '1px solid #ccc'}}>
                        <StarRating
                            value={ratingValues.knowledge}
                            onRatingChange={(rating) =>
                                handleRatingChange('knowledge', rating)
                            }
                        />
                    </td>
                    <td style={{padding: '10px', textAlign: 'center', border: '1px solid #ccc'}}>
                        <StarRating
                            value={ratingValues.communication}
                            onRatingChange={(rating) =>
                                handleRatingChange('communication', rating)
                            }
                        />
                    </td>
                    <td style={{padding: '10px', textAlign: 'center', border: '1px solid #ccc'}}>
                        <StarRating
                            value={ratingValues.friendliness}
                            onRatingChange={(rating) =>
                                handleRatingChange('friendliness', rating)
                            }
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <div>
                <h2 className={classes.red}>Ocena słowna</h2>
                <TextField
                    className={classes.textInput}
                    id="outlined-basic"
                    label="Napisz ocenę słowną"
                    variant="outlined"
                    required
                    value={title}
                    onChange={handleTitleChange}
                    InputProps={{className: classes.textTopic}}
                />
            </div>
            <div>
                <h2 className={classes.red}>Opis</h2>
                <TextField
                    className={classes.textInput}
                    id="outlined-multiline-static"
                    label="Napisz coś co może pomóc albo i nie w wyborze"
                    variant="outlined"
                    required
                    multiline
                    rows={5}
                    value={description}
                    onChange={handleDescriptionChange}
                    InputProps={{className: classes.textTopic}}
                />
            </div>
            <div>
                <h2 className={`${classes.red}`}>Kurs</h2>
                <div style={{display: "flex", alignItems: 'baseline', gap: '0.25em'}}>
                    <FormControl sx={{m: 1, width: 300}}>
                        <InputLabel id="demo-single-checkbox-label">Kurs</InputLabel>
                        <Select
                            labelId="demo-single-checkbox-label"
                            id="demo-single-checkbox"
                            value={course}
                            onChange={handleCourseChange}
                            input={<OutlinedInput label="Tag"/>}
                            MenuProps={MenuProps}
                        >
                            {courseList.map((courseData: CourseDto) => (
                                <MenuItem key={courseData.name} value={courseData._id}>
                                    {courseData.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" style={{fontSize: '1.15rem'}}
                            onClick={handleOpenAddCourseDialog}>Dodaj</Button>
                    <AddCourseDialog open={isAddCourseDialogOpen} onClose={handleCloseAddCourseDialog}
                                     onAdd={handleAddCourse} courses={courseDictionary}/>
                </div>
            </div>
            <Button
                variant="contained"
                style={{fontSize: "1.15rem", alignSelf: "flex-end", marginTop: "1em"}}
                disabled={title === "" || description === "" || ratingValues.knowledge === 0
                || ratingValues.friendliness === 0 || ratingValues.communication === 0
                || ratingValues.difficulty === 0}
                onClick={addRating}
            >
                Dodaj opinię
            </Button>
        </div>
    );
};