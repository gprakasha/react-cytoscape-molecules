export const waterMolecule = {
    id: 'H2O',
    name: 'Water',
    formula: 'H₂O',
    atoms: [
      { id: 'O', element: 'O', position: [0, 0] },
      { id: 'H1', element: 'H', position: [1, 0] },
      { id: 'H2', element: 'H', position: [-1, 0] },
    ],
    bonds: [
      { id: 'B1', source: 'O', target: 'H1', type: 'single' },
      { id: 'B2', source: 'O', target: 'H2', type: 'single' },
    ],
  };
  
  export const methaneMolecule = {
    id: 'CH4',
    name: 'Methane',
    formula: 'CH₄',
    atoms: [
      { id: 'C', element: 'C', position: [0, 0] },
      { id: 'H1', element: 'H', position: [1, 1] },
      { id: 'H2', element: 'H', position: [-1, 1] },
      { id: 'H3', element: 'H', position: [1, -1] },
      { id: 'H4', element: 'H', position: [-1, -1] },
    ],
    bonds: [
      { id: 'B1', source: 'C', target: 'H1', type: 'single' },
      { id: 'B2', source: 'C', target: 'H2', type: 'single' },
      { id: 'B3', source: 'C', target: 'H3', type: 'single' },
      { id: 'B4', source: 'C', target: 'H4', type: 'single' },
    ],
  };
  