import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "./registerform.module.css";
import PrimaryBtn from "../primarybtn/PrimarytBtn";
import Input from '../CustomInput';
import InputPhone from '../CustomInputPhone';
import { Formik } from "formik";
import { object, string } from 'yup';
import axios from "axios";

const RegisterForm = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [checks, setChecks] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  // const [cpf, setcpf] = useState("");
  // const [cwm, setcwm] = useState("");
  // const [cfa, setcfa] = useState("");
  // const [ca, setca] = useState("");
  // const [sebi_ria, setsebi_ria] = useState("");
  // const [nism_xa_xb, setnism_xa_xb] = useState("");
  // const [qpfp, setqpfp] = useState("");
  // const [bse, setbse] = useState("");
  // const [nism, setnism] = useState("");
  const [other, setother] = useState("");
  const [ouranswer, setouranswer] = useState("");
  const [answer, setanswer] = useState("1 Finance is great!");
  const [errors, setErrors] = useState({});
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
  const [certificateArr, setCertificateArr] = useState([]);
  const [isMessageVisible, setIsMessageVisible] = useState("1");
  const [isMessageVisible2, setIsMessageVisible2] = useState(false);
  const [isMessageVisible3, setIsMessageVisible3] = useState(false);
  const [isMessageVisible4, setIsMessageVisible4] = useState(false);
  const [isMessageVisible5, setIsMessageVisible5] = useState(false);
  const [isMessageVisible6, setIsMessageVisible6] = useState(false);
  const [isMessageVisible7, setIsMessageVisible7] = useState(false);
  const [isMessageVisible8, setIsMessageVisible8] = useState(false);
  const [button, setbutton] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setopen] = useState(false);
  const router = useRouter();
  let reload = true;
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [msg, setMsg] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const fullNameRef = useRef(null);
  const cityRef = useRef(null);
  const emailRef = useRef(null);
  const fullNameLabelRef = useRef(null);
  const cityLabelRef = useRef(null);
  const emailLabelRef = useRef(null);

  const [emailDuplicate, setEmailDuplicate] = useState(false);
  const [phoneDuplicate, setPhoneDuplicate] = useState(false);
  const [clearForm, setClearForm] = useState();

  useEffect(() => {
    document.body.style.backgroundColor = "#F9F9F9";
  }, []);
  useEffect(() => {
    if (window.innerWidth < 540) {
      setIsMobile(true);
      // console.log(document.querySelector(".swiper-wrapper"), "this is swiper");
      // setTimeout(()=>{
      //   document.querySelector('.swiper-slide').style.marginRight = '30px';
      // }, 500)
    }
  }, []);

  useEffect(() => {
    if (fullName) {
      fullNameRef.current.classList.add(`${styles["input-text-active-main"]}`);
      fullNameLabelRef.current.classList.add(`${styles["input-text-active"]}`);
    }
    // fullNameRef.current.parentElement.childNodes[1].classList.remove(
    //   `${styles["input-text-active-main"]}`
    // );
    if (email) {
      emailRef.current.classList.add(`${styles["input-text-active-main"]}`);
      emailLabelRef.current.classList.add(`${styles["input-text-active"]}`);
    }
    // emailRef.current.parentElement.childNodes[1].classList.remove(
    //   `${styles["input-text-active-main"]}`
    // );
    if (city) {
      cityRef.current.classList.add(`${styles["input-text-active-main"]}`);
      cityLabelRef.current.classList.add(`${styles["input-text-active"]}`);
    }
  }, [fullName, email, city]);

  const initialValues = {name:"",company:"",email:"",designation:"",phone:"",city:""}
  const validationForm = object({
    name: string().min(2,"This is an invalid name").required("Please enter a full name").matches(/^[a-zA-Z\s]*$/, "This is an invalid name").test("notEmptyWithoutSpaces", "Name cannot be empty",function(value){
        let temp = value.trim()
       if(!temp.length){
        return false
       } 
       return true
    }),
    email: string().matches(
        /^[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)*@[a-zA-Z0-9]{2,}(?:\.[A-Za-z]{2,})+$/,
        'Please enter a valid email address'
    ).required("Email address cannot be empty"),
    phone: string().matches(/^[6-9]\d{4} \d{5}$/, "Please enter a valid mobile number").required("Phone number cannot be empty"),
    company: string().required("Please enter a company name").matches(/^[a-zA-Z\s]*$/, "Invalid character").test("notEmptyWithoutSpaces", "Please enter a company name",function(value){
      let temp = value.trim()
     if(!temp.length){
      return false
     } 
     return true
  }),
    designation: string().required("Please enter a designation").matches(/^[a-zA-Z\s]*$/, "Invalid character").test("notEmptyWithoutSpaces", "Please enter a designation",function(value){
      let temp = value.trim()
     if(!temp.length){
      return false
     } 
     return true
  }),
    city: string().required("Please enter your current city").matches(/^[a-zA-Z\s]*$/, "Invalid character").test("notEmptyWithoutSpaces", "Please enter your current city",function(value){
      let temp = value.trim()
     if(!temp.length){
      return false
     } 
     return true
  }),
})
  const handleSubmit = (e, resetForm) => {
    const phone = "+91" + e.phone.replaceAll(" ","");
    axios.post(`${process.env.NEXT_PUBLIC_WP_API}/events/v1/register`,{...e, phone:phone}).then((res) => {
        if(res.data[0].status === 200){
          resetForm()
          setEmailDuplicate(false)
          setPhoneDuplicate(false)
        }else{
          if(res.data[0].error_field === "email"){
            setEmailDuplicate(true)
          }else{
            setEmailDuplicate(false)
          }
          if(res.data[0].error_field === "phone"){
            setPhoneDuplicate(true)
          }else{
            setPhoneDuplicate(false)
          }
        }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <section id="form" className={`${styles["register_form"]} `}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, {resetForm}) => handleSubmit(values, resetForm)}
        validationSchema={validationForm}
      >
        {
          ({ values, errors, handleChange, dirty, isValid, handleSubmit }) => (
      <form
        id="qfa_form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={`${styles["row"]}`}>
          <div  className={`${styles["column"]}`} >
            <Input label={"Full Name"} id="name" className={`${styles["inputClass"]}`} />
            <Input label={"Email"} id="email" className={`${styles["inputClass"]}`} duplicateErrorMsg="This email id already exists" isDuplicate={emailDuplicate} />
            <InputPhone id={"phone"} className={`${styles["inputClass"]}`} duplicateErrorMsg="This number already exists"  isDuplicate={phoneDuplicate} />
          </div>
          <div  className={`${styles["column"]}`} >
            <Input label={"Company Name"} id="company" className={`${styles["inputClass"]}`}/>
            <Input label={"Designation"} id="designation" className={`${styles["inputClass"]}`}/>
            <Input label={"Currenty City"} id="city" className={`${styles["inputClass"]}`}/>
          </div>
        </div>
        <PrimaryBtn btn_disable={!(isValid && dirty)} btnTyp="submit" />
      </form>
          )
        }
      </Formik>
    </section>
  );
};

export default RegisterForm;
