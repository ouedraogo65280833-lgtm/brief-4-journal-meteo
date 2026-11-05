// Journal météorologique de la ferme — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { ajouterReleve, formaterReleve, listerReleves, trouverParId } from './src/registre.js';
import { SEUIL_JOUR_PLUVIEUX, joursPluvieux, trierParPluie, trierParTemperature, trouverParDate } from './src/recherche.js';
import { cumulPluie, moyenneTemperature, temperatureMinMax } from './src/synthese.js';
import { journeeLaPlusChaude, modifierReleve, supprimerReleve, trierParTemperatureDecroissante } from './src/bonus.js';

const FICHIER_DONNEES = 'donnees/releves.json';

function afficherAccueil() {
  console.log('==================================================');
  console.log('   JOURNAL MÉTÉOROLOGIQUE DE LA FERME');
  console.log('   Suivi agroclimatique de la ferme pédagogique');
  console.log('==================================================');
}
 
function afficherMenu() {
  console.log('');
  console.log('--------------------- MENU ---------------------');
  console.log('1. Ajouter un relevé');
  console.log('2. Lister les relevés');
  console.log('3. Rechercher (identifiant, date, journées pluvieuses)');
  console.log('4. Trier (température, pluie)');
  console.log('5. Synthèse de la série');
  console.log('6. Supprimer un relevé');
  console.log('7. Modifier un relevé');
  console.log('0. Quitter');
}
function actionLister(releves) {
  console.log(`--- Liste des relevés (${releves.length}) ---`);
  console.log(listerReleves(releves));
}
async function actionAjouter(releves) {
  console.log('--- Ajouter un relevé ---');
  const id = await demander('Identifiant (ex. M11) : ');
  if (id === null) {
    return;
  }
  const date = await demander('Date du relevé (AAAA-MM-JJ) : ');
  if (date === null) {
    return;
  }
  const temperature = await demander('Température en °C : ');
  if (temperature === null) {
    return;
  }
  const pluie = await demander('Pluie en mm : ');
  if (pluie === null) {
    return;
  }
  const humidite = await demander("Humidité relative de l'air en % : ");
  if (humidite === null) {
    return;
  }
  const saisie = {
    id: id.toUpperCase(),
    date: date,
    temperatureC: temperature,
    pluieMm: pluie,
    humiditeAirPct: humidite,
  };
  const erreurs = ajouterReleve(releves, saisie);
  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, releves);
    console.log(`Relevé ${saisie.id} ajouté. Le journal compte ${releves.length} relevé(s).`);
  } else {
    console.log('Relevé refusé :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
    console.log(`Le journal compte toujours ${releves.length} relevé(s).`);
  }
}
async function actionRechercher(releves) {
  console.log('--- Rechercher ---');
  console.log('1. Par identifiant');
  console.log('2. Par date');
  console.log(`3. Les journées pluvieuses (au moins ${SEUIL_JOUR_PLUVIEUX} mm)`);
 
  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) {
    return;
  }
 
  if (sousChoix === '1') {
    const saisie = await demander('Identifiant : ');
    if (saisie === null) {
      return;
    }
    const id = saisie.toUpperCase();
    const releve = trouverParId(releves, id);
    if (releve === undefined) {
      console.log(`Relevé ${id} introuvable.`);
    } else {
      console.log(formaterReleve(releve));
    }
  } else if (sousChoix === '2') {
    const date = await demander('Date (AAAA-MM-JJ) : ');
    if (date === null) {
      return;
    }
    const releve = trouverParDate(releves, date);
    if (releve === undefined) {
      console.log(`Relevé du ${date} introuvable.`);
    } else {
      console.log(formaterReleve(releve));
    }
  } else if (sousChoix === '3') {
    const pluvieux = joursPluvieux(releves, SEUIL_JOUR_PLUVIEUX);
    console.log(`${pluvieux.length} journée(s) avec au moins ${SEUIL_JOUR_PLUVIEUX} mm de pluie :`);
    console.log(listerReleves(pluvieux));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}
async function actionTrier(releves) {
  console.log('--- Trier ---');
  console.log('1. Par température croissante');
  console.log('2. Par pluie croissante');
  console.log('3. Par température décroissante');
 
  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) {
    return;
  }
 
  if (sousChoix === '1') {
    console.log(listerReleves(trierParTemperature(releves)));
  } else if (sousChoix === '2') {
    console.log(listerReleves(trierParPluie(releves)));
  } else if (sousChoix === '3') {
    console.log(listerReleves(trierParTemperatureDecroissante(releves)));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}
