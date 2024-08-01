export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    // console.log(parts);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
    return null;
};

export const checkIsLoggedIn = () => {
    return getCookie("sessionId") !== null;
};
