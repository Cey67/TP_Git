# Liste des Tâches - TP Git Flow

## HOTFIX

### HOTFIX #1 : Lien de navigation cassé
- **Fichier:** `index.html`
- **Problème:** Le lien "Contact" pointe vers `contact.php`

### HOTFIX #2 : Bouton réservation ne fonctionne pas
- **Fichier:** `script.js`
- **Problème:** Le sélecteur JavaScript cherche `reservationBtn` mais l'ID dans le HTML est `btn-reservation`

### HOTFIX #3 : Formulaire de contact ne se soumet pas
- **Fichiers:** `contact.html`, `script.js`
- **Problème:** Le formulaire n'a pas d'écouteur d'événement `submit`.

## FEATURES

### FEATURE #4 : Ajouter une section Témoignages
- **Fichier:** `index.html` 
- **Tâche:** Créer une section avec 3 témoignages clients

### FEATURE #5 : Ajouter une section Desserts au menu
- **Fichier:** `menu.html` 
- **Tâche:** Ajouter une nouvelle catégorie "Desserts" avec 3-4 produits

### FEATURE #6 : Créer un formulaire newsletter
- **Fichiers:** `menu.html`, `styles.css`
- **Tâche:** Ajouter une section newsletter avant le footer avec formulaire d'inscription email

## FIX 

### FIX #7 : Corriger toutes les fautes d'orthographe
- **Fichiers:** `index.html`, `menu.html`, `about.html`
- **Fautes à corriger:**
   - index.html : "Bienvenu" → "Bienvenue", "d'autre developeurs" → "d'autres développeurs", "partous" → "partout"
   - menu.html : "fraichement" → "fraîchement", "fait-maison" → "fait maison"
   - about.html : "passionés" → "passionnés"

### FIX #8 : Améliorer le responsive mobile
- **Fichier:** `styles.css`
- **Tâche:** Ajouter des media queries pour :
   - Navigation (menu vertical ou hamburger)
   - About content (1 colonne sur mobile)
   - Contact content (1 colonne sur mobile)
   - Footer (1 colonne sur mobile)

### FIX #9 : Améliorer le contraste des couleurs
- **Fichier:** `styles.css` (ligne 11)
- **Problème:** `--text-color: #d0d0d0;` est trop clair
