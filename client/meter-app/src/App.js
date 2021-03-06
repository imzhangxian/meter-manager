import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar"
import Menubar from "./components/Menubar"
import SignIn from "./components/SignIn";
import MeterDetails from './components/MeterDetails'
import TaskDetails from './components/TaskDetails'

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  return (
    <div className="container text-sm mx-auto font-sans">
    <AuthContext.Provider value={ { user, setUser } }>
      <Router>
      <Navbar />
      <Routes>
        <Route path='/signin' element={ <SignIn /> } />
        <Route path='/meterdetails/:meterid' element={user ? <MeterDetails /> : <Navigate to='/signin' /> } />
        <Route path='/taskdetails/:taskid' element={user ? <TaskDetails /> : <Navigate to='/signin' /> } />
        <Route path='/home/:selected' element={user ? <Menubar /> : <Navigate to='/signin' /> } />
        <Route path='/' element={<Navigate to='/home/meter' /> } />
      </Routes>
      </Router>
    </AuthContext.Provider>
    </div>
  );
}

export default App;
