export const handleError = (Error) => {
    const status = Error?.status || Error?.response?.status;
    const code = Error?.code || Error?.response?.code;
    const dev_msg = Error?.response?.data?.message || ""
    let error = {
        message: "Something went wrong. Please try again later.",
        dev_msg,
        status,
        code,
    }
    if (status === 400) {
        error.message = "Oops! Something went wrong with your request. Please try again.";
    } else if (status === 401) {
        error.message = "You are not authorized. Please log in."
    } else if (status === 403) {
        error.message = "You don't have permission to access this resource.";
    } else if (status === 404) {
        error.message = "The requested resource could not be found.";
    } else if (status === 500) {
        error.message = "We're fetching some technical glitch at the moment. Please try again later.";
    } else if (code === 'ECONNABORTED' || code === 'ERR_NETWORK') {
        error.message = "The request timed out. Please check your connection.";
    }

    return error;
};