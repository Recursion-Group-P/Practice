import { uid } from "quasar"
import Vue from "vue"
import { firebaseDb, firebaseAuth } from 'boot/firebase'

const state = {
    tasks: {
        // "jgz6cuAI0yNIk4QecqRR0ypJtOx1": {
        //     "ID1": {
        //         "name": "todo 1",
        //         "completed": false,
        //         "dueDate": "2019/05/12",
        //         "dueTime": "18:30"
        //     },
        //     "ID2": {
        //         "name": "todo 2",
        //         "completed": false,
        //         "dueDate": "2019/05/13",
        //         "dueTime": "14:00"
        //     },
        //     "ID3": {
        //         "name": "todo 3",
        //         "completed": false,
        //         "dueDate": "2019/05/14",
        //         "dueTime": "16:00"
        //     }
        // }
    },
    tasksDownloaded: false
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
    },
    clearTasks(state){
        state.tasks = {}
    },
    setTasksDownloaded(state, value) {
		state.tasksDownloaded = value
	}
}

const actions = {
    updateTask({ dispatch }, payload) {
		dispatch('fbUpdateTask', payload)
	},
	deleteTask({ dispatch }, id) {
		dispatch('fbDeleteTask', id)
	},
	addTask({ dispatch }, task) {
		let taskId = uid()
		let payload = {
			id: taskId,
			task: task
		}
		dispatch('fbAddTask', payload)
	},

	fbReadData({ commit }) {
		let userId = firebaseAuth.currentUser.uid
        console.log(firebaseAuth.currentUser)
		let userTasks = firebaseDb.ref('tasks/' + userId)
        
        // initial check for data
		userTasks.once('value', snapshot => {
			commit('setTasksDownloaded', true)
		}, error => {
			console.log('error.message: ', error.message)
		})

		// child added
		userTasks.on('child_added', snapshot => {
			let task = snapshot.val()
            console.log('snapshot', snapshot)
			let payload = {
				id: snapshot.key,
				task: task
			}
			commit('addTask', payload)
		})

		// child changed
		userTasks.on('child_changed', snapshot => {
			let task = snapshot.val()
			let payload = {
				id: snapshot.key,
				updates: task
			}
			commit('updateTask', payload)
		})

		// child removed
		userTasks.on('child_removed', snapshot => {
			let taskId = snapshot.key
			commit('deleteTask', taskId)
		})
	},
    fbAddTask({}, payload) {
        let userId = firebaseAuth.currentUser.uid 
        let taskRef = firebaseDb.ref('tasks/' + userId + "/" + payload.id)
        taskRef.set(payload.task)
    },
    fbUpdateTask({}, payload) {
        let userId = firebaseAuth.currentUser.uid 
        let taskRef = firebaseDb.ref('tasks/' + userId + "/" + payload.id)
        taskRef.update(payload.updates)
    },
    fbDeleteTask({}, taskId){
        let userId = firebaseAuth.currentUser.uid 
        let taskRef = firebaseDb.ref('tasks/' + userId + "/" + taskId)
        taskRef.remove()
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