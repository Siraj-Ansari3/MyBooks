import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import ListingPage from './pages/List';
import Home from './pages/Home';
import Details from './pages/Details';
import ViewOrder from './pages/ViewOrder';
import ViewOrderDetails from './pages/ViewOrderDetails';

function App() {


  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/register' element={<Register />} />
        <Route path='/book/list' element={<ListingPage />} />
        <Route path='/book/view/:bookId' element={<Details />} />
        <Route path='/book/orders' element={<ViewOrder />} />
        <Route path='/books/orders/:bookId' element={<ViewOrderDetails />} />
      </Routes>
    </>
  )
}

export default App
