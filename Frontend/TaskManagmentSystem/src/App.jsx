import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetail from './pages/TaskDetail';
import AddTask from './pages/AddTask';
import UpdateTask from './pages/UpdateTask';
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/updateTask/:id" element={<UpdateTask />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
