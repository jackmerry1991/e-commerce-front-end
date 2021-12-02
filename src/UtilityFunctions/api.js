require('dotenv').config()
const axios = require('axios').default

const backendUrl = 'http://127.0.0.1:8000'
export const getRequest = async (route) =>{
    console.log(`route: ${backendUrl}/${route}`);
    const data = await axios.get(`${backendUrl}/${route}`);
    console.log(data.data);
    return data;
}
export const searchByProduct = async (searchTerm) => {
    const searchResult = await axios.get(`${backendUrl}/products/search`, {
        params: {
            searchTerm,
        },
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        // },
    })
    return searchResult
}

export const submitLogin = async (userName, password) => {
    try{
        const successfulLogin = await axios.post(`${backendUrl}/user/login`, {
            email: userName,
            password
    });
        return successfulLogin;
    }catch(error){
        return error.response.status;
    }
}

export const userLoggedIn = async () => {
    try{
        const jwt = await document.cookie;
        console.log(jwt);
        if(jwt){
            console.log('cookie')
            console.log(jwt.token);
            return true;
        }
        console.log('false');
        return false;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const fetchUserData = async () => {
    console.log('fetching user data');
    console.log(document.cookie);
    const userData = await axios.get(`${backendUrl}/user/user`, {headers: {Authorization: `Bearer ${document.cookie}`}});
    // {headers: {Authorization: `Bearer ${coookie.}`}});
    console.log(userData);
    return userData.data;
}

export const updateUserData = async (data) => {
    console.log('updating user data');
    console.log(document.cookie);
    console.log(data);
    const userData = await axios.put(`${backendUrl}/user/`, data, {headers: {Authorization: `Bearer ${document.cookie}`}});
    console.log(userData);
}
