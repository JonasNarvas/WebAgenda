import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContatoList from './ContatoList';
import ContatoForm from './ContatoForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={<ContatoList />} />
          <Route path="/novo" element={<ContatoForm />} />
          <Route path="/editar/:id" element={<ContatoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
