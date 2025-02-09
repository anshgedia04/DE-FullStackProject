import { backendUrl } from "../../server"
import { get_data } from "../data_requests/get_data_request"
import { post_data_fetch } from "../data_requests/post_data_fetch"


export const getUserProfile = async (userId) => {
    try {
        const responce = await get_data(`${backendUrl}api/v1/profileData/${userId}`)
        return responce.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateUserProfile = async (data) => {
    const toast_id = toast.loading("Updating profile...")
    try {
        const responce = await post_data_fetch(`${backendUrl}/api/v1/profileUpdate`, data)
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
        const responce = await post_data_fetch(`${backendUrl}/api/v1/changePassword`, userIdData)

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

export const deleteAccount = async (userId) => {
    try {
        const responce = await post_data_fetch(`${backendUrl}/api/v1/deleteAccount`, userId)
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

}