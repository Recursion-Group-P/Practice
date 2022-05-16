import { uid } from 'quasar'
import Vue from 'vue'

const state = {
    tasks: {
        'ID1': {
            name: 'todo 1',
            completed: false,
            dueDate: '2019/05/12',
            dueTime: '18:30'
        },
        'ID2': {
            name: 'todo 2',
            completed: false,
            dueDate: '2019/05/13',
            dueTime: '14:00'
        },
        'ID3': {
            name: 'todo 3',
            completed: false,
            dueDate: '2019/05/14',
            dueTime: '16:00'
        }
    }
}

const mutations = {
    updateTask(state, payload) {
        Object.assign(state.tasks[payload.id], payload.updates)
        // 以下のようにしてもいける
        // let targetTask = state.tasks[payload.id]
        // targetTask.completed = !targetTask.completed
    },
    deleteTask(state, id) {
        // Vue.delete(this.items, index);
        Vue.delete(state.tasks, id)
    },
    addTask(state, payload) {
        // Vue.set(this.items, key, value);
        Vue.set(state.tasks, payload.id, payload.task)
    }
}

const actions = {
    updateTask({ commit }, payload) {
        commit('updateTask', payload)
    },
    deleteTask({ commit }, id) {
        commit('deleteTask', id)
    },
    addTask({ commit }, task) {
        // uidはランダムな値
        let taskId = uid()
        let payload = {
            id: taskId,
            task: task
        }
        commit('addTask', payload)
    }
}

const getters = {
    tasks: (state) => {
        return state.tasks
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}