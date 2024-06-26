let allColors = ["red", "blue", "yellow", "white"];

let gridCells = 0;
let rowCells = 0;

// Function to generate the painting grid based on the specified number of rows
const generatePainting = (row) => {
  gridCells = row * row;
  rowCells = row;
  let size = '';
  if (rowCells === 4) {
    size = 'small'
  } else if (rowCells === 6) {
    size = 'medium'
  } else if (rowCells === 8) {
    size = 'large'
  }
  generateGrid(size);
}

const painting = document.getElementById("painting");
const cells = []; 

// Function to generate the painting grid with specified size
const generateGrid = (size) => {
  painting.innerHTML = '';
  cells.length = 0;
  painting.classList.remove('small', 'medium', 'large');
  
  // Loop to create cells for the grid
  for (let i = 0; i < gridCells; i++) {
    const cell = document.createElement("div");
    let filteredColors = allColors;
    if (i === rowCells) {
      filteredColors = allColors.filter((col) => col !== cells[i - (rowCells - 1)].color);
    } else if (i > rowCells) {
      filteredColors = allColors.filter(
        (col) => col !== cells[i - (rowCells + 1)].color && col !== cells[i - (rowCells - 1)].color
      );
    }
    let color = filteredColors[Math.floor(Math.random() * filteredColors.length)];
    cell.classList.add("cell", color);
    painting.classList.add(size);
    painting.appendChild(cell);
    cells.push({ element: cell, color: color });
  }

  applyBorderClasses();
}

// Function to apply border classes to cells based on neighboring colors
const applyBorderClasses = () => {
  cells.forEach((currentCell, index) => {
    const { element, color } = currentCell;
    const topCell = cells[index - rowCells];
    const bottomCell = cells[index + rowCells];
    const leftCell = cells[index - 1];
    const rightCell = cells[index + 1];
    const columnIndex = index % rowCells;
    if (topCell && topCell.color !== color) {
      element.classList.add("top");
    }
    if (bottomCell && bottomCell.color !== color) {
      element.classList.add("bottom");
    }
    if (leftCell && leftCell.color !== color && columnIndex !== 0) {
      element.classList.add("left");
    }
    if (rightCell && rightCell.color !== color && columnIndex !== rowCells - 1) {
      element.classList.add("right");
    }
  });
}

// Generate initial painting grid with 8 rows
generatePainting(8);

// Function to update color distribution
const updateColor = (val, col) => {
  allColors = allColors.filter(color => color != col);
  for (let i=0; i<val; i++) {
    allColors.push(col);
  }
  generatePainting(rowCells);
}
