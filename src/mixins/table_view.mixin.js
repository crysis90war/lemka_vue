import {localTimeStr} from "@/utils/filters";

export const tableViewMixin = {
    data() {
        return {
            items: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 20, 50, {value: 100, text: "Beaucoup"}],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
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
        onFiltered: function (filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        itemsLength: function (items) {
            if (items.length === 0 || this.items === undefined) {
                this.totalRows = 1
            } else {
                this.totalRows = items.length
            }
        }
    },

    filters: {
        localTimeStr: function (value) {
            value = localTimeStr(value)
            return value
        }
    }
}