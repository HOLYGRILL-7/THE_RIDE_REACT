import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import StudentInterface from "./Components/StudentInterface";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<StudentInterface />} />  */}
        {/* setting base path to student just for testing purposes,set back to home afterwards  */}
        <Route path="/student-interface" element={<StudentInterface />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
