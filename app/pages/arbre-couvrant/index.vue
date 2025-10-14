<template>
  <v-col class="w-100 ma-0" cols="12">
    <p class="text-button text-green text-center font-weight-bold mb-4">
      Algorithme de l'arbre couvrant minimal — KRUSKAL
    </p>

    <v-row>
      <v-col cols="7">
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

          

          <v-btn
            v-if="ville !== ''"
            class="ml-4"
            variant="elevated"
            color="primary"
            @click="runAlgo"
          >
            Lancer l'algorithme de Kruskal
          </v-btn>

          <v-container v-if="submit">
            <p v-if="submit">Résultat de l'arbre couvrant : </p>
          <v-list density="compact" class="bg-teal-lighten-4 rounded-xl">
            <v-list-item
              v-for="(edge, index) in resultat"
              :key="index"
            >
              <v-list-item-title>
                {{ villes[edge.depart] }} → {{ villes[edge.arrivee] }}
                ({{ edge.poids }} km)
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
import { KRUSHKAL } from "~/data/Krushkal";

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

// Résultat du graphe (v-model de GrapheDisplay)
const resultat = ref([]);
const submit = ref(false);

// Fonction déclenchant l'algo
function runAlgo() {
  resultat.value = KRUSHKAL();
  submit.value = true;
}
</script>

<style scoped>
h1 {
  letter-spacing: 0.5px;
}
</style>
