export function KRUSHKAL(){
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


    const valArrete = [];
    const nomArrete = [];
    const arbre = []; // arbre vide

    for (let i = 0; i <10; i++){
        for (let j= i+1; j<10; j++){
            if (MATRICE[i][j] !== 0){
                valArrete.push(MATRICE[i][j]);
                
                nomArrete.push(i + "-" + j);
            }
        }
    }
    nomArrete = nomArrete.split("-")
    console.log("test : i +" + nomArrete[0][0] + "j :" + nomArrete[0][1] )
    console.log("Affichage des noms:")
    console.log(nomArrete);
    console.log("Affichage des valeurs:")
    console.log(valArrete);

    // tri des arretes
    
    let n = valArrete.length;
    let permut;

    do {
        permut = false;
        for (let i = 0; i < n - 1; i++) {
            if (valArrete[i] > valArrete[i + 1]) {
                // échange des valeurs 
                let temp = valArrete[i];
                valArrete[i] = valArrete[i + 1];
                valArrete[i + 1] = temp;
                
                //echage des noms
                let temp2 = nomArrete[i];
                nomArrete[i] = nomArrete[i+1];
                nomArrete[i + 1] = temp2;

                permut = true;
            }
        }
        n--; // optimisation : la dernière case est déjà triée
    } while (permut);


    console.log("TRI DES VALEURS \n")
    console.log("Affichage des noms:")
    console.log(nomArrete);
    console.log("Affichage des valeurs:")
    console.log(valArrete);


    //choix des aretes

    
}