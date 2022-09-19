import {useState,useEffect} from "react";
import {Route, Routes} from 'react-router-dom'
import AddEditCourse from './pages/AddEditCourse'
import AddEditStudents from './pages/AddEditStudents'
import Courses from './pages/courses/Courses'
import EnrolledStudentsList from "./pages/EnrolledStudentsList";
import Users from './pages/students/Students'
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Admins from './pages/admins/Admins';
import Register from './pages/login/Register'
import Verification from './pages/Verification'
import EmailVerification from "./pages/emailVerification";
import EditAdmin from "./pages/EditAdmin";
import {useNavigate} from "react-router-dom";


function App() {
    // const [courseWithStudentId, setCourseWithStudentId] = useState(null);
    // setCourseWithStudentId(id)
    const navigate = useNavigate()
    const storage = localStorage.getItem('token')
    const isAuth = localStorage.getItem('isAuth')
    // useEffect(() => {
    //     if(!storage&&!isAuth){
    //         navigate('/')
    //         // toast.error('You are not authorized')
    //     }
    // },[storage])

    return (
        <>
            <ToastContainer/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/auth/register" element={<Register/>}/>
                <Route path="/email-verification/:id" element={<EmailVerification/>}/>
                <Route path="/auth/verify/:id" element={<Verification/>}/>

                <Route path="/students" element={<Users/>}/>
                <Route path="/courses" element={<Courses/>}/>
                <Route path="/admins" element={<Admins/>}/>
                <Route path="/admins/:id" element={<EditAdmin/>}/>
                <Route path="/courses/:id/students" element={<EnrolledStudentsList/>}/>
                <Route path="/courses/:id" element={<AddEditCourse/>}/>
                <Route path="/students/:id" element={<AddEditStudents/>}/>
            </Routes>

        </>
    );
}

export default App;
