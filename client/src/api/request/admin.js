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

export const reqAddProduct = async (datas) => {
    try {
        const res = await axiosTokenHandler.post(`${backendUrl}/api/v1/admin/addProduct`, datas);
        return res.data
    } catch (error) {
        return error
    }
}


export const reqEditProduct = async (formData, id) => { // Prendre FormData en tant que premier paramètre
    try {
        const res = await axiosTokenHandler.patch(`${backendUrl}/api/v1/admin/editProduct/${id}`, formData, { // Utilisez formData comme deuxième paramètre
            headers: {
                'Content-Type': 'multipart/form-data' // Assurez-vous que le type de contenu est défini sur multipart/form-data
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
