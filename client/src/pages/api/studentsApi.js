import http from '../../utils/axiosInstance'

export const getStudents = async ({page, size, search}) => {
    const res = await http({url: '/students', params: {page, size, search}})
    return {content: res.data.data.rows, pagination: res.data.pagination}
};

export const deleteStudentHandler = async (id) => {
    const res = await http.delete(`/students/${id}`)
    return res.data
}

export const submit = async ({data, isUpdate, id}) => {
    const res = await http({
        url: isUpdate ?
            `http://localhost:7070/api/v1/students/${id}`
            : "http://localhost:7070/api/v1/students",
        method: isUpdate ? "PUT" : "POST",
        data: data
    })
    return res.data
}