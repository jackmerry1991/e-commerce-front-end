require('dotenv').config()
const axios = require('axios').default

const backendUrl = 'http://127.0.0.1:8000'

const searchByProduct = async (searchTerm) => {
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

export default searchByProduct
