export function initThemeManager() {
    const themeSelect = document.getElementById('theme');
    
    // Fonction pour changer de thème
    function switchTheme(theme) {
        // Supprimer tous les thèmes existants
        document.body.classList.remove('vintage', 'dark', 'red');
        
        // Ajouter le nouveau thème si ce n'est pas le thème par défaut
        if (theme !== 'default') {
            document.body.classList.add(theme);
        }
        
        // Sauvegarder le choix dans le localStorage
        localStorage.setItem('selectedTheme', theme);
    }

    // Restaurer le thème précédemment sélectionné ou utiliser le thème par défaut
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    themeSelect.value = savedTheme;
    switchTheme(savedTheme);

    // Gestionnaire d'événements pour le changement de thème
    themeSelect.addEventListener('change', () => {
        switchTheme(themeSelect.value);
    });
} 