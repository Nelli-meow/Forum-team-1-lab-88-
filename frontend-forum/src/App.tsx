import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<p>Page is not  found</p>} />
      </Routes>
    </>
  );
};

export default App;
