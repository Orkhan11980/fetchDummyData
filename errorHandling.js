function handleAjaxError(response) {
   
    if (!response.ok) {
        switch (response.status) {
            case 408: 
                return "Request timed out. Please try again later.";
            case 404:
                return "Requested resource not found.";
            case 500:
                return "Internal Server Error.";
            default:
                return `An error occurred: ${response.status} ${response.statusText}`;
        }
    }
    return null; 
}