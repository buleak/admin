import React from 'react'
import notFoundImg from './OIP.jpg'
import css from './index.module.scss'
export default () => {
    return (
        <div id={css.notFound}>
            <img src={notFoundImg} alt="loading error"/>
            <p>Not Found</p>
        </div>
    )
}
