import React from 'react';
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Label, Form, Container, Row, Col, Input, FormGroup, Button} from 'reactstrap'



export default function Register() {
  return (
        <Container>
            <h1 className="text-center my-5">Cadastro</h1>
            <Row className="justify-content-center mb-5">
                <Col md={10} sm={12} lg={8}>
                    <Form>
                       <Row form>
                            <FormGroup className='col-sm-6'>
                                <Label for="inputName">Seu Nome</Label>
                                <Input type='text' name='name' placeholder="João Fernando" required/>
                            </FormGroup>

                            <FormGroup className='col-sm-6'>
                                <Label for="inputUserName">Nome de Usuário</Label>
                                <Input type='text' name='user_name' placeholder="João_123" required/>
                            </FormGroup>
                       </Row>

                       <Row form>
                            <FormGroup className='col-sm-6'>
                                <Label for="inputEmail">Endereço de E-mail</Label>
                                <Input type='email' name='email' placeholder="example@email.com" required/>
                            </FormGroup>

                            <FormGroup className='col-sm-6'>
                                <Label for="inputTelephone">Telefone</Label>
                                <Input type='number' name='telephone' placeholder="41997676871" required/>
                            </FormGroup>
                       </Row>

                       <Row form>
                            <FormGroup className='col-sm-6'>
                            <Label for="inputState">Seu Estado</Label>
                                <select name="uf" className="form-control" required >
                                    <option value="">Selecione seu Estado</option>
                                </select>

                                <input type="hidden" name="state"/>
                            </FormGroup>

                            <FormGroup className='col-sm-6'>
                                <Label for="inputName">Sua Cidade</Label>
                                <select name="city" className="form-control" disabled required >
                                    <option value="">Selecione sua cidade</option>
                                </select>
                            </FormGroup>
                       </Row>

                       <Row form>
                            <FormGroup className='col-sm-6'>
                                <Label for="inputPassword">Sua Senha</Label>
                                <Input type='password' name='password' placeholder="xxxxxx" required/>
                            </FormGroup>

                            <FormGroup className='col-sm-6'>
                                <Label for="inputConSenha">Confirme sua senha</Label>
                                <Input type='password' name='conPassword' placeholder="xxxxxx" required/>
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
