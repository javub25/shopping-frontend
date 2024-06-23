import ApiClient from '@http/ApiClient.jsx';


//We use PostProductsUser to send the products bought by the user to backend
const PostProductsUser = (user, cart, setCart, removeCart, showSuccessToast) => {
  const API = import.meta.env.VITE_STRAPI_API_URL;
  //User and the products bought by the user
  const productsUser = {
    data: { email: user.email, productsId: cart.map(({ id }) => id) },
  };
  const endpoint = `${API}/api/user-products`;

  const {request} = ApiClient(endpoint, {
    method: 'POST',
    data: productsUser
  })

  request.then((res => 
  {
      if (res.status === 200) {        
        showSuccessToast("Payment successful! 👌");
        removeCart(setCart);
      }
    }
  ))
  .catch((error) => console.error(error));
};
export default PostProductsUser