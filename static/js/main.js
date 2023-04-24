// グリッドを生成する
const grid = document.getElementById("grid");
for (let i = 0; i < 24 * 24; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.width = "20px"; // セルの幅を設定
  cell.style.height = "20px";
  grid.appendChild(cell);
}

// セルをクリックしたときの処理を追加する
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const target = e.currentTarget;
    target.style.opacity = 1;

    // 重ね合わせの波を表現するために、他のセルの透明度を変更する
    const waveEffect = (cell, delay) => {
      setTimeout(() => {
        cell.style.opacity = 1;
        setTimeout(() => {
          cell.style.opacity = 0;
        }, 300);
      }, delay);
    };

    const index = Array.from(cells).indexOf(target);
    const x = index % 24;
    const y = Math.floor(index / 24);

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const cx = i % 24;
      const cy = Math.floor(i / 24);

      const distance = Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - y, 2));

      // 波の速度（セル/秒）
      const waveSpeed = 5;

      // セルに対して遅延を計算する
      const delay = distance / waveSpeed * 1000;

      // セルの透明度を変更する
      waveEffect(cell, delay);
    }
  });
});

