# desafio-ignite-02
Desafio para praticar requisições http em node

## RFs (Requisitos Funcionais)

- [X] Deve ser possível criar um usuário
- [x] Deve ser possível listar todos os usuários
- [ ] Deve ser possível listar um usuário
- [ ] Deve ser possível registrar uma refeição feita
- [ ] Deve ser possível editar uma refeição
- [ ] Deve ser possível apagar uma refeição
- [ ] Deve ser possível listar todas as refeições de um usuário
- [ ] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível recuperar as métricas de um usuário
  - [ ] Quantidade total de refeições registradas
  - [ ] Quantidade total de refeições dentro da dieta
  - [ ] Quantidade total de refeições fora da dieta
  - [ ] Melhor sequência de refeições dentro da dieta

## RNs (Regras de Negócio)

- [ ] Deve ser possível identificar o usuário entre as requisições
- [ ] Cada refeição deve ser relacionada a um usuário
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou
- [ ] A sequência deve ser incremental a cada nova refeição feita dentro da dieta
- [ ] Deve ser retornado uma porcentagem no total das refeições registradas, sendo esta porcentagem a quantidade de refeições dentro da dieta

## RNFs (Requisitos não funcionais)

- [ ] Os dados serão salvos no SQLite
- [ ] A lista de refeições conterá 15 refeições por página
