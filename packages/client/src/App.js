import React from 'react';
import FileUploader from './FileUploader';
import './App.css';

function App() {
  return (
    <div className="App">
      <FileUploader text="demo" url="http://localhost:8000/upload"></FileUploader>
    </div>
  );
}

export default App;
