import toast from "react-hot-toast"
import { backendUrl } from "../../server"
import { post_data_fetch } from "../data_requests/post_data_fetch"

export const orderCreate = async (order_data) => {
    const toast_id = toast.loading('sending Your Message...');
    try {
        const responce = await post_data_fetch( `${backendUrl}/api/v1/createOrder` , order_data) ;
        if (responce.success === true) {
            toast.success(responce.message);
        } else {
            toast.error(responce.message);
        }
    } catch (error) {
        toast.error('failed to generate order sorry!!!!!');
    }
    toast.dismiss(toast_id);
}