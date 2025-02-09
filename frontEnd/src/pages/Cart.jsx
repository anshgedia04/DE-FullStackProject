import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { orderCreate } from "../services/orderService/orderSend";





const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0));
  }, [cart]);

  const {user} = useSelector((state) => state.auth)
  const orderData = {
    cart: cart,
    total: totalAmount,
    userId:user._id,
    name:`${user.firstName} ${user.lastName}`,
    address: `${user.address}`,
    contactNo:user.contactNumber,
    email:user.email
}
  const orderSend = async () => {
    await orderCreate(orderData);
}
  return (
    <div className="min-h-screen bg-sky-950 py-8">
      {cart.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="flex-1">
              <div className="space-y-4">
                {cart.map((item, index) => {
                  return <CartItem key={item.id} item={item} itemIndex={index} />;
                })}
              </div>
            </div>

            {/* Cart Summary Section */}
            <div className="lg:w-96">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                    <p className="text-green-600 font-semibold">Order Summary</p>
                  </div>
                  
                  <div className="py-4">
                    <p className="text-gray-600 flex justify-between">
                      <span>Total Items</span>
                      <span className="font-medium">{cart.length}</span>
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-600 flex justify-between items-center text-lg">
                        <span>Total Amount</span>
                        <span className="font-bold text-green-600">${totalAmount}</span>
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={orderSend}
                    className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold
                    hover:bg-green-700 transition-all duration-200 transform hover:scale-[1.02]
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Checkout Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty!
            </h1>
            <Link to="/">
              <button className="bg-green-600 text-white py-3 px-8 rounded-xl font-semibold
                hover:bg-green-700 transition-all duration-200 transform hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
