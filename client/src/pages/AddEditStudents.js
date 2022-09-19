import Layout from "../components/Layout"
import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {toast} from "react-toastify"
import axios from "axios"
import {useNavigate, useParams} from "react-router-dom"
import {useHttp} from "../hooks/useHttp";
import {getStudents, submit} from "./api/studentsApi";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddEditStudents = () => {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const {send: getAllStudents, data} = useHttp(getStudents)
    const {send} = useHttp(submit)

    const isUpdate = params.id !== "new"
    const [courses, setCourses] = useState([])

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        getAllStudents()
        getCourses()
        if (isUpdate) {
            studentById()
        }
    }, [])
    const getCourses = async () => {
        const res = await axios.get("http://localhost:7070/api/v1/courses?page=1&size=0")
        console.log(res)
        setCourses(res.data.data.rows);
    }
    const onSubmit = async (data) => {
        await send({data, isUpdate, id})
        getAllStudents()
        navigate(-1)
    }


    const studentById = async () => {
        const res = await axios.get(`http://localhost:7070/api/v1/students/${params.id}`);
        // console.log(res)
        reset(res.data.data.byId)
    };


    return <Layout title={isUpdate ? "Update Student" : "Add new Student"}>

        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{isUpdate ? "Update Student" : "Add new Student"}</h1>
            <label htmlFor="text"></label>
            <input
                id="text"
                type="text"
                placeholder="FirstName"
                {...register("firstName", {
                    required: {value: true, message: "FirstName kiriting"},
                })}
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <label htmlFor="lastName"></label>
            <input
                id="lastName"
                type="text"
                placeholder="LastName"
                {...register("lastName", {
                    required: {value: true, message: "LastName kiriting"},
                })}
            />
            {errors.lastname && <p>{errors.lastname.message}</p>}
            <label htmlFor="birthDay"></label>
            <input
                id="birthDay"
                type="date"
                placeholder="birthDate"
                {...register("birthDate", {
                    required: {value: true, message: "Enter BirthDay"},

                    // validate: (value) =>
                    //     (value < "2020-01-01") & (value > "1950-01-01") ||
                    //     {message: "BirthDay cannot be accepted",}
                })}
            />
            {errors.birthDay && <p>{errors.birthDay.message}</p>}
            {/*////////*/}
            <FormControl style={{width: '650px', margin: '0 auto'}}>
                {/*<InputLabel id="demo-simple-select-label" >Courses</InputLabel>*/}
                <select
                    {...register('selectCourse',{
                        required:{value:true,message:'Please select a course'}
                    })}
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        // label="Courses"
                        >


                   <option></option>
                    {courses && courses.map((c) => <option value={c.id} key={c.id}>{c.name}</option>)}
                        </select>
                    {errors.selectCourse && <p>{errors.selectCourse.message}</p>}

                        </FormControl>
                    {/*////////*/}

                    {errors.func && (
                        <p style={{color: "red"}}> {errors.func.message}</p>
                        )}
                        <button className="btnLogin"><Button variant={"contained"} size={"large"} className="btnLogin"
                        startIcon={<AddIcon/>}>
                        Create</Button></button>
                        </form>
                        </Layout>
                    }

                    export default AddEditStudents