import React from 'react';
import { Route, Routes } from "react-router-dom";
import { HomePage  as Home} from './pages/Home/Home';


export default function App() {
   return (
      <Routes basename={process.env.PUBLIC_URL}>
      <Route path="/" element={<Home />} />
      <Route path="/heatmap-matrix" element={<Home />} />
    </Routes>
   );
}