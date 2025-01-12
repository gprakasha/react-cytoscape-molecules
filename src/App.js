import React from 'react';
import { MoleculeVisualizer } from './components/MoleculeViewer';

function App() {

  return (
    <div className="App">
      <h1>Search chemical to render it's structure</h1>
      <MoleculeVisualizer />
    </div>
  );
}

export default App;
