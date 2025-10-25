export function DIJKSTRA(nomVilleDepart, matrice) {

    const VILLES = [
        "Rennes", "Caen", "Lille", "Nantes", "Paris",
        "Dijon", "Nancy", "Bordeaux", "Lyon", "Grenoble"
    ];


    const depart = VILLES.indexOf(nomVilleDepart);
    if (depart === -1) {
        console.error("Ville inconnue :", nomVilleDepart);
        return null;;
    }

    const distances = Array(VILLES.length).fill(Infinity);
    const precedent = Array(VILLES.length).fill(null);
    const visite = Array(VILLES.length).fill(false);

    distances[depart] = 0;

    // Algorithme principal
    for (let i = 0; i < VILLES.length - 1; i++) {

        // Trouver la ville non visitée avec la plus petite distance
        let minDistance = Infinity;
        let u = -1;
        for (let j = 0; j < VILLES.length; j++) {
            if (!visite[j] && distances[j] < minDistance) {
                minDistance = distances[j];
                u = j;
            }
        }

        if (u === -1) break; // aucune ville accessible restante
        visite[u] = true;

        // Mise à jour des distances vers les voisines de u
        for (let v = 0; v < VILLES.length; v++) {
            if (!visite[v] && matrice[u][v] !== 0) {
                const nouvelleDistance = distances[u] + matrice[u][v];
                if (nouvelleDistance < distances[v]) {
                    distances[v] = nouvelleDistance;
                    precedent[v] = u;
                }
            }
        }
    }

    //  Fonction facultative pour reconstruire le chemin
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
      if (to !== null && from !== null) {
        chemin.unshift({
          depart: from,
          arrivee: to,
          poids: matrice[from][to],
        });
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
