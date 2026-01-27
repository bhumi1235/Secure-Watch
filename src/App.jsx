import React from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
