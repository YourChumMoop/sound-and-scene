import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {

  return (
    <div>
      <div>
      <Navbar />
      </div>
      <main className='container pt-5'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
