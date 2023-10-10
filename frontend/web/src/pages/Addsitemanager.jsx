
import React, { useEffect ,useState} from 'react';
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
  const [users, setUsers] = useState([]);
  const [editableUserId, setEditableUserId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

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

  
  useEffect(() => {
    function getsitemanager() {
      axios.get("http://localhost:8070/sitemanager/").then((res) => {
        // console.log(res.data);
        setUsers(res.data);
        // console.log(orders[1]);
      });
    }
    getsitemanager();
  }, [editableUserId]);


 

  const onDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };


  const handleEdit = (user) => {
    setEditableUserId(user._id);
    setEditedName(user.name);
    setEditedEmail(user.email);
    
  };

  const handleSave = (user) => {
    // Implement save functionality here
    console.log(`Save user: ${user._id}, Name: ${editedName}, Email: ${editedEmail}`);

    const values={
      name:editedName,
      email:editedEmail
    }
    axios
    .put(`http://localhost:8070/sitemanager/update/${user._id}`, values)
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

      <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
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
                  user.name
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
                  <button onClick={() => handleSave(user)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(user)}>Edit</button>
                )}
              </td>
              <td>
                <button onClick={() => onDelete(user._id)}>Delete</button>
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

export default Addsitemanager;