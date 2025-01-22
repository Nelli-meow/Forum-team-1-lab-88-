import { Link } from 'react-router-dom';
import {selectUser} from '../../features/users/UsersSlice.ts';
import { useAppSelector} from '../../app/hooks.ts';
import {Box, AppBar, Typography, Toolbar} from '@mui/material';
import AnonymousMenu from '../UI/AnonymousMenu.tsx';
import UserMenu from '../UI/UserMenu.tsx';


const Header = () => {
    const user = useAppSelector(selectUser);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="info" sx={{ mb: 5}}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        component={Link}
                        to="/"
                        variant="h6"
                        sx={{
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Forum
                    </Typography>
                    <Box>
                        {user ? <UserMenu user={user} /> : <AnonymousMenu/>}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;