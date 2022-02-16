import DevTools from 'containers/DevTools';
import HomePage from 'pages/home';
import { Route, Routes } from 'react-router-dom';

const Root = () => (
  <>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
    <DevTools />
  </>
);

export default Root;
