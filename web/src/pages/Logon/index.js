import React from 'react';
import { BsPersonFill, BsQuestionSquareFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Input, Label, Button} from 'reactstrap'

import './style.css'
import Logo from '../../assets/Logo.jpeg'

export default function Logon() {
    return (
        <Container>
            <Row>
                <Col sm={12} md={6} lg={4}>
                    <Form className="form my-5">
                        <Row form>
                            <Label for='inputEmail'>Seu E-mail</Label>
                            <Input type='email' name="loginEmail" className='mb-2' placeholder='example@email.com' required/>
                        </Row>

                        <Row form>   
                            <Label for="inputPassword">Sua Senha</Label>
                            <Input type='password' name='loginPassword' className='mb-2' placeholder='xxxxxx' required/>
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
                                <Link to='/' className='link'>
                                    <BsQuestionSquareFill size={16} color='#000'/>
                                    Esqueceu a senha
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