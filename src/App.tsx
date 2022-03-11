import React from 'react';
import './App.css';
import Connect2Phantom from './components/Connect2Phantom';
import Header from './components/header';
import SloganPart from './components/sloganPart';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <SloganPart/>
    </div>
  );
}

export default App;