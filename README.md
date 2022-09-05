# Projeto18-Valex <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f355.svg"  width="40" height="40">

#### Remember to run: "npm i" -> to install dependencies, after pulling/cloning

### CARDS ROUTER  💳 

- "Criação": <br />request type: POST<br />route = /cards <br />expected object: { "employeeId": number, "type": enum}<br />headers.authorization: api-key

- "Ativação de cartão": <br />request type: PUT<br />route = /cards <br />expected object: {"cvc": string,"password": string} 

- "Visualização de saldo e transações": <br />request type: GET<br />route = /cards/balance/:id <br />req.params: id

- "Bloqueio de cartão": <br />request type: PUT<br />route = /cards/block/:id <br />expected object: {"password": string} <br />req.params: id 

- "Desbloqueio de cartão": <br />request type: PUT<br />route = /cards/unlock/:id <br />expected object: {"password": string} <br />req.params: id


### RECHARGE ROUTER  💰 

- "Recarga": <br />request type: POST<br />route = /recharge/:id <br />expected object: {"amount": number} <br />req.params: id<br />headers.authorization: api-key

### SHOP ROUTER  🛒 

- "Compra em POS": <br />request type: POST<br />route = /shopping/:id <br />expected object: {"cardId": number,"password": string,"amount": number} <br />req.params: id -> bussiness(id)<br />


