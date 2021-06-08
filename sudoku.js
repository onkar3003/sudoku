// empty puzzle as 2D array 
const emptyPuzzle = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function checkIsValidBoardInput(input) {
  let dataSet = new Set();
  let len = input.length;
  let isValidSudoku = true;
  let message = '';

  for (let row = 0, col = 0; col < len;) {

    if (input[row][col]) {
      let rowRule = `Row+${row}+Value+${input[row][col]}`;

      if (dataSet.has(rowRule)) {
        isValidSudoku = false;
        message = `Invalid Sudoku Input, Rule has been broken at Row ${row+1}, Col ${col+1}`;
        break;
      } else {
        dataSet.add(rowRule);
      }

      let colRule = `Col+${col}+Value+${input[row][col]}`;

      if (dataSet.has(colRule)) {
        isValidSudoku = false;
        message = `Invalid Sudoku Input, Rule has been broken at Col ${col+1}, Row ${row+1}`;
        break;
      } else {
        dataSet.add(colRule);
      }

      let boxNumber = parseInt(row / 3) * 3 + parseInt(col / 3);
      let boxRule = `Box+${boxNumber}+Value+${input[row][col]}`;

      if (dataSet.has(boxRule)) {
        isValidSudoku = false;
        message = `Invalid Sudoku Input, Rule has been broken at Box ${boxNumber+1}`;
        break;
      } else {
        dataSet.add(boxRule)
      }
    }

    if (col === len - 1 && row !== len - 1) {
      row++;
      col = 0;
    } else {
      col++
    }
  }

  return { isValidSudoku, message }
}

function checkValidPlacement(input, col, row, n) {
  //checking row and columns
  for (let i = 0; i < 9; i++) {
    if (input[col][i] === n || input[i][row] === n) {
      return false;
    }
  }
  const rowOfSubGrid = Math.floor(row / 3) * 3;
  const colOfSubGrid = Math.floor(col / 3) * 3;

  //checking 3x3 sqaure 
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (input[colOfSubGrid + i][rowOfSubGrid + j] === n) {
        return false;
      }
    }
  }

  return true;
}

function solveSudoku(input) {
  for (let col = 0; col < 9; col++) {
    for (let row = 0; row < 9; row++) {
      if (input[col][row] === 0) {
        for (let n = 1; n <= 9; n++) {
          if (checkValidPlacement(input, col, row, n)) {
            input[col][row] = n;
            if (solveSudoku(input)) return input;
          }
        }
        input[col][row] = 0;
        return false;
      }
    }
  }

  return input;
}

function bindPuzzleToHTML() {
  let output = solveSudoku(emptyPuzzle)
  let i = 0;
  output.forEach((element, index) => {
    element.forEach(value => {
      document.getElementById("cell-" + i).value = value;
      i++;
    })
  });
}

function loadDefaultPuzzle(output = emptyPuzzle) {
  let i = 0;
  output.forEach((element, index) => {
    element.forEach(value => {
      document.getElementById("cell-" + i).value = value ? value : '';
      document.getElementById("cell-" + i).readOnly = true;
      i++;
    })
  });
}

function addCustomInput(output = emptyPuzzle) {
  let i = 0;
  output.forEach((element, index) => {
    element.forEach(value => {
      document.getElementById("cell-" + i).value = value ? value : '';
      document.getElementById("cell-" + i).readOnly = false;
      i++;
    })
  });
}

function updatePuzzle() {
  let table = document.getElementById('grid');
  let rowLength = table.rows.length;

  for (i = 0; i < rowLength; i++) {
    var inputs = table.rows.item(i).getElementsByTagName("input");
    var colLength = inputs.length;

    for (var j = 0; j < colLength; j++) {
      var inputval = inputs[j].value;
      emptyPuzzle[i][j] = inputval ? parseInt(inputval) : 0;
    }
  }

  let isValid =  checkIsValidBoardInput(emptyPuzzle)
  if (isValid.isValidSudoku) {
    alert(`Your input has been submiited successfully!!!`)
    loadDefaultPuzzle(emptyPuzzle)
  } else {
    alert(`${isValid.message}. Please refil the input`)
    clearPuzzle()
  }
}

function clearPuzzle() {
  for (i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      emptyPuzzle[i][j] = 0;
    }
  }
  loadDefaultPuzzle(emptyPuzzle)
}

function randomInputGenerator(randomPuzzle = emptyPuzzle) {
  for (let index = 0; index < 17; index++) {
    var randRowIndex = Math.floor(Math.random() * 8);
    var randColIndex = Math.floor(Math.random() * 8);
    var randNumber = Math.floor(Math.random() * 9);

    if (checkValidPlacement(randomPuzzle, randColIndex, randRowIndex, randNumber)) {
      randomPuzzle[randColIndex][randRowIndex] = randNumber;
    }

  }
  loadDefaultPuzzle(randomPuzzle)
}
