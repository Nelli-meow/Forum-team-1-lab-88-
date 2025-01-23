import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const AnonymousMenu = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" color={'inherit'} to={'/login'} component={NavLink}>Sign In</Button>
      <Button variant="outlined" color={'inherit'} to={'/register'} component={NavLink}>Sign Up</Button>
    </Stack>
  );
};

export default AnonymousMenu;
