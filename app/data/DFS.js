export function DFS(nomVilleDepart) {
    const VILLES = [
        "Rennes", "Caen", "Lille", "Nantes", "Paris",
        "Dijon", "Nancy", "Bordeaux", "Lyon", "Grenoble"
    ];
    const MATRICE = [
        [0, 75, 0, 45, 110, 0, 0, 130, 0, 0],
        [75, 0, 65, 0, 50, 0, 0, 0, 0, 0],
        [0, 65, 0, 70, 120, 100, 0, 0, 0, 0],
        [45, 0, 70, 0, 80, 0, 0, 90, 0, 0],
        [110, 50, 120, 80, 0, 60, 0, 150, 0, 0],
        [0, 0, 100, 0, 60, 0, 75, 0, 70, 75],
        [0, 0, 0, 0, 0, 75, 0, 0, 90, 80],
        [130, 0, 0, 90, 150, 0, 0, 0, 100, 0],
        [0, 0, 0, 0, 0, 70, 90, 100, 0, 40],
        [0, 0, 0, 0, 0, 75, 80, 0, 40, 0],
    ];

    const start = VILLES.indexOf(nomVilleDepart);
    if (start === -1) { console.error("Ville inconnue:", nomVilleDepart); return; }

    const n = MATRICE.length;
    const vu = Array(n).fill(false);
    const pere = Array(n).fill(null);
    const ordre = [];

    function explorer(u) {
        vu[u] = true;
        ordre.push(u);

        // voisins non vus triés par poids croissant
        const voisins = [];
        for (let v = 0; v < n; v++) {
            if (MATRICE[u][v] !== 0 && !vu[v]) voisins.push([v, MATRICE[u][v]]);
        }
        voisins.sort((a, b) => a[1] - b[1]);

        for (const [v] of voisins) {
            if (!vu[v]) { pere[v] = u; explorer(v); }
        }
    }

    explorer(start);

    console.log("Ordre de visite :", ordre.map(i => VILLES[i]).join(" → "));
    return { ordre: ordre.map(i => VILLES[i]), pere: pere.map(p => p === null ? null : VILLES[p]) };
}
