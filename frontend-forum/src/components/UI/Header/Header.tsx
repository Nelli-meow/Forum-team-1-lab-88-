import { Link } from 'react-router-dom';
import {selectUser} from '../../../features/users/UsersSlice.ts';
import { useAppSelector} from '../../../app/hooks.ts';
import { Box, AppBar, Typography, Toolbar, Container } from '@mui/material';
import AnonymousMenu from './AnonymousMenu.tsx';
import UserMenu from './UserMenu.tsx';

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 5, backgroundColor: 'rgba(95,97,97,0.96)'}}>
        <Container>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography component={Link} to="/" variant="h4" sx={{color: 'inherit', textDecoration: 'none',}}>Forum</Typography>
            <Box>
              {user ? <UserMenu user={user} /> : <AnonymousMenu/>}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;