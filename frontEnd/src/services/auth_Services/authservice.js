
import { post_data_fetch } from "../data_requests/post_data_fetch";
import {toast} from 'react-hot-toast';
import { setToken, setUser } from "../../redux/Slices/authSlice";
import { backendUrl } from "../../server";

//send otp
export const send_otp = async (email_data) => {
    const toast_id = toast.loading('sending OTP...');
    try{
        const responce = await post_data_fetch(`${backendUrl}/api/v1/sendotp` , email_data);
        if(responce.success === true){
            toast.success('OTP sent successfully');
        }
        else{
            toast.error(responce.message);
        }
    }
    catch(error){
        toast.error('failed to send OTP');
        console.log("error in send_otp function:", error.message);
    }
    toast.dismiss(toast_id);
}

// signup handler
export const sign_up = async (sign_up_data , navigate) => {
    
    try {
        const responce = await post_data_fetch( `${backendUrl}/api/v1/signup` , sign_up_data);
        if(responce.success === true){
            toast.success('signed up successfully');
            navigate('/login');
        }
        else{
            toast.error(responce.message);
        }
        return responce;
    }
    catch(error){
        toast.error('failed signing up ');
        console.log('error in sign_up function' , error.message);
    }
}

// login handler
export const login = async (login_data ,dispatch, navigate) => {
    const toast_id = toast.loading('please wait...');
    try{
        const responce = await post_data_fetch( `${backendUrl}/api/v1/login`, login_data);
        if(responce.success === true){
            toast.success('logged in successfully');

            dispatch(setToken(responce.token))
            dispatch(setUser(responce.user))

            localStorage.setItem('token', JSON.stringify(responce.token));
            localStorage.setItem('user', JSON.stringify(responce.user));
            navigate('/');
        }
        else{
            toast.error(responce.message);
        }
    }
    catch(error){
        toast.error('failed login ');
        console.log('error in sign_up function' , error.message);
    }
    toast.dismiss(toast_id);
}


// logout handler
export const logout = (navigate , dispatch) => {

    dispatch(setToken(null));
    dispatch(setUser(null));

     localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    navigate('/login');
    
}

export const forgot_password = async (email_data , navigate) => {
    const toast_id = toast.loading('please wait...');
    try{
        const responce = await post_data_fetch( `${backendUrl}/api/v1/resetpassword` , email_data);
        if(responce.success === true){
            toast.success('password is sended on your email');
            navigate('/login');
        }
        else{
            toast.error(responce.message);
        }
        
    }
    catch (error) {
        toast.error('failed to send password');
        console.log('error in forgot pass : ' , error.message);
    }
    toast.dismiss(toast_id);
}