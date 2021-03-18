import React, { useState } from 'react'
import { useRegisterMutation } from '../generated/graphql';

interface Props {

}

const Register: React.FC<Props> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register] = useRegisterMutation()
    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault()
                console.log('formsubmited');
                console.log(email, password);
                const res = await register({
                    variables: {
                        email,
                        password
                    }
                })
                console.log('res', res);
            }}
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
