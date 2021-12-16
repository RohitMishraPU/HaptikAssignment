import React from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

function Footer({setPosition, page}) {
    return (
        <div className='footer'>
            <FaAngleDoubleLeft className='cursorStyle' onClick={() => setPosition('prev')}/>
                <strong> {page} </strong>
            <FaAngleDoubleRight className='cursorStyle' onClick={() => setPosition('next')}/>
        </div>
    )
}

export default Footer
