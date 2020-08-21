<template>
  <div class="flex-column justify-center py-4 pb-10">
    <div class="flex flex-wrap w-full justify-center">
      <BoatListItem data-aos="slide-up" data-aos-delay="300" v-for="(boat, index) in sortedBoats"
                    v-bind:boat="boat"
                    v-bind:index="index"
                    v-bind:key="index"/>
    </div>
  </div>
</template>
<script>
import BoatListItem from './BoatListItem'

export default {
  components: {
    BoatListItem
  },
  data: () => {
    return {
      currentSort: 'boatNumber',
      currentSortDir: 'asc',
      pageSize: 10,
      currentPage: 1,
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
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },
    nextPage: function () {
      if ((this.currentPage * this.pageSize) < this.boats.length) this.currentPage++;
    },
    prevPage: function () {
      if (this.currentPage > 1) this.currentPage--;
    }
  },
  computed: {
    sortedBoats: function () {
      return this.boats
    }
  }
}
</script>