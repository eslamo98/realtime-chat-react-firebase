import { useState } from "react";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import {auth, db,  storage} from "../../firebase"


import Button from '../../components/Button/Button';

import AddAvatar from "../../img/addAvatar.png";

const Register = () => {
    
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        const file = event.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);


            // the name that will be shown in the firebase storage
            const storageRef = ref(storage, username);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on((error) => {
                setError(true);
            }, 
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(res.user, {
                        displayName: username,
                        photoURL: downloadURL,
                    });
                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName: username,
                        photoURL: downloadURL,
                      });

                      await setDoc(doc(db, "userChats", res.user.uid), {});
                      navigate("/");
                });
            });

        } catch (error) {
            console.log(error)
            setError(error.message);
        }
        
    }
  return (
    <div className='register'>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <p className='chat-name'>Eslamo Chat</p>
                <p className="reg">Register</p>
                <div className="input-control">
                    <input type="text" placeholder='username' />
                </div>
                <div className="input-control">
                    <input type="email" placeholder='email' />
                </div>
                <div className="input-control">
                    <input type="password" placeholder='password' />
                </div>
                <div className="input-control">
                    <input type="file" id='file'/>
                    <label className='add-avatar' htmlFor="file">
                        <img src={AddAvatar} width="30" alt="add pic" /> 
                        Upload Picture
                    </label>
                </div>
                <Button onClick={() => handleSubmit()} type='submit' text='Register' />
                <p className='switch-text'>Already have an account? <Link to="/login" className='login-btn'>Login</Link></p>
                {error && <span>Something went wrong ... </span>}
            </form>
        </div>
    </div>
  )
}

export default Register