const inputContainer = document.getElementById('divInsertNumeros');
const shuffleButton = document.getElementById('botaoEmbaralhar');
const addButton = document.getElementById('botaoAdicionarCampo');
const resultContainer = document.getElementById('divResultado');

function createInput() {
    const newInput = document.createElement('input');
    newInput.type = 'number';
    newInput.className = 'insertNumero';
    newInput.placeholder = 'Digite um número';
    inputContainer.appendChild(newInput);
    newInput.focus();
}

inputContainer.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        createInput();
        event.preventDefault();
    }
});

addButton.addEventListener('click', function() {
    createInput();
});


function mergeShuffle(numbers) {
    if (numbers.length <= 1) {
        return numbers;
    }

    const middle = Math.floor(numbers.length / 2);
    const left = numbers.slice(0, middle);
    const right = numbers.slice(middle);

    return merge(
        mergeShuffle(left),
        mergeShuffle(right)
    );
}

function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (Math.random() > 0.5) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    return result.concat(left.slice()).concat(right.slice());
}

shuffleButton.addEventListener('click', function() {
    const inputs = document.querySelectorAll('.insertNumero');
    let numbers = [];
    inputs.forEach(input => {
        if (input.value !== '') {
            numbers.push(Number(input.value));
        }
    });

    if (numbers.length > 0) {
       
        setInterval(function() {
            const shuffledNumbers = mergeShuffle(numbers);
            resultContainer.textContent = 'Números embaralhados: ' + shuffledNumbers.join(', ');
        }, 150);
    } else {
        resultContainer.textContent = 'Por favor, insira pelo menos um número.';
    }
});
