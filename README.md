# Journal météorologique de la ferme

> Projet individuel du SAS DFS, brief 4 (sujet : [SUJET.md](SUJET.md)).

## Contexte

Le journal météorologique est une application en ligne de commande destinée à enregistrer et exploiter les observations météorologiques quotidiennes d'une exploitation agricole, utliser par le responsable d'une ferme pédagogique. Elle permettra de suivre trois paramètres : la température, la pluviométrie et l'humidité relative de l'air. L'objectif est de faciliter la conservation, la consultation et l'analyse descriptives des données pour apuyer le suivi des activités agricoles.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-4-journal-meteo.git
cd brief-4-journal-meteo
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ _Cochez seulement ce qui marche : `- [x]`._

- [x] Données lues et enregistrées dans `donnees/releves.json`
- [x] Ajouter un relevé, saisies invalides refusées sans arrêter le programme
- [x] Lister les relevés, message si le journal est vide
- [x] Rechercher par identifiant ou par date ; journées pluvieuses (au moins 10 mm)
- [x] Trier par température ou par pluie
- [x] Synthèse : température moyenne, minimale et maximale de la série, cumul de pluie, journées pluvieuses
- [x] Bonus : supprimer et modifier un relevé (choix 6 et 7)
- [x] Bonus : tri par température décroissante, journée la plus chaude

## Données

✏️ _Le fichier, le nombre de relevés, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), les unités. Rappelez qu'ils sont fictifs._

## Limites

✏️ _Au moins trois. Par exemple : dix jours de relevés forment une courte série, ils ne décrivent pas le climat de la région._

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

Prénom: BOURAHIMA
NOM: OUEDRAGO
Compte GitHub: ouedraogo65280833-lgtm
Entraide :
FAKAYODE ABDUL,
ANOH LEVI EMMANUEL,
KONAN ANGLOVIA KOUASSI,
KOUAME KOUADIO K.FLORENT,
THYEDIE AKPLI,
KOFFI VICTOIRE,
KONE PAGADJOUFOUGOU ABDOULAYE,
FALLE SEREKO jAURES,
ESSY ABRAN
sur quoi: l'ensemble du projet
