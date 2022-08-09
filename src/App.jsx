
import Header from './components/header'
import "bulma/css/bulma.min.css"
import MainContent from './components/mainContent'
import LoginForm from './components/loginForm'
import SignUpForm from './components/signupForm'
import {Route} from "wouter"
import Footer from './components/footer'
import HeroDetails from './components/heroDetails'
import Favs from './components/favs'
import Logout from './components/logout'

function App() {
  
  return (
    <div >
      <Header/>
      <section style={{minHeight:"85vh"}} className="main">

        <Route path='/'>
          <MainContent/>
        </Route>
        <Route path="/sign-up">
          <SignUpForm/>  
        </Route>
        <Route path="/sign-in">
          <LoginForm/>   
        </Route>
        <Route path='/superhero/:id'>
          <HeroDetails/>
        </Route>
        <Route path='/favorites'>
          <Favs/>
        </Route>
        <Route path='/logout'>
          <Logout/>
        </Route>
        
      </section>
      <Footer/>
    </div>
  )
}

export default App
