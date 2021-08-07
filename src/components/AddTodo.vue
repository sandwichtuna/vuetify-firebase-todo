<template>
  <v-text-field
          background-color="blue lighten-5"
          solo
          label="Add a new todo"
          prepend-inner-icon="mdi-plus-box"
          v-model="todo.title"
          v-on:keyup.enter="handleAdd"
        >
        </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      todo: {},
    };
  },
  methods: {
    handleAdd() {
      this.$emit('add:todo', this.todo);
      this.todo = {};
    },
  },
};
</script>

<style>

</style>
