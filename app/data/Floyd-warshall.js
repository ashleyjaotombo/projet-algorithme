export function FLOYD_WARSHALL() {

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

    const n = MATRICE.length;
    const dist = [];

    // Initialisation
    for (let i = 0; i < n; i++) {
        dist[i] = [];
        for (let j = 0; j < n; j++) {
            if (i === j) {
                dist[i][j] = 0;
            } else if (MATRICE[i][j] === 0) {
                dist[i][j] = Infinity;
            } else {
                dist[i][j] = MATRICE[i][j];
            }
        }
    }

    // Triple boucle principale de Floyd-Warshall
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    console.log("Matrice des plus courts chemins :");
    for (let i = 0; i < n; i++) {
        const ligne = dist[i].map(val => (val === Infinity ? "∞" : val));
        console.log(`${VILLES[i]} : ${ligne.join(" | ")}`);
    }

    return dist;
}
