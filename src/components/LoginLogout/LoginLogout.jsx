import { GoogleLogin, GoogleLogout } from 'react-google-login';

export const LoginLogout = ({children = null, logout = false, update}) => {    

    const loginResponse = (response) => {
        if(response.googleId) {
            update({
                googleId: response.profileObj.googleId,
                name: response.profileObj.name,
                email: response.profileObj.email,
                imageUrl: response.profileObj.imageUrl              
            });
        }
    }

    const logoutResponse = () => {
        update({});
    }
    
    if (children) {
        return (
            <GoogleLogin
                clientId="270166148168-t0qgdm1infopcj0nsnn9rnt126565hdc.apps.googleusercontent.com"
                buttonText="Iniciar Sesion"
                onSuccess={loginResponse}
                onFailure={loginResponse}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <div onClick={renderProps.onClick} disabled={renderProps.disabled}>{children}</div>
                )}
                />     
        )
    } else if (!logout) {
        return (
            <GoogleLogin
                clientId="270166148168-t0qgdm1infopcj0nsnn9rnt126565hdc.apps.googleusercontent.com"
                buttonText="Iniciar Sesion"
                onSuccess={loginResponse}
                onFailure={loginResponse}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                className="googleLogin"
                />   
        )
    } else {
        return (
            <GoogleLogout
                clientId="270166148168-t0qgdm1infopcj0nsnn9rnt126565hdc.apps.googleusercontent.com"
                buttonText="Cerrar Sesión"
                onLogoutSuccess={logoutResponse}
                className="googleLogout"
                />
        )
    }
}