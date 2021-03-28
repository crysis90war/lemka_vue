import {actionModal} from "@/utils/tools";

const METHODS = {
    methods: {
        monModal(id, ouvrir = true) {
            actionModal(this, id, ouvrir);
        }
    }
}

export default METHODS;