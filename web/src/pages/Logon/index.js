import React, { useState } from 'react';
import { BsPersonFill, BsQuestionSquareFill} from 'react-icons/bs'
import { Link, useHistory } from 'react-router-dom'
import { Container, Row, Col, Form, Input, Label, Button} from 'reactstrap'

import './style.css'
import Logo from '../../assets/Logo.jpeg'

import api from '../../services/api'

export default function Logon() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    async function handleLogin(e) {

        e.preventDefault();

        try {
            const response = (await api.post('authenticate', {email, password})).data
            localStorage.clear()
            localStorage.setItem('token', response.token)
            history.push('/profile')
        } catch (err) {
            console.log(err)
            alert("Falha no login, tente novamente")
        }
    }

    return (
        <Container>
            <Row>
                <Col sm={12} md={6} lg={4}>
                    <Form className="form my-5" onSubmit={handleLogin}>
                        <Row form>
                            <Label for='inputEmail'>Seu E-mail</Label>
                            <Input 
                                type='email' 
                                name="loginEmail" 
                                className='mb-2'
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                                placeholder='example@email.com' 
                                required/>
                        </Row>

                        <Row form>   
                            <Label for="inputPassword">Sua Senha</Label>
                            <Input 
                                type='password' 
                                name='loginPassword' 
                                className='mb-2'
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                placeholder='xxxxxx' 
                                required/>
                        </Row>

                        <div className="mobileAlignForm">
                            <Row form>
                                <Button className='btn-Login mt-2' color='outline-dark'>Entrar</Button>
                            </Row>

                            <Row form>
                                <Link to='/register' className='link'>
                                    <BsPersonFill size={16} color='#000'/>
                                    Cadastre-se
                                </Link>  
                            </Row>

                            <Row form>
                                <Link to='/forgot_password' className='link'>
                                    <BsQuestionSquareFill size={16} color='#000'/>
                                    Esqueceu a senha?
                                </Link>
                            </Row>
                        </div>
                    </Form>
                </Col>
                <Col md={6} className="img-margin rounded mx-auto d-block">
                    <img src={Logo} alt="" className="img-fluid"/>
                </Col>
            </Row>
        </Container>    
    )
}