const parent = document.querySelector(".topology");
const blockButtons = document.querySelector(".buttons__field");
const countField = document.querySelector(".count__result-number");
const countFieldSpan = document.querySelector(".count__result-number span");
const btnClear = document.querySelector("#clear");
const span = document.createElement("span");
const colors = ["#392129", "#86534e", "#c9c2b2", "#d7c770", "#af323b"];
const matrix = generateMatrix(colors.length, colors.length, );
let countClick = 0;
let countResult = 0;
let result = 0;

createTable(parent, 6, 6);
initialPaintingTable(parent, colors);
createButton(blockButtons, colors);

const table = document.querySelector("table");
const trs = table.querySelectorAll("tr");
const countBlock = document.querySelector(".count");
const buttons = document.querySelectorAll("button");

// trs.forEach((tr, y) => {
//   const row = [];
//   const tds = tr.querySelectorAll("td");
//   tds.forEach((td, x) => {
//     const color = td.style.backgroundColor;
//     row.push({ [color]: false });
//   });
//   matrix.push(row);
// });



buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    countClick += 1;
    const previous = Object.keys(matrix[0][0])[0];
    const btnColor = btn.style.backgroundColor;
    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (previous === btnColor) {
          return;
        }
        if (y === 0 && x === 0) matrix[y][x] = { [btnColor]: true };
        changeElement(matrix, y, x - 1, previous, cell, btnColor, y, x);
        changeElement(matrix, y, x + 1, previous, cell, btnColor, y, x);
        changeElement(matrix, y - 1, x, previous, cell, btnColor, y, x);
        changeElement(matrix, y + 1, x, previous, cell, btnColor, y, x);
        Object.values(matrix[y][x])[0] && (countResult += 1);
      });
    });
    setView(matrix, trs);
    countFieldSpan.remove();
    countField.append(span);
    span.textContent = countClick;
    if (getResultCount(result) === 35) {
      buttons.forEach(
        (btn) => btn.classList.contains("color") && (btn.disabled = true)
      );
      btnClear.classList.remove("hide");
    }
  });
});

btnClear.addEventListener("click", () => {
  btnClear.classList.add("hide");
  initialPaintingTable(parent, colors);
  matrix.splice(0);
  trs.forEach((tr, y) => {
    const row = [];
    const tds = tr.querySelectorAll("td");
    tds.forEach((td, x) => {
      const color = td.style.backgroundColor;
      row.push({ [color]: false });
    });
    matrix.push(row);
  });
  countClick = 0;
  result = 0;
  countFieldSpan.remove();
  countField.append(span);
  span.textContent = countClick;
  buttons.forEach(
    (btn) => btn.classList.contains("color") && (btn.disabled = false)
  );
});

function getResultCount(res) {
  let previous, current;
  trs.forEach((tr, y) => {
    const tds = tr.querySelectorAll("td");
    tds.forEach((td, x) => {
      current = td.style.backgroundColor;
      if (current === previous) res += 1;
      previous = current;
    });
  });
  result = 0;
  return res;
}

function getColor() {
  return this.style.backgroundColor;
}

function createTable(parent, row, col) {
  const table = document.createElement("table");
  for (let i = 0; i < row; i++) {
    const tr = document.createElement("tr");
    for (let i = 0; i < col; i++) {
      const td = document.createElement("td");
      tr.append(td);
    }
    table.append(tr);
  }
  parent.append(table);
}

function createButton(parent, colorList) {
  for (i = 0; i < colorList.length; i++) {
    const button = document.createElement("button");
    button.setAttribute.color = colorList[i];
    button.style.backgroundColor = colorList[i];
    button.classList.add("color");
    parent.append(button);
  }
}

function initialPaintingTable(table, arr) {
  const trs = table.querySelectorAll("tr");
  trs.forEach((tr, x) => {
    tr.querySelectorAll("td").forEach((td) => {
      td.style.backgroundColor =
        arr[getRandomIntInclusive(0, colors.length - 1)];
    });
  });
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setView(arr, row) {
  row.forEach((tr, y) => {
    const tds = tr.querySelectorAll("td");
    tds.forEach((td, x) => {
      td.style.backgroundColor = Object.keys(arr[y][x])[0];
    });
  });
}

function generateMatrix (row, col, callBack) {
  const matrix = [];
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      matrix[y][x] = callBack
    }
  }
  return matrix
}

// function changeElement(arr, y, x, prevValue, cell, newColor, modY, modX) {
//   if (
//     arr[y] !== undefined &&
//     arr[y][x] !== undefined &&
//     Object.keys(cell)[0] === prevValue &&
//     Object.keys(arr[y][x])[0] === newColor &&
//     Object.values(arr[y][x])[0]
//   ) {
//     arr[modY][modX] = { [newColor]: true };
//   }
//   return arr;
// }
