export function initHistoryGame() {
    const currentDateElement = document.getElementById('current-date');
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
            currentDateElement.textContent = formatDate(new Date());
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

    // Initialiser avec un premier événement
    displayNewEvent();
} 