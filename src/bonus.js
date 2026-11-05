// BONUS — Pour aller plus loin. Facultatif : commencez seulement quand le socle est complet.
// Fiche : fiches/7-bonus.md · Vérifier : npm run test:bonus
// Pas de modèle pour ce fichier : à vous de combiner ce que vous avez appris.
import {creerReleve, trouverParId, verifierReleve } from './registre.js';

// Les champs qu'on a le droit de modifier. L'identifiant n'en fait pas partie.
export const CHAMPS_MODIFIABLES = ['date', 'temperatureC', 'pluieMm', 'humiditeAirPct'];

// Retire du journal le relevé qui a cet identifiant.
// Renvoie le relevé retiré, ou undefined s'il n'existe pas : le journal ne change pas.
export function supprimerReleve(releves, id) {
 const position = releves.findIndex(function (releve) {
    return releve.id === id;
  });
  if (position === -1) {
    return undefined;
  }
  const retires = releves.splice(position, 1);
  return retires[0];
}


// Modifie UN champ du relevé qui a cet identifiant. La nouvelle valeur arrive sous forme de TEXTE.
// Renvoie un tableau de messages d'erreur ; [] si la modification est faite.
// Vérifiez dans cet ordre et arrêtez-vous au premier problème : identifiant inconnu (une erreur)
// · champ 'id', non modifiable (une erreur) · champ absent de CHAMPS_MODIFIABLES (une erreur)
// · valeur refusée par les règles de l'ajout (leurs erreurs). En cas d'erreur, le relevé ne change pas.
// Exemple : modifierReleve(releves, 'M03', 'pluieMm', '11') → [] et M03 a maintenant 11 mm (un nombre).
export function modifierReleve(releves, id, champ, valeur) {
 const releve = trouverParId(releves, id);
  if (releve === undefined) {
    return ['Identifiant introuvable.'];
  }
  if (champ === 'id') {
    return ["L'identifiant ne peut pas être modifié."];
  }
  if (!CHAMPS_MODIFIABLES.includes(champ)) {
    return ["Ce champ n'existe pas ou n'est pas modifiable."];
  }

  // Les autres relevés (sans celui qu'on modifie) pour éviter le faux doublon
  const autres = releves.filter(function (r) {
    return r.id !== id;
  });

  // La saisie = le relevé actuel avec la nouvelle valeur
  const saisie = {
    id: releve.id,
    date: releve.date,
    temperatureC: releve.temperatureC,
    pluieMm: releve.pluieMm,
    humiditeAirPct: releve.humiditeAirPct,
  };
  saisie[champ] = valeur;

  const erreurs = verifierReleve(saisie, autres);
  if (erreurs.length > 0) {
    return erreurs;
  }

  const nouveau = creerReleve(saisie);
  releve[champ] = nouveau[champ];
  return [];
}

// Renvoie une COPIE triée par température décroissante : la plus chaude d'abord.
export function trierParTemperatureDecroissante(releves) {
  const copie = releves.slice();
  copie.sort(function (a, b) {
    return b.temperatureC - a.temperatureC;
  });
  return copie;
}
// Renvoie le relevé dont la température est la plus haute (le premier en cas d'égalité),
// ou null si la liste est vide.
export function journeeLaPlusChaude(releves) {
  if (releves.length === 0) {
    return null;
  }
  let plusChaude = releves[0];
  for (const releve of releves) {
    if (releve.temperatureC > plusChaude.temperatureC) {
      plusChaude = releve;
    }
  }
  return plusChaude;
}