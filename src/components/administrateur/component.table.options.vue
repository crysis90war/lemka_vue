<template>
  <div></div>
</template>

<script>
export default {
  name: "LemkaTableOptions",
  props: {
    fields: {
    },
    totalRows: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },
    perPage: {
      type: Number,
    },
    pageOptions: {
      type: Array,
    },
    sortBy: {
      type: String,
    },
    sortDesc: {
      type: Boolean,
    },
    sortDirection: {
      type: String,
    },
    filter: {
    },
    filterOn: {
    },
    sortOptions: {}
  },
  data() {
    return {
      // totalRows: 1,
      // currentPage: 1,
      // perPage: 5,
      // pageOptions: [5, 10, 15, {value: 100, text: "Show a lot"}],
      // sortBy: '',
      // sortDesc: false,
      // sortDirection: 'asc',
      // filter: null,
      // filterOn: [],
    }
  },
  // computed: {
  //   sortOptions() {
  //     // Create an options list from our fields
  //     return this.fields
  //         .filter(f => f.sortable)
  //         .map(f => {
  //           return {text: f.label, value: f.key}
  //         })
  //   }
  // },
}
</script>

<style scoped>

</style>