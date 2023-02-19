import { useContext } from "react"
import { UserContext } from "../context/UserContext";
import stl from '../style/body.module.css'
import WelcomeIcon from '../gif/welcome.png';

export const HomePage = () => {

  const { user } = useContext( UserContext );


    return (
      <>
        <center>
          <img style={{zoom:"50%"}} src={WelcomeIcon} alt="loading..." />
        </center>
          {/* <h1>Welcome <small>{ user?.name }</small> </h1>
          <hr />

          <pre>
            { JSON.stringify( user, null, 3 ) }
          </pre> */}
      </>
    )
  }
