<template>
  <v-container class="py-10">
    <!-- 🏷️ Titre principal -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h4 font-weight-bold text-primary mb-2">
          Algorithme de l'arbre couvrant minimal — KRUSKAL
        </h1>
        <p class="text-subtitle-2 text-medium-emphasis">
          Visualisation interactive du graphe et des étapes de construction de l’arbre couvrant.
        </p>
      </v-col>
    </v-row>

    <!-- 🕸️ Graphe principal -->
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-4 elevation-3 rounded-xl">
          <GrapheDisplay v-model="resultat" style="height: 600px;" />
        </v-card>
      </v-col>
    </v-row>

    <!-- ⚙️ Bouton d’action -->
    <v-row justify="center" class="mt-6">
      <v-col cols="auto">
        <v-btn
          color="primary"
          class="px-6 py-3 text-white text-subtitle-1"
          prepend-icon="mdi-play-circle"
          @click="runAlgo"
        >
          Lancer l’algorithme de Kruskal
        </v-btn>
      </v-col>
    </v-row>

    <!-- 📊 Résultats -->
    <v-row justify="center" class="mt-6" v-if="resultat && resultat.length">
      <v-col cols="12" md="8">
        <v-card class="pa-4 rounded-xl elevation-1">
          <h2 class="text-h6 font-weight-medium text-primary mb-3">
            Résultat de l’arbre couvrant :
          </h2>
          <v-list density="compact">
            <v-list-item
              v-for="(edge, index) in resultat"
              :key="index"
              prepend-icon="mdi-link-variant"
            >
              <v-list-item-title>
                {{ villes[edge.depart] }} → {{ villes[edge.arrivee] }}
                <span class="text-caption text-medium-emphasis">
                  ({{ edge.poids }} km)
                </span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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

// Fonction déclenchant l'algo
function runAlgo() {
  resultat.value = KRUSHKAL();
}
</script>

<style scoped>
h1 {
  letter-spacing: 0.5px;
}
</style>
