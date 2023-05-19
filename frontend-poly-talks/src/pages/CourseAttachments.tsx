import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    useTheme
} from "@mui/material";
import React from "react";
import {useParams} from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {FileUploadComponent} from "../components/Attachments/FileUploadComponent";
import {AttachmentDto} from "../dto/attachment.dto";
import {FileDownload} from "../components/Attachments/FileDownload";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';


interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
}

export const CourseAttachments = () => {
    const [attachments, setAttachments] = React.useState<AttachmentDto[] | null>(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const {id} = useParams();

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        fetch(`http://localhost:8080/api/course/${id}/attachments`)
            .then(response => response.json())
            .then(data => setAttachments(data))
            .catch(error => console.error(error));
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (attachments?.length ?? 0)) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const dateToLocale = (date: Date) => {
        return new Date(date).toLocaleString();
    }

    const handleFileUpload = () => {
        fetchData();
    };

    return (
        <div style={{
            padding: '1em 2em',
            paddingBottom: '4em',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.15em',
            alignItems: "flex-start"
        }}>
            <Button
                href={`/courses/${id}`}
                variant="contained"
                startIcon={<ArrowBackIcon/>}>
                Powrót
            </Button>
            <div style={{width: "100%", marginTop: "2em"}}>
                <TableContainer component={Paper}>
                    <Table sx={{width: "100%"}} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nazwa Pliku</TableCell>
                                <TableCell align="right">Data dodania</TableCell>
                                <TableCell align="right">Opis</TableCell>
                                <TableCell align="right">Tagi</TableCell>
                                <TableCell align="right">Pobierz</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {attachments?.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.filename}
                                    </TableCell>
                                    <TableCell align="right">{dateToLocale(row.uploadTime)}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.tags.map((tag) => (
                                        <span>
                                               {tag},
                                            </span>
                                    ))}</TableCell>
                                    <TableCell align="right"><FileDownload cid={id} aid={row._id}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                    colSpan={3}
                                    count={(attachments?.length ?? 0)}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
            <FileUploadComponent cid={id} onFileUpload={handleFileUpload}/>
        </div>
    );
};