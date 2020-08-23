<template>
  <div>
    <Modal ref="ConfirmationModal" :classProp="confirmClass">
      <div class="font-bold text-xl mb-2">{{ confirmMessage }}</div>
      <div class="w-full flex justify-center" v-if="confirmMode == 'delete'">
        <button @click="deleteImage(deleteSuffix)" type="button"
                class="bg-gray-400 text-gray-700 rounded py-2 px-3 hover:bg-gray-300">OK
        </button>
        <button @click="$refs.ConfirmationModal.hideModal()" type="button"
                class="bg-gray-400 text-gray-700 rounded py-2 px-3 hover:bg-gray-300 ml-3">Cancel
        </button>
      </div>
      <div class="w-full flex justify-center" v-if="confirmMode == 'update'">
        <button @click="confirmUpdateMessage" type="button"
                class="bg-gray-400 text-gray-700 rounded py-2 px-3 hover:bg-gray-300">OK
        </button>
      </div>
    </Modal>
    <Modal ref="UploadModal">
      <form>
        <div v-if="uploadedfilesError !== ''"
             class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2" role="alert">
          <strong class="font-bold">Errors!</strong><br>
          <span class="block sm:inline" v-html="uploadedfilesError"></span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" @click="uploadedfilesError = ''"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
        <div v-if="uploadedfilesSuccess !== ''"
             class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-2" role="alert">
          <strong class="font-bold">Confirmed!</strong><br>
          <span class="block sm:inline" v-html="uploadedfilesSuccess"></span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-green-500" role="button" @click="uploadedfilesSuccess = ''"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
        <div class="font-bold text-xl mb-2">Browse for Image</div>
        <div><input type="file" id="uploadedfiles" ref="uploadedfiles" multiple v-on:change="handleImagesUpload()"/>
        </div>
        <div class="my-4">
          <div class="font-bold">Files ready to upload...</div>
          <ul class="ml-2">
            <li class="py-1" v-for="(file, index) in files"><span
                class="cursor-pointer font-bold bg-gray-300 rounded-lg px-2 pb-1"
                @click="removeUploadedFile(index)">X</span> {{ file.name }}
            </li>
          </ul>
        </div>
        <div class="w-full flex justify-center">
          <button type="button" @click="submitImages"
                  class="bg-gray-400 text-gray-700 rounded py-2 px-3 hover:bg-gray-300">Upload File(s)
          </button>
        </div>
      </form>
    </Modal>

    <div class="w-full p-5">
      <form @submit.prevent="updateBoat" class="w-full">
        <button type="button" @click="uploadModal"
                class="border-solid border-1 border-gray-900 px-4 py-1 bg-gray-400 hover:bg-gray-200">Add
          Image
        </button>
        <div class="flex flex-row flex-wrap justify-center">
          <div
              v-if="boat.boatID"
              v-for="(imageSuffix, index) in availableImages"
              id="image"
              class="relative w-auto md:w-5/12 lg:w-3/12 xl:w-1/10 m-2 p-0"
          >
            <img
                :src="getImageUrl(boat.boatID, imageSuffix) + '?rnd=' + cacheKey"
                :key="index+cacheKey"
                class="object-cover w-full md:h-48 xl:h-64 border p-0 rounded-lg"/>
            <button
                type="button"
                class="absolute right-0 top-0 px-3 pb-1 m-2 text-lg font-bold text-black cursor-pointer bg-white rounded-lg shadow-lg"
                @click="deleteConfirmation(imageSuffix)">x
            </button>
            <div
                v-if="index < availableImages.length-1"
                class="absolute transform rotate-90 bottom-0 -mb-3 left-1/2 h-18 md:rotate-0 md:right-0 md:left-auto md:top-0 px-2 pb-5 pt-4 mt-24 mr-2 text-xl font-bold text-black cursor-pointer bg-white rounded-lg shadow-lg"
                @click="swapImages(boat.boatID, imageSuffix, availableImages[index+1])">>
            </div>
            <div
                v-if="index > 0"
                class="absolute transform rotate-90 top-0 -mt-3 ml-0 left-1/2 right=0  h-18 md:rotate-0 md:left-0 md:right-auto md:top-0 px-2 pb-5 pt-4 md:mt-24 md:ml-2 text-xl font-bold text-black cursor-pointer bg-white rounded-lg shadow-lg"
                @click="swapImages(boat.boatID, availableImages[index-1], imageSuffix)"><
            </div>
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
                <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Boat Type:
                </div>
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
                <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Length OA:
                </div>
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
            <div class=" w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 text-left px-3 ">
              <div class="sm:flex">
                <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Owner Name:
                </div>
                <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                  <input
                      type="text"
                      name="ownerName"
                      v-model="boat.ownerName"
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
                </div>
              </div>
              <div class="sm:flex">
                <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Owner Email:
                </div>
                <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                  <input
                      type="text"
                      name="ownerEmail"
                      v-model="boat.ownerEmail"
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
                </div>
              </div>
              <div class="sm:flex">
                <div class="sm:flex-none text-white font-bold pr-2 w-full sm:w-36 inline-block align-top">Owner
                  Address:
                </div>
                <div class="sm:flex-1 w-full sm:w-auto text-white inline-block">
                  <TextareaAutosize
                      name="ownerAddress"
                      :min-height="100"
                      :max-height="200"
                      class="appearance-none inline-block w-full bg-white text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white"
                      v-model="boat.ownerAddress"/>
                </div>
              </div>
              <div class="sm:flex">
                <div class="sm:flex-none text-white font-bold pr-2 w-1/3 sm:w-36 inline-block align-top">Owner Price:
                </div>
                <div class="sm:flex-1 text-white w-2/3 sm:w-auto inline-block">
                  <input
                      type="text"
                      name="ownerPrice"
                      v-model="boat.ownerPrice"
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white">
                </div>
              </div>
              <div class="sm:flex">
                <div class="sm:flex-none text-white font-bold pr-2 w-full sm:w-36 inline-block align-top">Owner Notes:
                </div>
                <div class="sm:flex-1 w-full sm:w-auto text-white inline-block">
                  <TextareaAutosize
                      name="ownerNotes"
                      :min-height="100"
                      :max-height="200"
                      class="appearance-none inline-block w-full bg-white text-gray-700 border border-red-500 rounded py-1 px-3 mb-3  focus:outline-none focus:bg-white"
                      v-model="boat.ownerNotes"/>
                </div>
              </div>
            </div>
            <div class="sm:flex w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 text-left px-3 ">
              <div class="sm:flex-none text-white font-bold pr-2 w-full sm:w-36 inline-block align-top">Description:
              </div>
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
  </div>
