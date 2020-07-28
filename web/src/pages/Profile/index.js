import React, {useEffect} from 'react';

import { useHistory } from 'react-router-dom'

import api from '../../services/api'

export default function Profile() {

  const history = useHistory()

  const token = localStorage.getItem('token')

  function clear() {
    localStorage.clear()
    history.push('/')
  }

  useEffect(() => {
    api.get('projects', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      console.log(res.data)
    }, [token])

    
  return (
    <div>
      <h1>Bem vindo</h1>

  
      <form onSubmit={clear}>
        <button>Voltar</button>
      </form>

    </div>
  );
}

 