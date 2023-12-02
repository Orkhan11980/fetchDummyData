function handleAjaxError(xhr, status, error) {
    let errorMessage = '';

    if (status === "timeout") {
        errorMessage = "Request timed out. Please try again later.";
    } else if (xhr.status === 0) {
        errorMessage = "Please ensure you are connected to the internet.";
    } else if (xhr.status === 404) {
        errorMessage = "Requested resource not found.";
    } else if (xhr.status === 500) {
        errorMessage = "Internal Server Error.";
    } else {
        errorMessage = `An error occurred: ${xhr.status} ${error}`;
    }

    $('#error-message').text(errorMessage);
}
