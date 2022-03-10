require('dotenv').config()
const axios = require('axios').default

const backendUrl = 'http://127.0.0.1:8000'

export const getRequest = async (route) =>{
    console.log(`route: ${backendUrl}/${route}`);
    const data = await axios.get(`${backendUrl}/${route}`);
    console.log(data.data);
    return data;
}
export const searchByProduct = async (destination, searchTerm) => {
    console.log('searchByProduct');
    console.log(`backendUrl: ${backendUrl}`);
    const searchResult = await axios.get(`${backendUrl}/products/${destination}`, {
        params: {
            searchTerm,
        },
    })
    return searchResult
}

export const postData = async(destination, data) => {
    try{
        console.log(data);
        console.log(`${backendUrl}${destination}`)
        const result = await axios.post(`${backendUrl}${destination}`, data, {headers: {Authorization: `Bearer ${document.cookie}`}});
        console.log(result);
        return result;
    }catch(error){
        return error;
    }
}

export const deleteData = async(destination, data) => {
    try{
        console.log(data);
        console.log(`${backendUrl}${destination}`)
        const result = await axios.delete(`${backendUrl}${destination}`, {headers: {Authorization: `Bearer ${document.cookie}`}, data});
        console.log(result);
        return result;
    }catch(error){
        return error;
    }
}

export const setUser = (data) => {
    localStorage.setItem('userId', data)
}

export const getUser = () => localStorage.getItem('userId');

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

export const fetchProductData = async (id) => {
    console.log('fetching product data');
    const productData = await axios.get(`${backendUrl}/${id}}`);
    return productData;
}

export const fetchDataProtected = async (destination) => {
    try{
        const response = await axios.get(`${backendUrl}/${destination}`, {headers: {Authorization: `Bearer ${document.cookie}`}});
        return response;
    }catch(error){
        if(error.response.status === 401){
            console.log('expire token');
            localStorage.removeItem('userId');
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.href="/sign-in"
            return error.response.status;
        }
        return error;
    }
}

export const fetchData = async (destination) => {
    console.log('fetch data called');
    console.log(destination);
    const response = await axios.get(`${backendUrl}/${destination}`);
    console.log(response);
    return response;
}