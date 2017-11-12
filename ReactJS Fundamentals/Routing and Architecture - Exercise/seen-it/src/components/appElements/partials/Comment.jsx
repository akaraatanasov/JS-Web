import React from 'react'
import dateConverter from './../../../utils/dateConverter'

let Comment = (props) => {
    <article className='post post-content'>
        <p>{props.data.content}</p>
        <div className="info">
            submitted {dateConverter(props.data._kmd.etc)} ago by {props.data.author} | delete
        </div>
    </article>
}

export default Comment