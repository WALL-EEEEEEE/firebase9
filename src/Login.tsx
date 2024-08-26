import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";


const SignUp= () => {
    const auth = getAuth()
    const doSignUp =  (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password).then((cred) => {
            console.log(cred)
        }).catch((e) => {
            console.error(e)
        })
        return;
    }
     
    return (
        <div className="login-form">
            <form onSubmit={ (e) => {
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

export default SignUp;