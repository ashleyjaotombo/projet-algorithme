<script lang="ts" setup>
import { BFS } from '~/data/BFS';
import { DFS } from '~/data/DFS';

BFS("Caen");
DFS("Caen");




const items = [
    {
      title: 'Algorithme de parcours',
      value: 1,
    },
    {
      title: 'Arbre couvrant de poids minimum',
      value: 2,
    },
    {
      title: 'Recherche du chemin optimal (Dijkstra)',
      value: 3,
    },
    {
      title: 'Recherche du chemin optimal (Bellman-Ford, Floyd-Warshall)',
      value: 4,
    },
  ]
</script>

<template>
  <v-container>
    <h2 class="text-center text-red">PROJET - ALGORITHME ET THÉORIES DES GRAPHES</h2>
    <p class="font-weight-medium text-center">Ce site vous permettra de visualiser différents algorithmes applicables à un exemple vu en cours.</p>
    <v-row class="" height="600">
      <v-col cols="6">
        <v-img src="/graphe.png" width="900" height="500"/>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-center">
        <v-col>
          <p class="text-weight-regular mb-6">Vous pouvez tester chacune des 4 opérations disponibles ci-dessous : </p>
        <v-card
          class="mx-auto rounded-xl mt-200"
          max-width="500" max-height="240"
        >
          <v-list density="compact" class="bg-white">
            <v-list-item v-for="(item, index) in items" :key="index" :value="item" color="primary">
              <NuxtLink :to="`/${item.value}/`"  class="text-decoration-none text-black">
                <v-list-item-title><v-icon size="small" color="primary">mdi-chevron-right</v-icon>{{item.title}}</v-list-item-title>
              </NuxtLink>
            </v-list-item>
          
          </v-list>
        </v-card>
        </v-col>
        
      </v-col>
    </v-row>
  </v-container>
  
  
  

</template>

