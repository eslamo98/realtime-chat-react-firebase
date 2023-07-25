import './Button.css';

const Button = ({type, text, onClick}) => {
  return (
    <button onClick={() => onClick()} type={type} className='custom-btn'>{text}</button>
  )
}

export default Button