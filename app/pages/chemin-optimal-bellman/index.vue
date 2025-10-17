<template>
  <v-col class="w-100 ma-0" cols="12">
    <p class="text-button text-green text-center font-weight-bold mb-4">
      Algorithme de chemin minimal — BELLMAN FORD
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
            Lancer l'algorithme de Bellman Ford
          </v-btn>
        

          

          <v-btn v-if="ville && choix === 'Prim'" class="ml-6" color="red-darken-2" @click="runAlgoPrim">
            Lancer PRIM
          </v-btn>

          <v-container v-if="submit">
            <p v-if="submit">Résultat de l'arbre couvrant : ({{ choix }})</p>
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
import { BELLMANFORD } from "~/data/Bellman-Ford.js";

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

// Fonction déclenchant l'algo de Krushkal
function runBELLMANFORD(){
    choix.value = "Bellman-Ford"
    res.value = BELLMANFORD(ville.value);
    submit.value=true;
}

</script>

<style scoped>
h1 {
  letter-spacing: 0.5px;
}
</style>
