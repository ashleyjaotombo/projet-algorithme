export function DIJKSTRA(nomVilleDepart, matrice) {

    const VILLES = [
        "Rennes", "Caen", "Lille", "Nantes", "Paris",
        "Dijon", "Nancy", "Bordeaux", "Lyon", "Grenoble"
    ];


    const depart = VILLES.indexOf(nomVilleDepart);
    if (depart === -1) {
        console.error("Ville inconnue :", nomVilleDepart);
        return;
    }

    const distances = Array(VILLES.length).fill(Infinity);
    const precedent = Array(VILLES.length).fill(null);
    const visite = Array(VILLES.length).fill(false);

    distances[depart] = 0;

    // --- Algorithme principal ---
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

    return distances;
}
