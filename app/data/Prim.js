export function PRIM(nomVilleDepart) {
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
    const visite = Array(VILLES.length).fill(false);
    const debut = VILLES.indexOf(nomVilleDepart);
    visite[debut] = true; //Initialisation du début par rapoort au paramètre

    while (arbre.length < VILLES.length - 1) {
        let minPoids = Infinity;
        let u = -1;
        let v = -1;

        // Parcourt toutes les arêtes reliant un sommet visité à un non visité
        for (let i = 0; i < VILLES.length; i++) {
            if (visite[i]) {
                for (let j = 0; j < VILLES.length; j++) {
                    if (!visite[j] && MATRICE[i][j] !== 0 && MATRICE[i][j] < minPoids) {
                        minPoids = MATRICE[i][j];
                        u = i;
                        v = j;
                    }
                }
            }
        }

        if (u !== -1 && v !== -1) {
            arbre.push({ depart: u, arrivee: v, poids: minPoids });
            visite[v] = true; // on ajoute la nouvelle ville
        } else {
            console.error("Le graphe n'est pas connexe !");
            break;
        }
    }

    console.log("Arbre couvrant minimal (Prim) :");
    console.table(arbre.map(a => ({
        de: VILLES[a.depart],
        à: VILLES[a.arrivee],
        poids: a.poids
    })));

    return arbre;
}