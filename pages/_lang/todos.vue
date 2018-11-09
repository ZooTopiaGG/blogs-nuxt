<template>
    <div id="todos">
        <div>{{ $store.state.counter }}</div>
        <ul>
            <li v-for="(todo, index) in todos" :key="index">
              <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
              <span :class="{ done: todo.done }">{{ todo.text }}</span>
            </li>
            <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
        </ul>
    </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      // todos: {
      //     text: 'eeee',
      //     done: false
      // }
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos.list;
    }
  },
  methods: {
    addTodo(e) {
      // 文件名 + 方法
      this.$store.commit("todos/add", e.target.value);
      e.target.value = "";
    },
    ...mapMutations({
      toggle: "todos/toggle"
    })
  }
};
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>