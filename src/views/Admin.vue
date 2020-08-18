<template>
	<div>
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
                batchSize: 3,
            }
        },
		methods: {
            loadMoreBoats() {
                console.log("here")
                let order = "ASC"
                let orderBy = "boatPrice"
                let type = ""
                let status = "A"
                this.busy = true
                axios.get(process.env.VUE_APP_API_URL + ":" + process.env.VUE_APP_API_PORT + '/api/boat/list', {
                    params: {
                        order,
                        orderBy,
                        type,
                        status,
                        limitFrom: this.lastRecord,
                        batchSize: this.batchSize
                    }
                }).then(({data}) => {
                    this.lastRecord += this.batchSize
                    const append = JSON.parse(data.boats)
                    console.log("append", append)
                    if (append.length > 0) {
                        this.boats = this.boats.concat(append)
                        console.log("loadMoreBoats success", this.boats)
                    } else {
                        console.log("complete")
                    }

                }).catch((error) => {
                    console.log("loadMoreBoats error", error)
                })
            }
		},
		mounted() {
            console.log("mounted created")
            this.loadMoreBoats()
        },
        created() {
            console.log("dashboard created")
            this.loadMoreBoats()
        }
    }
</script>
