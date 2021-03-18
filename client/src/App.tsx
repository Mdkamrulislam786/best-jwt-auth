import React from 'react';
import './App.css';
import { useHelloQuery } from './generated/graphql';
import Routes from './Routes';

const App: React.FC = () => {
  const { data, loading } = useHelloQuery()
  if (loading || !data) {
    return <div>loading...</div>
  }
  return <Routes/>
}

export default App;
