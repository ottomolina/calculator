
var input = document.getElementById('input-calc');
let operation = '';
let aux = 0;
let isSymbolOperation = false;

const clickButton = (element) => {
    let symbol = element.target.textContent;
    if(new RegExp('[0-9]').test(symbol)) {
        addNumber(symbol);
        return;
    }
    if(symbol === 'C') {
        cleanInput();
    } else if(symbol === '+/-') {
        invert();
    } else if(symbol === '%') {
        percent();
    } else if(['÷','x','-','+'].findIndex(el => el === symbol) > -1) {
        symbol = symbol === 'x' ? '*':symbol;
        symbol = symbol === '÷' ? '/':symbol;
        operate(symbol);
    } else if(symbol === '=') {
        equals();
    } else if(symbol === '.') {
        if(`${input.value}`.indexOf('.') === -1) {
            addNumber(symbol);
        }
    }
}

const addNumber = (num) => {
    if(isSymbolOperation) {
        isSymbolOperation = false;
        input.value = '';
    }
    if (num == 0) {
        if (input.value[input.value.length - 1] != '0' || input.value.length > 1) {
            input.value = input.value + num;
        }
    } else if (num == '.') {
        if (input.value[input.value.length - 1] != '.' && input.value != '') {
            input.value = input.value + num;
        }
        if(input.value == '') {
            input.value = '0.';
        }
    } else {
        input.value = input.value + num;
    }
}

const operate = (symbol) => {
    equals();
    operation = symbol;
    aux = input.value;
    isSymbolOperation = true;
}

function equals() {
    if (operation != '') {
        input.value = eval(`${aux}${operation}(${input.value})`);
    }
}

function invert() {
    input.value = input.value * -1;
}

function percent() {
    input.value = input.value / 100;
}

function cleanInput() {
    input.value = '';
    aux = 0;
    operation = '';
}

const listButton = document.getElementsByClassName('ripple');
let i = 0;
while(i<listButton.length) {
    listButton.item(i).addEventListener('click', clickButton);
    i++;
}