</template>
<script>
import {authComputed} from '../vuex/helper.js'
import axios from "axios"
import Vue from 'vue'
import imageMixin from '../mixins/image'
import filterMixin from '../mixins/filters'
import Modal from '../components/Modal'
import TextareaAutosize from 'vue-textarea-autosize'

Vue.use(TextareaAutosize)
import numeral from 'numeral'
import router from "@/router";

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
      boatTypes: [{type: 'M', typeTitle: 'Motor'}, {type: 'S', typeTitle: 'Sail'}],
      boatStatuses: [{status: 'A', statusTitle: 'Available'}, {status: 'S', statusTitle: 'Sold'}, {
        status: 'P',
        statusTitle: 'Pending Information'
      }],
      uploadedfilesError: '',
      uploadedfilesSuccess: '',
      confirmMessage: '',
      confirmClass: 'bg-green-300',
      confirmMode: 'update',
      deleteSuffix: '',
      cacheKey: +new Date(),
      files: [],
    }
  },
  props: {},
  computed: {
    ...authComputed
  },
  methods: {
    showImageModal(imageUrl) {
      console.log("showModal", imageUrl)
      this.$refs.ImageModal.showModal(imageUrl)
    },
    swapImages(boatId, firstSuffix, secondSuffix) {
      axios.get(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/boat/image/swap', {
        params: {
          boatId: boatId,
          firstImageSuffix: firstSuffix,
          secondImageSuffix: secondSuffix
        }
      }).then(({data}) => {
        this.cacheKey = +new Date();
      }).catch((error) => {
        console.log("swapImages error", error)
      })
    },
    removeUploadedFile(index) {
      this.files.splice(index, 1)
      this.$refs.uploadedfiles.value = null
    },
    handleImagesUpload() {
      this.$refs.uploadedfiles.files.forEach((file) => {
        this.files.push(file);
      })
    },
    submitImages() {
      let formData = new FormData();
      formData.append('boatId', this.boat.boatID)
      this.files.forEach((file, index) => {
        formData.append('files', file);
      })
      axios.post(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/boat/image/add',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((data) => {
            this.uploadedfilesError = ''
            this.uploadedfilesSuccess = ''
            const results = JSON.parse(data.data.results)
            results.forEach((result) => {
              if (result.error) {
                this.uploadedfilesError += result.file + ': <b>' + result.error + '</b><br>'
              } else {
                this.uploadedfilesSuccess += result.file + ': <b>Uploaded!</b><br>'
              }
            })
            this.loadImages()
          })
          .catch((error) => {
            this.uploadedfilesError = ''
            console.log('FAILURE!!', error.response.data.errors)
            errors.forEach((e) => {
              this.uploadedfilesError += e.file + ':' + e.error + '<br>'
            })

          });
    },
    confirmUpdateMessage() {
      router.push({name: 'boat', params: {boatId: this.boat.boatID}});
    },
    uploadModal() {
      this.$refs.UploadModal.showModal()
    },
    showConfirmModal(confirmMessage, confirmClass, confirmMode) {
      this.confirmMode = confirmMode
      this.confirmMessage = confirmMessage
      this.confirmClass = confirmClass
      this.$refs.ConfirmationModal.showModal()
    },
    updateBoat(submitEvent) {
      this.boat.boatPrice = submitEvent.target.elements.boatPrice.value
      axios.post(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/boat/update', {
        params: {
          boat: this.boat
        }
      }).then(({data}) => {
        this.showConfirmModal("Boat Details Updated", "", 'update')
      }).catch((error) => {
        console.log("newBoat error", error)
      })
    },
    deleteConfirmation(imageSuffix) {
      this.deleteSuffix = imageSuffix
      this.showConfirmModal("Delete this image?", "", 'delete')
    },
    deleteImage(imageSuffix) {
      axios.delete(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/boat/image/delete', {
        params: {
          boatId: this.boat.boatID,
          imageSuffix: imageSuffix
        }
      })
          .then((data) => {
            this.cacheKey = +new Date();
            this.loadImages()
            this.$refs.ConfirmationModal.hideModal()
          })
          .catch((error) => {
            console.log('FAILURE!!', error);
          });
    },
    loadImages() {
      this.availableImages = []
      this.imageSuffixes.forEach((imageSuffix) => {
        this.imageExists(this.boat.boatID, imageSuffix)
            .then(({data}) => {
              console.log("imageSuffix", imageSuffix)
              this.availableImages.push(imageSuffix)
            })
            .catch((error) => {
            })
        this.availableImages = this.availableImages.sort()
      })
    }
  },
  created() {
    axios.get(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/boat/', {
      params: {
        boatId: this.$route.params.boatId
      }
    }).then(({data}) => {
      this.boat = JSON.parse(data.boat)
      this.loadImages()
    })
  }
}
</script>