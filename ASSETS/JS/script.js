document.addEventListener('DOMContentLoaded', function() {
    // Select personnalisé
    let customSelect = document.querySelector('.custom-select');
    let selectSelected = customSelect.querySelector('.select-selected');
    let selectItems = customSelect.querySelector('.select-items');
    let items = selectItems.getElementsByTagName('li');
    let gradientBox = document.querySelector('.gradient-box-show');
    let colorInputs = document.querySelectorAll('.gradient-box-color-input');
    let copyButton = document.querySelector('.copy-button');

    // Fonction pour mettre à jour le dégradé
    function updateGradient() {
        // Récupérer directement la valeur data-value du li sélectionné
        let selectedLi = selectSelected.innerHTML;
        let direction = selectedLi.includes('data-value') 
            ? selectSelected.querySelector('li')?.getAttribute('data-value') 
            : 'to right';
        let color1 = colorInputs[0].value;
        let color2 = colorInputs[1].value;
        gradientBox.style.background = `linear-gradient(${direction}, ${color1}, ${color2})`;
    }

    // Fonction pour fermer tous les select
    function closeAllSelect(element) {
        let selectItems = document.getElementsByClassName('select-items');
        for (let i = 0; i < selectItems.length; i++) {
            if (element !== selectItems[i]) {
                selectItems[i].classList.add('select-hide');
            }
        }
    }

    // Quand on clique sur le select
    selectSelected.addEventListener('click', function(e) {
        e.stopPropagation();
        selectItems.classList.toggle('select-hide');
    });

    // Quand on clique sur une option
    for (let item of items) {
        item.addEventListener('click', function(e) {
            let direction = this.getAttribute('data-value');
            selectSelected.innerHTML = this.innerHTML;
            selectSelected.setAttribute('data-value', direction);
            selectItems.classList.add('select-hide');
            
            // Mettre à jour le dégradé avec la nouvelle direction
            let color1 = colorInputs[0].value;
            let color2 = colorInputs[1].value;
            gradientBox.style.background = `linear-gradient(${direction}, ${color1}, ${color2})`;
        });
    }

    // Fermer le select quand on clique ailleurs
    document.addEventListener('click', function() {
        let selectItems = document.getElementsByClassName('select-items');
        Array.from(selectItems).forEach(item => item.classList.add('select-hide'));
    });

    // Écouter les changements de couleur
    colorInputs.forEach(input => {
        input.addEventListener('input', updateGradient);
    });

    // Initialiser le dégradé au chargement
    updateGradient();

    copyButton.addEventListener('click', () => {
        // Récupérer les couleurs et la direction
        let color1 = colorInputs[0].value;
        let color2 = colorInputs[1].value;
        let direction = selectSelected.getAttribute('data-value') || 'to right';
        
        // Créer la chaîne CSS complète
        let gradientCSS = `background: linear-gradient(${direction}, ${color1}, ${color2});`;
        
        // Méthode alternative de copie avec fallback
        if (navigator.clipboard && window.isSecureContext) {
            // Méthode principale avec l'API Clipboard
            navigator.clipboard.writeText(gradientCSS)
                .then(() => {
                    copyButton.innerHTML = '<i class="fas fa-check"></i> Copié !';
                    setTimeout(() => {
                        copyButton.innerHTML = '<img src="ASSETS/GIF/10.gif" alt="Copy" class="copy-icon me-1"> Copier le code CSS';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erreur lors de la copie :', err);
                    fallbackCopyMethod(gradientCSS);
                });
        } else {
            // Fallback pour les navigateurs qui ne supportent pas l'API Clipboard
            fallbackCopyMethod(gradientCSS);
        }
    });

    function fallbackCopyMethod(text) {
        // Créer un élément textarea temporaire
        const textArea = document.createElement('textarea');
        textArea.value = text;
        
        // Le rendre invisible mais présent dans le DOM
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        
        // Sélectionner et copier
        textArea.select();
        try {
            document.execCommand('copy');
            copyButton.innerHTML = '<i class="fas fa-check"></i> Copié !';
            setTimeout(() => {
                copyButton.innerHTML = '<img src="ASSETS/GIF/10.gif" alt="Copy" class="copy-icon me-1"> Copier le code CSS';
            }, 2000);
        } catch (err) {
            console.error('Fallback: Erreur lors de la copie', err);
        }
        
        // Nettoyer
        document.body.removeChild(textArea);
    }

    function updateColors() {
        let colorInputs = document.querySelectorAll('.gradient-box-color-input');
        let header = document.querySelector('header');
        let footer = document.querySelector('footer');
        let copyButton = document.querySelector('.copy-button');
        let direction = document.querySelector('.select-selected').getAttribute('data-value') || 'to right';
        
        // Récupérer les couleurs
        let color1 = colorInputs[0].value;
        let color2 = colorInputs[1].value;
        
        // Mettre à jour le fond du header
        header.style.background = `linear-gradient(${direction}, ${color1}, ${color2})`;
        footer.style.background = `linear-gradient(${direction}, ${color1}, ${color2})`;

        // Mettre à jour la couleur du bouton
        copyButton.style.backgroundColor = color1;
    }

    // Ajouter les écouteurs d'événements
    document.querySelectorAll('.gradient-box-color-input').forEach(input => {
        input.addEventListener('input', updateColors);
    });

    // Appeler updateColors immédiatement
    updateColors();
});
