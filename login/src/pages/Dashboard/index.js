import React from 'react';
import { Container, ConteudoTitulo, Titulo } from '../../styles/custom_adm';
import Menu from '../../components/Menu';

export const Dashboard = () => {

    return (
        <Container>
            <Menu />
            <ConteudoTitulo>
                <Titulo>Dashboard</Titulo>
            </ConteudoTitulo>
        </Container>
    );
}