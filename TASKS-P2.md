# Exercices Git - Partie 2

---

## EXERCICE 1 : Git Stash - Interruption urgente

### Contexte
Vous travaillez sur une nouvelle fonctionnalité quand un bug critique est signalé. Vous devez interrompre votre travail pour corriger le bug immédiatement.

### Objectif
Apprendre à sauvegarder temporairement son travail en cours avec `git stash`.

### Étapes

1. **Créez une branche de travail** depuis `develop`
```bash
git checkout develop
git checkout -b feature/galerie-photos
```

2. **Commencez à travailler** : Ouvrez `index.html` dans votre IDE et ajoutez cette section avant le footer
```html
<section class="gallery">
    <h2>Notre Galerie</h2>
    <div class="gallery-grid">
        <div class="gallery-item">Photo 1</div>
    </div>
</section>
```

3. **NE COMMITEZ PAS** - Vérifiez l'état
```bash
git status  # Vous devez voir index.html modifié
```

4. **URGENCE !** Un bug critique doit être corrigé. Sauvegardez votre travail
```bash
git stash save "WIP: galerie photos"
git status  # Doit être clean
```

5. **Corrigez le bug** sur une autre branche
```bash
git checkout develop
git checkout -b hotfix/urgent
```
Ouvrez `about.html` et corrigez une faute d'orthographe (par exemple).
```bash
git add .
git commit -m "fix: correction urgente"
```

6. **Retournez à votre feature** et récupérez votre travail
```bash
git checkout feature/galerie-photos
git stash list  # Voir la liste des stashs
git stash pop   # Récupérer le dernier stash
```

### Validation
- Votre fichier `index.html` contient à nouveau vos modifications
- Le stash a été supprimé de la liste (`git stash list` ne doit rien montrer)

---

## EXERCICE 2 : Git Stash - Gestion de plusieurs stashs

### Contexte
Vous devez jongler entre plusieurs tâches en parallèle.

### Objectif
Maîtriser la gestion de plusieurs stashs simultanés.

### Étapes

1. **Tâche A** : Créez `feature/menu-jour`
```bash
git checkout develop
git checkout -b feature/menu-jour
```
Ouvrez `menu.html` et ajoutez une section "Plat du jour" avec un plat de votre choix.
```bash
git add .
git stash save "WIP: menu du jour"
```

2. **Tâche B** : Créez `feature/livraison`
```bash
git checkout develop
git checkout -b feature/livraison
```
Ouvrez `contact.html` et ajoutez une section "Livraison" (zones desservies, délais, minimum de commande).
```bash
git add .
git stash save "WIP: section livraison"
```

3. **Voir tous les stashs**
```bash
git stash list
# Vous devriez voir :
# stash@{0}: WIP: section livraison
# stash@{1}: WIP: menu du jour
```

4. **Appliquer un stash spécifique** (pas le dernier)
```bash
git checkout feature/menu-jour
git stash apply stash@{1}  # Applique le stash du menu
```

5. **Nettoyer** : Supprimez les stashs non utilisés
```bash
git stash drop stash@{1}
git stash clear  # Supprime tous les stashs restants
```

### Validation
- Vous avez su appliquer un stash spécifique
- Vous savez lister et supprimer des stashs

---

## EXERCICE 3 : Git Rebase - Mettre à jour sa branche

### Contexte
Vous travaillez sur une feature, mais pendant ce temps `develop` a avancé avec de nouveaux commits. Vous devez intégrer ces changements.

### Objectif
Utiliser `git rebase` pour mettre à jour sa branche avec les derniers changements de `develop`.

### Étapes

1. **Créez une situation de divergence**

Sur `develop` :
```bash
git checkout develop
```
Ouvrez `index.html` et ajoutez un commentaire `<!-- Mise à jour 1 -->` quelque part.
```bash
git add index.html
git commit -m "feat: amélioration page d'accueil"
```

