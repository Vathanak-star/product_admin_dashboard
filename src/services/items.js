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

const updateItem = async (itemObj,id) => {
     const response = await axios.post(`${baseUrl}/updateItem/${id}`,itemObj)
     return response.data
}

const deleteItem = async (id) => {
     const response = await axios.delete(`${baseUrl}/deleteItem/${id}`)
     return response.data
}



export default {getAllItem,createItem,updateItem,deleteItem}