# TODO

- Publicar em master
- Criar uma função para criar o ActionsMap
- Extrair event handlers para arquivos separados para facilitar os testes
- Refatorar toda a parte de callbacks do socket no middleware
  - Cada handler deve estar isolada em uma função testável
  - Preciso criar um `registerEvents` passando o `dispatch` para
    dentro de cada handler
- Remover call e broadcast (refatorar para trigger)
- Criar uma forma de extender handlers para novas actions (extensions)
  - Permitir ao dev passar handlers como Options
- Atualizar o README