2. **Créez votre feature** à partir de l'ancien `develop`
```bash
# Revenez au commit précédent
git checkout HEAD^
git checkout -b feature/carte-fidelite
```
Ouvrez `menu.html` et ajoutez un commentaire `<!-- Carte fidélité -->`.
```bash
git add menu.html
git commit -m "feat: ajout carte fidélité"
```

3. **Situation** : Votre branche est maintenant "en retard" par rapport à develop
```bash
git log --graph --oneline --all
# Vous verrez que develop et feature/carte-fidelite ont divergé
```

4. **Rebasez votre branche** sur develop
```bash
git rebase develop
```

5. **Vérifiez l'historique** : il doit être linéaire
```bash
git log --graph --oneline --all
# Votre commit de feature doit maintenant être APRÈS celui de develop
```

### Validation
- L'historique est linéaire (pas de bifurcation)
- Votre commit de feature vient après ceux de develop
- Les deux fichiers (index.html et menu.html) contiennent les modifications

---

## EXERCICE 4 : Merge vs Rebase - Comparaison

### Contexte
Comparer visuellement la différence entre un merge et un rebase.

### Objectif
Comprendre l'impact de chaque méthode sur l'historique Git.

### Étapes

#### Version A : Avec MERGE

1. **Configuration initiale**
```bash
git checkout develop
git checkout -b test-merge
```
Créez un fichier `fileA.txt` avec le contenu "Commit A".
```bash
git add fileA.txt
git commit -m "feat: commit A"
```

2. **Faire avancer develop**
```bash
git checkout develop
```
Créez un fichier `fileB.txt` avec le contenu "Commit B".
```bash
git add fileB.txt
git commit -m "feat: commit B"
```

3. **Merger test-merge dans develop**
```bash
git merge test-merge
git log --graph --oneline
```

#### Version B : Avec REBASE

1. **Configuration initiale** (recommencez)
```bash
git checkout develop
git reset --hard HEAD~2  # Revenir en arrière

git checkout -b test-rebase
```
Créez un fichier `fileC.txt` avec le contenu "Commit C".
```bash
git add fileC.txt
git commit -m "feat: commit C"
```

2. **Faire avancer develop**
```bash
git checkout develop
```
Créez un fichier `fileD.txt` avec le contenu "Commit D".
```bash
git add fileD.txt
git commit -m "feat: commit D"
```

3. **Rebaser puis merger**
```bash
git checkout test-rebase
git rebase develop
git checkout develop
git merge test-rebase
git log --graph --oneline
```

### Validation
- Avec merge : vous voyez une bifurcation et un commit de merge
- Avec rebase : l'historique est complètement linéaire
- Vous comprenez la différence visuelle

---

## EXERCICE 5 : Git Reset --soft - Regrouper des commits

### Contexte
Vous avez fait plusieurs petits commits successifs pour corriger des fautes d'orthographe. Vous voulez les regrouper en un seul commit propre.

### Objectif
Utiliser `git reset --soft` pour regrouper plusieurs commits.

### Étapes

1. **Créez 3 commits successifs**
```bash
git checkout develop
git checkout -b fix/typos
```

**Commit 1** : Ouvrez `index.html`, corrigez une faute d'orthographe.
```bash
git add index.html
git commit -m "fix: typo in index"
```

**Commit 2** : Ouvrez `menu.html`, corrigez une faute d'orthographe.
```bash
git add menu.html
git commit -m "fix: typo in menu"
```

**Commit 3** : Ouvrez `about.html`, corrigez une faute d'orthographe.
```bash
git add about.html
git commit -m "fix: typo in about"
```

2. **Vérifiez l'historique**
```bash
git log --oneline
# Vous devriez voir vos 3 commits
```

3. **Annulez les 3 commits avec --soft**
```bash
git reset --soft HEAD~3
```

4. **Vérifiez l'état**
```bash
git status
# Tous les fichiers doivent être dans la staging area (en vert)
```

5. **Créez un seul commit regroupé**
```bash
git commit -m "fix: correct all typos in HTML files"
```

### Validation
- Vous n'avez plus qu'un seul commit au lieu de 3
- Toutes les modifications sont présentes
- L'historique est plus propre

