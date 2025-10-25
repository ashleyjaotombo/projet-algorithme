<template>
 <v-col class="w-100 ma-0" cols="12">
   <p class="text-button text-green text-center font-weight-bold mb-4">
     Algorithme de chemin le plus court (Dijkstra)
   </p>


   <v-row>
     <v-col cols="7">
       <RetourButton/>
      
       <p class="ml-2 font-weight-medium">
         Graphe de référence pour les algorithmes :
       </p>
       <GrapheDisplay v-if="graphe==='énnoncé'" v-model="chemin" class="w-100" style="height: 600px;"/>
       <GraphePoidsPositif v-else-if="graphe==='orienté'" v-model="chemin" class="w-100" style="height: 600px;" />
       <GraphePoidsNegatif v-else v-model="chemin" class="w-100" style="height: 600px;" />
     </v-col>


     <v-col cols="5" class="d-flex align-center justify-center px-4">
       <v-container>
         <p class="text-caption mb-6 text-red">
           Vous pouvez changer l'organisation du graphe manuellement en glissant les sommets.
           Vous pouvez également actualiser la page pour forcer la restructuration.
         </p>


         <v-select
           v-model="ville"
           :items="villes"
           label="Choisir une ville de départ"
           density="compact"
         />


         <v-switch
            v-if="ville"
            v-model="graphe"
            :label="`Utiliser le graphe du projet (si non : un graphe orienté par défaut) : ${graphe === 'énnoncé' ? 'Oui' : 'Non'}`"
            false-value="orienté"
            true-value="énnoncé"
            hide-details
            inset
          ></v-switch>

          <p v-if="ville" class="text-red">L'ajout de poids négatif n'est pas supporté pour l'algorithme de Dijkstra</p>

         <v-btn
           v-if="ville"
           class="ma-4"
           variant="elevated"
           color="teal-darken-3"
           width="300"
           @click="run"
         >
           Lancer l'algorithme de DIJKSTRA
         </v-btn>


         <v-container v-if="submit">
           <p>Résultat de l'algorithme : </p>
           <v-list density="compact" class="bg-teal-lighten-4 rounded-xl">
           <v-list-item
             v-for="(value, index) in distances"
             :key="index"
           >
             <v-row>
                <v-col>
                  {{ ville }} → {{ villes[index] }} : 
                  <span v-if="value!==Infinity">
                    {{ value }} km
                  </span> 
                  <span v-else>
                    Pas de chemin
                  </span>
                </v-col>
                <v-col>
                  <v-btn
                    v-if="value!==Infinity"
                    size="small"
                    @click="voirChemin(villes[index])"
                  >
                    Colorier chemin
                  </v-btn>
                </v-col>
              </v-row>
           </v-list-item>
         </v-list>
         </v-container>
       </v-container>
     </v-col>
   </v-row>
 </v-col>
</template>


<script setup>
import { ref } from "vue";
import GrapheDisplay from "@/components/GrapheDisplay.vue";
import GraphePoidsNegatif from "@/components/GraphePoidsNegatif.vue";
import RetourButton from "@/components/RetourButton.vue";
import { DIJKSTRA } from "~/algorithmes/Dijkstra.js";
import GraphePoidsPositif from "~/components/GraphePoidsPositif.vue";


const choix = ref(null);


// Ton tableau des villes pour l'affichage lisible
const villes = [
 "Rennes",
 "Caen",
 "Lille",
 "Nantes",
 "Paris",
 "Dijon",
 "Nancy",
 "Bordeaux",
 "Lyon",
 "Grenoble",
];
const ville = ref(null); //pour récupérer la ville choisie




// Résultat du graphe (resultat est le v-model de GrapheDisplay)
const submit = ref(false);
const res = ref(null);
const graphe = ref("énnoncé");
const matrice=ref();
const chemin = ref(null);
const distances = ref(null);

// Fonction déclenchant les algo
function run() {
  submit.value = false;
  if (graphe.value === "énnoncé") {
    matrice.value = matrice_ennonce;
  } else {
    matrice.value = matrice_orientee;
  }
  res.value = DIJKSTRA(ville.value, matrice.value);
  distances.value = res.value.distances;
  setTimeout(()=>{
    submit.value = true;
  }, 100)
}


function voirChemin(villeArrivee) {
  if (!res.value) return;

  chemin.value = res.value.getChemin(villeArrivee);

}

const matrice_orientee = [
  [ 0,  75,  0,  45, 110,  0,  0,  0,  0,  0], 
  [ 0,   0, 65,   0,  50,  0,  0,  0,  0,  0],
  [ 0,   0,  0,   0,   0, 120, 100,  0,  0,  0], 
  [ 0,   0,  0,   0,  80,  0,  0,  90,  0,  0], 
  [ 0,   0,  0,   0,   0,  60,  0, 150,  0,  0], 
  [ 0,   0,  0,   0,   0,   0,  75,  0,  70,  0], 
  [ 0,   0,  0,   0,   0,   0,   0,  0,  90,  0],
  [ 0,   0,  0,   0,   0,   0,   0,  0, 100,  0], 
  [ 0,   0,  0,   0,   0,   0,   0,  0,   0,  40],
  [ 0,   0,  0,   0,   0,  75,   0,  0,   0,   0], 
];




const matrice_ennonce = [
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


</script>


<style scoped>
h1 {
 letter-spacing: 0.5px;
}
</style>



