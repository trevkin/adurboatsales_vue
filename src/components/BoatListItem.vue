<template>
<!--	<tr @click="viewBoat(boat.boatId)">-->
<!--		<td class="px-2" align="left"><img v-bind:src="getImageUrl(boat.boatId, 'a')" class="object-cover w-20 border"/></td>-->
<!--		<td class="px-2" align="left">{{ boat.boatNumber }}</td>-->
<!--		<td class="px-2" align="left">{{ boat.boatShortDesc }}</td>-->
<!--		<td class="px-2" align="left">£{{ boat.boatPrice }}</td>-->
<!--	</tr>-->
	<div @click="viewBoat(boat.boatId)" class="max-w-sm rounded-lg overflow-hidden shadow-lg m-3 bg-white">
		<img v-bind:src="getImageUrl(boat.boatId, 'a')" class="w-full"/>
		<div class="px-6 py-4">
			<div class="font-bold text-xl mb-2">{{ boat.boatModel }} £{{ boat.boatPrice }}</div>
			<p class="text-gray-700 text-base">
				{{ boat.boatShortDesc }}
			</p>
		</div>
		<div class="px-6 py-4">
			<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#test</span>
			<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
			<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
		</div>
	</div>
</template>
<script>
    import axios from "axios"
    import imageMixin from '../mixins/image'

    export default {
        name: 'BoatItem',
        mixins: [imageMixin],
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
            }

        }
    }
</script>
<style scoped>
	td {
		cursor: pointer
	}
</style>
