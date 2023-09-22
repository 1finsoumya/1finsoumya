import React from "react";
import styles from "./primarybtn.module.css";

const PrimaryBtn = ({btn_name="Submit", btn_disable=true, btnTyp="button", onClickHandler}) => {
  return (
    <button type={btnTyp} onClick={() => {if(onClickHandler) onClickHandler()}} className={`${styles["primary_btn"]} ${btn_disable && styles["disabled"]}`}>
      {btn_name}
        <img src="/images/event-page/nxtarrow-icon.svg" width="6" height="16" alt="primary-btn" />
      </button>
  );
};

export default PrimaryBtn;
