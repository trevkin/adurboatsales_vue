<template>
	<div class="flex-column justify-center py-4 pb-10">
		<div class="flex flex-wrap w-full justify-center">
			<BoatListItem data-aos="slide-up" data-aos-delay="300" v-for="(boat, index) in sortedBoats"
				v-bind:boat="boat"
				v-bind:index="index"
				v-bind:key="index"/>

		</div>
<!--
<div class="flex justify-center">-->
<!--			<button class="px-4 font-weight-bold" @click="prevPage" v-if="this.currentPage > 1">Previous</button>-->
<!--			<button class="px-4 font-weight-bold" @click="nextPage" v-if="(this.currentPage*this.pageSize) < this.boats.length">Next</button>-->
<!--		</div>-->
	</div>
</template>
<script>
    import BoatListItem from './BoatListItem'
    import axios from "axios";

    export default {
        components: {
            BoatListItem
		},
		data: () => {
            return {
                currentSort: 'boatNumber',
                currentSortDir: 'asc',
                pageSize:10,
                currentPage:1,
            }
        },
        props: {
            boats: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
		methods: {
            loadMoreBoats() {
                console.log("loadMoreBoats start")
                let order = "ASC"
                let orderBy = "boatPrice"
                let type = ""
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
            },
            sort:function(s) {
                //if s == current sort, reverse
                if(s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
                }
                this.currentSort = s;
            },
            nextPage:function() {
                if((this.currentPage*this.pageSize) < this.boats.length) this.currentPage++;
            },
            prevPage:function() {
                if(this.currentPage > 1) this.currentPage--;
            }
		},
        computed:{
            sortedBoats:function() {
                return this.boats
                // return this.boats.sort((a,b) => {
                //     let modifier = 1;
                //     if(this.currentSortDir === 'desc') modifier = -1;
                //     if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                //     if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                //     return 0;
                // }).filter((row, index) => {
                //     let start = (this.currentPage-1)*this.pageSize;
                //     let end = this.currentPage*this.pageSize;
                //     if(index >= start && index < end) return true;
                // });
            }
        }
    }
</script>