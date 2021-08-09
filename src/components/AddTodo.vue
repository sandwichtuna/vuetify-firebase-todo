<template>
  <v-text-field
          background-color="blue lighten-3"
          solo
          label="Add a new todo"
          prepend-inner-icon="mdi-pencil-plus"
          v-model="todo.title"
          v-on:keyup.enter="handleAdd"
        >
        </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      todo: {
        completed: false,
      },
    };
  },
  methods: {
    handleAdd() {
      this.$emit('add:todo', this.todo);
      this.todo.title = '';
    },
  },
};
</script>

<style>

</style>
