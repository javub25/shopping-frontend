import Header from './components/Header/Header.jsx'
import { Route } from 'wouter';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import {UserProvider} from './contexts/UserContext.jsx';

function App() {
  return (
    <>
      <UserProvider>
        <Header/>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login}/>   
      </UserProvider>
          
    </>
  )
}

export default App
