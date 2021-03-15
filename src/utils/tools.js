class Tools {
    htmlTitle(titre = null) {
        if (this.isNullOrWhiteSpace(titre)) {
            return 'LEMKA - Atelier de couture'
        } else {
            return titre + ' | LEMKA - Atelier de couture'
        }
    }

    isNullOrWhiteSpace(title) {
        return title === null || title.match(/^ *$/) !== null;
    }

    EstEntier(number) {
        return !isNaN(parseInt(number) && isFinite(number))
    }

    format(time){
        if (time) {
            return time.replace(/(?:0)?(\d+):(?:00)?(\d+).*/,'$1:$2');
        }
    }

    handleResponse(response) {
        if (response.status === 204) {
            return '';
        } else if (response.status === 404) {
            return null;
        } else {
            return response.data;
        }
    }

    makeToast(vm, variant = 'info', message = '', title = '') {
        vm.$bvToast.toast(message, {
            title: title,
            variant: variant,
            solid: true
        })
    }

    actionModal(vm, id, ouvrir = true) {
        if (ouvrir === true) {
            vm.$bvModal.show(id)
        }
        else {
            vm.$bvModal.hide(id)
        }
    }
}

export default new Tools();