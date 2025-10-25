export function BELLMANFORD(nomVilleDepart) {
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
        return null;
    }

    // --- Initialisation ---
    const distances = Array(VILLES.length).fill(Infinity);
    const precedent = Array(VILLES.length).fill(null);
    distances[depart] = 0;

    // --- Création de la liste des arêtes ---
    const arretes = [];
    for (let i = 0; i < VILLES.length; i++) {
        for (let j = 0; j < VILLES.length; j++) {
            if (MATRICE[i][j] !== 0) {
                arretes.push({ u: i, v: j, poids: MATRICE[i][j] });
            }
        }
    }

    // --- Relaxation ---
    for (let k = 0; k < VILLES.length - 1; k++) {
        for (const { u, v, poids } of arretes) {
            if (distances[u] + poids < distances[v]) {
                distances[v] = distances[u] + poids;
                precedent[v] = u;
            }
        }
    }

    // --- Détection de cycle négatif ---
    for (const { u, v, poids } of arretes) {
        if (distances[u] + poids < distances[v]) {
            console.error("⚠️ Le graphe contient un cycle de poids négatif !");
            return null;
        }
    }

    // --- Fonction pour reconstruire le chemin en indices ---
    function getChemin(villeArrivee) {
        const indexArrivee = VILLES.indexOf(villeArrivee);
        if (indexArrivee === -1) {
            console.error("Ville inconnue :", villeArrivee);
            return [];
        }

        const chemin = [];
        let current = indexArrivee;

        while (current !== null) {
            chemin.unshift(current);
            current = precedent[current];
        }

        return chemin[0] === depart ? chemin : [];
    }

    console.log(`\nDistances minimales depuis ${nomVilleDepart} (Bellman-Ford):`);
    for (let i = 0; i < VILLES.length; i++) {
        console.log(`${nomVilleDepart} → ${VILLES[i]} = ${distances[i]}`);
    }

    // --- Retour simplifié ---
    return {
        villes: VILLES,
        distances,
        getChemin,
    };
}
