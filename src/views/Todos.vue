<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col cols="12">
        <AddTodo @add:todo="addTodo" />
      </v-col>
    </v-row>

        <v-card flat v-for="todo in todos" :key="todo.id">
          <v-row>
            <v-col cols="12" md="10">
              <p
                v-if="todo.completed"
                class="font-weight-light text-decoration-line-through"
              >
                {{ todo.title }}
              </p>
              <p v-else class="font-weight-light">
                {{ todo.title }}
              </p>
            </v-col>
            <v-col cols="12" md="2">
              <EditTodoDialog @edit:todo="editTodo" :todo="todo" />
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-col>
          </v-row>
        </v-card>
  </v-container>
</template>

<script>
import AddTodo from '../components/AddTodo.vue';
import EditTodoDialog from '../components/EditTodoDialog.vue';

export default {
  components: {
    AddTodo,
    EditTodoDialog,
  },
  data() {
    return {
      newTodo: {
        title: '',
        id: 100,
        completed: false,
      },
      todos: [
        {
          userId: 1,
          id: 1,
          title: 'delectus aut autem',
          completed: false,
        },
        {
          userId: 1,
          id: 2,
          title: 'quis ut nam facilis et officia qui',
          completed: false,
        },
        {
          userId: 1,
          id: 3,
          title: 'fugiat veniam minus',
          completed: false,
        },
        {
          userId: 1,
          id: 4,
          title: 'et porro tempora',
          completed: true,
        },
        {
          userId: 1,
          id: 5,
          title:
            'laboriosam mollitia et enim quasi adipisci quia provident illum',
          completed: false,
        },
      ],
    };
  },
  methods: {
    addTodo(todo) {
      console.log(todo.title);
    },
    editTodo(todo) {
      console.log(todo.title);
    },
  },
};
</script>

<style>
</style>
