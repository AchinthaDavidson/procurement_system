
import React, { useEffect } from 'react';
import Niv from '../components/Niv';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import emailjs from 'emailjs-com';
import styles from '../Style/site.module.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  
  siteManagerName: Yup.string().required('Site Manager Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  contact: Yup.number().required('Contact is required'),
});

function Addsitemanager() {

  const initialValues = {
   
    siteManagerName: '',
    email: '',
    contact: '',
    password:'',
  };

  const generatePassword = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let newPassword = '';
    const passwordLength = 8;

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
  return(newPassword)
  };

  const sendmail = (values) => {

    emailjs.send("service_kis0yru", "template_djndr2s", {
      companyname: values.siteManagerName,
      email:values.email,
      password:values.password,
      send_mail:values.email,
    }).then((response) => {
      console.log("Email sent successfully!", response);
    })
      .catch((error) => {
        console.error("Email send failed:", error);
      });

  }
  useEffect(() => {
    emailjs.init("B_i0KHsbjy4zjfj_L");
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    values.password =  generatePassword()
    
    sendmail(values)
    axios
    .post("http://localhost:8070/sitemanager/add", values)
    .then(() => {
      toast.success("New Supplier added successfully");
    })
    .catch((err) => {
      toast.error("New Supplier added unsuccessfully");
    });


    resetForm();
  };
  const handleClear = (resetForm) => {
    resetForm();
  };

  return (
    <div>
       <ToastContainer position="top-right" theme="colored" />
      <Niv name='Add New Site Manager' />
      <div className="data">
      <h1 className={styles.formTitle}>Manager Information</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({resetForm}) => (
          <Form className={styles.form}>
           
            <div className={styles.formGroup}>
              <label htmlFor="siteManagerName">Site Manager Name</label>
              <Field type="text" name="siteManagerName" className={styles.input} />
              <ErrorMessage name="siteManagerName" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className={styles.input} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact">Contact</label>
              <Field type="text" name="contact" className={styles.input} />
              <ErrorMessage name="contact" component="div" className={styles.error} />
            </div>

            <button
              type="button"
              className={styles.clearButton}
              onClick={() => handleClear(resetForm)}
            >
              Clear
            </button>

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
}

export default Addsitemanager;