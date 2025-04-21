document.addEventListener('DOMContentLoaded', () => {
    // Gestion des onglets
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Fonction pour changer d'onglet
    function switchTab(tabId) {
        // Mettre à jour les boutons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Mettre à jour les contenus
        tabContents.forEach(content => content.classList.remove('active'));
        const activeContent = document.getElementById(`${tabId}-tab`);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        // Sauvegarder le choix dans le localStorage
        localStorage.setItem('selectedTab', tabId);
    }

    // Restaurer l'onglet précédemment sélectionné ou utiliser l'onglet par défaut
    const savedTab = localStorage.getItem('selectedTab') || 'math';
    switchTab(savedTab);

    // Gestionnaire d'événements pour les onglets
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Partie Calcul Mental
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
    
    // Fonction pour effectuer une recherche
    function performSearch(query) {
        if (query.trim() !== '') {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }


    // Liens rapides par défaut
    const defaultQuickLinks = [
        { name: 'Gmail', url: 'https://mail.google.com' },
        { name: 'YouTube', url: 'https://www.youtube.com' },
        { name: 'Google Drive', url: 'https://drive.google.com' },
        { name: 'Google Maps', url: 'https://maps.google.com' },
        { name: 'Google Calendar', url: 'https://calendar.google.com' },
        { name: 'Google Docs', url: 'https://docs.google.com' }
    ];

    // Fonction pour créer un lien rapide
    function createQuickLink(link) {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.className = 'quick-link';
        linkElement.textContent = link.name;
        return linkElement;
    }

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
        console.log(currentOperation);
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

    // Partie Dates Historiques
    const historicalEventElement = document.getElementById('historical-event');
    const newDateButton = document.getElementById('new-date');

    // Fonction pour formater la date
    function formatDate(date) {
        const options = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString('fr-FR', options);
    }

    // Fonction pour obtenir un événement historique
    async function getHistoricalEvent() {
        try {
            const today = new Date();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            
            const response = await fetch(`https://fr.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`);
            const data = await response.json();
            
            if (data.events && data.events.length > 0) {
                const randomEvent = data.events[Math.floor(Math.random() * data.events.length)];
                return {
                    year: randomEvent.year,
                    text: randomEvent.text
                };
            }
            return null;
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            return null;
        }
    }

    // Fonction pour afficher un nouvel événement
    async function displayNewEvent() {
        const event = await getHistoricalEvent();
        if (event) {
            historicalEventElement.innerHTML = `
                <p><strong>${event.year}</strong> - ${event.text}</p>
            `;
        } else {
            historicalEventElement.innerHTML = `
                <p>Impossible de charger un événement historique. Veuillez réessayer plus tard.</p>
            `;
        }
    }

    // Gestionnaire d'événements pour le bouton nouvelle date
    newDateButton.addEventListener('click', displayNewEvent);

    // Partie Verbes Irréguliers
    const baseVerbElement = document.getElementById('base-verb');
    const pastVerbElement = document.getElementById('past-verb');
    const pastParticipleElement = document.getElementById('past-participle');
    const translationElement = document.getElementById('translation');
    const showAnswerButton = document.getElementById('show-answer');
    const newVerbButton = document.getElementById('new-verb');

    // Liste des verbes irréguliers avec leurs traductions
    const irregularVerbs = [
        { base: 'be', past: 'was/were', pastParticiple: 'been', translation: 'être' },
        { base: 'begin', past: 'began', pastParticiple: 'begun', translation: 'commencer' },
        { base: 'break', past: 'broke', pastParticiple: 'broken', translation: 'casser' },
        { base: 'bring', past: 'brought', pastParticiple: 'brought', translation: 'apporter' },
        { base: 'build', past: 'built', pastParticiple: 'built', translation: 'construire' },
        { base: 'buy', past: 'bought', pastParticiple: 'bought', translation: 'acheter' },
        { base: 'catch', past: 'caught', pastParticiple: 'caught', translation: 'attraper' },
        { base: 'choose', past: 'chose', pastParticiple: 'chosen', translation: 'choisir' },
        { base: 'come', past: 'came', pastParticiple: 'come', translation: 'venir' },
        { base: 'do', past: 'did', pastParticiple: 'done', translation: 'faire' },
        { base: 'drink', past: 'drank', pastParticiple: 'drunk', translation: 'boire' },
        { base: 'eat', past: 'ate', pastParticiple: 'eaten', translation: 'manger' },
        { base: 'fall', past: 'fell', pastParticiple: 'fallen', translation: 'tomber' },
        { base: 'feel', past: 'felt', pastParticiple: 'felt', translation: 'sentir' },
        { base: 'find', past: 'found', pastParticiple: 'found', translation: 'trouver' },
        { base: 'fly', past: 'flew', pastParticiple: 'flown', translation: 'voler' },
        { base: 'forget', past: 'forgot', pastParticiple: 'forgotten', translation: 'oublier' },
        { base: 'get', past: 'got', pastParticiple: 'gotten', translation: 'obtenir' },
        { base: 'give', past: 'gave', pastParticiple: 'given', translation: 'donner' },
        { base: 'go', past: 'went', pastParticiple: 'gone', translation: 'aller' },
        { base: 'have', past: 'had', pastParticiple: 'had', translation: 'avoir' },
        { base: 'hear', past: 'heard', pastParticiple: 'heard', translation: 'entendre' },
        { base: 'keep', past: 'kept', pastParticiple: 'kept', translation: 'garder' },
        { base: 'know', past: 'knew', pastParticiple: 'known', translation: 'savoir' },
        { base: 'leave', past: 'left', pastParticiple: 'left', translation: 'partir' },
        { base: 'lose', past: 'lost', pastParticiple: 'lost', translation: 'perdre' },
        { base: 'make', past: 'made', pastParticiple: 'made', translation: 'faire' },
        { base: 'meet', past: 'met', pastParticiple: 'met', translation: 'rencontrer' },
        { base: 'pay', past: 'paid', pastParticiple: 'paid', translation: 'payer' },
        { base: 'put', past: 'put', pastParticiple: 'put', translation: 'mettre' },
        { base: 'read', past: 'read', pastParticiple: 'read', translation: 'lire' },
        { base: 'run', past: 'ran', pastParticiple: 'run', translation: 'courir' },
        { base: 'say', past: 'said', pastParticiple: 'said', translation: 'dire' },
        { base: 'see', past: 'saw', pastParticiple: 'seen', translation: 'voir' },
        { base: 'sell', past: 'sold', pastParticiple: 'sold', translation: 'vendre' },
        { base: 'send', past: 'sent', pastParticiple: 'sent', translation: 'envoyer' },
        { base: 'sing', past: 'sang', pastParticiple: 'sung', translation: 'chanter' },
        { base: 'sit', past: 'sat', pastParticiple: 'sat', translation: 's\'asseoir' },
        { base: 'sleep', past: 'slept', pastParticiple: 'slept', translation: 'dormir' },
        { base: 'speak', past: 'spoke', pastParticiple: 'spoken', translation: 'parler' },
        { base: 'spend', past: 'spent', pastParticiple: 'spent', translation: 'dépenser' },
        { base: 'stand', past: 'stood', pastParticiple: 'stood', translation: 'se tenir debout' },
        { base: 'swim', past: 'swam', pastParticiple: 'swum', translation: 'nager' },
        { base: 'take', past: 'took', pastParticiple: 'taken', translation: 'prendre' },
        { base: 'teach', past: 'taught', pastParticiple: 'taught', translation: 'enseigner' },
        { base: 'tell', past: 'told', pastParticiple: 'told', translation: 'dire' },
        { base: 'think', past: 'thought', pastParticiple: 'thought', translation: 'penser' },
        { base: 'understand', past: 'understood', pastParticiple: 'understood', translation: 'comprendre' },
        { base: 'wear', past: 'wore', pastParticiple: 'worn', translation: 'porter' },
        { base: 'win', past: 'won', pastParticiple: 'won', translation: 'gagner' },
        { base: 'write', past: 'wrote', pastParticiple: 'written', translation: 'écrire' }
    ];

    let currentVerb = null;

    // Fonction pour afficher un nouveau verbe
    function displayNewVerb() {
        currentVerb = irregularVerbs[Math.floor(Math.random() * irregularVerbs.length)];
        baseVerbElement.textContent = currentVerb.base;
        pastVerbElement.textContent = '?';
        pastParticipleElement.textContent = '?';
        translationElement.textContent = '?';
    }

    // Fonction pour afficher la réponse
    function showAnswer() {
        if (currentVerb) {
            pastVerbElement.textContent = currentVerb.past;
            pastParticipleElement.textContent = currentVerb.pastParticiple;
            translationElement.textContent = currentVerb.translation;
        }
    }

    // Gestionnaires d'événements
    showAnswerButton.addEventListener('click', showAnswer);
    newVerbButton.addEventListener('click', displayNewVerb);

    // Initialisation
    generateNewOperation();
    displayNewEvent();
    displayNewVerb();
}); 