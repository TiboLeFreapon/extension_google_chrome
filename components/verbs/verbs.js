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
    // ... autres verbes ...
];

export function initVerbsGame() {
    const baseVerbElement = document.getElementById('base-verb');
    const pastVerbElement = document.getElementById('past-verb');
    const pastParticipleElement = document.getElementById('past-participle');
    const translationElement = document.getElementById('translation');
    const showAnswerButton = document.getElementById('show-answer');
    const newVerbButton = document.getElementById('new-verb');

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

    // Initialiser avec un premier verbe
    displayNewVerb();
} 