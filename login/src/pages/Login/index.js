import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, FormLogin, Titulo, Input, ButtonPrimary, AlertDanger, AlertSuccess } from './styles';
import { Context } from '../../Context/AuthContext';
import api from '../../config/configApi';

export const Login = () => {

    const history = useHistory();

    const { signIn } = useContext(Context);

    const [dadosUsuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valorInput = e => setUsuario({ ...dadosUsuario, [e.target.name]: e.target.value });

    const loginSubmit = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        api.post("/login", dadosUsuario, { headers })
            .then((response) => {
                if (response.data.erro) {
                    setStatus({
                        type: 'erro',
                        mensagem: response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        mensagem: response.data.mensagem
                    });
                    // Salvar o token localStorage
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
                    signIn(true);

                    return history.push('/dashboard');
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: "Erro: Usuário ou senha a senha incorreta!"
                });
            });
    }

    return (
        <Container>
            <FormLogin>
                {/* Título da página */}
                <Titulo>Login</Titulo>

                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

                <form onSubmit={loginSubmit}>
                    <Input type="text" name="usuario" placeholder="Usuário" onChange={valorInput} />

                    <Input type="password" name="senha" placeholder="Senha" autoComplete="on" onChange={valorInput} />

                    <ButtonPrimary type="submit">Acessar</ButtonPrimary>
                </form>
            </FormLogin>
        </Container>
    );
}