import './styles.css'
import {BASE_URL} from "../config";

function loginWithGoogle() {
    // Przekierowanie do Google OAuth2
    window.location.href = BASE_URL + 'oauth2/authorization/google';
}

const GoogleButton = ({isLogin = true}) => {
    return (
        <button type="button" onClick={loginWithGoogle} className="login-with-google-btn">
            {isLogin ? "Zaloguj sie z Google" : "Zarejestruj się z Google"}
        </button>
    )
}
export default GoogleButton
