import axios from "axios";
const baseUrl = 'http://localhost:8000/api/auth'

const login = async (userObj) => {
     const response = await axios.post(`${baseUrl}/login`,userObj)
     return response.data
}

const register = async (userObj) => {
    const response = await axios.post(`${baseUrl}/register`,userObj)
    return response.data
}

const users = async () => {
    const respones = await axios.get(`${baseUrl}/Users`)
    return respones.data
}

export default {login,register,users}