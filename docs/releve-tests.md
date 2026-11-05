# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : refaites à la main les résultats de référence de `SUJET.md`, puis comparez avec votre programme:
**Moyenne de température =(27+28+26+28+27+30+28+26+29+30)/10= 28°C
**Température min = 26°C (id: M03,M08)
**Température Max = 30°C (id: M06,M10)
**cumule de pluie = (5+12+3+8+15+2)=45mm

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action                       | Attendu                                | Obtenu                    | Testeur             |
| ---------------------------- | -------------------------------------- | ------------------------- | ------------------- |
| Ajouter relevé valide        | Un relevé doit être ajouté             | Relevé ajouté avec succès | Bourahima OUEDRAOGO |
| Ajouter un relevé invalide   | Le relevé doit être refusé             | Message d'erreur          | Bourahima OUEDRAOGO |
| Lister les relevés           | Liste complète de tous les relevés     | 11 relevés affichés       | FAKAYODE Abdul      |
| Rechercher relevé inexistent | Signaler que le relevé est introuvable | relevé introuvable        | Bourahima OUEDRAOGO |

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
