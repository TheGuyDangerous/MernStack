// App.js
import React from 'react';
import QRCodeGenerator from './QRCodeGenerator';

const App = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 p-4">
      <QRCodeGenerator />
    </div>
  );
};

export default App;
