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


         <v-switch
            v-model="poidsNegatif"
            :label="`Ajout de poids négatifs: ${poidsNegatif}`"
            false-value="Non"
            true-value="Oui"
            hide-details
            inset
          ></v-switch>

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
       </v-container>
     </v-col>
   </v-row>
 </v-col>
</template>


<script setup>
import { ref } from "vue";
import GrapheDisplay from "@/components/GrapheDisplay.vue";
import RetourButton from "@/components/RetourButton.vue";
import { DIJKSTRA } from "~/data/Dijkstra.js";


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
const poidsNegatif = ref("Non");

// Fonction déclenchant les algo
function run(){
   res.value = DIJKSTRA(ville.value);
   submit.value=true;
}



</script>


<style scoped>
h1 {
 letter-spacing: 0.5px;
}
</style>



