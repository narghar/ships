class Field {
  constructor(type) {
      this.type = type;
      this.isHited = false;
  }
}

const createEmptyBoard = () => {
  const board = new Array(10);
  for (let i = 0; i < board.length; i++) {
      board[i] = new Array(10);
  }
  return board;
}
function checkIfSuitsRows(init, board, masts) {
  if (init.row >= 1) { if (typeof board[init.row-1][init.col] !== 'undefined' && typeof board[init.row-1][init.col] === 'ship') { return false; }; }
  if (init.row + masts <= 9) { if (typeof board[init.row+masts][init.col] !== 'undefined' && typeof board[init.row+masts][init.col] === 'ship') { return false; }; }
  for (let i = init.row; i < init.row + masts; i++) {
      if ( typeof board[i][init.col] !== 'undefined') {
          return false;
      }
  }
  return true;
}

function checkIfSuitsCols(init, board, masts) {
  if (init.col >= 1) { if (typeof board[init.row][init.col-1] !== 'undefined' && typeof board[init.row][init.col-1] === 'ship') { return false; }; }
  if (init.col + masts <= 9) { if (typeof board[init.row][init.col+masts] !== 'undefined' && typeof board[init.row][init.col+masts] === 'ship') { return false; }; }
  for (let i = init.col; i < init.col + masts; i++) {
      if ( typeof board[init.row][i] !== 'undefined') {
          return false;
      }
  }
  return true;
}


function validateInput(inputData) {
  let col;
  let row;
  if (inputData.length > 2) {
      return false;
  }
  if (parseInt(inputData[1]) <= 9) {
      switch (inputData[0].toUpperCase()) {
          case 'A':   col = parseInt(inputData[1]);
                      row = 0;
                      break;
          case 'B':   col = parseInt(inputData[1]);
                      row = 1;
                      break;
          case 'C':   col = parseInt(inputData[1]);
                      row = 2;
                      break;
          case 'D':   col = parseInt(inputData[1]);
                      row = 3;
                      break;
          case 'E':   col = parseInt(inputData[1]);
                      row = 4;
                      break;
          case 'F':   col = parseInt(inputData[1]);
                      row = 5;
                      break;
          case 'G':   col = parseInt(inputData[1]);
                      row = 6;
                      break;
          case 'H':   col = parseInt(inputData[1]);
                      row = 7;
                      break;
          case 'I':   col = parseInt(inputData[1]);
                      row = 8;
                      break;
          case 'J':   col = parseInt(inputData[1]);
                      row = 9
                      break;
          default: return false;
          }
  } else {
      return false;
  }
  return {col, row}
}



var dragged;

  /* events fired on the draggable target */
  document.addEventListener("drag", function( event ) {

  }, false);

  document.addEventListener("dragstart", function( event ) {
      // store a ref. on the dragged elem
      dragged = event.target;

      // make it half transparent
      event.target.style.opacity = .5;
  }, false);

  document.addEventListener("dragend", function( event ) {
      // reset the transparency
      event.target.style.opacity = "";
  }, false);

  /* events fired on the drop targets */
  document.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      event.preventDefault();
  }, false);

  document.addEventListener("dragenter", function( event ) {
      // highlight potential drop target when the draggable element enters it
      let masts = 1;  /* Test */
      let init = validateInput(event.target.id);
      if(checkIfSuitsCols(init, userBoard, masts) === false){
        event.target.style.backgroundColor = 'red';
      } else if ( event.target.className == "board-field" ) {
          event.target.style.background = "green";


      }
  }, false);

  document.addEventListener("dragleave", function( event ) {
      // reset background of potential drop target when the draggable element leaves it
      event.target.style.background = "";

  }, false);

  document.addEventListener("drop", function( event ) {
      // prevent default action (open as link for some elements)
      event.preventDefault();

      // move dragged elem to the selected drop target
      let masts = 1; /* Test */
      let init = validateInput(event.target.id);
      if ( event.target.className == "board-field" ) {
          event.target.style.background = "";
          dragged.classList.add('absolute');
          dragged.parentNode.removeChild( dragged );
          event.target.appendChild( dragged );
          userSetShip(masts, userBoard, init, 0); /* Test */
          dragged.setAttribute.dragged = 'false';

          console.log(validateInput(event.target.id));
          console.log(userBoard);
      }

  }, false);

  let userBoard = createEmptyBoard();

  function userSetShip(masts, board, init, direction) {
    const range = {
        rowStart: 0,
        rowEnd: 10,
        colStart: 0,
        colEnd: 10,
    }

        range.rowEnd = range.rowEnd - masts + 1;

            if (init.col >= 1) { board[init.row][init.col-1] = new Field('mishit'); }
            if (init.col + masts <= 9) { board[init.row][init.col+masts] = new Field('mishit'); }
            for (let i = init.col; i < init.col + masts; i++) {
                board[init.row][i] = new Field('ship');
                if (init.row-1 >= 0) { board[init.row-1][i] = new Field('mishit') };
                if (init.row+1 <= 9) { board[init.row+1][i] = new Field('mishit') };
            }

    }