function actionSynthese(releves) {
  console.log('--- Synthèse de la série ---');
  console.log(`Nombre de relevés : ${releves.length}`);
 
  const moyenne = moyenneTemperature(releves);
  if (moyenne === null) {
    console.log('Température moyenne : aucune donnée');
  } else {
    console.log(`Température moyenne : ${moyenne} °C`);
  }
  const extremes = temperatureMinMax(releves);
  if (extremes === null) {
    console.log('Températures minimale et maximale : aucune donnée');
  } else {
    console.log(`Température minimale : ${extremes.min} °C · maximale : ${extremes.max} °C`);
  }
  console.log(`Cumul de pluie : ${cumulPluie(releves)} mm`);
  const pluvieux = joursPluvieux(releves, SEUIL_JOUR_PLUVIEUX);
  console.log(`Journées avec au moins ${SEUIL_JOUR_PLUVIEUX} mm de pluie : ${pluvieux.length}`);
    const chaude = journeeLaPlusChaude(releves);
  if (chaude === null) {
    console.log('Journée la plus chaude : aucune donnée');
  } else {
    console.log(`Journée la plus chaude : ${formaterReleve(chaude)}`);
  }
  console.log('Rappels :');
  console.log('  - Quelques jours de relevés forment une courte série météo : ils ne décrivent pas le climat de la région.');
  console.log(`  - Le seuil de ${SEUIL_JOUR_PLUVIEUX} mm est une catégorie d'exercice : il ne prévoit ni inondation ni stress hydrique.`);
  console.log("  - L'humidité relative de l'air (en %) n'est pas l'humidité du sol.");
}
async function actionSupprimer(releves) {
  console.log('--- Supprimer un relevé ---');
  const saisie = await demander('Identifiant : ');
  if (saisie === null) {
    return;
  }
  const id = saisie.toUpperCase();
  const supprime = supprimerReleve(releves, id);
  if (supprime === undefined) {
    console.log(`Relevé ${id} introuvable.`);
  } else {
    await enregistrerJson(FICHIER_DONNEES, releves);
    console.log(`Relevé ${id} supprimé. Le journal compte ${releves.length} relevé(s).`);
  }
}

async function actionModifier(releves) {
  console.log('--- Modifier un relevé ---');
  const saisie = await demander('Identifiant : ');
  if (saisie === null) {
    return;
  }
  const id = saisie.toUpperCase();
  const champ = await demander('Champ à modifier (date, temperatureC, pluieMm, humiditeAirPct) : ');
  if (champ === null) {
    return;
  }
  const valeur = await demander('Nouvelle valeur : ');
  if (valeur === null) {
    return;
  }
  const erreurs = modifierReleve(releves, id, champ, valeur);
  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, releves);
    console.log(`Relevé ${id} modifié.`);
  } else {
    console.log('Modification refusée :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
  }
}
async function main() {
  ouvrirSaisie();
  afficherAccueil();
  let releves;
  try {
    releves = await chargerJson(FICHIER_DONNEES);
    console.log(`${releves.length} relevé(s) chargé(s) depuis ${FICHIER_DONNEES}.`);
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le journal démarre vide.`);
    releves = [];
  }
  let continuer = true;
  while (continuer) {
    afficherMenu();
    const choix = await demander('Votre choix : ');
 
    if (choix === null || choix === '0') {
      console.log('Au revoir !');
      continuer = false;
    } else {
      try {
        switch (choix) {
          case '1':
            await actionAjouter(releves);
            break;
          case '2':
            actionLister(releves);
            break;
          case '3':
            await actionRechercher(releves);
            break;
          case '4':
            await actionTrier(releves);
            break;
          case '5':
            actionSynthese(releves);
            break;
                      case '6':
            await actionSupprimer(releves);
            break;
          case '7':
            await actionModifier(releves);
            break;
          default:
            console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
        }
      } catch (erreur) {
        if (erreur.message.startsWith('TODO')) {
          console.log(`À compléter : ${erreur.message}`);
        } else {
          console.log(`Erreur inattendue : ${erreur.message}`);
        }
      }
    }
  }
  fermerSaisie();
}
main();