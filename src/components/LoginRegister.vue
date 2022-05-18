<template>
    <form @submit.prevent="submitForm">
        <div class="row q-mb-md">
            <q-banner class="bg-grey-3 col">
            <template v-slot:avatar>
                <q-icon name="account_circle" color="primary" />
            </template>
            {{tab}} to play the game
            </q-banner>
        </div>
        <div class="row q-mb-md">
            <q-input 
                outlined 
                v-model="formData.email" 
                :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address!']"
                lazy-rules
                ref="email"
                class="col" 
                label="Email" 
                stack-label 
            />
        </div>
        <div class="row q-mb-md">
            <q-input 
                outlined 
                v-model="formData.password" 
                :rules="[ val => val.length <= 10 || 'Please use maximum 10 characters']"
                lazy-rules
                ref="password"
                class="col" 
                label="Password" 
                type="password" 
                stack-label 
            />
        </div>
        <div class="row">
            <q-space />
            <q-btn color="primary" type="submit" :label="tab" />
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex'

    export default {
        props: ['tab'],
        data(){
            return {
                formData: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions('auth', ['registerUser', 'loginUser']),
            isValidEmailAddress(email){
                return email.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            },
            submitForm() {
                this.$refs.email.validate()
                this.$refs.password.validate()
                if(!this.$refs.email.hasError && !this.$refs.password.hasError){
                    if(this.tab == 'login'){
                        this.loginUser(this.formData)
                    }
                    else{
                        this.registerUser(this.formData)
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>