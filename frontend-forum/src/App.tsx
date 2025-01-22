import { Route, Routes } from 'react-router-dom';
import MainPage from './containers/MainPage.tsx';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="*" element={<p>Page is not  found</p>} />
      </Routes>
    </>
  );
};

export default App;
