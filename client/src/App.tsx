import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import './App.css';
import { gql } from 'apollo-boost'

const App: React.FC = () => {
  const { data, loading } = useQuery(gql`
  {
    hello
  }
`)
  if (loading) {
    return <div>loading...</div>
  }
  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
