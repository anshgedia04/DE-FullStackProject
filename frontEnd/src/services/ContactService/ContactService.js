import {toast} from 'react-hot-toast';
import { post_data_fetch } from "../data_requests/post_data_fetch";
import { backendUrl } from "../../server";

export const ContactService = async (contact_data) =>  {
    const toast_id = toast.loading('sending Your Message...');
    try{
        const responce = await post_data_fetch( `${backendUrl}/api/v1/contactus` , contact_data) ;

        if(responce.success === true){
            toast.success(responce.message);
        }
        else{
            toast.error(responce.message);
        }

    }
    catch(error){
        toast.error('failed to send message');
    }
    toast.dismiss(toast_id);
}