import toast from "react-hot-toast"
import { backendUrl } from "../../server"
import { post_data_fetch } from "../data_requests/post_data_fetch"

export const orderDelete = async (orderId) => {
    const toast_id = toast.loading('deleting Your Message...');
    try {
        const responce = await post_data_fetch( `${backendUrl}/api/v1/deleteOrder` , orderId) ;
        console.log(responce);
        if (responce.success === true) {
            toast.success(responce.message);
        } else {
            toast.error(responce.message);
        }
    } catch (error) {
        toast.error('failed to delete order sorry!!!!!');
    }
    toast.dismiss(toast_id);
}