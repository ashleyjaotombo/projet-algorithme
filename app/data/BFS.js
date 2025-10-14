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

// Parcours en largeur pondéré
export function BFS(nomVilleDepart) {
    //On récupère l'index de la ville séléctionnée dans notre tableau VILLES
    const depart = VILLES.indexOf(nomVilleDepart);

    if (depart == -1) return;

    //On initialise les tableaux etat, pere et atraiter
    const etat = [];
    const pere = [];
    const atraiter = [];

    // Initialisation de nos tableaux
    for (let x = 0; x < MATRICE.length; x++) {
        etat[x] = "Non vu";
        pere[x] = null;
    }

    let i = 0;
    let j = 0;

    // On démarre avec la ville de départ
    atraiter[j] = { depart: depart, arrivee: depart, poids: 0 };
    j += 1;
    etat[depart] = "Vu";


    // On commence la boucle principale
    while (i < j) {
        const y = atraiter[i].arrivee;
        i++;

        // On récupère les successeurs non vus en prenant en compte leur poids
        const successeurs = [];
        for (let z = 0; z < MATRICE.length; z++) {
            if (MATRICE[y][z] !== 0 && etat[z] === "Non vu") {
                successeurs.push({ index: z, poids: MATRICE[y][z] });
                //MATRICE[y][z] représente le poids, qui nous aidera à trier dans l'ordre croissant les sommets pouvant être parcourus en même temps
            }
        }

        // Trie les successeurs selon le poids croissant
        successeurs.sort((a, b) => {
            const nomA = VILLES[a.index];
            const nomB = VILLES[b.index];
            return nomA.localeCompare(nomB);
        });

        // Enfile les voisins selon la priorité du poids
        for (const { index: z } of successeurs) {
            etat[z] = "Vu";
            pere[z] = y;
            atraiter[j++] = { depart: y, arrivee: z, poids: MATRICE[y][z] };
        }
    }

    const results = atraiter.map(i => VILLES[i.arrivee]).join(" → ");


    return { atraiter, results };
}
