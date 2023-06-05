import {makeStyles} from "tss-react/mui";
import React from "react";
import {useParams} from "react-router";
import {CourseDto} from "../dto/course.dto";
import {Button, Card, CardContent, IconButton} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {useNavigate} from "react-router-dom";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


interface Lecturer {
    id: string;
    name: string;
    firstGrade: number;
    secondGrade: number;
    thirdGrade: number;
    fourthGrade: number;
}

const lecturersMock: Lecturer[] = [
    {
        id: '646a5d37ed8cc67341700c00',
        name: 'Nowak Adam',
        firstGrade: 4.5,
        secondGrade: 3.8,
        thirdGrade: 4.2,
        fourthGrade: 4.1
    },
    {
        id: '646a5cb0ed8cc67341700be1',
        name: 'Wojtyła Karol',
        firstGrade: 3.7,
        secondGrade: 4.0,
        thirdGrade: 3.9,
        fourthGrade: 3.6
    },
    {
        id: '645b9279a07ae9767068e6be',
        name: 'Małysz Adam',
        firstGrade: 3.0,
        secondGrade: 5.0,
        thirdGrade: 3.5,
        fourthGrade: 4.0
    },
];

const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    },
    header: {
        display: "flex",
        alignItems: "baseline"
    },
    maxWidth: {
        width: '100%'
    },
    gridButtons: {
        display: "grid",
        gridTemplateColumns: "33% 15% 11% 15% 20% 1fr",
        alignItems: "end",
        justifyContent: "space-between",
        padding: "0 2em",
        marginTop: "2em"
    },
    gridLecturers: {
        display: "grid",
        gridTemplateColumns: "35% repeat(4, 15%) 5%",
        alignItems: "baseline",
        justifyContent: "space-between",
    },
    cardLook:{
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        background: "white",
        marginBottom: "1.5em",
        padding: "0 2em"
    },
    opinion: {
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        MsUserSelect: "none"
    }
}));

export const SingleCourse = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [course, setCourse] = React.useState<CourseDto | null>(null);
    const navigate = useNavigate();
    const {id} = useParams();
    const [lecturers, updateLecturers] = React.useState(lecturersMock);


    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        fetch(`http://localhost:8080/api/course/${id}`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.error(error));
    }

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;

        const items = Array.from(lecturers);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateLecturers(items);
    }

    const sortLecturersByGrades = (gradeType: string) => {
        let sortedArray = [...lecturers];

        switch (gradeType) {
            case 'first':
                sortedArray.sort((a, b) => b.firstGrade - a.firstGrade);
                break;
            case 'second':
                sortedArray.sort((a, b) => b.secondGrade - a.secondGrade);
                break;
            case 'third':
                sortedArray.sort((a, b) => b.thirdGrade - a.thirdGrade);
                break;
            case 'fourth':
                sortedArray.sort((a, b) => b.fourthGrade - a.fourthGrade);
                break;
            default:
                break;
        }

        updateLecturers(sortedArray);
    };

    return (
        <div
            style={{padding: '1em 2em', paddingBottom: '4em', display: 'flex', flexDirection: 'column', gap: '0.15em'}}>
            <Button
                variant="contained"
                style={{position: "fixed", bottom: "20px", right: "20px"}}
                onClick={() => {
                    window.scrollTo(0, 0)
                }}
            >Powrót do góry</Button>
            <Card
                style={{boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.32), 0px 1px 1px 0px rgba(0,0,0,0.32), 0px 1px 3px 0px rgba(0,0,0,0.28)"}}>
                <CardContent>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div>
                            <h1 className={`${classes.red}`}
                                style={{fontWeight: 'bold', marginBottom: "0px"}}>{course?.name} | {course?.code}</h1>
                            <h3 className={`${classes.red}`}
                                style={{fontWeight: 'bold', margin: "0"}}>{course?.major}</h3>
                        </div>
                        <Button
                            onClick={() => navigate(`/courses/${id}/attachments`)}
                            variant="contained"
                            startIcon={<AttachFileIcon/>}>
                            Pliki
                        </Button>
                    </div>
                    <p>{course?.description}</p>
                </CardContent>
            </Card>
            <div>
                <div className={`${classes.gridButtons}`}>
                    <h3 style={{marginBottom: "0"}}>Sortuj po ...</h3>
                    <Button  variant="outlined" style={{height: "45px", width: "100px", fontSize: "0.65em"}} onClick={() => sortLecturersByGrades('first')}>Trudność zdania</Button>
                    <Button  variant="outlined" style={{height: "45px", width: "50px", fontSize: "0.65em"}} onClick={() => sortLecturersByGrades('second')}>Wiedza</Button>
                    <Button  variant="outlined" style={{height: "45px", width: "150px", fontSize: "0.65em"}} onClick={() => sortLecturersByGrades('third')}>Komunikatywność</Button>
                    <Button  variant="outlined" style={{height: "45px", width: "150px", fontSize: "0.65em"}} onClick={() => sortLecturersByGrades('fourth')}>Podejście do studenta</Button>
                    <span/>
                </div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}
                                style={{listStyleType: "none", padding: "0 2em"}}>
                                {lecturers.map(({
                                                    id,
                                                    name,
                                                    firstGrade,
                                                    secondGrade,
                                                    thirdGrade,
                                                    fourthGrade
                                                }, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                    className={`${classes.gridLecturers} ${classes.cardLook}`}>
                                                    <h2 className={`${classes.red}`}>{name}</h2>
                                                    <h3 className={`${classes.opinion}`}>{firstGrade}</h3>
                                                    <h3 className={`${classes.opinion}`}>{secondGrade}</h3>
                                                    <h3 className={`${classes.opinion}`}>{thirdGrade}</h3>
                                                    <h3 className={`${classes.opinion}`}>{fourthGrade}</h3>
                                                    <div>
                                                        <IconButton aria-label="delete" size="large" color="primary"
                                                                    onClick={() => navigate(`/lecturer/${id}`)}
                                                                    style={{paddingBottom: "15px"}}>
                                                            <OpenInNewIcon/>
                                                        </IconButton>
                                                    </div>
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};