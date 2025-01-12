# Molecule Visualizer

A React application that fetches compound data from PubChem, visualizes the molecule structure using Cytoscape, and displays the properties of the compound. The app allows the user to input a compound name, and dynamically retrieves and visualizes the atomic structure along with the associated properties like molecular formula, molecular weight, and IUPAC name.

### Features

- Real-time search: As you type the name of a compound, the app will query PubChem for the corresponding compound data.
- Molecule Visualization: The atoms and bonds of the molecule are displayed graphically using CytoscapeJS.
- Molecular Properties: Displays properties such as the molecular formula, molecular weight, and IUPAC name.
- Debounced Search: To improve performance, the search input is debounced, ensuring queries are only made after a brief delay.

### Next Steps: Animate the Atoms

- Apply Movement Animation to Atoms:

   - The atoms can "float" by periodically changing their positions within a defined range. You can use the cy.animate() method provided by Cytoscape to animate the nodes (atoms) to move smoothly.

- Add a Random Floating Animation:

   - Use the requestAnimationFrame or setInterval method to animate the positions of the atoms in the useEffect hook.

- Cytoscape Animation API:
   - Cytoscape provides a way to animate properties like position, color, size, etc. You can animate the position of atoms to create a floating effect.
