# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ    | Signification                                | Type   | Règle de validation          | Unité | Exemple    |
| -------- | -------------------------------------------- | ------ | ---------------------------- | ----- | ---------- |
| `id`     | Identifiant unique                           | texte  | non vide, absent des données | —     | P0506      |
| date     | Jour précis d'un événement                   | Entier | AAA-MM-JJ                    | -     | 2026-11-02 |
| temp C   | Température de l'air                         | Nombre | toutes valeurs numériques    | °C    | 25         |
| pluie mm | Quantité d'eau tombée                        | Nombre | 0<pluie                      | mm    | 1000mm     |
| hum %    | Quantité de vapeur d'eau présente dans l'air | Nombre | 0 à 100                      | %     | 91         |

**Listes de valeurs autorisées** : toute valeur numérique

**Sources** :
SUIJET.md et le fichier de données
