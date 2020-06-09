# Descrição dos testes

# Usuários

## Criação

- [x] Usuário pode criar uma conta
- [x] Não pode criar uma conta com email duplicado

## Recuperação de senha

- [x] Usuário deve receber email com token de recuperação de senha
- [x] Não pode enviar email para usuário não registrado
- [x] Usuário deve poder alterar sua senha
- [x] Não pode alterar a senha com token inválido
- [x] Não pode alterar a senha com token inexistente
- [x] Token deve expirar em duas horas
- [x] A nova senha deve ser criptografada

## Trabalhos

- [ ] Usuário deve poder criar um trabalho
- [ ] Usuário deve poder deletar um trabalho
- [ ] Usuário deve poder editar um trabalho