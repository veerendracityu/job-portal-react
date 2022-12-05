import './App.css';
import JobList from './JobList';
import JobPost from './JobPost';
import Register from './Register';
import Admin from './Admin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<JobList />}/>
      <Route path='/jobPost' element={<JobPost />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/admin' element={<Admin />}/>
    </Routes>
  </Router>
  );
}

export default App;
