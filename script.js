/* Переменные */
const titles = document.querySelectorAll(".grid__cell");
const crosses = document.querySelectorAll(".cross");
const zeroes = document.querySelectorAll(".zero");
const restartButton = document.querySelector(".btn");

const roundCounter = document.querySelector(".round__counter");
const crossCounter = document.querySelector(".cross__counter");
const zeroCounter = document.querySelector(".zero__counter");

if (roundCounter.textContent == "") roundCounter.textContent = "1";
if (crossCounter.textContent == "") {
    crossCounter.textContent = "0";
    zeroCounter.textContent = "0";
}

let roundCount = parseInt(roundCounter.textContent);
let crossCount = parseInt(crossCounter.textContent);
let zeroCount = parseInt(zeroCounter.textContent);

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
        (obj[0] == true && obj[4] == true && obj[8] == true) ||
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
    roundCount += 1;
    roundCounter.textContent = `${roundCount}`;
    crossCounter.textContent = `${crossCount}`;
    zeroCounter.textContent = `${zeroCount}`;
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
                    crossCount += 1;
                    restart();
                } else if (winCheck(zeroedTitles)) {
                    alert("Победили нолики");
                    zeroCount += 1;
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
                    crossCount += 1;
                    restart();
                } else if (winCheck(zeroedTitles)) {
                    alert("Победили нолики");
                    zeroCount += 1;
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
    roundCounter.textContent = "1";
    crossCounter.textContent = "0";
    zeroCounter.textContent = "0";
    roundCount = parseInt(roundCounter.textContent);
    crossCount = parseInt(crossCounter.textContent);
    zeroCount = parseInt(zeroCounter.textContent);
};
