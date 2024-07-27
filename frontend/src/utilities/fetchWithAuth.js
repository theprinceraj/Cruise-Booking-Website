/**
 * Sends a fetch request with authentication credentials.
 *
 * This function is used to send a fetch request to the specified URL, with the option to include authentication credentials.
 * It checks the environment to determine the base URL to use, based on whether the application is running in production or development mode.
 * The function returns a Promise that resolves to the response from the fetch request.
 *
 * @param {string} url - The URL to send the request to.
 * @param {Object} [options={}] - Additional options to pass to the fetch request. These options can include headers, method, body, etc.
 * @return {Promise<Response>} A Promise that resolves to the response from the fetch request.
 */
export const fetchWithAuth = async (url, options = {}) => {
    const baseUrl = import.meta.env.PROD ? window.location.origin : import.meta.env.VITE_BACKEND_BASE_URL;
    const response = await fetch(`${baseUrl}${url}`, {
        ...options,
        credentials: "include",
    });
    return response;
};
