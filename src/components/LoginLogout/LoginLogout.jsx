import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { exitUser, saveUser } from '../../actions/userActions';

export const LoginLogout = ({children = null, logout = false, user = {}}) => {    
    const dispatch = useDispatch()

    const loginResponse = (response) => {
        if(response.googleId && !user.name) {
            dispatch(saveUser({
                googleId: response.profileObj.googleId,
                name: response.profileObj.name,
                email: response.profileObj.email,
                imageUrl: response.profileObj.imageUrl              
            }))
        }
    }

    const logoutResponse = () => {
        dispatch(exitUser())
    }
    
    if (children) {
        return (
            <GoogleLogin
                clientId="630395241807-d3qudpjgqgjfrho00mifeu1rq93oe6qp.apps.googleusercontent.com"
                buttonText="Iniciar Sesion"
                onSuccess={loginResponse}
                onFailure={(err) => console.warn(err)}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <div onClick={renderProps.onClick} disabled={renderProps.disabled}>{children}</div>
                )}
                />     
        )
    } else if (!logout) {
        return (
            <GoogleLogin
                clientId="630395241807-d3qudpjgqgjfrho00mifeu1rq93oe6qp.apps.googleusercontent.com"
                buttonText="Iniciar Sesion"
                onSuccess={loginResponse}
                onFailure={(err) => console.warn(err)}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                className="googleLogin"
                />   
        )
    } else {
        return (
            <GoogleLogout
                clientId="630395241807-d3qudpjgqgjfrho00mifeu1rq93oe6qp.apps.googleusercontent.com"
                buttonText="Cerrar Sesión"
                onLogoutSuccess={logoutResponse}
                className="googleLogout"
                />
        )
    }
}
