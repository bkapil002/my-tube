import { Outlet } from 'react-router-dom'
import Navebar from './components/Navebar'


function App() {


  return (
    <>
      <Navebar/>
      <Outlet/>
    </>
  )
}

export default App
