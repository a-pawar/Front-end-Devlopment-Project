var count = 0;
addRowHandlers();

// function addRowHandlers() {
//   var table = document.getElementById("tableId");
//   var rows = table.getElementsByTagName("tr");
//   var cells = rows[0].getElementsByTagName("td");
//   for (i = 0; i < cells.length; i++) {
//     var currentCell = rows[0].cells[i];
//     var createClickHandler = function (cell) {
//       return function () {
//         var temp = cell.getElementsByTagName("td")[0];
//         var id = temp.innerHTML;
//         alert("id:" + id);
//       };
//     };
//     currentCell.onclick = createClickHandler(currentCell);
//   }
// }

function addRowHandlers() {
  var table = document.getElementById("tableId");
  var rows = table.getElementsByTagName("tr");
  var input = document.getElementById("input");

  // console.log(input);
  for (let i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var a = 0, b = 0, op = "+", c = "";

    for (let j = 0; j < cells.length; j++) {
      var currentCell = rows[i].cells[j];

      var createClickHandler = function (cell) {
        return function () {
          let button = cell.getElementsByTagName('button');
          if (count == 0) {
            a = button[0].innerHTML;
            if (a == "AC") {
              input.innerText = 0;
              count = 0;
              return;
            }
            count++;
            input.innerText = a;
            // console.log(a, count);
          }
          else if (count == 1) {
            op = button[0].innerHTML;
            if (op == "AC") {
              input.innerText = 0;
              count = 0;
              return;
            }

            count++;
            // console.log(op, count);
            input.innerText = op;
          }
          else if (count == 2) {
            b = button[0].innerHTML;
            if (b == "AC") {
              input.innerText = 0;
              count = 0;
              return;
            }

            count++;
            input.innerText = b;

            // console.log(b, count);
          } else if (count == 3) {
            count = 0;
            c = button[0].innerHTML;
            if (c == "=") {
              let str = a + "" + op + "" + b;
              if (op == "/" || op == "%" && b == 0) {
                input.innerText = "ERR";
                return;
              }
              let ans = eval(str);
              input.innerText = ans;
            }
            else {
              if (c == "AC") {
                input.innerText = 0;
                return;
              }
              input.innerText = "ERR";

            }
          }

        }
      }
      currentCell.onclick = createClickHandler(currentCell);
    }
  }
  // for (i = 0; i < rows.length; i++) {
  //   var currentRow = table.rows[i];

  //   var createClickHandler = function (row) {
  //     return function () {
  //       var cell1 = row.getElementsByTagName("td")[1];
  //       var id = cell1.innerHTML;
  //       alert("id:" + id);
  //     };
  //   };
  //   currentRow.onclick = createClickHandler(currentRow);
  // }
}
