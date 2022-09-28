import Layout from "../components/Layout"
import {useEffect} from "react"
import {useForm} from "react-hook-form"
import {toast} from "react-toastify"
import axios from "axios"
import {useNavigate, useParams} from "react-router-dom"
import {useHttp} from '../hooks/useHttp'
import {submit, getCourses} from './api/coursesApi'
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const AddEditCourse = () => {

    const navigate = useNavigate()
    const params = useParams()
    const id = params.id;
    const {send: getAllCourses, data} = useHttp(getCourses)
    const {send} = useHttp(submit)

    const isUpdate = params.id !== "new"

    useEffect(() => {
        getAllCourses()
        if (isUpdate) {
            courseById()
        }
    }, [])


    const onSubmit = async data => {
        await send({data, isUpdate, id})

        getAllCourses()
        navigate(-1)
    }
    const courseById = async () => {
        const res = await axios.get(`http://localhost:7070/api/v1/courses/${params.id}`);

        reset(res.data.data.byId)
    };


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();


    return <Layout title={isUpdate ? "Update Course" : "Add new course"}>

        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="text"></label>
            <input
                id="text"
                type="text"
                placeholder="Name"
                {...register("name", {
                    required: {value: true, message: "Enter name"},
                })}
            />
            {errors.name && <p>{errors.name.message}</p>}
            <label htmlFor="description"></label>
            <input
                id="description"
                type="text"
                placeholder="Description"
                {...register("description", {
                    required: {value: true, message: "Enter description "},
                })}
            />
            {errors.description && <p>{errors.description.message}</p>}
            {/*<button>*/}
                <Button type={'submit'} variant={"contained"} size={"large"} className="btnLogin" startIcon={<AddIcon/>}>
                Create</Button>
            {/*</button>*/}
        </form>

    </Layout>
}

export default AddEditCourse