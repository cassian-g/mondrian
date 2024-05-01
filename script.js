let allColors = ["red", "blue", "yellow", "white"];

let totalCells;
let rowCells;

const generatePainting = (row) => {
  totalCells = row * row;
  rowCells = row;
  let size;
  if (row === 4) {
    size = 'small'
  } else if (row === 6) {
    size = 'medium'
  } else if (row === 8) {
    size = 'large'
  }
  generateGrid(size);
}

const painting = document.getElementById("painting");
const cells = []; 

const generateGrid = (size) => {
  painting.innerHTML = '';
  cells.length = 0;

  painting.classList.remove('small', 'medium', 'large');
  
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    let filteredColors = allColors;
    if (i === rowCells) {
      filteredColors = allColors.filter((col) => col !== cells[i - (rowCells - 1)].color);
    } else if (i > rowCells) {
      filteredColors = allColors.filter(
        (col) => col !== cells[i - (rowCells + 1)].color && col !== cells[i - (rowCells - 1)].color
      );
    }
    color = filteredColors[Math.floor(Math.random() * filteredColors.length)];
    cell.classList.add("cell", color);
    painting.classList.add(size); // Add size class to adjust grid size
    painting.appendChild(cell);
    cells.push({ element: cell, color: color });
  }

  applyBorderClasses();
}

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

generatePainting(8);

const updateColor = (val, col) => {
  allColors = allColors.filter(color => color != col);
  for (let i=0; i<val; i++) {
    allColors.push(col);
  }
  generatePainting(rowCells);
}
