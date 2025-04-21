export function initHistoryGame() {
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

    // Fonction pour obtenir un événement historique
    async function getHistoricalEvent() {
        const theme = historyThemeSelect.value;
        const difficulty = historyDifficultySelect.value;
        
        try {
            const categoryList = categories[theme][difficulty];
            const randomCategory = categoryList[Math.floor(Math.random() * categoryList.length)];
            
            const response = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(randomCategory)}&srlimit=10&origin=*`);
            const data = await response.json();
            
            if (data.query?.search?.length > 0) {
                const randomArticle = data.query.search[Math.floor(Math.random() * data.query.search.length)];
                
                const articleResponse = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&pageids=${randomArticle.pageid}&origin=*`);
                const articleData = await articleResponse.json();
                
                const extract = articleData.query.pages[randomArticle.pageid].extract;
                const yearMatch = extract.match(/\d{4}/);
                
                return {
                    year: yearMatch?.[0] || null,
                    title: randomArticle.title,
                    details: extract.split('\n')[0]
                };
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
        
        return {
            year: null,
            title: 'Aucun événement disponible',
            details: 'Veuillez réessayer plus tard ou changer de thème/niveau.'
        };
    }

    // Fonction pour afficher un nouvel événement
    async function displayNewEvent() {
        const event = await getHistoricalEvent();
        historicalEventElement.innerHTML = `
            <p>${event.year ? `<strong>${event.year}</strong> - ` : ''}${event.title}</p>
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