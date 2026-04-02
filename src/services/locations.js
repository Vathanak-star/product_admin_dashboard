import axios from "axios";
const baseUrl = 'http://localhost:8000/api'

const getAll = () => {
    const response = axios.get(`${baseUrl}/locationsAll`)
    return response.then(response => response.data)
}

const addLocation = async (locationObj) => {
    const request = await axios.post(`${baseUrl}/addLocation`,locationObj)
    return request.data
}

const updateLocation = async (locationObj,id) => {
    const request = await axios.post(`${baseUrl}/updateLocation/${id}`,locationObj)
    return request.message
}

const deleteLocation = async (id) => {
    const request = await axios.delete(`${baseUrl}/deleteLocation/${id}`)
    return request.message
}
export default {getAll,addLocation,updateLocation,deleteLocation}