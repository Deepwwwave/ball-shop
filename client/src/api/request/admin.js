import config from '../config';
import axiosTokenHandler from "../middlewares/auth";


let backendUrl = config();

export const reqGetAllUsers = async () => {
    try {
        const res = await axiosTokenHandler.get(`${backendUrl}/api/v1/admin/getAllUsers`);
        return res.data
    } catch (error) {
        return error
    }
}

export const reqGetAllOrders = async () => {
    try {
        const res = await axiosTokenHandler.get(`${backendUrl}/api/v1/admin/getAllOrders`);
        return res.data
    } catch (error) {
        return error
    }
}

export const reqAddProduct = async (formDatas) => {
    try {
        const res = await axiosTokenHandler.post(`${backendUrl}/api/v1/admin/addProduct`, formDatas, { 
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        });
        return res.data
    } catch (error) {
        return error
    }
}


export const reqEditProduct = async (formData, id) => { 
    try {
        const res = await axiosTokenHandler.patch(`${backendUrl}/api/v1/admin/editProduct/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data
    } catch (error) {
        return error
    }
}

export const reqDeleteProduct = async (id) => {
    try {
        const res = await axiosTokenHandler.delete(`${backendUrl}/api/v1/admin/deleteProduct/${id}`);
        return res.data
    } catch (error) {
        return error
    }
}
