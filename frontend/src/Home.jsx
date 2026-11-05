import style from './styles/Home.module.css'
import Hom from './Home2.jsx'

export default function Home(){

    // const rome={
    //     backgroundImage: `url(./homepage.png)`,
    //     height: "85vh",
    //     backgroundSize: "cover",
    //     backgroundRepeat: "no-repeat",
    //     width: "100%",
    // }

    return <>
        <div className={style.home_header}>

            <div className={style.home} >
                <h1>Trusted Care</h1>
                <h1>Better Health</h1>

                <h2>Making Healthcare Simple and accessible</h2>

                <h3>Easy appointments, Better HealthCare.</h3>
            </div>

        </div>
        <Hom />
    </>

}