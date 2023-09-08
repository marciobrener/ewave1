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

## Metodologia(s) do desenvolvimento das soluções do desafio 1 quanto ao(s) serviço (Server)
* Primeiro foi desenvolvido o teste da leitura dos arquivos XML (conforme as melhores práticas de TDD);
* Testes unitários a partir do Postman para verificações iniciais da funcionalidade;
* Teste desenvolvido, então, a implementação do leitor de XML conforme a simplicidade mínima necessária à avaliação e fazendo uso de biblioteca padrão Maven JSON2;
* Implementação do serviço Spring para receber o upload, tendo-se em mente a segurança para aceitar requisição exclusivamente localhost:* em qualquer porta por meio das configurações de CORs/Origin;
* Etapa de testes incrementando os arquivos XMLs para tamanhos grandes (mais de 50 megas);
* Ajustes das configurações dos serviços Spring (src/main/resources/application.properties) para funcionar parametrizadamente confirme os limites dos arquivos ao negócio;
* Testes finais para avaliação da conclusão do MVP necessário;
* Refatoração final do código;
* Commit na branch de release (usadando-se a metodologia GitFlow);
* Merge na branch master.
> Observações: não foi possível desenvolvimento da funcionalidade de upload com a versão SpringBoot 2.x, então, como trata-se de serviço REST stateless, foi desenvolvido na versão atual 3.7 (única exceção aos critérios de desenvolvimento da solução). Entretanto, caso fosse necessário, poderia ter sido criado um Servlet avulso Java, mas tal solução também descaracterizaria o uso próprio do framework Spring.

## Metodologia(s) do desenvolvimento das soluções do desafio 1 quanto ao cliente (Client)
* Inicialmente foram testados os requisitos mínimos e máximos da especificação
* Desenvolvido o teste da segurança para remoção dos atributos que identificam o preço médio. Para tal, simplesmente antes de enviar o conteúdo o texto entre <precoMedio>...</precoMedio> é retidado/suprimido do conteúdo enviado ao serviço de Upload mantido no projeto servidor;
* Desenvolvido mock básico a partir do próprio template Angular para testar os métodos necessários para o parse de extração do precoMedio do XML e desenvolvimento do próprio método dessa supressão
* Concluídos os testes, ao final, melhoria da aparência do design visando uma interface mínima amigável;
* Por fim, refatoração do código e testes finais.