---

## EXERCICE 6 : Git Reset --mixed - Réorganiser les commits

### Contexte
Vous avez commité trop de modifications en même temps. Vous voulez les séparer en plusieurs commits logiques.

### Objectif
Utiliser `git reset --mixed` pour défaire un commit et réorganiser les modifications.

### Étapes

1. **Créez un gros commit avec plusieurs fichiers**
```bash
git checkout develop
git checkout -b refactor/multiple-changes
```

Modifiez 3 fichiers :
- Ouvrez `styles.css` et ajoutez un commentaire `/* Change 1 */`
- Ouvrez `script.js` et ajoutez un commentaire `// Change 2`
- Ouvrez `index.html` et ajoutez un commentaire `<!-- Change 3 -->`

```bash
git add .
git commit -m "refactor: multiple changes"
```

2. **Annulez le commit avec --mixed**
```bash
git reset HEAD^
# ou : git reset --mixed HEAD^
```

3. **Vérifiez l'état**
```bash
git status
# Les fichiers sont modifiés mais PAS dans staging (en rouge)
```

4. **Créez plusieurs commits logiques**
```bash
# Commit 1 : CSS seulement
git add styles.css
git commit -m "style: update CSS styles"

# Commit 2 : JavaScript seulement
git add script.js
git commit -m "feat: update JavaScript logic"

# Commit 3 : HTML seulement
git add index.html
git commit -m "feat: update HTML structure"
```

### Validation
- Vous avez maintenant 3 commits séparés au lieu d'1 gros
- Chaque commit a un objectif clair

---

## EXERCICE 7 : Git Reset --hard + Reflog - Récupération après erreur

### Contexte
Vous faites une erreur et utilisez `git reset --hard` par accident. Vous devez récupérer votre travail.

### Objectif
Apprendre à utiliser `git reflog` pour récupérer des commits perdus.

### Étapes

1. **Créez du travail important**
```bash
git checkout develop
git checkout -b feature/important
```

Créez un fichier `important.txt` avec le contenu "Travail important".
```bash
git add important.txt
git commit -m "feat: travail très important"
```

Ouvrez `important.txt` et ajoutez "Suite du travail".
```bash
git add important.txt
git commit -m "feat: suite du travail important"
```

2. **Simulez une ERREUR catastrophique**
```bash
git reset --hard HEAD~2
# PANIQUE ! Tout a disparu !
ls  # important.txt n'existe plus
```

3. **Retrouvez vos commits avec reflog**
```bash
git reflog
# Vous devriez voir l'historique complet de toutes vos actions
# Identifiez le hash du commit "feat: suite du travail important"
```

4. **Récupérez votre travail**
```bash
git reset --hard HEAD@{1}
# ou
git reset --hard <hash-du-commit>
```

### Validation
- Votre fichier `important.txt` est de retour
- Vos commits sont récupérés
- Vous savez qu'avec reflog, rien n'est vraiment perdu (pendant ~30 jours)

---

## EXERCICE 8 : Git Revert - Annuler un commit public

### Contexte
Un commit a été poussé sur `develop` et partagé avec l'équipe, mais il cause des problèmes. Vous devez l'annuler sans réécrire l'historique.

### Objectif
Utiliser `git revert` pour annuler un commit de manière sûre sur une branche partagée.

### Étapes

1. **Créez et poussez un commit problématique**
```bash
git checkout develop
```

Ouvrez `script.js` et ajoutez un commentaire `// Code buggé`.
```bash
git add script.js
git commit -m "feat: nouvelle fonctionnalité"

# Simulez un push (si vous travaillez seul, c'est OK)
# git push origin develop
```

2. **Le commit est publié, d'autres personnes l'ont peut-être récupéré**

3. **Vous réalisez qu'il y a un problème - utilisez revert**
```bash
git log --oneline
# Notez le hash du commit problématique

git revert <hash-du-commit>
# Un éditeur s'ouvre pour le message du commit de revert
# Gardez le message par défaut ou modifiez-le
```

