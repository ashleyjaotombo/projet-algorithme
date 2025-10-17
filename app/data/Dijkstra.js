export function DIJKSTRA(nomVilleDepart) {

    const VILLES = [
        "Rennes", "Caen", "Lille", "Nantes", "Paris",
        "Dijon", "Nancy", "Bordeaux", "Lyon", "Grenoble"
    ];

    const MATRICE = [
        [0, 75, 0, 45, 110, 0, 0, 130, 0, 0],
        [75, 0, 65, 0, 50, 0, 0, 0, 0, 0],
        [0, 65, 0, 0, 70, 120, 100, 0, 0, 0],
        [45, 0, 0, 0, 80, 0, 0, 90, 0, 0],
        [110, 50, 70, 80, 0, 60, 0, 150, 0, 0],
        [0, 0, 120, 0, 60, 0, 75, 0, 70, 75],
        [0, 0, 100, 0, 0, 75, 0, 0, 90, 80],
        [130, 0, 0, 90, 150, 0, 0, 0, 100, 0],
        [0, 0, 0, 0, 0, 70, 90, 100, 0, 40],
        [0, 0, 0, 0, 0, 75, 80, 0, 40, 0],
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
            if (!visite[v] && MATRICE[u][v] !== 0) {
                const nouvelleDistance = distances[u] + MATRICE[u][v];
                if (nouvelleDistance < distances[v]) {
                    distances[v] = nouvelleDistance;
                    precedent[v] = u;
                }
            }
        }
    }

    // --- Affichage final ---
    console.log(`\nDistances minimales depuis ${nomVilleDepart} :`);
    for (let i = 0; i < VILLES.length; i++) {
        console.log(`${nomVilleDepart} → ${VILLES[i]} = ${distances[i]}`);
    }
}
