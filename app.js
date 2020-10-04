const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn4 = document.querySelector('#btn4');
const scoreBoard = document.querySelector('.score');

let score = 0;

let btnArray = [
    btn1,
    btn2,
    btn3,
    btn4
]

const firstNo = () => {
    return num = Math.floor(Math.random() * 11);
}

const secondNo = () => {
    return num = Math.floor(Math.random() * 11);
}

let num1 = firstNo();
let num2 = secondNo();

const updating = () => {
    const header = document.querySelector('.quest-text');
    header.innerHTML = `${num1} + ${num2}`
}

let correctAns = num1 + num2;

const options = () => {
    let answer = num1 + num2;
    let fake1 = Math.floor(Math.random() * 11) * num1;
    let fake2 = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);
    let fake3 = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);
    return [
        answer,
        fake1,
        fake2,
        fake3
    ]
}

let btnAnswers = options();

const checkingForSame = () => {
    for (let i = 0; i < 4; i++) {
        // i = 0;
        let a = btnAnswers[i];
        for (let b = 0; b < 4; b++) {
            if (a === btnAnswers[b] && i !== b) {
                btnAnswers[b] = Math.floor(Math.random() * 11) + btnAnswers[b];
            } else {
                continue;
            }
        }
    }
}

const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const settingBtnValue = () => {
    shuffle(btnAnswers);
    btnArray.forEach((element, i) => {
        element.innerHTML = btnAnswers[i];
    });
}

const win = (a) => {
    num1 = firstNo();
    num2 = secondNo();
    updating();
    options();
    btnAnswers = options();
    correctAns = num1 + num2;
    checkingForSame();
    settingBtnValue();
    if(a === true){
        score = score + 10;
    } else {
        score = score;
    }
    scoreBoard.innerHTML = score;
}

btnArray.forEach((element, i) => {
    element.onclick = () => {
        if(btnAnswers[i] === correctAns){
            element.classList.add('green');
            setTimeout(() => {
                element.classList.remove('green');
                win(true);
            }, 700);
        } else {
            element.classList.add('red');
            setTimeout(() => {
                element.classList.remove('red');
                win(false);
            }, 700);
        }
    }
});

checkingForSame();

settingBtnValue();

updating();

window.onload = () => {
    score = score + (localStorage.getItem('score') * 1);
}