import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetail from './pages/TaskDetail';
import AddTask from './pages/AddTask';
import UpdateTask from './pages/UpdateTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/updateTask/:id" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
}

export default App;
