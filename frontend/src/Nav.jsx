import {Link} from 'react-router-dom'
import style from './styles/Nav.module.css'

export default function Nav(){

    return <>

        <nav className={style.menu} >
            <h1>MediCo+</h1>

            <ul className={style.nav_menu}>
                <Link  className={style.nav_list} to='/' >Home</Link>
                <Link  className={style.nav_list} to='/services' >Services</Link>
                <Link  className={style.nav_list} to='/contact' >Contact</Link>
                <Link  className={style.nav_list} to='/doctors' >Doctors</Link>
            </ul>

        </nav>

    </>

}