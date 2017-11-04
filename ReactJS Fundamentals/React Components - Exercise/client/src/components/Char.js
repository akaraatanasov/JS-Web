import React from 'react'
import observerMenu from './../utilities/observer'

let Char = (props) => {
    return (
        <div className='roster-elem' onClick={() => 
            observerMenu.executeObserver("changeFocus", { focusedChar: Number(props.params.id) })}>
            <img className='roster-img' alt='char' src={props.params.url} />
        </div>
    )
}

export default Char