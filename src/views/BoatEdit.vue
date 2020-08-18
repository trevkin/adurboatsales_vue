<template>
  <div class="w-full p-5">
    <form @submit.prevent="updateBoat" class="w-full">
      <button @click="" class="border-solid border-1 border-gray-900 px-4 py-1 bg-gray-400 hover:bg-gray-200">Add
        Image
      </button>
      <div class="flex flex-row flex-wrap justify-center">
        <div
            v-if="boat.boatID"
            v-for="(imageSuffix, index) in availableImages"
            :key="index"
            id="image"
            class="relative w-auto md:w-5/12 lg:w-3/12 xl:w-1/10 m-2 p-0"
        >
          <div class="absolute right-0 top-0 px-4 pb-2 text-lg text-bold text-white cursor-pointer"
               @click="deleteImage(boat.boatID)">x
          </div>
          <img
              :src="getImageUrl(boat.boatID, imageSuffix)"
              class="object-cover w-full md:h-48 xl:h-64 border p-0 rounded-lg"/>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-wrap my-3">
          <div class="w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 text-left px-3 ">
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Number:</div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    disabled
                    type="text"
                    name="boatNumber"
                    v-model="boat.boatNumber"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Name:</div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    type="text"
                    name="boatName"
                    v-model="boat.boatName"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Builder:</div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    type="text"
                    name="boatManufacturer"
                    v-model="boat.boatManufacturer"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3 focus:outline-none focus:bg-white">
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Model</div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    type="text"
                    name="boatModel"
                    v-model="boat.boatModel"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3 focus:outline-none focus:bg-white">
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Hull:</div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    type="text"
                    name="boatHull"
                    v-model="boat.boatHull"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Location:</div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    type="text"
                    name="boatLocation"
                    v-model="boat.boatLocation"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Price:</div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    type="text"
                    name="boatPrice"
                    id="boatPrice"
                    :value="boat.boatPrice | removePunctuation | addPunctuation"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
              </div>
            </div>
          </div>
          <div class=" w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 text-left px-3 ">
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Boat Type:</div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <select
                    disabled
                    type="text"
                    name="boatType"
                    v-model="boat.boatType"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
                  <option v-for="boatType in boatTypes" :value="boatType.type">{{ boatType.typeTitle }}</option>
                </select>
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Boat Status:
              </div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <select
                    type="text"
                    name="boatType"
                    v-model="boat.boatStatus"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
                  <option v-for="boatStatus in boatStatuses" :value="boatStatus.status">{{
                      boatStatus.statusTitle
                    }}
                  </option>
                </select>
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Length OA:</div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    type="text"
                    name="boatLengthOA"
                    v-model="boat.boatLengthOA"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Length Water:
              </div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    type="text"
                    name="boatLengthWater"
                    v-model="boat.boatLengthWater"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Beam:</div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    type="text"
                    name="boatBeam"
                    v-model="boat.boatBeam"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Draft:</div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    type="text"
                    name="boatDraft"
                    v-model="boat.boatDraft"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Displacement:
              </div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    type="text"
                    name="boatDisplacement"
                    v-model="boat.boatDisplacement"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
              </div>
            </div>
            <div class="sm:flex">
              <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Engine:</div>
              <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                <input
                    type="text"
                    name="boatEngine"
                    v-model="boat.boatEngine"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
              </div>
            </div>
          </div>
          <div class="sm:flex w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 text-left px-3 ">
            <div class="sm:flex-none text-white font-bold pr-2 w-full sm:w-36 inline-block align-top">Description:</div>
            <div class="sm:flex-1 w-full sm:w-auto text-white inline-block">
              <TextareaAutosize
                  name="boatDescription"
                  :min-height="300"
                  :max-height="500"
                  class="appearance-none inline-block w-full bg-white text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white"
                  v-model="boat.boatDescription"/>
            </div>
          </div>
          <div class="sm:flex w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 text-left px-3 ">
            <div class="sm:flex-none text-white font-bold pr-2 w-full sm:w-36 inline-block align-top">Accommodation:
            </div>
            <div class="sm:flex-1 w-full sm:w-auto text-white inline-block">
              <TextareaAutosize
                  name="boatAccommodation"
                  :min-height="300"
                  :max-height="500"
                  class="appearance-none inline-block w-full bg-white text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white"
                  v-model="boat.boatAccommodation"/>
            </div>
          </div>
          <div class="flex-none sm:flex w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 text-left px-3 ">
            <div class="sm:flex-none text-white font-bold pr-2 w-full sm:w-36 inline-block align-top">Equipment:</div>
            <div class="sm:flex-1 w-full sm:w-auto text-white inline-block">
              <TextareaAutosize
                  name="boatEquipment"
                  :min-height="300"
                  :max-height="500"
                  class="appearance-none inline-block w-full bg-white text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white"
                  v-model="boat.boatEquipment"/>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="border-solid border-1 border-gray-900 px-4 py-1 bg-gray-400 hover:bg-gray-200">Save
        Changes
      </button>
    </form>
  </div>
</template>
<script>
import {authComputed} from '../vuex/helper.js'
import axios from "axios"
import Vue from 'vue'
import imageMixin from '../mixins/image'
import filterMixin from '../mixins/filters'
import ImageModal from '../components/Modal'
import TextareaAutosize from 'vue-textarea-autosize'

Vue.use(TextareaAutosize)
import numeral from 'numeral'
import router from "@/router";

require('numeral/locales/en-gb')
numeral.locale('en-gb')

export default {
  components: {ImageModal},
  mixins: [imageMixin, filterMixin],
  data: () => {
    return {
      boat: {},
      imageSuffixes: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q'],
      url: process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT,
      availableImages: [],
      boatTypes: [{type: 'M', typeTitle: 'Motor'}, {type: 'S', typeTitle: 'Sail'}],
      boatStatuses: [{status: 'A', statusTitle: 'Available'}, {status: 'S', statusTitle: 'Sold'}, {
        status: 'P',
        statusTitle: 'Pending Information'
      }]
    }
  },
  props: {},
  computed: {
    ...authComputed
  },
  methods: {
    showModal(imageUrl) {
      console.log("showModal", imageUrl)
      this.$refs.ImageModal.showModal(imageUrl)
    },
    updateBoat(submitEvent) {
      console.log("update boat", this.boat)
      this.boat.boatPrice = submitEvent.target.elements.boatPrice.value
      axios.post(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/boat/update', {
        params: {
          boat: this.boat
        }
      }).then(({data}) => {
        console.log("data", data.boats)
        const newBoat = JSON.parse(data.boats)
        router.push({name: 'boatedit', params: {boatId: newBoat[0].boatId}});
      }).catch((error) => {
        console.log("newBoat error", error)
      })
    },
    deleteImage(boatId) {
      console.log("deleteImage", boatId)
    }
  },
  created() {
    axios.get(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/boat/', {
      params: {
        boatId: this.$route.params.boatId
      }
    }).then(({data}) => {
      this.boat = JSON.parse(data.boat)
      this.imageSuffixes.forEach((imageSuffix) => {
        this.imageExists(this.boat.boatID, imageSuffix)
            .then(({data}) => {
              console.log("imageSuffix", imageSuffix)
              this.availableImages.push(imageSuffix)
            })
            .catch(() => {
              // console.clear()
            })
      })
      this.isLoading = false
    })
  }
}
</script>