import { useAppSelector } from '../app/hooks.ts';
import { Box, Typography } from '@mui/material';
import { selectUser } from '../features/users/UsersSlice.ts';
import Header from '../components/Header/Header.tsx';

const MainPage = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Header/>
      <Box sx={{ flexGrow: 1 }}>
        {
          user ? <p>ЕСЛИ ЮЗЕР ЕСТЬ ТО СЮДА УЖЕ КОМПОНЕНТ С ПОСТАМИ ЙОУ ДА</p> :<Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="body1">
              Login or create an account :)
            </Typography>
          </Box>
        }
      </Box>
    </>
  );
};

export default MainPage;