import {Link} from "react-router-dom"
import Navbar from "../../components/Navbar"
import {Button} from "@mui/material";
import styles from './Home.module.css'


const Home = () => {
    const logoutHandler = () => {
        // localStorage.removeItem('user')
        // localStorage.removeItem('token')
        // localStorage.removeItem('isAuth')
        localStorage.clear()
        window.location.reload();

    }

    const verifyStorage = localStorage.getItem('isAuth')

    const verifyAdmin = localStorage.getItem('userRole') === 'SUPER_ADMIN';



    return (<>
        <Navbar title="Home"/>
        <div className={styles.content}>
            {verifyStorage ?
                <>
                    <Link to="/courses" className={styles.btn}>
                        {/*<Button variant={"contained"} size={"large"}>*/}
                            Courses
                        {/*</Button>*/}
                    </Link>
                    <Link className={styles.btn} to="/students">
                        {/*<Button variant={"contained"} size={"large"}>*/}
                            Students
                        {/*</Button>*/}
                    </Link>
                    {verifyAdmin && <Link className={styles.btn} to="/admins">
                        {/*<Button variant={"contained"} size={"large"}>*/}
                            Admins
                        {/*</Button>*/}
                    </Link>}
                    <Button onClick={logoutHandler}>Log out</Button>
                </>

                : <Link className={styles.btn} to='/auth/login'>
                    <Button variant={"contained"} size={"large"}>
                        Login
                    </Button>
                </Link>


            }

        </div>


    </>)

}


export default Home