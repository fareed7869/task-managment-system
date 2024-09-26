import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetail from './pages/TaskDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
