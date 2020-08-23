<template>
  <div class="flex-column justify-center py-4 pb-10">
    <table cellpadding="20" cellspacing="20">
      <AdminListItem
          v-for="(boat, index) in sortedBoats"
          v-bind:boat="boat"
          v-bind:index="index"
          v-bind:key="index"/>
    </table>
    <div class="flex justify-center">fdafadsf
      <button class="px-4 font-weight-bold" @click="prevPage" v-if="this.currentPage > 1">Previous</button>
      <button class="px-4 font-weight-bold" @click="nextPage" v-if="(this.currentPage*this.pageSize) < this.boats.length">Next</button>
    </div>
  </div>
</template>
<script>
import AdminListItem from './AdminListItem'

export default {
  components: {
    AdminListItem
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