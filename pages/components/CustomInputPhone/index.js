import { useFormikContext } from 'formik';
import React from 'react'
import styles from "./index.module.css"

export default function InputPhone({ id, onBlurFunction = null, label, className, isDuplicate = false, duplicateErrorMsg="" }) {
    const { values, setFieldValue, handleBlur, errors, touched } = useFormikContext();
    return (
        <div
            className={`${styles["input-container"]} ${className}`}
        >
            <div className={`${styles["input-container-2"]} ${isDuplicate ? styles["error"] : Boolean(errors[id]) && touched[id] && styles["error"]}`}>
                <img
                    src="https://1finance.co.in/images/become-a-qfa/Flag.svg"
                    alt="flag"
                    width="24"
                    height="24"
                />
                <span>+91 | </span>
                    {/* </div> */}
            <input
                type="text"
                autoComplete='off'
                className={`${styles["input"]}`}
                name={id}
                placeholder={ label || "Mobile Number"}
                value={values[id]}
                onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, "");
                    let truncatedValue = numericValue.slice(0, 10);
                    if(truncatedValue.length > 5){
                        let startDigits = truncatedValue.slice(0,5)
                        let endDigits = truncatedValue.slice(5,truncatedValue.length);
                        truncatedValue = `${startDigits} ${endDigits}`
                    }
                    if(truncatedValue.length === 11 && onBlurFunction){
                        onBlurFunction(id, truncatedValue)
                    }
                    setFieldValue(id, truncatedValue)
                }}
                onBlur={(e) => {
                    handleBlur(e)
                }}
            />
            </div>
            {isDuplicate ? (
                <div className={`${styles["warn"]}`}>
                    <img src='/images/event-page/invalid.svg' width={16} height={16} />
                    <span style={{ marginLeft: "4px", marginTop: "3px" }}>{duplicateErrorMsg}</span>
                </div>
            ) : Boolean(errors[id]) && touched[id] && (
                <div className={`${styles["warn"]}`}>
                    <img src='/images/event-page/invalid.svg' width={16} height={16} />
                    <span style={{ marginLeft: "4px", marginTop: "3px" }}>{errors[id]}</span>
                </div>
            )}
        </div>
    )
}
