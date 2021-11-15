require('dotenv').config()
const axios = require('axios').default

const backendUrl = 'http://127.0.0.1:8000'

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
        console.log('successful login');
        console.log(successfulLogin);
        return successfulLogin;
    }catch(error){
        console.log(error);
        return error.response.status;
    }
}
