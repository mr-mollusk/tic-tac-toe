/* Переменные */
const titles = document.querySelectorAll(".grid__cell");
const crosses = document.querySelectorAll(".cross");
const zeroes = document.querySelectorAll(".zero");
const restartButton = document.querySelector(".btn");
const winCords = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let crossedTitles = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
};
let zeroedTitles = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
};

let isCrossesRound = true;
let isZeroesRound = false;

const winCheck = (obj) => {
    if (
        (obj[0] == true && obj[1] == true && obj[2] == true) ||
        (obj[3] == true && obj[4] == true && obj[5] == true) ||
        (obj[6] == true && obj[7] == true && obj[8] == true) ||
        (obj[0] == true && obj[3] == true && obj[6] == true) ||
        (obj[1] == true && obj[4] == true && obj[7] == true) ||
        (obj[2] == true && obj[5] == true && obj[8] == true) ||
        (obj[1] == true && obj[4] == true && obj[9] == true) ||
        (obj[2] == true && obj[4] == true && obj[6] == true)
    )
        return true;
    else return false;
};

const isDraw = () => {
    let counter = 0;
    titles.forEach((title) => {
        if (title.classList[2] == "title_blocked") counter++;
    });
    return counter == 9 ? true : false;
};

const restart = () => {
    titles.forEach((title) => {
        const id = parseInt(title.classList[1].slice(-1)) - 1;
        title.classList.remove("title_blocked");
        crosses[id].style.opacity = 0;
        zeroes[id].style.opacity = 0;
    });
    isCrossesRound = true;
    isZeroesRound = false;
    Object.keys(crossedTitles).forEach((title) => {
        crossedTitles[`${title}`] = false;
        zeroedTitles[`${title}`] = false;
    });
};

/* Функции */
titles.forEach((title) => {
    title.onclick = () => {
        if (title.classList[2] != "title_blocked") {
            if (isCrossesRound) {
                const id = parseInt(title.className.slice(-1)) - 1;
                crosses[id].style.opacity = 1;
                title.classList.add("title_blocked");
                isCrossesRound = false;
                isZeroesRound = true;
                crossedTitles[`${id}`] = true;
                if (winCheck(crossedTitles)) {
                    alert("Победили крестики");
                    restart();
                } else if (winCheck(zeroedTitles)) {
                    alert("Победили нолики");
                    restart();
                } else if (isDraw()) {
                    alert("Ничья");
                    restart();
                }
            } else if (isZeroesRound) {
                const id = parseInt(title.className.slice(-1)) - 1;
                zeroes[id].style.opacity = 1;
                title.classList.add("title_blocked");
                isCrossesRound = true;
                isZeroesRound = false;
                zeroedTitles[`${id}`] = true;
                if (winCheck(crossedTitles)) {
                    alert("Победили крестики");
                    restart();
                } else if (winCheck(zeroedTitles)) {
                    alert("Победили нолики");
                    restart();
                } else if (isDraw()) {
                    alert("Ничья");
                    restart();
                }
            }
        }
    };
});

restartButton.onclick = () => {
    restart();
};
