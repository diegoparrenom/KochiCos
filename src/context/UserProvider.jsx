import { useState } from "react"
import { UserContext } from "./UserContext"

// const user = {
//     id: 123,
//     name: 'Fernando Herrera',
//     email: 'fernando@google.com'
// }



export const UserProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [ rentInfo, setRentInfo ]= useState();

    return (
        // <UserContext.Provider value={{ hola: 'Mundo', user: user }}>
        <UserContext.Provider value={{ user, setUser ,rentInfo,setRentInfo}}>
            { children }
        </UserContext.Provider>
    )
}
