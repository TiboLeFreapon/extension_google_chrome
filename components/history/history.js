export function initHistoryGame() {
    const currentDateElement = document.getElementById('current-date');
    const historicalEventElement = document.getElementById('historical-event');
    const newDateButton = document.getElementById('new-date');
    const historyThemeSelect = document.getElementById('history-theme');
    const historyDifficultySelect = document.getElementById('history-difficulty');

    // Catégories Wikipedia par thème et difficulté
    const categories = {
        france: {
            easy: ['Révolution française', 'Seconde Guerre mondiale', 'Ve République'],
            medium: ['Renaissance française', 'Premier Empire', 'Belle Époque'],
            hard: ['Moyen Âge', 'Guerres de Religion', 'Colonisation française']
        },
        technology: {
            easy: ['Invention du téléphone', 'Première télévision', 'Premier pas sur la Lune'],
            medium: ['Invention du transistor', 'Premier ordinateur', 'Internet'],
            hard: ['Télégraphe', 'Machine de Turing', 'Cryptographie']
        },
        science: {
            easy: ['Lois de Newton', 'Théorie de l\'évolution', 'Découverte de la pénicilline'],
            medium: ['Révolution copernicienne', 'Théorie de la relativité', 'Conquête spatiale'],
            hard: ['Microscope', 'Tableau périodique', 'Mécanique quantique']
        }
    };

    // Fonction pour formater la date
    function formatDate(date) {
        const options = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString('fr-FR', options);
    }

    // Fonction pour obtenir un événement historique
    async function getHistoricalEvent() {
        const theme = historyThemeSelect.value;
        const difficulty = historyDifficultySelect.value;
        
        try {
            // Construire la requête avec les catégories appropriées
            const categoryList = categories[theme][difficulty];
            const randomCategory = categoryList[Math.floor(Math.random() * categoryList.length)];
            
            // Requête à l'API Wikipedia
            const response = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(randomCategory)}&srlimit=10&origin=*`);
            const data = await response.json();
            
            if (data.query && data.query.search && data.query.search.length > 0) {
                const randomArticle = data.query.search[Math.floor(Math.random() * data.query.search.length)];
                
                // Récupérer les détails de l'article
                const articleResponse = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&pageids=${randomArticle.pageid}&origin=*`);
                const articleData = await articleResponse.json();
                
                const extract = articleData.query.pages[randomArticle.pageid].extract;
                const yearMatch = extract.match(/\d{4}/);
                const year = yearMatch ? yearMatch[0] : null;
                
                return {
                    year: year,
                    text: randomArticle.title,
                    details: extract.split('\n')[0] // Premier paragraphe
                };
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
        
        return {
            year: 'Aujourd\'hui',
            text: 'Aucun événement disponible pour ce thème et ce niveau de difficulté.',
            details: 'Veuillez réessayer plus tard ou changer de thème/niveau.'
        };
    }

    // Fonction pour afficher un nouvel événement
    async function displayNewEvent() {
        const event = await getHistoricalEvent();
        currentDateElement.textContent = formatDate(new Date());
        historicalEventElement.innerHTML = `
            <p>${event.year ? `<strong>${event.year}</strong> - ` : ''}${event.text}</p>
            <div class="event-details">
                <p>${event.details}</p>
            </div>
        `;
    }

    // Gestionnaires d'événements
    newDateButton.addEventListener('click', displayNewEvent);
    historyThemeSelect.addEventListener('change', displayNewEvent);
    historyDifficultySelect.addEventListener('change', displayNewEvent);

    // Initialiser avec un premier événement
    displayNewEvent();
} 