const parent = document.querySelector(".topology");
const blockButtons = document.querySelector(".buttons__field");
const countField = document.querySelector(".count__result-number");
const countFieldSpan = document.querySelector(".count__result-number span");
const btnClear = document.querySelector("#clear");
const span = document.createElement("span");
const colors = ["rgb(57, 33, 41)", "rgb(134, 83, 78)", "rgb(201, 194, 178)", "rgb(215, 199, 112)", "rgb(175, 50, 59)"];
let matrix = generateMatrix(6, 6, getRandomColor);
let countClick = 0;
let countResult = 0;
let result = 0;

createTable(parent, 6, 6);
createButton(blockButtons, colors);

const table = document.querySelector("table");
const trs = table.querySelectorAll("tr");
const countBlock = document.querySelector(".count");
const buttons = document.querySelectorAll("button");

setView(matrix, trs);

let mask = generateMatrix(matrix.length, matrix[0].length, () => false);
    mask[0][0] = true;

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    countClick += 1;
    const currentColor = matrix[0][0];
    const newColor = btn.style.backgroundColor;
    matrix[0][0] = newColor;


    const getFlag = (y, x) => {
      try {
        return mask[y][x];
      } catch (err) {
        return false;
      }
    };

    let changed = true;
    while (changed) {
      changed = false;

      matrix.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (matrix[y][x] === currentColor && mask[y][x] === false) {
            const flag =
              getFlag(x + 1, y) ||
              getFlag(x - 1, y) ||
              getFlag(x, y - 1) ||
              getFlag(x, y + 1);

            if (flag) {
              mask[y][x] = true;
              changed = true;
            }
          }
        });
      });
    }

    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        matrix[y][x] = mask[y][x] ? newColor : matrix[y][x];
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
  matrix.splice(0);
  matrix = generateMatrix(6, 6, getRandomColor);
  mask = generateMatrix(matrix.length, matrix[0].length, () => false);
    mask[0][0] = true;
  setView(matrix, trs);
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

function getColor(arr) {
  return arr[getRandomIntInclusive(0, arr.length)];
}

function getRandomColor() {
  return getColor(colors);
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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function setView(arr, row) {
  row.forEach((tr, y) => {
    const tds = tr.querySelectorAll("td");
    tds.forEach((td, x) => {
      td.style.backgroundColor = arr[y][x];
    });
  });
}

function generateMatrix(rows, columns, callBack) {
  const matrix = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < columns; x++) {
      const item = callBack();
      row.push(item);
    }
    matrix.push(row);
  }
  return matrix;
}
