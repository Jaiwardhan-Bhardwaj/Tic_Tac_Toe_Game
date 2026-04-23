let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetButton");
let newBtn = document.querySelector("#newButton");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let turnO = true;// playerX,playerO 
let count = 0;
const winPatterns = [
    [0, 1, 2], //row 1
    [3, 4, 5], //row 2
    [6, 7, 8], //row 3
    [0, 3, 6], //col 1
    [1, 4, 7], //col 2
    [2, 5, 8], //col 3
    [0, 4, 8],//diag 1
    [2, 4, 6] //diag 2
];

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const resetgame = () => {
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
    flag=0;
    turnO=true;
}
newBtn.addEventListener("click", resetgame);
resetBtn.addEventListener("click", resetgame);

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const showWinner = (pos1val) => {
    disableBoxes();
    msg.innerText = `Congratulations, Winner is ${pos1val}`;
    msgContainer.classList.remove("hide");
}
const drawGame = () => {
    msg.innerText = `Game was a Draw!`;
    msgContainer.classList.remove("hide");
}
const checkWinner = (count) => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val == pos2val && pos2val == pos3val) {
                showWinner(pos1val);
                return;
            }
        }
    }
    if (count == 9) {
        drawGame();
    }
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO == true) {
            box.innerText = "O";
            box.style.color = "#04724D";
            turnO = false;

        }
        else {
            box.innerText = "X";
            turnO = true;
            box.style.color = "#b0413e";
        }
        box.disabled = true;
        count++;
        checkWinner(count);
    });
});
