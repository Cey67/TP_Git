# TP Git Flow - Le Café des Devs

## Configuration initiale du projet

### Récupérer le code de départ

Clonez le projet fourni depuis GitLab sur votre machine locale et placez-vous dans le dossier du projet.
[https://gitlab.com/sofiane671/tp-git](https://gitlab.com/sofiane671/tp-git)

### Créer votre propre repository

Créez un nouveau repository sur GitHub ou GitLab pour votre équipe.

Supprimez ensuite la référence vers le repository d'origine (.git) et configurez votre nouveau repository comme référence distante. Poussez enfin le code initial sur votre nouveau repository.

### Créer la branche develop

À partir de la branche main, créez une nouvelle branche nommée develop. Cette branche servira de base pour tout le développement. Poussez cette branche sur le repository distant.

### Inviter les membres de l'équipe

Dans les paramètres de votre repository, invitez tous les membres de votre équipe en tant que collaborateurs afin qu'ils puissent travailler sur le projet.

---

## Processus de travail pour chaque tâche

### Créer une branche de travail

Avant de commencer une tâche, assurez-vous d'être sur la branche develop et de récupérer les dernières modifications. Créez ensuite une nouvelle branche selon le type de tâche à réaliser.

Utilisez la convention de nommage suivante :
- Les branches hotfix pour corriger les bugs critiques en production
- Les branches feature pour développer les nouvelles fonctionnalités
- Les branches fix pour les corrections et améliorations

### Réaliser les modifications

Éditez les fichiers nécessaires selon les instructions de la tâche. Testez régulièrement vos modifications en ouvrant les pages HTML dans votre navigateur pour vérifier que tout fonctionne correctement.

### Valider vos modifications

Une fois vos modifications terminées et testées, ajoutez tous les fichiers modifiés à la zone de staging puis créez un commit avec un message descriptif.

Le message de commit doit suivre la convention des commits conventionnels avec un préfixe correspondant au type de modification suivi d'une description claire.

### Créer une Pull Request

Poussez votre branche vers le repository distant. Rendez-vous ensuite sur GitHub ou GitLab pour créer une Pull Request de votre branche vers la branche develop.

Dans la Pull Request, rédigez un titre clair et une description détaillée de ce que vous avez modifié. Assignez cette Pull Request à un membre de votre équipe qui sera chargé de la review.

Le reviewer doit lire le code, vérifier que les modifications sont correctes et tester si nécessaire. Si tout est validé, il peut merger la Pull Request dans develop puis supprimer la branche de travail.

### Synchroniser après un merge

Après qu'une Pull Request a été mergée, tous les membres de l'équipe doivent se replacer sur la branche develop et récupérer les dernières modifications pour rester à jour.

---

## Liste des tâches

Consultez le fichier TASKS.md pour voir la liste complète des tâches à réaliser. Le projet comprend trois types de tâches :
- Trois hotfix pour corriger des bugs critiques
- Trois features pour ajouter de nouvelles fonctionnalités
- Trois fix pour améliorer le code existant

---

## Créer la version finale

Lorsque toutes les tâches sont terminées et mergées dans develop, créez une branche release pour préparer la mise en production.

Créez cette branche release à partir de develop avec le nom release/v1.0.0. Effectuez les derniers tests pour vérifier que tout le site fonctionne correctement.

Mergez ensuite cette branche release dans main pour la mise en production. Mergez également cette branche dans develop pour garder les deux branches synchronisées.

Créez enfin un tag avec le numéro de version v1.0.0 sur la branche main et poussez ce tag sur le repository distant.