<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on">mdi-circle-edit-outline</v-icon>
    </template>

    <v-card>
      <v-toolbar color="primary" dark>Editing</v-toolbar>
      <v-card-text>
        <v-text-field v-model="todo.title" class="font-italic"></v-text-field>
      </v-card-text>
      <v-card-actions class="justify-space-around">
        <v-icon @click="handleEdit">mdi-check</v-icon>
        <v-icon @click="dialog = false">mdi-close</v-icon>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    todo: Object,
  },
  methods: {
    handleEdit() {
      this.$emit('edit:todo', this.todo);
    },
  },
};
</script>

<style>
</style>
