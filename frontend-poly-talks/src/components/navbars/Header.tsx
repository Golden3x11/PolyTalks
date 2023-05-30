import { AppBar } from '@mui/material';
import { UserAuthButtons } from './UserAuthButtons';
import './../../styles/navbars.css';
import { SearchBar } from './SearchBar';

export const Header = () => {
  return (
    <AppBar
      className={"appBar"}
      color={'secondary'}
      elevation={0}
    >
      <img src="/logo.svg" alt={"logo"} className={"logo"}/>
      <SearchBar/>
      <UserAuthButtons/>
    </AppBar>
  );
};