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

  // Initialisation des tableaux de distances et de parents
  const distances = Array(VILLES.length).fill(Infinity);
  const precedent = Array(VILLES.length).fill(null);
  distances[depart] = 0;

  // Création de toutes les arêtes
  const arretes = [];
  //On va parcourir toutes les arêtes de chaque sommet
  for (let i = 0; i < VILLES.length; i++) {
    for (let j = 0; j < VILLES.length; j++) {
      //S'il existe un noeud entre les deux sommets, on push l'arête
      if (matrice[i][j] !== 0) {
        arretes.push({ u: i, v: j, poids: matrice[i][j] });
      }
    }
  }

  // Relaxation pour identifier les arêtes optimales
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

  // Fonction facultative pour reconstruire le chemin à afficher sur l'interface graphique
  function getChemin(villeArrivee) {
    const indexArrivee = VILLES.indexOf(villeArrivee);
    //Si la ville n'existe pas
    if (indexArrivee === -1) {
        console.error("Ville inconnue :", villeArrivee);
        return [];
    }

    const chemin = [];
    let current = indexArrivee;

    //On part du noeud final, et on remonte tous les parents
    //La boucle s'arrête quand le parent est nulle
    while (current !== null) {
        const to = current;   //to stock l'enfant
        const from = precedent[current];  //from stocke le parent
        
        //Si le parent et l'enfant existe, on stocke le noeud
        if (to !== null && from !== null){
            chemin.unshift({depart : from, arrivee : to, poids: matrice[from][to]});
        }
        current = from;
    }
    //Si le chemin est nulle, on retourne un tableau vide d'arêtes
    if (chemin.length === 0) return [];

    //Sinon on retourne le tableau des arêtes constituant le chemin
    return chemin;
  }


  //L'algorithme de Bellman-Ford nous renvoie le tableau de distances entre le sommet initiale avec tous les autres sommets,
  //et aussi la fonction getChemin qu'on affichera sur l'interface graphique
  return {
    distances,
    getChemin,
  };
}
