<template>
  <div>
    <Modal ref="NewBoatModal">
      <form @submit.prevent="addNewBoat">
        <div class="font-bold text-xl mb-2">Add New Boat</div>
        <div>
          <label for="newBoatName">Boat Name</label>
          <input
              id="newBoatName"
              name="newBoatName"
              class="appearance-none inline-block w-full bg-gray-200 text-gray-700 border-solid border-red-500 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text">
        </div>
        <div>
          <label for="newBoatType">Boat Type</label>
          <select
              id="newBoatType"
              name="newBoatType"
              class="appearance-none inline-block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
          >
            <option value="M">Motor</option>
            <option value="S">Sail</option>
          </select>
        </div>
        <div class="w-full center">
          <button type="submit" class="block bg-gray-400 text-gray-700 rounded py-2 px-3 hover:bg-gray-300">Add New
            Boat
          </button>
        </div>
      </form>
    </Modal>
    <div v-if="loggedIn">
      <button type="button" class="bg-gray-400 text-gray-700 py-2 px-3 mt-3 ml-3 hover:bg-gray-300"
              @click="showModal()">Add New Boat
      </button>
      <div class="inline-block">
        <div class="inline-block ml-3 md:ml-10">Filters:</div>
        <select
            id="searchType"
            name="searchType"
            class=" appearance-none inline-block bg-gray-200 text-gray-700 border border-red-500 right-0 rounded py-2 px-3 mb-3 ml-3 leading-tight focus:outline-none focus:bg-white"
            @change="applyFilters()"
            v-model="searchType"
        >
          <option value="">All Types</option>
          <option value="M">Motor</option>
          <option value="S">Sail</option>
        </select>

        <select
            id="searchStatus"
            name="searchStatus"
            class=" appearance-none inline-block bg-gray-200 text-gray-700 border border-red-500 right-0 rounded py-2 px-3 mt-3 mb-3 ml-3 leading-tight focus:outline-none focus:bg-white"
            @change="applyFilters()"
            v-model="searchStatus"
        >
          <option value="">All Statuses</option>
          <option value="A">Available</option>
          <option value="S">Sold</option>
          <option value="P">Pending Information</option>
        </select>
        <input
            id="searchName"
            name="searchName"
            class="appearance-none inline-block bg-gray-200 text-gray-700 border-solid border-red-500 right-0 rounded py-2 px-3 mb-3 ml-17 md:ml-3  leading-tight focus:outline-none focus:bg-white"
            type="text"
            v-model="searchName"
            @input="applyFilters()"
            placeholder="Filter by Name">
      </div>
    </div>
    <BoatList v-bind:boats="boats"/>
    <InfiniteLoading @infinite="loadMoreBoats" :identifier="infiniteId"></InfiniteLoading>
  </div>
</template>

<script>
import {authComputed, searchDataComputed} from '../vuex/helper.js'
import axios from "axios"
import BoatList from "../components/BoatList"
import fragment from "vue-fragment"
import InfiniteLoading from 'vue-infinite-loading'
import Modal from '../components/Modal'
import router from "@/router"
import Vuex from "vuex"

export default {
  components: {InfiniteLoading, BoatList, fragment, Modal},
  data() {
    return {
      isLoading: true,
      boats: [],
      busy: false,
      lastRecord: 0,
      batchSize: 3,
      searchStatus: this.$store.getters.getSearchData.searchStatus,
      searchType: this.$store.getters.getSearchData.searchType,
      searchName: this.$store.getters.getSearchData.searchName,
      infiniteId: +new Date(),
    }
  },
  methods: {
    showModal() {
      console.log("showModal")
      this.$refs.NewBoatModal.showModal()
    },
    addNewBoat(submitEvent) {
      axios.post(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/boat/add', {
        params: {
          name: submitEvent.target.elements.newBoatName.value,
          type: submitEvent.target.elements.newBoatType.value,
        }
      }).then(({data}) => {
        console.log("data", data.boats)
        const newBoat = JSON.parse(data.boats)
        router.push({name: 'boatedit', params: {boatId: newBoat[0].boatId}});
      }).catch((error) => {
        console.log("newBoat error", error)
      })
    },
    loadMoreBoats($state) {
      console.log("loadMoreBoats", this.searchType, this.searchStatus, this.lastRecord)
      let order = "ASC"
      let orderBy = "boatPrice"
      this.busy = true
      axios.get(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/boat/list', {
        params: {
          order,
          orderBy,
          type: this.searchType,
          status: this.searchStatus,
          limitFrom: this.lastRecord,
          batchSize: this.batchSize,
          name: this.searchName
        }
      }).then(({data}) => {
        this.lastRecord += this.batchSize
        const append = JSON.parse(data.boats)
        console.log("append", append)
        if (append.length > 0) {
          this.boats = this.boats.concat(append)
          console.log("loadMoreBoats success", this.boats)
          $state.loaded()
        } else {
          console.log("complete")
          $state.complete()
        }

      }).catch((error) => {
        console.log("loadMoreBoats error", error)
        $state.complete()
      })
    },
    applyFilters() {
      this.$store.dispatch('setSearchData', {
        searchType: this.searchType,
        searchStatus: this.searchStatus,
        searchName: this.searchName,
      })
          .then(() => {
            this.boats = []
            this.lastRecord = 0
            this.infiniteId += 1
          })
          .catch(err => {

          })
    }
  }
  ,
  computed: {
    ...authComputed
  }
  ,
  created() {
    //this.loadMoreBoats()
  }
}
</script>
