import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, MenuHost } from "app/pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:shopId/menu" element={<MenuHost />} />
      </Routes>
    </Router>
  );
}

export default App;
