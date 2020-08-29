<template>
  <div class="">
    <div class="flex p-4 justify-center">
      <form @submit.prevent="sendMessage" class="w-11/12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="text-gray-700 text-lg mb-4">
          Contact us on +44(0)1273 596680 <br>or send us an email via the form below
        </div>
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">{{ error }}</strong>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg @click="clearError" class="fill-current h-6 w-6 text-red-500" role="button"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
        <div class="mb-4 w-full md:w-1/2 inline-block">
          <label for="name" class="block text-gray-700 text-lg  mb-2">
            Name:
          </label>
          <input v-model="name" type="text" name="name" value
                 class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4 w-full md:w-1/2 inline-block md:pl-3">
          <label for="email" class="block text-gray-700 text-lg  mb-2">
            Email:
          </label>
          <input v-model="email" type="email" name="email" value
                 class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div>
          <label for="Message" class="block text-gray-700 text-lg  mb-2">
            Message:
          </label>
          <textarea v-model="password" type="text" name="message"
                    class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div>
          <button type="submit" name="button"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      error: null
    }
  },
  methods: {
    sendMessage() {
      //TODO: use nodemailer to send message via API
    }
  }
}
</script>