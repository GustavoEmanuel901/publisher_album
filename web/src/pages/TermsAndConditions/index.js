import React from 'react';

import { Container, Col, Row } from 'reactstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import './styles.css'

export default function TermsAndConditions() {
    return (
        <Container>
            <h1 className="text-center my-5">Termos e condições</h1>
            <Row className="justify-content-center mb-5">
                <Col md={10} sm={12} lg={8}>
                    <div data-spy="scroll" data-offset="0" className="scrollspy">
                        <h4>Donec sed</h4>
                        <p>
                            Pellentesque ullamcorper nulla eget erat fermentum, nec dignissim nulla tristique.
                            Pellentesque blandit lorem vitae quam interdum, at sodales lacus rhoncus.
                            Vivamus hendrerit risus mi, vehicula pretium dolor auctor ut.
                            Sed ut enim odio. Ut eu erat ut leo efficitur gravida vel sit amet ipsum.
                    </p>

                        <h5>Vivamus orci</h5>
                        <p>Donec consectetur augue eu est lobortis, sit amet tristique dui dictum.
                        Fusce gravida lacus justo, ut consequat metus lacinia sollicitudin.
                        Etiam a ullamcorper risus, eu consectetur enim.
                        Donec id augue non purus tincidunt facilisis vel et eros.</p>

                        <h5>Suspendisse pretium</h5>
                        <p>
                            Maecenas tellus eros, ultricies sit amet dictum vel, eleifend non diam.
                            Praesent tellus tortor, aliquet vel semper sit amet, finibus malesuada erat.
                            Maecenas euismod mauris egestas lectus ultricies viverra. Donec suscipit vitae elit quis porttitor.
                            Suspendisse venenatis dignissim tincidunt.
                    </p>


                        <h4>Donec sed</h4>
                        <p>
                            Pellentesque ullamcorper nulla eget erat fermentum, nec dignissim nulla tristique.
                            Pellentesque blandit lorem vitae quam interdum, at sodales lacus rhoncus.
                            Vivamus hendrerit risus mi, vehicula pretium dolor auctor ut.
                            Sed ut enim odio. Ut eu erat ut leo efficitur gravida vel sit amet ipsum.
                    </p>


                        <h4>Lorem ipsum</h4>
                        <p>
                            Pellentesque ullamcorper nulla eget erat fermentum, nec dignissim nulla tristique.
                            Pellentesque blandit lorem vitae quam interdum, at sodales lacus rhoncus.
                            Vivamus hendrerit risus mi, vehicula pretium dolor auctor ut.
                            Sed ut enim odio. Ut eu erat ut leo efficitur gravida vel sit amet ipsum.
                    </p>

                        <h5>Vivamus orci</h5>
                        <p>Donec consectetur augue eu est lobortis, sit amet tristique dui dictum.
                        Fusce gravida lacus justo, ut consequat metus lacinia sollicitudin.
                        Etiam a ullamcorper risus, eu consectetur enim.
                        Donec id augue non purus tincidunt facilisis vel et eros.</p>

                        <h5>Suspendisse pretium</h5>
                        <p>
                            Maecenas tellus eros, ultricies sit amet dictum vel, eleifend non diam.
                            Praesent tellus tortor, aliquet vel semper sit amet, finibus malesuada erat.
                            Maecenas euismod mauris egestas lectus ultricies viverra. Donec suscipit vitae elit quis porttitor.
                            Suspendisse venenatis dignissim tincidunt.
                    </p>
                    </div>


                    <Link to='/register' className='form-link text-dark'>
                        <BsArrowLeft />
                        Voltar para o Cadastro
                    </Link>
                </Col>

            </Row>
        </Container>
    );
}

