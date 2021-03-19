import React, { useEffect, useState } from 'react';
import { setAccessToken } from './accessToken';
import './App.css';
import Routes from './Routes';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)

  //before we load the app, we're sending a new refrsh token to get a new accesstoken, then we're setting the accesstoken
  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      credentials: 'include',
      method: "POST"
    })
      .then(async x => {
        const { accessToken } = await x.json()
        setAccessToken(accessToken)
        console.log("from app", accessToken);
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>loading...</div>
  }
  return <Routes />
}

export default App;
