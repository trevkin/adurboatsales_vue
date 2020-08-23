<template>
  <div class="flex">
    <AdminList v-bind:boats="boats"></AdminList>
  </div>
</template>

<script>
import axios from 'axios'
import AdminList from '../components/AdminList'

export default {
  components: {
    AdminList
  },
  data() {
    return {
      isLoading: true,
      events: "",
      boats: [],
      busy: false,
      lastRecord: 0,
      batchSize: 10,
      status: '',
    }
  },
  methods: {
    loadMoreBoats() {
      let order = "ASC"
      let orderBy = "boatPrice"
      let type = ""
      this.busy = true
      axios.get(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/boat/list', {
        params: {
          order,
          orderBy,
          type,
          status: this.status,
          limitFrom: this.lastRecord,
          batchSize: this.batchSize
        }
      }).then(({data}) => {
        this.lastRecord += this.batchSize
        const append = JSON.parse(data.boats)

        if (append.length > 0) {

          this.boats = this.boats.concat(append)
          this.boats.forEach((boat, index) => {
            this.boats[index].boatStatusTitle = this.getStatusTitle(boat.boatStatus)
          })
        }
      }).catch((error) => {
        console.log("loadMoreBoats error", error)
      })
    },
    getStatusTitle(status) {
      console.log("statusTitle")
      switch (status) {
        case 'A':
          return 'Available'
        case 'S':
          return 'Sold'
        case 'P':
          return 'Pending More Info'
        default:
          return 'No Status'
      }
    }

  },
  mounted() {
    console.log("mounted created")
    this.loadMoreBoats()
  },
  created() {
    console.log("dashboard created")
    this.loadMoreBoats()
  },
}
</script>
