import React from "react";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Task = ({
    name, value, deleteTask, ClickonleftArrow, ClickonrightArrow  ,leftButton , rightButton , step
}) => {
    return (
        <>
            <div className='taskBx'>
                <h2>Step {step}</h2>
                {value ?
                    value.map((ele, i) => {
                        return (
                            <>
                                <div className='taskBxInner' key={i}>
                                    <h2>
                                        <span>{ele.title}</span>
                                        <button className='deleteBtn' name={name} onClick={deleteTask}><DeleteOutlineIcon /> Delete</button>
                                    </h2>
                                    <div className='arrowBtns'>
                                        <button name={name} style={ !leftButton  ? { visibility:'hidden'} : {}} onClick={(e)=> ClickonleftArrow(e ,i)}><NavigateBeforeIcon /></button>
                                        <button name={name} style={ !rightButton  ? { visibility:'hidden'} : {}} onClick={(e) => ClickonrightArrow(e , i)}><ChevronRightIcon /></button>
                                    </div>
                                </div>
                            </>
                        )
                    })

                    :
                    <div className='taskBxInner'>
                        No Task Added
                    </div>
                }

            </div>

        </>
    )
}
export default Task