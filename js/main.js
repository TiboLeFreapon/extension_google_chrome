import { initMathGame } from '../components/math/math.js';
import { initHistoryGame } from '../components/history/history.js';
import { initVerbsGame } from '../components/verbs/verbs.js';
import { initGeographyGame } from '../components/geography/geography.js';

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

    // Gestionnaire d'événements pour les onglets
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Restaurer l'onglet précédemment sélectionné ou utiliser l'onglet par défaut
    const savedTab = localStorage.getItem('selectedTab') || 'math';
    switchTab(savedTab);

    // Initialiser tous les jeux
    initMathGame();
    initHistoryGame();
    initVerbsGame();
    initGeographyGame();
}); 