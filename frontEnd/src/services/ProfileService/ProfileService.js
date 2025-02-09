import toast from "react-hot-toast"
import { backendUrl } from "../../server"
import { get_data } from "../data_requests/get_data_request"
import { post_data_fetch } from "../data_requests/post_data_fetch"
import { makePutRequest } from "../data_requests/put_request"
import { makeDeleteRequest } from "../data_requests/delete_request"

export const getUserProfile = async (userId) => {
    try {
        const responce = await get_data(`${backendUrl}/api/v1/profileData/${userId}`)
        return responce.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateUserProfile = async (data) => {
    const toast_id = toast.loading("Updating profile...")
    try {
        const responce = await makePutRequest(`${backendUrl}/api/v1/profileUpdate`, data)
        if(responce.success === true) {
            toast.success(responce.message)
        } else {
            toast.error(responce.message)
        }
        return responce
    } catch (error) {
        console.log(error)
        throw error

    }
    finally {
        toast.dismiss(toast_id)
    }
}   

export const changePassword = async (userIdData) => {
    const toast_id = toast.loading("Changing password...")
    try {
        const responce = await makePutRequest(`${backendUrl}/api/v1/changePassword`, userIdData)

        if(responce.success === true) {
            toast.success(responce.message)
        } else {
            toast.error(responce.message)
        }
        return responce
    } catch (error) {
        console.log(error)
        throw error
    }   
    finally {
        toast.dismiss(toast_id)
    }
}

export const deleteAccount = async (userId , navigate) => {
    try {
        const responce = await makeDeleteRequest(`${backendUrl}/api/v1/deleteAccount`, userId)
        if(responce.success === true) {
            toast.success(responce.message)
            navigate('/signup')
        } else {
            toast.error(responce.message)
        }

        return responce
        
    } catch (error) {
        console.log(error)
        throw error
    }

}