4. **Vérifiez l'historique**
```bash
git log --oneline
# Vous devriez voir :
# - Le commit de revert (nouveau)
# - Le commit problématique (toujours présent)
```

5. **Vérifiez le contenu**
```bash
cat script.js
# Le "Code buggé" ne doit plus être présent
```

### Validation
- L'historique contient le commit original ET le commit de revert
- Les modifications problématiques sont annulées
- Vous n'avez pas réécrit l'historique (pas de force push nécessaire)

### Comparaison avec Reset
```bash
# NE JAMAIS FAIRE sur une branche publique :
# git reset --hard HEAD^
# git push --force

# TOUJOURS FAIRE sur une branche publique :
# git revert <hash>
# git push
```

---

## EXERCICE 9 : Git Cherry-pick - Récupérer un commit spécifique

### Contexte
Un correctif important a été fait sur `develop` mais vous en avez besoin immédiatement sur `main` sans merger toute la branche `develop`.

### Objectif
Utiliser `git cherry-pick` pour appliquer un commit spécifique d'une branche à une autre.

### Étapes

1. **Créez un commit de bugfix sur develop**
```bash
git checkout develop
```

Ouvrez `script.js` et ajoutez un commentaire `// Fix critique`.
```bash
git add script.js
git commit -m "fix: correction bug sécurité"

# Notez le hash de ce commit
git log --oneline -1
```

2. **Appliquez ce commit sur main**
```bash
git checkout main

# Cherry-pick le commit depuis develop
git cherry-pick <hash-du-commit>
```

3. **Vérifiez**
```bash
git log --oneline
# Le commit doit apparaître sur main

cat script.js
# La correction doit être présente
```

