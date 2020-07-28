import React, { useState } from 'react';
import { Container, Form, Input, Label, FormGroup, Button, Col, Row} from 'reactstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

export default function ForgotPassword() {

  const [email, setEmail] = useState('')

  const history = useHistory()

  async function handleEnvToken(e) {
    e.preventDefault();

    try {
        await api.post('forgot_password', { email })
        alert('Token Enviado para seu E-mail')
        history.push('/reset_password')
    } catch (error) {
        alert('Erro, tente novamente')
    }
  }
  return (
      <Container>
          <h1 className="my-3 text-center">Esqueceu sua Senha</h1>
          <p className='text-center'>Sem Problema!, Digite seu E-mail Cadastrado.</p>
          <Row className="justify-content-center mb-5">
          <Col md={10} sm={12} lg={8}>
            <Form onSubmit={handleEnvToken}>
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
                    <Col className="col-sm-12">
                        <Button type='submit' color='outline-dark'>Enviar</Button>
                    </Col>
                </Row>
                

                <Row form>
                    <Col className='col-sm-12 mt-2'>
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
  );
}

