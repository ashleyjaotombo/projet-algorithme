const RENNES = [0, 75, 0, 45, 110, 0, 0, 130, 0, 0];
const CAEN = [75, 0, 65, 0, 50, 0, 0, 0, 0, 0];
const LILLE = [0, 65, 0, 70, 120, 100, 0, 0, 0, 0];
const NANTES = [45, 0, 70, 0, 80, 0, 0, 90, 0, 0];
const PARIS = [110, 50, 120, 80, 0, 60, 0, 150, 0, 0];
const DIJON = [0, 0, 100, 0, 60, 0, 75, 0, 70, 75];
const NANCY = [0, 0, 0, 0, 0, 75, 0, 0, 90, 80];
const BORDEAUX = [130, 0, 0, 90, 150, 0, 0, 0, 100, 40];
const LYON = [0, 0, 0, 0, 0, 70, 90, 100, 0, 40];
const GRENOBLE = [0, 0, 0, 0, 0, 75, 80, 40, 40, 0];

export const MATRICE = [
    RENNES, CAEN, LILLE, NANTES, PARIS,
    DIJON, NANCY, BORDEAUX, LYON, GRENOBLE
];

export const VILLES = [
    "Rennes", "Caen", "Lille", "Nantes", "Paris",
    "Dijon", "Nancy", "Bordeaux", "Lyon", "Grenoble"
];

// --- Parcours en largeur pondéré (par nom) ---
export function BFS(nomVilleDepart) {
    const depart = VILLES.indexOf(nomVilleDepart);

    // Vérifie que la ville existe
    if (depart === -1) {
        console.error(`⚠️ Ville "${nomVilleDepart}" inconnue.`);
        console.log("Villes disponibles :", VILLES.join(", "));
        return;
    }

    const etat = [];
    const pere = [];
    const atraiter = [];

    // Initialisation
    for (let x = 0; x < MATRICE.length; x++) {
        etat[x] = "Non vu";
        pere[x] = null;
    }

    let i = 0;
    let j = 0;

    // Enfile la ville de départ
    atraiter[j++] = depart;
    etat[depart] = "Vu";

    console.log(`🚀 Début du parcours depuis ${nomVilleDepart}\n`);

    // --- Boucle principale ---
    while (i < j) {
        const y = atraiter[i++]; // défiler
        console.log(`→ Visite de ${VILLES[y]}`);

        // Récupère les successeurs non vus avec leur poids
        const successeurs = [];
        for (let z = 0; z < MATRICE.length; z++) {
            if (MATRICE[y][z] !== 0 && etat[z] === "Non vu") {
                successeurs.push({ index: z, poids: MATRICE[y][z] });
            }
        }

        // Trie les successeurs selon le poids croissant
        successeurs.sort((a, b) => a.poids - b.poids);

        // Enfile les voisins selon la priorité du poids
        for (const { index: z, poids } of successeurs) {
            etat[z] = "Vu";
            pere[z] = y;
            atraiter[j++] = z;
            console.log(`   ↳ ${VILLES[z]} (poids ${poids})`);
        }
    }

    // --- Affichage des résultats ---
    console.log("\n--- Résultats finaux ---");
    console.log("Ordre de visite :", atraiter.map(i => VILLES[i]).join(" → "));
    console.log("Pères :", pere.map(p => (p !== null ? VILLES[p] : "null")));

    return { etat, pere, atraiter };
}
