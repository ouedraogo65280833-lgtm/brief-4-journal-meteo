# Journal de recherche

> Chaque recherche utile : ce que vous cherchiez, où (cours, [MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript), [Node.js](https://nodejs.org/api/), un camarade, une IA…), ce que vous avez compris. Ce que vous gardez, vous devez pouvoir l'expliquer.

| Ce que je cherchais | Où | Ce que j'ai compris | Utilisé dans |
|Comment lire un fichier JSON|Doc Node.js |await readFile(chemin, 'utf8'): permet de lire le fichier, JSON.parse : transforme le fichier lu en objet exploitable|stockage.js |
|Enregistrer un tableau de données |claude IA|JSON.stringify(): transforme données en texte JSON |stockage.js|
|convertit texte en nombre/ Vérifier qu’un texte est un nombre |MDN |VersNombre(): convertit un texte en nombre/ Number.isNaN(): permet de detecter une valeur qui n'est pas un nombre |registre.js |
|Trouver le minimum et le maximum |Claude IA|on part du premier relevé puis on compare chaque valeur avec < et > pour mettre à jour min et max|synthese.js |
|Calculer une somme avec une boucle|Claude IA|for...of parcourt chaque élément ; on part de 0 et on ajoute à chaque tour (somme = somme + valeur)|synthese.js|
|Arrondir à une décimale|MDN|toFixed(1) arrondit à 1 décimale|synthese.js|
|rouver le premier relevé d’une date|for..of parcourt les relevés dans l’ordre, si releve.date === date, return releve renvoie ce relevé et arrête la fonction : on obtient donc le premier trouvé, si la boucle se termine sans correspondance, return undefined|Claude IA|recherche.js|
|Filtrer les relevés selon un seuil|Claude IA|créer un tableau vide resultat, puis pour chaque relevé où pluieMm >= seuil on fait push. Le >= inclut un relevé dont la pluie est exactement égale au seuil. On renvoie un nouveau tableau ; le journal d’origine n’est pas modifié|recherche.js|
