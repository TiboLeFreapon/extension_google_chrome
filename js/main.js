import { initMathGame } from '../components/math/math.js';
import { initHistoryGame } from '../components/history/history.js';
import { initVerbsGame } from '../components/verbs/verbs.js';
import { initGeographyGame } from '../components/geography/geography.js';
import { initThemeManager } from '../components/theme/theme.js';

document.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu
    const menuToggle = document.getElementById('menu-toggle');
    const menuContent = document.querySelector('.menu-content');
    let menuVisible = false;

    // Gestionnaire d'événements pour le bouton du menu
    menuToggle.addEventListener('click', () => {
        menuContent.classList.toggle('hidden');
        menuVisible = !menuVisible;
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        if (menuVisible && !menuToggle.contains(e.target) && !menuContent.contains(e.target)) {
            menuContent.classList.add('hidden');
            menuVisible = false;
        }
    });

    // Initialiser le gestionnaire de thèmes
    initThemeManager();

    // Gestion des onglets
    const tabSelector = document.getElementById('tab-selector');
    const tabContents = document.querySelectorAll('.tab-content');

    // Fonction pour changer d'onglet
    function switchTab(tabId) {
        // Mettre à jour les contenus
        tabContents.forEach(content => content.classList.remove('active'));
        const activeContent = document.getElementById(`${tabId}-tab`);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        // Sauvegarder le choix dans le localStorage
        localStorage.setItem('selectedTab', tabId);
    }

    // Gestionnaire d'événements pour le sélecteur d'onglets
    tabSelector.addEventListener('change', () => {
        const tabId = tabSelector.value;
        switchTab(tabId);
    });

    // Restaurer l'onglet précédemment sélectionné ou utiliser l'onglet par défaut
    const savedTab = localStorage.getItem('selectedTab') || 'math';
    tabSelector.value = savedTab;
    switchTab(savedTab);

    // Initialiser tous les jeux
    initMathGame();
    initHistoryGame();
    initVerbsGame();
    initGeographyGame();
}); 