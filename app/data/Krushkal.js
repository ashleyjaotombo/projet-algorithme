export function KRUSHKAL() {
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

    const arbre = [];

    // --- Création des arêtes ---
    const arretes = [];
    for (let i = 0; i < 10; i++) {
        for (let j = i + 1; j < 10; j++) {
            if (MATRICE[i][j] !== 0) {
                arretes.push({
                    depart: i,
                    arrivee: j,
                    poids: MATRICE[i][j]
                });
            }
        }
    }


    // --- Tri des arêtes ---
    arretes.sort((a, b) => a.poids - b.poids);

    console.log("\nAprès tri :");
    console.log(arretes);



    // Initialisation : chaque ville est dans sa propre composante
    const composante = Array.from({ length: VILLES.length }, (_, i) => i);

    while (arbre.length < VILLES.length - 1) {
        const arete = arretes.shift(); // on prend l'arête la plus légère
        const u = arete.depart;
        const v = arete.arrivee;

        // on ne prend l'arête que si les sommets sont dans des composantes différentes
        if (composante[u] !== composante[v]) {
            arbre.push(arete);

            // Fusion des composantes : toutes les villes de v passent dans celle de u
            const ancienne = composante[v];
            const nouvelle = composante[u];
            for (let i = 0; i < composante.length; i++) {
                if (composante[i] === ancienne) {
                    composante[i] = nouvelle;
                }
            }
        }
    }

    console.log("Arbre couvrant minimal :");
    console.table(arbre.map(a => ({
        de: VILLES[a.depart],
        à: VILLES[a.arrivee],
        poids: a.poids
    })));

    return arbre;
}

/*
export function KRUSHKAL() {
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

    const arbre = [];

    // --- Création des arêtes ---
    const arretes = [];
    for (let i = 0; i < 10; i++) {
        for (let j = i + 1; j < 10; j++) {
            if (MATRICE[i][j] !== 0) {
                arretes.push({
                    depart: i,
                    arrivee: j,
                    poids: MATRICE[i][j]
                });
            }
        }
    }

    // --- Tri des arêtes ---
    arretes.sort((a, b) => a.poids - b.poids);

    // --- Initialisation des composantes ---
    const parent = Array.from({ length: VILLES.length }, (_, i) => i);

    function find(x) {
        if (parent[x] !== x) parent[x] = find(parent[x]); // compression de chemin
        return parent[x];
    }

    function union(x, y) {
        const rx = find(x);
        const ry = find(y);
        if (rx !== ry) parent[ry] = rx;
    }

    // --- Sélection des arêtes ---
    for (const arete of arretes) {
        const { depart, arrivee, poids } = arete;
        if (find(depart) !== find(arrivee)) {
            arbre.push(arete);
            union(depart, arrivee);
        }

        if (arbre.length === VILLES.length - 1) break;
    }

    console.log("Arbre couvrant minimal :");
    console.table(arbre.map(a => ({
        de: VILLES[a.depart],
        à: VILLES[a.arrivee],
        poids: a.poids
    })));
}
    */