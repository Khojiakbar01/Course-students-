import axios from "axios";
import styles from './courses/coursesList.module.css'
import {toast} from "react-toastify"
import {useEffect, useState} from "react";
import Layout from "../components/Layout";
import {Link, useParams} from "react-router-dom";


function EnrolledStudentsList(props) {
    // const [courses, setCourses] = useState([]);
    // const [students, setStudents] = useState([]);
    const id = useParams().id;

    const [selectedStudents, setSelectedStudents] = useState([]);
    useEffect(() => {
        getStudents();
    }, []);
    // console.log(courses)
    // const getCourses = async () => {
    //     const res = await axios("http://localhost:7070/api/v1/courses ");
    //     setCourses(res.data.data.allCourses.rows);
    // };
    const getStudents = async () => {
        try {
            const res = await axios.get(`http://localhost:7070/api/v1/courses/${id}/students`)
            console.log(res)
            // console.log(res.data.data.byIdWithStudent.students)
            // setStudents(res.data.data.byIdWithStudent.students);
            setSelectedStudents(res.data.data.byIdWithStudent.students);
            // console.log(students)
        } catch (e) {
            // setStudents([])
            console.log(e)
        }
    }

    // const deleter = async (id) => {
    //     console.log(id);
    //     try {
    //         const res = await axios.delete(
    //             `http://localhost:7070/api/v1/courses/${id}`
    //         );
    //         // getCourses();
    //         toast.success(res.data.message)
    //     } catch (err) {
    //         toast.error(err.response.data.message);
    //     }
    // };
    // console.log(getStudents())
    return (
        <Layout title="Courses">
            {/*<Link className="btn-link" to="/courses/new">Add course</Link>*/}

            {/*{courses.length >= 1 &&*/}
            <table>
                <thead>
                <tr>
                    <th className={styles.name}>FirstName</th>
                    <th className={styles.description}>LastName</th>
                    <th className={styles.enrolledStudents}>BirthDate</th>
                    {/*<th className={styles.actions}>Actions</th>*/}
                </tr>
                </thead>
                <tbody>
                {selectedStudents.map(p => <tr key={p.id}>
                        <td className={styles.name}> {p.firstName}</td>
                        <td className={styles.description}>{p.lastName}</td>
                        <td className={styles.description}>{p.birthDate}</td>
                    </tr>
                )}

                </tbody>
            </table>
            {/*}*/}
        </Layout>
    );
}

export default EnrolledStudentsList