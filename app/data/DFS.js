export function DFS(nomVilleDepart) {
    const RENNES = [0, 75, 0, 45, 110, 0, 0, 130, 0, 0];
    const CAEN = [75, 0, 65, 0, 50, 0, 0, 0, 0, 0];
    const LILLE = [0, 65, 0, 0, 70, 120, 100, 0, 0, 0];
    const NANTES = [45, 0, 0, 0, 80, 0, 0, 90, 0, 0];
    const PARIS = [110, 50, 70, 80, 0, 60, 0, 150, 0, 0];
    const DIJON = [0, 0, 120, 0, 60, 0, 75, 0, 70, 75];
    const NANCY = [0, 0, 100, 0, 0, 75, 0, 0, 90, 80];
    const BORDEAUX = [130, 0, 0, 90, 150, 0, 0, 0, 100, 0];
    const LYON = [0, 0, 0, 0, 0, 70, 90, 100, 0, 40];
    const GRENOBLE = [0, 0, 0, 0, 0, 75, 80, 0, 40, 0];

    const MATRICE = [
        RENNES, CAEN, LILLE, NANTES, PARIS,
        DIJON, NANCY, BORDEAUX, LYON, GRENOBLE
    ];

    const VILLES = [
        "Rennes", "Caen", "Lille", "Nantes", "Paris",
        "Dijon", "Nancy", "Bordeaux", "Lyon", "Grenoble"
    ];

    //On récupère l'index de la ville séléctionnée dans notre tableau VILLES
    const depart = VILLES.indexOf(nomVilleDepart);

    const n = MATRICE.length;

    //Initialisation du tableau Vu avec false
    const vu = [n];
    for (let i = 0; i < n; i++) {
        vu[i] = false;
    }

    //Initialisation du tableau pere avec null
    const pere = [n];
    for (let i = 0; i < n; i++) {
        pere[i] = null;
    }

    //Initialisation du tableau qui contiendra l'ordre des sommets parcourus
    const ordre = [];

    //Définition de notre fonction récursive
    function explorer(u) {
        vu[u] = true;
        ordre.push(u);

        // On récupère les voisins du sommet courant
        const voisins = [];

        for (let v = 0; v < n; v++) {
            if (MATRICE[u][v] !== 0 && !vu[v]) voisins.push([v, MATRICE[u][v]]);
            // exemple de push [1, 180] (1 pour sommet Rennes et 180 pour le poids)
        }
        //On trie les voisins selon leurs poids (croissant)
        voisins.sort((a, b) => a[1] - b[1]);

        //On explore tous les voisins du sommet courant
        for (const [v] of voisins) {
            if (!vu[v]) { pere[v] = u; explorer(v); }
        }
    }

    explorer(depart);

    const results = ordre.map(i => VILLES[i]).join(" → ");

    return results;
}
