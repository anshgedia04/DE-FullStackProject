import { useState} from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { products } from "../data";


const Home = () => {
  
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(products);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-slate-900 h-[300px] md:h-[400px] w-full border-b-2 border-gray-800">
        <div className="max-w-6xl mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4">
          <div className="text-white md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl mt-8 font-bold mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Find the best deals on our exclusive collection of premium items.
            </p>
            <button 
              onClick={() => {
                window.scrollTo({
                  top: 400,
                  behavior: "smooth"
                });
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition duration-300">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2 hidden md:block">
            {/* You can add an image here */}
            <div className="w-full h-64 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700"></div>
          </div>
        </div>
      </div>

      {/* Existing Products Section */}
      {
        loading ? <Spinner />  :
        posts.length > 0 ? 
        (<div className="grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {
            posts.map( (post) => (
            <Product key = {post.id} post={post}/>
          ) )
          }
        </div>) :
        <div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div> 
      }

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Shopping Cart</h3>
              <p className="text-gray-400">Your one-stop destination for premium products and amazing deals.</p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
          
                <li><a href="/aboutus" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="/contactus" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="text-gray-400 space-y-2">
                <li>Email: info@shoppingcart.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Address: 123 Shopping Street</li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to get updates on new products and special offers.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none"
                />
                <button className="bg-purple-600 px-4 py-2 rounded-r hover:bg-purple-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 blue diamonds . All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
