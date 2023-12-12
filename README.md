## DDD -> Exemplo de conversao com usuário

- Muita dificuldade em saber as duvidas dos alunos
- Eu tenho que responder os alunos e me perco em quais duvidas já foram respondidas

## Fundamentos de Clean Architecture

- Principal ponto da arquitetura limpa é de desacoplamento

### GRAFICO -- camadas externas para camadas internas
[web/ui/db] -> [controllers/gateways/presenters] --> [use-cases] ---> [entities]
[frameworks/drives] -> [interfaces/adapters] --> [aplication-business-rules] ---> [enterprise-business-rules]



