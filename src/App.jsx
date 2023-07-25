import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { useContext } from "react";
import {context} from './store/store'

function App() {
  const { currentUser} = useContext(context);

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login" />
    }

    return <>
    {children}
    </>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}


export default App;
