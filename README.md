# Desafio
Criar um sistema Web composto de um Front-end SPA (Single Page Application) Angular e um Back-end Java Spring Boot para envio de arquivos XML e posterior processamento deles.
## Requisitos
* Criar uma interface Web para upload de um ou mais arquivos com extensão .xml;
*	Para o desenvolvimento da interface, deve ser utilizado o tema Indigo do Angular Material;
*	Durante o envio do(s) arquivo(s) mostrar um loader para informar ao usuário que estão sendo processados, e ao final esse loader deve desaparecer (utilizar componentes do Angular Material);
*	Os arquivos contêm uma lista de agentes com código e data em formato ISO, e uma lista com quatro regiões (SE, S, NE, N) com sete valores numéricos de geração, compra e preço médio;
*	Todos os arquivos seguem o mesmo formato, como nos exemplos em anexo:
** exemplo_01.xml
** exemplo_02.xml
** exemplo_03.xml
*	Não é necessário validar os dados dos arquivos, considere que eles estarão sempre corretos e no formato especificado acima.
*	Os arquivos devem ser lidos e enviados um a um, sequencialmente.
*	Os arquivos podem conter quantidades grandes de dados, por exemplo, 1.000 agentes (agentes/agente[0..999])
*	Os dados de preço médio (/agentes/agente[]/submercado[]/precoMedio) são confidenciais, portanto devem ser removidos ou substituídos por valores em branco antes de serem enviados.
*	Ao receber cada arquivo, o back-end deve apenas imprimir na saída padrão (System.out) os códigos de agentes (/agentes/agente[]/codigo) recebidos.
## Atualizar 
* Salvar os itens no Banco de dados;
* Recuperar um dado consolidado por região.
## Instruções
Criar o sistema utilizando as seguintes tecnologias base:
### Front-end
* Angular 12+
* Angular Material 12+
* Typescript 4+
* RxJS 6+
* NodeJS 14+
### Back-end
* Spring Boot 2 
* Maven 3
* JPA
* Hibernate
### Banco de Dados
?
> Disponibilizá-lo em um repositório Git público (exemplo: GitHub, Bitbucket).

# Solução do Desafio para avaliações
## Serviço(s)
### Compilação
mvn clean install

### Testes
mvn test

### Execução
mvn spring-boot:run

## Configurações dos serviço(s)
Os limites dos tamanhos dos arquivos para upload foram definidos na configuração via propriedades (ver src/main/resources/application.properties).
