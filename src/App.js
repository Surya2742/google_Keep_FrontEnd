import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import SigninPage from './pages/Signin/SigninPage';
import SignupPage from './pages/Signup/SignupPage';
import Archive from './pages/Archieve/Archive';
import Trash from './pages/Trash/Trash';
import Pinned from './pages/Pinned/Pinned';

function App() {
  return (
    <Router>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/signin" element = {<SigninPage/>}/>
          <Route path = "/signup" element = {<SignupPage/>}/>
          <Route path = "/archive" element = {<Archive/>}/>
          <Route path = "/trash" element = {<Trash/>}/>
          <Route path = "/pinned" element = {<Pinned/>}/>
        </Routes>
      </Router>
  );
}

export default App;
