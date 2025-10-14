const RENNES = [0, 2, 0, 8, 9, 0, 0, 1, 0, 0];
const CAEN = [10, 0, 5, 0, 9, 0, 0, 0, 0, 0];
const LILLE = [0, 2, 0, 0, 9, 3, 7, 0, 0, 0];
const NANTES = [10, 0, 0, 0, 9, 0, 0, 1, 0, 0];//
const PARIS = [10, 2, 5, 8, 0, 3, 0, 1, 0, 0];
const DIJON = [0, 0, 5, 0, 9, 0, 7, 0, 6, 4];
const NANCY = [0, 0, 5, 0, 0, 3, 0, 0, 6, 4];
const BORDEAUX = [10, 0, 0, 8, 9, 0, 0, 0, 6, 0];
const LYON = [0, 0, 0, 0, 0, 3, 7, 1, 0, 4];
const GRENOBLE = [0, 0, 0, 0, 0, 3, 7, 0, 6, 0];

//Les coefficients du dessus correspondents à cet ordre alphabétique pour le parcours
//Bordeaux : 1, Caen : 2, Dijon : 3, Grenoble : 4, Lille : 5, Lyon : 6, Nancy : 7, Nantes : 8, Paris : 9, Rennes : 10

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
            atraiter[j++] = { depart: y, arrivee: z, poids: MATRICE[y][z], départs: VILLES[y], arrivees: VILLES[z] };
            console.log("Atraiter : ", atraiter[j - 1]);
        }
    }

    const results = atraiter.map(i => VILLES[i.arrivee]).join(" → ");


    return { atraiter, results };
}
