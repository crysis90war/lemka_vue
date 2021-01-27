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