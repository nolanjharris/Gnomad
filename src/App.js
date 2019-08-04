import React from 'react';
import './reset.scss';
import './App.scss';
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Map />
    </div>
  );
}

export default App;
