import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../accessToken';
import { useLoginMutation, MeQuery, MeDocument } from '../generated/graphql';



const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation()

    const submitForm: any = async (e: any) => {
        e.preventDefault();
        console.log("form submitted");
        const response = await login({
            variables: {
                email,
                password
            },
            update: (store, { data }) => {
                if (!data) {
                    return null;
                }

                store.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        me: data.login.user
                    }
                });
            }
        });

        console.log(response);

        if (response && response.data) {
            setAccessToken(response.data.login.accecssToken);
        }
        history.push("/");
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

