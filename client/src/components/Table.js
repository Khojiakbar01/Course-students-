import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {RiseLoader} from "react-spinners";


const Table = ({cols, data, page, route, size}) => {
    // const navigate = useNavigate()
    // const [noItem, setNoItem] = useState(false)
    //
    //
    // useEffect(() => {
    //     if(data.length===0){
    //         if(page>1){
    //             // console.log('Hello')
    //             setNoItem(false)
    //             navigate(`/${route}?page=${page-1}&size=${size}`)
    //         }else if(page===1){
    //             setNoItem(true)
    //         }
    //     }
    // }, [])


    const bodyContainer = data.map(i => <tr key={i.id}>
        {cols.map((c, index) => {
                let content;
                if (typeof c.accessor === 'string') {
                    content = i[c.accessor];
                }
                if (c.accessor instanceof Function) {
                    content = c.accessor(i)
                }
                return <td key={c.header + index}>{content}</td>
            }
        )}
    </tr>)
    return (

        <table>
            <thead>
            <tr>
                {cols.map(c => <th key={c.header}>{c.header}</th>)}
            </tr>
            </thead>

            <tbody>
            {bodyContainer}
            </tbody>
        </table>

    )
}

export default Table