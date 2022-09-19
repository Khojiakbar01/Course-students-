import http from '../../utils/axiosInstance'
import {useSelector} from "react-redux";

export const getAdmins = async ({page, size,search}) => {

    const res = await http({url: '/admins', params: {page, size,search}})
    return {content: res.data.data.rows, pagination: res.data.pagination}
};

export const deleteAdminHandler = async (id) => {
    const res = await http.delete(`/admins/${id}`)
    return res.data
}

export const updateAdminHandler = async ({data, id}) => {
    const res = await http({
        url: `http://localhost:7070/api/v1/admins/${id}`,
        method: "PUT",
        data
    })
    return res.data
}