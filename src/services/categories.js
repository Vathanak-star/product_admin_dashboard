import axios from "axios";
const baseUrl = 'http://localhost:8000/api'

const getAllCategories = async () => {
     const response = await axios.get(`${baseUrl}/mainCategory`)
     return response.data
}

const getSubCategories = async () => {
    const response = await axios.get(`${baseUrl}/subCategory`)
    return response.data
}

const addMainCategory = async (mainCatObj) => {
    const response = await axios.post(`${baseUrl}/addMainCategory`,mainCatObj)
    return response.data
}

const addSubCategory = async (subCatObj) => {
    const response = await axios.post(`${baseUrl}/addSubCategory`,subCatObj)
    return response.data
}

const updateMainCategory = async (mainCatObj,id) => {
    const response = await axios.post(`${baseUrl}/updateMainCategory/${id}`,mainCatObj)
    return response.data
}

const updateSubCategory = async (subCatObj,id) => {
    const response = await axios.post(`${baseUrl}/updateSubCategory/${id}`,subCatObj)
    return response.data
}

const deleteMainCategory = async (id) => {
    const response = await axios.delete(`${baseUrl}/deleteMainCategory/${id}`)
    return response.data
}

const deleteSubCategory = async (id) => {
    const response = await axios.delete(`${baseUrl}/deleteSubCategory/${id}`)
    return response.data
}



export default {getAllCategories, getSubCategories,addMainCategory,addSubCategory,deleteMainCategory,deleteSubCategory,updateMainCategory,updateSubCategory}