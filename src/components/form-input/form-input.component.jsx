import React from 'react'

import './form-input.styles.scss'

const FormInput = ({handleChange, label, ...otherProps}) => (
    <div className='group'>
        <input className='form-input' onChange={handleChange} {...otherProps}/>
        {
            // Если label передаётся, то создать label.
            // Если пользователь что-то печатает (аргумент value.length не falsy), то добавить класс shrink
            label
                ?
                (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label>)
                :
                null
        }
    </div>
);

export default FormInput