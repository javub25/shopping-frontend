import {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext.jsx';

const Header = () => 
{
    const {user, setUser} = useContext(UserContext);
        
    return (
        <div className="flex justify-evenly flex-end">
            <a href="/" title="Home"><h1>Home</h1></a>
            <a href="/products" title="Products"><h2>Products</h2></a>
            {user ? <>
                {user} 
                <h2 onClick={() => setUser(null)}>Logout</h2>
            </> : <a href="/login" title="Login"><h2>Login</h2></a>}
        </div>
    )
}
export default Header;