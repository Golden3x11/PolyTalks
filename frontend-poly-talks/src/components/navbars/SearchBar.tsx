import { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router';

const useStyles = makeStyles()({
  search: {
    width: "30%",
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
  }
});

export const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("")
  const { classes } = useStyles(undefined, undefined);
  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate(`/search/${searchText}`);
  }

  return (
      <TextField
        id="search"
        type="search"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className={classes.search}
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