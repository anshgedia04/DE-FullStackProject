import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  reducers: {
    add: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    remove: (state, action) => {
      const updatedState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity > 0 ? quantity : 1;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    }
  }
});

export const { add, remove, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;

























// import { createSlice } from "@reduxjs/toolkit";


// export const CartSlice = createSlice({
//     name:"cart",
//     initialState:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],  
//     reducers:{
//         // add:(state,action) => {
//         //     state.push(action.payload)
//         //     localStorage.setItem("cart", JSON.stringify(state))      
//         // },
//         // remove:(state,action) => {
//         //     const updatedState = state.filter((item) => item.id !== action.payload);
//         //     localStorage.setItem("cart", JSON.stringify(updatedState));
//         //     return updatedState;
//         // },
//     }
// });

// export const {add, remove} = CartSlice.actions;
// export default CartSlice.reducer;