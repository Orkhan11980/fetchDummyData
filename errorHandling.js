function handleAjaxError(xhr, status, error) {
    const errorMessage = '';
    function handleAjaxError(xhr, status, error) {
        const errorMessage = (() => {
            switch (true) {
                case status === "timeout":
                    return "Request timed out. Please try again later.";
                case xhr.status === 0:
                    return "Please ensure you are connected to the internet.";
                case xhr.status === 404:
                    return "Requested resource not found.";
                case xhr.status === 500:
                    return "Internal Server Error.";
                default:
                    return `An error occurred: ${xhr.status} ${error}`;
            }
        })();
    
        $('#error-message').text(errorMessage);
    
       
    }
}