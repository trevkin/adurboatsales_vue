<template>
	<div class="flex p-4 justify-center">
		<form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
				<strong class="font-bold">{{ error }}</strong>
				<span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    				<svg @click="clearError" class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  				</span>
			</div>
			<div class="mb-4">
				<label for="username" class="block text-gray-700 text-sm font-bold mb-2">
					Username:
				</label>
				<input v-model="username" type="username" name="username" value class="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
			</div>
			<div>
				<label for="password" class="block text-gray-700 text-sm font-bold mb-2">
					Password:
				</label>
				<input v-model="password" type="password" name="password" value class="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
			</div>
			<div>
				<button type="submit" name="button" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
					Login
				</button>
			</div>
		</form>
	</div>
</template>
<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                error: null
            }
        },
        methods: {
            login() {
                this.$store.dispatch('login', {
                    username: this.username,
                    password: this.password
                })
				.then((data) => {
					this.$router.push({name: 'home'})
				})
				.catch((err) => {
				    console.log("loginUser vue error:", err)
					this.error = err.response.data.message
				})
            },
			clearError() {
                this.error = null
			}
        }
    }
</script>
<style scoped>

</style>