export const multiSelectValidationMixin = {
    data() {
        return {
            isTouched: false
        }
    },
    methods: {
        onTouch() {
            this.isTouched = true
        }
    }
}