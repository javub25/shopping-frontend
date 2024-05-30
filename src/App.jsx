import './App.css'
import {useState, Suspense, lazy} from 'react';
import { Switch, Route } from 'wouter';
import Header from '@components/Header/Header.jsx'
import {UserProvider} from '@contexts/UserContext.jsx';
import {CartProvider} from '@contexts/CartContext.jsx';
import {ProductProvider} from '@contexts/ProductContext.jsx';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const Home = lazy(() => import('@pages/Home.jsx'));
  const Login = lazy(() => import('@pages/Login.jsx'));
  const Products = lazy(() => import('@pages/Products.jsx'));
  const SingleProduct = lazy(() => import('@components/Products/SingleProduct.jsx'));
  const NotFound = lazy(() => import('@pages/NotFound.jsx'));
  const Cart = lazy(() => import('@components/Cart/Cart.jsx'));

  return (
    <>
        <Suspense fallback={<div className="lds-circle py-[50px]"><div></div></div>}>
            <UserProvider>
              <CartProvider>
                  <ProductProvider>
                    <Header onOpen={setIsOpen}/>
                      <Switch>
                        <Route path="/" component={Home} />
                        <Route path="/login" component={Login}/>
                        <Route path="/product" component={SingleProduct}/>
                        <Route path="/products" component={Products}/>
                        <Route path="*" component={NotFound} />  
                      </Switch>
                  </ProductProvider>
                  {isOpen && <Cart isOpen={isOpen} onClose={setIsOpen} />}                             
              </CartProvider>
            </UserProvider>  
        </Suspense>
    </>
  )
}

export default App
