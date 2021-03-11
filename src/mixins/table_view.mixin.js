import {localTimeStr} from "@/utils/filters";

export const tableViewMixin = {
    data() {
        return {
            // items: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 20, 50, {value: 100, text: "Beaucoup"}],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            isBusy: false,
            options: [],
        }
    },

    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return {text: f.label, value: f.key}
                })
        },
        filterOnOptions: function () {
            return this.fields
                .filter(f => f.key)
                .map(f => {
                    return {text: f.label, value: f.key}
                })
        }
    },

    methods: {
        onFiltered: function(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        toggleBusy: function() {
            this.isBusy = !this.isBusy
        }
    },

    filters: {
        localTimeStr: function (value) {
            value = localTimeStr(value)
            return value
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length
    },
}