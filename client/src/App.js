import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./Join";
import Chat from "./Chat";
import "./css/style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
