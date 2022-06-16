import "./register.scss"

const Register = () => {
    return (
        <div className="register">
            <div className="wrapper">
                <form className="ui form">
                    <h2 class="ui dividing header">SignUp</h2>
                    <div className="field">
                        <label >Name</label>
                        <div className="two fields">
                        <div className="field">
                            <input type="text" name="first-name" placeholder="First Name"/>
                        </div>
                        <div className="field">
                            <input type="text" name="last-name" placeholder="Last Name"/>
                        </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="abc@xmail.com"/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" />
                    </div>
                    <div className="field">
                        <label>Retype Password</label>
                        <input type="password" name="rpassword" />
                    </div>
                    <div className="field">
                        <div className="ui checkbox">
                        <input type="checkbox" tabindex="0" class="hidden"/>
                        <label>I agree to the Terms and Conditions</label>
                        </div>
                    </div>
                    <button class="ui primary button" type="submit">SignUp</button>
                    <button className="ui red button" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Register
