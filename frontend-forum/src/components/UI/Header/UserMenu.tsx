import { Button, Menu, MenuItem } from '@mui/material';
import { IUser } from '../../../types';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { unsetUser } from '../../../features/users/UsersSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import {logout} from '../../../features/users/UsersThunk.ts';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
    navigate('/');
  };

  return user && (
    <>
      <Button
        onClick={handleClick}
        color="inherit">
        Hello, {user.username}!
      </Button>
      <Button variant="outlined" color={'inherit'} to={'/posts/addNewPost'} component={NavLink} sx={{margin: '0 20px'}}>Add new post</Button>
      <Button variant="outlined" color={'inherit'} onClick={handleLogout}>Logout</Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;