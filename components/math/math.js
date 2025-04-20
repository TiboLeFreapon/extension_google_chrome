export function initMathGame() {
    const num1Element = document.getElementById('num1');
    const operatorElement = document.getElementById('operator');
    const num2Element = document.getElementById('num2');
    const answerInput = document.getElementById('answer');
    const checkButton = document.getElementById('check-answer');
    const resultMessage = document.getElementById('result-message');
    const scoreElement = document.getElementById('score');
    const difficultySelect = document.getElementById('difficulty');

    let score = 0;
    let currentOperation = null;

    // Opérateurs possibles (sauf pour le niveau expert)
    const operators = ['+', '-', '×', '÷'];
    
    // Générer une nouvelle opération
    function generateNewOperation() {
        const difficulty = difficultySelect.value;
        let operator, num1, num2, result;

        if (difficulty === 'expert') {
            // Pour le niveau expert, on ne fait que des multiplications complexes
            operator = '×';
            // Générer des nombres entre 10 et 99
            num1 = Math.floor(Math.random() * 90) + 10;
            num2 = Math.floor(Math.random() * 90) + 10;
            result = num1 * num2;
        } else if (difficulty === 'hard') {
                    // Pour le niveau expert, on ne fait que des multiplications complexes
                    operator = '×';
                    // Générer des nombres entre 10 et 99
                    num1 = Math.floor(Math.random() * 10);
                    num2 = Math.floor(Math.random() * 90) + 10;
                    result = num1 * num2;
        } else {
            operator = operators[Math.floor(Math.random() * operators.length)];

            switch (operator) {
                case '+':
                    if (difficulty === 'easy') {
                        num1 = Math.floor(Math.random() * 20);
                        num2 = Math.floor(Math.random() * 20);
                    } else if (difficulty === 'medium') {
                        num1 = Math.floor(Math.random() * 50);
                        num2 = Math.floor(Math.random() * 50);
                    }
                    result = num1 + num2;
                    break;
                case '-':
                    if (difficulty === 'easy') {
                        num1 = Math.floor(Math.random() * 20);
                        num2 = Math.floor(Math.random() * num1);
                    } else if (difficulty === 'medium') {
                        num1 = Math.floor(Math.random() * 50);
                        num2 = Math.floor(Math.random() * num1);
                    }
                    result = num1 - num2;
                    break;
                case '×':
                    if (difficulty === 'easy') {
                        num1 = Math.floor(Math.random() * 5) + 1;
                        num2 = Math.floor(Math.random() * 5) + 1;
                    } else if (difficulty === 'medium') {
                        num1 = Math.floor(Math.random() * 8) + 1;
                        num2 = Math.floor(Math.random() * 8) + 1;
                    } 
                    result = num1 * num2;
                    break;
                case '÷':
                    if (difficulty === 'easy') {
                        num2 = Math.floor(Math.random() * 5) + 1;
                        result = Math.floor(Math.random() * 5) + 1;
                    } else if (difficulty === 'medium') {
                        num2 = Math.floor(Math.random() * 8) + 1;
                        result = Math.floor(Math.random() * 8) + 1;
                    } 
                    num1 = num2 * result;
                    break;
            }
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

    // Gestionnaire d'événements pour le changement de difficulté
    difficultySelect.addEventListener('change', generateNewOperation);

    // Initialiser le jeu
    generateNewOperation();
} 