
import React, { useEffect,useState } from 'react';
import Niv from '../components/Niv';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import styles from '../Style/addsite.module.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { GiSaveArrow } from "react-icons/gi";

function Addsite() {
    const [sitemanager, setsitemanager] = useState([]);
    const initialValues = {
        siteName: '',
        location: '',
        siteManagerName: '',
        budget:''

    };
    const [users, setUsers] = useState([]);
  const [editableUserId, setEditableUserId] = useState(null);
  const [editesitemanager, setEditedsitemanager] = useState('');
  const [editedbudget, setEditedbudget] = useState('');

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

    useEffect(() => {
        function getsitemanager() {
          axios.get("http://localhost:8070/site/").then((res) => {
            // console.log(res.data);
            setUsers(res.data);
            // console.log(orders[1]);
          });
        }
        getsitemanager();
      }, []);
    
    
     
    
      const onDelete = (userId) => {
    
        axios
        .delete(`http://localhost:8070/sitemanager/delete/${userId}`)
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
        setEditedsitemanager(user.managerId);
        setEditedbudget(user.budget);
        
      };
    
      const handleSave = (user) => {
        // Implement save functionality here
        // console.log(`Save user: ${user._id}, Name: ${editedName}, Email: ${editedEmail}`);
    alert(editesitemanager)
        const values={
          siteManagerName:editesitemanager,
          budget:editedbudget
        }
        axios
        .put(`http://localhost:8070/site/update/${user._id}`, values)
        .then(() => {
          toast.success("New Supplier added successfully");
        })
        .catch((err) => {
          toast.error("New Supplier added unsuccessfully");
        });
    
    
        setEditableUserId(null);
      };



  
    const validationSchema = Yup.object().shape({
        siteName: Yup.string().required('Site Name is required'),
        location: Yup.string().required('Location is required'),
        siteManagerName: Yup.string().required('Site Manager Name is required'),
        budget:Yup.number().required("budget is required")
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
                            <div className={styles.formGroup}>
                                <label htmlFor="budget">Budget</label>
                                <Field type="text" name="budget" className={styles.input} />
                                <ErrorMessage name="budget" component="div" className={styles.error} />
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
            <th>Site Name</th>
            <th>Location</th>
            <th>Site Manager</th>
            <th colSpan={3}>Budget</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.name}
              </td>
              <td>
                {user.location}
              </td>
              <td>
              {editableUserId === user._id ? (
                 <select name="" id="" onClick={(e)=>setEditedsitemanager(e.target.value)}>
                    {sitemanager.map((sitemanager, index) => (
                                        <option key={index} value={sitemanager._id} >
                                            {sitemanager.name}
                                        </option>
                                    ))}
                 </select>
                ) : (
                  sitemanager.filter((val)=>{
                    if(val._id.includes(user.managerId )){
                        return val
                    }
                  }).map((items,index)=>(
                    <>{items.name}
                    
                    </>
                    
                  ))
                )}

              </td>

              <td>
              {editableUserId === user._id ? (
                  <input
                    type="text"
                    value={editedbudget}
                    onChange={(e) => setEditedbudget(e.target.value)}
                  />
                ) : (
                  user.budget
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

export default Addsite;
