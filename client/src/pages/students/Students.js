import axios from "axios";
import {useState, useEffect} from "react";
import {toast} from "react-toastify"
import Layout from "../../components/Layout"
import {Link, useSearchParams, useNavigate} from "react-router-dom";
import Table from "../../components/Table"
import Pagination from "../../components/Pagination";

import {getStudents, deleteStudentHandler} from "../api/studentsApi";
import {useHttp} from '../../hooks/useHttp'
import {RiseLoader} from "react-spinners";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../courses/coursesList.module.css";


function Users() {
    const navigate = useNavigate()

    const [params] = useSearchParams()
    const size = params.get('size') || 5;
    let page = params.get('page') || 1;
    let search = params.get('search') || '';

    const {send, error, isLoading, data, pagination} = useHttp(getStudents)
    const {send: deleteCourse} = useHttp(deleteStudentHandler)

    useEffect(() => {
        send({page, size, search})
    }, [page, size, search])

    const deleteHandler = async (id) => {
        await deleteStudentHandler(id)
        if (data.length === 1) {
            resetPage()

        }
        await send({page, size})
    }


    const resetPage = () => {
        navigate(`?page=${page - 1}&size=5`)
    }

    const [value, setValue] = useState('')

    useEffect(() => {
        if (value) {
            const timer = setTimeout(() => {
                navigate(`/students?search=${value}`);
            }, 200);
            return () => {
                clearTimeout(timer);
            };

        }
    }, [value]);

    const changeHandler = e => {
        setValue(e.target.value)
    }


    const studentCols = [
        {header: 'Student first name', accessor: 'firstName'},
        {header: 'Student last name', accessor: 'lastName'},
        {header: 'Student birthDate', accessor: 'birthDate'},
        {
            header: 'Actions', accessor: (student) => {
                return <div className={styles.actions}>
                    <Button variant={"contained"} startIcon={<EditIcon/>}>
                        <Link
                        to={`/students/${student.id}`}> Update
                        </Link>
                    </Button>
                    <Button variant={'contained'} startIcon={<DeleteIcon/>}
                            onClick={deleteHandler.bind(null, student.id)}>delete</Button>
                </div>
            }
        }
    ]

    return (
        <Layout title="Students">
            <input type="text" onChange={changeHandler}/>

            {/*<input onChange={changeHandler} type="text"/>*/}
            <Link to="/students/new"><Button variant='contained' startIcon={<AddCircleIcon/>}>Add Student</Button>
            </Link>
            {isLoading ? <RiseLoader color="#36d7b7"/> :

                data.length > 0 ?
                    <>
                        <Table cols={studentCols} data={data}></Table>
                        <Pagination route={'students'} pagination={pagination} size={size}/>
                    </>
                    : 'no data found'


            }


        </Layout>
    );
}

export default Users;
