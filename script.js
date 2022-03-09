/* Переменные */
const titles = document.querySelectorAll(".grid__cell");
const crosses = document.querySelectorAll(".cross");
const zeroes = document.querySelectorAll(".zero");
const restartButton = document.querySelector(".btn");
const result = document.querySelector('.header__score');
const titleRound = document.querySelector('.header__round');
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

const drawResult = () => {
    const res = localStorage.getItem('result');
    const round = localStorage.getItem('round');
    const parsedRound = JSON.parse(round)
    const parsedResult = JSON.parse(res);
    const {cross, zero} = parsedResult;
    if(result){
        result.innerText = `Крестики ${cross} - ${zero} Нолики`;
    } 
    if(titleRound){
        titleRound.innerText = `Раунд ${parsedRound || 1}`
    }
}

const countRound = () => {
    const round = localStorage.getItem('round')
    if(round){
        localStorage.setItem('round', JSON.stringify(JSON.parse(round)++))
    }else{
        localStorage.setItem('round', JSON.stringify(2))
    }
}

const saveResult = (winner) => {
    const res = localStorage.getItem('result');
    if(res){ 
       const parsedResult = JSON.parse(res);
       const {cross, zero} = parsedResult;
       console.log(cross, zero)
       localStorage.setItem("result", JSON.stringify({cross: +cross + (winner === 'cross' ? 1 : 0), zero: +zero + (winner === 'zero' ? 1 : 0)}))
    } else {
        localStorage.setItem("result", JSON.stringify({cross: winner === 'cross' ? 1 : 0, zero: winner === 'zero' ? 1 : 0, }))
    }
    countRound();
    drawResult();
}

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
};

window.addEventListener('load', () => {
    drawResult();
})

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
                    saveResult('cross')
                    restart();
                } else if (winCheck(zeroedTitles)) {
                    alert("Победили нолики");
                    saveResult('zero')
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
                    saveResult('cross')
                    restart();
                } else if (winCheck(zeroedTitles)) {
                    alert("Победили нолики");
                    saveResult('zero')
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
    localStorage.clear();
    drawResult();
};
