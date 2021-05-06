export function htmlTitle(titre = null) {
    if (isNullOrWhiteSpace(titre)) {
        return 'LEMKA - Atelier de couture'
    } else {
        return titre + ' | LEMKA - Atelier de couture'
    }
}

export function isNullOrWhiteSpace(title) {
    return title === null || title.match(/^ *$/) !== null;
}

export function EstEntier(number) {
    return !isNaN(parseInt(number) && isFinite(number))
}

export function format(time) {
    if (time) {
        return time.replace(/(?:0)?(\d+):(?:00)?(\d+).*/, '$1:$2');
    }
}

export function handleResponse(response) {
    if (response.status === 204) {
        return '';
    } else if (response.status === 404) {
        return null;
    } else {
        return response.data;
    }
}

export function makeToast(vm, variant = 'info', message = '', title = '') {
    vm.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true
    })
}

export function getMainImage(images) {
    if (images.length > 0) {
        let image = images.find(img => img.is_main === true)
        return image.image
    } else {
        return require('@/assets/noimage.png')
    }
}

export default {
    htmlTitle,
    isNullOrWhiteSpace,
    EstEntier,
    format,
    handleResponse,
    makeToast,
    getMainImage
}