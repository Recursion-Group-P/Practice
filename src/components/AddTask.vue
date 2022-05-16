<template>
    <q-card>
        <q-card-section class="row">
            <div class="text-h6">Add Task</div>
            <q-space />
            <q-btn
                v-close-popup
                icon="close"
                flat
                round
                dense
            />
        </q-card-section>

        <form @submit.prevent="submitForm">
            <q-card-section class="q-pt-none">
                <div class="row q-mb-sm">
                    <q-input
                        v-model="taskToSubmit.name"
                        :rules="[val => !!val || 'Field is required']"
                        autofocus
                        ref="name"
                        class="col"
                        label="Task name"
                        outlined
                    >
                        <template v-slot:append>
                            <q-icon
                                v-if="taskToSubmit.name"
                                @click="taskToSubmit.name = ''"
                                class="cursor-pointer"
                                name="close"
                            />
                        </template>
                    </q-input>
                </div>
                <div class="row q-mb-sm">
                    <q-input
                        v-model="taskToSubmit.dueDate"
                        label="Due date"
                        outlined
                    >
                        <template v-slot:append>
                            <q-icon
                                v-if="taskToSubmit.dueDate"
                                @click="clearDueDate"
                                class="cursor-pointer"
                                name="close"
                            />
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="taskToSubmit.dueDate">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div
                    v-if="taskToSubmit.dueDate"
                    class="row q-mb-sm"
                >
                    <q-input
                        v-model="taskToSubmit.dueTime"
                        label="Due time"
                        class="col"
                        outlined
                    >
                        <template v-slot:append>
                            <q-icon
                                v-if="taskToSubmit.dueTime"
                                @click="taskToSubmit.dueTime = ''"
                                class="cursor-pointer"
                                name="close"
                            />
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time v-model="taskToSubmit.dueTime">
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                    color="primary"
                    label="Save"
                    type="submit"
                />
            </q-card-actions>
        </form>

    </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            taskToSubmit: {
                name: '',
                dueDate: '',
                dueTime: '',
                completed: false
            }
        }
    },
    methods: {
        ...mapActions('tasks', ['addTask']),
        submitForm() {
            this.$refs.name.validate()
            if (!this.$refs.name.hasError) {
                this.submitTask()
            }
        },
        submitTask() {
            this.addTask(this.taskToSubmit)
            this.$emit('close')
        },
        clearDueDate() {
            this.taskToSubmit.dueDate = ''
            this.taskToSubmit.dueTime = ''
        }
    }
}
</script>

<style>

</style>