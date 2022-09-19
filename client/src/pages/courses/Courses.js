import axios from "axios";
import styles from './coursesList.module.css'
import {toast} from "react-toastify"
import {useEffect, useState} from "react";
import Layout from "../../components/Layout";
import {Link, useSearchParams, useNavigate} from "react-router-dom";


import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import {getCourses, deleteCourseHandler} from "../api/coursesApi";
import {useHttp} from '../../hooks/useHttp'
import {RiseLoader} from "react-spinners";
import {Button, Alert} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Courses() {
    //Pages
    const [params] = useSearchParams()
    const size = params.get('size') || 3;
    let page = params.get('page') || 1;
    let search = params.get('search') || '';
    const navigate = useNavigate()

    const {send, error, isLoading, data, pagination} = useHttp(getCourses)
    const {send: deleteCourse} = useHttp(deleteCourseHandler)


    useEffect(() => {
        send({page, size, search})
    }, [page, size, search])


    const deleteHandler = async (id) => {
        await deleteCourseHandler(id);
        if (data.length === 1) {
            resetPage()
        }
        await send({page, size})
    }

    const resetPage = () => {
        navigate(`?page=${page - 1}&size=3`)
    }
    const [value, setValue] = useState('')

    useEffect(() => {
        if (value) {
            const timer = setTimeout(() => {
                navigate(`/courses?search=${value}`);
            }, 200);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [value]);

    const changeHandler = e => {
        setValue(e.target.value)
    }

    const courseCols = [
        {header: 'Course name', accessor: (item) => <Link to={`/courses/${item.id}/students`}>{item.name}</Link>},
        {header: 'Course description', accessor: 'description'},
        {
            header: 'Actions', accessor: (course) => {
                return <div className={styles.actions}>
                    <Button variant={"contained"} startIcon={<EditIcon/>}> <Link
                        to={`/courses/${course.id}`}>Update</Link></Button>
                    <Button variant={'contained'} startIcon={<DeleteIcon/>}
                            onClick={deleteHandler.bind(null, course.id)}>delete</Button>
                </div>
            }
        }

    ];

    return (
        <Layout title="Courses">
            <input type="text" onChange={changeHandler}/>
            <Link to="/courses/new"><Button variant='contained' startIcon={<AddCircleIcon/>}> Add course</Button></Link>
            {isLoading ? <RiseLoader color="#36d7b7"/> :

                data.length > 0 ?
                    <>
                        <Table cols={courseCols} data={data}></Table>
                        <Pagination route={'courses'} pagination={pagination} size={size}/>
                    </>
                    : 'no data found'


            }


        </Layout>
    );
}


export default Courses;
