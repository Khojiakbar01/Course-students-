import Layout from "../components/Layout"
import {useEffect} from "react"
import {useForm} from "react-hook-form"
import {toast} from "react-toastify"
import axios from "axios"
import {useNavigate, useParams} from "react-router-dom"
import {useHttp} from '../hooks/useHttp'
import {getAdmins,updateAdminHandler} from './api/adminsApi'
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const EditAdmin = () => {

    const navigate = useNavigate()
    const params = useParams()
    const id = params.id;
    const {send: getAllAdmins, data} = useHttp(getAdmins)
    const {send} = useHttp(updateAdminHandler)

    const isUpdate = params.id !== "new"

    useEffect(() => {
        getAllAdmins()
        if (isUpdate) {
            adminById()
        }
    }, [])


    const onUpdate = async data => {
        await send({data, isUpdate, id})
        console.log(data)
        getAllAdmins()
        navigate(-1)
    }
    const adminById = async () => {
        const res = await axios.get(`http://localhost:7070/api/v1/admins/${params.id}`);
        console.log(res)
        reset(res.data.data.byId)
    };


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();


    return <Layout title={isUpdate ? "Update Admin" : ""}>

        <form onSubmit={handleSubmit(onUpdate)}>
            <label htmlFor="text"></label>
            <input
                type="text"
                placeholder="First name"
                {...register("firstName", {
                    required: {value: true, message: "Enter first name"},
                })}
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <label htmlFor="description"></label>
            <input
                type="text"
                placeholder="Last name"
                {...register("lastName", {
                    required: {value: true, message: "Enter Last name "},
                })}
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
            <input
                type="email"
                placeholder="email"
                {...register("email", {
                    required: {value: true, message: "Enter email "},
                })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <input
                id="description"
                type="text"
                placeholder="number"
                {...register("number", {
                    required: {value: true, message: "Enter number "},
                })}
            />
            {errors.number && <p>{errors.number.message}</p>}
            <button>
                <Button variant={"contained"} size={"large"} className="btnLogin" startIcon={<AddIcon/>}>
                    Update</Button>
            </button>
        </form>

    </Layout>
}

export default EditAdmin