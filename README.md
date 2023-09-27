# Daily Diet
App para registrar, organizar e acompanhar as suas dietas

## RFs (Requisitos Funcionais)

- [X] Deve ser possível criar um usuário
- [X] Deve ser possível listar todos os usuários
- [X] Deve ser possível listar um usuário
- [X] Deve ser possível registrar uma refeição feita
- [X] Deve ser possível editar uma refeição
- [X] Deve ser possível apagar uma refeição
- [X] Deve ser possível listar todas as refeições de um usuário
- [X] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível recuperar as métricas de um usuário
- [X] Quantidade total de refeições registradas
- [X] Quantidade total de refeições dentro da dieta
- [X] Quantidade total de refeições fora da dieta
- [ ] Melhor sequência de refeições dentro da dieta

## RNs (Regras de Negócio)

- [ ] Deve ser possível identificar o usuário entre as requisições
- [X] Cada refeição deve ser relacionada a um usuário
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou
- [X] Deve ser retornado uma porcentagem no total das refeições registradas, sendo esta porcentagem a quantidade de refeições dentro da dieta
- [X] O range de caracteres na descrição tem que ser entre 10 e 360 caracteres caso tenha um

## RNFs (Requisitos não funcionais)

- Os dados serão salvos no SQLite
- [ ] A lista de refeições conterá 15 refeições por página por padrao
