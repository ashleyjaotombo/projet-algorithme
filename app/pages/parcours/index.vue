<template>
    <v-container>
        <p class="text-button text-red text-center font-weight-bold mb-4">Algorithmes de parcours de graphes</p>
        <v-row>
            <v-col cols="6">
                <p class="ml-2 font-weight-medium">Graphe de référence pour les algorithmes : </p>
                <v-img src="/graphe.jpg" width="800" height="400" class="ma-0"/> 
            </v-col>
            <v-col cols="6" class="d-flex align-center justify-center">
                    <v-container>
                        <v-radio-group v-model="methode" inline label="Sélectionner le parcours souhaité :" class="font-weight-medium text-black">
                            <v-radio label="Parcours en largeur" value="largeur" color="primary"></v-radio>
                            <v-radio label="Parcours en profondeur" value="profondeur" color="primary"></v-radio>
                        </v-radio-group>
                    <v-select :items=items label="Choisir une ville de départ" density="compact"/>
                    <v-btn v-if="methode" class="ml-4" variant="elevated" color="primary">Appliquer</v-btn>
                    </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const methode=ref(false);
const items = ["Rennes", "Caen", "Lille", "Nantes", "Paris", "Dijon", "Nancy", "Bordeaux", "Lyon", "Grenoble"]
</script>