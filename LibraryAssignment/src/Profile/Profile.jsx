import { Link } from "react-router-dom"
function Profile(){
    return (
        <Link to="/" >
            <input style={{cursor: "pointer", color:"black", border: "solid black 1px", width: "50px", display: "flex", justifyContent: "center", alignItems: "center"}} value="Выйти"></input>
        </Link>
        
    )
}
export default Profile