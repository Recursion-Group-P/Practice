<template>
    <q-page class="q-pa-md">
    <q-list
      separator
      bordered
    >

      <Task
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :id="key"
      />

      <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTask = true"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <AddTask @close="showAddTask = false" />
    </q-dialog>
    </q-list>
  </q-page>
    
</template>

<script>
import Task from '../components/Task.vue'
import AddTask from '../components/AddTask.vue'

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showAddTask: false
    }
  }, 
  computed: {
    ...mapGetters('tasks', ['tasks'])
  },
  components: {
    Task,
    AddTask
  }
}
</script>

<style>
</style>