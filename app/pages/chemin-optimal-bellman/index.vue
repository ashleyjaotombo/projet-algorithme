<template>
 <v-col class="w-100 ma-0" cols="12">
   <p class="text-button text-green text-center font-weight-bold mb-4">
     Algorithme de chemin le plus court
   </p>


   <v-row>
     <v-col cols="7">
       <RetourButton/>
      
       <p class="ml-2 font-weight-medium">
         Graphe de référence pour les algorithmes :
       </p>
       <GrapheDisplay v-model="resultat" class="w-100" style="height: 600px;" />
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


         <v-btn
           v-if="ville"
           class="ma-4"
           variant="elevated"
           color="teal-darken-3"
           width="300"
           @click="runBELLMANFORD"
         >
           Algorithme de Bellman Ford
         </v-btn>


         <v-btn
           v-if="ville"
           class="ma-4"
           variant="elevated"
           color="teal-darken-3"
           width="300"
           @click="runFLOYD"
         >
           Algorithme de Floyd Warshall
         </v-btn>
      




         <v-container v-if="submit && choix ==='Bellman-Ford'">
           <p>Résultat de l'algorithme : ({{ choix }})</p>
           <v-list density="compact" class="bg-teal-lighten-4 rounded-xl">
           <v-list-item
             v-for="(value, index) in res"
             :key="index"
           >
             <v-list-item-title>
               {{ ville }} → {{ villes[index] }}
               ({{ value }} km)
             </v-list-item-title>
           </v-list-item>
         </v-list>
         </v-container>

         <v-container v-if="submit && choix==='Floyd Warshall'">
           <p class="font-weight-bold mb-2">Résultat de l'algorithme : ({{ choix }})</p>
           <v-table class="bg-white">
              <caption class="mb-4">
                Matrice de distances
              </caption>
              <thead class="bg-teal-lighten-4">
                <tr>
                  <th class="pa-1 border-thin border-current"></th>
                  <th v-for="(ville, index) in villes" :key="index" scope="col" class="pa-1 border-thin border-current text-center">
                    {{ ville }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-teal-lighten-4">
                <tr v-for="(value, index) in res">
                  <th scope="row" class="border-thin border-current">{{ villes[index] }}</th>
                  <td v-for="(villeCol, index) in value" class="border-thin border-current">
                    {{villeCol}}
                  </td>
                </tr>
              </tbody>
            </v-table>
         </v-container>
        
       </v-container>
     </v-col>
   </v-row>
 </v-col>
</template>


<script setup>
import { ref } from "vue";
import GrapheDisplay from "@/components/GrapheDisplay.vue";
import RetourButton from "@/components/RetourButton.vue";
import { BELLMANFORD } from "~/data/Bellman-Ford.js";
import { FLOYD_WARSHALL } from "~/data/Floyd-warshall";


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
const resultat = ref([]);
const submit = ref(false);
const res = ref(null);
const res2 = ref(null);


// Fonction déclenchant les algo
function runBELLMANFORD(){
   choix.value = "Bellman-Ford"
   res.value = BELLMANFORD(ville.value);
   submit.value=true;
}


function runFLOYD(){
   choix.value = "Floyd Warshall"
   res.value = FLOYD_WARSHALL(ville.value);
   submit.value=true;
   console.log(res.value[0])
}


</script>


<style scoped>
h1 {
 letter-spacing: 0.5px;
}
</style>



