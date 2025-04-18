# APP

Gympass style app

## RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o número de checkins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter seu histórico de checkins;
- [X] Deve ser possível o usuário listar academias próximas (até 10 km);
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar checkin em uma academia;
- [X] Deve ser possível validar o checkin de um usuário;
- [X] Deve ser possível cadastrar uma academia;


## RNs (Regras de negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não pode fazer 2 checkins no mesmo dia;
- [X] O usuário não pode fazer checkin se não estiver perto (100 m) da academia;
- [X] O checkin só pode ser validade até 20 minutos após criado;
- [X] O checkin só pode ser validado por administradores;
- [X] A academia só pode ser cadastrada por administradores;


## RNFs (Requisitos não funcionais)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] Todas listas de dados precisam estar páginadas com 20 itens por página;
- [X] O usuário deve ser identificado por um JWT (json web token);