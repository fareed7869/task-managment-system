import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetail from './pages/TaskDetail';
import AddTask from './pages/AddTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/addTask" element={<AddTask />} />
      </Routes>
    </Router>
  );
}

export default App;
