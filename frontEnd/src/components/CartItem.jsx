import { RiDeleteBin6Line } from "react-icons/ri";
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
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex flex-col md:flex-row p-4 gap-6">
        {/* Image Container */}
        <div className="relative aspect-square w-32 md:w-48 rounded-lg overflow-hidden bg-gray-50">
          <img 
            src={item.image} 
            alt={item.title}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Product Details */}
          <div className="space-y-2">
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-lg font-medium text-gray-800 line-clamp-1">
                {item.title}
              </h2>
              <button 
                onClick={removeFromCart}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2">
              {item.description}
            </p>
          </div>

          {/* Price and Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            {/* Price */}
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900">
                ${item.price}
              </p>
              <p className="text-sm text-gray-500">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-2">
              <button
                onClick={handleDecreaseQuantity}
                disabled={item.quantity <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-md 
                         bg-white border border-gray-200 text-gray-600 
                         hover:bg-gray-50 hover:border-gray-300 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all"
              >
                −
              </button>
              <span className="w-12 text-center font-medium text-gray-900">
                {item.quantity}
              </span>
              <button
                onClick={handleIncreaseQuantity}
                className="w-8 h-8 flex items-center justify-center rounded-md 
                         bg-white border border-gray-200 text-gray-600 
                         hover:bg-gray-50 hover:border-gray-300 
                         transition-all"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
