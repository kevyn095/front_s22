O endpoint RESTful criado foi:
GET /eventos
Esse endpoint retorna todos os eventos disponíveis no sistema.
Ele é protegido por um middleware de autenticação que exige a presença de um token JWT válido no cabeçalho da requisição.
Exemplo de uso:
GET /eventos
Authorization: Bearer <token_jwt>
Exemplo de resposta:
{
  "data": [
    { "id": "1", "name": "Meetup NodeJS", "date": "2025-11-10" },
    { "id": "2", "name": "Workshop GraphQL", "date": "2025-12-02" },
    { "id": "3", "name": "Hackathon API Navigator", "date": "2026-01-15" }
  ],
  "user": { "id": 1, "name": "Usuário Autenticado" }
}

Consulta GraphQL
O endpoint GraphQL criado foi:
/graphql
Consulta usada para buscar apenas o nome e a data de um evento específico:
query {
  evento(id: "2") {
    name
    date
  }
}
Resposta esperada:
{
  "data": {
    "evento": {
      "name": "Workshop GraphQL",
      "date": "2025-12-02"
    }
  }
}
Por que o GraphQL é mais eficiente?
•	O RESTful sempre retorna todos os campos de todos os eventos, mesmo que o cliente precise de poucos dados.
•	O GraphQL permite selecionar somente os campos necessários, reduzindo o tráfego de rede e o processamento.
•	Assim, o GraphQL é mais flexível e eficiente, principalmente quando o cliente precisa de dados específicos.

2. Autenticação e Segurança (JWT)
O JWT (JSON Web Token) é o mecanismo usado para autenticação e proteção dos recursos da API.
Como funciona o processo:
1.	O usuário faz login através do endpoint:
2.	POST /login
3.	O servidor gera um token JWT com informações básicas do usuário, como:
4.	{ "userId": 1, "username": "teste_user" }
5.	O token é assinado com uma chave secreta e enviado de volta ao cliente.
6.	O cliente deve enviar esse token no cabeçalho das requisições seguintes:
7.	Authorization: Bearer <token>
8.	O middleware do servidor verifica se o token existe e é válido antes de liberar o acesso ao endpoint /eventos.
Esse processo garante que apenas usuários autenticados possam acessar informações sensíveis, simulando o mesmo comportamento usado em sistemas reais de autenticação.

3. Reflexão sobre Cooperação
Ao lidar com integrações complexas, como OAuth e JWT, a cooperação entre as equipes de back-end e front-end é essencial.
•	A cooperação garante que todos entendam como o token é gerado, validado e enviado, evitando erros de autenticação.
•	A assertividade na comunicação técnica é importante para definir padrões de segurança, como tempo de expiração e formato do token.
•	Trabalhar de forma colaborativa ajuda a manter a aplicação segura, funcional e bem integrada, reduzindo retrabalhos e falhas em produção.
Em resumo: a cooperação facilita a integração entre serviços, e a assertividade garante clareza nas decisões e segurança no desenvolvimento.

Conclusão:
O projeto API Navigator demonstra como unir RESTful, GraphQL e JWT para construir uma API moderna, segura e eficiente.
Além do aspecto técnico, reforça a importância da colaboração entre equipes para alcançar resultados consistentes e de qualidade.

