export function initMathGame() {
    const num1Element = document.getElementById('num1');
    const operatorElement = document.getElementById('operator');
    const num2Element = document.getElementById('num2');
    const answerInput = document.getElementById('answer');
    const checkButton = document.getElementById('check-answer');
    const resultMessage = document.getElementById('result-message');
    const scoreElement = document.getElementById('score');

    let score = 0;
    let currentOperation = null;

    // Opérateurs possibles
    const operators = ['+', '-', '×', '÷'];
    
    // Générer une nouvelle opération
    function generateNewOperation() {
        const operator = operators[Math.floor(Math.random() * operators.length)];
        let num1, num2, result;

        switch (operator) {
            case '+':
                num1 = Math.floor(Math.random() * 100);
                num2 = Math.floor(Math.random() * 100);
                result = num1 + num2;
                break;
            case '-':
                num1 = Math.floor(Math.random() * 100);
                num2 = Math.floor(Math.random() * num1);
                result = num1 - num2;
                break;
            case '×':
                num1 = Math.floor(Math.random() * 12) + 1;
                num2 = Math.floor(Math.random() * 12) + 1;
                result = num1 * num2;
                break;
            case '÷':
                num2 = Math.floor(Math.random() * 12) + 1;
                result = Math.floor(Math.random() * 12) + 1;
                num1 = num2 * result;
                break;
        }

        currentOperation = { num1, operator, num2, result };
        num1Element.textContent = num1;
        operatorElement.textContent = operator;
        num2Element.textContent = num2;
        answerInput.value = '';
        answerInput.focus();
        resultMessage.textContent = '';
    }

    // Vérifier la réponse
    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);
        
        if (isNaN(userAnswer)) {
            resultMessage.textContent = 'Veuillez entrer un nombre valide';
            resultMessage.className = 'incorrect';
            return;
        }

        if (userAnswer === currentOperation.result) {
            score++;
            scoreElement.textContent = score;
            resultMessage.textContent = 'Correct !';
            resultMessage.className = 'correct';
        } else {
            resultMessage.textContent = `Incorrect. La réponse était ${currentOperation.result}`;
            resultMessage.className = 'incorrect';
        }

        setTimeout(generateNewOperation, 1500);
    }

    // Gestionnaire d'événements pour le bouton
    checkButton.addEventListener('click', checkAnswer);

    // Gestionnaire d'événements pour la touche Entrée
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    // Initialiser le jeu
    generateNewOperation();
} 