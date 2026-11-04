// Rechercher et trier les relevés.
// Fiche : fiches/4-rechercher-trier.md · Vérifier : npm run test:recherche

// Seuil d'exercice pour compter une « journée pluvieuse », en mm.
// Ce n'est pas un seuil d'alerte : il ne prévoit ni inondation ni stress hydrique.
export const SEUIL_JOUR_PLUVIEUX = 10;

// Renvoie le premier relevé fait à cette date (texte AAAA-MM-JJ), ou undefined s'il n'y en a pas.
export function trouverParDate(releves, date) {
 for (const releve of releves) {
    if (releve.date === date) {
      return releve;
    }
  }
  return undefined;
}

// Renvoie un NOUVEAU tableau avec les relevés dont la pluie est SUPÉRIEURE OU ÉGALE au seuil (en mm).
export function joursPluvieux(releves, seuil) {
  const resultat = [];
  for (const releve of releves) {
    if (releve.pluieMm >= seuil) {
      resultat.push(releve);
    }
  }
  return resultat;
}

// Renvoie une COPIE triée par température croissante, avec un comparateur numérique.
// Deux relevés égaux gardent leur ordre d'origine. Le tableau reçu ne doit pas changer d'ordre.
export function trierParTemperature(releves) {
   const copie = releves.slice();
  copie.sort(function (a, b) {
    return a.temperatureC - b.temperatureC;
  });
  return copie;
}

// Renvoie une COPIE triée par pluie croissante, avec un comparateur numérique.
// Deux relevés égaux gardent leur ordre d'origine. Le tableau reçu ne doit pas changer d'ordre.
export function trierParPluie(releves) {
  const copie = releves.slice();
  copie.sort(function (a, b) {
    return a.pluieMm - b.pluieMm;
  });
  return copie;
}