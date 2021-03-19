import React from 'react'
import { useUsersQuery } from '../generated/graphql'

interface Props {

}

const Home: React.FC<Props> = () => {
    const { data } = useUsersQuery({ nextFetchPolicy: 'network-only' })
    if (!data) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h4>users</h4>
            <ul>
                {data.users.map((user, i) => {
                    return <li key={i} >id: {user.id}, email: {user.email} </li>
                })}
            </ul>
        </div>
    )
}

export default Home
