import React from 'react';
import Header from './component/Header';
import Main from './component/Main';
import Picture from './component/Picture';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
      <div className="border border-blue-300 bg-gray-500 max-w-4xl mx-auto rounded-sm mt-20 ml-92">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/picture/:id" element={<Picture />} />
        </Routes>
      </div>
  );
}

export default App;
