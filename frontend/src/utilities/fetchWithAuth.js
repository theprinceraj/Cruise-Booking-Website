/**
 * Sends a fetch request with authentication credentials.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} [options={}] - Additional options to pass to the fetch request.
 * @return {Promise<Response>} A Promise that resolves to the response from the fetch request.
 */
export const fetchWithAuth = async (url, options = {}) => {
    const response = await fetch(url, {
        ...options,
        credentials: "include",
    });
    return response;
};
