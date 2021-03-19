import React, { useState } from 'react'
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom'

interface Props {

}

const Register: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register] = useRegisterMutation()

    const submitForm: any = async (event: any) => {
        event.preventDefault()
        console.log('formsubmited');
        console.log(email, password);
        const res = await register({
            variables: {
                email,
                password
            }
        })
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register
