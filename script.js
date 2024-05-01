const allColors = ["red", "blue", "yellow", "white", "white", "white", "white"]; // Primary colors and white

// Generate random colors for each cell
const painting = document.getElementById("painting");
const cells = []; // Array to store cell elements
for (let i = 0; i < 64; i++) {
  // 8 rows * 8 columns = 64 cells

  const cell = document.createElement("div");

  let filteredColors = allColors;
  if (i === 8) {
    filteredColors = allColors.filter((col) => col !== cells[i - 7].color);
  } else if (i >= 9) {
    filteredColors = allColors.filter(
      (col) => col !== cells[i - 9].color && col !== cells[i - 7].color
    );
  }
  color = filteredColors[Math.floor(Math.random() * filteredColors.length)];

  cell.classList.add("cell", color);
  painting.appendChild(cell);
  cells.push({ element: cell, color: color });
}

// Add border styles for adjacent cells with same color
cells.forEach((currentCell, i) => {
  const { element, color } = currentCell;
  const topCell = cells[i - 8];
  const bottomCell = cells[i + 8];
  const leftCell = cells[i - 1];
  const rightCell = cells[i + 1];

  if (topCell && topCell.color !== color) {
    element.classList.add("top");
  }
  if (bottomCell && bottomCell.color !== color) {
    element.classList.add("bottom");
  }
  if (leftCell && leftCell.color !== color) {
    element.classList.add("left");
  }
  if (rightCell && rightCell.color !== color) {
    element.classList.add("right");
  }
});
