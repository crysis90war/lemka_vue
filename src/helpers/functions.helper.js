export function customConsole(response, message = 'Message') {
    console.log('== DEBUG - ' + message + ' ==');
    console.log(response);
    console.log('== END DEBUG ==');
}

export function handleError(error) {
    // Error 😨
    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        customConsole(error.response.data, 'error response data')
        customConsole(error.response.status, 'error response status')
        customConsole(error.response.headers, 'error response headers')
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        customConsole(error.request, 'error request');
    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
    }
    console.log(error);
}

/**
 * Exemple d'utilisation :
 * let imageUrl = canvas.toDataURL()
 * let block = imageUrl.split(";");
 * let contentType = block[0].split(":")[1];
 * let realData = block[1].split(",")[1];
 * let blob = this.b64toBlob(realData, contentType);
 * @param b64Data
 * @param contentType
 * @param sliceSize
 * @returns {Blob}
 */
export function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
}

/**
 * Exemple d'utilisation :
 * urltoFile('data:image/png;base64,......', 'a.png')
 * .then(function(file){
 *      console.log(file);
 * })
 * @param url
 * @param filename
 * @param mimeType
 * @returns {Promise<File>}
 */
export function urltoFile(url, filename, mimeType) {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
    return (fetch(url)
            .then(function (res) {
                return res.arrayBuffer();
            })
            .then(function (buf) {
                return new File([buf], filename, {type: mimeType});
            })
    );
}

/**
 * Fonction permettant de transformer Base64 vers un fichier.
 * Exemple d'utilisation :
 * let formData = new FormData()
 * let file = this.dataURLtoFile(canvas.toDataURL())
 * formData.append('image', file, 'image.jpg')
 * this.formData = formData
 * @param dataurl
 * @param filename
 * @returns {File}
 */
export function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}