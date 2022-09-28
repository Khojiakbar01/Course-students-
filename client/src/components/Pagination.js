import React, {useCallback, useState} from "react";
import {Link} from "react-router-dom";
import styles from './Pagination.module.css'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Pagination({route, pagination, size, paginate}) {
    const {allPagesCount} = pagination
    const pageNumber = [];
    const navigate = useNavigate();


    for (let i = 1; i <= allPagesCount; i++) {
        pageNumber.push(i);
    }


    return (
        <nav>
            <ul className={styles['btn-list']}>
                <Link
                    to={`/${route}?page=${+pagination.page - 1}&size=${size} `}
                    className={pagination.isFirstPage ? styles['disabled-btn'] : ''}
                >
                    <Button variant={'contained'} size="small">

                        prev
                    </Button>
                </Link>

                {pageNumber.map(number => (

                    <li key={number}>
                        <Link
                            // className={currentPage===number?styles['current-btn']: styles.btn}
                            onClick={() => paginate(number)}
                            to={`/${route}?page=${number}&size=${size} `}>
                            <Button variant={'outlined'} size="small">

                                {number}
                            </Button>
                        </Link>


                    </li>

                ))}

                <Link
                    // style={{cursor: 'pointer'}}
                    // className={styles['disabled-btn']}
                    className={pagination.isLastPage ? styles['disabled-btn'] : ''}
                    to={`/${route}?page=${+pagination.page + 1}&size=${size} `}

                >
                    <Button variant={'contained'} size="small"
                    >
                        next
                    </Button>
                </Link>

            </ul>
        </nav>
    )

}

export default Pagination;