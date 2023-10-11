
import React, { useEffect,useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import emailjs from 'emailjs-com';
import Niv from '../components/Niv';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../Style/site.module.css'
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { GiSaveArrow } from "react-icons/gi";

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
  const [users, setUsers] = useState([]);
  const [editableUserId, setEditableUserId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedcontact, setcontact] = useState('');
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


  useEffect(() => {
    function getsitemanager() {
      axios.get("http://localhost:8070/supplier/getsupplier/").then((res) => {
        console.log(res.data);
        setUsers(res.data);
        // console.log(orders[1]);
      });
    }
    getsitemanager();
  }, []);


 

  const onDelete = (userId) => {
    axios
    .delete(`http://localhost:8070/supplier/delete/${userId}`)
    .then(() => {
      toast.success("New Supplier added successfully");
    })
    .catch((err) => {
      toast.error("New Supplier added unsuccessfully");
    });
    setUsers(users.filter((user) => user._id !== userId));

  };


  const handleEdit = (user) => {
    setEditableUserId(user._id);
    setEditedName(user.company);
    setEditedEmail(user.email);
    setcontact(user.contact)
    
  };

  const handleSave = (user) => {
    // Implement save functionality here
    console.log(`Save user: ${user._id}, Name: ${editedName}, Email: ${editedEmail}`);

    const values={
      name:editedName,
      email:editedEmail,
      contact:editedcontact
    }
    axios
    .put(`http://localhost:8070/supplier/update/${user._id}`, values)
    .then(() => {
      toast.success("New Supplier added successfully");
    })
    .catch((err) => {
      toast.error("New Supplier added unsuccessfully");
    });


    setEditableUserId(null);
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

        <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Contact No</th>
            <th colSpan={3}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {editableUserId === user._id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  user.company
                )}
              </td>
              <td>
                {editableUserId === user._id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editableUserId === user._id ? (
                  <input
                    type="text"
                    value={editedcontact}
                    onChange={(e) => setcontact(e.target.value)}
                  />
                ) : (
                  user.contact
                )}
              </td>
              <td>
                {editableUserId === user._id ? (
                  <button onClick={() => handleSave(user)}><GiSaveArrow size={20}/></button>
                ) : (
                  <button onClick={() => handleEdit(user)}><FiEdit size={20}/></button>
                )}
              </td>
              <td>
                <button onClick={() => onDelete(user._id)}><FiTrash2 size={20}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>



      </div>
    
  );
}

export default Supplierreg;