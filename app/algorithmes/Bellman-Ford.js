export function BELLMANFORD(nomVilleDepart, matrice) {
  const VILLES = [
    "Rennes", "Caen", "Lille", "Nantes", "Paris",
    "Dijon", "Nancy", "Bordeaux", "Lyon", "Grenoble"
  ];


  const depart = VILLES.indexOf(nomVilleDepart);
  if (depart === -1) {
    console.error("Ville inconnue :", nomVilleDepart);
    return null;
  }

  // Initialisation
  const distances = Array(VILLES.length).fill(Infinity);
  const precedent = Array(VILLES.length).fill(null);
  distances[depart] = 0;

  // Création des arêtes
  const arretes = [];
  for (let i = 0; i < VILLES.length; i++) {
    for (let j = 0; j < VILLES.length; j++) {
      if (matrice[i][j] !== 0) {
        arretes.push({ u: i, v: j, poids: matrice[i][j] });
      }
    }
  }

  // Relaxation
  for (let k = 0; k < VILLES.length - 1; k++) {
    for (const { u, v, poids } of arretes) {
      if (distances[u] + poids < distances[v]) {
        distances[v] = distances[u] + poids;
        precedent[v] = u;
      }
    }
  }

  // Détection de cycle négatif
  for (const { u, v, poids } of arretes) {
    if (distances[u] + poids < distances[v]) {
      console.error("Le graphe contient un cycle de poids négatif !");
      return null;
    }
  }

  // Fonction pour reconstruire le chemin 
  function getChemin(villeArrivee) {
    const indexArrivee = VILLES.indexOf(villeArrivee);
    if (indexArrivee === -1) {
        console.error("Ville inconnue :", villeArrivee);
        return [];
    }


    const chemin = [];
    let current = indexArrivee;

    while (current !== null) {
        const to = current;
        const from = precedent[current];
        if (to !== null && from !== null){
            chemin.unshift({depart : from, arrivee : to, poids: matrice[from][to]});
        }
        current = from;
    }

    if (chemin.length === 0) return [];
    return chemin;
  }

  return {
    distances,
    getChemin,
  };
}
