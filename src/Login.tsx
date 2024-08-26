import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";


const SignUp = () => {
    const auth = getAuth()
    const doSignUp = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password).then((cred) => {
            console.log(cred)
        }).catch((e) => {
            console.error(e)
        })
        return;
    }

    return (
        <div className="sign-up-form">
            <form onSubmit={(e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const username = form.username.value
                const password = form.password.value
                doSignUp(username, password)
            }}>
                <p>
                    <label htmlFor="username">Email</label>
                    <input id="username" name="username" type="text"></input>
                </p>
                <p>
                    <label htmlFor="passwordd">Password</label>
                    <input id="password" name="password" type="password"></input>
                </p>
                <button>Sign Up</button>
            </form>
        </div>
    );
}

const Login = () => {
    const auth = getAuth()
    const doLogin = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password).then((cred) => {
            console.log(cred)
        }).catch((e) => {
            console.error(e)
        })
        return;
    }

    return (
        <div className="login-form">
            <form onSubmit={(e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const username = form.username.value
                const password = form.password.value
                doLogin(username, password)
            }}>
                <p>
                    <label htmlFor="username">Email</label>
                    <input id="username" name="username" type="text"></input>
                </p>
                <p>
                    <label htmlFor="passwordd">Password</label>
                    <input id="password" name="password" type="password"></input>
                </p>
                <button>Login</button>
            </form>
        </div>
    );

}
const Logout = () => {
    const auth = getAuth()
    const doLogout = () => {
        signOut(auth).then(() => {
            console.log(`user ${auth.currentUser} logout!`)
        }).catch((e) => {
            console.log(`user ${auth.currentUser} failed to logout: ${e}`)
        })
    }
    return ( 
    <div className="logout-form">
            <form onSubmit={(e) => {
                e.preventDefault()
                doLogout()
            }}>
                <button>Logout</button>
            </form>
        </div>
    )
}


export { SignUp, Login, Logout };