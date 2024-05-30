import axios from 'axios';

//We use PostProductsUser to send the products bought by the user to backend
const PostProductsUser = async (user, cart, setCart, removeCart, showSuccessToast) => {
  const API = import.meta.env.VITE_STRAPI_API_URL;
  //User and the products bought by the user
  const productsUser = {
    data: { email: user.email, productsId: cart.map(({ id }) => id) },
  };
  
  try {
    const response = await axios.post(`${API}/api/user-products`, productsUser);
    
    if (response.status === 200) {        
        showSuccessToast("Payment successful! 👌");
        removeCart(setCart);
    }
  }
  catch (error) {
    console.error(error);
  }
};
export default PostProductsUser