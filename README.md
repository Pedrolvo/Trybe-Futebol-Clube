<details>
<summary><strong> Sobre o projeto desenvolvido</strong></summary><br />

O TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

Foi fornecido pela Trybe um front-end, e eu desenvolvi uma API (utilizando o método TDD) e também integrei - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, construi um back-end dockerizado utilizando modelagem de dados através do Sequelize.


O  back-end foi implementado utilizando regras de negócio passadas pela Trybe para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.
</details>

<details>
<summary><strong> Como testar em sua máquina</strong></summary><br />

1- Realize o clone do projeto.<br />
2- Abra a pasta do clone e realize um npm install.<br />
3- Após a instalação de todas a dependências utilize o comando npm run compose:up. E o docker-compose ira inicializar as aplicações front e back em seus repectivos containers já com sua interação criada. O front poderá ser acessado no localhost:3000 e o back no localhost:3001, suas portas podem ser alteradas no arquivo docker-compose.yml.<br />
4- Para fechar os container realize o comando npm run compose:down.<br />
<br />
Obs: É necessário ter docker e doker-compose instalados em sua máquina.
</details>
