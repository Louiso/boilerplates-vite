import HomePage from 'pages/home';
import { Route, Routes } from 'react-router-dom';

const Root = () => (
  <>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </>
);

export default Root;
