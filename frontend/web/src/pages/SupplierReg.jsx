
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import emailjs from 'emailjs-com';
import Niv from '../components/Niv';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../Style/Supplier.module.css'

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  contactNumber: Yup.number().required('Contact Number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});



function Supplierreg() {

const initialValues = {
    companyName: '',
    contactNumber: '',
    email: '',
    password: '',

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
      companyname: values.companyName,
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
    .post("http://localhost:8070/supplier/add", values)
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
      <Niv name='Supplier Registration' />
      <div className="data">
        <h1 className={styles.formTitle}>Add New Supplier</h1>
        <div className={styles.form}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ resetForm }) => (
              <Form>
                <div className={styles.formGroup}>
                  <label htmlFor="companyName">Company Name</label>
                  <Field type="text" name="companyName" className={styles.input} />
                  <ErrorMessage name="companyName" component="div" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contactNumber">Contact Number</label>
                  <Field type="text" name="contactNumber" className={styles.input} />
                  <ErrorMessage name="contactNumber" component="div" className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" className={styles.input} />
                  <ErrorMessage name="email" component="div" className={styles.error} />
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
    </div>
  );
}

export default Supplierreg;