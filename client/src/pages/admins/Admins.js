import React, {useEffect} from 'react';
import Navbar from "../../components/Navbar";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useHttp} from "../../hooks/useHttp";
import {getAdmins, deleteAdminHandler} from "../api/adminsApi";
import styles from "../courses/coursesList.module.css";
import {Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../../components/Layout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {RiseLoader} from "react-spinners";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import {useState} from "react";

const Admins = () => {
    const [params] = useSearchParams()
    const size = params.get('size') || 5;
    let page = params.get('page') || 1;
    let search = params.get('search') || '';
    const navigate = useNavigate()

    const {send, error, isLoading, data, pagination} = useHttp(getAdmins)
    const {send: deleteAdmin} = useHttp(deleteAdminHandler)


    useEffect(() => {
        send({page, size, search})
    }, [page, size, search])


    const deleteHandler = async (id) => {
        await deleteAdminHandler(id);
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
                navigate(`/admins?search=${value}`);
            }, 200);
            return () => {
                clearTimeout(timer);
            };
        }

    }, [value]);

    const changeHandler = e => {
        setValue(e.target.value)
    }
    const adminsCols = [
        {header: `Admins first name`, accessor: 'firstName'},
        {header: `Admins last name`, accessor: 'lastName'},
        {header: `Admins email`, accessor: 'email'},
        {header: 'Admins phone number', accessor: 'number' || 'Not entered'},
        {
            header: 'Actions', accessor: (admins) => {
                return <div className={styles.actions}>
                    <Button variant={"contained"} startIcon={<EditIcon/>}> <Link
                        to={`/admins/${admins.id}`}>Update</Link></Button>
                    <Button variant={'contained'} startIcon={<DeleteIcon/>}
                            onClick={deleteHandler.bind(null, admins.id)}>delete</Button>
                </div>
            }
        }

    ];

    return (
        <Layout title="Admins">
            <input type="text" onChange={changeHandler}/>

            {/*<Link  to="/courses/new"><Button variant='contained' startIcon={<AddCircleIcon/>}> Add course</Button></Link>*/}
            {isLoading ? <RiseLoader color="#36d7b7"/> :

                data.length > 0 ?
                    <>
                        <Table cols={adminsCols} data={data}></Table>
                        <Pagination route={'admins'} pagination={pagination} size={size}/>
                    </>
                    : 'no data found'


            }


        </Layout>
    );
};

export default Admins;