import {
  Routes,
  Route,
} from 'react-router-dom'
import DevTools from '@/containers/DevTools'
import HomePage from '@/pages/home'

const Root = () => (
  <>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
    <DevTools />
  </>
)

export default Root
