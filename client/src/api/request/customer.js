import axios from "axios";
import axiosTokenHandler from "../middlewares/auth";
import config from '../config';

let backendUrl = config();


export const refreshToken = async () => {
    try {
        const res = await axiosTokenHandler.get(`${backendUrl}/api/v1/customer/refreshToken`,{
    })
        return res.data
    } catch (error) {
        return error
    }
}

export const signUp = async (datas) => {
    try {
        const res = await axios.post(`${backendUrl}/api/v1/customer/signUp`, datas)
        return res.data
    } catch (error) {
        console.error('Error : ', error)
        return error
    }
}

export const signIn = async (datas) => {
    try {
        const res = await axios.post(`${backendUrl}/api/v1/customer/signIn`, datas)
        return res.data
    } catch (error) {
        return error
    }
}

export const validateAccount = async (uuid) => {
    try {
        const res = await axiosTokenHandler.patch(`${backendUrl}/api/v1/customer/validateAccount/${uuid}`,{})
        return res.data
    } catch (error) {
        console.error('error', error)
        return error
    }
}

export const forgottenPassword = async (datas) => {
    try {
        const res = await axios.post(`${backendUrl}/api/v1/customer/forgottenPassword`, datas)
        return res.data
    } catch (error) {
        return error
    }
}

export const updatePassword = async (datas, uuid) => {
    try {
        const res = await axiosTokenHandler.patch(`${backendUrl}/api/v1/customer/updatePassword/${uuid}`, datas)
        return res.data
    } catch (error) {
        return error
    }
}


export const getOneUser = async (uuid) => {
    try {
        const res = await axiosTokenHandler.get(`${backendUrl}/api/v1/customer/${uuid}`)
        return res.data
    } catch (error) {
        return error
    }
}

export const editUser = async (datas, uuid) => {
    try {
        const res = await axiosTokenHandler.patch(`${backendUrl}/api/v1/customer/editUser/${uuid}`, datas)
        return res.data
    } catch (error) {
        return error
    }
}


//// A REVOIR POUR LES PARAMETRE A PASSER (voir avec le controller addOrder)
export const reqAddOrder = async (datas) => {
    try {
        const res = await axios.post(`${backendUrl}/api/v1/customer/addOrder`, datas)
        return res.data
    } catch (error) {
        return error
    }
}




















