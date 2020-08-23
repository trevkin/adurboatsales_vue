<template>
  <div class="w-full content">
    <div v-if="loggedIn">
      <button class="border-solid border-1 border-gray-900 px-4 py-1 m-3 mb-0 ml-5 bg-gray-400 hover:bg-gray-200" @click="editBoat(boat)">Edit This Boat</button>
    </div>
    <div v-masonry origin-left="true" transition-duration="1s" item-selector=".item" class="m-3 p-0 text-sm block">
      <div v-masonry-tile
           v-if="boat.boatID"
           v-for="(imageSuffix, index) in availableImages"
           :key="index"
           @click="showModal(getImageUrl(boat.boatID, imageSuffix))"
           id="image"
           class="item h-auto w-auto md:w-1/2 lg:w-4/12 xl:w-1/5 m-0 p-2">
        <img
            :src="getImageUrl(boat.boatID, imageSuffix)+ '?rnd=' + cacheKey"
            class=" h-auto w-full border m-0 p-0 rounded-lg"/>
      </div>
    </div>
    <div v-masonry origin-left="true" transition-duration="1s" item-selector=".item" class="m-2 p-0 text-sm h-24 block">
      <div v-masonry-tile class="item flex flex-wrap my-3">
        <div class="w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 text-left px-3 ">
          <div v-if="this.boat.boatNumber" class="border-b border-t">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Number:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatNumber
              }}
            </div>
          </div>
          <div v-if="this.boat.boatName" class="border-b">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Name:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatName
              }}
            </div>
          </div>
          <div v-if="this.boat.boatManufacturer" class="border-b">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Builder:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatManufacturer
              }}
            </div>
          </div>
          <div v-if="this.boat.boatModel" class="border-b">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Model:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatModel
              }}
            </div>
          </div>
          <div v-if="this.boat.boatHull" class="border-b">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Hull:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatHull
              }}
            </div>
          </div>
          <div v-if="this.boat.boatLocation" class="border-b">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Location:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatLocation
              }}
            </div>
          </div>
          <div v-if="this.boat.boatPrice">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Price:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatPrice |
                    removePunctuation | addPunctuation
              }}
            </div>
          </div>
        </div>
        <div class=" w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 text-left px-3 ">
          <div v-if="this.boat.boatLengthOA" class="border-b border-t">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Length OA:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatLengthOA
              }}
            </div>
          </div>
          <div v-if="this.boat.boatLengthWater" class="border-b">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Length Water:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatLengthWater
              }}
            </div>
          </div>
          <div v-if="this.boat.boatBeam" class="border-b">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Beam:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatBeam
              }}
            </div>
          </div>
          <div v-if="this.boat.boatDraft" class="border-b">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Draft:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatDraft
              }}
            </div>
          </div>
          <div v-if="this.boat.boatDisplacement" class="border-b">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Displacement:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatDisplacement
              }}
            </div>
          </div>
          <div v-if="this.boat.boatEngine">
            <div class="text-white font-bold pr-2 w-1/3 sm:w-1/6 md:w-1/4 lg:w-1/4 xl:w-1/3 inline-block align-top">
              Engine:
            </div>
            <div class="text-white w-2/3 sm:w-5/6 md:w-3/4 lg:w-3/4 xl:w-2/3 inline-block">{{
                this.boat.boatEngine
              }}
            </div>
          </div>
        </div>
        <div v-if="this.boat.boatDescription"
             class="w-full sm:w-full md:w-full lg:w-full xl:w-1/3 text-left px-3 ">
          <div class="border-t">
            <div class="text-white font-bold pr-2 w-full inline-block align-top">Description:</div>
            <div class="text-white inline-block">{{ this.boat.boatDescription }}</div>
          </div>
        </div>
        <div v-if="this.boat.boatAccommodation"
             class="flex w-full sm:w-full md:w-full lg:w-full xl:1/3 text-left px-3 ">
          <div class="border-t ">
            <div class="text-white font-bold pr-2 w-full inline-block align-top">Accommodation:</div>
            <div class="text-white inline-block">{{ this.boat.boatAccommodation }}</div>
          </div>
        </div>
        <div v-if="this.boat.boatEquipment" class="w-full sm:w-full md:w-full lg:w-full xl:w-full text-left px-3 ">
          <div class="border-t">
            <div class="text-white font-bold pr-2 w-full inline-block align-top">Equipment:</div>
            <div class="text-white inline-block">{{ this.boat.boatEquipment }}</div>
          </div>
        </div>
      </div>
      <Modal ref="ImageModal">
        <img :src="imageUrl" class="rounded-lg">
      </Modal>
    </div>
  </div>
</template>
<script>
import {authComputed} from '../vuex/helper.js'
import axios from "axios"
import Vue from 'vue'
import imageMixin from '../mixins/image'
import filterMixin from '../mixins/filters'
import Modal from '../components/Modal'
import {VueMasonryPlugin} from "vue-masonry"

Vue.use(VueMasonryPlugin)
import numeral from 'numeral'

require('numeral/locales/en-gb')
numeral.locale('en-gb')

export default {
  components: {Modal},
  mixins: [imageMixin, filterMixin],
  data: () => {
    return {
      boat: {},
      imageSuffixes: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q'],
      url: process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT,
      availableImages: [],
      imageUrl: "",
      cacheKey: +new Date(),
    }
  },
  props: {
    boatId: {
      type: Number,
      default: () => {
        return 0
      }
    },
  },
  computed: {
    ...authComputed
  },
  methods: {
    editBoat(boat) {
      this.$router.push({ name: 'boatedit', params: { boat: boat } })
    },
    showModal(imageUrl) {
      this.imageUrl = imageUrl
      this.$refs.ImageModal.showModal()
    },
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
              this.availableImages.push(imageSuffix)
            })
            .catch(() => {
              // console.clear()
            })
      })
      this.availableImages = this.availableImages.sort()
      this.isLoading = false
    })
  }
}
</script>
<style scoped>
#image {
  cursor: pointer
}
</style>