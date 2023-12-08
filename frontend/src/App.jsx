import React from 'react'
import './App.css'
import{Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import Services from './pages/services/Services'
import Faq from './pages/faq/Faq'
import LoginChoice from './components/Choice/LoginChoice'
import RegisterChoice from './components/Choice/RegisterChoice'
import SLogin from './components/Login/SLogin'
import HLogin from './components/Login/HLogin'
import SRegister from './components/Register/SRegister'
import HRegister from './components/Register/HRegister'
import Footer from './pages/footer/Footer'
import Search from './pages/search/Search'
import MainProfile from './components/profile/student/MainProfile/MainProfile'
import HMainProfile from './components/profile/howner/MainProfile/MainProfile'
import { DetailProvider } from './components/detailProvider/DetailProvider'
import LoginError from './pages/loginError/LoginError'
import NotFound from './pages/notFound/NotFound'
import HostelDetail from './pages/hosteldetail/HostelDetail'

const App = () => {
  return (
    <>
      <DetailProvider>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}>Home</Route>
            <Route path='/about' element={<About/>}>About Us</Route>
            <Route path='/contact' element={<Contact/>}>Contact</Route>
            <Route path='/services' element={<Services/>}>Services</Route>
            <Route path='/search' element={<Search/>}>Search</Route>
            <Route path='/faq' element={<Faq/>}>Faq</Route>
            <Route path='/login' element={<LoginChoice/>}/>
            <Route path='/register' element={<RegisterChoice/>}/>
            <Route path='/login/student' element={<SLogin/>}/>
            <Route path='/login/hostel' element={<HLogin/>}/>
            <Route path='/register/student' element={<SRegister/>}/>
            <Route path='/register/hostel' element={<HRegister/>}/>
            <Route path='/student/*' element={<MainProfile/>}/>
            <Route path='/error' element={<LoginError/>}/>
            <Route path='/howner/*' element={<HMainProfile/>}/>
            <Route path='/search/:id' element={<HostelDetail/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </DetailProvider>
    </>
  )
}

export default App