const table = document.querySelector("table");
const numRows = 24;
const numCols = 24;

function toggleWithDelay(cell, delay) {
  setTimeout(() => {
    cell.classList.toggle("active");
  }, delay);
}

function toggleSurroundingCells(x, y, numRows, numCols, delay) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  directions.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
      const cell = table.rows[newX].cells[newY];
      toggleWithDelay(cell, delay);
    }
  });
}

for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    const cell = table.rows[i].cells[j];
    cell.addEventListener("click", function() {
      toggleWithDelay(this, 0);
      toggleSurroundingCells(i, j, numRows, numCols, 200);
    });
  }
}
