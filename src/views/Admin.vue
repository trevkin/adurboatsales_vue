<template>
  <div>
    <h1>Dashboard</h1>
    <template v-if="!isLoading">
      {{ events }}
    </template>
    <p v-else>
      Loading events
    </p>
  </div>
</template>

<script>
import axios from 'axios'
//import EventCard from '../components/EventCard'

export default {

  data () {
    return {
      isLoading: true,
      events: ""
    }
  },
  created () {
      console.log("dashboard created")
    axios.get(process.env.VUE_APP_API_URL+":"+process.env.VUE_APP_API_PORT+'/api/test/user').then(({ data }) => {
      this.events = data
      this.isLoading = false
    })
  }
}
</script>
