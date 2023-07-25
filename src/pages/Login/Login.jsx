import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { auth } from "../../firebase";
import './login.css';

const Login = () => {

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            console.log("Error from lgin ", error)
        }
        
    }
  return (
    <div className='register'>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <p className='chat-name'>Eslamo Chat</p>
                <p className="reg">Register</p>
                <div className="input-control">
                    <input type="email" placeholder='email' />
                </div>
                <div className="input-control">
                    <input 
                    type="password"
                    placeholder='password'
                     />
                </div>
                <Button onClick={() => handleSubmit()} type='submit' text='Login' />
                <p className='switch-text'>You don't have an account? <Link to="/register" className='login-btn'>Register</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login