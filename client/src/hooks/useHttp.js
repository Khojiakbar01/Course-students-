import {useState,} from 'react';
import {toast} from "react-toastify";
import {Alert} from "@mui/material";

export const useHttp = (reqFn) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({})

    const send = async (reqData) => {
        setIsLoading(true)
        try {
            const res = await reqFn(reqData);
            setData(res.content);
            // console.log(res)
            toast.success(res.message)
            setPagination(res.pagination)
            if (data.message) {

            }
        } catch (e) {

        }
        setIsLoading(false)
    }
    return {send, isLoading, error, data, pagination}
}