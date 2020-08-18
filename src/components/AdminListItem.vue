<template>
	<tr @click="viewBoat(boat.boatId)">
		<td class="px-2" align="left"><img v-bind:src="getImageUrl(boat.boatId, 'a')" class="object-cover w-20 border"/></td>
		<td class="px-2" align="left">{{ boat.boatNumber }}</td>
		<td class="px-2" align="left">{{ boat.boatShortDesc }}</td>
		<td class="px-2" align="left">£{{ boat.boatPrice }}</td>
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
	td {
		cursor: pointer
	}
</style>
