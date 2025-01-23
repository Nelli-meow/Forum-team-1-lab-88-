import { Route, Routes } from 'react-router-dom';
import MainPage from './containers/MainPage.tsx';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import './App.css';
import { Typography } from '@mui/material';
import PostContainer from './containers/PostContainer.tsx';
import Layout from './components/Layout/Layout.tsx';
import AddNewPost from './containers/AddNewPost.tsx';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/posts/:id" element={<PostContainer/>}/>
        <Route path="/posts/addNewPost" element={<AddNewPost/>}/>
        <Route path="*" element={<Typography variant="body1" sx={{width: '100%', fontSize: '80px', color: 'white', marginTop: '15%', textAlign: 'center'}}>Page is not found!</Typography>}/>
      </Routes>
    </Layout>
  );
};

export default App;
