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

    const depart = VILLES.indexOf(nomVilleDepart);
    if (depart === -1) return;

    const n = MATRICE.length;
    const vu = Array(n).fill(false);
    const pere = Array(n).fill(null);
    const ordre = [];
    const atraiter = []; // 🔹 on enregistre chaque transition {depart, arrivee, poids}

    //  Fonction récursive
    function explorer(u) {
        vu[u] = true;
        ordre.push(u);

        // Liste des voisins non visités
        const voisins = [];
        for (let v = 0; v < n; v++) {
            if (MATRICE[u][v] !== 0 && !vu[v]) {
                voisins.push({ index: v, poids: MATRICE[u][v] });
            }
        }

        // Trie les voisins par poids croissant
        voisins.sort((a, b) => {
            const nomA = VILLES[a.index];
            const nomB = VILLES[b.index];
            return nomA.localeCompare(nomB);
        });

        // Explore récursivement
        for (const { index: v, poids } of voisins) {
            if (!vu[v]) {
                pere[v] = u;
                atraiter.push({ depart: u, arrivee: v, poids }); //  on récupère l'arc
                explorer(v);
            }
        }
    }

    explorer(depart);

    const results = ordre.map(i => VILLES[i]).join(" → ");

    // 🔹 on retourne à la fois la liste des arêtes et la chaîne lisible
    return { atraiter, results };
}
