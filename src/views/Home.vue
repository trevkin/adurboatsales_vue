<template>
	<div>
		<BoatList v-bind:boats="boats"/>
		<InfiniteLoading @infinite="loadMoreBoats"></InfiniteLoading>
	</div>
</template>

<script>
    import {authComputed} from '../vuex/helper.js'
    import axios from "axios"
    import BoatList from "../components/BoatList"
    import fragment from "vue-fragment"
    import InfiniteLoading from 'vue-infinite-loading'

    export default {
        components: {InfiniteLoading, BoatList, fragment},
        data() {
            return {
                isLoading: true,
                boats: [],
                welcome: "Hello",
                busy: false,
                lastRecord: 0,
                batchSize: 3,
            }
        },
        methods: {
            loadMoreBoats($state) {
                console.log("loadMoreBoats start")
                let order = "ASC"
                let orderBy = "boatPrice"
                let type = ""
                this.busy = true
                axios.get(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/boat/list', {
                    params: {
                        order,
                        orderBy,
                        type,
                        limitFrom: this.lastRecord,
                        batchSize: this.batchSize
                    }
                }).then(({data}) => {
                    this.lastRecord += this.batchSize
                    const append = JSON.parse(data.boats)

                    this.boats = this.boats.concat(append)
                    console.log("loadMoreBoats success", this.boats)
                    $state.loaded()
                }).catch((error) => {
                    console.log("loadMoreBoats error", error)
				})
            }
        },
        computed: {
            ...authComputed
        },
        created() {
            this.loadMoreBoats()
        }
    }
</script>
