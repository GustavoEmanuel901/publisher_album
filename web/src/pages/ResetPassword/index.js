import React, { useState } from 'react';
import { Container, Form, Input, Label, FormGroup, Button, Col, Row } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import api from '../../services/api';

export default function ResetPassword() {

    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')

    const history = useHistory()

    async function handleReset(e) {
        e.preventDefault();

        if (password !== conPassword) {
            alert('Senhas Diferentes')
            return
        }

        const data = {
            email,
            token,
            password
        }

        try {
            await api.post('reset_password', data)
            alert("Senha Resetada com sucesso")
            history.push('/')
        } catch (error) {
            alert('Erro, tente novamente')
        }
    }

    return (
        <Container>
            <h1 className="my-3 text-center">Redefina sua Senha</h1>
            <p className='text-center'>Use o Token enviado para seu E-mail</p>
            <Row className="justify-content-center mb-5">
                <Col md={10} sm={12} lg={8}>
                    <Form onSubmit={handleReset}>
                        <Row form>
                            <FormGroup className='col-sm-12'>
                                <Label for="inputName">Seu E-mail</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="example@email.com"
                                    required
                                />
                            </FormGroup>
                        </Row>

                        <Row form>
                            <FormGroup className='col-sm-12'>
                                <Label for="inputName">Token</Label>
                                <Input
                                    type='text'
                                    name='token'
                                    value={token}
                                    onChange={e => setToken(e.target.value)}
                                    placeholder="Cole aqui o Token Enviado por E-mail"
                                    required
                                />
                            </FormGroup>
                        </Row>

                        <Row form>
                            <FormGroup className='col-sm-12'>
                                <Label for="inputName">Nova Senha</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="xxxxxxxx"
                                    required
                                />
                            </FormGroup>
                        </Row>

                        <Row form>
                            <FormGroup className='col-sm-12'>
                                <Label for="inputName">Confirme sua nova Senha</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    value={conPassword}
                                    onChange={e => setConPassword(e.target.value)}
                                    placeholder="xxxxxxxx"
                                    required
                                />
                            </FormGroup>
                        </Row>

                        <Row form>
                            <Col className="col-sm-12">
                                <Button type='submit' color='outline-dark'>Enviar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
}
