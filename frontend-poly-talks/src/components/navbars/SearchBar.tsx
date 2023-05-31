import {useState} from 'react';
import {IconButton, InputAdornment, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {makeStyles} from 'tss-react/mui';
import {useNavigate} from 'react-router';

const useStyles = makeStyles()({});

export const SearchBar = () => {
    const [searchText, setSearchText] = useState<string>("")
    const {classes} = useStyles(undefined, undefined);
    const navigate = useNavigate();

    const navigateToSearch = () => {
        if (searchText) {
            navigate(`/search/${searchText}`);
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            navigateToSearch();
        }
    };

    return (
        <TextField
            id="search"
            type="search"
            value={searchText}
            onKeyDown={handleKeyDown}
            onChange={e => setSearchText(e.target.value)}
            size={"small"}
            placeholder={"Wyszukiwanie..."}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={navigateToSearch}>
                            <SearchIcon/>
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />

    );
};