import http from '../../utils/axiosInstance'
import {useSelector} from "react-redux";

export const getCourses = async ({page, size, search}) => {

    const res = await http({url: '/courses', params: {page, size, search}})

    console.log(res)
    return {content: res.data.data.allCourses.data, pagination: res.data.data.allCourses.pagination}
};

export const deleteCourseHandler = async (id) => {
    const res = await http.delete(`/courses/${id}`)
    return res.data
}

export const submit = async ({data, isUpdate, id}) => {
    const res = await http({
        url: isUpdate ?
            `http://localhost:7070/api/v1/courses/${id}`
            : "http://localhost:7070/api/v1/courses",
        method: isUpdate ? "PUT" : "POST",
        data
    })
    return res.data
}