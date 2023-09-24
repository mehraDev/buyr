import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, Seller } from "app/pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:sellerUserId" element={<Seller />} />
        <Route path="/:sellerUserId/menu" element={<Seller />} />
      </Routes>
    </Router>
  );
}

export default App;
