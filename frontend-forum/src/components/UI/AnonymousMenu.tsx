import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const AnonymousMenu = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        component={Link}
        to="/register"
        variant="contained"
        sx={{
          backgroundColor: 'lightcyan',
          color: 'black',
          '&:hover': {
            backgroundColor: 'lightgray',
          },
        }}
      >
        Sign Up
      </Button>
      <Button
        component={Link}
        to="/login"
        variant="outlined"
        sx={{
          backgroundColor: 'lightcyan',
          color: 'black',
          '&:hover': {
            backgroundColor: 'lightgray',
          },
        }}
      >
        Sign In
      </Button>
    </Stack>
  );
};

export default AnonymousMenu;
