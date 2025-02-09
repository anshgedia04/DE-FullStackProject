import toast from "react-hot-toast";
import { post_data_fetch } from "../data_requests/post_data_fetch";
import { backendUrl } from "../../server";


export const markReviewed = async (orderId) => {
    const toast_id = toast.loading('loading...');
    try{
        const responce = await post_data_fetch(`${backendUrl}/api/v1/markReviewed`,orderId)
        if(responce.success === true){
            toast.success(responce.message)
        }
        else{
            toast.error(responce.message)
        }
    }
    catch(error) {
        console.log("error in mark reviewed order for admin",error.message);
    }
    toast.dismiss(toast_id);
}

export const markDispatched = async (orderId) => {
    const toast_id = toast.loading('loading...');
    try{
        const responce = await post_data_fetch(`${backendUrl}/api/v1/markDispatched`,orderId)
        if(responce.success === true){
            toast.success(responce.message)
        }
        else{
            toast.error(responce.message)
        }
    }
    catch(error) {
        console.log("error in markDispatched order for admin",error.message);
    }
    toast.dismiss(toast_id);
}

export const markDelivered = async (orderId) => {
    const toast_id = toast.loading('loading...');
    try{
        const responce = await post_data_fetch(`${backendUrl}/api/v1/markDelivered`,orderId)
        if(responce.success === true){
            toast.success(responce.message)
        }
        else{
            toast.error(responce.message)
        }
    }
    catch(error) {
        console.log("error in markDelivered order for admin",error.message);
    }
    toast.dismiss(toast_id);
}


export const markPending= async (orderId) => {
    const toast_id = toast.loading('loading...');
    try{
        const responce = await post_data_fetch(`${backendUrl}/api/v1/markPending`,orderId)
        if(responce.success === true){
            toast.success(responce.message)
        }
        else{
            toast.error(responce.message)
        }
    }
    catch(error) {
        console.log("error in markDelivered order for admin",error.message);
    }
    toast.dismiss(toast_id);
}