import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home.jsx'
import Nav from './Nav.jsx'
import Services from './Services.jsx'
import Contact from './Contact.jsx'
import DoctorsPage from './doctor/Doctorspage.jsx'

export default function Navbar(){

    return <>

        <BrowserRouter>

            <Nav />

            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/services' element={<Services/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/doctors' element={<DoctorsPage/>} />
            </Routes>
        </BrowserRouter>

    </>

}