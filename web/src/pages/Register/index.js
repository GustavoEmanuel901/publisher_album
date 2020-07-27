import React, {useState, useEffect} from 'react';
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useHistory } from 'react-router-dom'
import { Label, Form, Container, Row, Col, Input, FormGroup, Button} from 'reactstrap'

import axios from 'axios'
import api from '../../services/api'


export default function Register() {
  const [name, setName] = useState('')
  const [user_name, setUser_name] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [state, setState] = useState([])
  const [city, setCity] = useState([])
  const [password, setPassword] = useState('')
  const [conPassword, setConPassword] = useState('')
  const [token, setToken] = useState('')

  const [selectedState, setSelectedState] = useState('0')
  const [selectedCity, setselectedCity] = useState('0')

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    if(password !== conPassword){
        alert('Senhas diferentes')
        return
    }

    const state = selectedState
    const city = selectedCity

    const data = {
        name, 
        user_name,
        email,
        telephone,
        state,
        city,
        password
    }

    try {
        const response = (await api.post('users/register', data)).data
        alert('Cadastrado com sucesso')
        localStorage.setItem('token', response.token)
        history.push('/profile')
    } catch (err) {
        console.log(err)
        alert('Erro no cadastro')
    }
  }

  useEffect (() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response =>{
        const UfStates = response.data.map(uf => uf.sigla)
        setState(UfStates)
    })
  })

  useEffect(() =>{
    if (selectedState === '0')
    return

    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`).then(response =>{
        const cityNames = response.data.map(city => city.nome)
        setCity(cityNames)
    })
    }, [selectedState])

    function handleSelectedState(e){
        const state = e.target.value

        setSelectedState(state)
    }

    function handleSelectedCity(e){
        const city = e.target.value

        setselectedCity(city)
    }

  return (
        <Container>
            <h1 className="text-center my-5">Cadastro</h1>
            <Row className="justify-content-center mb-5">
                <Col md={10} sm={12} lg={8}>
                    <Form onSubmit={handleRegister}>
                       <Row form>
                            <FormGroup className='col-sm-6'>
                                <Label for="inputName">Seu Nome</Label>
                                <Input 
                                    type='text' 
                                    name='name' 
                                    placeholder="João Fernando"
                                    value={name} 
                                    onChange={e => setName(e.target.value)}
                                    required/>
                            </FormGroup>

                            <FormGroup className='col-sm-6'>
                                <Label for="inputUserName">Nome de Usuário</Label>
                                <Input 
                                    type='text' 
                                    name='user_name' 
                                    placeholder="João_123"
                                    value={user_name}
                                    onChange={e => setUser_name(e.target.value)}
                                    required/>
                            </FormGroup>
                       </Row>

                       <Row form>
                            <FormGroup className='col-sm-6'>
                                <Label for="inputEmail">Endereço de E-mail</Label>
                                <Input 
                                    type='email' 
                                    name='email' 
                                    placeholder="example@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} 
                                    required/>
                            </FormGroup>

                            <FormGroup className='col-sm-6'>
                                <Label for="inputTelephone">Telefone</Label>
                                <Input 
                                    type='number' 
                                    name='telephone' 
                                    placeholder="41997676871"
                                    value={telephone}
                                    onChange={e => setTelephone(e.target.value)} 
                                    required/>
                            </FormGroup>
                       </Row>

                       <Row form>
                            <FormGroup className='col-sm-6'>
                            <Label for="inputState">Seu Estado</Label>
                                <select 
                                    name="uf"
                                    className="form-control"
                                    value={selectedState}
                                    onChange={handleSelectedState} 
                                    required >
                                    <option value="">Selecione seu Estado</option>
                                    {state.map(uf => (
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))}
                                </select>
                            </FormGroup>

                            <FormGroup className='col-sm-6'>
                                <Label for="inputName">Sua Cidade</Label>
                                <select 
                                    name="city" 
                                    className="form-control"
                                    value={selectedCity} 
                                    onChange={handleSelectedCity}
                                    required >
                                    <option value="">Selecione sua cidade</option>
                                    {city.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </FormGroup>
                       </Row>

                       <Row form>
                            <FormGroup className='col-sm-6'>
                                <Label for="inputPassword">Sua Senha</Label>
                                <Input 
                                    type='password' 
                                    name='password' 
                                    placeholder="xxxxxx"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} 
                                    required/>
                            </FormGroup>

                            <FormGroup className='col-sm-6'>
                                <Label for="inputConSenha">Confirme sua senha</Label>
                                <Input 
                                    type='password' 
                                    name='conPassword' 
                                    placeholder="xxxxxx"
                                    value={conPassword}
                                    onChange={e => setConPassword(e.target.value)} 
                                    required/>
                            </FormGroup>
                       </Row>

                       <Row form>
                           <FormGroup className='col-sm-12'>
                                <div className="form-check">
                                    <Label className='form-check-label'>
                                        <Input type='checkbox' className='form-check-input' required/>
                                        <Link to='/' className='form-link text-dark'>
                                            Li e concordo com os termos de uso
                                        </Link>
                                    </Label>
                                </div>
                           </FormGroup>
                       </Row>

                       <Row form>
                           <Col className="col-sm-12">
                                <Button type='submit' color='outline-dark'>Enviar</Button>
                           </Col>
                       </Row>

                       <Row form>
                           <Col className='col-sm-12 mt-3'>
                               <Link to='/' className='form-link text-dark'>
                                    <BsArrowLeft/>
                                    Voltar para Home
                               </Link>
                           </Col>
                       </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
  )
}
