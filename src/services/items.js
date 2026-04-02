import axios from "axios";
const baseUrl = 'http://localhost:8000/api'

const getAllItem = async () => {
     const response = await axios.get(`${baseUrl}/items`)
     return response.data
}

const createItem = async (itemObj) => {
     const response = await axios.post(`${baseUrl}/createItem`,itemObj)
     return response.data
}

export default {getAllItem,createItem}