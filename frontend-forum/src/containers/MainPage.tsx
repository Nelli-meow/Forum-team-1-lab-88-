
import { useAppSelector } from '../app/hooks.ts';
import { Box } from '@mui/material';
import { selectUser } from '../features/users/UsersSlice.ts';
import Header from '../components/Header/Header.tsx';

const MainPage = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Header/>
      <Box sx={{ flexGrow: 1 }}>
        {
          user ? <p>ЕСЛИ ЮЗЕР ЕСТЬ ТО СЮДА УЖЕ КОМПОНЕНТ С ПОСТАМИ ЙОУ ДА</p> :<p className="text-center my-5">Login or create an account :)</p>
        }
      </Box>
    </>
  );
};

export default MainPage;