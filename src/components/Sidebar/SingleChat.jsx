
const SingleChat = ({img, name, lastMessage, date}) => {
  
  return (
    <div className='single-chat'>
        <img src={img} alt="use image" />
        <div className="username-lastMessage">
            <span className="username">{name}</span>
            <span className="last-msg">{lastMessage}</span>
        </div>
    </div>
  )
}

export default SingleChat