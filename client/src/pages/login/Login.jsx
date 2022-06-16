import "./login.scss"

const Login = () => {
    return (
        <div className="login">
            <div className="wrapper">
                <form className="ui form">
                    <h2 class="ui dividing header">Login</h2>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="abc@xmail.com"/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" />
                    </div>
                    <button class="ui primary button" type="submit">Login</button>
                    <button className="ui red button" type="submit">SignUp</button>
                </form>
            </div>
        </div>
    )
}

export default Login
