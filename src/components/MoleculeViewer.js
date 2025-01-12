import React, { useEffect, useState, useRef } from 'react';
import { motion } from "motion/react"
import { getCompoundData } from '../api/compoundApi';  // Your API call to PubChem
import CytoscapeComponent from 'react-cytoscapejs';
import { useDebounce } from '../hooks/useDebounce';

const atomicNumberToElement = {
  1: 'H',  // Hydrogen
  2: 'He', // Helium
  3: 'Li', // Lithium
  4: 'Be', // Beryllium
  5: 'B',  // Boron
  6: 'C',  // Carbon
  7: 'N',  // Nitrogen
  8: 'O',  // Oxygen
  9: 'F',  // Fluorine
  10: 'Ne', // Neon
  // Will add more later
};

const MoleculeVisualizer = () => {
  const [compoundName, setCompoundName] = useState('');
  const [atomData, setAtomData] = useState([]);
  const [bondData, setBondData] = useState([]);
  const [properties, setProperties] = useState({
    molecularFormula: '',
    molecularWeight: '',
    iupacName: ''
  });
  const compoundSearchQuery = useDebounce({
    value: compoundName,
    delay: 500,
  });

  const fetchCompoundData = async (compoundName) => {
    try {
      const response = await getCompoundData(compoundName);
      return response.data;
    } catch (error) {
      console.error('Error fetching data from PubChem:', error);
    }
  };

  // Function to process atoms and bonds from PubChem data
  const processCompoundData = (data) => {
    const atoms = data.PC_Compounds[0].atoms;
    const bonds = data.PC_Compounds[0].bonds;
    const props = data.PC_Compounds[0].props;

    // Extracting atomic elements, basically nodes in the graph
    const atomElements = atoms.element.map((atomicNumber) => {
      return atomicNumberToElement[atomicNumber];
    });

    setAtomData(atomElements);

    // Extracting bonds (connections between atoms) in the graph
    const bondElements = bonds.aid1.map((aid1, index) => ({
      data: {
        source: `atom-${aid1}`,
        target: `atom-${bonds.aid2[index]}`,
        label: `Bond ${index + 1}`,
      },
    }));

    setBondData(bondElements);

    const molecularFormula = props.find(p => p.urn.label === 'Molecular Formula')?.value?.sval;
    const molecularWeight = props.find(p => p.urn.label === 'Molecular Weight')?.value?.sval;
    const iupacName = props.find(p => p.urn.label === 'IUPAC Name' && p.value?.sval)?.value?.sval;
    // what is urn and sval??
    // urn is a unique identifier for a property, and sval is a string value
    // For example, 'urn:pubchem:component:compound:formula' is the urn for the molecular formula property
    // and 'C6H12O6' is the sval for the molecular formula of glucose
    // The PubChem API returns data in a nested structure, so we need to extract the relevant data using the urn and sval values
    // IUPAC Name is not always available, so we need to check if it exists before extracting it
    // IUPAC Name is a systematic way of naming chemical compounds, so it's useful to display it if available (nomenclature of organic chemistr)

    setProperties({ molecularFormula, molecularWeight, iupacName });
  };

  useEffect(() => {
    if(compoundSearchQuery === '') return;
    fetchCompoundData(compoundSearchQuery).then((data) => {
      if (data) {
        processCompoundData(data);
      }
    });
  }, [compoundSearchQuery]);

  const cyStyles = [
    {
      selector: 'node',
      style: {
        'background-color': '#007bff',
        'label': 'data(label)',
        'font-size': '10px',
      },
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
      },
    },
  ];

  const cyLayout = {
    name: 'grid',
    rows: 1,
  };

  const cyElements = [
    ...atomData.map((element, index) => ({
      data: {
        id: `atom-${index + 1}`,
        label: element,
      },
      position: { x: index * 100, y: 0 },  // Simple positioning for visualization
    })),
    ...bondData,
  ];

  return (
    <div>
      <h2>Molecule Visualizer</h2>
      <motion.input type="text" value={compoundName} onChange={(e) => setCompoundName(e.target.value)} />
      <div>
        <h3>Properties:</h3>
        <ul>
          <li><strong>Formula:</strong> {properties.molecularFormula}</li>
          <li><strong>Molecular Weight:</strong> {properties.molecularWeight}</li>
          <li><strong>IUPAC Name:</strong> {properties.iupacName}</li>
        </ul>
      </div>

      <CytoscapeComponent 
      layout={{
        name: 'cose',
        animate: true,
      }}
        elements={cyElements}
        style={{ width: '600px', height: '600px' }}
        cy={(cy) => {
          cy.style(cyStyles);
          cy.layout(cyLayout).run();
        }}
      />
    </div>
  );
};

export { MoleculeVisualizer };
