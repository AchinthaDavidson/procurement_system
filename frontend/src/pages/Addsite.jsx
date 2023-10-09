
import React, { useEffect,useState } from 'react';
import Niv from '../components/Niv';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import styles from '../Style/site.module.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addsite() {
    const [sitemanager, setsitemanager] = useState([]);
    const initialValues = {
        siteName: '',
        location: '',
        siteManagerName: '',
    };

    useEffect(() => {
        function getsitemanager() {
          axios.get("http://localhost:8070/sitemanager/").then((res) => {
            // console.log(res.data);
            setsitemanager(res.data);
            // console.log(orders[1]);
          });
        }
        getsitemanager();
      }, []);

    const handleSubmit = (values, { resetForm }) => {

        axios
        .post("http://localhost:8070/site/add", values)
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

  
    const validationSchema = Yup.object().shape({
        siteName: Yup.string().required('Site Name is required'),
        location: Yup.string().required('Location is required'),
        siteManagerName: Yup.string().required('Site Manager Name is required'),
    });
    return (
        <div>
            <ToastContainer position="top-right" theme="colored" />
            <Niv name='Add new Site' />
            <div className="data">
                <h1 className={styles.formTitle}>Site Information</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ resetForm }) => (
                        <Form className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="siteName">Site Name</label>
                                <Field type="text" name="siteName" className={styles.input} />
                                <ErrorMessage name="siteName" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="location">Location</label>
                                <Field type="text" name="location" className={styles.input} />
                                <ErrorMessage name="location" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="siteManagerName">Site Manager Name</label>
                                <Field as="select" name="siteManagerName" className={styles.input}>
                                    <option value="" disabled>
                                        Select a Site Manager
                                    </option>
                                    {sitemanager.map((sitemanager, index) => (
                                        <option key={index} value={sitemanager._id}>
                                            {sitemanager.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="siteManagerName" component="div" className={styles.error} />
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

export default Addsite;
