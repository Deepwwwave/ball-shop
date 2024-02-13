import axios from "axios"
import config from "../config";

let backendUrl = config();

export const reqGetAllProducts = async () => {
    try {
        const res = await axios.get(`${backendUrl}/api/v1/product`);
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getOneProduct = async (id) => {
    try {
        const res = await axios.get(`${backendUrl}/api/v1/product/${id}`);
        return res.data
    } catch (error) {
        return error
    }
}

