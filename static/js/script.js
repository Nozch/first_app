const table = document.querySelector("table");
const numRows = 24;
const numCols = 24;

function dampedOscillation(t, C, zeta, omega0, alpha) {
  const dampingFactor = -zeta * omega0 * t;
  const frequency = omega0 * Math.sqrt(1 - zeta * zeta) * t;
  return C * Math.exp(dampingFactor) * Math.cos(frequency - alpha);
}

function toggleWithDelay(cell, delay, amplitude, duration) {
  const startTime = Date.now();
  const initialOpacity = cell.style.opacity || 1;

  function step() {
    const elapsed = Date.now() - startTime;
    const t = elapsed / duration;
    const opacity = dampedOscillation(t, amplitude, 0.1, 10, 0);
    cell.style.opacity = parseFloat(initialOpacity) + opacity;

    if (elapsed < duration) {
      requestAnimationFrame(step);
    } else {
      cell.style.opacity = initialOpacity;
    }
  }

  setTimeout(() => {
    requestAnimationFrame(step);
  }, delay);
}

function toggleSurroundingCells(x, y, numRows, numCols, delay) {
  const amplitude = 0.5;
  const duration = 1000;
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
      toggleWithDelay(this, 0, 1, 1000);
      toggleSurroundingCells(i, j, numRows, numCols, 200);
    });
  }
}
