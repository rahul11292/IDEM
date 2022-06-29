
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import './NavBar.scss'
import IdemLogo from "../Common/IdemLogo";
import { Avatar, Menu, MenuItem } from "@mui/material";
import SearchInputMain from "../Common/SearchInputMain/SearchInputMain";
import {Notifications, PowerSettingsNew} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import { loggedOut } from "../Authentication/AuthenticationSlice";


type NavBarOptions = {
  id: number;
  path: string;
  label: string;
};

const initialState: NavBarOptions[] = [
  { id: 1, path: "allcard", label: "All cards" },
  { id: 2, path: "mycards", label: "My cards" },
  { id: 3, path: "holder", label: "My holder" },
  { id: 4, path: "sharedwith", label: "Shared with" },
];
export default function NavBar() {
  const navigate = useNavigate();
  const path = useLocation();
  const [menuOption, setMenuOption] = useState<NavBarOptions[]>(initialState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);
  const data = useAppSelector(state => state.auth)
  function stringAvatar(name: string) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleLogOut(){
    navigate('/')
    dispatch(loggedOut(path))
  }
 
  
  return (
    <div className="navbarMain">
      <div className="logoAndOption">
      <IdemLogo size="2.6em" />
        <div className="navMenu">
          <ul className="navbar-elements">
            {menuOption.map((item) => {
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  style={{fontSize:"14px", opacity:"0.9"}}
                >{item.label}</NavLink>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="searchAndProfile">
        <SearchInputMain/>
        <button className="userDetails" onClick={handleClick}>
                <Avatar {...stringAvatar('Test User')} sx={{ fontSize: 14 ,width: 35, height: 35, backgroundColor: "#2F8968" }}/>
          </button>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Notifications color="action" sx={{ fontSize: 20, marginRight:1}}/>Notification</MenuItem>
        <MenuItem onClick={()=>handleLogOut()}><PowerSettingsNew color="action" sx={{ fontSize: 20, marginRight:1  }}/>Logout</MenuItem>
      </Menu>
      </div>
    </div>
  );
}
