import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { remove, updateQuantity } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item Removed");
  };

  return (
    <div className="flex items-center p-6 justify-between bg-gradient-to-r from-gray-50 to-white shadow-lg rounded-2xl mt-4">
      <div className="flex items-center gap-6 w-full">
        {/* Product Image */}
        <div className="w-32">
          <img className="object-cover rounded-lg" src={item.image} alt={item.title} />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-2">
          <h1 className="text-lg font-bold text-gray-800">{item.title}</h1>
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          <p className="text-2xl font-semibold text-teal-600">${item.price}</p>
        </div>

        {/* Quantity and Actions */}
        <div className="flex flex-col items-center gap-3">
          {/* Custom Quantity Controls */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
            <button
              onClick={handleDecreaseQuantity}
              className="bg-teal-500 text-white px-3 py-1 rounded-md font-bold hover:bg-teal-600"
            >
              −
            </button>
            <span className="text-gray-700 font-semibold text-lg">{item.quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="bg-teal-500 text-white px-3 py-1 rounded-md font-bold hover:bg-teal-600"
            >
              +
            </button>
          </div>

          {/* Delete Button */}
          <div
            className="text-white bg-red-500 hover:bg-red-600 transition-all cursor-pointer rounded-full p-3"
            onClick={removeFromCart}
          >
            <AiFillDelete size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
