import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage";
import GamePage from "./GamePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;