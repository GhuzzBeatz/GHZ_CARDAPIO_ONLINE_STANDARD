# Arquitetura

## Principios

1. O app continua sendo o sistema principal.
2. O site hospeda apenas paginas publicas e API de troca de pedidos.
3. O link do cliente deve ser fixo.
4. Publicar novamente atualiza conteudo sem trocar o QR Code.
5. O banco online armazena somente o necessario para pedidos online.
6. A operacao local nao pode depender da nuvem para vender presencialmente.

## Componentes

### Aplicativo

Responsavel por:

- cadastrar produtos;
- cadastrar categorias;
- cadastrar adicionais/sabores/escolhas;
- cadastrar horarios;
- cadastrar WhatsApp/endereco;
- cadastrar mesas e garcons, quando houver;
- gerar HTML publico;
- publicar HTML no site;
- consultar pedidos pendentes;
- importar pedidos para venda/comanda local;
- marcar pedido online como importado, atendido ou recusado.

### API PHP

Responsavel por:

- receber HTML publicado;
- salvar arquivos em pasta publica;
- salvar imagens otimizadas;
- validar tokens;
- registrar pedidos;
- listar pedidos pendentes para o app;
- mudar status de pedidos;
- controlar numero sequencial de pedidos.

### MySQL/phpMyAdmin

Responsavel por:

- estabelecimentos/codigos;
- hashes de tokens;
- historico de publicacoes;
- garcons online, se houver pedido de mesa;
- pedidos pendentes/importados/cancelados.

### Pagina publica

Responsavel por:

- exibir cardapio;
- montar carrinho;
- validar campos obrigatorios;
- bloquear ou avisar fora do horario;
- enviar pedido para API;
- opcionalmente abrir WhatsApp com texto pronto.

## Padrao de pastas no site

```text
/public_html
  /api
    app-menu-cloud.php
  /{app}
    /cardapios
      /{codigo}
        index.html
        garcom.html
        /produtos
          produto-1.webp
```

## Fluxo macro

```text
Produto alterado no app
  -> app gera HTML atualizado
  -> app envia para API PHP
  -> API salva /{app}/cardapios/{codigo}/index.html
  -> cliente abre o mesmo QR antigo e ve o conteudo novo

Cliente envia pedido
  -> HTML chama API PHP action=pedidos action interna=criar_cardapio
  -> API grava pedido pendente no MySQL
  -> app consulta pendentes a cada 30s ou no botao Atualizar agora
  -> app importa para venda/comanda local
  -> app marca pedido como importado
```