### Validation
- Le commit est présent sur `main`
- Le commit a un hash différent (c'est une copie, pas le même commit)
- Les autres commits de `develop` ne sont pas sur `main`

---

## EXERCICE 10 : Cherry-pick multiple - Sélection fine

### Contexte
Une grosse feature branch contient plusieurs commits. Vous voulez récupérer seulement 2-3 commits spécifiques, pas toute la branche.

### Objectif
Cherry-pick plusieurs commits en une seule fois.

### Étapes

1. **Créez une branche avec 5 commits**
```bash
git checkout develop
git checkout -b feature/big-feature
```

**Commit 1** : Créez un fichier `file1.txt` avec "Feature part 1".
```bash
git add file1.txt
git commit -m "feat: part 1"
```

**Commit 2** : Créez un fichier `file2.txt` avec "Feature part 2".
```bash
git add file2.txt
git commit -m "feat: part 2"
```

**Commit 3** : Créez un fichier `file3.txt` avec "Feature part 3".
```bash
git add file3.txt
git commit -m "feat: part 3"
```

**Commit 4** : Créez un fichier `file4.txt` avec "Feature part 4".
```bash
git add file4.txt
git commit -m "feat: part 4"
```

**Commit 5** : Créez un fichier `file5.txt` avec "Feature part 5".
```bash
git add file5.txt
git commit -m "feat: part 5"
```

2. **Identifiez les commits à récupérer**
```bash
git log --oneline
# Notez les hash des commits 2, 3 et 4
```

3. **Cherry-pick plusieurs commits sur develop**
```bash
git checkout develop

# Option 1 : Un par un
git cherry-pick <hash-commit-2>
git cherry-pick <hash-commit-3>
git cherry-pick <hash-commit-4>

# Option 2 : En une seule commande
# git cherry-pick <hash-commit-2> <hash-commit-3> <hash-commit-4>
```

4. **Vérifiez**
```bash
git log --oneline
ls
# Vous devez avoir file2.txt, file3.txt, file4.txt
# Mais PAS file1.txt ni file5.txt
```

### Validation
- Seulement les commits sélectionnés sont présents
- Les fichiers correspondants existent
- Vous savez sélectionner précisément ce dont vous avez besoin

---

## EXERCICE BONUS : Gestion de conflits lors d'un rebase

### Contexte
Lors d'un rebase, des conflits peuvent survenir. Vous devez savoir les gérer.

### Objectif
Résoudre des conflits pendant un rebase.

### Étapes

1. **Créez une situation de conflit**

Sur `develop` :
```bash
git checkout develop
```
Créez un fichier `config.txt` avec le contenu "Version develop".
```bash
git add config.txt
git commit -m "feat: config version develop"
```

Sur une feature :
```bash
git checkout HEAD^  # Revenir avant le commit develop
git checkout -b feature/config-update
```
Créez un fichier `config.txt` avec le contenu "Version feature".
```bash
git add config.txt
git commit -m "feat: config version feature"
```

2. **Tentez un rebase** : conflit garanti !
```bash
git rebase develop
# CONFLICT!
```

3. **Résolvez le conflit**
```bash
# Ouvrez config.txt
# Vous verrez :
<<<<<<< HEAD
Version develop
=======
Version feature
>>>>>>> feat: config version feature

# Modifiez pour garder ce que vous voulez, par exemple :
# Version finale combinée
```

4. **Marquez comme résolu et continuez**
```bash
git add config.txt
git rebase --continue
```

5. **Si vous voulez abandonner le rebase**
```bash
# git rebase --abort  # Revient à l'état avant le rebase
```

### Validation
- Vous savez résoudre un conflit pendant un rebase
- Vous connaissez `--continue` et `--abort`
- Le fichier final contient la version voulue

---

## Récapitulatif des commandes par exercice

| Exercice | Commandes principales |
|----------|----------------------|
| 1-2 | `git stash`, `git stash save`, `git stash pop`, `git stash list`, `git stash apply`, `git stash drop` |
| 3-4 | `git rebase`, `git log --graph` |
| 5 | `git reset --soft` |
| 6 | `git reset --mixed` (ou `git reset`) |
| 7 | `git reset --hard`, `git reflog` |
| 8 | `git revert` |
| 9-10 | `git cherry-pick` |
| Bonus | `git rebase --continue`, `git rebase --abort` |

---

## Tableau comparatif des commandes

### Reset vs Revert

| Critère | git reset | git revert |
|---------|-----------|------------|
| **Historique** | Modifie l'historique | Préserve l'historique |
| **Nouveau commit** | Non | Oui |
| **Sécurité** | Dangereux si public | Safe pour branches publiques |
| **Usage** | Branches locales uniquement | Branches partagées |

### Les 3 modes de Reset

| Mode | Commit | Staging Area | Working Directory |
|------|--------|--------------|-------------------|
| `--soft` | Annulé | Conservé | Conservé |
| `--mixed` | Annulé | Retiré | Conservé |
| `--hard` | Annulé | Retiré | Supprimé |

### Merge vs Rebase

| Critère | git merge | git rebase |
|---------|-----------|------------|
| **Historique** | Préserve tout | Linéarise |
| **Merge commit** | Oui | Non |
| **Conflits** | Une seule fois | Peut-être plusieurs |
| **Usage** | Features → develop/main | Mettre à jour sa branche |

---

## Conseils finaux

### Règles de sécurité

1. **Jamais de --hard sur une branche publique**
2. **Jamais de rebase sur une branche partagée**
3. **Toujours vérifier avec `git status` avant de reset**
4. **En cas de doute, utilisez reflog**

### Workflow recommandé

```bash
# Avant de travailler
git checkout develop
git pull

# Pendant le développement
git stash  # Si interruption
git rebase develop  # Garder à jour

# Avant de merger
git reset --soft HEAD~X  # Nettoyer l'historique si besoin

# En production
git revert  # Jamais reset --hard
git cherry-pick  # Pour des correctifs urgents
```

---

## Conclusion

Vous avez maintenant pratiqué toutes les commandes Git avancées essentielles. Ces compétences sont indispensables pour :
- Gérer efficacement votre workflow quotidien
- Collaborer sereinement en équipe
- Maintenir un historique Git propre et lisible
- Récupérer d'erreurs sans panique

**Continuez à pratiquer** : la maîtrise vient avec l'expérience !
