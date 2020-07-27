import React from 'react';

import { useHistory } from 'react-router-dom'

export default function Profile() {

  const history = useHistory()

  function clear() {
    localStorage.clear()
    history.push('/')
  }


  return (
    <div>
      <h1>Bem vindo</h1>

  
      <form onSubmit={clear}>
        <button>Voltar</button>
      </form>

    </div>
  );
}

 