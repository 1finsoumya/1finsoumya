import React, { memo, useEffect } from 'react'
import styles from "./index.module.css"
import { useFormikContext } from 'formik'

function index({ label, id, onBlurFunction = null, className = "", isDuplicate=false, duplicateErrorMsg="" }) {
    const { values, handleChange, handleBlur, errors, touched, setFieldError } = useFormikContext();
    return (
        <div className={`${styles["input-container"]} ${className}`}>
            <div
                className={`${styles["input-container-2"]} ${isDuplicate ? styles["error"] : Boolean(errors[id]) && touched[id] && styles["error"]}`}
            >
                <input
                    value={values[id]}
                    onChange={handleChange}
                    placeholder=" "
                    type="text"
                    className={`${styles["input"]}`}
                    name={id}
                    onBlur={(e) => { 
                        handleBlur(e)
                        if (onBlurFunction) onBlurFunction(id, values[id])
                     }}
                    autoComplete='off'
                />
                <label
                    className={`${styles["label"]} ${styles["input-label"]}`}
                >
                    {label}
                </label>
            </div>
            {isDuplicate ? (
                <div className={`${styles["warn"]}`}>
                    <img src='/images/event-page/invalid.svg' width={16} height={16} />
                    <span style={{ marginLeft: "4px", marginTop: "3px" }}>{duplicateErrorMsg}</span>
                </div>
            ) : (Boolean(errors[id]) && touched[id]) && (
                <div className={`${styles["warn"]}`}>
                    <img src='/images/event-page/invalid.svg' width={16} height={16} />
                    <span style={{ marginLeft: "4px", marginTop: "3px" }}>{errors[id]}</span>
                </div>
            )}
        </div>
    )
}

export default memo(index)