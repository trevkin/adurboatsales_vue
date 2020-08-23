<template>
  <tr @click="viewBoat(boat.boatId)" valign="top">
    <td class="px-2" align="left"><img v-bind:src="getImageUrl(boat.boatId, 'a')" class="object-cover md:h-24 w-32"/></td>
    <td class="px-2" align="left">
      <div class="inline-block">{{ boat.boatNumber }}</div>
      <div class="inline-block pl-3">{{ boat.boatName }}</div>
      <div class="inline-block pl-3">{{ boat.boatPrice | removePunctuation | addPunctuation }}</div>
      <div>{{ boat.boatShortDesc }}</div>
      <div>{{ boat.boatStatusTitle }}</div>
    </td>
  </tr>
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
th, td {
  cursor: pointer;
  padding: 5px;
}
</style>
