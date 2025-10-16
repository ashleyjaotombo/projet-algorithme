<template>
  <v-col class="w-100 ma-0" cols="12">
    <p class="text-button text-green text-center font-weight-bold mb-4">
      Algorithmes de parcours de graphes
    </p>

    <v-row>
      <v-col cols="7">
        <RetourButton />
        <p class="ml-2 font-weight-medium">
          Graphe de référence pour les algorithmes :
        </p>
        <GrapheDisplay v-model="results.atraiter" class="w-100" style="height: 600px;" />
      </v-col>

      <v-col cols="5" class="d-flex align-center justify-center px-4">
        <v-container>
          <p class="text-caption mb-6 text-red">
            Vous pouvez changer l'organisation du graphe manuellement en glissant les sommets.
            Vous pouvez également actualiser la page pour forcer la restructuration.
          </p>

          <v-radio-group
            v-model="methode"
            inline
            label="Sélectionner le parcours souhaité :"
            class="font-weight-medium text-black"
          >
            <v-radio label="Parcours en largeur" value="largeur" color="primary" />
            <v-radio label="Parcours en profondeur" value="profondeur" color="primary" />
          </v-radio-group>

          <v-select
            v-if="methode"
            v-model="ville"
            :items="items"
            label="Choisir une ville de départ"
            density="compact"
          />

          <v-btn
            v-if="ville !== ''"
            class="ml-4"
            variant="elevated"
            color="primary"
            @click="runParcours"
          >
            Appliquer
          </v-btn>

          <p v-if="results !== false" class="mt-4 font-weight-bold">Ordre de visite :</p>
          <p v-if="results" class="text-green">{{ results?.results }}</p>
          
        </v-container>
      </v-col>
    </v-row>
  </v-col>
</template>

<script setup>
import { ref } from "vue";
import { BFS } from "~/data/BFS";
import { DFS } from "~/data/DFS";
import GrapheDisplay from "~/components/GrapheDisplay.vue";
import RetourButton from "@/components/RetourButton.vue";


const methode = ref("");
const items = [
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
const ville = ref("");
const results = ref(false);


function runParcours() {
  if (!ville.value || !methode.value){
    console.log("Non réussi")
    return;
  } 

  if (methode.value === "largeur") {
    results.value = BFS(ville.value);

  } else if (methode.value === "profondeur") {
    results.value = DFS(ville.value);
  }
}

</script>
