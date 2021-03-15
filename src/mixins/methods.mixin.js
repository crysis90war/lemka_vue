import Outils from "@/utils/tools";

const METHODS = {
    methods: {
        monModal(id, ouvrir = true) {
            Outils.actionModal(this, id, ouvrir);
        }
    }
}

export default METHODS;