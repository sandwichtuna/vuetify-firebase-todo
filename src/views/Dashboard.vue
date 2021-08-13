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
        <v-col cols="1"
          ><v-checkbox
            dense
            color="success"
            @change="markAsDoneTodo(todo)"
            v-model="todo.completed"
          ></v-checkbox
        ></v-col>

        <v-col @dblclick="editTodo(todo)" class="mt-2" cols="8">
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

        <v-col class="text-right" cols="3">
          <v-icon color="brown" @click="editTodo(todo)"> mdi-pencil </v-icon>
          <v-icon color="red darken-1" @click="deleteTodo(todo.id)"
            >mdi-delete</v-icon
          >
        </v-col>
      </v-row>
    </v-card>

    <!--  -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-toolbar color="primary" dark>Editing</v-toolbar>
        <v-card-text>
          <v-text-field v-on:keyup.enter="saveEditTodo"
            v-model="editedTodo.title"
            class="font-italic"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-space-around">
          <v-btn
            depressed
            color="primary"
            @click="saveEditTodo"
            >Confirm</v-btn
          >
          <v-btn depressed color="error" @click="cancelEditTodo">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
  </v-container>
</template>

<script>
import AddTodo from '../components/AddTodo.vue';
// import EditTodoDialog from "../components/EditTodoDialog.vue";

import db from '../plugins/firebase';

export default {
  components: {
    AddTodo,
    // EditTodoDialog,
  },
  data() {
    return {
      todos: [],
      beforeEditCached: null,
      editedTodo: {
        id: '',
        title: '',
      },
      dialog: false,
    };
  },
  created() {
    db.collection('todos').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          data.id = change.doc.id;
          this.todos.push(data);
        }
        if (change.type === 'modified') {
          console.log('Modified data ', change.doc.data());
          this.todos = this.todos.map((todo) => {
            if (todo.id === change.doc.id) {
              const updated = change.doc.data();
              updated.id = change.doc.id;
              return updated;
            }
            return todo;
          });
        }
        if (change.type === 'removed') {
          this.todos = this.todos.filter((todo) => todo.id !== change.doc.id);
        }
      });
    });
  },
  methods: {
    // test(todo) {
    //   console.log(todo);
    // },
    addTodo(todo) {
      // Add a new document with a generated id.
      db.collection('todos')
        .add(todo)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },
    editTodo(todo) {
      this.dialog = true;
      this.beforeEditCached = todo;
      this.editedTodo.id = todo.id;
      this.editedTodo.title = todo.title;
    },
    saveEditTodo() {
      db.collection('todos')
        .doc(this.editedTodo.id)
        .update({
          title: this.editedTodo.title,
        })
        .then(() => {
          console.log('Document successfully updated!');
          this.dialog = false;
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
    },
    cancelEditTodo() {
      this.dialog = false;
    },
    markAsDoneTodo(todo) {
      db.collection('todos')
        .doc(todo.id)
        .update({
          completed: todo.completed,
        })
        .then(() => {
          console.log('Document successfully updated!');
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
    },
    deleteTodo(id) {
      db.collection('todos')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },
  },
};
</script>

<style>
</style>
