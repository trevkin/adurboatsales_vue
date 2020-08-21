<template>
  <!--	<tr @click="viewBoat(boat.boatId)">-->
  <!--		<td class="px-2" align="left"><img v-bind:src="getImageUrl(boat.boatId, 'a')" class="object-cover w-20 border"/></td>-->
  <!--		<td class="px-2" align="left">{{ boat.boatNumber }}</td>-->
  <!--		<td class="px-2" align="left">{{ boat.boatShortDesc }}</td>-->
  <!--		<td class="px-2" align="left">£{{ boat.boatPrice }}</td>-->
  <!--	</tr>-->
  <div @click="viewBoat(boat.boatId)" class="max-w-sm rounded-lg overflow-hidden shadow-lg m-3 bg-white cursor-pointer">
    <img
        :src="getImageUrl(boat.boatId, 'a')"
        @error="imgPlaceholder"
        class="w-full h-64 object-cover"/>

    <div v-if="boat.boatManufacturer" class="px-6  pt-3">
      <div class="font-bold pr-2 w-1/4 inline-block align-top">
        Builder:
      </div>
      <div class="w-3/4 inline-block">{{ boat.boatManufacturer }}
      </div>
    </div>
    <div v-if="boat.boatModel" class="px-6">
      <div class="font-bold pr-2 w-1/4 inline-block align-top">
        Model:
      </div>
      <div class="w-3/4 inline-block">{{ boat.boatModel }}</div>
    </div>
    <div v-if="boat.boatLengthOA" class="px-6">
      <div class="font-bold pr-2 w-1/4 inline-block align-top">
        Length:
      </div>
      <div class="w-3/4 inline-block">{{ boat.boatLengthOA }}</div>
    </div>
    <div v-if="boat.boatPrice" class="px-6">
      <div class="font-bold pr-2 w-1/4 inline-block align-top">
        Price:
      </div>
      <div class="w-3/4 inline-block">{{
          boat.boatPrice |
              removePunctuation | addPunctuation
        }}
      </div>
    </div>
    <div class="px-6 py-4">

      <p class="text-gray-700 text-base">
        {{ boat.boatShortDesc }}
      </p>
    </div>
  </div>
</template>
<script>
import imageMixin from '../mixins/image'
import filterMixin from '../mixins/filters'

export default {
  name: 'BoatItem',
  mixins: [imageMixin, filterMixin],
  props: {
    boat: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    viewBoat: function (boatId) {
      console.log("boatId:" + boatId)
      this.$router.push({name: 'boat', params: {boatId: boatId}})
    },
    imgPlaceholder(e) {
      console.log("imgPlaceholder")
      e.target.src = require('@/assets/images/image-coming-soon.png')
    },
  }
}
</script>
<style scoped>
td {
  cursor: pointer
}
</style>
