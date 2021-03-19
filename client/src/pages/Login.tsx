import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../accessToken';
import { useLoginMutation } from '../generated/graphql';



const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation()

    const submitForm: any = async (event: any) => {
        event.preventDefault()
        console.log('formsubmited');
        console.log(email, password);
        const res = await login({
            variables: {
                email,
                password
            }
        })
        if (res && res.data) {
            setAccessToken(res.data.login.accecssToken)
        }
        setEmail('')
        setPassword('')
        history.push('/')
        console.log('res', res);
    }

    return (
        <div>
            <form onSubmit={submitForm}
            >
                <div>
                    <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login

