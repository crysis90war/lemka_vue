import Outils from "@/mixins/outils.mixin";

const METHODS = {
    methods: {
        monModal(id, ouvrir = true) {
            Outils.actionModal(this, id, ouvrir);
        }
    }
}

export default METHODS;