# APP

Gympass style app

## RFs (Requisitos funcionais)

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de checkins realizados pelo usuário logado;
- [] Deve ser possível o usuário obter seu histórico de checkins;
- [] Deve ser possível o usuário listar academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar checkin em uma academia;
- [] Deve ser possível validar o checkin de um usuário;
- [] Deve ser possível cadastrar uma academia;


## RNs (Regras de negócio)

- [] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer 2 checkins no mesmo dia;
- [] O usuário não pode fazer checkin se não estiver perto (100 m) da academia;
- [] O checkin só pode ser validade até 20 minutos após criado;
- [] O checkin só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;


## RNFs (Requisitos não funcionais)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar páginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (json web token);