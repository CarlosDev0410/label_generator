import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'wakecommerce/1.0 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Lista com assinaturas
   *
   * @summary Retorna uma lista com os dados das assinaturas
   * @throws FetchError<422, types.RetornaUmaListaComOsDadosDasAssinaturasResponse422> 422
   * @throws FetchError<500, types.RetornaUmaListaComOsDadosDasAssinaturasResponse500> 500
   */
  retornaUmaListaComOsDadosDasAssinaturas(metadata?: types.RetornaUmaListaComOsDadosDasAssinaturasMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaComOsDadosDasAssinaturasResponse200>> {
    return this.core.fetch('/assinaturas', 'get', metadata);
  }

  /**
   * Detalhes de uma assinatura
   *
   * @summary Retorna os dados de uma assinatura específica
   * @throws FetchError<422, types.RetornaOsDadosDeUmaAssinaturaEspecificaResponse422> 422
   * @throws FetchError<500, types.RetornaOsDadosDeUmaAssinaturaEspecificaResponse500> 500
   */
  retornaOsDadosDeUmaAssinaturaEspecifica(metadata: types.RetornaOsDadosDeUmaAssinaturaEspecificaMetadataParam): Promise<FetchResponse<200, types.RetornaOsDadosDeUmaAssinaturaEspecificaResponse200>> {
    return this.core.fetch('/assinaturas/{assinaturaId}', 'get', metadata);
  }

  /**
   * Atualiza a situação de uma assinatura específica
   *
   * @throws FetchError<500, types.AtualizaASituacaoDeUmaAssinaturaEspecificaResponse500> 500
   */
  atualizaASituacaoDeUmaAssinaturaEspecifica(body: types.AtualizaASituacaoDeUmaAssinaturaEspecificaBodyParam, metadata: types.AtualizaASituacaoDeUmaAssinaturaEspecificaMetadataParam): Promise<FetchResponse<200, types.AtualizaASituacaoDeUmaAssinaturaEspecificaResponse200>>;
  atualizaASituacaoDeUmaAssinaturaEspecifica(metadata: types.AtualizaASituacaoDeUmaAssinaturaEspecificaMetadataParam): Promise<FetchResponse<200, types.AtualizaASituacaoDeUmaAssinaturaEspecificaResponse200>>;
  atualizaASituacaoDeUmaAssinaturaEspecifica(body?: types.AtualizaASituacaoDeUmaAssinaturaEspecificaBodyParam | types.AtualizaASituacaoDeUmaAssinaturaEspecificaMetadataParam, metadata?: types.AtualizaASituacaoDeUmaAssinaturaEspecificaMetadataParam): Promise<FetchResponse<200, types.AtualizaASituacaoDeUmaAssinaturaEspecificaResponse200>> {
    return this.core.fetch('/assinaturas/{assinaturaId}', 'put', body, metadata);
  }

  /**
   * Atualiza um produto em uma assinatura
   *
   * @throws FetchError<422, types.AtualizaUmProdutoEmUmaAssinaturaResponse422> 422
   * @throws FetchError<500, types.AtualizaUmProdutoEmUmaAssinaturaResponse500> 500
   */
  atualizaUmProdutoEmUmaAssinatura(body: types.AtualizaUmProdutoEmUmaAssinaturaBodyParam, metadata: types.AtualizaUmProdutoEmUmaAssinaturaMetadataParam): Promise<FetchResponse<201, types.AtualizaUmProdutoEmUmaAssinaturaResponse201>>;
  atualizaUmProdutoEmUmaAssinatura(metadata: types.AtualizaUmProdutoEmUmaAssinaturaMetadataParam): Promise<FetchResponse<201, types.AtualizaUmProdutoEmUmaAssinaturaResponse201>>;
  atualizaUmProdutoEmUmaAssinatura(body?: types.AtualizaUmProdutoEmUmaAssinaturaBodyParam | types.AtualizaUmProdutoEmUmaAssinaturaMetadataParam, metadata?: types.AtualizaUmProdutoEmUmaAssinaturaMetadataParam): Promise<FetchResponse<201, types.AtualizaUmProdutoEmUmaAssinaturaResponse201>> {
    return this.core.fetch('/assinaturas/produtos/{assinaturaProdutoId}/Alterar', 'put', body, metadata);
  }

  /**
   * Produtos de uma assinatura
   *
   * @summary Retorna as assinaturas de um determinado usuário
   * @throws FetchError<422, types.RetornaAsAssinaturasDeUmDeterminadoUsuarioResponse422> 422
   * @throws FetchError<500, types.RetornaAsAssinaturasDeUmDeterminadoUsuarioResponse500> 500
   */
  retornaAsAssinaturasDeUmDeterminadoUsuario(metadata: types.RetornaAsAssinaturasDeUmDeterminadoUsuarioMetadataParam): Promise<FetchResponse<200, types.RetornaAsAssinaturasDeUmDeterminadoUsuarioResponse200>> {
    return this.core.fetch('/assinaturas/{email}', 'get', metadata);
  }

  /**
   * Produtos de uma assinatura
   *
   * @summary Retorna os produtos de uma assinatura específica
   * @throws FetchError<422, types.RetornaOsProdutosDeUmaAssinaturaEspecificaResponse422> 422
   * @throws FetchError<500, types.RetornaOsProdutosDeUmaAssinaturaEspecificaResponse500> 500
   */
  retornaOsProdutosDeUmaAssinaturaEspecifica(metadata: types.RetornaOsProdutosDeUmaAssinaturaEspecificaMetadataParam): Promise<FetchResponse<200, types.RetornaOsProdutosDeUmaAssinaturaEspecificaResponse200>> {
    return this.core.fetch('/assinaturas/{assinaturaId}/produtos', 'get', metadata);
  }

  /**
   * Insere um novo produto na assinatura
   *
   * @throws FetchError<422, types.InsereUmNovoProdutoNaAssinaturaResponse422> 422
   * @throws FetchError<500, types.InsereUmNovoProdutoNaAssinaturaResponse500> 500
   */
  insereUmNovoProdutoNaAssinatura(body: types.InsereUmNovoProdutoNaAssinaturaBodyParam, metadata: types.InsereUmNovoProdutoNaAssinaturaMetadataParam): Promise<FetchResponse<201, types.InsereUmNovoProdutoNaAssinaturaResponse201>>;
  insereUmNovoProdutoNaAssinatura(metadata: types.InsereUmNovoProdutoNaAssinaturaMetadataParam): Promise<FetchResponse<201, types.InsereUmNovoProdutoNaAssinaturaResponse201>>;
  insereUmNovoProdutoNaAssinatura(body?: types.InsereUmNovoProdutoNaAssinaturaBodyParam | types.InsereUmNovoProdutoNaAssinaturaMetadataParam, metadata?: types.InsereUmNovoProdutoNaAssinaturaMetadataParam): Promise<FetchResponse<201, types.InsereUmNovoProdutoNaAssinaturaResponse201>> {
    return this.core.fetch('/assinaturas/{assinaturaId}/produtos', 'post', body, metadata);
  }

  /**
   * Recorrências cadastradas na loja
   *
   * @summary Retorna as recorrências cadastradas na loja
   * @throws FetchError<422, types.RetornaAsRecorrenciasCadastradasNaLojaResponse422> 422
   * @throws FetchError<500, types.RetornaAsRecorrenciasCadastradasNaLojaResponse500> 500
   */
  retornaAsRecorrenciasCadastradasNaLoja(): Promise<FetchResponse<200, types.RetornaAsRecorrenciasCadastradasNaLojaResponse200>> {
    return this.core.fetch('/assinaturas/recorrencias', 'get');
  }

  /**
   * Gera um novo pedido para a assinatura
   *
   * @throws FetchError<422, types.GeraUmNovoPedidoParaAAssinaturaResponse422> 422
   * @throws FetchError<500, types.GeraUmNovoPedidoParaAAssinaturaResponse500> 500
   */
  geraUmNovoPedidoParaAAssinatura(metadata: types.GeraUmNovoPedidoParaAAssinaturaMetadataParam): Promise<FetchResponse<200, types.GeraUmNovoPedidoParaAAssinaturaResponse200>> {
    return this.core.fetch('/assinaturas/{assinaturaId}/pedido', 'post', metadata);
  }

  /**
   * Assinaturas com erro na loja
   *
   * @summary Retorna as assinaturas com erros
   * @throws FetchError<422, types.RetornaAsAssinaturasComErrosResponse422> 422
   * @throws FetchError<500, types.RetornaAsAssinaturasComErrosResponse500> 500
   */
  retornaAsAssinaturasComErros(metadata?: types.RetornaAsAssinaturasComErrosMetadataParam): Promise<FetchResponse<200, types.RetornaAsAssinaturasComErrosResponse200>> {
    return this.core.fetch('/assinaturas/erros', 'get', metadata);
  }

  /**
   * Assinatura com erro na loja
   *
   * @summary Retorna os erros de uma assinatura especifica
   * @throws FetchError<422, types.RetornaOsErrosDeUmaAssinaturaEspecificaResponse422> 422
   * @throws FetchError<500, types.RetornaOsErrosDeUmaAssinaturaEspecificaResponse500> 500
   */
  retornaOsErrosDeUmaAssinaturaEspecifica(metadata: types.RetornaOsErrosDeUmaAssinaturaEspecificaMetadataParam): Promise<FetchResponse<200, types.RetornaOsErrosDeUmaAssinaturaEspecificaResponse200>> {
    return this.core.fetch('/assinaturas/erros/{assinaturaId}', 'get', metadata);
  }

  /**
   * Assinatura de um determinado pedido
   *
   * @summary Retorna os dados de uma assinatura a partir do id do Pedido
   * @throws FetchError<422, types.RetornaOsDadosDeUmaAssinaturaAPartirDoIdDoPedidoResponse422> 422
   * @throws FetchError<500, types.RetornaOsDadosDeUmaAssinaturaAPartirDoIdDoPedidoResponse500> 500
   */
  retornaOsDadosDeUmaAssinaturaAPartirDoIdDoPedido(metadata: types.RetornaOsDadosDeUmaAssinaturaAPartirDoIdDoPedidoMetadataParam): Promise<FetchResponse<200, types.RetornaOsDadosDeUmaAssinaturaAPartirDoIdDoPedidoResponse200>> {
    return this.core.fetch('/assinaturas/pedido/{pedidoId}', 'get', metadata);
  }

  /**
   * Altera a data de recorrência de uma assinatura
   *
   * @throws FetchError<422, types.AlteraADataDeRecorrenciaDeUmaAssinaturaResponse422> 422
   * @throws FetchError<500, types.AlteraADataDeRecorrenciaDeUmaAssinaturaResponse500> 500
   */
  alteraADataDeRecorrenciaDeUmaAssinatura(body: types.AlteraADataDeRecorrenciaDeUmaAssinaturaBodyParam, metadata: types.AlteraADataDeRecorrenciaDeUmaAssinaturaMetadataParam): Promise<FetchResponse<200, types.AlteraADataDeRecorrenciaDeUmaAssinaturaResponse200>>;
  alteraADataDeRecorrenciaDeUmaAssinatura(metadata: types.AlteraADataDeRecorrenciaDeUmaAssinaturaMetadataParam): Promise<FetchResponse<200, types.AlteraADataDeRecorrenciaDeUmaAssinaturaResponse200>>;
  alteraADataDeRecorrenciaDeUmaAssinatura(body?: types.AlteraADataDeRecorrenciaDeUmaAssinaturaBodyParam | types.AlteraADataDeRecorrenciaDeUmaAssinaturaMetadataParam, metadata?: types.AlteraADataDeRecorrenciaDeUmaAssinaturaMetadataParam): Promise<FetchResponse<200, types.AlteraADataDeRecorrenciaDeUmaAssinaturaResponse200>> {
    return this.core.fetch('/assinaturas/{assinaturaId}/proximaRecorrencia', 'put', body, metadata);
  }

  /**
   * Grupo de assinatura
   *
   * @summary Retorna os dados de um grupo de assinatura de uma loja
   * @throws FetchError<422, types.RetornandoOsDadosDeUmGrupoDeAssinaturaDeUmaLojaResponse422> 422
   * @throws FetchError<500, types.RetornandoOsDadosDeUmGrupoDeAssinaturaDeUmaLojaResponse500> 500
   */
  retornandoOsDadosDeUmGrupoDeAssinaturaDeUmaLoja(): Promise<FetchResponse<200, types.RetornandoOsDadosDeUmGrupoDeAssinaturaDeUmaLojaResponse200>> {
    return this.core.fetch('/assinaturas/grupoassinatura', 'get');
  }

  /**
   * Pedidos que terão vínculo com o grupo de assinatura informado.
   *
   * @summary Cria assinatura com base em uma lista de pedidos
   * @throws FetchError<422, types.CriaAssinaturaComBaseEmUmaListaDePedidosResponse422> 422
   * @throws FetchError<500, types.CriaAssinaturaComBaseEmUmaListaDePedidosResponse500> 500
   */
  criaAssinaturaComBaseEmUmaListaDePedidos(body?: types.CriaAssinaturaComBaseEmUmaListaDePedidosBodyParam): Promise<FetchResponse<200, types.CriaAssinaturaComBaseEmUmaListaDePedidosResponse200>> {
    return this.core.fetch('/assinaturas/grupoassinatura/assinatura', 'post', body);
  }

  /**
   * Atualiza a recorrência de uma assinatura específica
   *
   * @throws FetchError<400, types.AtualizaARecorrNciaDeUmaAssinaturaEspecFicaResponse400> 400
   * @throws FetchError<500, types.AtualizaARecorrNciaDeUmaAssinaturaEspecFicaResponse500> 500
   */
  atualizaARecorrNciaDeUmaAssinaturaEspecFica(body: types.AtualizaARecorrNciaDeUmaAssinaturaEspecFicaBodyParam, metadata: types.AtualizaARecorrNciaDeUmaAssinaturaEspecFicaMetadataParam): Promise<FetchResponse<200, types.AtualizaARecorrNciaDeUmaAssinaturaEspecFicaResponse200>> {
    return this.core.fetch('/assinaturas/{assinaturaId}/recorrencia', 'put', body, metadata);
  }

  /**
   * Lista de atributos
   *
   * @summary Retorna todos os atributos
   * @throws FetchError<422, types.RetornaTodosOsAtributosResponse422> 422
   * @throws FetchError<500, types.RetornaTodosOsAtributosResponse500> 500
   */
  retornaTodosOsAtributos(): Promise<FetchResponse<200, types.RetornaTodosOsAtributosResponse200>> {
    return this.core.fetch('/atributos', 'get');
  }

  /**
   * Insere um novo atributo
   *
   * @throws FetchError<422, types.InsereUmNovoAtributoResponse422> 422
   * @throws FetchError<501, types.InsereUmNovoAtributoResponse501> 501
   */
  insereUmNovoAtributo(body?: types.InsereUmNovoAtributoBodyParam): Promise<FetchResponse<201, types.InsereUmNovoAtributoResponse201>> {
    return this.core.fetch('/atributos', 'post', body);
  }

  /**
   * Deleta um atributo
   *
   * @throws FetchError<422, types.DeletaUmAtributoResponse422> 422
   * @throws FetchError<500, types.DeletaUmAtributoResponse500> 500
   */
  deletaUmAtributo(metadata: types.DeletaUmAtributoMetadataParam): Promise<FetchResponse<200, types.DeletaUmAtributoResponse200>> {
    return this.core.fetch('/atributos/{nome}', 'delete', metadata);
  }

  /**
   * Atributo encontrado
   *
   * @summary Retorna um atributo específico
   * @throws FetchError<422, types.RetornaUmAtributoEspecificoResponse422> 422
   * @throws FetchError<500, types.RetornaUmAtributoEspecificoResponse500> 500
   */
  retornaUmAtributoEspecifico(metadata: types.RetornaUmAtributoEspecificoMetadataParam): Promise<FetchResponse<200, types.RetornaUmAtributoEspecificoResponse200>> {
    return this.core.fetch('/atributos/{nome}', 'get', metadata);
  }

  /**
   * Atualiza um atributo
   *
   * @throws FetchError<422, types.AtualizaUmAtributoResponse422> 422
   * @throws FetchError<500, types.AtualizaUmAtributoResponse500> 500
   */
  atualizaUmAtributo(body: types.AtualizaUmAtributoBodyParam, metadata: types.AtualizaUmAtributoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmAtributoResponse200>>;
  atualizaUmAtributo(metadata: types.AtualizaUmAtributoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmAtributoResponse200>>;
  atualizaUmAtributo(body?: types.AtualizaUmAtributoBodyParam | types.AtualizaUmAtributoMetadataParam, metadata?: types.AtualizaUmAtributoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmAtributoResponse200>> {
    return this.core.fetch('/atributos/{nome}', 'put', body, metadata);
  }

  /**
   * Autenticação realizada com sucesso
   *
   * @summary Realiza a autenticação de usuário no IDM (Identity Manager)
   * @throws FetchError<401, types.RealizaAAutenticacaoDeUsuarioNoIdmIdentityManagerResponse401> 401
   * @throws FetchError<500, types.RealizaAAutenticacaoDeUsuarioNoIdmIdentityManagerResponse500> 500
   */
  realizaAAutenticacaoDeUsuarioNoIdmIdentityManager(body?: types.RealizaAAutenticacaoDeUsuarioNoIdmIdentityManagerBodyParam): Promise<FetchResponse<200, types.RealizaAAutenticacaoDeUsuarioNoIdmIdentityManagerResponse200>> {
    return this.core.fetch('/autenticacao/login', 'post', body);
  }

  /**
   * Access token atualizado com sucesso
   *
   * @summary Gera um novo access token baseado em um access token expirado por data
   * @throws FetchError<500, types.GeraUmNovoAccessTokenBaseadoEmUmAccessTokenExpiradoPorDataResponse500> 500
   */
  geraUmNovoAccessTokenBaseadoEmUmAccessTokenExpiradoPorData(): Promise<FetchResponse<200, types.GeraUmNovoAccessTokenBaseadoEmUmAccessTokenExpiradoPorDataResponse200>> {
    return this.core.fetch('/autenticacao/refresh', 'post');
  }

  /**
   * Novo token gerado com sucesso
   *
   * @summary Troca o usuário de loja e gera um novo access_token para acesso a nova loja
   * @throws FetchError<500, types.TrocaOUsuarioDeLojaEGeraUmNovoAccessTokenParaAcessoANovaLojaResponse500> 500
   */
  trocaOUsuarioDeLojaEGeraUmNovoAccess_tokenParaAcessoANovaLoja(metadata: types.TrocaOUsuarioDeLojaEGeraUmNovoAccessTokenParaAcessoANovaLojaMetadataParam): Promise<FetchResponse<200, types.TrocaOUsuarioDeLojaEGeraUmNovoAccessTokenParaAcessoANovaLojaResponse200>> {
    return this.core.fetch('/autenticacao/trocarLoja/{novaLoja}', 'post', metadata);
  }

  /**
   * Buscar todos os autores
   *
   * @throws FetchError<422, types.BuscarTodosOsAutoresResponse422> 422
   * @throws FetchError<500, types.BuscarTodosOsAutoresResponse500> 500
   */
  buscarTodosOsAutores(): Promise<FetchResponse<200, types.BuscarTodosOsAutoresResponse200>> {
    return this.core.fetch('/autores', 'get');
  }

  /**
   * Inserir autor
   *
   * @throws FetchError<422, types.InserirAutorResponse422> 422
   * @throws FetchError<500, types.InserirAutorResponse500> 500
   */
  inserirAutor(body?: types.InserirAutorBodyParam): Promise<FetchResponse<200, types.InserirAutorResponse200>> {
    return this.core.fetch('/autores', 'post', body);
  }

  /**
   * Deletar autor
   *
   * @throws FetchError<422, types.DeletarAutorResponse422> 422
   * @throws FetchError<500, types.DeletarAutorResponse500> 500
   */
  deletarAutor(metadata: types.DeletarAutorMetadataParam): Promise<FetchResponse<200, types.DeletarAutorResponse200>> {
    return this.core.fetch('/autores/{autorId}', 'delete', metadata);
  }

  /**
   * Buscar autor por id
   *
   * @throws FetchError<422, types.BuscarAutorPorIdResponse422> 422
   * @throws FetchError<500, types.BuscarAutorPorIdResponse500> 500
   */
  buscarAutorPorId(metadata: types.BuscarAutorPorIdMetadataParam): Promise<FetchResponse<200, types.BuscarAutorPorIdResponse200>> {
    return this.core.fetch('/autores/{autorId}', 'get', metadata);
  }

  /**
   * Atualizar autor
   *
   * @throws FetchError<422, types.AtualizarAutorResponse422> 422
   * @throws FetchError<500, types.AtualizarAutorResponse500> 500
   */
  atualizarAutor(body: types.AtualizarAutorBodyParam, metadata: types.AtualizarAutorMetadataParam): Promise<FetchResponse<200, types.AtualizarAutorResponse200>>;
  atualizarAutor(metadata: types.AtualizarAutorMetadataParam): Promise<FetchResponse<200, types.AtualizarAutorResponse200>>;
  atualizarAutor(body?: types.AtualizarAutorBodyParam | types.AtualizarAutorMetadataParam, metadata?: types.AtualizarAutorMetadataParam): Promise<FetchResponse<200, types.AtualizarAutorResponse200>> {
    return this.core.fetch('/autores/{autorId}', 'put', body, metadata);
  }

  /**
   * Buscar autor pelo nome
   *
   * @throws FetchError<422, types.BuscarAutorPeloNomeResponse422> 422
   * @throws FetchError<500, types.BuscarAutorPeloNomeResponse500> 500
   */
  buscarAutorPeloNome(metadata: types.BuscarAutorPeloNomeMetadataParam): Promise<FetchResponse<200, types.BuscarAutorPeloNomeResponse200>> {
    return this.core.fetch('/autores/{nomeAutor}', 'get', metadata);
  }

  /**
   * Deleta um banner existente
   *
   * @throws FetchError<422, types.DeletaUmBannerExistenteResponse422> 422
   * @throws FetchError<500, types.DeletaUmBannerExistenteResponse500> 500
   */
  deletaUmBannerExistente(metadata: types.DeletaUmBannerExistenteMetadataParam): Promise<FetchResponse<200, types.DeletaUmBannerExistenteResponse200>> {
    return this.core.fetch('/banners/{bannerId}', 'delete', metadata);
  }

  /**
   * Objeto do banner
   *
   * @summary Buscar banner por Id
   * @throws FetchError<422, types.BuscarBannerPorIdResponse422> 422
   * @throws FetchError<500, types.BuscarBannerPorIdResponse500> 500
   */
  buscarBannerPorId(metadata: types.BuscarBannerPorIdMetadataParam): Promise<FetchResponse<200, types.BuscarBannerPorIdResponse200>> {
    return this.core.fetch('/banners/{bannerId}', 'get', metadata);
  }

  /**
   * Atualiza um banner existente
   *
   * @throws FetchError<422, types.AtualizaUmBannerExistenteResponse422> 422
   * @throws FetchError<500, types.AtualizaUmBannerExistenteResponse500> 500
   */
  atualizaUmBannerExistente(body: types.AtualizaUmBannerExistenteBodyParam, metadata: types.AtualizaUmBannerExistenteMetadataParam): Promise<FetchResponse<200, types.AtualizaUmBannerExistenteResponse200>>;
  atualizaUmBannerExistente(metadata: types.AtualizaUmBannerExistenteMetadataParam): Promise<FetchResponse<200, types.AtualizaUmBannerExistenteResponse200>>;
  atualizaUmBannerExistente(body?: types.AtualizaUmBannerExistenteBodyParam | types.AtualizaUmBannerExistenteMetadataParam, metadata?: types.AtualizaUmBannerExistenteMetadataParam): Promise<FetchResponse<200, types.AtualizaUmBannerExistenteResponse200>> {
    return this.core.fetch('/banners/{bannerId}', 'put', body, metadata);
  }

  /**
   * Lista de banners
   *
   * @summary Busca todos banners
   * @throws FetchError<422, types.BuscaTodosBannersResponse422> 422
   * @throws FetchError<500, types.BuscaTodosBannersResponse500> 500
   */
  buscaTodosBanners(metadata?: types.BuscaTodosBannersMetadataParam): Promise<FetchResponse<200, types.BuscaTodosBannersResponse200>> {
    return this.core.fetch('/banners', 'get', metadata);
  }

  /**
   * Insere um novo banner
   *
   * @throws FetchError<422, types.InsereUmNovoBannerResponse422> 422
   * @throws FetchError<500, types.InsereUmNovoBannerResponse500> 500
   */
  insereUmNovoBanner(body: types.InsereUmNovoBannerBodyParam): Promise<FetchResponse<200, types.InsereUmNovoBannerResponse200>> {
    return this.core.fetch('/banners', 'post', body);
  }

  /**
   * Atualiza o status do banner pelo id
   *
   * @throws FetchError<422, types.AtualizaOStatusDoBannerPeloIdResponse422> 422
   * @throws FetchError<500, types.AtualizaOStatusDoBannerPeloIdResponse500> 500
   */
  atualizaOStatusDoBannerPeloId(body: types.AtualizaOStatusDoBannerPeloIdBodyParam, metadata: types.AtualizaOStatusDoBannerPeloIdMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDoBannerPeloIdResponse200>>;
  atualizaOStatusDoBannerPeloId(metadata: types.AtualizaOStatusDoBannerPeloIdMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDoBannerPeloIdResponse200>>;
  atualizaOStatusDoBannerPeloId(body?: types.AtualizaOStatusDoBannerPeloIdBodyParam | types.AtualizaOStatusDoBannerPeloIdMetadataParam, metadata?: types.AtualizaOStatusDoBannerPeloIdMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDoBannerPeloIdResponse200>> {
    return this.core.fetch('/banners/{bannerId}/status', 'put', body, metadata);
  }

  /**
   * Deleta o vinculo de um ou mais hotsites com um banner específico
   *
   * @throws FetchError<422, types.DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoResponse422> 422
   * @throws FetchError<500, types.DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoResponse500> 500
   */
  deletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecifico(body: types.DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoBodyParam, metadata: types.DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoMetadataParam): Promise<FetchResponse<200, types.DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoResponse200>>;
  deletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecifico(metadata: types.DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoMetadataParam): Promise<FetchResponse<200, types.DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoResponse200>>;
  deletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecifico(body?: types.DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoBodyParam | types.DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoMetadataParam, metadata?: types.DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoMetadataParam): Promise<FetchResponse<200, types.DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoResponse200>> {
    return this.core.fetch('/banners/{bannerId}/hotsites', 'delete', body, metadata);
  }

  /**
   * Lista de hotsites vinculados ao banner
   *
   * @summary Busca os hotsites vinculados de um banner específico
   * @throws FetchError<422, types.BuscaOsHotsitesVinculadosDeUmBannerEspecificoResponse422> 422
   * @throws FetchError<500, types.BuscaOsHotsitesVinculadosDeUmBannerEspecificoResponse500> 500
   */
  buscaOsHotsitesVinculadosDeUmBannerEspecifico(metadata: types.BuscaOsHotsitesVinculadosDeUmBannerEspecificoMetadataParam): Promise<FetchResponse<200, types.BuscaOsHotsitesVinculadosDeUmBannerEspecificoResponse200>> {
    return this.core.fetch('/banners/{bannerId}/hotsites', 'get', metadata);
  }

  /**
   * Vincula hotsites com um banner específico
   *
   * @throws FetchError<422, types.VinculaHotsitesComUmBannerEspecificoResponse422> 422
   * @throws FetchError<500, types.VinculaHotsitesComUmBannerEspecificoResponse500> 500
   */
  vinculaHotsitesComUmBannerEspecifico(body: types.VinculaHotsitesComUmBannerEspecificoBodyParam, metadata: types.VinculaHotsitesComUmBannerEspecificoMetadataParam): Promise<FetchResponse<200, types.VinculaHotsitesComUmBannerEspecificoResponse200>>;
  vinculaHotsitesComUmBannerEspecifico(metadata: types.VinculaHotsitesComUmBannerEspecificoMetadataParam): Promise<FetchResponse<200, types.VinculaHotsitesComUmBannerEspecificoResponse200>>;
  vinculaHotsitesComUmBannerEspecifico(body?: types.VinculaHotsitesComUmBannerEspecificoBodyParam | types.VinculaHotsitesComUmBannerEspecificoMetadataParam, metadata?: types.VinculaHotsitesComUmBannerEspecificoMetadataParam): Promise<FetchResponse<200, types.VinculaHotsitesComUmBannerEspecificoResponse200>> {
    return this.core.fetch('/banners/{bannerId}/hotsites', 'post', body, metadata);
  }

  /**
   * Atualiza a exibição do banner nos hotsites, se deve ser em todos ou não
   *
   * @throws FetchError<422, types.AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoResponse422> 422
   * @throws FetchError<500, types.AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoResponse500> 500
   */
  atualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNao(body: types.AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoBodyParam, metadata: types.AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoMetadataParam): Promise<FetchResponse<200, types.AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoResponse200>>;
  atualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNao(metadata: types.AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoMetadataParam): Promise<FetchResponse<200, types.AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoResponse200>>;
  atualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNao(body?: types.AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoBodyParam | types.AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoMetadataParam, metadata?: types.AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoMetadataParam): Promise<FetchResponse<200, types.AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoResponse200>> {
    return this.core.fetch('/banners/{bannerId}/hotsites', 'put', body, metadata);
  }

  /**
   * Deleta o vinculo de um ou mais parceiros com um banner específico
   *
   * @throws FetchError<422, types.DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoResponse422> 422
   * @throws FetchError<500, types.DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoResponse500> 500
   */
  deletaOVinculoDeUmOuMaisParceirosComUmBannerEspecifico(body: types.DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoBodyParam, metadata: types.DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoMetadataParam): Promise<FetchResponse<200, types.DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoResponse200>>;
  deletaOVinculoDeUmOuMaisParceirosComUmBannerEspecifico(metadata: types.DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoMetadataParam): Promise<FetchResponse<200, types.DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoResponse200>>;
  deletaOVinculoDeUmOuMaisParceirosComUmBannerEspecifico(body?: types.DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoBodyParam | types.DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoMetadataParam, metadata?: types.DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoMetadataParam): Promise<FetchResponse<200, types.DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoResponse200>> {
    return this.core.fetch('/banners/{bannerId}/parceiros', 'delete', body, metadata);
  }

  /**
   * Lista de parceiros vinculados ao banner
   *
   * @summary Busca os parceiros vinculados de um banner específico
   * @throws FetchError<422, types.BuscaOsParceirosVinculadosDeUmBannerEspecificoResponse422> 422
   * @throws FetchError<500, types.BuscaOsParceirosVinculadosDeUmBannerEspecificoResponse500> 500
   */
  buscaOsParceirosVinculadosDeUmBannerEspecifico(metadata: types.BuscaOsParceirosVinculadosDeUmBannerEspecificoMetadataParam): Promise<FetchResponse<200, types.BuscaOsParceirosVinculadosDeUmBannerEspecificoResponse200>> {
    return this.core.fetch('/banners/{bannerId}/parceiros', 'get', metadata);
  }

  /**
   * Vincula parceiros com um banner específico
   *
   * @throws FetchError<422, types.VinculaParceirosComUmBannerEspecificoResponse422> 422
   * @throws FetchError<500, types.VinculaParceirosComUmBannerEspecificoResponse500> 500
   */
  vinculaParceirosComUmBannerEspecifico(body: types.VinculaParceirosComUmBannerEspecificoBodyParam, metadata: types.VinculaParceirosComUmBannerEspecificoMetadataParam): Promise<FetchResponse<200, types.VinculaParceirosComUmBannerEspecificoResponse200>> {
    return this.core.fetch('/banners/{bannerId}/parceiros', 'post', body, metadata);
  }

  /**
   * Lista de posicionamentos do banner
   *
   * @summary Busca os possíveis posicionamentos para o banner
   * @throws FetchError<422, types.BuscaOsPossiveisPosicionamentosParaOBannerResponse422> 422
   * @throws FetchError<500, types.BuscaOsPossiveisPosicionamentosParaOBannerResponse500> 500
   */
  buscaOsPossiveisPosicionamentosParaOBanner(): Promise<FetchResponse<200, types.BuscaOsPossiveisPosicionamentosParaOBannerResponse200>> {
    return this.core.fetch('/banners/posicionamentos', 'get');
  }

  /**
   * Atualiza a exibição do banner em parceiros, se deve ser em todos ou não
   *
   * @throws FetchError<422, types.AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoResponse422> 422
   * @throws FetchError<500, types.AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoResponse500> 500
   */
  atualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNao(body: types.AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoBodyParam, metadata: types.AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoMetadataParam): Promise<FetchResponse<200, types.AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoResponse200>>;
  atualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNao(metadata: types.AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoMetadataParam): Promise<FetchResponse<200, types.AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoResponse200>>;
  atualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNao(body?: types.AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoBodyParam | types.AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoMetadataParam, metadata?: types.AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoMetadataParam): Promise<FetchResponse<200, types.AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoResponse200>> {
    return this.core.fetch('/banners/{bannerId}/Parceiros', 'put', body, metadata);
  }

  /**
   * Atualiza a imagem do banner
   *
   * @throws FetchError<422, types.AtualizaAImagemDoBannerResponse422> 422
   * @throws FetchError<500, types.AtualizaAImagemDoBannerResponse500> 500
   */
  atualizaAImagemDoBanner(body: types.AtualizaAImagemDoBannerBodyParam, metadata: types.AtualizaAImagemDoBannerMetadataParam): Promise<FetchResponse<200, types.AtualizaAImagemDoBannerResponse200>>;
  atualizaAImagemDoBanner(metadata: types.AtualizaAImagemDoBannerMetadataParam): Promise<FetchResponse<200, types.AtualizaAImagemDoBannerResponse200>>;
  atualizaAImagemDoBanner(body?: types.AtualizaAImagemDoBannerBodyParam | types.AtualizaAImagemDoBannerMetadataParam, metadata?: types.AtualizaAImagemDoBannerMetadataParam): Promise<FetchResponse<200, types.AtualizaAImagemDoBannerResponse200>> {
    return this.core.fetch('/banners/{bannerId}/Imagem', 'put', body, metadata);
  }

  /**
   * Lista de categorias
   *
   * @summary Retorna todas as categorias
   * @throws FetchError<422, types.RetornaTodasAsCategoriasResponse422> 422
   * @throws FetchError<500, types.RetornaTodasAsCategoriasResponse500> 500
   */
  retornaTodasAsCategorias(metadata?: types.RetornaTodasAsCategoriasMetadataParam): Promise<FetchResponse<200, types.RetornaTodasAsCategoriasResponse200>> {
    return this.core.fetch('/categorias', 'get', metadata);
  }

  /**
   * Insere uma nova categoria
   *
   * @throws FetchError<422, types.InsereUmaNovaCategoriaResponse422> 422
   * @throws FetchError<500, types.InsereUmaNovaCategoriaResponse500> 500
   */
  insereUmaNovaCategoria(body?: types.InsereUmaNovaCategoriaBodyParam): Promise<FetchResponse<201, types.InsereUmaNovaCategoriaResponse201>> {
    return this.core.fetch('/categorias', 'post', body);
  }

  /**
   * Exclui uma categoria
   *
   * @throws FetchError<422, types.ExcluiUmaCategoriaResponse422> 422
   * @throws FetchError<500, types.ExcluiUmaCategoriaResponse500> 500
   */
  excluiUmaCategoria(metadata: types.ExcluiUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.ExcluiUmaCategoriaResponse200>> {
    return this.core.fetch('/categorias/{id}', 'delete', metadata);
  }

  /**
   * Categoria encontrada
   *
   * @summary Retorna uma categoria específica
   * @throws FetchError<422, types.RetornaUmaCategoriaEspecificaResponse422> 422
   * @throws FetchError<500, types.RetornaUmaCategoriaEspecificaResponse500> 500
   */
  retornaUmaCategoriaEspecifica(metadata: types.RetornaUmaCategoriaEspecificaMetadataParam): Promise<FetchResponse<200, types.RetornaUmaCategoriaEspecificaResponse200>> {
    return this.core.fetch('/categorias/{id}', 'get', metadata);
  }

  /**
   * Atualiza uma categoria
   *
   * @throws FetchError<422, types.AtualizaUmaCategoriaResponse422> 422
   * @throws FetchError<500, types.AtualizaUmaCategoriaResponse500> 500
   */
  atualizaUmaCategoria(body: types.AtualizaUmaCategoriaBodyParam, metadata: types.AtualizaUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaCategoriaResponse200>>;
  atualizaUmaCategoria(metadata: types.AtualizaUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaCategoriaResponse200>>;
  atualizaUmaCategoria(body?: types.AtualizaUmaCategoriaBodyParam | types.AtualizaUmaCategoriaMetadataParam, metadata?: types.AtualizaUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaCategoriaResponse200>> {
    return this.core.fetch('/categorias/{id}', 'put', body, metadata);
  }

  /**
   * Categoria excluída com sucesso
   *
   * @summary Exclui uma categoria utilizando o id do erp como identificador
   * @throws FetchError<422, types.ExcluiUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse422> 422
   * @throws FetchError<500, types.ExcluiUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse500> 500
   */
  excluiUmaCategoriaUtilizandoOIdDoErpComoIdentificador(metadata: types.ExcluiUmaCategoriaUtilizandoOIdDoErpComoIdentificadorMetadataParam): Promise<FetchResponse<200, types.ExcluiUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse200>> {
    return this.core.fetch('/categorias/erp/{id}', 'delete', metadata);
  }

  /**
   * Categoria encontrada
   *
   * @summary Retorna uma categoria específica utilizando o id do erp como identificador
   * @throws FetchError<422, types.RetornaUmaCategoriaEspecificaUtilizandoOIdDoErpComoIdentificadorResponse422> 422
   * @throws FetchError<500, types.RetornaUmaCategoriaEspecificaUtilizandoOIdDoErpComoIdentificadorResponse500> 500
   */
  retornaUmaCategoriaEspecificaUtilizandoOIdDoErpComoIdentificador(metadata: types.RetornaUmaCategoriaEspecificaUtilizandoOIdDoErpComoIdentificadorMetadataParam): Promise<FetchResponse<200, types.RetornaUmaCategoriaEspecificaUtilizandoOIdDoErpComoIdentificadorResponse200>> {
    return this.core.fetch('/categorias/erp/{id}', 'get', metadata);
  }

  /**
   * Atualiza uma categoria utilizando o id do erp como identificador
   *
   * @throws FetchError<422, types.AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse422> 422
   * @throws FetchError<500, types.AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse500> 500
   */
  atualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificador(body: types.AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorBodyParam, metadata: types.AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse200>>;
  atualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificador(metadata: types.AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse200>>;
  atualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificador(body?: types.AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorBodyParam | types.AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorMetadataParam, metadata?: types.AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse200>> {
    return this.core.fetch('/categorias/erp/{id}', 'put', body, metadata);
  }

  /**
   * Vincula um ou mais produtos em uma categoria
   *
   * @throws FetchError<500, types.VinculaUmOuMaisProdutosEmUmaCategoriaResponse500> 500
   */
  vinculaUmOuMaisProdutosEmUmaCategoria(body: types.VinculaUmOuMaisProdutosEmUmaCategoriaBodyParam, metadata: types.VinculaUmOuMaisProdutosEmUmaCategoriaMetadataParam): Promise<FetchResponse<201, types.VinculaUmOuMaisProdutosEmUmaCategoriaResponse201>>;
  vinculaUmOuMaisProdutosEmUmaCategoria(metadata: types.VinculaUmOuMaisProdutosEmUmaCategoriaMetadataParam): Promise<FetchResponse<201, types.VinculaUmOuMaisProdutosEmUmaCategoriaResponse201>>;
  vinculaUmOuMaisProdutosEmUmaCategoria(body?: types.VinculaUmOuMaisProdutosEmUmaCategoriaBodyParam | types.VinculaUmOuMaisProdutosEmUmaCategoriaMetadataParam, metadata?: types.VinculaUmOuMaisProdutosEmUmaCategoriaMetadataParam): Promise<FetchResponse<201, types.VinculaUmOuMaisProdutosEmUmaCategoriaResponse201>> {
    return this.core.fetch('/categorias/{categoriaId}/produtos', 'post', body, metadata);
  }

  /**
   * Exclui o vínculo de um ou mais produtos de uma categoria
   *
   * @throws FetchError<500, types.ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaResponse500> 500
   */
  excluiOVNculoDeUmOuMaisProdutosDeUmaCategoria(body: types.ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaBodyParam, metadata: types.ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaResponse200>>;
  excluiOVNculoDeUmOuMaisProdutosDeUmaCategoria(metadata: types.ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaResponse200>>;
  excluiOVNculoDeUmOuMaisProdutosDeUmaCategoria(body?: types.ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaBodyParam | types.ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaMetadataParam, metadata?: types.ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaResponse200>> {
    return this.core.fetch('/categorias/{categoriaId}/produtos', 'delete', body, metadata);
  }

  /**
   * Atualiza a ordem de exibição de um ou mais produtos de uma categoria
   *
   * @throws FetchError<500, types.AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaResponse500> 500
   */
  atualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoria(body: types.AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaBodyParam, metadata: types.AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaResponse200>>;
  atualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoria(metadata: types.AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaResponse200>>;
  atualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoria(body?: types.AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaBodyParam | types.AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaMetadataParam, metadata?: types.AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaResponse200>> {
    return this.core.fetch('/categorias/{categoriaId}/produtos', 'put', body, metadata);
  }

  /**
   * Retorna lista de produtos vinculados à categoria de forma ordenada
   *
   * @throws FetchError<400, types.RetornaAListaDeProdutosVinculadosCategoriaComPossibilidadeDeOrdenaODaListaDeProdutosComBaseNoCampoOrdemResponse400> 400
   */
  retornaAListaDeProdutosVinculadosCategoriaComPossibilidadeDeOrdenaODaListaDeProdutosComBaseNoCampoOrdem(metadata: types.RetornaAListaDeProdutosVinculadosCategoriaComPossibilidadeDeOrdenaODaListaDeProdutosComBaseNoCampoOrdemMetadataParam): Promise<FetchResponse<200, types.RetornaAListaDeProdutosVinculadosCategoriaComPossibilidadeDeOrdenaODaListaDeProdutosComBaseNoCampoOrdemResponse200>> {
    return this.core.fetch('/categorias/{categoriaId}/produtos', 'get', metadata);
  }

  /**
   * Lista de centros de distribuição
   *
   * @summary Retorna todos os centros de distribuição
   * @throws FetchError<422, types.RetornaTodosOsCentrosDeDistribuicaoResponse422> 422
   * @throws FetchError<500, types.RetornaTodosOsCentrosDeDistribuicaoResponse500> 500
   */
  retornaTodosOsCentrosDeDistribuicao(): Promise<FetchResponse<200, types.RetornaTodosOsCentrosDeDistribuicaoResponse200>> {
    return this.core.fetch('/centrosdistribuicao', 'get');
  }

  /**
   * Atualiza a prioridade de um centro de distribuição
   *
   * @summary Executa uma atualizacao da prioridade do centro de distribuicao
   * @throws FetchError<422, types.ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1Response422> 422
   * @throws FetchError<500, types.ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1Response500> 500
   */
  executaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1(body: types.ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1BodyParam, metadata: types.ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1MetadataParam): Promise<FetchResponse<200, types.ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1Response200>>;
  executaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1(metadata: types.ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1MetadataParam): Promise<FetchResponse<200, types.ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1Response200>>;
  executaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1(body?: types.ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1BodyParam | types.ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1MetadataParam, metadata?: types.ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1MetadataParam): Promise<FetchResponse<200, types.ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1Response200>> {
    return this.core.fetch('/centrosdistribuicao/{centroDistribuicaoId}/prioridade', 'put', body, metadata);
  }

  /**
   * Retorna o saldo de um usuário
   *
   * @throws FetchError<422, types.RetornaOSaldoDeUmUsuarioResponse422> 422
   * @throws FetchError<500, types.RetornaOSaldoDeUmUsuarioResponse500> 500
   */
  retornaOSaldoDeUmUsuario(metadata: types.RetornaOSaldoDeUmUsuarioMetadataParam): Promise<FetchResponse<200, types.RetornaOSaldoDeUmUsuarioResponse200>> {
    return this.core.fetch('/contascorrentes/{email}', 'get', metadata);
  }

  /**
   * Realiza um novo lançamento na conta corrente do cliente
   *
   * @throws FetchError<422, types.RealizaUmNovoLancamentoNaContaCorrenteDoClienteResponse422> 422
   * @throws FetchError<500, types.RealizaUmNovoLancamentoNaContaCorrenteDoClienteResponse500> 500
   */
  realizaUmNovoLancamentoNaContaCorrenteDoCliente(body: types.RealizaUmNovoLancamentoNaContaCorrenteDoClienteBodyParam, metadata: types.RealizaUmNovoLancamentoNaContaCorrenteDoClienteMetadataParam): Promise<FetchResponse<201, types.RealizaUmNovoLancamentoNaContaCorrenteDoClienteResponse201>>;
  realizaUmNovoLancamentoNaContaCorrenteDoCliente(metadata: types.RealizaUmNovoLancamentoNaContaCorrenteDoClienteMetadataParam): Promise<FetchResponse<201, types.RealizaUmNovoLancamentoNaContaCorrenteDoClienteResponse201>>;
  realizaUmNovoLancamentoNaContaCorrenteDoCliente(body?: types.RealizaUmNovoLancamentoNaContaCorrenteDoClienteBodyParam | types.RealizaUmNovoLancamentoNaContaCorrenteDoClienteMetadataParam, metadata?: types.RealizaUmNovoLancamentoNaContaCorrenteDoClienteMetadataParam): Promise<FetchResponse<201, types.RealizaUmNovoLancamentoNaContaCorrenteDoClienteResponse201>> {
    return this.core.fetch('/contascorrentes/{email}', 'post', body, metadata);
  }

  /**
   * Extrato retornado com sucesso
   *
   * @summary Busca todas as movimentações de conta corrente de um usuário
   * @throws FetchError<422, types.BuscaTodasAsMovimentacoesDeContaCorrenteDeUmUsuarioResponse422> 422
   * @throws FetchError<500, types.BuscaTodasAsMovimentacoesDeContaCorrenteDeUmUsuarioResponse500> 500
   */
  buscaTodasAsMovimentacoesDeContaCorrenteDeUmUsuario(metadata: types.BuscaTodasAsMovimentacoesDeContaCorrenteDeUmUsuarioMetadataParam): Promise<FetchResponse<200, types.BuscaTodasAsMovimentacoesDeContaCorrenteDeUmUsuarioResponse200>> {
    return this.core.fetch('/contascorrentes/{email}/extrato', 'get', metadata);
  }

  /**
   * Lançamentos na conta corrente com uso parcial de créditos e retorno de IDs
   *
   * @throws FetchError<400, types.LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsResponse400> 400
   * @throws FetchError<500, types.LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsResponse500> 500
   */
  lanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIds(body: types.LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsBodyParam, metadata: types.LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsMetadataParam): Promise<FetchResponse<201, types.LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsResponse201>>;
  lanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIds(metadata: types.LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsMetadataParam): Promise<FetchResponse<201, types.LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsResponse201>>;
  lanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIds(body?: types.LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsBodyParam | types.LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsMetadataParam, metadata?: types.LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsMetadataParam): Promise<FetchResponse<201, types.LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsResponse201>> {
    return this.core.fetch('/contascorrentes/lancamento/{email}', 'post', body, metadata);
  }

  /**
   * Conteúdos encontrados
   *
   * @summary Busca todos os conteúdos
   * @throws FetchError<422, types.BuscaTodosOsConteudosResponse422> 422
   * @throws FetchError<500, types.BuscaTodosOsConteudosResponse500> 500
   */
  buscaTodosOsConteudos(metadata?: types.BuscaTodosOsConteudosMetadataParam): Promise<FetchResponse<200, types.BuscaTodosOsConteudosResponse200>> {
    return this.core.fetch('/conteudos', 'get', metadata);
  }

  /**
   * Insere um novo conteúdo na loja
   *
   * @throws FetchError<422, types.InsereUmNovoConteudoNaLojaResponse422> 422
   * @throws FetchError<500, types.InsereUmNovoConteudoNaLojaResponse500> 500
   */
  insereUmNovoConteudoNaLoja(body?: types.InsereUmNovoConteudoNaLojaBodyParam): Promise<FetchResponse<201, types.InsereUmNovoConteudoNaLojaResponse201>> {
    return this.core.fetch('/conteudos', 'post', body);
  }

  /**
   * Conteúdo encontrado
   *
   * @summary Busca o conteúdo pelo seu id
   * @throws FetchError<500, types.BuscaOConteudoPeloSeuIdResponse500> 500
   */
  buscaOConteudoPeloSeuId(metadata: types.BuscaOConteudoPeloSeuIdMetadataParam): Promise<FetchResponse<200, types.BuscaOConteudoPeloSeuIdResponse200>> {
    return this.core.fetch('/conteudos/{conteudoId}', 'get', metadata);
  }

  /**
   * Atualiza um conteúdo
   *
   * @throws FetchError<422, types.AtualizaUmConteudoResponse422> 422
   * @throws FetchError<500, types.AtualizaUmConteudoResponse500> 500
   */
  atualizaUmConteudo(body: types.AtualizaUmConteudoBodyParam, metadata: types.AtualizaUmConteudoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmConteudoResponse200>>;
  atualizaUmConteudo(metadata: types.AtualizaUmConteudoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmConteudoResponse200>>;
  atualizaUmConteudo(body?: types.AtualizaUmConteudoBodyParam | types.AtualizaUmConteudoMetadataParam, metadata?: types.AtualizaUmConteudoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmConteudoResponse200>> {
    return this.core.fetch('/conteudos/{conteudoId}', 'put', body, metadata);
  }

  /**
   * Indicadores de Faturamento
   *
   * @summary Retorna indicadores de faturamento (receita, ticket médio e número de pedidos) da loja
   * @throws FetchError<422, types.RetornaIndicadoresDeFaturamentoReceitaTicketMedioENumeroDePedidosDaLojaResponse422> 422
   * @throws FetchError<500, types.RetornaIndicadoresDeFaturamentoReceitaTicketMedioENumeroDePedidosDaLojaResponse500> 500
   */
  retornaIndicadoresDeFaturamentoReceitaTicketMedioENumeroDePedidosDaLoja(metadata?: types.RetornaIndicadoresDeFaturamentoReceitaTicketMedioENumeroDePedidosDaLojaMetadataParam): Promise<FetchResponse<200, types.RetornaIndicadoresDeFaturamentoReceitaTicketMedioENumeroDePedidosDaLojaResponse200>> {
    return this.core.fetch('/dashboard/faturamento', 'get', metadata);
  }

  /**
   * Gráfico do Faturamento
   *
   * @summary Retorna dados para carregar o gráfico do faturamento
   * @throws FetchError<422, types.RetornaDadosParaCarregarOGraficoDoFaturamentoResponse422> 422
   * @throws FetchError<500, types.RetornaDadosParaCarregarOGraficoDoFaturamentoResponse500> 500
   */
  retornaDadosParaCarregarOGraficoDoFaturamento(metadata?: types.RetornaDadosParaCarregarOGraficoDoFaturamentoMetadataParam): Promise<FetchResponse<200, types.RetornaDadosParaCarregarOGraficoDoFaturamentoResponse200>> {
    return this.core.fetch('/dashboard/graficofaturamento', 'get', metadata);
  }

  /**
   * Últimos Pedidos
   *
   * @summary Retorna uma listagem com os últimos dez pedidos da loja
   * @throws FetchError<422, types.RetornaUmaListagemComOsUltimosDezPedidosDaLojaResponse422> 422
   * @throws FetchError<500, types.RetornaUmaListagemComOsUltimosDezPedidosDaLojaResponse500> 500
   */
  retornaUmaListagemComOsUltimosDezPedidosDaLoja(): Promise<FetchResponse<200, types.RetornaUmaListagemComOsUltimosDezPedidosDaLojaResponse200>> {
    return this.core.fetch('/dashboard/pedidos', 'get');
  }

  /**
   * Produtos Mais Vendidos
   *
   * @summary Retorna uma listagem com dados dos produtos mais vendidos pela loja ou parceiro
   * @throws FetchError<422, types.RetornaUmaListagemComDadosDosProdutosMaisVendidosPelaLojaOuParceiroResponse422> 422
   * @throws FetchError<500, types.RetornaUmaListagemComDadosDosProdutosMaisVendidosPelaLojaOuParceiroResponse500> 500
   */
  retornaUmaListagemComDadosDosProdutosMaisVendidosPelaLojaOuParceiro(metadata?: types.RetornaUmaListagemComDadosDosProdutosMaisVendidosPelaLojaOuParceiroMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListagemComDadosDosProdutosMaisVendidosPelaLojaOuParceiroResponse200>> {
    return this.core.fetch('/dashboard/produtos', 'get', metadata);
  }

  /**
   * Indicador dos Novos Compradores
   *
   * @summary Indicador dos Novos Compradores
   * @throws FetchError<422, types.IndicadorDosNovosCompradoresResponse422> 422
   * @throws FetchError<500, types.IndicadorDosNovosCompradoresResponse500> 500
   */
  indicadorDosNovosCompradores(metadata?: types.IndicadorDosNovosCompradoresMetadataParam): Promise<FetchResponse<200, types.IndicadorDosNovosCompradoresResponse200>> {
    return this.core.fetch('/dashboard/novoscompradores', 'get', metadata);
  }

  /**
   * Indicadores dos Produtos no Estoque
   *
   * @summary Indicadores dos Produtos no Estoque
   * @throws FetchError<422, types.IndicadoresDosProdutosNoEstoqueResponse422> 422
   * @throws FetchError<500, types.IndicadoresDosProdutosNoEstoqueResponse500> 500
   */
  indicadoresDosProdutosNoEstoque(metadata?: types.IndicadoresDosProdutosNoEstoqueMetadataParam): Promise<FetchResponse<200, types.IndicadoresDosProdutosNoEstoqueResponse200>> {
    return this.core.fetch('/dashboard/produtoestoque', 'get', metadata);
  }

  /**
   * Indicador do Carrinho Abandonado
   *
   * @summary Indicador do Carrinho Abandonado
   * @throws FetchError<422, types.IndicadorDoCarrinhoAbandonadoResponse422> 422
   * @throws FetchError<500, types.IndicadorDoCarrinhoAbandonadoResponse500> 500
   */
  indicadorDoCarrinhoAbandonado(metadata?: types.IndicadorDoCarrinhoAbandonadoMetadataParam): Promise<FetchResponse<200, types.IndicadorDoCarrinhoAbandonadoResponse200>> {
    return this.core.fetch('/dashboard/carrinhoabandonado', 'get', metadata);
  }

  /**
   * Gráfico Forma de Pagamento
   *
   * @summary Retorna dados para alimentar o gráfico forma de pagamento
   * @throws FetchError<422, types.RetornaDadosParaAlimentarOGraficoFormaDePagamentoResponse422> 422
   * @throws FetchError<500, types.RetornaDadosParaAlimentarOGraficoFormaDePagamentoResponse500> 500
   */
  retornaDadosParaAlimentarOGraficoFormaDePagamento(metadata?: types.RetornaDadosParaAlimentarOGraficoFormaDePagamentoMetadataParam): Promise<FetchResponse<200, types.RetornaDadosParaAlimentarOGraficoFormaDePagamentoResponse200>> {
    return this.core.fetch('/dashboard/graficoformapagamento', 'get', metadata);
  }

  /**
   * Relatório de receitas de um determinado período
   *
   * @summary Retorna o relatório de receitas de um determinado período
   * @throws FetchError<422, types.RetornaORelatorioDeReceitasDeUmDeterminadoPeriodoResponse422> 422
   * @throws FetchError<500, types.RetornaORelatorioDeReceitasDeUmDeterminadoPeriodoResponse500> 500
   */
  retornaORelatorioDeReceitasDeUmDeterminadoPeriodo(metadata?: types.RetornaORelatorioDeReceitasDeUmDeterminadoPeriodoMetadataParam): Promise<FetchResponse<200, types.RetornaORelatorioDeReceitasDeUmDeterminadoPeriodoResponse200>> {
    return this.core.fetch('/dashboard/receita', 'get', metadata);
  }

  /**
   * Relatório de ticket médio de um determinado período
   *
   * @summary Retorna o relatório de ticket médio de um determinado período
   * @throws FetchError<422, types.RetornaORelatorioDeTicketMedioDeUmDeterminadoPeriodoResponse422> 422
   * @throws FetchError<500, types.RetornaORelatorioDeTicketMedioDeUmDeterminadoPeriodoResponse500> 500
   */
  retornaORelatorioDeTicketMedioDeUmDeterminadoPeriodo(metadata?: types.RetornaORelatorioDeTicketMedioDeUmDeterminadoPeriodoMetadataParam): Promise<FetchResponse<200, types.RetornaORelatorioDeTicketMedioDeUmDeterminadoPeriodoResponse200>> {
    return this.core.fetch('/dashboard/ticketMedio', 'get', metadata);
  }

  /**
   * Relatório de transações de um determinado período
   *
   * @summary Retorna o relatório de transações de um determinado período
   * @throws FetchError<422, types.RetornaORelatorioDeTransacoesDeUmDeterminadoPeriodoResponse422> 422
   * @throws FetchError<500, types.RetornaORelatorioDeTransacoesDeUmDeterminadoPeriodoResponse500> 500
   */
  retornaORelatorioDeTransacoesDeUmDeterminadoPeriodo(metadata?: types.RetornaORelatorioDeTransacoesDeUmDeterminadoPeriodoMetadataParam): Promise<FetchResponse<200, types.RetornaORelatorioDeTransacoesDeUmDeterminadoPeriodoResponse200>> {
    return this.core.fetch('/dashboard/transacoes', 'get', metadata);
  }

  /**
   * Lista de produtos variantes vinculados aos tipo de evento
   *
   * @summary Retorna lista de eventos
   * @throws FetchError<422, types.RetornaListaDeEventosResponse422> 422
   * @throws FetchError<500, types.RetornaListaDeEventosResponse500> 500
   */
  retornaListaDeEventos(metadata?: types.RetornaListaDeEventosMetadataParam): Promise<FetchResponse<200, types.RetornaListaDeEventosResponse200>> {
    return this.core.fetch('/eventos', 'get', metadata);
  }

  /**
   * Cria um Novo Evento
   *
   * @throws FetchError<422, types.CriaUmNovoEventoResponse422> 422
   * @throws FetchError<500, types.CriaUmNovoEventoResponse500> 500
   */
  criaUmNovoEvento(body?: types.CriaUmNovoEventoBodyParam): Promise<FetchResponse<200, types.CriaUmNovoEventoResponse200>> {
    return this.core.fetch('/eventos', 'post', body);
  }

  /**
   * Lista de produtos variantes vinculados aos tipo de evento
   *
   * @summary Retorna um evento especifico
   * @throws FetchError<422, types.RetornaUmEventoEspecificoResponse422> 422
   * @throws FetchError<500, types.RetornaUmEventoEspecificoResponse500> 500
   */
  retornaUmEventoEspecifico(metadata: types.RetornaUmEventoEspecificoMetadataParam): Promise<FetchResponse<200, types.RetornaUmEventoEspecificoResponse200>> {
    return this.core.fetch('/eventos/{eventoId}', 'get', metadata);
  }

  /**
   * Atualiza um evento
   *
   * @throws FetchError<422, types.AtualizaUmEventoResponse422> 422
   * @throws FetchError<500, types.AtualizaUmEventoResponse500> 500
   */
  atualizaUmEvento(body: types.AtualizaUmEventoBodyParam, metadata: types.AtualizaUmEventoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmEventoResponse200>>;
  atualizaUmEvento(metadata: types.AtualizaUmEventoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmEventoResponse200>>;
  atualizaUmEvento(body?: types.AtualizaUmEventoBodyParam | types.AtualizaUmEventoMetadataParam, metadata?: types.AtualizaUmEventoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmEventoResponse200>> {
    return this.core.fetch('/eventos/{eventoId}', 'put', body, metadata);
  }

  /**
   * Lista de produtos variantes vinculados aos tipo de evento
   *
   * @summary Busca produtos vinculados a um evento
   * @throws FetchError<422, types.BuscaProdutosVinculadosAUmEventoResponse422> 422
   * @throws FetchError<500, types.BuscaProdutosVinculadosAUmEventoResponse500> 500
   */
  buscaProdutosVinculadosAUmEvento(metadata: types.BuscaProdutosVinculadosAUmEventoMetadataParam): Promise<FetchResponse<200, types.BuscaProdutosVinculadosAUmEventoResponse200>> {
    return this.core.fetch('/eventos/{eventoId}/produtos', 'get', metadata);
  }

  /**
   * Vincula um ou mais produtos a um evento sem remover os produtos vinculados anteriormente
   *
   * @throws FetchError<422, types.VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteResponse422> 422
   * @throws FetchError<500, types.VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteResponse500> 500
   */
  vinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormente(body: types.VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteBodyParam, metadata: types.VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteMetadataParam): Promise<FetchResponse<200, types.VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteResponse200>>;
  vinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormente(metadata: types.VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteMetadataParam): Promise<FetchResponse<200, types.VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteResponse200>>;
  vinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormente(body?: types.VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteBodyParam | types.VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteMetadataParam, metadata?: types.VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteMetadataParam): Promise<FetchResponse<200, types.VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteResponse200>> {
    return this.core.fetch('/eventos/{eventoId}/produtos', 'post', body, metadata);
  }

  /**
   * Atualiza lista de produtos vinculados a um evento removendo os itens vinculados
   * anteriormente e mantendo apenas os enviados pelo request
   *
   * @throws FetchError<422, types.AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestResponse422> 422
   * @throws FetchError<500, types.AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestResponse500> 500
   */
  atualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequest(body: types.AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestBodyParam, metadata: types.AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestMetadataParam): Promise<FetchResponse<200, types.AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestResponse200>>;
  atualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequest(metadata: types.AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestMetadataParam): Promise<FetchResponse<200, types.AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestResponse200>>;
  atualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequest(body?: types.AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestBodyParam | types.AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestMetadataParam, metadata?: types.AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestMetadataParam): Promise<FetchResponse<200, types.AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestResponse200>> {
    return this.core.fetch('/eventos/{eventoId}/produtos', 'put', body, metadata);
  }

  /**
   * Deleta o vinculo de um produto a um evento
   *
   * @throws FetchError<422, types.DeletaOVinculoDeUmProdutoAUmEventoResponse422> 422
   * @throws FetchError<500, types.DeletaOVinculoDeUmProdutoAUmEventoResponse500> 500
   */
  deletaOVinculoDeUmProdutoAUmEvento(metadata: types.DeletaOVinculoDeUmProdutoAUmEventoMetadataParam): Promise<FetchResponse<200, types.DeletaOVinculoDeUmProdutoAUmEventoResponse200>> {
    return this.core.fetch('/eventos/{eventoId}/produto/{produtoVarianteId}', 'delete', metadata);
  }

  /**
   * Atualiza o campo Recebido de um produto vinculado a um evento
   *
   * @throws FetchError<422, types.AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoResponse422> 422
   * @throws FetchError<500, types.AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoResponse500> 500
   */
  atualizaOCampoRecebidoDeUmProdutoVinculadoAUmEvento(body: types.AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoBodyParam, metadata: types.AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoMetadataParam): Promise<FetchResponse<200, types.AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoResponse200>>;
  atualizaOCampoRecebidoDeUmProdutoVinculadoAUmEvento(metadata: types.AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoMetadataParam): Promise<FetchResponse<200, types.AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoResponse200>>;
  atualizaOCampoRecebidoDeUmProdutoVinculadoAUmEvento(body?: types.AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoBodyParam | types.AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoMetadataParam, metadata?: types.AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoMetadataParam): Promise<FetchResponse<200, types.AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoResponse200>> {
    return this.core.fetch('/eventos/{eventoId}/produtos/recebido', 'put', body, metadata);
  }

  /**
   * Lista de fabricantes
   *
   * @summary Retorna todos os fabricantes
   * @throws FetchError<422, types.RetornaTodosOsFabricantesResponse422> 422
   * @throws FetchError<500, types.RetornaTodosOsFabricantesResponse500> 500
   */
  retornaTodosOsFabricantes(): Promise<FetchResponse<200, types.RetornaTodosOsFabricantesResponse200>> {
    return this.core.fetch('/fabricantes', 'get');
  }

  /**
   * Insere um novo fabricante
   *
   * @throws FetchError<422, types.InsereUmNovoFabricanteResponse422> 422
   * @throws FetchError<500, types.InsereUmNovoFabricanteResponse500> 500
   */
  insereUmNovoFabricante(body?: types.InsereUmNovoFabricanteBodyParam): Promise<FetchResponse<201, types.InsereUmNovoFabricanteResponse201>> {
    return this.core.fetch('/fabricantes', 'post', body);
  }

  /**
   * Exclui um fabricante
   *
   * @throws FetchError<422, types.ExcluiUmFabricanteResponse422> 422
   * @throws FetchError<500, types.ExcluiUmFabricanteResponse500> 500
   */
  excluiUmFabricante(metadata: types.ExcluiUmFabricanteMetadataParam): Promise<FetchResponse<200, types.ExcluiUmFabricanteResponse200>> {
    return this.core.fetch('/fabricantes/{fabricanteId}', 'delete', metadata);
  }

  /**
   * Fabricante encontrado
   *
   * @summary Retorna um fabricante específico pelo id
   * @throws FetchError<422, types.RetornaUmFabricanteEspecificoPeloIdResponse422> 422
   * @throws FetchError<500, types.RetornaUmFabricanteEspecificoPeloIdResponse500> 500
   */
  retornaUmFabricanteEspecificoPeloId(metadata: types.RetornaUmFabricanteEspecificoPeloIdMetadataParam): Promise<FetchResponse<200, types.RetornaUmFabricanteEspecificoPeloIdResponse200>> {
    return this.core.fetch('/fabricantes/{fabricanteId}', 'get', metadata);
  }

  /**
   * Atualiza um fabricante
   *
   * @throws FetchError<422, types.AtualizaUmFabricanteResponse422> 422
   * @throws FetchError<500, types.AtualizaUmFabricanteResponse500> 500
   */
  atualizaUmFabricante(body: types.AtualizaUmFabricanteBodyParam, metadata: types.AtualizaUmFabricanteMetadataParam): Promise<FetchResponse<200, types.AtualizaUmFabricanteResponse200>>;
  atualizaUmFabricante(metadata: types.AtualizaUmFabricanteMetadataParam): Promise<FetchResponse<200, types.AtualizaUmFabricanteResponse200>>;
  atualizaUmFabricante(body?: types.AtualizaUmFabricanteBodyParam | types.AtualizaUmFabricanteMetadataParam, metadata?: types.AtualizaUmFabricanteMetadataParam): Promise<FetchResponse<200, types.AtualizaUmFabricanteResponse200>> {
    return this.core.fetch('/fabricantes/{fabricanteId}', 'put', body, metadata);
  }

  /**
   * Fabricante encontrado
   *
   * @summary Retorna um fabricante específico pelo nome
   * @throws FetchError<422, types.RetornaUmFabricanteEspecificoPeloNomeResponse422> 422
   * @throws FetchError<500, types.RetornaUmFabricanteEspecificoPeloNomeResponse500> 500
   */
  retornaUmFabricanteEspecificoPeloNome(metadata: types.RetornaUmFabricanteEspecificoPeloNomeMetadataParam): Promise<FetchResponse<200, types.RetornaUmFabricanteEspecificoPeloNomeResponse200>> {
    return this.core.fetch('/fabricantes/{nome}', 'get', metadata);
  }

  /**
   * Lista de formas de pagamento
   *
   * @summary Retorna todas as formas de pagamento da loja
   * @throws FetchError<422, types.RetornaTodasAsFormasDePagamentoDaLojaResponse422> 422
   * @throws FetchError<500, types.RetornaTodasAsFormasDePagamentoDaLojaResponse500> 500
   */
  retornaTodasAsFormasDePagamentoDaLoja(): Promise<FetchResponse<200, types.RetornaTodasAsFormasDePagamentoDaLojaResponse200>> {
    return this.core.fetch('/formasPagamento', 'get');
  }

  /**
   * Lista de fretes
   *
   * @summary Retorna uma lista de fretes
   * @throws FetchError<422, types.RetornaUmaListaDeFretesResponse422> 422
   * @throws FetchError<500, types.RetornaUmaListaDeFretesResponse500> 500
   */
  retornaUmaListaDeFretes(): Promise<FetchResponse<200, types.RetornaUmaListaDeFretesResponse200>> {
    return this.core.fetch('/fretes', 'get');
  }

  /**
   * Insere um novo contrato de frete
   *
   * @throws FetchError<422, types.InsereUmNovoContratoDeFreteResponse422> 422
   * @throws FetchError<500, types.InsereUmNovoContratoDeFreteResponse500> 500
   */
  insereUmNovoContratoDeFrete(body: types.InsereUmNovoContratoDeFreteBodyParam): Promise<FetchResponse<201, types.InsereUmNovoContratoDeFreteResponse201>> {
    return this.core.fetch('/fretes', 'post', body);
  }

  /**
   * Frete encontrado
   *
   * @summary Retorna um contrato de frete
   * @throws FetchError<422, types.RetornaUmContratoDeFreteResponse422> 422
   * @throws FetchError<500, types.RetornaUmContratoDeFreteResponse500> 500
   */
  retornaUmContratoDeFrete(metadata: types.RetornaUmContratoDeFreteMetadataParam): Promise<FetchResponse<200, types.RetornaUmContratoDeFreteResponse200>> {
    return this.core.fetch('/fretes/{freteId}', 'get', metadata);
  }

  /**
   * Frete atualizado com sucesso
   *
   * @summary Atualiza um contrato de frete
   * @throws FetchError<422, types.AtualizaUmContratoDeFreteResponse422> 422
   * @throws FetchError<500, types.AtualizaUmContratoDeFreteResponse500> 500
   */
  atualizaUmContratoDeFrete(body: types.AtualizaUmContratoDeFreteBodyParam, metadata: types.AtualizaUmContratoDeFreteMetadataParam): Promise<FetchResponse<200, types.AtualizaUmContratoDeFreteResponse200>>;
  atualizaUmContratoDeFrete(metadata: types.AtualizaUmContratoDeFreteMetadataParam): Promise<FetchResponse<200, types.AtualizaUmContratoDeFreteResponse200>>;
  atualizaUmContratoDeFrete(body?: types.AtualizaUmContratoDeFreteBodyParam | types.AtualizaUmContratoDeFreteMetadataParam, metadata?: types.AtualizaUmContratoDeFreteMetadataParam): Promise<FetchResponse<200, types.AtualizaUmContratoDeFreteResponse200>> {
    return this.core.fetch('/fretes/{freteId}', 'put', body, metadata);
  }

  /**
   * Frete atualizado com sucesso
   *
   * @summary Ativa ou Desativa um frete
   * @throws FetchError<422, types.AtivaOuDesativaUmFreteResponse422> 422
   * @throws FetchError<500, types.AtivaOuDesativaUmFreteResponse500> 500
   */
  ativaOuDesativaUmFrete(body: types.AtivaOuDesativaUmFreteBodyParam, metadata: types.AtivaOuDesativaUmFreteMetadataParam): Promise<FetchResponse<200, types.AtivaOuDesativaUmFreteResponse200>>;
  ativaOuDesativaUmFrete(metadata: types.AtivaOuDesativaUmFreteMetadataParam): Promise<FetchResponse<200, types.AtivaOuDesativaUmFreteResponse200>>;
  ativaOuDesativaUmFrete(body?: types.AtivaOuDesativaUmFreteBodyParam | types.AtivaOuDesativaUmFreteMetadataParam, metadata?: types.AtivaOuDesativaUmFreteMetadataParam): Promise<FetchResponse<200, types.AtivaOuDesativaUmFreteResponse200>> {
    return this.core.fetch('/fretes/{freteId}/Ativo', 'put', body, metadata);
  }

  /**
   * Exclui os detalhes de um contrato de frete
   *
   * @throws FetchError<422, types.ExcluiOsDetalhesDeUmContratoDeFreteResponse422> 422
   * @throws FetchError<500, types.ExcluiOsDetalhesDeUmContratoDeFreteResponse500> 500
   */
  excluiOsDetalhesDeUmContratoDeFrete(metadata: types.ExcluiOsDetalhesDeUmContratoDeFreteMetadataParam): Promise<FetchResponse<200, types.ExcluiOsDetalhesDeUmContratoDeFreteResponse200>> {
    return this.core.fetch('/fretes/{freteId}/detalhes', 'delete', metadata);
  }

  /**
   * Lista de detalhes de frete
   *
   * @summary Retorna uma lista de detalhes de um contrato de frete
   * @throws FetchError<422, types.RetornaUmaListaDeDetalhesDeUmContratoDeFreteResponse422> 422
   * @throws FetchError<500, types.RetornaUmaListaDeDetalhesDeUmContratoDeFreteResponse500> 500
   */
  retornaUmaListaDeDetalhesDeUmContratoDeFrete(metadata: types.RetornaUmaListaDeDetalhesDeUmContratoDeFreteMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaDeDetalhesDeUmContratoDeFreteResponse200>> {
    return this.core.fetch('/fretes/{freteId}/detalhes', 'get', metadata);
  }

  /**
   * Insere um novo detalhe de frete vinculado a um contrato de frete
   *
   * @throws FetchError<422, types.InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteResponse422> 422
   * @throws FetchError<500, types.InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteResponse500> 500
   */
  insereUmNovoDetalheDeFreteVinculadoAUmContratoDeFrete(body: types.InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteBodyParam, metadata: types.InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteMetadataParam): Promise<FetchResponse<201, types.InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteResponse201>>;
  insereUmNovoDetalheDeFreteVinculadoAUmContratoDeFrete(metadata: types.InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteMetadataParam): Promise<FetchResponse<201, types.InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteResponse201>>;
  insereUmNovoDetalheDeFreteVinculadoAUmContratoDeFrete(body?: types.InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteBodyParam | types.InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteMetadataParam, metadata?: types.InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteMetadataParam): Promise<FetchResponse<201, types.InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteResponse201>> {
    return this.core.fetch('/fretes/{freteId}/detalhes', 'post', body, metadata);
  }

  /**
   * Método que realiza uma cotação de frete
   *
   * @summary Realiza uma cotação de frete
   * @throws FetchError<422, types.RealizaUmaCotacaoDeFreteResponse422> 422
   * @throws FetchError<500, types.RealizaUmaCotacaoDeFreteResponse500> 500
   */
  realizaUmaCotacaoDeFrete(body?: types.RealizaUmaCotacaoDeFreteBodyParam, metadata?: types.RealizaUmaCotacaoDeFreteMetadataParam): Promise<FetchResponse<200, types.RealizaUmaCotacaoDeFreteResponse200>> {
    return this.core.fetch('/fretes/cotacoes', 'post', body, metadata);
  }

  /**
   * Objeto com as cotações de frete
   *
   * @summary Retorna uma cotação de frete para o carrinho do pedido
   * @throws FetchError<422, types.RetornaUmaCotacaoDeFreteParaOCarrinhoDoPedidoResponse422> 422
   * @throws FetchError<500, types.RetornaUmaCotacaoDeFreteParaOCarrinhoDoPedidoResponse500> 500
   */
  retornaUmaCotacaoDeFreteParaOCarrinhoDoPedido(metadata: types.RetornaUmaCotacaoDeFreteParaOCarrinhoDoPedidoMetadataParam): Promise<FetchResponse<200, types.RetornaUmaCotacaoDeFreteParaOCarrinhoDoPedidoResponse200>> {
    return this.core.fetch('/fretes/pedidos/{pedidoId}/cotacoes', 'get', metadata);
  }

  /**
   * Busca os critérios score da loja
   *
   * @throws FetchError<400, types.BuscaOsCritRiosScoreDaLojaResponse400> 400
   */
  buscaOsCritRiosScoreDaLoja(): Promise<FetchResponse<200, types.BuscaOsCritRiosScoreDaLojaResponse200>> {
    return this.core.fetch('/fretes/criteriosscore/ativos', 'get');
  }

  /**
   * Cria um critério de score para um centro de distribuição
   *
   * @throws FetchError<500, types.CriaUmCritRioDeScoreParaUmCentroDeDistribuiOResponse500> 500
   */
  criaUmCritRioDeScoreParaUmCentroDeDistribuiO(body?: types.CriaUmCritRioDeScoreParaUmCentroDeDistribuiOBodyParam): Promise<FetchResponse<200, types.CriaUmCritRioDeScoreParaUmCentroDeDistribuiOResponse200>> {
    return this.core.fetch('/fretes/criteriosscore/valor', 'post', body);
  }

  /**
   * Lista de scripts
   *
   * @summary Busca todos os scripts inseridos
   * @throws FetchError<422, types.BuscaTodosOsScriptsInseridosResponse422> 422
   * @throws FetchError<500, types.BuscaTodosOsScriptsInseridosResponse500> 500
   */
  buscaTodosOsScriptsInseridos(): Promise<FetchResponse<200, types.BuscaTodosOsScriptsInseridosResponse200>> {
    return this.core.fetch('/gestorscripts/scripts', 'get');
  }

  /**
   * Insere um novo script
   *
   * @throws FetchError<422, types.InsereUmNovoScriptResponse422> 422
   * @throws FetchError<500, types.InsereUmNovoScriptResponse500> 500
   */
  insereUmNovoScript(body: types.InsereUmNovoScriptBodyParam): Promise<FetchResponse<200, types.InsereUmNovoScriptResponse200>> {
    return this.core.fetch('/gestorscripts/scripts', 'post', body);
  }

  /**
   * Exclui um Script
   *
   * @throws FetchError<422, types.ExcluiUmScriptResponse422> 422
   * @throws FetchError<500, types.ExcluiUmScriptResponse500> 500
   */
  excluiUmScript(metadata: types.ExcluiUmScriptMetadataParam): Promise<FetchResponse<200, types.ExcluiUmScriptResponse200>> {
    return this.core.fetch('/gestorscripts/scripts/{scriptId}', 'delete', metadata);
  }

  /**
   * Atualiza um script existente
   *
   * @throws FetchError<422, types.AtualizaUmScriptExistenteResponse422> 422
   * @throws FetchError<500, types.AtualizaUmScriptExistenteResponse500> 500
   */
  atualizaUmScriptExistente(body: types.AtualizaUmScriptExistenteBodyParam, metadata: types.AtualizaUmScriptExistenteMetadataParam): Promise<FetchResponse<200, types.AtualizaUmScriptExistenteResponse200>>;
  atualizaUmScriptExistente(metadata: types.AtualizaUmScriptExistenteMetadataParam): Promise<FetchResponse<200, types.AtualizaUmScriptExistenteResponse200>>;
  atualizaUmScriptExistente(body?: types.AtualizaUmScriptExistenteBodyParam | types.AtualizaUmScriptExistenteMetadataParam, metadata?: types.AtualizaUmScriptExistenteMetadataParam): Promise<FetchResponse<200, types.AtualizaUmScriptExistenteResponse200>> {
    return this.core.fetch('/gestorscripts/scripts/{scriptId}', 'put', body, metadata);
  }

  /**
   * Lista o conteúdo de uma versão
   *
   * @summary Busca o conteúdo de uma versão
   * @throws FetchError<422, types.BuscaOConteudoDeUmaVersaoResponse422> 422
   * @throws FetchError<500, types.BuscaOConteudoDeUmaVersaoResponse500> 500
   */
  buscaOConteudoDeUmaVersao(metadata: types.BuscaOConteudoDeUmaVersaoMetadataParam): Promise<FetchResponse<200, types.BuscaOConteudoDeUmaVersaoResponse200>> {
    return this.core.fetch('/gestorscripts/scripts/{scriptId}/versao/{versaoId}/conteudo', 'get', metadata);
  }

  /**
   * Lista de versões
   *
   * @summary Busca todas as versões de um script
   * @throws FetchError<422, types.BuscaTodasAsVersoesDeUmScriptResponse422> 422
   * @throws FetchError<500, types.BuscaTodasAsVersoesDeUmScriptResponse500> 500
   */
  buscaTodasAsVersoesDeUmScript(metadata: types.BuscaTodasAsVersoesDeUmScriptMetadataParam): Promise<FetchResponse<200, types.BuscaTodasAsVersoesDeUmScriptResponse200>> {
    return this.core.fetch('/gestorscripts/scripts/{scriptId}/versoes', 'get', metadata);
  }

  /**
   * Insere uma versão para um script existente
   *
   * @throws FetchError<422, types.InsereUmaVersaoParaUmScriptExistenteResponse422> 422
   * @throws FetchError<500, types.InsereUmaVersaoParaUmScriptExistenteResponse500> 500
   */
  insereUmaVersaoParaUmScriptExistente(body: types.InsereUmaVersaoParaUmScriptExistenteBodyParam, metadata: types.InsereUmaVersaoParaUmScriptExistenteMetadataParam): Promise<FetchResponse<200, types.InsereUmaVersaoParaUmScriptExistenteResponse200>>;
  insereUmaVersaoParaUmScriptExistente(metadata: types.InsereUmaVersaoParaUmScriptExistenteMetadataParam): Promise<FetchResponse<200, types.InsereUmaVersaoParaUmScriptExistenteResponse200>>;
  insereUmaVersaoParaUmScriptExistente(body?: types.InsereUmaVersaoParaUmScriptExistenteBodyParam | types.InsereUmaVersaoParaUmScriptExistenteMetadataParam, metadata?: types.InsereUmaVersaoParaUmScriptExistenteMetadataParam): Promise<FetchResponse<200, types.InsereUmaVersaoParaUmScriptExistenteResponse200>> {
    return this.core.fetch('/gestorscripts/scripts/{scriptId}/versoes', 'post', body, metadata);
  }

  /**
   * Retorna dados de um grupo de lista de compras
   *
   * @throws FetchError<422, types.RetornaDadosDeUmGrupoDeListaDeComprasResponse422> 422
   * @throws FetchError<500, types.RetornaDadosDeUmGrupoDeListaDeComprasResponse500> 500
   */
  retornaDadosDeUmGrupoDeListaDeCompras(metadata: types.RetornaDadosDeUmGrupoDeListaDeComprasMetadataParam): Promise<FetchResponse<200, types.RetornaDadosDeUmGrupoDeListaDeComprasResponse200>> {
    return this.core.fetch('/grupoListaCompras/{grupoListaCompraId}', 'get', metadata);
  }

  /**
   * Retorna todos os grupos de listas de compras
   *
   * @throws FetchError<422, types.RetornaTodosOsGruposDeListasDeComprasResponse422> 422
   * @throws FetchError<500, types.RetornaTodosOsGruposDeListasDeComprasResponse500> 500
   */
  retornaTodosOsGruposDeListasDeCompras(metadata?: types.RetornaTodosOsGruposDeListasDeComprasMetadataParam): Promise<FetchResponse<200, types.RetornaTodosOsGruposDeListasDeComprasResponse200>> {
    return this.core.fetch('/grupoListaCompras', 'get', metadata);
  }

  /**
   * Insere dados de um ou mais grupos de lista de compras
   *
   * @throws FetchError<500, types.InsereDadosDeUmOuMaisGruposDeListaDeComprasResponse500> 500
   */
  insereDadosDeUmOuMaisGruposDeListaDeCompras(body?: types.InsereDadosDeUmOuMaisGruposDeListaDeComprasBodyParam): Promise<FetchResponse<201, types.InsereDadosDeUmOuMaisGruposDeListaDeComprasResponse201>> {
    return this.core.fetch('/grupoListaCompras', 'post', body);
  }

  /**
   * Atualiza dados de um ou mais grupos de lista de compras
   *
   * @throws FetchError<500, types.AtualizaDadosDeUmOuMaisGruposDeListaDeComprasResponse500> 500
   */
  atualizaDadosDeUmOuMaisGruposDeListaDeCompras(body?: types.AtualizaDadosDeUmOuMaisGruposDeListaDeComprasBodyParam): Promise<FetchResponse<201, types.AtualizaDadosDeUmOuMaisGruposDeListaDeComprasResponse201>> {
    return this.core.fetch('/grupoListaCompras', 'put', body);
  }

  /**
   * Deleta dados de um ou mais grupos de lista de compras
   *
   * @throws FetchError<500, types.DeletaDadosDeUmOuMaisGruposDeListaDeComprasResponse500> 500
   */
  deletaDadosDeUmOuMaisGruposDeListaDeCompras(body?: types.DeletaDadosDeUmOuMaisGruposDeListaDeComprasBodyParam): Promise<FetchResponse<201, types.DeletaDadosDeUmOuMaisGruposDeListaDeComprasResponse201>> {
    return this.core.fetch('/grupoListaCompras', 'delete', body);
  }

  /**
   * Lista de Grupos de Personalização
   *
   * @summary Retorna uma lista de Grupos de Personalização
   * @throws FetchError<422, types.RetornaUmaListaDeGruposDePersonalizacaoResponse422> 422
   * @throws FetchError<500, types.RetornaUmaListaDeGruposDePersonalizacaoResponse500> 500
   */
  retornaUmaListaDeGruposDePersonalizacao(): Promise<FetchResponse<200, types.RetornaUmaListaDeGruposDePersonalizacaoResponse200>> {
    return this.core.fetch('/grupospersonalizacao', 'get');
  }

  /**
   * Remove o vinculo de produtos de um Grupo de Personalização
   *
   * @throws FetchError<422, types.RemoveOVinculoDeProdutosDeUmGrupoDePersonalizacaoResponse422> 422
   * @throws FetchError<500, types.RemoveOVinculoDeProdutosDeUmGrupoDePersonalizacaoResponse500> 500
   */
  removeOVinculoDeProdutosDeUmGrupoDePersonalizacao(body: types.RemoveOVinculoDeProdutosDeUmGrupoDePersonalizacaoBodyParam, metadata: types.RemoveOVinculoDeProdutosDeUmGrupoDePersonalizacaoMetadataParam): Promise<FetchResponse<200, types.RemoveOVinculoDeProdutosDeUmGrupoDePersonalizacaoResponse200>> {
    return this.core.fetch('/grupospersonalizacao/{grupoPersonalizacaoId}/produtos', 'delete', body, metadata);
  }

  /**
   * Lista de produtos de um Grupo de Personalização
   *
   * @summary Retorna uma lista de produtos vinculados a um Grupo de Personalização
   * @throws FetchError<422, types.RetornaUmaListaDeProdutosVinculadosAUmGrupoDePersonalizacaoResponse422> 422
   * @throws FetchError<500, types.RetornaUmaListaDeProdutosVinculadosAUmGrupoDePersonalizacaoResponse500> 500
   */
  retornaUmaListaDeProdutosVinculadosAUmGrupoDePersonalizacao(metadata: types.RetornaUmaListaDeProdutosVinculadosAUmGrupoDePersonalizacaoMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaDeProdutosVinculadosAUmGrupoDePersonalizacaoResponse200>> {
    return this.core.fetch('/grupospersonalizacao/{grupoPersonalizacaoId}/produtos', 'get', metadata);
  }

  /**
   * Vincula produtos a um Grupo de Personalização
   *
   * @throws FetchError<422, types.VinculaProdutosAUmGrupoDePersonalizacaoResponse422> 422
   * @throws FetchError<500, types.VinculaProdutosAUmGrupoDePersonalizacaoResponse500> 500
   */
  vinculaProdutosAUmGrupoDePersonalizacao(body: types.VinculaProdutosAUmGrupoDePersonalizacaoBodyParam, metadata: types.VinculaProdutosAUmGrupoDePersonalizacaoMetadataParam): Promise<FetchResponse<201, types.VinculaProdutosAUmGrupoDePersonalizacaoResponse201>> {
    return this.core.fetch('/grupospersonalizacao/{grupoPersonalizacaoId}/produtos', 'post', body, metadata);
  }

  /**
   * Lista de hotsites
   *
   * @summary Busca todos os hotsites inseridos
   * @throws FetchError<422, types.BuscaTodosOsHotsitesInseridosResponse422> 422
   * @throws FetchError<500, types.BuscaTodosOsHotsitesInseridosResponse500> 500
   */
  buscaTodosOsHotsitesInseridos(metadata?: types.BuscaTodosOsHotsitesInseridosMetadataParam): Promise<FetchResponse<200, types.BuscaTodosOsHotsitesInseridosResponse200>> {
    return this.core.fetch('/hotsites', 'get', metadata);
  }

  /**
   * A lista de produtos para serem exibidos no hotsite está limitada a 1024 itens, tanto por
   * expressão como por produtos.
   *
   * @summary Insere um novo hotsite
   * @throws FetchError<422, types.InsereUmNovoHotsiteResponse422> 422
   * @throws FetchError<500, types.InsereUmNovoHotsiteResponse500> 500
   */
  insereUmNovoHotsite(body?: types.InsereUmNovoHotsiteBodyParam): Promise<FetchResponse<200, types.InsereUmNovoHotsiteResponse200>> {
    return this.core.fetch('/hotsites', 'post', body);
  }

  /**
   * Deleta um hotsite que foi inserido manualmente, hotsites gerados automaticamente não
   * podem ser deletados
   *
   * @throws FetchError<422, types.DeletaUmHotsiteQueFoiInseridoManualmenteHotsitesGeradosAutomaticamenteNaoPodemSerDeletadosResponse422> 422
   * @throws FetchError<500, types.DeletaUmHotsiteQueFoiInseridoManualmenteHotsitesGeradosAutomaticamenteNaoPodemSerDeletadosResponse500> 500
   */
  deletaUmHotsiteQueFoiInseridoManualmenteHotsitesGeradosAutomaticamenteNaoPodemSerDeletados(metadata: types.DeletaUmHotsiteQueFoiInseridoManualmenteHotsitesGeradosAutomaticamenteNaoPodemSerDeletadosMetadataParam): Promise<FetchResponse<200, types.DeletaUmHotsiteQueFoiInseridoManualmenteHotsitesGeradosAutomaticamenteNaoPodemSerDeletadosResponse200>> {
    return this.core.fetch('/hotsites/{hotsiteId}', 'delete', metadata);
  }

  /**
   * Objeto do hotsite
   *
   * @summary Busca um hotsite específico
   * @throws FetchError<422, types.BuscaUmHotsiteEspecificoResponse422> 422
   * @throws FetchError<500, types.BuscaUmHotsiteEspecificoResponse500> 500
   */
  buscaUmHotsiteEspecifico(metadata: types.BuscaUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.BuscaUmHotsiteEspecificoResponse200>> {
    return this.core.fetch('/hotsites/{hotsiteId}', 'get', metadata);
  }

  /**
   * Atualiza os dados de um hotsite existente
   *
   * @throws FetchError<422, types.AtualizaOsDadosDeUmHotsiteExistenteResponse422> 422
   * @throws FetchError<500, types.AtualizaOsDadosDeUmHotsiteExistenteResponse500> 500
   */
  atualizaOsDadosDeUmHotsiteExistente(body: types.AtualizaOsDadosDeUmHotsiteExistenteBodyParam, metadata: types.AtualizaOsDadosDeUmHotsiteExistenteMetadataParam): Promise<FetchResponse<200, types.AtualizaOsDadosDeUmHotsiteExistenteResponse200>>;
  atualizaOsDadosDeUmHotsiteExistente(metadata: types.AtualizaOsDadosDeUmHotsiteExistenteMetadataParam): Promise<FetchResponse<200, types.AtualizaOsDadosDeUmHotsiteExistenteResponse200>>;
  atualizaOsDadosDeUmHotsiteExistente(body?: types.AtualizaOsDadosDeUmHotsiteExistenteBodyParam | types.AtualizaOsDadosDeUmHotsiteExistenteMetadataParam, metadata?: types.AtualizaOsDadosDeUmHotsiteExistenteMetadataParam): Promise<FetchResponse<200, types.AtualizaOsDadosDeUmHotsiteExistenteResponse200>> {
    return this.core.fetch('/hotsites/{hotsiteId}', 'put', body, metadata);
  }

  /**
   * Atualiza o status do hotsite, sendo ativo (true) ou inativo (false)
   *
   * @throws FetchError<422, types.AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseResponse422> 422
   * @throws FetchError<500, types.AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseResponse500> 500
   */
  atualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalse(body: types.AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseBodyParam, metadata: types.AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseResponse200>>;
  atualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalse(metadata: types.AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseResponse200>>;
  atualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalse(body?: types.AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseBodyParam | types.AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseMetadataParam, metadata?: types.AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseResponse200>> {
    return this.core.fetch('/hotsites/{hotsiteId}/status', 'put', body, metadata);
  }

  /**
   * Desvincula um ou mais banners de um hotsite específico
   *
   * @throws FetchError<422, types.DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoResponse422> 422
   * @throws FetchError<500, types.DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoResponse500> 500
   */
  desvinculaUmOuMaisBannersDeUmHotsiteEspecifico(body: types.DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoBodyParam, metadata: types.DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoResponse200>>;
  desvinculaUmOuMaisBannersDeUmHotsiteEspecifico(metadata: types.DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoResponse200>>;
  desvinculaUmOuMaisBannersDeUmHotsiteEspecifico(body?: types.DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoBodyParam | types.DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoMetadataParam, metadata?: types.DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoResponse200>> {
    return this.core.fetch('/hotsites/{hotsiteId}/banners', 'delete', body, metadata);
  }

  /**
   * Lista de identificadores de banners vinculados ao hotsite
   *
   * @summary Busca os banners vinculados a um hotsite específico
   * @throws FetchError<422, types.BuscaOsBannersVinculadosAUmHotsiteEspecificoResponse422> 422
   * @throws FetchError<500, types.BuscaOsBannersVinculadosAUmHotsiteEspecificoResponse500> 500
   */
  buscaOsBannersVinculadosAUmHotsiteEspecifico(metadata: types.BuscaOsBannersVinculadosAUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.BuscaOsBannersVinculadosAUmHotsiteEspecificoResponse200>> {
    return this.core.fetch('/hotsites/{hotsiteId}/banners', 'get', metadata);
  }

  /**
   * Vincula um ou mais banners a um hotsite específico
   *
   * @throws FetchError<422, types.VinculaUmOuMaisBannersAUmHotsiteEspecificoResponse422> 422
   * @throws FetchError<500, types.VinculaUmOuMaisBannersAUmHotsiteEspecificoResponse500> 500
   */
  vinculaUmOuMaisBannersAUmHotsiteEspecifico(body: types.VinculaUmOuMaisBannersAUmHotsiteEspecificoBodyParam, metadata: types.VinculaUmOuMaisBannersAUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.VinculaUmOuMaisBannersAUmHotsiteEspecificoResponse200>>;
  vinculaUmOuMaisBannersAUmHotsiteEspecifico(metadata: types.VinculaUmOuMaisBannersAUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.VinculaUmOuMaisBannersAUmHotsiteEspecificoResponse200>>;
  vinculaUmOuMaisBannersAUmHotsiteEspecifico(body?: types.VinculaUmOuMaisBannersAUmHotsiteEspecificoBodyParam | types.VinculaUmOuMaisBannersAUmHotsiteEspecificoMetadataParam, metadata?: types.VinculaUmOuMaisBannersAUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.VinculaUmOuMaisBannersAUmHotsiteEspecificoResponse200>> {
    return this.core.fetch('/hotsites/{hotsiteId}/banners', 'post', body, metadata);
  }

  /**
   * Desvincula um ou mais conteúdos de um hotsite específico
   *
   * @throws FetchError<422, types.DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoResponse422> 422
   * @throws FetchError<500, types.DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoResponse500> 500
   */
  desvinculaUmOuMaisConteudosDeUmHotsiteEspecifico(body: types.DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoBodyParam, metadata: types.DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoResponse200>>;
  desvinculaUmOuMaisConteudosDeUmHotsiteEspecifico(metadata: types.DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoResponse200>>;
  desvinculaUmOuMaisConteudosDeUmHotsiteEspecifico(body?: types.DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoBodyParam | types.DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoMetadataParam, metadata?: types.DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoResponse200>> {
    return this.core.fetch('/hotsites/{hotsiteId}/conteudos', 'delete', body, metadata);
  }

  /**
   * Lista de identificadores de conteúdos vinculados ao hotsite
   *
   * @summary Busca os conteúdos vinculados a um hotsite específico
   * @throws FetchError<422, types.BuscaOsConteudosVinculadosAUmHotsiteEspecificoResponse422> 422
   * @throws FetchError<500, types.BuscaOsConteudosVinculadosAUmHotsiteEspecificoResponse500> 500
   */
  buscaOsConteudosVinculadosAUmHotsiteEspecifico(metadata: types.BuscaOsConteudosVinculadosAUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.BuscaOsConteudosVinculadosAUmHotsiteEspecificoResponse200>> {
    return this.core.fetch('/hotsites/{hotsiteId}/conteudos', 'get', metadata);
  }

  /**
   * Vincula um ou mais conteúdos a um hotsite específico
   *
   * @throws FetchError<422, types.VinculaUmOuMaisConteudosAUmHotsiteEspecificoResponse422> 422
   * @throws FetchError<500, types.VinculaUmOuMaisConteudosAUmHotsiteEspecificoResponse500> 500
   */
  vinculaUmOuMaisConteudosAUmHotsiteEspecifico(body: types.VinculaUmOuMaisConteudosAUmHotsiteEspecificoBodyParam, metadata: types.VinculaUmOuMaisConteudosAUmHotsiteEspecificoMetadataParam): Promise<FetchResponse<200, types.VinculaUmOuMaisConteudosAUmHotsiteEspecificoResponse200>> {
    return this.core.fetch('/hotsites/{hotsiteId}/conteudos', 'post', body, metadata);
  }

  /**
   * Insere dados básicos de uma nova lista de compras
   *
   * @throws FetchError<500, types.InsereDadosBSicosDeUmaNovaListaDeComprasResponse500> 500
   */
  insereDadosBSicosDeUmaNovaListaDeCompras(body?: types.InsereDadosBSicosDeUmaNovaListaDeComprasBodyParam): Promise<FetchResponse<201, types.InsereDadosBSicosDeUmaNovaListaDeComprasResponse201>> {
    return this.core.fetch('/listacompras', 'post', body);
  }

  /**
   * Retorna as listas de compras
   *
   * @throws FetchError<422, types.RetornaAsListasDeComprasResponse422> 422
   * @throws FetchError<500, types.RetornaAsListasDeComprasResponse500> 500
   */
  retornaAsListasDeCompras(metadata?: types.RetornaAsListasDeComprasMetadataParam): Promise<FetchResponse<200, types.RetornaAsListasDeComprasResponse200>> {
    return this.core.fetch('/listacompras', 'get', metadata);
  }

  /**
   * Atualiza dados básicos de uma lista de compras
   *
   * @throws FetchError<404, types.AtualizaDadosBSicosDeUmaListaDeComprasResponse404> 404
   * @throws FetchError<500, types.AtualizaDadosBSicosDeUmaListaDeComprasResponse500> 500
   */
  atualizaDadosBSicosDeUmaListaDeCompras(body: types.AtualizaDadosBSicosDeUmaListaDeComprasBodyParam, metadata: types.AtualizaDadosBSicosDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.AtualizaDadosBSicosDeUmaListaDeComprasResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}', 'put', body, metadata);
  }

  /**
   * Retorna uma lista de compra especifica
   *
   * @throws FetchError<422, types.RetornaUmaListaDeCompraResponse422> 422
   * @throws FetchError<500, types.RetornaUmaListaDeCompraResponse500> 500
   */
  retornaUmaListaDeCompra(metadata: types.RetornaUmaListaDeCompraMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaDeCompraResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}', 'get', metadata);
  }

  /**
   * Excluir uma lista de compras
   *
   * @throws FetchError<422, types.ExcluirUmaListaDeComprasResponse422> 422
   * @throws FetchError<500, types.ExcluirUmaListaDeComprasResponse500> 500
   */
  excluirUmaListaDeCompras(metadata: types.ExcluirUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.ExcluirUmaListaDeComprasResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}', 'delete', metadata);
  }

  /**
   * Vincula produto(s) a uma lista de compras
   *
   * @throws FetchError<422, types.VinculaProdutosAUmaListaDeComprasResponse422> 422
   * @throws FetchError<500, types.VinculaProdutosAUmaListaDeComprasResponse500> 500
   */
  vinculaProdutosAUmaListaDeCompras(body: types.VinculaProdutosAUmaListaDeComprasBodyParam, metadata: types.VinculaProdutosAUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.VinculaProdutosAUmaListaDeComprasResponse200>>;
  vinculaProdutosAUmaListaDeCompras(metadata: types.VinculaProdutosAUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.VinculaProdutosAUmaListaDeComprasResponse200>>;
  vinculaProdutosAUmaListaDeCompras(body?: types.VinculaProdutosAUmaListaDeComprasBodyParam | types.VinculaProdutosAUmaListaDeComprasMetadataParam, metadata?: types.VinculaProdutosAUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.VinculaProdutosAUmaListaDeComprasResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}/produtos', 'post', body, metadata);
  }

  /**
   * Exclui vínculo do(s) produto(s) de uma lista de compras
   *
   * @throws FetchError<422, types.ExcluiVNculoDosProdutosDeUmaListaDeComprasResponse422> 422
   * @throws FetchError<500, types.ExcluiVNculoDosProdutosDeUmaListaDeComprasResponse500> 500
   */
  excluiVNculoDosProdutosDeUmaListaDeCompras(body: types.ExcluiVNculoDosProdutosDeUmaListaDeComprasBodyParam, metadata: types.ExcluiVNculoDosProdutosDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.ExcluiVNculoDosProdutosDeUmaListaDeComprasResponse200>>;
  excluiVNculoDosProdutosDeUmaListaDeCompras(metadata: types.ExcluiVNculoDosProdutosDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.ExcluiVNculoDosProdutosDeUmaListaDeComprasResponse200>>;
  excluiVNculoDosProdutosDeUmaListaDeCompras(body?: types.ExcluiVNculoDosProdutosDeUmaListaDeComprasBodyParam | types.ExcluiVNculoDosProdutosDeUmaListaDeComprasMetadataParam, metadata?: types.ExcluiVNculoDosProdutosDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.ExcluiVNculoDosProdutosDeUmaListaDeComprasResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}/produtos', 'delete', body, metadata);
  }

  /**
   * Vincula grupo(s) de lista a uma lista de compras
   *
   * @throws FetchError<422, types.VinculaGruposDeListaAUmaListaDeComprasResponse422> 422
   * @throws FetchError<500, types.VinculaGruposDeListaAUmaListaDeComprasResponse500> 500
   */
  vinculaGruposDeListaAUmaListaDeCompras(body: types.VinculaGruposDeListaAUmaListaDeComprasBodyParam, metadata: types.VinculaGruposDeListaAUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.VinculaGruposDeListaAUmaListaDeComprasResponse200>>;
  vinculaGruposDeListaAUmaListaDeCompras(metadata: types.VinculaGruposDeListaAUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.VinculaGruposDeListaAUmaListaDeComprasResponse200>>;
  vinculaGruposDeListaAUmaListaDeCompras(body?: types.VinculaGruposDeListaAUmaListaDeComprasBodyParam | types.VinculaGruposDeListaAUmaListaDeComprasMetadataParam, metadata?: types.VinculaGruposDeListaAUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.VinculaGruposDeListaAUmaListaDeComprasResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}/grupoListaCompras', 'post', body, metadata);
  }

  /**
   * Exclui vínculo de grupo(s) de lista de uma lista de compras
   *
   * @throws FetchError<422, types.ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasResponse422> 422
   * @throws FetchError<500, types.ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasResponse500> 500
   */
  excluiVNculoDeGruposDeListaDeUmaListaDeCompras(body: types.ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasBodyParam, metadata: types.ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasResponse200>>;
  excluiVNculoDeGruposDeListaDeUmaListaDeCompras(metadata: types.ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasResponse200>>;
  excluiVNculoDeGruposDeListaDeUmaListaDeCompras(body?: types.ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasBodyParam | types.ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasMetadataParam, metadata?: types.ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}/grupoListaCompras', 'delete', body, metadata);
  }

  /**
   * Insere dados de SEO em uma lista de compras
   *
   * @throws FetchError<400, types.InsereDadosDeSeoEmUmaListaDeComprasResponse400> 400
   */
  insereDadosDeSeoEmUmaListaDeCompras(body: types.InsereDadosDeSeoEmUmaListaDeComprasBodyParam, metadata: types.InsereDadosDeSeoEmUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.InsereDadosDeSeoEmUmaListaDeComprasResponse200>>;
  insereDadosDeSeoEmUmaListaDeCompras(metadata: types.InsereDadosDeSeoEmUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.InsereDadosDeSeoEmUmaListaDeComprasResponse200>>;
  insereDadosDeSeoEmUmaListaDeCompras(body?: types.InsereDadosDeSeoEmUmaListaDeComprasBodyParam | types.InsereDadosDeSeoEmUmaListaDeComprasMetadataParam, metadata?: types.InsereDadosDeSeoEmUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.InsereDadosDeSeoEmUmaListaDeComprasResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}/seo', 'post', body, metadata);
  }

  /**
   * Atualiza o title do SEO de uma lista de compras
   *
   * @throws FetchError<404, types.AtualizaOTitleDoSeoDeUmaListaDeComprasResponse404> 404
   * @throws FetchError<500, types.AtualizaOTitleDoSeoDeUmaListaDeComprasResponse500> 500
   */
  atualizaOTitleDoSeoDeUmaListaDeCompras(body: types.AtualizaOTitleDoSeoDeUmaListaDeComprasBodyParam, metadata: types.AtualizaOTitleDoSeoDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.AtualizaOTitleDoSeoDeUmaListaDeComprasResponse200>>;
  atualizaOTitleDoSeoDeUmaListaDeCompras(metadata: types.AtualizaOTitleDoSeoDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.AtualizaOTitleDoSeoDeUmaListaDeComprasResponse200>>;
  atualizaOTitleDoSeoDeUmaListaDeCompras(body?: types.AtualizaOTitleDoSeoDeUmaListaDeComprasBodyParam | types.AtualizaOTitleDoSeoDeUmaListaDeComprasMetadataParam, metadata?: types.AtualizaOTitleDoSeoDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.AtualizaOTitleDoSeoDeUmaListaDeComprasResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}/seo/title', 'put', body, metadata);
  }

  /**
   * Exclui vínculo de SEO de uma lista de compras
   *
   * @throws FetchError<422, types.ExcluiVNculoDeSeoDeUmaListaDeComprasResponse422> 422
   * @throws FetchError<500, types.ExcluiVNculoDeSeoDeUmaListaDeComprasResponse500> 500
   */
  excluiVNculoDeSeoDeUmaListaDeCompras(metadata: types.ExcluiVNculoDeSeoDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.ExcluiVNculoDeSeoDeUmaListaDeComprasResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}/seo/{listaCompraSEOId}', 'delete', metadata);
  }

  /**
   * Vincula imagens a uma lista de compras
   *
   * @throws FetchError<404, types.VinculaImagensAUmaListaDeComprasResponse404> 404
   * @throws FetchError<500, types.VinculaImagensAUmaListaDeComprasResponse500> 500
   */
  vinculaImagensAUmaListaDeCompras(body: types.VinculaImagensAUmaListaDeComprasBodyParam, metadata: types.VinculaImagensAUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.VinculaImagensAUmaListaDeComprasResponse200>>;
  vinculaImagensAUmaListaDeCompras(metadata: types.VinculaImagensAUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.VinculaImagensAUmaListaDeComprasResponse200>>;
  vinculaImagensAUmaListaDeCompras(body?: types.VinculaImagensAUmaListaDeComprasBodyParam | types.VinculaImagensAUmaListaDeComprasMetadataParam, metadata?: types.VinculaImagensAUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.VinculaImagensAUmaListaDeComprasResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}/imagens', 'post', body, metadata);
  }

  /**
   * Exclui imagens de uma lista de compras
   *
   * @throws FetchError<404, types.ExcluiImagensDeUmaListaDeComprasResponse404> 404
   * @throws FetchError<500, types.ExcluiImagensDeUmaListaDeComprasResponse500> 500
   */
  excluiImagensDeUmaListaDeCompras(body: types.ExcluiImagensDeUmaListaDeComprasBodyParam, metadata: types.ExcluiImagensDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.ExcluiImagensDeUmaListaDeComprasResponse200>>;
  excluiImagensDeUmaListaDeCompras(metadata: types.ExcluiImagensDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.ExcluiImagensDeUmaListaDeComprasResponse200>>;
  excluiImagensDeUmaListaDeCompras(body?: types.ExcluiImagensDeUmaListaDeComprasBodyParam | types.ExcluiImagensDeUmaListaDeComprasMetadataParam, metadata?: types.ExcluiImagensDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.ExcluiImagensDeUmaListaDeComprasResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}/imagens', 'delete', body, metadata);
  }

  /**
   * Atualiza a ordem das imagens de uma lista de compras
   *
   * @throws FetchError<404, types.AtualizaAOrdemDasImagensDeUmaListaDeComprasResponse404> 404
   * @throws FetchError<500, types.AtualizaAOrdemDasImagensDeUmaListaDeComprasResponse500> 500
   */
  atualizaAOrdemDasImagensDeUmaListaDeCompras(body: types.AtualizaAOrdemDasImagensDeUmaListaDeComprasBodyParam, metadata: types.AtualizaAOrdemDasImagensDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.AtualizaAOrdemDasImagensDeUmaListaDeComprasResponse200>>;
  atualizaAOrdemDasImagensDeUmaListaDeCompras(metadata: types.AtualizaAOrdemDasImagensDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.AtualizaAOrdemDasImagensDeUmaListaDeComprasResponse200>>;
  atualizaAOrdemDasImagensDeUmaListaDeCompras(body?: types.AtualizaAOrdemDasImagensDeUmaListaDeComprasBodyParam | types.AtualizaAOrdemDasImagensDeUmaListaDeComprasMetadataParam, metadata?: types.AtualizaAOrdemDasImagensDeUmaListaDeComprasMetadataParam): Promise<FetchResponse<200, types.AtualizaAOrdemDasImagensDeUmaListaDeComprasResponse200>> {
    return this.core.fetch('/listacompras/{listaComprasId}/imagens/ordem', 'put', body, metadata);
  }

  /**
   * Dados da loja
   *
   * @summary Retorna dados da loja
   * @throws FetchError<400, types.RetornaDadosDaLojaResponse400> 400
   * @throws FetchError<500, types.RetornaDadosDaLojaResponse500> 500
   */
  retornaDadosDaLoja(): Promise<FetchResponse<200, types.RetornaDadosDaLojaResponse200>> {
    return this.core.fetch('/loja', 'get');
  }

  /**
   * Lista de Lojas Físicas
   *
   * @summary Retorna todas as Lojas Físicas
   * @throws FetchError<422, types.RetornaTodasAsLojasFisicasResponse422> 422
   * @throws FetchError<500, types.RetornaTodasAsLojasFisicasResponse500> 500
   */
  retornaTodasAsLojasFisicas(metadata?: types.RetornaTodasAsLojasFisicasMetadataParam): Promise<FetchResponse<200, types.RetornaTodasAsLojasFisicasResponse200>> {
    return this.core.fetch('/lojasFisicas', 'get', metadata);
  }

  /**
   * Insere uma Loja Física
   *
   * @throws FetchError<422, types.InsereUmaLojaFisicaResponse422> 422
   * @throws FetchError<500, types.InsereUmaLojaFisicaResponse500> 500
   */
  insereUmaLojaFisica(body?: types.InsereUmaLojaFisicaBodyParam): Promise<FetchResponse<200, types.InsereUmaLojaFisicaResponse200>> {
    return this.core.fetch('/lojasFisicas', 'post', body);
  }

  /**
   * Remove uma Loja Física
   *
   * @throws FetchError<422, types.RemoveUmaLojaFisicaResponse422> 422
   * @throws FetchError<500, types.RemoveUmaLojaFisicaResponse500> 500
   */
  removeUmaLojaFisica(metadata: types.RemoveUmaLojaFisicaMetadataParam): Promise<FetchResponse<200, types.RemoveUmaLojaFisicaResponse200>> {
    return this.core.fetch('/lojasFisicas/{lojaFisicaId}', 'delete', metadata);
  }

  /**
   * Loja Física
   *
   * @summary Retorna Loja Física pelo Id
   * @throws FetchError<422, types.RetornaLojaFisicaPeloIdResponse422> 422
   * @throws FetchError<500, types.RetornaLojaFisicaPeloIdResponse500> 500
   */
  retornaLojaFisicaPeloId(metadata: types.RetornaLojaFisicaPeloIdMetadataParam): Promise<FetchResponse<200, types.RetornaLojaFisicaPeloIdResponse200>> {
    return this.core.fetch('/lojasFisicas/{lojaFisicaId}', 'get', metadata);
  }

  /**
   * Atualiza uma Loja Física
   *
   * @throws FetchError<422, types.AtualizaUmaLojaFisicaResponse422> 422
   * @throws FetchError<500, types.AtualizaUmaLojaFisicaResponse500> 500
   */
  atualizaUmaLojaFisica(body: types.AtualizaUmaLojaFisicaBodyParam, metadata: types.AtualizaUmaLojaFisicaMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaLojaFisicaResponse200>>;
  atualizaUmaLojaFisica(metadata: types.AtualizaUmaLojaFisicaMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaLojaFisicaResponse200>>;
  atualizaUmaLojaFisica(body?: types.AtualizaUmaLojaFisicaBodyParam | types.AtualizaUmaLojaFisicaMetadataParam, metadata?: types.AtualizaUmaLojaFisicaMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaLojaFisicaResponse200>> {
    return this.core.fetch('/lojasFisicas/{lojaFisicaId}', 'put', body, metadata);
  }

  /**
   * Remove uma lista de range de cep de uma Loja Física
   *
   * @throws FetchError<422, types.RemoveUmaListaDeRangeDeCepDeUmaLojaFisicaResponse422> 422
   * @throws FetchError<500, types.RemoveUmaListaDeRangeDeCepDeUmaLojaFisicaResponse500> 500
   */
  removeUmaListaDeRangeDeCepDeUmaLojaFisica(body: types.RemoveUmaListaDeRangeDeCepDeUmaLojaFisicaBodyParam, metadata: types.RemoveUmaListaDeRangeDeCepDeUmaLojaFisicaMetadataParam): Promise<FetchResponse<200, types.RemoveUmaListaDeRangeDeCepDeUmaLojaFisicaResponse200>> {
    return this.core.fetch('/lojasFisicas/{lojaFisicaId}/rangeCep', 'delete', body, metadata);
  }

  /**
   * Lista de Ranges de Ceps de uma Loja Física
   *
   * @summary Retorna todos ranges de cep que essa loja atende
   * @throws FetchError<422, types.RetornaTodosRangesDeCepQueEssaLojaAtendeResponse422> 422
   * @throws FetchError<500, types.RetornaTodosRangesDeCepQueEssaLojaAtendeResponse500> 500
   */
  retornaTodosRangesDeCepQueEssaLojaAtende(metadata: types.RetornaTodosRangesDeCepQueEssaLojaAtendeMetadataParam): Promise<FetchResponse<200, types.RetornaTodosRangesDeCepQueEssaLojaAtendeResponse200>> {
    return this.core.fetch('/lojasFisicas/{lojaFisicaId}/rangeCep', 'get', metadata);
  }

  /**
   * Insere um range de cep em uma Loja Física
   *
   * @throws FetchError<422, types.InsereUmRangeDeCepEmUmaLojaFisicaResponse422> 422
   * @throws FetchError<500, types.InsereUmRangeDeCepEmUmaLojaFisicaResponse500> 500
   */
  insereUmRangeDeCepEmUmaLojaFisica(body: types.InsereUmRangeDeCepEmUmaLojaFisicaBodyParam, metadata: types.InsereUmRangeDeCepEmUmaLojaFisicaMetadataParam): Promise<FetchResponse<200, types.InsereUmRangeDeCepEmUmaLojaFisicaResponse200>>;
  insereUmRangeDeCepEmUmaLojaFisica(metadata: types.InsereUmRangeDeCepEmUmaLojaFisicaMetadataParam): Promise<FetchResponse<200, types.InsereUmRangeDeCepEmUmaLojaFisicaResponse200>>;
  insereUmRangeDeCepEmUmaLojaFisica(body?: types.InsereUmRangeDeCepEmUmaLojaFisicaBodyParam | types.InsereUmRangeDeCepEmUmaLojaFisicaMetadataParam, metadata?: types.InsereUmRangeDeCepEmUmaLojaFisicaMetadataParam): Promise<FetchResponse<200, types.InsereUmRangeDeCepEmUmaLojaFisicaResponse200>> {
    return this.core.fetch('/lojasFisicas/{lojaFisicaId}/rangeCep', 'post', body, metadata);
  }

  /**
   * Lista dos estados
   *
   * @summary Busca os estados
   * @throws FetchError<400, types.BuscaOsEstadosResponse400> 400
   * @throws FetchError<500, types.BuscaOsEstadosResponse500> 500
   */
  buscaOsEstados(): Promise<FetchResponse<200, types.BuscaOsEstadosResponse200>> {
    return this.core.fetch('/lojasFisicas/estados', 'get');
  }

  /**
   * Xml com os dados das mídias entre duas datas
   *
   * @summary Retorna o xml com os dados de todas as mídias entre duas datas
   * @throws FetchError<500, types.RetornaOXmlComOsDadosDeTodasAsMidiasEntreDuasDatasResponse500> 500
   */
  retornaOXmlComOsDadosDeTodasAsMidiasEntreDuasDatas(metadata?: types.RetornaOXmlComOsDadosDeTodasAsMidiasEntreDuasDatasMetadataParam): Promise<FetchResponse<200, types.RetornaOXmlComOsDadosDeTodasAsMidiasEntreDuasDatasResponse200>> {
    return this.core.fetch('/midias', 'get', metadata);
  }

  /**
   * Xml com os dados de uma mídia específicas entre duas datas
   *
   * @summary Retorna o xml com os dados de uma mídia específicas entre duas datas
   * @throws FetchError<500, types.RetornaOXmlComOsDadosDeUmaMidiaEspecificasEntreDuasDatasResponse500> 500
   */
  retornaOXmlComOsDadosDeUmaMidiaEspecificasEntreDuasDatas(metadata: types.RetornaOXmlComOsDadosDeUmaMidiaEspecificasEntreDuasDatasMetadataParam): Promise<FetchResponse<200, types.RetornaOXmlComOsDadosDeUmaMidiaEspecificasEntreDuasDatasResponse200>> {
    return this.core.fetch('/midias/{identificador}', 'get', metadata);
  }

  /**
   * Busca notificações referentes ao usuário
   *
   * @summary Busca notificações referentes ao usuário
   * @throws FetchError<500, types.BuscaNotificacoesReferentesAoUsuarioResponse500> 500
   */
  buscaNotificacoesReferentesAoUsuario(metadata?: types.BuscaNotificacoesReferentesAoUsuarioMetadataParam): Promise<FetchResponse<200, types.BuscaNotificacoesReferentesAoUsuarioResponse200>> {
    return this.core.fetch('/notificacao', 'get', metadata);
  }

  /**
   * Atualiza a propriedade Visto da notificação (por usuario) para True/False
   *
   * @throws FetchError<422, types.AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1Response422> 422
   * @throws FetchError<500, types.AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1Response500> 500
   */
  atualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1(body: types.AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1BodyParam, metadata: types.AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1MetadataParam): Promise<FetchResponse<200, types.AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1Response200>>;
  atualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1(metadata: types.AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1MetadataParam): Promise<FetchResponse<200, types.AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1Response200>>;
  atualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1(body?: types.AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1BodyParam | types.AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1MetadataParam, metadata?: types.AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1MetadataParam): Promise<FetchResponse<200, types.AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1Response200>> {
    return this.core.fetch('/notificacao/{identificador}/status', 'put', body, metadata);
  }

  /**
   * Busca os ids dos tipos de notificações que estão ativadas para o usuário
   *
   * @summary Busca os ids dos tipos de notificações que estão ativadas para o usuário
   * @throws FetchError<500, types.BuscaOsIdsDosTiposDeNotificacoesQueEstaoAtivadasParaOUsuarioResponse500> 500
   */
  buscaOsIdsDosTiposDeNotificacoesQueEstaoAtivadasParaOUsuario(): Promise<FetchResponse<200, types.BuscaOsIdsDosTiposDeNotificacoesQueEstaoAtivadasParaOUsuarioResponse200>> {
    return this.core.fetch('/notificacao/preferencias', 'get');
  }

  /**
   * Adiciona um tipo de notificação
   *
   * @throws FetchError<500, types.AdicionaUmTipoDeNotificacaoResponse500> 500
   */
  adicionaUmTipoDeNotificacao(body: types.AdicionaUmTipoDeNotificacaoBodyParam, metadata: types.AdicionaUmTipoDeNotificacaoMetadataParam): Promise<FetchResponse<200, types.AdicionaUmTipoDeNotificacaoResponse200>>;
  adicionaUmTipoDeNotificacao(metadata: types.AdicionaUmTipoDeNotificacaoMetadataParam): Promise<FetchResponse<200, types.AdicionaUmTipoDeNotificacaoResponse200>>;
  adicionaUmTipoDeNotificacao(body?: types.AdicionaUmTipoDeNotificacaoBodyParam | types.AdicionaUmTipoDeNotificacaoMetadataParam, metadata?: types.AdicionaUmTipoDeNotificacaoMetadataParam): Promise<FetchResponse<200, types.AdicionaUmTipoDeNotificacaoResponse200>> {
    return this.core.fetch('/notificacao/tiponotificacao/{identificador}/status', 'put', body, metadata);
  }

  /**
   * Ativa ou desativa as notificações para o usuário
   *
   * @throws FetchError<500, types.AtivaOuDesativaAsNotificacoesParaOUsuarioResponse500> 500
   */
  ativaOuDesativaAsNotificacoesParaOUsuario(body?: types.AtivaOuDesativaAsNotificacoesParaOUsuarioBodyParam): Promise<FetchResponse<200, types.AtivaOuDesativaAsNotificacoesParaOUsuarioResponse200>> {
    return this.core.fetch('/notificacao/status', 'put', body);
  }

  /**
   * Busca a quantidade de notificações não lidas pelo usuário
   *
   * @throws FetchError<500, types.BuscaAQuantidadeDeNotificacoesNaoLidasPeloUsuarioResponse500> 500
   */
  buscaAQuantidadeDeNotificacoesNaoLidasPeloUsuario(): Promise<FetchResponse<200, types.BuscaAQuantidadeDeNotificacoesNaoLidasPeloUsuarioResponse200>> {
    return this.core.fetch('/notificacao/naolidas', 'get');
  }

  /**
   * Lista de parceiros
   *
   * @summary Retorna todos os parceiros
   * @throws FetchError<500, types.RetornaTodosOsParceirosResponse500> 500
   */
  retornaTodosOsParceiros(): Promise<FetchResponse<200, types.RetornaTodosOsParceirosResponse200>> {
    return this.core.fetch('/parceiros', 'get');
  }

  /**
   * Insere um novo parceiro
   *
   * @throws FetchError<500, types.InsereUmNovoParceiroResponse500> 500
   */
  insereUmNovoParceiro(body?: types.InsereUmNovoParceiroBodyParam): Promise<FetchResponse<201, types.InsereUmNovoParceiroResponse201>> {
    return this.core.fetch('/parceiros', 'post', body);
  }

  /**
   * Lista de parceiros com pedidos
   *
   * @summary Retorna todos os parceiros com pedidos
   * @throws FetchError<500, types.RetornaTodosOsParceirosComPedidosResponse500> 500
   */
  retornaTodosOsParceirosComPedidos(metadata?: types.RetornaTodosOsParceirosComPedidosMetadataParam): Promise<FetchResponse<200, types.RetornaTodosOsParceirosComPedidosResponse200>> {
    return this.core.fetch('/parceiros/comPedidos', 'get', metadata);
  }

  /**
   * Parceiro excluído com sucesso
   *
   * @summary Exclui um parceiro
   * @throws FetchError<500, types.ExcluiUmParceiroResponse500> 500
   */
  excluiUmParceiro(metadata: types.ExcluiUmParceiroMetadataParam): Promise<FetchResponse<200, types.ExcluiUmParceiroResponse200>> {
    return this.core.fetch('/parceiros/{parceiroId}', 'delete', metadata);
  }

  /**
   * Parceiro encontrado
   *
   * @summary Retorna o parceiro pelo id
   * @throws FetchError<500, types.RetornaOParceiroPeloIdResponse500> 500
   */
  retornaOParceiroPeloId(metadata: types.RetornaOParceiroPeloIdMetadataParam): Promise<FetchResponse<200, types.RetornaOParceiroPeloIdResponse200>> {
    return this.core.fetch('/parceiros/{parceiroId}', 'get', metadata);
  }

  /**
   * Parceiro atualizado com sucesso
   *
   * @summary Atualiza um parceiro
   * @throws FetchError<500, types.AtualizaUmParceiroResponse500> 500
   */
  atualizaUmParceiro(body: types.AtualizaUmParceiroBodyParam, metadata: types.AtualizaUmParceiroMetadataParam): Promise<FetchResponse<200, types.AtualizaUmParceiroResponse200>>;
  atualizaUmParceiro(metadata: types.AtualizaUmParceiroMetadataParam): Promise<FetchResponse<200, types.AtualizaUmParceiroResponse200>>;
  atualizaUmParceiro(body?: types.AtualizaUmParceiroBodyParam | types.AtualizaUmParceiroMetadataParam, metadata?: types.AtualizaUmParceiroMetadataParam): Promise<FetchResponse<200, types.AtualizaUmParceiroResponse200>> {
    return this.core.fetch('/parceiros/{parceiroId}', 'put', body, metadata);
  }

  /**
   * Parceiro encontrado
   *
   * @summary Retorna o parceiro pelo nome
   * @throws FetchError<500, types.RetornaOParceiroPeloNomeResponse500> 500
   */
  retornaOParceiroPeloNome(metadata: types.RetornaOParceiroPeloNomeMetadataParam): Promise<FetchResponse<200, types.RetornaOParceiroPeloNomeResponse200>> {
    return this.core.fetch('/parceiros/{nome}', 'get', metadata);
  }

  /**
   * Usuários encontrados
   *
   * @summary Retorna os usuários pelo id do parceiro
   * @throws FetchError<500, types.RetornaOsUsuariosPeloIdDoParceiroResponse500> 500
   */
  retornaOsUsuariosPeloIdDoParceiro(metadata: types.RetornaOsUsuariosPeloIdDoParceiroMetadataParam): Promise<FetchResponse<200, types.RetornaOsUsuariosPeloIdDoParceiroResponse200>> {
    return this.core.fetch('/parceiros/{parceiroId}/usuarios', 'get', metadata);
  }

  /**
   * Usuários encontrados
   *
   * @summary Retorna os usuários pelo nome do parceiro
   * @throws FetchError<500, types.RetornaOsUsuariosPeloNomeDoParceiroResponse500> 500
   */
  retornaOsUsuariosPeloNomeDoParceiro(metadata: types.RetornaOsUsuariosPeloNomeDoParceiroMetadataParam): Promise<FetchResponse<200, types.RetornaOsUsuariosPeloNomeDoParceiroResponse200>> {
    return this.core.fetch('/parceiros/{nome}/usuarios', 'get', metadata);
  }

  /**
   * Parceiro atualizado com sucesso
   *
   * @summary Atualiza um parceiro para tipo marketplace ou não
   * @throws FetchError<500, types.AtualizaUmParceiroParaTipoMarketplaceOuNaoResponse500> 500
   */
  atualizaUmParceiroParaTipoMarketplaceOuNao(body: types.AtualizaUmParceiroParaTipoMarketplaceOuNaoBodyParam, metadata: types.AtualizaUmParceiroParaTipoMarketplaceOuNaoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmParceiroParaTipoMarketplaceOuNaoResponse200>>;
  atualizaUmParceiroParaTipoMarketplaceOuNao(metadata: types.AtualizaUmParceiroParaTipoMarketplaceOuNaoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmParceiroParaTipoMarketplaceOuNaoResponse200>>;
  atualizaUmParceiroParaTipoMarketplaceOuNao(body?: types.AtualizaUmParceiroParaTipoMarketplaceOuNaoBodyParam | types.AtualizaUmParceiroParaTipoMarketplaceOuNaoMetadataParam, metadata?: types.AtualizaUmParceiroParaTipoMarketplaceOuNaoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmParceiroParaTipoMarketplaceOuNaoResponse200>> {
    return this.core.fetch('/parceiros/{parceiroId}/marketplace', 'patch', body, metadata);
  }

  /**
   * Lista de pedidos
   *
   * @summary Retorna uma lista de pedido na ordem decrescente dentro do limite de datas passadas
   * @throws FetchError<422, types.RetornaUmaListaDePedidoNaOrdemDecrescenteDentroDoLimiteDeDatasPassadasResponse422> 422
   * @throws FetchError<500, types.RetornaUmaListaDePedidoNaOrdemDecrescenteDentroDoLimiteDeDatasPassadasResponse500> 500
   */
  retornaUmaListaDePedidoNaOrdemDecrescenteDentroDoLimiteDeDatasPassadas(metadata?: types.RetornaUmaListaDePedidoNaOrdemDecrescenteDentroDoLimiteDeDatasPassadasMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaDePedidoNaOrdemDecrescenteDentroDoLimiteDeDatasPassadasResponse200>> {
    return this.core.fetch('/pedidos', 'get', metadata);
  }

  /**
   * Caso a loja utilize as formas de pagamento do gateway o campo "formaPagamentoId" do
   * objeto "pagamento" deverá conter o valor "200".
   *
   * @summary Insere um novo pedido
   * @throws FetchError<422, types.InsereUmNovoPedidoResponse422> 422
   * @throws FetchError<500, types.InsereUmNovoPedidoResponse500> 500
   */
  insereUmNovoPedido(body: types.InsereUmNovoPedidoBodyParam): Promise<FetchResponse<201, types.InsereUmNovoPedidoResponse201>> {
    return this.core.fetch('/pedidos', 'post', body);
  }

  /**
   * Pedido único
   *
   * @summary Retorna um pedido específico
   * @throws FetchError<422, types.RetornaUmPedidoEspecificoResponse422> 422
   * @throws FetchError<500, types.RetornaUmPedidoEspecificoResponse500> 500
   */
  retornaUmPedidoEspecifico(metadata: types.RetornaUmPedidoEspecificoMetadataParam): Promise<FetchResponse<200, types.RetornaUmPedidoEspecificoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}', 'get', metadata);
  }

  /**
   * Lista de pedidos
   *
   * @summary Retorna uma lista de pedido baseado nas situações de pedidos
   * @throws FetchError<422, types.RetornaUmaListaDePedidoBaseadoNasSituacoesDePedidosResponse422> 422
   * @throws FetchError<500, types.RetornaUmaListaDePedidoBaseadoNasSituacoesDePedidosResponse500> 500
   */
  retornaUmaListaDePedidoBaseadoNasSituacoesDePedidos(metadata: types.RetornaUmaListaDePedidoBaseadoNasSituacoesDePedidosMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaDePedidoBaseadoNasSituacoesDePedidosResponse200>> {
    return this.core.fetch('/pedidos/situacaoPedido/{situacoesPedido}', 'get', metadata);
  }

  /**
   * Retorna o histórico de situações de um pedido
   *
   * @throws FetchError<422, types.RetornaOHistoricoDeSituacoesDeUmPedidoResponse422> 422
   * @throws FetchError<500, types.RetornaOHistoricoDeSituacoesDeUmPedidoResponse500> 500
   */
  retornaOHistoricoDeSituacoesDeUmPedido(metadata: types.RetornaOHistoricoDeSituacoesDeUmPedidoMetadataParam): Promise<FetchResponse<200, types.RetornaOHistoricoDeSituacoesDeUmPedidoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/historicoSituacao', 'get', metadata);
  }

  /**
   * Lista de pedidos
   *
   * @summary Retorna uma lista de pedido baseado nas formas de pagamento
   * @throws FetchError<422, types.RetornaUmaListaDePedidoBaseadoNasFormasDePagamentoResponse422> 422
   * @throws FetchError<500, types.RetornaUmaListaDePedidoBaseadoNasFormasDePagamentoResponse500> 500
   */
  retornaUmaListaDePedidoBaseadoNasFormasDePagamento(metadata: types.RetornaUmaListaDePedidoBaseadoNasFormasDePagamentoMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaDePedidoBaseadoNasFormasDePagamentoResponse200>> {
    return this.core.fetch('/pedidos/formaPagamento/{formasPagamento}', 'get', metadata);
  }

  /**
   * Último status do pedido
   *
   * @summary Retorna o último status de um pedido
   * @throws FetchError<422, types.RetornaOUltimoStatusDeUmPedidoResponse422> 422
   * @throws FetchError<500, types.RetornaOUltimoStatusDeUmPedidoResponse500> 500
   */
  retornaOUltimoStatusDeUmPedido(metadata: types.RetornaOUltimoStatusDeUmPedidoMetadataParam): Promise<FetchResponse<200, types.RetornaOUltimoStatusDeUmPedidoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/status', 'get', metadata);
  }

  /**
   * Atualiza a situação do status do pedido
   *
   * @throws FetchError<422, types.AtualizaASituacaoDoStatusDoPedidoResponse422> 422
   * @throws FetchError<500, types.AtualizaASituacaoDoStatusDoPedidoResponse500> 500
   */
  atualizaASituacaoDoStatusDoPedido(body: types.AtualizaASituacaoDoStatusDoPedidoBodyParam, metadata: types.AtualizaASituacaoDoStatusDoPedidoMetadataParam): Promise<FetchResponse<200, types.AtualizaASituacaoDoStatusDoPedidoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/status', 'put', body, metadata);
  }

  /**
   * Lista de pedidos
   *
   * @summary Retorna os dados de rastreamento/nf de um pedido
   * @throws FetchError<422, types.RetornaOsDadosDeRastreamentonfDeUmPedidoResponse422> 422
   * @throws FetchError<500, types.RetornaOsDadosDeRastreamentonfDeUmPedidoResponse500> 500
   */
  retornaOsDadosDeRastreamentonfDeUmPedido(metadata: types.RetornaOsDadosDeRastreamentonfDeUmPedidoMetadataParam): Promise<FetchResponse<200, types.RetornaOsDadosDeRastreamentonfDeUmPedidoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/rastreamento', 'get', metadata);
  }

  /**
   * Insere um rastreamento e status a um pedido
   *
   * @throws FetchError<422, types.InsereUmRastreamentoEStatusAUmPedidoResponse422> 422
   * @throws FetchError<500, types.InsereUmRastreamentoEStatusAUmPedidoResponse500> 500
   */
  insereUmRastreamentoEStatusAUmPedido(body: types.InsereUmRastreamentoEStatusAUmPedidoBodyParam, metadata: types.InsereUmRastreamentoEStatusAUmPedidoMetadataParam): Promise<FetchResponse<200, types.InsereUmRastreamentoEStatusAUmPedidoResponse200>>;
  insereUmRastreamentoEStatusAUmPedido(metadata: types.InsereUmRastreamentoEStatusAUmPedidoMetadataParam): Promise<FetchResponse<200, types.InsereUmRastreamentoEStatusAUmPedidoResponse200>>;
  insereUmRastreamentoEStatusAUmPedido(body?: types.InsereUmRastreamentoEStatusAUmPedidoBodyParam | types.InsereUmRastreamentoEStatusAUmPedidoMetadataParam, metadata?: types.InsereUmRastreamentoEStatusAUmPedidoMetadataParam): Promise<FetchResponse<200, types.InsereUmRastreamentoEStatusAUmPedidoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/rastreamento', 'post', body, metadata);
  }

  /**
   * Atualiza a data de entrega do pedido
   *
   * @throws FetchError<422, types.AtualizaADataDeEntregaDoPedidoResponse422> 422
   * @throws FetchError<500, types.AtualizaADataDeEntregaDoPedidoResponse500> 500
   */
  atualizaADataDeEntregaDoPedido(body: types.AtualizaADataDeEntregaDoPedidoBodyParam, metadata: types.AtualizaADataDeEntregaDoPedidoMetadataParam): Promise<FetchResponse<200, types.AtualizaADataDeEntregaDoPedidoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/rastreamento', 'put', body, metadata);
  }

  /**
   * Atualiza rastreamento completo (com os dados da N.F.)
   *
   * @throws FetchError<422, types.AtualizaRastreamentoCompletoComOsDadosDaNfResponse422> 422
   * @throws FetchError<500, types.AtualizaRastreamentoCompletoComOsDadosDaNfResponse500> 500
   */
  atualizaRastreamentoCompletoComOsDadosDaNf(body: types.AtualizaRastreamentoCompletoComOsDadosDaNfBodyParam, metadata: types.AtualizaRastreamentoCompletoComOsDadosDaNfMetadataParam): Promise<FetchResponse<200, types.AtualizaRastreamentoCompletoComOsDadosDaNfResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/rastreamento/{pedidoRastreamentoId}', 'put', body, metadata);
  }

  /**
   * Atualiza rastreamento parcial (Rastreamento e UrlRastreamento)
   *
   * @throws FetchError<422, types.AtualizaRastreamentoParcialRastreamentoEUrlrastreamentoResponse422> 422
   * @throws FetchError<500, types.AtualizaRastreamentoParcialRastreamentoEUrlrastreamentoResponse500> 500
   */
  atualizaRastreamentoParcialRastreamentoEUrlrastreamento(body: types.AtualizaRastreamentoParcialRastreamentoEUrlrastreamentoBodyParam, metadata: types.AtualizaRastreamentoParcialRastreamentoEUrlrastreamentoMetadataParam): Promise<FetchResponse<200, types.AtualizaRastreamentoParcialRastreamentoEUrlrastreamentoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/rastreamento/{pedidoRastreamentoId}/parcial', 'put', body, metadata);
  }

  /**
   * Insere um rastreamento e status a um produto variante
   *
   * @throws FetchError<422, types.InsereUmRastreamentoEStatusAUmProdutoVarianteResponse422> 422
   * @throws FetchError<500, types.InsereUmRastreamentoEStatusAUmProdutoVarianteResponse500> 500
   */
  insereUmRastreamentoEStatusAUmProdutoVariante(body: types.InsereUmRastreamentoEStatusAUmProdutoVarianteBodyParam, metadata: types.InsereUmRastreamentoEStatusAUmProdutoVarianteMetadataParam): Promise<FetchResponse<200, types.InsereUmRastreamentoEStatusAUmProdutoVarianteResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/produtos/{produtoVarianteId}/rastreamento', 'post', body, metadata);
  }

  /**
   * Rastreamento de produto encontrado
   *
   * @summary Retorna um rastreamento de produto
   * @throws FetchError<422, types.RetornaUmRastreamentoDeProdutoResponse422> 422
   * @throws FetchError<500, types.RetornaUmRastreamentoDeProdutoResponse500> 500
   */
  retornaUmRastreamentoDeProduto(metadata: types.RetornaUmRastreamentoDeProdutoMetadataParam): Promise<FetchResponse<200, types.RetornaUmRastreamentoDeProdutoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/produtos/{produtoVarianteId}/rastreamento/{pedidoRastreamentoProdutoId}', 'get', metadata);
  }

  /**
   * Atualiza rastreamento de produto completo (com os dados da N.F.)
   *
   * @throws FetchError<422, types.AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfResponse422> 422
   * @throws FetchError<500, types.AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfResponse500> 500
   */
  atualizaRastreamentoDeProdutoCompletoComOsDadosDaNf(body: types.AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfBodyParam, metadata: types.AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfMetadataParam): Promise<FetchResponse<200, types.AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfResponse200>>;
  atualizaRastreamentoDeProdutoCompletoComOsDadosDaNf(metadata: types.AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfMetadataParam): Promise<FetchResponse<200, types.AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfResponse200>>;
  atualizaRastreamentoDeProdutoCompletoComOsDadosDaNf(body?: types.AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfBodyParam | types.AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfMetadataParam, metadata?: types.AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfMetadataParam): Promise<FetchResponse<200, types.AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/produtos/{produtoVarianteId}/rastreamento/{pedidoRastreamentoProdutoId}', 'put', body, metadata);
  }

  /**
   * Atualiza rastreamento parcial (Rastreamento e UrlRastreamento)
   *
   * @throws FetchError<422, types.AtualizaRastreamentoParcialRastreamentoEUrlrastreamento1Response422> 422
   * @throws FetchError<500, types.AtualizaRastreamentoParcialRastreamentoEUrlrastreamento1Response500> 500
   */
  atualizaRastreamentoParcialRastreamentoEUrlrastreamento1(body: types.AtualizaRastreamentoParcialRastreamentoEUrlrastreamento1BodyParam, metadata: types.AtualizaRastreamentoParcialRastreamentoEUrlrastreamento1MetadataParam): Promise<FetchResponse<200, types.AtualizaRastreamentoParcialRastreamentoEUrlrastreamento1Response200>> {
    return this.core.fetch('/pedidos/{pedidoId}/produtos/{produtoVarianteId}/rastreamento/{pedidoRastreamentoProdutoId}/parcial', 'put', body, metadata);
  }

  /**
   * Lista de pedidos
   *
   * @summary Retorna os dados de rastreamento/nf dos produtos de um pedido
   * @throws FetchError<422, types.RetornaOsDadosDeRastreamentonfDosProdutosDeUmPedidoResponse422> 422
   * @throws FetchError<500, types.RetornaOsDadosDeRastreamentonfDosProdutosDeUmPedidoResponse500> 500
   */
  retornaOsDadosDeRastreamentonfDosProdutosDeUmPedido(metadata: types.RetornaOsDadosDeRastreamentonfDosProdutosDeUmPedidoMetadataParam): Promise<FetchResponse<200, types.RetornaOsDadosDeRastreamentonfDosProdutosDeUmPedidoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/rastreamento/produtos', 'get', metadata);
  }

  /**
   * Atualiza a situação do status de um produto do pedido
   *
   * @throws FetchError<422, types.AtualizaASituacaoDoStatusDeUmProdutoDoPedidoResponse422> 422
   * @throws FetchError<500, types.AtualizaASituacaoDoStatusDeUmProdutoDoPedidoResponse500> 500
   */
  atualizaASituacaoDoStatusDeUmProdutoDoPedido(body: types.AtualizaASituacaoDoStatusDeUmProdutoDoPedidoBodyParam, metadata: types.AtualizaASituacaoDoStatusDeUmProdutoDoPedidoMetadataParam): Promise<FetchResponse<200, types.AtualizaASituacaoDoStatusDeUmProdutoDoPedidoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/{produtoVarianteId}/status', 'put', body, metadata);
  }

  /**
   * Dados de transação do pedido
   *
   * @summary Retorna os detalhes da transação de um pedido
   * @throws FetchError<422, types.RetornaOsDetalhesDaTransacaoDeUmPedidoResponse422> 422
   * @throws FetchError<500, types.RetornaOsDetalhesDaTransacaoDeUmPedidoResponse500> 500
   */
  retornaOsDetalhesDaTransacaoDeUmPedido(metadata: types.RetornaOsDetalhesDaTransacaoDeUmPedidoMetadataParam): Promise<FetchResponse<200, types.RetornaOsDetalhesDaTransacaoDeUmPedidoResponse200>> {
    return this.core.fetch('/pedidos/transacoes/{transacaoId}', 'get', metadata);
  }

  /**
   * Dados do serviço de frete do pedido
   *
   * @summary Retorna os detalhes do serviço de frete
   * @throws FetchError<422, types.RetornaOsDetalhesDoServicoDeFreteResponse422> 422
   * @throws FetchError<500, types.RetornaOsDetalhesDoServicoDeFreteResponse500> 500
   */
  retornaOsDetalhesDoServicoDeFrete(metadata: types.RetornaOsDetalhesDoServicoDeFreteMetadataParam): Promise<FetchResponse<200, types.RetornaOsDetalhesDoServicoDeFreteResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/frete', 'get', metadata);
  }

  /**
   * Liberar reservas de pedidos
   *
   * @throws FetchError<422, types.LiberarReservasDePedidosResponse422> 422
   * @throws FetchError<500, types.LiberarReservasDePedidosResponse500> 500
   */
  liberarReservasDePedidos(body: types.LiberarReservasDePedidosBodyParam): Promise<FetchResponse<200, types.LiberarReservasDePedidosResponse200>> {
    return this.core.fetch('/pedidos/liberarReservas', 'post', body);
  }

  /**
   * Lista de números de pedidos ainda não integrados
   *
   * @summary Busca pedidos que ainda não foram setado o complete
   * @throws FetchError<422, types.BuscaPedidosQueAindaNaoForamSetadoOCompleteResponse422> 422
   * @throws FetchError<500, types.BuscaPedidosQueAindaNaoForamSetadoOCompleteResponse500> 500
   */
  buscaPedidosQueAindaNaoForamSetadoOComplete(): Promise<FetchResponse<200, types.BuscaPedidosQueAindaNaoForamSetadoOCompleteResponse200>> {
    return this.core.fetch('/pedidos/naoIntegrados', 'get');
  }

  /**
   * Seta o pedido como integrado
   *
   * @throws FetchError<422, types.SetaOPedidoComoIntegradoResponse422> 422
   * @throws FetchError<500, types.SetaOPedidoComoIntegradoResponse500> 500
   */
  setaOPedidoComoIntegrado(body: types.SetaOPedidoComoIntegradoBodyParam): Promise<FetchResponse<200, types.SetaOPedidoComoIntegradoResponse200>> {
    return this.core.fetch('/pedidos/complete', 'post', body);
  }

  /**
   * Lista de observações de um pedido
   *
   * @summary Retorna a observação de um pedido
   * @throws FetchError<422, types.InseriUmaObservacaoAUmPedidoResponse422> 422
   * @throws FetchError<500, types.InseriUmaObservacaoAUmPedidoResponse500> 500
   */
  inseriUmaObservacaoAUmPedido(metadata: types.InseriUmaObservacaoAUmPedidoMetadataParam): Promise<FetchResponse<200, types.InseriUmaObservacaoAUmPedidoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/observacao', 'get', metadata);
  }

  /**
   * Insere uma observação a um pedido
   *
   * @throws FetchError<422, types.InseriUmaObservacaoAUmPedido1Response422> 422
   * @throws FetchError<500, types.InseriUmaObservacaoAUmPedido1Response500> 500
   */
  inseriUmaObservacaoAUmPedido1(body: types.InseriUmaObservacaoAUmPedido1BodyParam, metadata: types.InseriUmaObservacaoAUmPedido1MetadataParam): Promise<FetchResponse<200, types.InseriUmaObservacaoAUmPedido1Response200>> {
    return this.core.fetch('/pedidos/{pedidoId}/observacao', 'post', body, metadata);
  }

  /**
   * Atualiza o frete de todos os produtos de um pedido
   *
   * @throws FetchError<422, types.AtualizaOFreteDeTodosOsProdutosDeUmPedidoResponse422> 422
   * @throws FetchError<500, types.AtualizaOFreteDeTodosOsProdutosDeUmPedidoResponse500> 500
   */
  atualizaOFreteDeTodosOsProdutosDeUmPedido(body: types.AtualizaOFreteDeTodosOsProdutosDeUmPedidoBodyParam, metadata: types.AtualizaOFreteDeTodosOsProdutosDeUmPedidoMetadataParam): Promise<FetchResponse<200, types.AtualizaOFreteDeTodosOsProdutosDeUmPedidoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/changesellercompleto', 'put', body, metadata);
  }

  /**
   * Estorna um valor menor ou igual ao total do pedido "Pago"
   *
   * @summary Estorna total ou parcial de um pedido
   * @throws FetchError<400, types.EstornaTotalOuParcialDeUmPedidoResponse400> 400
   * @throws FetchError<500, types.EstornaTotalOuParcialDeUmPedidoResponse500> 500
   */
  estornaTotalOuParcialDeUmPedido(body: types.EstornaTotalOuParcialDeUmPedidoBodyParam, metadata: types.EstornaTotalOuParcialDeUmPedidoMetadataParam): Promise<FetchResponse<200, types.EstornaTotalOuParcialDeUmPedidoResponse200>>;
  estornaTotalOuParcialDeUmPedido(metadata: types.EstornaTotalOuParcialDeUmPedidoMetadataParam): Promise<FetchResponse<200, types.EstornaTotalOuParcialDeUmPedidoResponse200>>;
  estornaTotalOuParcialDeUmPedido(body?: types.EstornaTotalOuParcialDeUmPedidoBodyParam | types.EstornaTotalOuParcialDeUmPedidoMetadataParam, metadata?: types.EstornaTotalOuParcialDeUmPedidoMetadataParam): Promise<FetchResponse<200, types.EstornaTotalOuParcialDeUmPedidoResponse200>> {
    return this.core.fetch('/pedidos/estorno/{pedidoId}', 'post', body, metadata);
  }

  /**
   * Atualiza os produtos de um pedido
   *
   * @throws FetchError<422, types.AtualizaOsProdutosDeUmPedidoResponse422> 422
   * @throws FetchError<500, types.AtualizaOsProdutosDeUmPedidoResponse500> 500
   */
  atualizaOsProdutosDeUmPedido(body: types.AtualizaOsProdutosDeUmPedidoBodyParam, metadata: types.AtualizaOsProdutosDeUmPedidoMetadataParam): Promise<FetchResponse<200, types.AtualizaOsProdutosDeUmPedidoResponse200>>;
  atualizaOsProdutosDeUmPedido(metadata: types.AtualizaOsProdutosDeUmPedidoMetadataParam): Promise<FetchResponse<200, types.AtualizaOsProdutosDeUmPedidoResponse200>>;
  atualizaOsProdutosDeUmPedido(body?: types.AtualizaOsProdutosDeUmPedidoBodyParam | types.AtualizaOsProdutosDeUmPedidoMetadataParam, metadata?: types.AtualizaOsProdutosDeUmPedidoMetadataParam): Promise<FetchResponse<200, types.AtualizaOsProdutosDeUmPedidoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/changeordercompleto', 'put', body, metadata);
  }

  /**
   * Lista de portfolios
   *
   * @summary Retorna todos os portfolios
   * @throws FetchError<500, types.RetornaTodosOsPortfoliosResponse500> 500
   */
  retornaTodosOsPortfolios(): Promise<FetchResponse<200, types.RetornaTodosOsPortfoliosResponse200>> {
    return this.core.fetch('/portfolios', 'get');
  }

  /**
   * Insere um novo portfolio
   *
   * @throws FetchError<500, types.InsereUmNovoPortfolioResponse500> 500
   */
  insereUmNovoPortfolio(body?: types.InsereUmNovoPortfolioBodyParam): Promise<FetchResponse<201, types.InsereUmNovoPortfolioResponse201>> {
    return this.core.fetch('/portfolios', 'post', body);
  }

  /**
   * Deleta um portfolio
   *
   * @throws FetchError<500, types.DeletaUmPortfolioResponse500> 500
   */
  deletaUmPortfolio(metadata: types.DeletaUmPortfolioMetadataParam): Promise<FetchResponse<200, types.DeletaUmPortfolioResponse200>> {
    return this.core.fetch('/portfolios/{portfolioId}', 'delete', metadata);
  }

  /**
   * Portfolio encontrado
   *
   * @summary Retorna o portfolio pelo id
   * @throws FetchError<500, types.RetornaOPortfolioPeloIdResponse500> 500
   */
  retornaOPortfolioPeloId(metadata: types.RetornaOPortfolioPeloIdMetadataParam): Promise<FetchResponse<200, types.RetornaOPortfolioPeloIdResponse200>> {
    return this.core.fetch('/portfolios/{portfolioId}', 'get', metadata);
  }

  /**
   * Atualiza um portfolio
   *
   * @throws FetchError<500, types.AtualizaUmPortfolioResponse500> 500
   */
  atualizaUmPortfolio(body: types.AtualizaUmPortfolioBodyParam, metadata: types.AtualizaUmPortfolioMetadataParam): Promise<FetchResponse<200, types.AtualizaUmPortfolioResponse200>>;
  atualizaUmPortfolio(metadata: types.AtualizaUmPortfolioMetadataParam): Promise<FetchResponse<200, types.AtualizaUmPortfolioResponse200>>;
  atualizaUmPortfolio(body?: types.AtualizaUmPortfolioBodyParam | types.AtualizaUmPortfolioMetadataParam, metadata?: types.AtualizaUmPortfolioMetadataParam): Promise<FetchResponse<200, types.AtualizaUmPortfolioResponse200>> {
    return this.core.fetch('/portfolios/{portfolioId}', 'put', body, metadata);
  }

  /**
   * Portfolio encontrado
   *
   * @summary Retorna o portfolio pelo nome
   * @throws FetchError<500, types.RetornaOPortfolioPeloNomeResponse500> 500
   */
  retornaOPortfolioPeloNome(metadata: types.RetornaOPortfolioPeloNomeMetadataParam): Promise<FetchResponse<200, types.RetornaOPortfolioPeloNomeResponse200>> {
    return this.core.fetch('/portfolios/{nome}', 'get', metadata);
  }

  /**
   * Retorna a lista de produtos de um portfolio
   *
   * @summary Retorna a lista de produtos de um portfolio
   * @throws FetchError<500, types.RetornaAListaDeProdutosDeUmPortfolioResponse500> 500
   */
  retornaAListaDeProdutosDeUmPortfolio(metadata: types.RetornaAListaDeProdutosDeUmPortfolioMetadataParam): Promise<FetchResponse<200, types.RetornaAListaDeProdutosDeUmPortfolioResponse200>> {
    return this.core.fetch('/portfolios/{portfolioId}/produtos', 'get', metadata);
  }

  /**
   * Vinculo de produtos ao portfolio
   *
   * @throws FetchError<404, types.VinculoDeProdutosAoPortfolioResponse404> 404
   * @throws FetchError<500, types.VinculoDeProdutosAoPortfolioResponse500> 500
   */
  vinculoDeProdutosAoPortfolio(body: types.VinculoDeProdutosAoPortfolioBodyParam, metadata: types.VinculoDeProdutosAoPortfolioMetadataParam): Promise<FetchResponse<200, types.VinculoDeProdutosAoPortfolioResponse200>> {
    return this.core.fetch('/portfolios/{portfolioId}/produtos', 'put', body, metadata);
  }

  /**
   * Altera o status de um portfolio
   *
   * @throws FetchError<500, types.AlteraOStatusDeUmPortfolioResponse500> 500
   */
  alteraOStatusDeUmPortfolio(body: types.AlteraOStatusDeUmPortfolioBodyParam, metadata: types.AlteraOStatusDeUmPortfolioMetadataParam): Promise<FetchResponse<200, types.AlteraOStatusDeUmPortfolioResponse200>>;
  alteraOStatusDeUmPortfolio(metadata: types.AlteraOStatusDeUmPortfolioMetadataParam): Promise<FetchResponse<200, types.AlteraOStatusDeUmPortfolioResponse200>>;
  alteraOStatusDeUmPortfolio(body?: types.AlteraOStatusDeUmPortfolioBodyParam | types.AlteraOStatusDeUmPortfolioMetadataParam, metadata?: types.AlteraOStatusDeUmPortfolioMetadataParam): Promise<FetchResponse<200, types.AlteraOStatusDeUmPortfolioResponse200>> {
    return this.core.fetch('/portfolios/{portfolioId}/status', 'put', body, metadata);
  }

  /**
   * Lista de produtos
   *
   * @summary Retorna todos os produtos
   * @throws FetchError<500, types.RetornaTodosOsProdutosResponse500> 500
   */
  retornaTodosOsProdutos(metadata?: types.RetornaTodosOsProdutosMetadataParam): Promise<FetchResponse<200, types.RetornaTodosOsProdutosResponse200>> {
    return this.core.fetch('/produtos', 'get', metadata);
  }

  /**
   * Método que insere um produto na base
   *
   * @summary Adiciona novo produto
   * @throws FetchError<500, types.AdicionaNovoProdutoResponse500> 500
   */
  adicionaNovoProduto(body?: types.AdicionaNovoProdutoBodyParam): Promise<FetchResponse<201, types.AdicionaNovoProdutoResponse201>> {
    return this.core.fetch('/produtos', 'post', body);
  }

  /**
   * Deleta um conjunto de produtos por SKU ou ProdutoVarianteId
   *
   * @throws FetchError<400, types.DeletaUmConjuntoDeProdutosPorSkuOuProdutovarianteidResponse400> 400
   */
  deletaUmConjuntoDeProdutosPorSkuOuProdutovarianteid(body?: types.DeletaUmConjuntoDeProdutosPorSkuOuProdutovarianteidBodyParam, metadata?: types.DeletaUmConjuntoDeProdutosPorSkuOuProdutovarianteidMetadataParam): Promise<FetchResponse<200, types.DeletaUmConjuntoDeProdutosPorSkuOuProdutovarianteidResponse200>> {
    return this.core.fetch('/produtos', 'delete', body, metadata);
  }

  /**
   * Método responsável por retornar um produto específico buscando pelo seu identificador,
   * que pode ser um sku ou produto variante. O tipo do identificador pode ser definido no
   * campo tipoIdentificador. Também é possível informar quais informações adicionais devem
   * ser retornadas na consulta utilizando o campo campos adicionais.
   *
   * @summary Retorna um produto buscando pelo seu identificador
   * @throws FetchError<404, types.RetornaUmProdutoBuscandoPeloSeuIdentificadorResponse404> 404
   * @throws FetchError<422, types.RetornaUmProdutoBuscandoPeloSeuIdentificadorResponse422> 422
   * @throws FetchError<500, types.RetornaUmProdutoBuscandoPeloSeuIdentificadorResponse500> 500
   */
  retornaUmProdutoBuscandoPeloSeuIdentificador(metadata: types.RetornaUmProdutoBuscandoPeloSeuIdentificadorMetadataParam): Promise<FetchResponse<200, types.RetornaUmProdutoBuscandoPeloSeuIdentificadorResponse200>> {
    return this.core.fetch('/produtos/{identificador}', 'get', metadata);
  }

  /**
   * Atualiza parcialmente um produto
   *
   */
  atualizaParcialmenteUmProduto(body: types.AtualizaParcialmenteUmProdutoBodyParam, metadata: types.AtualizaParcialmenteUmProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaParcialmenteUmProdutoResponse200> | FetchResponse<206, types.AtualizaParcialmenteUmProdutoResponse206>>;
  atualizaParcialmenteUmProduto(metadata: types.AtualizaParcialmenteUmProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaParcialmenteUmProdutoResponse200> | FetchResponse<206, types.AtualizaParcialmenteUmProdutoResponse206>>;
  atualizaParcialmenteUmProduto(body?: types.AtualizaParcialmenteUmProdutoBodyParam | types.AtualizaParcialmenteUmProdutoMetadataParam, metadata?: types.AtualizaParcialmenteUmProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaParcialmenteUmProdutoResponse200> | FetchResponse<206, types.AtualizaParcialmenteUmProdutoResponse206>> {
    return this.core.fetch('/produtos/{identificador}', 'patch', body, metadata);
  }

  /**
   * Atualiza um produto com base nos dados enviados
   *
   * @summary Atualiza um produto
   * @throws FetchError<500, types.AtualizaUmProdutoResponse500> 500
   */
  atualizaUmProduto(body: types.AtualizaUmProdutoBodyParam, metadata: types.AtualizaUmProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmProdutoResponse200>>;
  atualizaUmProduto(metadata: types.AtualizaUmProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmProdutoResponse200>>;
  atualizaUmProduto(body?: types.AtualizaUmProdutoBodyParam | types.AtualizaUmProdutoMetadataParam, metadata?: types.AtualizaUmProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}', 'put', body, metadata);
  }

  /**
   * Retorna todos os identificadores dos produtos/variantes relacionados ao produto
   * pesquisado
   *
   * @summary Busca os produtos relacionados
   * @throws FetchError<404, types.BuscaOsProdutosRelacionadosResponse404> 404
   * @throws FetchError<500, types.BuscaOsProdutosRelacionadosResponse500> 500
   */
  buscaOsProdutosRelacionados(metadata: types.BuscaOsProdutosRelacionadosMetadataParam): Promise<FetchResponse<200, types.BuscaOsProdutosRelacionadosResponse200>> {
    return this.core.fetch('/produtos/{identificador}/relacionados', 'get', metadata);
  }

  /**
   * Lista de preços e estoque de produtos que sofreram alterações
   *
   * @summary Retorna todos os produtos
   * @throws FetchError<500, types.RetornaTodosOsProdutos1Response500> 500
   */
  retornaTodosOsProdutos1(metadata?: types.RetornaTodosOsProdutos1MetadataParam): Promise<FetchResponse<200, types.RetornaTodosOsProdutos1Response200>> {
    return this.core.fetch('/produtos/alteracoes', 'get', metadata);
  }

  /**
   * Atualiza a data de cadastro um produto com base nos dados enviados
   *
   * @summary Atualiza a data de cadastro de um produto
   * @throws FetchError<404, types.AtualizaADataDeCadastroDeUmProdutoResponse404> 404
   * @throws FetchError<500, types.AtualizaADataDeCadastroDeUmProdutoResponse500> 500
   */
  atualizaADataDeCadastroDeUmProduto(body: types.AtualizaADataDeCadastroDeUmProdutoBodyParam, metadata: types.AtualizaADataDeCadastroDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaADataDeCadastroDeUmProdutoResponse200>>;
  atualizaADataDeCadastroDeUmProduto(metadata: types.AtualizaADataDeCadastroDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaADataDeCadastroDeUmProdutoResponse200>>;
  atualizaADataDeCadastroDeUmProduto(body?: types.AtualizaADataDeCadastroDeUmProdutoBodyParam | types.AtualizaADataDeCadastroDeUmProdutoMetadataParam, metadata?: types.AtualizaADataDeCadastroDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaADataDeCadastroDeUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/DataCadastro', 'put', body, metadata);
  }

  /**
   * Atualiza o estoque de vários produtos com base na lista enviada. Limite de 50 produtos
   * por requisição
   *
   * @summary Atualiza o estoque de vários produtos
   * @throws FetchError<422, types.AtualizaOEstoqueDeVariosProdutosResponse422> Unprocessable Entity
   * @throws FetchError<500, types.AtualizaOEstoqueDeVariosProdutosResponse500> 500
   */
  atualizaOEstoqueDeVariosProdutos(body: types.AtualizaOEstoqueDeVariosProdutosBodyParam, metadata?: types.AtualizaOEstoqueDeVariosProdutosMetadataParam): Promise<FetchResponse<200, types.AtualizaOEstoqueDeVariosProdutosResponse200>> {
    return this.core.fetch('/produtos/estoques', 'put', body, metadata);
  }

  /**
   * Atualiza o preço de vários produtos com base na lista enviada. Limite de 50 produtos por
   * requisição
   *
   * @summary Atualiza o preço de vários produtos
   * @throws FetchError<500, types.AtualizaOPrecoDeVariosProdutosResponse500> 500
   */
  atualizaOPrecoDeVariosProdutos(body: types.AtualizaOPrecoDeVariosProdutosBodyParam, metadata?: types.AtualizaOPrecoDeVariosProdutosMetadataParam): Promise<FetchResponse<200, types.AtualizaOPrecoDeVariosProdutosResponse200>> {
    return this.core.fetch('/produtos/precos', 'put', body, metadata);
  }

  /**
   * Atualiza para o mesmo preço, todos os variantes de um produto encontrado com o SKU
   * informado. Limite de 50 produtos por requisição
   *
   * @summary Atualiza para o mesmo preço, todos os variantes de um produto encontrado com o SKU
   * informado
   * @throws FetchError<500, types.AtualizaParaOMesmoPrecoTodosOsVariantesDeUmProdutoEncontradoComOSkuInformadoResponse500> 500
   */
  atualizaParaOMesmoPrecoTodosOsVariantesDeUmProdutoEncontradoComOSkuInformado(body: types.AtualizaParaOMesmoPrecoTodosOsVariantesDeUmProdutoEncontradoComOSkuInformadoBodyParam): Promise<FetchResponse<200, types.AtualizaParaOMesmoPrecoTodosOsVariantesDeUmProdutoEncontradoComOSkuInformadoResponse200>> {
    return this.core.fetch('/produtos/precos/lote', 'put', body);
  }

  /**
   * Retorna a situação reseller de um produto
   *
   * @throws FetchError<404, types.RetornaASituacaoResellerDeUmProdutoResponse404> 404
   * @throws FetchError<500, types.RetornaASituacaoResellerDeUmProdutoResponse500> 500
   */
  retornaASituacaoResellerDeUmProduto(metadata: types.RetornaASituacaoResellerDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.RetornaASituacaoResellerDeUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/situacaoReseller', 'get', metadata);
  }

  /**
   * Atualiza o prazo de entrega de vários produtos
   *
   * @throws FetchError<400, types.AtualizaOPrazoDeEntregaDeVRiosProdutosResponse400> 400
   * @throws FetchError<422, types.AtualizaOPrazoDeEntregaDeVRiosProdutosResponse422> 422
   */
  atualizaOPrazoDeEntregaDeVRiosProdutos(body?: types.AtualizaOPrazoDeEntregaDeVRiosProdutosBodyParam, metadata?: types.AtualizaOPrazoDeEntregaDeVRiosProdutosMetadataParam): Promise<FetchResponse<200, types.AtualizaOPrazoDeEntregaDeVRiosProdutosResponse200>> {
    return this.core.fetch('/produtos/prazosEntrega', 'put', body, metadata);
  }

  /**
   * Atualiza a data de cadastro de vários produtos
   *
   * @throws FetchError<422, types.AtualizaADataDeCadastroDeVRiosProdutosResponse422> 422
   * @throws FetchError<500, types.AtualizaADataDeCadastroDeVRiosProdutosResponse500> 500
   */
  atualizaADataDeCadastroDeVRiosProdutos(body?: types.AtualizaADataDeCadastroDeVRiosProdutosBodyParam, metadata?: types.AtualizaADataDeCadastroDeVRiosProdutosMetadataParam): Promise<FetchResponse<200, types.AtualizaADataDeCadastroDeVRiosProdutosResponse200>> {
    return this.core.fetch('/produtos/datasCadastro', 'put', body, metadata);
  }

  /**
   * Retorna todas as informações de um produto específico
   *
   * @summary Retorna todas as informações de um produto
   * @throws FetchError<404, types.RetornaTodasAsInformacoesDeUmProdutoResponse404> 404
   * @throws FetchError<500, types.RetornaTodasAsInformacoesDeUmProdutoResponse500> 500
   */
  retornaTodasAsInformacoesDeUmProduto(metadata: types.RetornaTodasAsInformacoesDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.RetornaTodasAsInformacoesDeUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/informacoes', 'get', metadata);
  }

  /**
   * Adiciona uma nova informação
   *
   * @throws FetchError<404, types.AdicionaUmaNovaInformacaoResponse404> 404
   * @throws FetchError<500, types.AdicionaUmaNovaInformacaoResponse500> 500
   */
  adicionaUmaNovaInformacao(body: types.AdicionaUmaNovaInformacaoBodyParam, metadata: types.AdicionaUmaNovaInformacaoMetadataParam): Promise<FetchResponse<200, types.AdicionaUmaNovaInformacaoResponse200>>;
  adicionaUmaNovaInformacao(metadata: types.AdicionaUmaNovaInformacaoMetadataParam): Promise<FetchResponse<200, types.AdicionaUmaNovaInformacaoResponse200>>;
  adicionaUmaNovaInformacao(body?: types.AdicionaUmaNovaInformacaoBodyParam | types.AdicionaUmaNovaInformacaoMetadataParam, metadata?: types.AdicionaUmaNovaInformacaoMetadataParam): Promise<FetchResponse<200, types.AdicionaUmaNovaInformacaoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/informacoes', 'post', body, metadata);
  }

  /**
   * Exclui uma informação de um produto
   *
   * @throws FetchError<404, types.ExcluiUmaInformacaoDeUmProdutoResponse404> 404
   * @throws FetchError<500, types.ExcluiUmaInformacaoDeUmProdutoResponse500> 500
   */
  excluiUmaInformacaoDeUmProduto(metadata: types.ExcluiUmaInformacaoDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.ExcluiUmaInformacaoDeUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/informacoes/{informacaoId}', 'delete', metadata);
  }

  /**
   * Atualiza uma informação de um produto específico
   *
   * @summary Atualiza uma informação de um produto
   * @throws FetchError<404, types.AtualizaUmaInformacaoDeUmProdutoResponse404> 404
   * @throws FetchError<500, types.AtualizaUmaInformacaoDeUmProdutoResponse500> 500
   */
  atualizaUmaInformacaoDeUmProduto(body: types.AtualizaUmaInformacaoDeUmProdutoBodyParam, metadata: types.AtualizaUmaInformacaoDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaInformacaoDeUmProdutoResponse200>>;
  atualizaUmaInformacaoDeUmProduto(metadata: types.AtualizaUmaInformacaoDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaInformacaoDeUmProdutoResponse200>>;
  atualizaUmaInformacaoDeUmProduto(body?: types.AtualizaUmaInformacaoDeUmProdutoBodyParam | types.AtualizaUmaInformacaoDeUmProdutoMetadataParam, metadata?: types.AtualizaUmaInformacaoDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaInformacaoDeUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/informacoes/{informacaoId}', 'put', body, metadata);
  }

  /**
   * Lista de categorias de um produto
   *
   * @summary Retorna todas as categorias de um produto
   * @throws FetchError<404, types.RetornaTodasAsCategoriasDeUmProdutoResponse404> 404
   * @throws FetchError<500, types.RetornaTodasAsCategoriasDeUmProdutoResponse500> 500
   */
  retornaTodasAsCategoriasDeUmProduto(metadata: types.RetornaTodasAsCategoriasDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.RetornaTodasAsCategoriasDeUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/categorias', 'get', metadata);
  }

  /**
   * Adiciona o vínculo entre um produto e uma categoria com base na lista enviada
   *
   * @summary Adiciona o vínculo entre um produto e uma categoria
   * @throws FetchError<404, types.AdicionaOVinculoEntreUmProdutoEUmaCategoriaResponse404> 404
   * @throws FetchError<500, types.AdicionaOVinculoEntreUmProdutoEUmaCategoriaResponse500> 500
   */
  adicionaOVinculoEntreUmProdutoEUmaCategoria(body: types.AdicionaOVinculoEntreUmProdutoEUmaCategoriaBodyParam, metadata: types.AdicionaOVinculoEntreUmProdutoEUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.AdicionaOVinculoEntreUmProdutoEUmaCategoriaResponse200>>;
  adicionaOVinculoEntreUmProdutoEUmaCategoria(metadata: types.AdicionaOVinculoEntreUmProdutoEUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.AdicionaOVinculoEntreUmProdutoEUmaCategoriaResponse200>>;
  adicionaOVinculoEntreUmProdutoEUmaCategoria(body?: types.AdicionaOVinculoEntreUmProdutoEUmaCategoriaBodyParam | types.AdicionaOVinculoEntreUmProdutoEUmaCategoriaMetadataParam, metadata?: types.AdicionaOVinculoEntreUmProdutoEUmaCategoriaMetadataParam): Promise<FetchResponse<200, types.AdicionaOVinculoEntreUmProdutoEUmaCategoriaResponse200>> {
    return this.core.fetch('/produtos/{identificador}/categorias', 'post', body, metadata);
  }

  /**
   * Exclui o vínculo entre uma categoria e um produto
   *
   * @throws FetchError<404, types.ExcluiOVinculoEntreUmaCategoriaEUmProdutoResponse404> 404
   * @throws FetchError<500, types.ExcluiOVinculoEntreUmaCategoriaEUmProdutoResponse500> 500
   */
  excluiOVinculoEntreUmaCategoriaEUmProduto(metadata: types.ExcluiOVinculoEntreUmaCategoriaEUmProdutoMetadataParam): Promise<FetchResponse<200, types.ExcluiOVinculoEntreUmaCategoriaEUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/categorias/{id}', 'delete', metadata);
  }

  /**
   * Define uma categoria de um produto como principal
   *
   * @throws FetchError<404, types.DefineUmaCategoriaDeUmProdutoComoPrincipalResponse404> 404
   * @throws FetchError<500, types.DefineUmaCategoriaDeUmProdutoComoPrincipalResponse500> 500
   */
  defineUmaCategoriaDeUmProdutoComoPrincipal(body: types.DefineUmaCategoriaDeUmProdutoComoPrincipalBodyParam, metadata: types.DefineUmaCategoriaDeUmProdutoComoPrincipalMetadataParam): Promise<FetchResponse<200, types.DefineUmaCategoriaDeUmProdutoComoPrincipalResponse200>>;
  defineUmaCategoriaDeUmProdutoComoPrincipal(metadata: types.DefineUmaCategoriaDeUmProdutoComoPrincipalMetadataParam): Promise<FetchResponse<200, types.DefineUmaCategoriaDeUmProdutoComoPrincipalResponse200>>;
  defineUmaCategoriaDeUmProdutoComoPrincipal(body?: types.DefineUmaCategoriaDeUmProdutoComoPrincipalBodyParam | types.DefineUmaCategoriaDeUmProdutoComoPrincipalMetadataParam, metadata?: types.DefineUmaCategoriaDeUmProdutoComoPrincipalMetadataParam): Promise<FetchResponse<200, types.DefineUmaCategoriaDeUmProdutoComoPrincipalResponse200>> {
    return this.core.fetch('/produtos/{identificador}/categoriaPrincipal', 'put', body, metadata);
  }

  /**
   * Lista de imagens vinculadas a um produtos
   *
   * @summary Retorna uma lista de imagens de um produto
   * @throws FetchError<404, types.RetornaUmaListaDeImagensDeUmProdutoResponse404> 404
   * @throws FetchError<500, types.RetornaUmaListaDeImagensDeUmProdutoResponse500> 500
   */
  retornaUmaListaDeImagensDeUmProduto(metadata: types.RetornaUmaListaDeImagensDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaDeImagensDeUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/imagens', 'get', metadata);
  }

  /**
   * Adiciona uma nova imagem vinculada a um produto
   *
   * @throws FetchError<404, types.AdicionaUmaNovaImagemVinculadaAUmProdutoResponse404> 404
   * @throws FetchError<500, types.AdicionaUmaNovaImagemVinculadaAUmProdutoResponse500> 500
   */
  adicionaUmaNovaImagemVinculadaAUmProduto(body: types.AdicionaUmaNovaImagemVinculadaAUmProdutoBodyParam, metadata: types.AdicionaUmaNovaImagemVinculadaAUmProdutoMetadataParam): Promise<FetchResponse<200, types.AdicionaUmaNovaImagemVinculadaAUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/imagens', 'post', body, metadata);
  }

  /**
   * Atualiza a imagem de estampa do produto
   *
   * @throws FetchError<404, types.AtualizaAImagemDeEstampaDoProdutoResponse404> 404
   * @throws FetchError<500, types.AtualizaAImagemDeEstampaDoProdutoResponse500> 500
   */
  atualizaAImagemDeEstampaDoProduto(body: types.AtualizaAImagemDeEstampaDoProdutoBodyParam, metadata: types.AtualizaAImagemDeEstampaDoProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaAImagemDeEstampaDoProdutoResponse200>>;
  atualizaAImagemDeEstampaDoProduto(metadata: types.AtualizaAImagemDeEstampaDoProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaAImagemDeEstampaDoProdutoResponse200>>;
  atualizaAImagemDeEstampaDoProduto(body?: types.AtualizaAImagemDeEstampaDoProdutoBodyParam | types.AtualizaAImagemDeEstampaDoProdutoMetadataParam, metadata?: types.AtualizaAImagemDeEstampaDoProdutoMetadataParam): Promise<FetchResponse<200, types.AtualizaAImagemDeEstampaDoProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/imagens/estampa', 'put', body, metadata);
  }

  /**
   * Retorna se o produto variante está disponível ou não
   *
   * @throws FetchError<404, types.RetornaSeOProdutoVarianteEstaDisponivelOuNaoResponse404> 404
   * @throws FetchError<500, types.RetornaSeOProdutoVarianteEstaDisponivelOuNaoResponse500> 500
   */
  retornaSeOProdutoVarianteEstaDisponivelOuNao(metadata: types.RetornaSeOProdutoVarianteEstaDisponivelOuNaoMetadataParam): Promise<FetchResponse<200, types.RetornaSeOProdutoVarianteEstaDisponivelOuNaoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/disponibilidade', 'get', metadata);
  }

  /**
   * Exclui uma imagem de um produto
   *
   * @throws FetchError<404, types.ExcluiUmaImagemDeUmProdutoResponse404> 404
   * @throws FetchError<500, types.ExcluiUmaImagemDeUmProdutoResponse500> 500
   */
  excluiUmaImagemDeUmProduto(metadata: types.ExcluiUmaImagemDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.ExcluiUmaImagemDeUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/imagens/{id}', 'delete', metadata);
  }

  /**
   * Objeto com o precoDe e precoPor de um produto variante
   *
   * @summary Retorna o precoDe e precoPor de um produto
   * @throws FetchError<404, types.RetornaOPrecodeEPrecoporDeUmProdutoResponse404> 404
   * @throws FetchError<500, types.RetornaOPrecodeEPrecoporDeUmProdutoResponse500> 500
   */
  retornaOPrecodeEPrecoporDeUmProduto(metadata: types.RetornaOPrecodeEPrecoporDeUmProdutoMetadataParam): Promise<FetchResponse<200, types.RetornaOPrecodeEPrecoporDeUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/preco', 'get', metadata);
  }

  /**
   * Objeto com o estoque total e o estoque por centro de distribuição de um produto variante
   *
   * @summary Retorna o estoque total e o estoque por centro de distribuição
   * @throws FetchError<404, types.RetornaOEstoqueTotalEoEstoquePorCentroDeDistribuicaoResponse404> 404
   * @throws FetchError<500, types.RetornaOEstoqueTotalEoEstoquePorCentroDeDistribuicaoResponse500> 500
   */
  retornaOEstoqueTotalEOEstoquePorCentroDeDistribuicao(metadata: types.RetornaOEstoqueTotalEoEstoquePorCentroDeDistribuicaoMetadataParam): Promise<FetchResponse<200, types.RetornaOEstoqueTotalEoEstoquePorCentroDeDistribuicaoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/estoque', 'get', metadata);
  }

  /**
   * Lista de avaliações de produtos
   *
   * @summary Retorna uma lista de avaliações referente ao identificador informado
   * @throws FetchError<422, types.RetornaUmaListaDeAvaliacoesReferenteAoIdentificadorInformadoResponse422> 422
   * @throws FetchError<500, types.RetornaUmaListaDeAvaliacoesReferenteAoIdentificadorInformadoResponse500> 500
   */
  retornaUmaListaDeAvaliacoesReferenteAoIdentificadorInformado(metadata: types.RetornaUmaListaDeAvaliacoesReferenteAoIdentificadorInformadoMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaDeAvaliacoesReferenteAoIdentificadorInformadoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/avaliacoes', 'get', metadata);
  }

  /**
   * Lista de Atacarejos
   *
   * @summary Retorna Lista de Atacarejos do Produto Variante
   * @throws FetchError<422, types.RetornaListaDeAtacarejosDoProdutoVarianteResponse422> 422
   * @throws FetchError<500, types.RetornaListaDeAtacarejosDoProdutoVarianteResponse500> 500
   */
  retornaListaDeAtacarejosDoProdutoVariante(metadata: types.RetornaListaDeAtacarejosDoProdutoVarianteMetadataParam): Promise<FetchResponse<200, types.RetornaListaDeAtacarejosDoProdutoVarianteResponse200>> {
    return this.core.fetch('/produtos/{identificador}/atacarejo', 'get', metadata);
  }

  /**
   * Adiciona novos Atacarejos
   *
   * @throws FetchError<422, types.AdicionaNovosAtacarejosResponse422> 422
   * @throws FetchError<500, types.AdicionaNovosAtacarejosResponse500> 500
   */
  adicionaNovosAtacarejos(body: types.AdicionaNovosAtacarejosBodyParam, metadata: types.AdicionaNovosAtacarejosMetadataParam): Promise<FetchResponse<200, types.AdicionaNovosAtacarejosResponse200>> {
    return this.core.fetch('/produtos/{identificador}/atacarejo', 'post', body, metadata);
  }

  /**
   * Remove um Atacarejo
   *
   * @throws FetchError<422, types.RemoveUmAtacarejoResponse422> 422
   * @throws FetchError<500, types.RemoveUmAtacarejoResponse500> 500
   */
  removeUmAtacarejo(metadata: types.RemoveUmAtacarejoMetadataParam): Promise<FetchResponse<200, types.RemoveUmAtacarejoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/atacarejo/{produtoVarianteAtacadoId}', 'delete', metadata);
  }

  /**
   * Atacarejo
   *
   * @summary Retorna um Atacarejo pelo Id
   * @throws FetchError<422, types.RetornaUmAtacarejoPeloIdResponse422> 422
   * @throws FetchError<500, types.RetornaUmAtacarejoPeloIdResponse500> 500
   */
  retornaUmAtacarejoPeloId(metadata: types.RetornaUmAtacarejoPeloIdMetadataParam): Promise<FetchResponse<200, types.RetornaUmAtacarejoPeloIdResponse200>> {
    return this.core.fetch('/produtos/{identificador}/atacarejo/{produtoVarianteAtacadoId}', 'get', metadata);
  }

  /**
   * Atualiza um Atacarejo
   *
   * @throws FetchError<422, types.AtualizaUmAtacarejoResponse422> 422
   * @throws FetchError<500, types.AtualizaUmAtacarejoResponse500> 500
   */
  atualizaUmAtacarejo(body: types.AtualizaUmAtacarejoBodyParam, metadata: types.AtualizaUmAtacarejoMetadataParam): Promise<FetchResponse<201, types.AtualizaUmAtacarejoResponse201>>;
  atualizaUmAtacarejo(metadata: types.AtualizaUmAtacarejoMetadataParam): Promise<FetchResponse<201, types.AtualizaUmAtacarejoResponse201>>;
  atualizaUmAtacarejo(body?: types.AtualizaUmAtacarejoBodyParam | types.AtualizaUmAtacarejoMetadataParam, metadata?: types.AtualizaUmAtacarejoMetadataParam): Promise<FetchResponse<201, types.AtualizaUmAtacarejoResponse201>> {
    return this.core.fetch('/produtos/{identificador}/atacarejo/{produtoVarianteAtacadoId}', 'put', body, metadata);
  }

  /**
   * Seta identificador como variante principal
   *
   * @summary Seta identificador como variante principal
   * @throws FetchError<404, types.SetaIdentificadorComoVariantePrincipalResponse404> 404
   * @throws FetchError<500, types.SetaIdentificadorComoVariantePrincipalResponse500> 500
   */
  setaIdentificadorComoVariantePrincipal(metadata: types.SetaIdentificadorComoVariantePrincipalMetadataParam): Promise<FetchResponse<200, types.SetaIdentificadorComoVariantePrincipalResponse200>> {
    return this.core.fetch('/produtos/{identificador}/principal', 'put', metadata);
  }

  /**
   * Seta status do produto variante como ativo ou inativo
   *
   * @summary Seta status ativo/inativo do produto variante
   * @throws FetchError<404, types.SetaStatusAtivoinativoDoProdutoVarianteResponse404> 404
   * @throws FetchError<500, types.SetaStatusAtivoinativoDoProdutoVarianteResponse500> 500
   */
  setaStatusAtivoinativoDoProdutoVariante(body: types.SetaStatusAtivoinativoDoProdutoVarianteBodyParam, metadata: types.SetaStatusAtivoinativoDoProdutoVarianteMetadataParam): Promise<FetchResponse<200, types.SetaStatusAtivoinativoDoProdutoVarianteResponse200>>;
  setaStatusAtivoinativoDoProdutoVariante(metadata: types.SetaStatusAtivoinativoDoProdutoVarianteMetadataParam): Promise<FetchResponse<200, types.SetaStatusAtivoinativoDoProdutoVarianteResponse200>>;
  setaStatusAtivoinativoDoProdutoVariante(body?: types.SetaStatusAtivoinativoDoProdutoVarianteBodyParam | types.SetaStatusAtivoinativoDoProdutoVarianteMetadataParam, metadata?: types.SetaStatusAtivoinativoDoProdutoVarianteMetadataParam): Promise<FetchResponse<200, types.SetaStatusAtivoinativoDoProdutoVarianteResponse200>> {
    return this.core.fetch('/produtos/{identificador}/situacao', 'put', body, metadata);
  }

  /**
   * Preços do produto variante informado
   *
   * @summary Retorna todos os preços referente ao produto variante, incluindo os preços de tabela de
   * preço
   * @throws FetchError<404, types.RetornaTodosOsPrecosReferenteAoProdutoVarianteIncluindoOsPrecosDeTabelaDePrecoResponse404> 404
   * @throws FetchError<500, types.RetornaTodosOsPrecosReferenteAoProdutoVarianteIncluindoOsPrecosDeTabelaDePrecoResponse500> 500
   */
  retornaTodosOsPrecosReferenteAoProdutoVarianteIncluindoOsPrecosDeTabelaDePreco(metadata: types.RetornaTodosOsPrecosReferenteAoProdutoVarianteIncluindoOsPrecosDeTabelaDePrecoMetadataParam): Promise<FetchResponse<200, types.RetornaTodosOsPrecosReferenteAoProdutoVarianteIncluindoOsPrecosDeTabelaDePrecoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/precos', 'get', metadata);
  }

  /**
   * Deleta o SEO de um produto específico
   *
   * @throws FetchError<500, types.DeletaOSeoDeUmProdutoEspecificoResponse500> 500
   */
  deletaOSeoDeUmProdutoEspecifico(metadata: types.DeletaOSeoDeUmProdutoEspecificoMetadataParam): Promise<FetchResponse<200, types.DeletaOSeoDeUmProdutoEspecificoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/seo', 'delete', metadata);
  }

  /**
   * SEO do produto informado
   *
   * @summary Busca o SEO de um produto específico
   * @throws FetchError<500, types.BuscaOSeoDeUmProdutoEspecificoResponse500> 500
   */
  buscaOSeoDeUmProdutoEspecifico(metadata: types.BuscaOSeoDeUmProdutoEspecificoMetadataParam): Promise<FetchResponse<200, types.BuscaOSeoDeUmProdutoEspecificoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/seo', 'get', metadata);
  }

  /**
   * Insere um SEO para um produto específico
   *
   * @throws FetchError<500, types.InsereUmSeoParaUmProdutoEspecificoResponse500> 500
   */
  insereUmSeoParaUmProdutoEspecifico(body: types.InsereUmSeoParaUmProdutoEspecificoBodyParam, metadata: types.InsereUmSeoParaUmProdutoEspecificoMetadataParam): Promise<FetchResponse<200, types.InsereUmSeoParaUmProdutoEspecificoResponse200>>;
  insereUmSeoParaUmProdutoEspecifico(metadata: types.InsereUmSeoParaUmProdutoEspecificoMetadataParam): Promise<FetchResponse<200, types.InsereUmSeoParaUmProdutoEspecificoResponse200>>;
  insereUmSeoParaUmProdutoEspecifico(body?: types.InsereUmSeoParaUmProdutoEspecificoBodyParam | types.InsereUmSeoParaUmProdutoEspecificoMetadataParam, metadata?: types.InsereUmSeoParaUmProdutoEspecificoMetadataParam): Promise<FetchResponse<200, types.InsereUmSeoParaUmProdutoEspecificoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/seo', 'post', body, metadata);
  }

  /**
   * Atualiza um SEO de um produto específico
   *
   * @throws FetchError<500, types.AtualizaUmSeoDeUmProdutoEspecificoResponse500> 500
   */
  atualizaUmSeoDeUmProdutoEspecifico(body: types.AtualizaUmSeoDeUmProdutoEspecificoBodyParam, metadata: types.AtualizaUmSeoDeUmProdutoEspecificoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmSeoDeUmProdutoEspecificoResponse200>>;
  atualizaUmSeoDeUmProdutoEspecifico(metadata: types.AtualizaUmSeoDeUmProdutoEspecificoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmSeoDeUmProdutoEspecificoResponse200>>;
  atualizaUmSeoDeUmProdutoEspecifico(body?: types.AtualizaUmSeoDeUmProdutoEspecificoBodyParam | types.AtualizaUmSeoDeUmProdutoEspecificoMetadataParam, metadata?: types.AtualizaUmSeoDeUmProdutoEspecificoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmSeoDeUmProdutoEspecificoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/seo', 'put', body, metadata);
  }

  /**
   * Deleta um ou mais Metatags de produto
   *
   * @throws FetchError<500, types.DeletaUmOuMaisMetatagsDeProdutoResponse500> 500
   */
  deletaUmOuMaisMetatagsDeProduto(body: types.DeletaUmOuMaisMetatagsDeProdutoBodyParam, metadata: types.DeletaUmOuMaisMetatagsDeProdutoMetadataParam): Promise<FetchResponse<200, types.DeletaUmOuMaisMetatagsDeProdutoResponse200>>;
  deletaUmOuMaisMetatagsDeProduto(metadata: types.DeletaUmOuMaisMetatagsDeProdutoMetadataParam): Promise<FetchResponse<200, types.DeletaUmOuMaisMetatagsDeProdutoResponse200>>;
  deletaUmOuMaisMetatagsDeProduto(body?: types.DeletaUmOuMaisMetatagsDeProdutoBodyParam | types.DeletaUmOuMaisMetatagsDeProdutoMetadataParam, metadata?: types.DeletaUmOuMaisMetatagsDeProdutoMetadataParam): Promise<FetchResponse<200, types.DeletaUmOuMaisMetatagsDeProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/seo/metaTag', 'delete', body, metadata);
  }

  /**
   * Lista de Metatags do produto informado
   *
   * @summary Busca os metatags de um produto específico
   * @throws FetchError<500, types.BuscaOsMetatagsDeUmProdutoEspecificoResponse500> 500
   */
  buscaOsMetatagsDeUmProdutoEspecifico(metadata: types.BuscaOsMetatagsDeUmProdutoEspecificoMetadataParam): Promise<FetchResponse<200, types.BuscaOsMetatagsDeUmProdutoEspecificoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/seo/metaTag', 'get', metadata);
  }

  /**
   * Insere um ou mais metatags para um produto
   *
   * @throws FetchError<500, types.InsereUmOuMaisMetatagsParaUmProdutoResponse500> 500
   */
  insereUmOuMaisMetatagsParaUmProduto(body: types.InsereUmOuMaisMetatagsParaUmProdutoBodyParam, metadata: types.InsereUmOuMaisMetatagsParaUmProdutoMetadataParam): Promise<FetchResponse<200, types.InsereUmOuMaisMetatagsParaUmProdutoResponse200>>;
  insereUmOuMaisMetatagsParaUmProduto(metadata: types.InsereUmOuMaisMetatagsParaUmProdutoMetadataParam): Promise<FetchResponse<200, types.InsereUmOuMaisMetatagsParaUmProdutoResponse200>>;
  insereUmOuMaisMetatagsParaUmProduto(body?: types.InsereUmOuMaisMetatagsParaUmProdutoBodyParam | types.InsereUmOuMaisMetatagsParaUmProdutoMetadataParam, metadata?: types.InsereUmOuMaisMetatagsParaUmProdutoMetadataParam): Promise<FetchResponse<200, types.InsereUmOuMaisMetatagsParaUmProdutoResponse200>> {
    return this.core.fetch('/produtos/{identificador}/seo/metaTag', 'post', body, metadata);
  }

  /**
   * Atualiza a ordem de exibição dos produtos nas categorias
   *
   * @throws FetchError<400, types.AtualizaAOrdemDeExibiODosProdutosNasCategoriasResponse400> 400
   */
  atualizaAOrdemDeExibiODosProdutosNasCategorias(body?: types.AtualizaAOrdemDeExibiODosProdutosNasCategoriasBodyParam): Promise<FetchResponse<200, types.AtualizaAOrdemDeExibiODosProdutosNasCategoriasResponse200>> {
    return this.core.fetch('/produtos/categorias/ordem/lote', 'put', body);
  }

  /**
   * Lista de avaliações de produtos
   *
   * @summary Retorna todas as avaliações dos produtos variantes da loja
   * @throws FetchError<422, types.RetornaTodasAsAvaliacoesDosProdutosVariantesDaLojaResponse422> 422
   * @throws FetchError<500, types.RetornaTodasAsAvaliacoesDosProdutosVariantesDaLojaResponse500> 500
   */
  retornaTodasAsAvaliacoesDosProdutosVariantesDaLoja(metadata?: types.RetornaTodasAsAvaliacoesDosProdutosVariantesDaLojaMetadataParam): Promise<FetchResponse<200, types.RetornaTodasAsAvaliacoesDosProdutosVariantesDaLojaResponse200>> {
    return this.core.fetch('/produtoavaliacao', 'get', metadata);
  }

  /**
   * Atualiza o status de uma avaliação de um produto variante
   *
   * @throws FetchError<422, types.AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteResponse422> 422
   * @throws FetchError<500, types.AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteResponse500> 500
   */
  atualizaOStatusDeUmaAvaliacaoDeUmProdutoVariante(body: types.AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteBodyParam, metadata: types.AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteResponse200>>;
  atualizaOStatusDeUmaAvaliacaoDeUmProdutoVariante(metadata: types.AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteResponse200>>;
  atualizaOStatusDeUmaAvaliacaoDeUmProdutoVariante(body?: types.AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteBodyParam | types.AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteMetadataParam, metadata?: types.AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteResponse200>> {
    return this.core.fetch('/produtoavaliacao/{produtoAvaliacaoId}/status', 'put', body, metadata);
  }

  /**
   * Insere uma avaliação para um produto variante
   *
   * @throws FetchError<422, types.InsereUmaAvaliacaoParaUmProdutoVarianteResponse422> 422
   * @throws FetchError<500, types.InsereUmaAvaliacaoParaUmProdutoVarianteResponse500> 500
   */
  insereUmaAvaliacaoParaUmProdutoVariante(body: types.InsereUmaAvaliacaoParaUmProdutoVarianteBodyParam, metadata: types.InsereUmaAvaliacaoParaUmProdutoVarianteMetadataParam): Promise<FetchResponse<200, types.InsereUmaAvaliacaoParaUmProdutoVarianteResponse200>>;
  insereUmaAvaliacaoParaUmProdutoVariante(metadata: types.InsereUmaAvaliacaoParaUmProdutoVarianteMetadataParam): Promise<FetchResponse<200, types.InsereUmaAvaliacaoParaUmProdutoVarianteResponse200>>;
  insereUmaAvaliacaoParaUmProdutoVariante(body?: types.InsereUmaAvaliacaoParaUmProdutoVarianteBodyParam | types.InsereUmaAvaliacaoParaUmProdutoVarianteMetadataParam, metadata?: types.InsereUmaAvaliacaoParaUmProdutoVarianteMetadataParam): Promise<FetchResponse<200, types.InsereUmaAvaliacaoParaUmProdutoVarianteResponse200>> {
    return this.core.fetch('/produtoavaliacao/{identificador}', 'post', body, metadata);
  }

  /**
   * Retorna uma lista de promoções
   *
   * @throws FetchError<500, types.RetornaTodasAsPromocoesCadastradasResponse500> 500
   */
  retornaTodasAsPromocoesCadastradas(metadata?: types.RetornaTodasAsPromocoesCadastradasMetadataParam): Promise<FetchResponse<200, types.RetornaTodasAsPromocoesCadastradasResponse200>> {
    return this.core.fetch('/promocoes', 'get', metadata);
  }

  /**
   * Vincular Cupons a uma Promoção
   *
   * @throws FetchError<500, types.VincularCuponsAUmaPromocaoResponse500> 500
   */
  vincularCuponsAUmaPromocao(body: types.VincularCuponsAUmaPromocaoBodyParam, metadata: types.VincularCuponsAUmaPromocaoMetadataParam): Promise<FetchResponse<number, unknown>>;
  vincularCuponsAUmaPromocao(metadata: types.VincularCuponsAUmaPromocaoMetadataParam): Promise<FetchResponse<number, unknown>>;
  vincularCuponsAUmaPromocao(body?: types.VincularCuponsAUmaPromocaoBodyParam | types.VincularCuponsAUmaPromocaoMetadataParam, metadata?: types.VincularCuponsAUmaPromocaoMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/promocoes/{promocaoId}/cupons', 'put', body, metadata);
  }

  /**
   * Retorna uma promoção completa pelo Id
   *
   * @throws FetchError<500, types.RetornaUmaPromocaoCompletaPeloIdResponse500> 500
   */
  retornaUmaPromocaoCompletaPeloId(metadata: types.RetornaUmaPromocaoCompletaPeloIdMetadataParam): Promise<FetchResponse<200, types.RetornaUmaPromocaoCompletaPeloIdResponse200>> {
    return this.core.fetch('/promocoes/{promocaoId}', 'get', metadata);
  }

  /**
   * Retorna uma região específica
   *
   * @throws FetchError<500, types.RetornaUmaRegiOEspecFicaResponse500> 500
   */
  retornaUmaRegiOEspecFica(metadata: types.RetornaUmaRegiOEspecFicaMetadataParam): Promise<FetchResponse<200, types.RetornaUmaRegiOEspecFicaResponse200>> {
    return this.core.fetch('/regionalizacao/{regiaoId}', 'get', metadata);
  }

  /**
   * Atualiza uma região específica
   *
   * @throws FetchError<422, types.AtualizaRegiOeRetornaTrueEmCasoDeSucessoResponse422> 422
   */
  atualizaRegiOERetornaTrueEmCasoDeSucesso(body: types.AtualizaRegiOeRetornaTrueEmCasoDeSucessoBodyParam, metadata: types.AtualizaRegiOeRetornaTrueEmCasoDeSucessoMetadataParam): Promise<FetchResponse<200, types.AtualizaRegiOeRetornaTrueEmCasoDeSucessoResponse200>>;
  atualizaRegiOERetornaTrueEmCasoDeSucesso(metadata: types.AtualizaRegiOeRetornaTrueEmCasoDeSucessoMetadataParam): Promise<FetchResponse<200, types.AtualizaRegiOeRetornaTrueEmCasoDeSucessoResponse200>>;
  atualizaRegiOERetornaTrueEmCasoDeSucesso(body?: types.AtualizaRegiOeRetornaTrueEmCasoDeSucessoBodyParam | types.AtualizaRegiOeRetornaTrueEmCasoDeSucessoMetadataParam, metadata?: types.AtualizaRegiOeRetornaTrueEmCasoDeSucessoMetadataParam): Promise<FetchResponse<200, types.AtualizaRegiOeRetornaTrueEmCasoDeSucessoResponse200>> {
    return this.core.fetch('/regionalizacao/{regiaoId}', 'put', body, metadata);
  }

  /**
   * Retorna uma lista de regiões
   *
   * @throws FetchError<400, types.ListarRegiEsComFiltrosEPaginaOResponse400> 400
   */
  listarRegiEsComFiltrosEPaginaO(metadata?: types.ListarRegiEsComFiltrosEPaginaOMetadataParam): Promise<FetchResponse<200, types.ListarRegiEsComFiltrosEPaginaOResponse200>> {
    return this.core.fetch('/regionalizacao/regioes', 'get', metadata);
  }

  /**
   * Insere uma região
   *
   * @throws FetchError<400, types.InserODeUmaRegiOResponse400> 400
   */
  inserODeUmaRegiO(body?: types.InserODeUmaRegiOBodyParam): Promise<FetchResponse<200, types.InserODeUmaRegiOResponse200>> {
    return this.core.fetch('/regionalizacao/regiao', 'post', body);
  }

  /**
   * Arquiva uma região
   *
   * @throws FetchError<400, types.ArquivaUmaRegiOResponse400> 400
   */
  arquivaUmaRegiO(body: types.ArquivaUmaRegiOBodyParam, metadata: types.ArquivaUmaRegiOMetadataParam): Promise<FetchResponse<200, types.ArquivaUmaRegiOResponse200>>;
  arquivaUmaRegiO(metadata: types.ArquivaUmaRegiOMetadataParam): Promise<FetchResponse<200, types.ArquivaUmaRegiOResponse200>>;
  arquivaUmaRegiO(body?: types.ArquivaUmaRegiOBodyParam | types.ArquivaUmaRegiOMetadataParam, metadata?: types.ArquivaUmaRegiOMetadataParam): Promise<FetchResponse<200, types.ArquivaUmaRegiOResponse200>> {
    return this.core.fetch('/regionalizacao/{regiaoId}/arquivar', 'put', body, metadata);
  }

  /**
   * Lista de resellers
   *
   * @summary Retorna todos os Sellers da loja
   * @throws FetchError<500, types.RetornaTodosOsSellersDaLojaResponse500> 500
   */
  retornaTodosOsSellersDaLoja(): Promise<FetchResponse<200, types.RetornaTodosOsSellersDaLojaResponse200>> {
    return this.core.fetch('/resellers', 'get');
  }

  /**
   * Insere um novo Seller no marketplace
   *
   * @throws FetchError<500, types.InsereUmNovoSellerNoMarketplaceResponse500> 500
   */
  insereUmNovoSellerNoMarketplace(body?: types.InsereUmNovoSellerNoMarketplaceBodyParam): Promise<FetchResponse<201, types.InsereUmNovoSellerNoMarketplaceResponse201>> {
    return this.core.fetch('/resellers', 'post', body);
  }

  /**
   * Atualiza um novo Seller no marketplace
   *
   * @throws FetchError<500, types.AtualizaUmNovoSellerNoMarketplaceResponse500> 500
   */
  atualizaUmNovoSellerNoMarketplace(body?: types.AtualizaUmNovoSellerNoMarketplaceBodyParam, metadata?: types.AtualizaUmNovoSellerNoMarketplaceMetadataParam): Promise<FetchResponse<200, types.AtualizaUmNovoSellerNoMarketplaceResponse200>> {
    return this.core.fetch('/resellers', 'put', body, metadata);
  }

  /**
   * Reseller específico
   *
   * @summary Retorna um Seller específico da loja
   * @throws FetchError<500, types.RetornaUmSellerEspecificoDaLojaResponse500> 500
   */
  retornaUmSellerEspecificoDaLoja(): Promise<FetchResponse<200, types.RetornaUmSellerEspecificoDaLojaResponse200>> {
    return this.core.fetch('/resellers/token', 'get');
  }

  /**
   * Reseller específico
   *
   * @summary Retorna um Seller específico da loja
   * @throws FetchError<500, types.RetornaUmSellerEspecificoDaLoja1Response500> 500
   */
  retornaUmSellerEspecificoDaLoja1(metadata: types.RetornaUmSellerEspecificoDaLoja1MetadataParam): Promise<FetchResponse<200, types.RetornaUmSellerEspecificoDaLoja1Response200>> {
    return this.core.fetch('/resellers/{resellerId}', 'get', metadata);
  }

  /**
   * Lista de produtos
   *
   * @summary Retorna produtos por Seller
   * @throws FetchError<500, types.RetornaProdutosPorSellerResponse500> 500
   */
  retornaProdutosPorSeller(metadata: types.RetornaProdutosPorSellerMetadataParam): Promise<FetchResponse<200, types.RetornaProdutosPorSellerResponse200>> {
    return this.core.fetch('/resellers/produtos/{identificador}', 'get', metadata);
  }

  /**
   * Atualiza a autonomia de um Seller
   *
   * @throws FetchError<500, types.AtualizaAAutonomiaDeUmSellerResponse500> 500
   */
  atualizaAAutonomiaDeUmSeller(body: types.AtualizaAAutonomiaDeUmSellerBodyParam, metadata: types.AtualizaAAutonomiaDeUmSellerMetadataParam): Promise<FetchResponse<200, types.AtualizaAAutonomiaDeUmSellerResponse200>>;
  atualizaAAutonomiaDeUmSeller(metadata: types.AtualizaAAutonomiaDeUmSellerMetadataParam): Promise<FetchResponse<200, types.AtualizaAAutonomiaDeUmSellerResponse200>>;
  atualizaAAutonomiaDeUmSeller(body?: types.AtualizaAAutonomiaDeUmSellerBodyParam | types.AtualizaAAutonomiaDeUmSellerMetadataParam, metadata?: types.AtualizaAAutonomiaDeUmSellerMetadataParam): Promise<FetchResponse<200, types.AtualizaAAutonomiaDeUmSellerResponse200>> {
    return this.core.fetch('/resellers/{resellerId}/autonomia', 'put', body, metadata);
  }

  /**
   * Ativa ou desativa um Seller
   *
   * @throws FetchError<500, types.AtivaOuDesativaUmSellerResponse500> 500
   */
  ativaOuDesativaUmSeller(body: types.AtivaOuDesativaUmSellerBodyParam, metadata: types.AtivaOuDesativaUmSellerMetadataParam): Promise<FetchResponse<200, types.AtivaOuDesativaUmSellerResponse200>>;
  ativaOuDesativaUmSeller(metadata: types.AtivaOuDesativaUmSellerMetadataParam): Promise<FetchResponse<200, types.AtivaOuDesativaUmSellerResponse200>>;
  ativaOuDesativaUmSeller(body?: types.AtivaOuDesativaUmSellerBodyParam | types.AtivaOuDesativaUmSellerMetadataParam, metadata?: types.AtivaOuDesativaUmSellerMetadataParam): Promise<FetchResponse<200, types.AtivaOuDesativaUmSellerResponse200>> {
    return this.core.fetch('/resellers/{resellerId}/status', 'put', body, metadata);
  }

  /**
   * Atualiza a ativação automática de produtos de um Seller
   *
   * @throws FetchError<500, types.AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerResponse500> 500
   */
  atualizaAAtivacaoAutomaticaDeProdutosDeUmSeller(body: types.AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerBodyParam, metadata: types.AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerMetadataParam): Promise<FetchResponse<200, types.AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerResponse200>>;
  atualizaAAtivacaoAutomaticaDeProdutosDeUmSeller(metadata: types.AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerMetadataParam): Promise<FetchResponse<200, types.AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerResponse200>>;
  atualizaAAtivacaoAutomaticaDeProdutosDeUmSeller(body?: types.AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerBodyParam | types.AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerMetadataParam, metadata?: types.AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerMetadataParam): Promise<FetchResponse<200, types.AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerResponse200>> {
    return this.core.fetch('/resellers/{resellerId}/ativacaoAutomaticaProdutos', 'put', body, metadata);
  }

  /**
   * Lista de situações de pedido
   *
   * @summary Retorna todas as situações de pedido da loja
   * @throws FetchError<500, types.RetornaTodasAsSituacoesDePedidoDaLojaResponse500> 500
   */
  retornaTodasAsSituacoesDePedidoDaLoja(): Promise<FetchResponse<200, types.RetornaTodasAsSituacoesDePedidoDaLojaResponse200>> {
    return this.core.fetch('/situacoesPedido', 'get');
  }

  /**
   * Lista de tabelas de preços
   *
   * @summary Retorna todas as tabelas de preços
   * @throws FetchError<500, types.RetornaTodasAsTabelasDePrecosResponse500> 500
   */
  retornaTodasAsTabelasDePrecos(): Promise<FetchResponse<200, types.RetornaTodasAsTabelasDePrecosResponse200>> {
    return this.core.fetch('/tabelaPrecos', 'get');
  }

  /**
   * Insere uma nova tabela de preços
   *
   * @throws FetchError<500, types.InsereUmaNovaTabelaDePrecosResponse500> 500
   */
  insereUmaNovaTabelaDePrecos(body?: types.InsereUmaNovaTabelaDePrecosBodyParam): Promise<FetchResponse<201, types.InsereUmaNovaTabelaDePrecosResponse201>> {
    return this.core.fetch('/tabelaPrecos', 'post', body);
  }

  /**
   * Exclui uma tabela de preços
   *
   * @throws FetchError<500, types.ExcluiUmaTabelaDePrecosResponse500> 500
   */
  excluiUmaTabelaDePrecos(metadata: types.ExcluiUmaTabelaDePrecosMetadataParam): Promise<FetchResponse<200, types.ExcluiUmaTabelaDePrecosResponse200>> {
    return this.core.fetch('/tabelaPrecos/{tabelaPrecoId}', 'delete', metadata);
  }

  /**
   * Tabela de preços específica
   *
   * @summary Retorna uma tabela de preços
   * @throws FetchError<500, types.RetornaUmaTabelaDePrecosResponse500> 500
   */
  retornaUmaTabelaDePrecos(metadata: types.RetornaUmaTabelaDePrecosMetadataParam): Promise<FetchResponse<200, types.RetornaUmaTabelaDePrecosResponse200>> {
    return this.core.fetch('/tabelaPrecos/{tabelaPrecoId}', 'get', metadata);
  }

  /**
   * Atualiza uma tabela de preços
   *
   * @throws FetchError<500, types.AtualizaUmaTabelaDePrecosResponse500> 500
   */
  atualizaUmaTabelaDePrecos(body: types.AtualizaUmaTabelaDePrecosBodyParam, metadata: types.AtualizaUmaTabelaDePrecosMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaTabelaDePrecosResponse200>>;
  atualizaUmaTabelaDePrecos(metadata: types.AtualizaUmaTabelaDePrecosMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaTabelaDePrecosResponse200>>;
  atualizaUmaTabelaDePrecos(body?: types.AtualizaUmaTabelaDePrecosBodyParam | types.AtualizaUmaTabelaDePrecosMetadataParam, metadata?: types.AtualizaUmaTabelaDePrecosMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaTabelaDePrecosResponse200>> {
    return this.core.fetch('/tabelaPrecos/{tabelaPrecoId}', 'put', body, metadata);
  }

  /**
   * Lista de produtos de uma tabela de preços
   *
   * @summary Retorna os produtos de uma tabela de preços
   * @throws FetchError<500, types.RetornaOsProdutosDeUmaTabelaDePrecosResponse500> 500
   */
  retornaOsProdutosDeUmaTabelaDePrecos(metadata: types.RetornaOsProdutosDeUmaTabelaDePrecosMetadataParam): Promise<FetchResponse<200, types.RetornaOsProdutosDeUmaTabelaDePrecosResponse200>> {
    return this.core.fetch('/tabelaPrecos/{tabelaPrecoId}/produtos', 'get', metadata);
  }

  /**
   * Inseri uma lista de produto variantes em uma tabela de preços
   *
   * @throws FetchError<500, types.InseriUmaListaDeProdutoVariantesEmUmaTabelaDePrecosResponse500> 500
   */
  inseriUmaListaDeProdutoVariantesEmUmaTabelaDePrecos(body: types.InseriUmaListaDeProdutoVariantesEmUmaTabelaDePrecosBodyParam, metadata: types.InseriUmaListaDeProdutoVariantesEmUmaTabelaDePrecosMetadataParam): Promise<FetchResponse<201, types.InseriUmaListaDeProdutoVariantesEmUmaTabelaDePrecosResponse201>> {
    return this.core.fetch('/tabelaPrecos/{tabelaPrecoId}/produtos', 'post', body, metadata);
  }

  /**
   * Lista com o retorno do processamento dos produtos enviados
   *
   * @summary Atualiza uma lista de produto variantes em uma tabela de preços
   * @throws FetchError<500, types.AtualizaUmaListaDeProdutoVariantesEmUmaTabelaDePrecosResponse500> 500
   */
  atualizaUmaListaDeProdutoVariantesEmUmaTabelaDePrecos(body: types.AtualizaUmaListaDeProdutoVariantesEmUmaTabelaDePrecosBodyParam, metadata: types.AtualizaUmaListaDeProdutoVariantesEmUmaTabelaDePrecosMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaListaDeProdutoVariantesEmUmaTabelaDePrecosResponse200>> {
    return this.core.fetch('/tabelaPrecos/{tabelaPrecoId}/produtos', 'put', body, metadata);
  }

  /**
   * Remove um produto de uma tabela de preço
   *
   * @throws FetchError<500, types.RemoveUmProdutoDeUmaTabelaDePrecoResponse500> 500
   */
  removeUmProdutoDeUmaTabelaDePreco(metadata: types.RemoveUmProdutoDeUmaTabelaDePrecoMetadataParam): Promise<FetchResponse<200, types.RemoveUmProdutoDeUmaTabelaDePrecoResponse200>> {
    return this.core.fetch('/tabelaPrecos/{tabelaPrecoId}/{sku}', 'delete', metadata);
  }

  /**
   * Templates
   *
   * @throws FetchError<500, types.TemplatesResponse500> 500
   */
  templates(): Promise<FetchResponse<200, types.TemplatesResponse200>> {
    return this.core.fetch('/templates', 'get');
  }

  /**
   * Lista de produtos variantes vinculados aos tipo de evento
   *
   * @summary Busca os produtos sugeridos para a lista de evento
   */
  buscaOsProdutosSugeridosParaAListaDeEvento(metadata: types.BuscaOsProdutosSugeridosParaAListaDeEventoMetadataParam): Promise<FetchResponse<200, types.BuscaOsProdutosSugeridosParaAListaDeEventoResponse200>> {
    return this.core.fetch('/tiposEvento/{tipoEventoId}/produtos', 'get', metadata);
  }

  /**
   * Lista de resposta para cada produto vinculado
   *
   * @summary Vincula um ou mais produtos como sugestão para um tipo de evento
   * @throws FetchError<500, types.VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoResponse500> 500
   */
  vinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEvento(body: types.VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoBodyParam, metadata: types.VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoMetadataParam): Promise<FetchResponse<200, types.VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoResponse200>>;
  vinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEvento(metadata: types.VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoMetadataParam): Promise<FetchResponse<200, types.VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoResponse200>>;
  vinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEvento(body?: types.VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoBodyParam | types.VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoMetadataParam, metadata?: types.VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoMetadataParam): Promise<FetchResponse<200, types.VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoResponse200>> {
    return this.core.fetch('/tiposEvento/{tipoEventoId}/produtos', 'post', body, metadata);
  }

  /**
   * Atualiza os produtos sugeridos de um tipo de evento
   *
   * @throws FetchError<500, types.AtualizaOsProdutosSugeridosDeUmTipoDeEventoResponse500> 500
   */
  atualizaOsProdutosSugeridosDeUmTipoDeEvento(body: types.AtualizaOsProdutosSugeridosDeUmTipoDeEventoBodyParam, metadata: types.AtualizaOsProdutosSugeridosDeUmTipoDeEventoMetadataParam): Promise<FetchResponse<200, types.AtualizaOsProdutosSugeridosDeUmTipoDeEventoResponse200>>;
  atualizaOsProdutosSugeridosDeUmTipoDeEvento(metadata: types.AtualizaOsProdutosSugeridosDeUmTipoDeEventoMetadataParam): Promise<FetchResponse<200, types.AtualizaOsProdutosSugeridosDeUmTipoDeEventoResponse200>>;
  atualizaOsProdutosSugeridosDeUmTipoDeEvento(body?: types.AtualizaOsProdutosSugeridosDeUmTipoDeEventoBodyParam | types.AtualizaOsProdutosSugeridosDeUmTipoDeEventoMetadataParam, metadata?: types.AtualizaOsProdutosSugeridosDeUmTipoDeEventoMetadataParam): Promise<FetchResponse<200, types.AtualizaOsProdutosSugeridosDeUmTipoDeEventoResponse200>> {
    return this.core.fetch('/tiposEvento/{tipoEventoId}/produtos', 'put', body, metadata);
  }

  /**
   * Deleta um produto da lista de sugestões de produtos de um tipo de evento
   *
   * @throws FetchError<500, types.DeletaUmProdutoDaListaDeSugestoesDeProdutosDeUmTipoDeEventoResponse500> 500
   */
  deletaUmProdutoDaListaDeSugestoesDeProdutosDeUmTipoDeEvento(metadata: types.DeletaUmProdutoDaListaDeSugestoesDeProdutosDeUmTipoDeEventoMetadataParam): Promise<FetchResponse<200, types.DeletaUmProdutoDaListaDeSugestoesDeProdutosDeUmTipoDeEventoResponse200>> {
    return this.core.fetch('/tiposEvento/{tipoEventoId}/produto/{produtoVarianteId}', 'delete', metadata);
  }

  /**
   * Tipo evento buscado
   *
   * @summary Retorna um tipo de evento especifico
   * @throws FetchError<500, types.RetornaUmTipoDeEventoEspecificoResponse500> 500
   */
  retornaUmTipoDeEventoEspecifico(metadata: types.RetornaUmTipoDeEventoEspecificoMetadataParam): Promise<FetchResponse<200, types.RetornaUmTipoDeEventoEspecificoResponse200>> {
    return this.core.fetch('/tiposEvento/{tipoEventoId}', 'get', metadata);
  }

  /**
   * Atualiza o tipo evento
   *
   * @throws FetchError<500, types.AtualizaOTipoEventoResponse500> 500
   */
  atualizaOTipoEvento(body: types.AtualizaOTipoEventoBodyParam, metadata: types.AtualizaOTipoEventoMetadataParam): Promise<FetchResponse<200, types.AtualizaOTipoEventoResponse200>> {
    return this.core.fetch('/tiposEvento/{tipoEventoId}', 'put', body, metadata);
  }

  /**
   * Lista de tipos de evento
   *
   * @summary Retorna todos os tipos de eventos
   * @throws FetchError<500, types.RetornaTodosOsTiposDeEventosResponse500> 500
   */
  retornaTodosOsTiposDeEventos(metadata?: types.RetornaTodosOsTiposDeEventosMetadataParam): Promise<FetchResponse<200, types.RetornaTodosOsTiposDeEventosResponse200>> {
    return this.core.fetch('/tiposEvento', 'get', metadata);
  }

  /**
   * Insere um novo tipo de evento
   *
   * @throws FetchError<500, types.InsereUmNovoTipoDeEventoResponse500> 500
   */
  insereUmNovoTipoDeEvento(body?: types.InsereUmNovoTipoDeEventoBodyParam): Promise<FetchResponse<200, types.InsereUmNovoTipoDeEventoResponse200>> {
    return this.core.fetch('/tiposEvento', 'post', body);
  }

  /**
   * Atualiza o status do tipo de evento, ativando-o ou inativando-o
   *
   * @throws FetchError<500, types.AtualizaOStatusDoTipoDeEventoAtivandoOOuInativandoOResponse500> 500
   */
  atualizaOStatusDoTipoDeEventoAtivandoOOuInativandoO(metadata: types.AtualizaOStatusDoTipoDeEventoAtivandoOOuInativandoOMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDoTipoDeEventoAtivandoOOuInativandoOResponse200>> {
    return this.core.fetch('/tiposEvento/{tipoEventoId}/AlterarStatus', 'put', metadata);
  }

  /**
   * Lista de usuários
   *
   * @summary Retorna todos os usuários
   * @throws FetchError<500, types.RetornaTodosOsUsuariosResponse500> 500
   */
  retornaTodosOsUsuarios(metadata?: types.RetornaTodosOsUsuariosMetadataParam): Promise<FetchResponse<200, types.RetornaTodosOsUsuariosResponse200>> {
    return this.core.fetch('/usuarios', 'get', metadata);
  }

  /**
   * Insere um novo usuário
   *
   * @throws FetchError<500, types.InsereUmNovoUsuarioResponse500> 500
   */
  insereUmNovoUsuario(body?: types.InsereUmNovoUsuarioBodyParam): Promise<FetchResponse<201, types.InsereUmNovoUsuarioResponse201>> {
    return this.core.fetch('/usuarios', 'post', body);
  }

  /**
   * Usuário encontrado
   *
   * @summary Retorna um usuário específico pelo e-mail
   * @throws FetchError<500, types.RetornaUmUsuarioEspecificoPeloEMailResponse500> 500
   */
  retornaUmUsuarioEspecificoPeloEMail(metadata: types.RetornaUmUsuarioEspecificoPeloEMailMetadataParam): Promise<FetchResponse<200, types.RetornaUmUsuarioEspecificoPeloEMailResponse200>> {
    return this.core.fetch('/usuarios/email/{email}', 'get', metadata);
  }

  /**
   * Usuário encontrado
   *
   * @summary Retorna um usuário específico pelo id
   * @throws FetchError<500, types.RetornaUmUsuarioEspecificoPeloIdResponse500> 500
   */
  retornaUmUsuarioEspecificoPeloId(metadata: types.RetornaUmUsuarioEspecificoPeloIdMetadataParam): Promise<FetchResponse<200, types.RetornaUmUsuarioEspecificoPeloIdResponse200>> {
    return this.core.fetch('/usuarios/usuarioId/{usuarioId}', 'get', metadata);
  }

  /**
   * Usuário encontrado
   *
   * @summary Retorna um usuário específico pelo cpf
   * @throws FetchError<500, types.RetornaUmUsuarioEspecificoPeloCpfResponse500> 500
   */
  retornaUmUsuarioEspecificoPeloCpf(metadata: types.RetornaUmUsuarioEspecificoPeloCpfMetadataParam): Promise<FetchResponse<200, types.RetornaUmUsuarioEspecificoPeloCpfResponse200>> {
    return this.core.fetch('/usuarios/cpf/{cpf}', 'get', metadata);
  }

  /**
   * Usuário encontrado
   *
   * @summary Retorna um usuário específico pelo cnpj
   * @throws FetchError<500, types.RetornaUmUsuarioEspecificoPeloCnpjResponse500> 500
   */
  retornaUmUsuarioEspecificoPeloCnpj(metadata: types.RetornaUmUsuarioEspecificoPeloCnpjMetadataParam): Promise<FetchResponse<200, types.RetornaUmUsuarioEspecificoPeloCnpjResponse200>> {
    return this.core.fetch('/usuarios/cnpj/{cnpj}', 'get', metadata);
  }

  /**
   * Atualiza um usuário pelo id
   *
   * @throws FetchError<422, types.AtualizaUmUsuarioPeloIdResponse422> Unprocessable Entity
   * @throws FetchError<500, types.AtualizaUmUsuarioPeloIdResponse500> 500
   */
  atualizaUmUsuarioPeloId(body: types.AtualizaUmUsuarioPeloIdBodyParam, metadata: types.AtualizaUmUsuarioPeloIdMetadataParam): Promise<FetchResponse<200, types.AtualizaUmUsuarioPeloIdResponse200>>;
  atualizaUmUsuarioPeloId(metadata: types.AtualizaUmUsuarioPeloIdMetadataParam): Promise<FetchResponse<200, types.AtualizaUmUsuarioPeloIdResponse200>>;
  atualizaUmUsuarioPeloId(body?: types.AtualizaUmUsuarioPeloIdBodyParam | types.AtualizaUmUsuarioPeloIdMetadataParam, metadata?: types.AtualizaUmUsuarioPeloIdMetadataParam): Promise<FetchResponse<200, types.AtualizaUmUsuarioPeloIdResponse200>> {
    return this.core.fetch('/usuarios/{usuarioId}', 'put', body, metadata);
  }

  /**
   * Atualiza um usuário pelo e-mail
   *
   * @throws FetchError<500, types.AtualizaUmUsuarioPeloEmailResponse500> 500
   */
  atualizaUmUsuarioPeloEmail(body: types.AtualizaUmUsuarioPeloEmailBodyParam, metadata: types.AtualizaUmUsuarioPeloEmailMetadataParam): Promise<FetchResponse<200, types.AtualizaUmUsuarioPeloEmailResponse200>>;
  atualizaUmUsuarioPeloEmail(metadata: types.AtualizaUmUsuarioPeloEmailMetadataParam): Promise<FetchResponse<200, types.AtualizaUmUsuarioPeloEmailResponse200>>;
  atualizaUmUsuarioPeloEmail(body?: types.AtualizaUmUsuarioPeloEmailBodyParam | types.AtualizaUmUsuarioPeloEmailMetadataParam, metadata?: types.AtualizaUmUsuarioPeloEmailMetadataParam): Promise<FetchResponse<200, types.AtualizaUmUsuarioPeloEmailResponse200>> {
    return this.core.fetch('/usuarios/{email}', 'put', body, metadata);
  }

  /**
   * Limite de 50 usuários e 10 informações cadastrais por requisição
   *
   * @summary Atualiza as informações cadastrais de um ou mais usuários
   * @throws FetchError<500, types.AtualizaAsInformaEsCadastraisDeUmOuMaisUsuRiosResponse500> 500
   */
  atualizaAsInformaEsCadastraisDeUmOuMaisUsuRios(body?: types.AtualizaAsInformaEsCadastraisDeUmOuMaisUsuRiosBodyParam, metadata?: types.AtualizaAsInformaEsCadastraisDeUmOuMaisUsuRiosMetadataParam): Promise<FetchResponse<200, types.AtualizaAsInformaEsCadastraisDeUmOuMaisUsuRiosResponse200>> {
    return this.core.fetch('/usuarios/informacoescadastrais', 'put', body, metadata);
  }

  /**
   * Retorna usuário encontrado
   *
   * @summary Retorna uma lista de endereços de um usuário pelo e-mail do usuário
   * @throws FetchError<500, types.RetornaUmaListaDeEnderecosDeUmUsuarioPeloEMailDoUsuarioResponse500> 500
   */
  retornaUmaListaDeEnderecosDeUmUsuarioPeloEMailDoUsuario(metadata: types.RetornaUmaListaDeEnderecosDeUmUsuarioPeloEMailDoUsuarioMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaDeEnderecosDeUmUsuarioPeloEMailDoUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{email}/enderecos', 'get', metadata);
  }

  /**
   * Insere um endereço para um usuário pelo e-mail
   *
   * @throws FetchError<500, types.InsereUmEndereOParaUmUsuarioPeloEMailResponse500> 500
   */
  insereUmEndereOParaUmUsuarioPeloEMail(body: types.InsereUmEndereOParaUmUsuarioPeloEMailBodyParam, metadata: types.InsereUmEndereOParaUmUsuarioPeloEMailMetadataParam): Promise<FetchResponse<200, types.InsereUmEndereOParaUmUsuarioPeloEMailResponse200>>;
  insereUmEndereOParaUmUsuarioPeloEMail(metadata: types.InsereUmEndereOParaUmUsuarioPeloEMailMetadataParam): Promise<FetchResponse<200, types.InsereUmEndereOParaUmUsuarioPeloEMailResponse200>>;
  insereUmEndereOParaUmUsuarioPeloEMail(body?: types.InsereUmEndereOParaUmUsuarioPeloEMailBodyParam | types.InsereUmEndereOParaUmUsuarioPeloEMailMetadataParam, metadata?: types.InsereUmEndereOParaUmUsuarioPeloEMailMetadataParam): Promise<FetchResponse<200, types.InsereUmEndereOParaUmUsuarioPeloEMailResponse200>> {
    return this.core.fetch('/usuarios/{email}/enderecos', 'post', body, metadata);
  }

  /**
   * Retorna usuário encontrado
   *
   * @summary Retorna uma lista de endereços de um usuário pelo id do usuário
   * @throws FetchError<500, types.RetornaUmaListaDeEnderecosDeUmUsuarioPeloIdDoUsuarioResponse500> 500
   */
  retornaUmaListaDeEnderecosDeUmUsuarioPeloIdDoUsuario(metadata: types.RetornaUmaListaDeEnderecosDeUmUsuarioPeloIdDoUsuarioMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaDeEnderecosDeUmUsuarioPeloIdDoUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{usuarioId}/enderecos', 'get', metadata);
  }

  /**
   * Insere um endereço para um usuário pelo id do usuário
   *
   * @throws FetchError<500, types.InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioResponse500> 500
   */
  insereUmEnderecoParaUmUsuarioPeloIdDoUsuario(body: types.InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioBodyParam, metadata: types.InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioMetadataParam): Promise<FetchResponse<200, types.InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioResponse200>>;
  insereUmEnderecoParaUmUsuarioPeloIdDoUsuario(metadata: types.InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioMetadataParam): Promise<FetchResponse<200, types.InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioResponse200>>;
  insereUmEnderecoParaUmUsuarioPeloIdDoUsuario(body?: types.InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioBodyParam | types.InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioMetadataParam, metadata?: types.InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioMetadataParam): Promise<FetchResponse<200, types.InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{usuarioId}/enderecos', 'post', body, metadata);
  }

  /**
   * Atualiza um endereço de um usuário pelo e-mail do usuário
   *
   * @throws FetchError<500, types.AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioResponse500> 500
   */
  atualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuario(body: types.AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioBodyParam, metadata: types.AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioMetadataParam): Promise<FetchResponse<200, types.AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioResponse200>>;
  atualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuario(metadata: types.AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioMetadataParam): Promise<FetchResponse<200, types.AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioResponse200>>;
  atualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuario(body?: types.AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioBodyParam | types.AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioMetadataParam, metadata?: types.AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioMetadataParam): Promise<FetchResponse<200, types.AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{email}/enderecos/{enderecoId}', 'put', body, metadata);
  }

  /**
   * Atualiza um endereço de um usuário pelo id do usuário
   *
   * @throws FetchError<500, types.AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioResponse500> 500
   */
  atualizaUmEnderecoDeUmUsuarioPeloIdDoUsuario(body: types.AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioBodyParam, metadata: types.AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioMetadataParam): Promise<FetchResponse<200, types.AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioResponse200>>;
  atualizaUmEnderecoDeUmUsuarioPeloIdDoUsuario(metadata: types.AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioMetadataParam): Promise<FetchResponse<200, types.AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioResponse200>>;
  atualizaUmEnderecoDeUmUsuarioPeloIdDoUsuario(body?: types.AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioBodyParam | types.AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioMetadataParam, metadata?: types.AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioMetadataParam): Promise<FetchResponse<200, types.AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{usuarioId}/enderecos/{enderecoId}', 'put', body, metadata);
  }

  /**
   * Ativa ou desativa um endereço de um usuário com base no id do usuário
   *
   * @throws FetchError<500, types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioResponse500> 500
   */
  ativaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuario(body: types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioBodyParam, metadata: types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioMetadataParam): Promise<FetchResponse<200, types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioResponse200>>;
  ativaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuario(metadata: types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioMetadataParam): Promise<FetchResponse<200, types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioResponse200>>;
  ativaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuario(body?: types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioBodyParam | types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioMetadataParam, metadata?: types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioMetadataParam): Promise<FetchResponse<200, types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{usuarioId}/enderecos/{enderecoId}/ativar', 'put', body, metadata);
  }

  /**
   * Ativa ou desativa um endereço de um usuário com base no e-mail do usuário
   *
   * @throws FetchError<500, types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioResponse500> 500
   */
  ativaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuario(body: types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioBodyParam, metadata: types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioMetadataParam): Promise<FetchResponse<200, types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioResponse200>>;
  ativaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuario(metadata: types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioMetadataParam): Promise<FetchResponse<200, types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioResponse200>>;
  ativaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuario(body?: types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioBodyParam | types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioMetadataParam, metadata?: types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioMetadataParam): Promise<FetchResponse<200, types.AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{email}/enderecos/{enderecoId}/ativar', 'put', body, metadata);
  }

  /**
   * Retorna uma lista de vínculos entre usuário e parceiro
   *
   * @throws FetchError<500, types.RetornaUmaListaDeVinculosEntreUsuarioEParceiroResponse500> 500
   */
  retornaUmaListaDeVinculosEntreUsuarioEParceiro(metadata: types.RetornaUmaListaDeVinculosEntreUsuarioEParceiroMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaDeVinculosEntreUsuarioEParceiroResponse200>> {
    return this.core.fetch('/usuarios/{email}/parceiros', 'get', metadata);
  }

  /**
   * Remove o vínculo entre usuário e parceiro
   *
   * @throws FetchError<500, types.RemoveOVinculoEntreUsuarioEParceiroResponse500> 500
   */
  removeOVinculoEntreUsuarioEParceiro(body: types.RemoveOVinculoEntreUsuarioEParceiroBodyParam, metadata: types.RemoveOVinculoEntreUsuarioEParceiroMetadataParam): Promise<FetchResponse<200, types.RemoveOVinculoEntreUsuarioEParceiroResponse200>>;
  removeOVinculoEntreUsuarioEParceiro(metadata: types.RemoveOVinculoEntreUsuarioEParceiroMetadataParam): Promise<FetchResponse<200, types.RemoveOVinculoEntreUsuarioEParceiroResponse200>>;
  removeOVinculoEntreUsuarioEParceiro(body?: types.RemoveOVinculoEntreUsuarioEParceiroBodyParam | types.RemoveOVinculoEntreUsuarioEParceiroMetadataParam, metadata?: types.RemoveOVinculoEntreUsuarioEParceiroMetadataParam): Promise<FetchResponse<200, types.RemoveOVinculoEntreUsuarioEParceiroResponse200>> {
    return this.core.fetch('/usuarios/{email}/parceiro', 'delete', body, metadata);
  }

  /**
   * Adiciona um vínculo entre usuário e parceiro
   *
   * @throws FetchError<500, types.AdicionaUmVinculoEntreUsuarioEParceiroResponse500> 500
   */
  adicionaUmVinculoEntreUsuarioEParceiro(body: types.AdicionaUmVinculoEntreUsuarioEParceiroBodyParam, metadata: types.AdicionaUmVinculoEntreUsuarioEParceiroMetadataParam): Promise<FetchResponse<201, types.AdicionaUmVinculoEntreUsuarioEParceiroResponse201>>;
  adicionaUmVinculoEntreUsuarioEParceiro(metadata: types.AdicionaUmVinculoEntreUsuarioEParceiroMetadataParam): Promise<FetchResponse<201, types.AdicionaUmVinculoEntreUsuarioEParceiroResponse201>>;
  adicionaUmVinculoEntreUsuarioEParceiro(body?: types.AdicionaUmVinculoEntreUsuarioEParceiroBodyParam | types.AdicionaUmVinculoEntreUsuarioEParceiroMetadataParam, metadata?: types.AdicionaUmVinculoEntreUsuarioEParceiroMetadataParam): Promise<FetchResponse<201, types.AdicionaUmVinculoEntreUsuarioEParceiroResponse201>> {
    return this.core.fetch('/usuarios/{email}/parceiro', 'post', body, metadata);
  }

  /**
   * Atualiza um vínculo entre usuário e parceiro
   *
   * @throws FetchError<500, types.AtualizaUmVinculoEntreUsuarioEParceiroResponse500> 500
   */
  atualizaUmVinculoEntreUsuarioEParceiro(body: types.AtualizaUmVinculoEntreUsuarioEParceiroBodyParam, metadata: types.AtualizaUmVinculoEntreUsuarioEParceiroMetadataParam): Promise<FetchResponse<200, types.AtualizaUmVinculoEntreUsuarioEParceiroResponse200>>;
  atualizaUmVinculoEntreUsuarioEParceiro(metadata: types.AtualizaUmVinculoEntreUsuarioEParceiroMetadataParam): Promise<FetchResponse<200, types.AtualizaUmVinculoEntreUsuarioEParceiroResponse200>>;
  atualizaUmVinculoEntreUsuarioEParceiro(body?: types.AtualizaUmVinculoEntreUsuarioEParceiroBodyParam | types.AtualizaUmVinculoEntreUsuarioEParceiroMetadataParam, metadata?: types.AtualizaUmVinculoEntreUsuarioEParceiroMetadataParam): Promise<FetchResponse<200, types.AtualizaUmVinculoEntreUsuarioEParceiroResponse200>> {
    return this.core.fetch('/usuarios/{email}/parceiro', 'put', body, metadata);
  }

  /**
   * Limite de crédito que estão vinculados aos usuários
   *
   * @summary Retorna uma lista de usuários com o limite de credito de cada um
   * @throws FetchError<500, types.RetornaUmaListaDeUsuariosComOLimiteDeCreditoDeCadaUmResponse500> 500
   */
  retornaUmaListaDeUsuariosComOLimiteDeCreditoDeCadaUm(): Promise<FetchResponse<200, types.RetornaUmaListaDeUsuariosComOLimiteDeCreditoDeCadaUmResponse200>> {
    return this.core.fetch('/usuarios/limiteCredito', 'get');
  }

  /**
   * Limite de crédito de um usuário específico
   *
   * @summary Retorna o limite de crédito de um usuário específico
   * @throws FetchError<500, types.RetornaOLimiteDeCreditoDeUmUsuarioEspecificoResponse500> 500
   */
  retornaOLimiteDeCreditoDeUmUsuarioEspecifico(metadata: types.RetornaOLimiteDeCreditoDeUmUsuarioEspecificoMetadataParam): Promise<FetchResponse<200, types.RetornaOLimiteDeCreditoDeUmUsuarioEspecificoResponse200>> {
    return this.core.fetch('/usuarios/limiteCreditoPorUsuarioId/{usuarioId}', 'get', metadata);
  }

  /**
   * Limite de crédito de um usuário específico
   *
   * @summary Retorna o limite de crédito de um usuário específico
   * @throws FetchError<500, types.RetornaOLimiteDeCreditoDeUmUsuarioEspecifico1Response500> 500
   */
  retornaOLimiteDeCreditoDeUmUsuarioEspecifico1(metadata: types.RetornaOLimiteDeCreditoDeUmUsuarioEspecifico1MetadataParam): Promise<FetchResponse<200, types.RetornaOLimiteDeCreditoDeUmUsuarioEspecifico1Response200>> {
    return this.core.fetch('/usuarios/limiteCreditoPorEmail/{email}', 'get', metadata);
  }

  /**
   * Atualiza o limite de crédito para um usuário
   *
   * @throws FetchError<500, types.InsereLimiteDeCreditoParaUmUsuarioResponse500> 500
   */
  insereLimiteDeCreditoParaUmUsuario(metadata: types.InsereLimiteDeCreditoParaUmUsuarioMetadataParam): Promise<FetchResponse<200, types.InsereLimiteDeCreditoParaUmUsuarioResponse200>> {
    return this.core.fetch('/usuarios/limiteCredito/{usuarioId}', 'put', metadata);
  }

  /**
   * Retorna lista de usuários cadastrados/descadastrados na newsletter (50 por página)
   *
   * @summary Retorna lista de usuários cadastrados/descadastrados na newsletter
   * @throws FetchError<500, types.RetornaListaDeUsuariosCadastradosdescadastradosNaNewsletterResponse500> 500
   */
  retornaListaDeUsuariosCadastradosdescadastradosNaNewsletter(metadata?: types.RetornaListaDeUsuariosCadastradosdescadastradosNaNewsletterMetadataParam): Promise<FetchResponse<200, types.RetornaListaDeUsuariosCadastradosdescadastradosNaNewsletterResponse200>> {
    return this.core.fetch('/usuarios/newsletter', 'get', metadata);
  }

  /**
   * Retorna lista contendo os Id's dos pedidos do usuário
   *
   * @summary Retorna uma lista contendo o id dos pedidos de um usuário
   * @throws FetchError<500, types.RetornaUmaListaContendoOIdDosPedidosDeUmUsuarioResponse500> 500
   */
  retornaUmaListaContendoOIdDosPedidosDeUmUsuario(metadata: types.RetornaUmaListaContendoOIdDosPedidosDeUmUsuarioMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaContendoOIdDosPedidosDeUmUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{email}/pedidos', 'get', metadata);
  }

  /**
   * Retorna lista contendo os Id's dos pedidos do usuário
   *
   * @summary Retorna uma lista contendo o id dos pedidos de um usuário
   * @throws FetchError<500, types.RetornaUmaListaContendoOIdDosPedidosDeUmUsuario1Response500> 500
   */
  retornaUmaListaContendoOIdDosPedidosDeUmUsuario1(metadata: types.RetornaUmaListaContendoOIdDosPedidosDeUmUsuario1MetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaContendoOIdDosPedidosDeUmUsuario1Response200>> {
    return this.core.fetch('/usuarios/documento/{documento}/pedidos', 'get', metadata);
  }

  /**
   * Retorna se o usuário ativou o recebimento de newsletter
   *
   * @summary Retorna se o usuário ativou o recebimento de newsletter
   * @throws FetchError<500, types.RetornaSeOUsusrioAtivouORecebimentoDeNewsletterResponse500> 500
   */
  retornaSeOUsusrioAtivouORecebimentoDeNewsletter(metadata: types.RetornaSeOUsusrioAtivouORecebimentoDeNewsletterMetadataParam): Promise<FetchResponse<200, types.RetornaSeOUsusrioAtivouORecebimentoDeNewsletterResponse200>> {
    return this.core.fetch('/usuarios/{email}/comunicacao', 'get', metadata);
  }

  /**
   * Atualiza a comunicação de um usuário via newsletter
   *
   * @throws FetchError<500, types.AtualizaAComunicacaoDeUmUsuarioViaNewsletterResponse500> 500
   */
  atualizaAComunicacaoDeUmUsuarioViaNewsletter(body: types.AtualizaAComunicacaoDeUmUsuarioViaNewsletterBodyParam, metadata: types.AtualizaAComunicacaoDeUmUsuarioViaNewsletterMetadataParam): Promise<FetchResponse<200, types.AtualizaAComunicacaoDeUmUsuarioViaNewsletterResponse200>>;
  atualizaAComunicacaoDeUmUsuarioViaNewsletter(metadata: types.AtualizaAComunicacaoDeUmUsuarioViaNewsletterMetadataParam): Promise<FetchResponse<200, types.AtualizaAComunicacaoDeUmUsuarioViaNewsletterResponse200>>;
  atualizaAComunicacaoDeUmUsuarioViaNewsletter(body?: types.AtualizaAComunicacaoDeUmUsuarioViaNewsletterBodyParam | types.AtualizaAComunicacaoDeUmUsuarioViaNewsletterMetadataParam, metadata?: types.AtualizaAComunicacaoDeUmUsuarioViaNewsletterMetadataParam): Promise<FetchResponse<200, types.AtualizaAComunicacaoDeUmUsuarioViaNewsletterResponse200>> {
    return this.core.fetch('/usuarios/{email}/comunicacao', 'put', body, metadata);
  }

  /**
   * Dados da lista de desejos de um usuário
   *
   * @summary Retorna os dados da lista de desejos de um usuário
   * @throws FetchError<500, types.RetornaOsDadosDaListaDeDesejosDeUmUsuarioResponse500> 500
   */
  retornaOsDadosDaListaDeDesejosDeUmUsuario(metadata: types.RetornaOsDadosDaListaDeDesejosDeUmUsuarioMetadataParam): Promise<FetchResponse<200, types.RetornaOsDadosDaListaDeDesejosDeUmUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{usuarioId}/listaDesejos', 'get', metadata);
  }

  /**
   * Lista com os dados de cartões de crédito
   *
   * @summary Retorna os dados de cartões de crédito de um usuário
   * @throws FetchError<500, types.RetornaOsDadosDeCartoesDeCreditoDeUmUsuarioResponse500> 500
   */
  retornaOsDadosDeCartoesDeCreditoDeUmUsuario(metadata: types.RetornaOsDadosDeCartoesDeCreditoDeUmUsuarioMetadataParam): Promise<FetchResponse<200, types.RetornaOsDadosDeCartoesDeCreditoDeUmUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{email}/meusCartoes', 'get', metadata);
  }

  /**
   * Insere um novo cartão de crédito para o usuário
   *
   * @throws FetchError<500, types.InsereUmNovoCartaoDeCreditoParaOUsuarioResponse500> 500
   */
  insereUmNovoCartaoDeCreditoParaOUsuario(body: types.InsereUmNovoCartaoDeCreditoParaOUsuarioBodyParam, metadata: types.InsereUmNovoCartaoDeCreditoParaOUsuarioMetadataParam): Promise<FetchResponse<201, types.InsereUmNovoCartaoDeCreditoParaOUsuarioResponse201>>;
  insereUmNovoCartaoDeCreditoParaOUsuario(metadata: types.InsereUmNovoCartaoDeCreditoParaOUsuarioMetadataParam): Promise<FetchResponse<201, types.InsereUmNovoCartaoDeCreditoParaOUsuarioResponse201>>;
  insereUmNovoCartaoDeCreditoParaOUsuario(body?: types.InsereUmNovoCartaoDeCreditoParaOUsuarioBodyParam | types.InsereUmNovoCartaoDeCreditoParaOUsuarioMetadataParam, metadata?: types.InsereUmNovoCartaoDeCreditoParaOUsuarioMetadataParam): Promise<FetchResponse<201, types.InsereUmNovoCartaoDeCreditoParaOUsuarioResponse201>> {
    return this.core.fetch('/usuarios/{email}/meusCartoes', 'post', body, metadata);
  }

  /**
   * Retorna lista contendo os Id's das assinaturas do usuário
   *
   * @summary Retorna uma lista contendo o id das assinaturas de um usuário
   * @throws FetchError<500, types.RetornaUmaListaContendoOIdDasAssinaturasDeUmUsuarioResponse500> 500
   */
  retornaUmaListaContendoOIdDasAssinaturasDeUmUsuario(metadata: types.RetornaUmaListaContendoOIdDasAssinaturasDeUmUsuarioMetadataParam): Promise<FetchResponse<200, types.RetornaUmaListaContendoOIdDasAssinaturasDeUmUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{email}/assinaturas', 'get', metadata);
  }

  /**
   * Atualiza o status de um cartão de crédito de um usuário
   *
   * @throws FetchError<500, types.AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioResponse500> 500
   */
  atualizaOStatusDeUmCartaoDeCreditoDeUmUsuario(body: types.AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioBodyParam, metadata: types.AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioResponse200>>;
  atualizaOStatusDeUmCartaoDeCreditoDeUmUsuario(metadata: types.AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioResponse200>>;
  atualizaOStatusDeUmCartaoDeCreditoDeUmUsuario(body?: types.AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioBodyParam | types.AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioMetadataParam, metadata?: types.AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioMetadataParam): Promise<FetchResponse<200, types.AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{email}/meusCartoes/{usuarioCartaoCreditoId}', 'put', body, metadata);
  }

  /**
   * Deleta um avatar de um usuário
   *
   * @throws FetchError<500, types.DeletaUmAvatarDeUmUsuarioResponse500> 500
   */
  deletaUmAvatarDeUmUsuario(metadata: types.DeletaUmAvatarDeUmUsuarioMetadataParam): Promise<FetchResponse<200, types.DeletaUmAvatarDeUmUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{email}/avatar', 'delete', metadata);
  }

  /**
   * Avatar do usuário encontrado
   *
   * @summary Retorna a url do avatar de um usuário
   * @throws FetchError<500, types.RetornaAUrlDoAvatarDeUmUsuarioResponse500> 500
   */
  retornaAUrlDoAvatarDeUmUsuario(metadata: types.RetornaAUrlDoAvatarDeUmUsuarioMetadataParam): Promise<FetchResponse<200, types.RetornaAUrlDoAvatarDeUmUsuarioResponse200>> {
    return this.core.fetch('/usuarios/{email}/avatar', 'get', metadata);
  }

  /**
   * Insere um novo avatar para o usuário
   *
   * @throws FetchError<500, types.InsereUmNovoAvatarParaOUsuarioResponse500> 500
   */
  insereUmNovoAvatarParaOUsuario(body: types.InsereUmNovoAvatarParaOUsuarioBodyParam, metadata: types.InsereUmNovoAvatarParaOUsuarioMetadataParam): Promise<FetchResponse<201, types.InsereUmNovoAvatarParaOUsuarioResponse201>>;
  insereUmNovoAvatarParaOUsuario(metadata: types.InsereUmNovoAvatarParaOUsuarioMetadataParam): Promise<FetchResponse<201, types.InsereUmNovoAvatarParaOUsuarioResponse201>>;
  insereUmNovoAvatarParaOUsuario(body?: types.InsereUmNovoAvatarParaOUsuarioBodyParam | types.InsereUmNovoAvatarParaOUsuarioMetadataParam, metadata?: types.InsereUmNovoAvatarParaOUsuarioMetadataParam): Promise<FetchResponse<201, types.InsereUmNovoAvatarParaOUsuarioResponse201>> {
    return this.core.fetch('/usuarios/{email}/avatar', 'post', body, metadata);
  }

  /**
   * Insere um novo campo de cadastro personalizado
   *
   * @throws FetchError<500, types.InsereUmNovoCampoDeCadastroPersonalizadoResponse500> 500
   */
  insereUmNovoCampoDeCadastroPersonalizado(body?: types.InsereUmNovoCampoDeCadastroPersonalizadoBodyParam): Promise<FetchResponse<201, types.InsereUmNovoCampoDeCadastroPersonalizadoResponse201>> {
    return this.core.fetch('/usuarios/CadastroPersonalizado', 'post', body);
  }

  /**
   * Campos de cadastro personalizado encontrados
   *
   * @summary Retorna os campos de cadastro personalizado existentes
   * @throws FetchError<500, types.RetornaOsCamposDeCadastroPersonalizadoExistentesResponse500> 500
   */
  retornaOsCamposDeCadastroPersonalizadoExistentes(): Promise<FetchResponse<201, types.RetornaOsCamposDeCadastroPersonalizadoExistentesResponse201>> {
    return this.core.fetch('/usuarios/camposcadastropersonalizado', 'get');
  }

  /**
   * Remove um campo de cadastro personalizado
   *
   * @throws FetchError<500, types.RemoveUmCampoDeCadastroPersonalizadoResponse500> 500
   */
  removeUmCampoDeCadastroPersonalizado(metadata: types.RemoveUmCampoDeCadastroPersonalizadoMetadataParam): Promise<FetchResponse<200, types.RemoveUmCampoDeCadastroPersonalizadoResponse200>> {
    return this.core.fetch('/usuarios/camposcadastropersonalizado/{camposcadastropersonalizadoId}', 'delete', metadata);
  }

  /**
   * Atualiza um campo de cadastro personalizado pelo id
   *
   * @throws FetchError<500, types.AtualizaUmCampoDeCadastroPersonalizadoPeloIdResponse500> 500
   */
  atualizaUmCampoDeCadastroPersonalizadoPeloId(body: types.AtualizaUmCampoDeCadastroPersonalizadoPeloIdBodyParam, metadata: types.AtualizaUmCampoDeCadastroPersonalizadoPeloIdMetadataParam): Promise<FetchResponse<200, types.AtualizaUmCampoDeCadastroPersonalizadoPeloIdResponse200>>;
  atualizaUmCampoDeCadastroPersonalizadoPeloId(metadata: types.AtualizaUmCampoDeCadastroPersonalizadoPeloIdMetadataParam): Promise<FetchResponse<200, types.AtualizaUmCampoDeCadastroPersonalizadoPeloIdResponse200>>;
  atualizaUmCampoDeCadastroPersonalizadoPeloId(body?: types.AtualizaUmCampoDeCadastroPersonalizadoPeloIdBodyParam | types.AtualizaUmCampoDeCadastroPersonalizadoPeloIdMetadataParam, metadata?: types.AtualizaUmCampoDeCadastroPersonalizadoPeloIdMetadataParam): Promise<FetchResponse<200, types.AtualizaUmCampoDeCadastroPersonalizadoPeloIdResponse200>> {
    return this.core.fetch('/usuarios/camposcadastropersonalizado/{camposcadastropersonalizadoId}', 'put', body, metadata);
  }

  /**
   * Remove um valor pré definido
   *
   * @throws FetchError<500, types.RemoveUmValorPreDefinidoResponse500> 500
   */
  removeUmValorPreDefinido(metadata: types.RemoveUmValorPreDefinidoMetadataParam): Promise<FetchResponse<200, types.RemoveUmValorPreDefinidoResponse200>> {
    return this.core.fetch('/usuarios/valoresdefinidoscadastropersonalizado/{valoresDefinidosCampoGrupoInformacaoId}', 'delete', metadata);
  }

  /**
   * Atualiza um valor pré definido pelo id
   *
   * @throws FetchError<500, types.AtualizaUmValorPreDefinidoPeloIdResponse500> 500
   */
  atualizaUmValorPreDefinidoPeloId(body: types.AtualizaUmValorPreDefinidoPeloIdBodyParam, metadata: types.AtualizaUmValorPreDefinidoPeloIdMetadataParam): Promise<FetchResponse<200, types.AtualizaUmValorPreDefinidoPeloIdResponse200>>;
  atualizaUmValorPreDefinidoPeloId(metadata: types.AtualizaUmValorPreDefinidoPeloIdMetadataParam): Promise<FetchResponse<200, types.AtualizaUmValorPreDefinidoPeloIdResponse200>>;
  atualizaUmValorPreDefinidoPeloId(body?: types.AtualizaUmValorPreDefinidoPeloIdBodyParam | types.AtualizaUmValorPreDefinidoPeloIdMetadataParam, metadata?: types.AtualizaUmValorPreDefinidoPeloIdMetadataParam): Promise<FetchResponse<200, types.AtualizaUmValorPreDefinidoPeloIdResponse200>> {
    return this.core.fetch('/usuarios/valoresdefinidoscadastropersonalizado/{valoresDefinidosCampoGrupoInformacaoId}', 'put', body, metadata);
  }

  /**
   * Operação realizada com ou sem sucesso para os usuários
   *
   * @summary Aprova um cadastro de usuário
   * @throws FetchError<500, types.AprovaUmCadastroDeUsuarioResponse500> 500
   */
  aprovaUmCadastroDeUsuario(body?: types.AprovaUmCadastroDeUsuarioBodyParam, metadata?: types.AprovaUmCadastroDeUsuarioMetadataParam): Promise<FetchResponse<200, types.AprovaUmCadastroDeUsuarioResponse200>> {
    return this.core.fetch('/usuarios/autorizar', 'put', body, metadata);
  }

  /**
   * Campo atualizado com sucesso
   *
   * @summary Bloqueia ou desbloqueia usuários
   * @throws FetchError<500, types.BloqueiaOuDesbloqueiaUsuariosResponse500> 500
   */
  bloqueiaOuDesbloqueiaUsuarios(body?: types.BloqueiaOuDesbloqueiaUsuariosBodyParam): Promise<FetchResponse<200, types.BloqueiaOuDesbloqueiaUsuariosResponse200>> {
    return this.core.fetch('/usuarios/bloquear', 'put', body);
  }

  /**
   * Lista de inscrições
   *
   * @summary Busca todas as inscrições inseridas
   * @throws FetchError<500, types.BuscaTodasAsInscricoesInseridasResponse500> 500
   */
  buscaTodasAsInscricoesInseridas(): Promise<FetchResponse<200, types.BuscaTodasAsInscricoesInseridasResponse200>> {
    return this.core.fetch('/webhook/inscricao', 'get');
  }

  /**
   * Insere uma inscrição
   *
   * @throws FetchError<500, types.InsereUmaInscricaoResponse500> 500
   */
  insereUmaInscricao(body: types.InsereUmaInscricaoBodyParam): Promise<FetchResponse<200, types.InsereUmaInscricaoResponse200>> {
    return this.core.fetch('/webhook/inscricao', 'post', body);
  }

  /**
   * Inscrição
   *
   * @summary Busca a inscrição por seu identificador
   * @throws FetchError<500, types.BuscaAInscricaoPorSeuIdentificadorResponse500> 500
   */
  buscaAInscricaoPorSeuIdentificador(metadata: types.BuscaAInscricaoPorSeuIdentificadorMetadataParam): Promise<FetchResponse<200, types.BuscaAInscricaoPorSeuIdentificadorResponse200>> {
    return this.core.fetch('/webhook/inscricao/{inscricaoId}', 'get', metadata);
  }

  /**
   * Atualiza uma inscrição
   *
   * @throws FetchError<500, types.AtualizaUmaInscricaoResponse500> 500
   */
  atualizaUmaInscricao(body: types.AtualizaUmaInscricaoBodyParam, metadata: types.AtualizaUmaInscricaoMetadataParam): Promise<FetchResponse<200, types.AtualizaUmaInscricaoResponse200>> {
    return this.core.fetch('/webhook/inscricao/{inscricaoId}', 'put', body, metadata);
  }

  /**
   * Ativa ou inativa uma inscrição
   *
   * @throws FetchError<500, types.AtivaOuInativaUmaInscricaoResponse500> 500
   */
  ativaOuInativaUmaInscricao(body: types.AtivaOuInativaUmaInscricaoBodyParam, metadata: types.AtivaOuInativaUmaInscricaoMetadataParam): Promise<FetchResponse<200, types.AtivaOuInativaUmaInscricaoResponse200>>;
  ativaOuInativaUmaInscricao(metadata: types.AtivaOuInativaUmaInscricaoMetadataParam): Promise<FetchResponse<200, types.AtivaOuInativaUmaInscricaoResponse200>>;
  ativaOuInativaUmaInscricao(body?: types.AtivaOuInativaUmaInscricaoBodyParam | types.AtivaOuInativaUmaInscricaoMetadataParam, metadata?: types.AtivaOuInativaUmaInscricaoMetadataParam): Promise<FetchResponse<200, types.AtivaOuInativaUmaInscricaoResponse200>> {
    return this.core.fetch('/webhook/inscricao/{inscricaoId}/Ativar', 'put', body, metadata);
  }

  /**
   * Lista de Tópicos
   *
   * @summary Busca os tópicos disponíveis para inscrição
   * @throws FetchError<500, types.BuscaOsTopicosDisponiveisParaInscricaoResponse500> 500
   */
  buscaOsTopicosDisponiveisParaInscricao(): Promise<FetchResponse<200, types.BuscaOsTopicosDisponiveisParaInscricaoResponse200>> {
    return this.core.fetch('/webhook/Topicos', 'get');
  }

  /** @throws FetchError<500, types.GetGruposCompreJuntosResponse500> Internal Server Error */
  get_gruposCompreJuntos(metadata?: types.GetGruposCompreJuntosMetadataParam): Promise<FetchResponse<200, types.GetGruposCompreJuntosResponse200>> {
    return this.core.fetch('/gruposCompreJuntos', 'get', metadata);
  }

  /** @throws FetchError<500, types.PostGruposCompreJuntosResponse500> Internal Server Error */
  post_gruposCompreJuntos(body?: types.PostGruposCompreJuntosBodyParam): Promise<FetchResponse<201, types.PostGruposCompreJuntosResponse201>> {
    return this.core.fetch('/gruposCompreJuntos', 'post', body);
  }

  /** @throws FetchError<500, types.DeleteGruposCompreJuntosGrupoCompreJuntoIdResponse500> Internal Server Error */
  delete_gruposCompreJuntosGrupoCompreJuntoId(metadata: types.DeleteGruposCompreJuntosGrupoCompreJuntoIdMetadataParam): Promise<FetchResponse<200, types.DeleteGruposCompreJuntosGrupoCompreJuntoIdResponse200>> {
    return this.core.fetch('/gruposCompreJuntos/{grupoCompreJuntoId}', 'delete', metadata);
  }

  get_gruposCompreJuntosGrupoCompreJuntoId(metadata: types.GetGruposCompreJuntosGrupoCompreJuntoIdMetadataParam): Promise<FetchResponse<200, types.GetGruposCompreJuntosGrupoCompreJuntoIdResponse200>> {
    return this.core.fetch('/gruposCompreJuntos/{grupoCompreJuntoId}', 'get', metadata);
  }

  /** @throws FetchError<500, types.PutGruposCompreJuntosGrupoComprejuntoIdStatusResponse500> Internal Server Error */
  put_gruposCompreJuntosGrupoComprejuntoIdStatus(metadata: types.PutGruposCompreJuntosGrupoComprejuntoIdStatusMetadataParam): Promise<FetchResponse<200, types.PutGruposCompreJuntosGrupoComprejuntoIdStatusResponse200>> {
    return this.core.fetch('/gruposCompreJuntos/{grupoComprejuntoId}/status', 'put', metadata);
  }

  patch_gruposCompreJuntosGrupoComprejuntoIdStatus(body: types.PatchGruposCompreJuntosGrupoComprejuntoIdStatusBodyParam, metadata: types.PatchGruposCompreJuntosGrupoComprejuntoIdStatusMetadataParam): Promise<FetchResponse<200, types.PatchGruposCompreJuntosGrupoComprejuntoIdStatusResponse200>> {
    return this.core.fetch('/gruposCompreJuntos/{grupoComprejuntoId}/status', 'patch', body, metadata);
  }

  /**
   * @throws FetchError<404, types.PatchGruposCompreJuntosGrupoCompreJuntoIdVincularProdutosResponse404> Not Found
   * @throws FetchError<500, types.PatchGruposCompreJuntosGrupoCompreJuntoIdVincularProdutosResponse500> Internal Server Error
   */
  patch_gruposCompreJuntosGrupoCompreJuntoIdVincularProdutos(body: types.PatchGruposCompreJuntosGrupoCompreJuntoIdVincularProdutosBodyParam, metadata: types.PatchGruposCompreJuntosGrupoCompreJuntoIdVincularProdutosMetadataParam): Promise<FetchResponse<200, types.PatchGruposCompreJuntosGrupoCompreJuntoIdVincularProdutosResponse200>> {
    return this.core.fetch('/gruposCompreJuntos/{grupoCompreJuntoId}/vincularProdutos', 'patch', body, metadata);
  }

  /**
   * @throws FetchError<422, types.GetNewEndpointResponse422> Unprocessable Entity
   * @throws FetchError<500, types.GetNewEndpointResponse500> Internal Server Error
   */
  get_newEndpoint(metadata: types.GetNewEndpointMetadataParam): Promise<FetchResponse<200, types.GetNewEndpointResponse200>> {
    return this.core.fetch('/tiposExibicao', 'put', metadata);
  }

  /**
   * @throws FetchError<422, types.PutProdutosexibirSiteResponse422> Unprocessable Entity
   * @throws FetchError<500, types.PutProdutosexibirSiteResponse500> Internal Server Error
   */
  put_produtosexibirSite(body?: types.PutProdutosexibirSiteBodyParam, metadata?: types.PutProdutosexibirSiteMetadataParam): Promise<FetchResponse<200, types.PutProdutosexibirSiteResponse200>> {
    return this.core.fetch('/produtos/exibirSite', 'put', body, metadata);
  }

  put_centrosdistribuicaoregraordenacao(body?: types.PutCentrosdistribuicaoregraordenacaoBodyParam): Promise<FetchResponse<200, types.PutCentrosdistribuicaoregraordenacaoResponse200>> {
    return this.core.fetch('/centrosdistribuicao/regra/ordenacao', 'put', body);
  }

  put_pedidosPedidoIdChangeorderendereco(body: types.PutPedidosPedidoIdChangeorderenderecoBodyParam, metadata: types.PutPedidosPedidoIdChangeorderenderecoMetadataParam): Promise<FetchResponse<200, types.PutPedidosPedidoIdChangeorderenderecoResponse200>> {
    return this.core.fetch('/pedidos/{pedidoId}/changeorder/endereco', 'put', body, metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AdicionaNovoProdutoBodyParam, AdicionaNovoProdutoResponse201, AdicionaNovoProdutoResponse500, AdicionaNovosAtacarejosBodyParam, AdicionaNovosAtacarejosMetadataParam, AdicionaNovosAtacarejosResponse200, AdicionaNovosAtacarejosResponse422, AdicionaNovosAtacarejosResponse500, AdicionaOVinculoEntreUmProdutoEUmaCategoriaBodyParam, AdicionaOVinculoEntreUmProdutoEUmaCategoriaMetadataParam, AdicionaOVinculoEntreUmProdutoEUmaCategoriaResponse200, AdicionaOVinculoEntreUmProdutoEUmaCategoriaResponse404, AdicionaOVinculoEntreUmProdutoEUmaCategoriaResponse500, AdicionaUmTipoDeNotificacaoBodyParam, AdicionaUmTipoDeNotificacaoMetadataParam, AdicionaUmTipoDeNotificacaoResponse200, AdicionaUmTipoDeNotificacaoResponse500, AdicionaUmVinculoEntreUsuarioEParceiroBodyParam, AdicionaUmVinculoEntreUsuarioEParceiroMetadataParam, AdicionaUmVinculoEntreUsuarioEParceiroResponse201, AdicionaUmVinculoEntreUsuarioEParceiroResponse500, AdicionaUmaNovaImagemVinculadaAUmProdutoBodyParam, AdicionaUmaNovaImagemVinculadaAUmProdutoMetadataParam, AdicionaUmaNovaImagemVinculadaAUmProdutoResponse200, AdicionaUmaNovaImagemVinculadaAUmProdutoResponse404, AdicionaUmaNovaImagemVinculadaAUmProdutoResponse500, AdicionaUmaNovaInformacaoBodyParam, AdicionaUmaNovaInformacaoMetadataParam, AdicionaUmaNovaInformacaoResponse200, AdicionaUmaNovaInformacaoResponse404, AdicionaUmaNovaInformacaoResponse500, AlteraADataDeRecorrenciaDeUmaAssinaturaBodyParam, AlteraADataDeRecorrenciaDeUmaAssinaturaMetadataParam, AlteraADataDeRecorrenciaDeUmaAssinaturaResponse200, AlteraADataDeRecorrenciaDeUmaAssinaturaResponse422, AlteraADataDeRecorrenciaDeUmaAssinaturaResponse500, AlteraOStatusDeUmPortfolioBodyParam, AlteraOStatusDeUmPortfolioMetadataParam, AlteraOStatusDeUmPortfolioResponse200, AlteraOStatusDeUmPortfolioResponse500, AprovaUmCadastroDeUsuarioBodyParam, AprovaUmCadastroDeUsuarioMetadataParam, AprovaUmCadastroDeUsuarioResponse200, AprovaUmCadastroDeUsuarioResponse500, ArquivaUmaRegiOBodyParam, ArquivaUmaRegiOMetadataParam, ArquivaUmaRegiOResponse200, ArquivaUmaRegiOResponse400, AtivaOuDesativaAsNotificacoesParaOUsuarioBodyParam, AtivaOuDesativaAsNotificacoesParaOUsuarioResponse200, AtivaOuDesativaAsNotificacoesParaOUsuarioResponse500, AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioBodyParam, AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioMetadataParam, AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioResponse200, AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoEMailDoUsuarioResponse500, AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioBodyParam, AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioMetadataParam, AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioResponse200, AtivaOuDesativaUmEnderecoDeUmUsuarioComBaseNoIdDoUsuarioResponse500, AtivaOuDesativaUmFreteBodyParam, AtivaOuDesativaUmFreteMetadataParam, AtivaOuDesativaUmFreteResponse200, AtivaOuDesativaUmFreteResponse422, AtivaOuDesativaUmFreteResponse500, AtivaOuDesativaUmSellerBodyParam, AtivaOuDesativaUmSellerMetadataParam, AtivaOuDesativaUmSellerResponse200, AtivaOuDesativaUmSellerResponse500, AtivaOuInativaUmaInscricaoBodyParam, AtivaOuInativaUmaInscricaoMetadataParam, AtivaOuInativaUmaInscricaoResponse200, AtivaOuInativaUmaInscricaoResponse500, AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerBodyParam, AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerMetadataParam, AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerResponse200, AtualizaAAtivacaoAutomaticaDeProdutosDeUmSellerResponse500, AtualizaAAutonomiaDeUmSellerBodyParam, AtualizaAAutonomiaDeUmSellerMetadataParam, AtualizaAAutonomiaDeUmSellerResponse200, AtualizaAAutonomiaDeUmSellerResponse500, AtualizaAComunicacaoDeUmUsuarioViaNewsletterBodyParam, AtualizaAComunicacaoDeUmUsuarioViaNewsletterMetadataParam, AtualizaAComunicacaoDeUmUsuarioViaNewsletterResponse200, AtualizaAComunicacaoDeUmUsuarioViaNewsletterResponse500, AtualizaADataDeCadastroDeUmProdutoBodyParam, AtualizaADataDeCadastroDeUmProdutoMetadataParam, AtualizaADataDeCadastroDeUmProdutoResponse200, AtualizaADataDeCadastroDeUmProdutoResponse404, AtualizaADataDeCadastroDeUmProdutoResponse500, AtualizaADataDeCadastroDeVRiosProdutosBodyParam, AtualizaADataDeCadastroDeVRiosProdutosMetadataParam, AtualizaADataDeCadastroDeVRiosProdutosResponse200, AtualizaADataDeCadastroDeVRiosProdutosResponse422, AtualizaADataDeCadastroDeVRiosProdutosResponse500, AtualizaADataDeEntregaDoPedidoBodyParam, AtualizaADataDeEntregaDoPedidoMetadataParam, AtualizaADataDeEntregaDoPedidoResponse200, AtualizaADataDeEntregaDoPedidoResponse422, AtualizaADataDeEntregaDoPedidoResponse500, AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoBodyParam, AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoMetadataParam, AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoResponse200, AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoResponse422, AtualizaAExibicaoDoBannerEmParceirosSeDeveSerEmTodosOuNaoResponse500, AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoBodyParam, AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoMetadataParam, AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoResponse200, AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoResponse422, AtualizaAExibicaoDoBannerNosHotsitesSeDeveSerEmTodosOuNaoResponse500, AtualizaAImagemDeEstampaDoProdutoBodyParam, AtualizaAImagemDeEstampaDoProdutoMetadataParam, AtualizaAImagemDeEstampaDoProdutoResponse200, AtualizaAImagemDeEstampaDoProdutoResponse404, AtualizaAImagemDeEstampaDoProdutoResponse500, AtualizaAImagemDoBannerBodyParam, AtualizaAImagemDoBannerMetadataParam, AtualizaAImagemDoBannerResponse200, AtualizaAImagemDoBannerResponse422, AtualizaAImagemDoBannerResponse500, AtualizaAOrdemDasImagensDeUmaListaDeComprasBodyParam, AtualizaAOrdemDasImagensDeUmaListaDeComprasMetadataParam, AtualizaAOrdemDasImagensDeUmaListaDeComprasResponse200, AtualizaAOrdemDasImagensDeUmaListaDeComprasResponse404, AtualizaAOrdemDasImagensDeUmaListaDeComprasResponse500, AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaBodyParam, AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaMetadataParam, AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaResponse200, AtualizaAOrdemDeExibiODeUmOuMaisProdutosDeUmaCategoriaResponse500, AtualizaAOrdemDeExibiODosProdutosNasCategoriasBodyParam, AtualizaAOrdemDeExibiODosProdutosNasCategoriasResponse200, AtualizaAOrdemDeExibiODosProdutosNasCategoriasResponse400, AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1BodyParam, AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1MetadataParam, AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1Response200, AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1Response422, AtualizaAPropriedadeVistoDaNotificacaoPorUsuarioParaTruefalse1Response500, AtualizaARecorrNciaDeUmaAssinaturaEspecFicaBodyParam, AtualizaARecorrNciaDeUmaAssinaturaEspecFicaMetadataParam, AtualizaARecorrNciaDeUmaAssinaturaEspecFicaResponse200, AtualizaARecorrNciaDeUmaAssinaturaEspecFicaResponse400, AtualizaARecorrNciaDeUmaAssinaturaEspecFicaResponse500, AtualizaASituacaoDeUmaAssinaturaEspecificaBodyParam, AtualizaASituacaoDeUmaAssinaturaEspecificaMetadataParam, AtualizaASituacaoDeUmaAssinaturaEspecificaResponse200, AtualizaASituacaoDeUmaAssinaturaEspecificaResponse500, AtualizaASituacaoDoStatusDeUmProdutoDoPedidoBodyParam, AtualizaASituacaoDoStatusDeUmProdutoDoPedidoMetadataParam, AtualizaASituacaoDoStatusDeUmProdutoDoPedidoResponse200, AtualizaASituacaoDoStatusDeUmProdutoDoPedidoResponse422, AtualizaASituacaoDoStatusDeUmProdutoDoPedidoResponse500, AtualizaASituacaoDoStatusDoPedidoBodyParam, AtualizaASituacaoDoStatusDoPedidoMetadataParam, AtualizaASituacaoDoStatusDoPedidoResponse200, AtualizaASituacaoDoStatusDoPedidoResponse422, AtualizaASituacaoDoStatusDoPedidoResponse500, AtualizaAsInformaEsCadastraisDeUmOuMaisUsuRiosBodyParam, AtualizaAsInformaEsCadastraisDeUmOuMaisUsuRiosMetadataParam, AtualizaAsInformaEsCadastraisDeUmOuMaisUsuRiosResponse200, AtualizaAsInformaEsCadastraisDeUmOuMaisUsuRiosResponse500, AtualizaDadosBSicosDeUmaListaDeComprasBodyParam, AtualizaDadosBSicosDeUmaListaDeComprasMetadataParam, AtualizaDadosBSicosDeUmaListaDeComprasResponse200, AtualizaDadosBSicosDeUmaListaDeComprasResponse404, AtualizaDadosBSicosDeUmaListaDeComprasResponse500, AtualizaDadosDeUmOuMaisGruposDeListaDeComprasBodyParam, AtualizaDadosDeUmOuMaisGruposDeListaDeComprasResponse201, AtualizaDadosDeUmOuMaisGruposDeListaDeComprasResponse500, AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestBodyParam, AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestMetadataParam, AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestResponse200, AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestResponse422, AtualizaListaDeProdutosVinculadosAUmEventoRemovendoOsItensVinculadosAnteriormenteEMantendoApenasOsEnviadosPeloRequestResponse500, AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoBodyParam, AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoMetadataParam, AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoResponse200, AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoResponse422, AtualizaOCampoRecebidoDeUmProdutoVinculadoAUmEventoResponse500, AtualizaOEstoqueDeVariosProdutosBodyParam, AtualizaOEstoqueDeVariosProdutosMetadataParam, AtualizaOEstoqueDeVariosProdutosResponse200, AtualizaOEstoqueDeVariosProdutosResponse422, AtualizaOEstoqueDeVariosProdutosResponse500, AtualizaOFreteDeTodosOsProdutosDeUmPedidoBodyParam, AtualizaOFreteDeTodosOsProdutosDeUmPedidoMetadataParam, AtualizaOFreteDeTodosOsProdutosDeUmPedidoResponse200, AtualizaOFreteDeTodosOsProdutosDeUmPedidoResponse422, AtualizaOFreteDeTodosOsProdutosDeUmPedidoResponse500, AtualizaOPrazoDeEntregaDeVRiosProdutosBodyParam, AtualizaOPrazoDeEntregaDeVRiosProdutosMetadataParam, AtualizaOPrazoDeEntregaDeVRiosProdutosResponse200, AtualizaOPrazoDeEntregaDeVRiosProdutosResponse400, AtualizaOPrazoDeEntregaDeVRiosProdutosResponse422, AtualizaOPrecoDeVariosProdutosBodyParam, AtualizaOPrecoDeVariosProdutosMetadataParam, AtualizaOPrecoDeVariosProdutosResponse200, AtualizaOPrecoDeVariosProdutosResponse500, AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioBodyParam, AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioMetadataParam, AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioResponse200, AtualizaOStatusDeUmCartaoDeCreditoDeUmUsuarioResponse500, AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteBodyParam, AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteMetadataParam, AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteResponse200, AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteResponse422, AtualizaOStatusDeUmaAvaliacaoDeUmProdutoVarianteResponse500, AtualizaOStatusDoBannerPeloIdBodyParam, AtualizaOStatusDoBannerPeloIdMetadataParam, AtualizaOStatusDoBannerPeloIdResponse200, AtualizaOStatusDoBannerPeloIdResponse422, AtualizaOStatusDoBannerPeloIdResponse500, AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseBodyParam, AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseMetadataParam, AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseResponse200, AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseResponse422, AtualizaOStatusDoHotsiteSendoAtivoTrueOuInativoFalseResponse500, AtualizaOStatusDoTipoDeEventoAtivandoOOuInativandoOMetadataParam, AtualizaOStatusDoTipoDeEventoAtivandoOOuInativandoOResponse200, AtualizaOStatusDoTipoDeEventoAtivandoOOuInativandoOResponse500, AtualizaOTipoEventoBodyParam, AtualizaOTipoEventoMetadataParam, AtualizaOTipoEventoResponse200, AtualizaOTipoEventoResponse500, AtualizaOTitleDoSeoDeUmaListaDeComprasBodyParam, AtualizaOTitleDoSeoDeUmaListaDeComprasMetadataParam, AtualizaOTitleDoSeoDeUmaListaDeComprasResponse200, AtualizaOTitleDoSeoDeUmaListaDeComprasResponse404, AtualizaOTitleDoSeoDeUmaListaDeComprasResponse500, AtualizaOsDadosDeUmHotsiteExistenteBodyParam, AtualizaOsDadosDeUmHotsiteExistenteMetadataParam, AtualizaOsDadosDeUmHotsiteExistenteResponse200, AtualizaOsDadosDeUmHotsiteExistenteResponse422, AtualizaOsDadosDeUmHotsiteExistenteResponse500, AtualizaOsProdutosDeUmPedidoBodyParam, AtualizaOsProdutosDeUmPedidoMetadataParam, AtualizaOsProdutosDeUmPedidoResponse200, AtualizaOsProdutosDeUmPedidoResponse422, AtualizaOsProdutosDeUmPedidoResponse500, AtualizaOsProdutosSugeridosDeUmTipoDeEventoBodyParam, AtualizaOsProdutosSugeridosDeUmTipoDeEventoMetadataParam, AtualizaOsProdutosSugeridosDeUmTipoDeEventoResponse200, AtualizaOsProdutosSugeridosDeUmTipoDeEventoResponse500, AtualizaParaOMesmoPrecoTodosOsVariantesDeUmProdutoEncontradoComOSkuInformadoBodyParam, AtualizaParaOMesmoPrecoTodosOsVariantesDeUmProdutoEncontradoComOSkuInformadoResponse200, AtualizaParaOMesmoPrecoTodosOsVariantesDeUmProdutoEncontradoComOSkuInformadoResponse500, AtualizaParcialmenteUmProdutoBodyParam, AtualizaParcialmenteUmProdutoMetadataParam, AtualizaParcialmenteUmProdutoResponse200, AtualizaParcialmenteUmProdutoResponse206, AtualizaRastreamentoCompletoComOsDadosDaNfBodyParam, AtualizaRastreamentoCompletoComOsDadosDaNfMetadataParam, AtualizaRastreamentoCompletoComOsDadosDaNfResponse200, AtualizaRastreamentoCompletoComOsDadosDaNfResponse422, AtualizaRastreamentoCompletoComOsDadosDaNfResponse500, AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfBodyParam, AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfMetadataParam, AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfResponse200, AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfResponse422, AtualizaRastreamentoDeProdutoCompletoComOsDadosDaNfResponse500, AtualizaRastreamentoParcialRastreamentoEUrlrastreamento1BodyParam, AtualizaRastreamentoParcialRastreamentoEUrlrastreamento1MetadataParam, AtualizaRastreamentoParcialRastreamentoEUrlrastreamento1Response200, AtualizaRastreamentoParcialRastreamentoEUrlrastreamento1Response422, AtualizaRastreamentoParcialRastreamentoEUrlrastreamento1Response500, AtualizaRastreamentoParcialRastreamentoEUrlrastreamentoBodyParam, AtualizaRastreamentoParcialRastreamentoEUrlrastreamentoMetadataParam, AtualizaRastreamentoParcialRastreamentoEUrlrastreamentoResponse200, AtualizaRastreamentoParcialRastreamentoEUrlrastreamentoResponse422, AtualizaRastreamentoParcialRastreamentoEUrlrastreamentoResponse500, AtualizaRegiOeRetornaTrueEmCasoDeSucessoBodyParam, AtualizaRegiOeRetornaTrueEmCasoDeSucessoMetadataParam, AtualizaRegiOeRetornaTrueEmCasoDeSucessoResponse200, AtualizaRegiOeRetornaTrueEmCasoDeSucessoResponse422, AtualizaUmAtacarejoBodyParam, AtualizaUmAtacarejoMetadataParam, AtualizaUmAtacarejoResponse201, AtualizaUmAtacarejoResponse422, AtualizaUmAtacarejoResponse500, AtualizaUmAtributoBodyParam, AtualizaUmAtributoMetadataParam, AtualizaUmAtributoResponse200, AtualizaUmAtributoResponse422, AtualizaUmAtributoResponse500, AtualizaUmBannerExistenteBodyParam, AtualizaUmBannerExistenteMetadataParam, AtualizaUmBannerExistenteResponse200, AtualizaUmBannerExistenteResponse422, AtualizaUmBannerExistenteResponse500, AtualizaUmCampoDeCadastroPersonalizadoPeloIdBodyParam, AtualizaUmCampoDeCadastroPersonalizadoPeloIdMetadataParam, AtualizaUmCampoDeCadastroPersonalizadoPeloIdResponse200, AtualizaUmCampoDeCadastroPersonalizadoPeloIdResponse500, AtualizaUmConteudoBodyParam, AtualizaUmConteudoMetadataParam, AtualizaUmConteudoResponse200, AtualizaUmConteudoResponse422, AtualizaUmConteudoResponse500, AtualizaUmContratoDeFreteBodyParam, AtualizaUmContratoDeFreteMetadataParam, AtualizaUmContratoDeFreteResponse200, AtualizaUmContratoDeFreteResponse422, AtualizaUmContratoDeFreteResponse500, AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioBodyParam, AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioMetadataParam, AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioResponse200, AtualizaUmEnderecoDeUmUsuarioPeloEMailDoUsuarioResponse500, AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioBodyParam, AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioMetadataParam, AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioResponse200, AtualizaUmEnderecoDeUmUsuarioPeloIdDoUsuarioResponse500, AtualizaUmEventoBodyParam, AtualizaUmEventoMetadataParam, AtualizaUmEventoResponse200, AtualizaUmEventoResponse422, AtualizaUmEventoResponse500, AtualizaUmFabricanteBodyParam, AtualizaUmFabricanteMetadataParam, AtualizaUmFabricanteResponse200, AtualizaUmFabricanteResponse422, AtualizaUmFabricanteResponse500, AtualizaUmNovoSellerNoMarketplaceBodyParam, AtualizaUmNovoSellerNoMarketplaceMetadataParam, AtualizaUmNovoSellerNoMarketplaceResponse200, AtualizaUmNovoSellerNoMarketplaceResponse500, AtualizaUmParceiroBodyParam, AtualizaUmParceiroMetadataParam, AtualizaUmParceiroParaTipoMarketplaceOuNaoBodyParam, AtualizaUmParceiroParaTipoMarketplaceOuNaoMetadataParam, AtualizaUmParceiroParaTipoMarketplaceOuNaoResponse200, AtualizaUmParceiroParaTipoMarketplaceOuNaoResponse500, AtualizaUmParceiroResponse200, AtualizaUmParceiroResponse500, AtualizaUmPortfolioBodyParam, AtualizaUmPortfolioMetadataParam, AtualizaUmPortfolioResponse200, AtualizaUmPortfolioResponse500, AtualizaUmProdutoBodyParam, AtualizaUmProdutoEmUmaAssinaturaBodyParam, AtualizaUmProdutoEmUmaAssinaturaMetadataParam, AtualizaUmProdutoEmUmaAssinaturaResponse201, AtualizaUmProdutoEmUmaAssinaturaResponse422, AtualizaUmProdutoEmUmaAssinaturaResponse500, AtualizaUmProdutoMetadataParam, AtualizaUmProdutoResponse200, AtualizaUmProdutoResponse500, AtualizaUmScriptExistenteBodyParam, AtualizaUmScriptExistenteMetadataParam, AtualizaUmScriptExistenteResponse200, AtualizaUmScriptExistenteResponse422, AtualizaUmScriptExistenteResponse500, AtualizaUmSeoDeUmProdutoEspecificoBodyParam, AtualizaUmSeoDeUmProdutoEspecificoMetadataParam, AtualizaUmSeoDeUmProdutoEspecificoResponse200, AtualizaUmSeoDeUmProdutoEspecificoResponse500, AtualizaUmUsuarioPeloEmailBodyParam, AtualizaUmUsuarioPeloEmailMetadataParam, AtualizaUmUsuarioPeloEmailResponse200, AtualizaUmUsuarioPeloEmailResponse500, AtualizaUmUsuarioPeloIdBodyParam, AtualizaUmUsuarioPeloIdMetadataParam, AtualizaUmUsuarioPeloIdResponse200, AtualizaUmUsuarioPeloIdResponse422, AtualizaUmUsuarioPeloIdResponse500, AtualizaUmValorPreDefinidoPeloIdBodyParam, AtualizaUmValorPreDefinidoPeloIdMetadataParam, AtualizaUmValorPreDefinidoPeloIdResponse200, AtualizaUmValorPreDefinidoPeloIdResponse500, AtualizaUmVinculoEntreUsuarioEParceiroBodyParam, AtualizaUmVinculoEntreUsuarioEParceiroMetadataParam, AtualizaUmVinculoEntreUsuarioEParceiroResponse200, AtualizaUmVinculoEntreUsuarioEParceiroResponse500, AtualizaUmaCategoriaBodyParam, AtualizaUmaCategoriaMetadataParam, AtualizaUmaCategoriaResponse200, AtualizaUmaCategoriaResponse422, AtualizaUmaCategoriaResponse500, AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorBodyParam, AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorMetadataParam, AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse200, AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse422, AtualizaUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse500, AtualizaUmaInformacaoDeUmProdutoBodyParam, AtualizaUmaInformacaoDeUmProdutoMetadataParam, AtualizaUmaInformacaoDeUmProdutoResponse200, AtualizaUmaInformacaoDeUmProdutoResponse404, AtualizaUmaInformacaoDeUmProdutoResponse500, AtualizaUmaInscricaoBodyParam, AtualizaUmaInscricaoMetadataParam, AtualizaUmaInscricaoResponse200, AtualizaUmaInscricaoResponse500, AtualizaUmaListaDeProdutoVariantesEmUmaTabelaDePrecosBodyParam, AtualizaUmaListaDeProdutoVariantesEmUmaTabelaDePrecosMetadataParam, AtualizaUmaListaDeProdutoVariantesEmUmaTabelaDePrecosResponse200, AtualizaUmaListaDeProdutoVariantesEmUmaTabelaDePrecosResponse500, AtualizaUmaLojaFisicaBodyParam, AtualizaUmaLojaFisicaMetadataParam, AtualizaUmaLojaFisicaResponse200, AtualizaUmaLojaFisicaResponse422, AtualizaUmaLojaFisicaResponse500, AtualizaUmaTabelaDePrecosBodyParam, AtualizaUmaTabelaDePrecosMetadataParam, AtualizaUmaTabelaDePrecosResponse200, AtualizaUmaTabelaDePrecosResponse500, AtualizarAutorBodyParam, AtualizarAutorMetadataParam, AtualizarAutorResponse200, AtualizarAutorResponse422, AtualizarAutorResponse500, BloqueiaOuDesbloqueiaUsuariosBodyParam, BloqueiaOuDesbloqueiaUsuariosResponse200, BloqueiaOuDesbloqueiaUsuariosResponse500, BuscaAInscricaoPorSeuIdentificadorMetadataParam, BuscaAInscricaoPorSeuIdentificadorResponse200, BuscaAInscricaoPorSeuIdentificadorResponse500, BuscaAQuantidadeDeNotificacoesNaoLidasPeloUsuarioResponse200, BuscaAQuantidadeDeNotificacoesNaoLidasPeloUsuarioResponse500, BuscaNotificacoesReferentesAoUsuarioMetadataParam, BuscaNotificacoesReferentesAoUsuarioResponse200, BuscaNotificacoesReferentesAoUsuarioResponse500, BuscaOConteudoDeUmaVersaoMetadataParam, BuscaOConteudoDeUmaVersaoResponse200, BuscaOConteudoDeUmaVersaoResponse422, BuscaOConteudoDeUmaVersaoResponse500, BuscaOConteudoPeloSeuIdMetadataParam, BuscaOConteudoPeloSeuIdResponse200, BuscaOConteudoPeloSeuIdResponse500, BuscaOSeoDeUmProdutoEspecificoMetadataParam, BuscaOSeoDeUmProdutoEspecificoResponse200, BuscaOSeoDeUmProdutoEspecificoResponse500, BuscaOsBannersVinculadosAUmHotsiteEspecificoMetadataParam, BuscaOsBannersVinculadosAUmHotsiteEspecificoResponse200, BuscaOsBannersVinculadosAUmHotsiteEspecificoResponse422, BuscaOsBannersVinculadosAUmHotsiteEspecificoResponse500, BuscaOsConteudosVinculadosAUmHotsiteEspecificoMetadataParam, BuscaOsConteudosVinculadosAUmHotsiteEspecificoResponse200, BuscaOsConteudosVinculadosAUmHotsiteEspecificoResponse422, BuscaOsConteudosVinculadosAUmHotsiteEspecificoResponse500, BuscaOsCritRiosScoreDaLojaResponse200, BuscaOsCritRiosScoreDaLojaResponse400, BuscaOsEstadosResponse200, BuscaOsEstadosResponse400, BuscaOsEstadosResponse500, BuscaOsHotsitesVinculadosDeUmBannerEspecificoMetadataParam, BuscaOsHotsitesVinculadosDeUmBannerEspecificoResponse200, BuscaOsHotsitesVinculadosDeUmBannerEspecificoResponse422, BuscaOsHotsitesVinculadosDeUmBannerEspecificoResponse500, BuscaOsIdsDosTiposDeNotificacoesQueEstaoAtivadasParaOUsuarioResponse200, BuscaOsIdsDosTiposDeNotificacoesQueEstaoAtivadasParaOUsuarioResponse500, BuscaOsMetatagsDeUmProdutoEspecificoMetadataParam, BuscaOsMetatagsDeUmProdutoEspecificoResponse200, BuscaOsMetatagsDeUmProdutoEspecificoResponse500, BuscaOsParceirosVinculadosDeUmBannerEspecificoMetadataParam, BuscaOsParceirosVinculadosDeUmBannerEspecificoResponse200, BuscaOsParceirosVinculadosDeUmBannerEspecificoResponse422, BuscaOsParceirosVinculadosDeUmBannerEspecificoResponse500, BuscaOsPossiveisPosicionamentosParaOBannerResponse200, BuscaOsPossiveisPosicionamentosParaOBannerResponse422, BuscaOsPossiveisPosicionamentosParaOBannerResponse500, BuscaOsProdutosRelacionadosMetadataParam, BuscaOsProdutosRelacionadosResponse200, BuscaOsProdutosRelacionadosResponse404, BuscaOsProdutosRelacionadosResponse500, BuscaOsProdutosSugeridosParaAListaDeEventoMetadataParam, BuscaOsProdutosSugeridosParaAListaDeEventoResponse200, BuscaOsTopicosDisponiveisParaInscricaoResponse200, BuscaOsTopicosDisponiveisParaInscricaoResponse500, BuscaPedidosQueAindaNaoForamSetadoOCompleteResponse200, BuscaPedidosQueAindaNaoForamSetadoOCompleteResponse422, BuscaPedidosQueAindaNaoForamSetadoOCompleteResponse500, BuscaProdutosVinculadosAUmEventoMetadataParam, BuscaProdutosVinculadosAUmEventoResponse200, BuscaProdutosVinculadosAUmEventoResponse422, BuscaProdutosVinculadosAUmEventoResponse500, BuscaTodasAsInscricoesInseridasResponse200, BuscaTodasAsInscricoesInseridasResponse500, BuscaTodasAsMovimentacoesDeContaCorrenteDeUmUsuarioMetadataParam, BuscaTodasAsMovimentacoesDeContaCorrenteDeUmUsuarioResponse200, BuscaTodasAsMovimentacoesDeContaCorrenteDeUmUsuarioResponse422, BuscaTodasAsMovimentacoesDeContaCorrenteDeUmUsuarioResponse500, BuscaTodasAsVersoesDeUmScriptMetadataParam, BuscaTodasAsVersoesDeUmScriptResponse200, BuscaTodasAsVersoesDeUmScriptResponse422, BuscaTodasAsVersoesDeUmScriptResponse500, BuscaTodosBannersMetadataParam, BuscaTodosBannersResponse200, BuscaTodosBannersResponse422, BuscaTodosBannersResponse500, BuscaTodosOsConteudosMetadataParam, BuscaTodosOsConteudosResponse200, BuscaTodosOsConteudosResponse422, BuscaTodosOsConteudosResponse500, BuscaTodosOsHotsitesInseridosMetadataParam, BuscaTodosOsHotsitesInseridosResponse200, BuscaTodosOsHotsitesInseridosResponse422, BuscaTodosOsHotsitesInseridosResponse500, BuscaTodosOsScriptsInseridosResponse200, BuscaTodosOsScriptsInseridosResponse422, BuscaTodosOsScriptsInseridosResponse500, BuscaUmHotsiteEspecificoMetadataParam, BuscaUmHotsiteEspecificoResponse200, BuscaUmHotsiteEspecificoResponse422, BuscaUmHotsiteEspecificoResponse500, BuscarAutorPeloNomeMetadataParam, BuscarAutorPeloNomeResponse200, BuscarAutorPeloNomeResponse422, BuscarAutorPeloNomeResponse500, BuscarAutorPorIdMetadataParam, BuscarAutorPorIdResponse200, BuscarAutorPorIdResponse422, BuscarAutorPorIdResponse500, BuscarBannerPorIdMetadataParam, BuscarBannerPorIdResponse200, BuscarBannerPorIdResponse422, BuscarBannerPorIdResponse500, BuscarTodosOsAutoresResponse200, BuscarTodosOsAutoresResponse422, BuscarTodosOsAutoresResponse500, CriaAssinaturaComBaseEmUmaListaDePedidosBodyParam, CriaAssinaturaComBaseEmUmaListaDePedidosResponse200, CriaAssinaturaComBaseEmUmaListaDePedidosResponse422, CriaAssinaturaComBaseEmUmaListaDePedidosResponse500, CriaUmCritRioDeScoreParaUmCentroDeDistribuiOBodyParam, CriaUmCritRioDeScoreParaUmCentroDeDistribuiOResponse200, CriaUmCritRioDeScoreParaUmCentroDeDistribuiOResponse500, CriaUmNovoEventoBodyParam, CriaUmNovoEventoResponse200, CriaUmNovoEventoResponse422, CriaUmNovoEventoResponse500, DefineUmaCategoriaDeUmProdutoComoPrincipalBodyParam, DefineUmaCategoriaDeUmProdutoComoPrincipalMetadataParam, DefineUmaCategoriaDeUmProdutoComoPrincipalResponse200, DefineUmaCategoriaDeUmProdutoComoPrincipalResponse404, DefineUmaCategoriaDeUmProdutoComoPrincipalResponse500, DeletaDadosDeUmOuMaisGruposDeListaDeComprasBodyParam, DeletaDadosDeUmOuMaisGruposDeListaDeComprasResponse201, DeletaDadosDeUmOuMaisGruposDeListaDeComprasResponse500, DeletaOSeoDeUmProdutoEspecificoMetadataParam, DeletaOSeoDeUmProdutoEspecificoResponse200, DeletaOSeoDeUmProdutoEspecificoResponse500, DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoBodyParam, DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoMetadataParam, DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoResponse200, DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoResponse422, DeletaOVinculoDeUmOuMaisHotsitesComUmBannerEspecificoResponse500, DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoBodyParam, DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoMetadataParam, DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoResponse200, DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoResponse422, DeletaOVinculoDeUmOuMaisParceirosComUmBannerEspecificoResponse500, DeletaOVinculoDeUmProdutoAUmEventoMetadataParam, DeletaOVinculoDeUmProdutoAUmEventoResponse200, DeletaOVinculoDeUmProdutoAUmEventoResponse422, DeletaOVinculoDeUmProdutoAUmEventoResponse500, DeletaUmAtributoMetadataParam, DeletaUmAtributoResponse200, DeletaUmAtributoResponse422, DeletaUmAtributoResponse500, DeletaUmAvatarDeUmUsuarioMetadataParam, DeletaUmAvatarDeUmUsuarioResponse200, DeletaUmAvatarDeUmUsuarioResponse500, DeletaUmBannerExistenteMetadataParam, DeletaUmBannerExistenteResponse200, DeletaUmBannerExistenteResponse422, DeletaUmBannerExistenteResponse500, DeletaUmConjuntoDeProdutosPorSkuOuProdutovarianteidBodyParam, DeletaUmConjuntoDeProdutosPorSkuOuProdutovarianteidMetadataParam, DeletaUmConjuntoDeProdutosPorSkuOuProdutovarianteidResponse200, DeletaUmConjuntoDeProdutosPorSkuOuProdutovarianteidResponse400, DeletaUmHotsiteQueFoiInseridoManualmenteHotsitesGeradosAutomaticamenteNaoPodemSerDeletadosMetadataParam, DeletaUmHotsiteQueFoiInseridoManualmenteHotsitesGeradosAutomaticamenteNaoPodemSerDeletadosResponse200, DeletaUmHotsiteQueFoiInseridoManualmenteHotsitesGeradosAutomaticamenteNaoPodemSerDeletadosResponse422, DeletaUmHotsiteQueFoiInseridoManualmenteHotsitesGeradosAutomaticamenteNaoPodemSerDeletadosResponse500, DeletaUmOuMaisMetatagsDeProdutoBodyParam, DeletaUmOuMaisMetatagsDeProdutoMetadataParam, DeletaUmOuMaisMetatagsDeProdutoResponse200, DeletaUmOuMaisMetatagsDeProdutoResponse500, DeletaUmPortfolioMetadataParam, DeletaUmPortfolioResponse200, DeletaUmPortfolioResponse500, DeletaUmProdutoDaListaDeSugestoesDeProdutosDeUmTipoDeEventoMetadataParam, DeletaUmProdutoDaListaDeSugestoesDeProdutosDeUmTipoDeEventoResponse200, DeletaUmProdutoDaListaDeSugestoesDeProdutosDeUmTipoDeEventoResponse500, DeletarAutorMetadataParam, DeletarAutorResponse200, DeletarAutorResponse422, DeletarAutorResponse500, DeleteGruposCompreJuntosGrupoCompreJuntoIdMetadataParam, DeleteGruposCompreJuntosGrupoCompreJuntoIdResponse200, DeleteGruposCompreJuntosGrupoCompreJuntoIdResponse500, DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoBodyParam, DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoMetadataParam, DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoResponse200, DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoResponse422, DesvinculaUmOuMaisBannersDeUmHotsiteEspecificoResponse500, DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoBodyParam, DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoMetadataParam, DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoResponse200, DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoResponse422, DesvinculaUmOuMaisConteudosDeUmHotsiteEspecificoResponse500, EstornaTotalOuParcialDeUmPedidoBodyParam, EstornaTotalOuParcialDeUmPedidoMetadataParam, EstornaTotalOuParcialDeUmPedidoResponse200, EstornaTotalOuParcialDeUmPedidoResponse400, EstornaTotalOuParcialDeUmPedidoResponse500, ExcluiImagensDeUmaListaDeComprasBodyParam, ExcluiImagensDeUmaListaDeComprasMetadataParam, ExcluiImagensDeUmaListaDeComprasResponse200, ExcluiImagensDeUmaListaDeComprasResponse404, ExcluiImagensDeUmaListaDeComprasResponse500, ExcluiOVinculoEntreUmaCategoriaEUmProdutoMetadataParam, ExcluiOVinculoEntreUmaCategoriaEUmProdutoResponse200, ExcluiOVinculoEntreUmaCategoriaEUmProdutoResponse404, ExcluiOVinculoEntreUmaCategoriaEUmProdutoResponse500, ExcluiOsDetalhesDeUmContratoDeFreteMetadataParam, ExcluiOsDetalhesDeUmContratoDeFreteResponse200, ExcluiOsDetalhesDeUmContratoDeFreteResponse422, ExcluiOsDetalhesDeUmContratoDeFreteResponse500, ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaBodyParam, ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaMetadataParam, ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaResponse200, ExcluiOvNculoDeUmOuMaisProdutosDeUmaCategoriaResponse500, ExcluiUmFabricanteMetadataParam, ExcluiUmFabricanteResponse200, ExcluiUmFabricanteResponse422, ExcluiUmFabricanteResponse500, ExcluiUmParceiroMetadataParam, ExcluiUmParceiroResponse200, ExcluiUmParceiroResponse500, ExcluiUmScriptMetadataParam, ExcluiUmScriptResponse200, ExcluiUmScriptResponse422, ExcluiUmScriptResponse500, ExcluiUmaCategoriaMetadataParam, ExcluiUmaCategoriaResponse200, ExcluiUmaCategoriaResponse422, ExcluiUmaCategoriaResponse500, ExcluiUmaCategoriaUtilizandoOIdDoErpComoIdentificadorMetadataParam, ExcluiUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse200, ExcluiUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse422, ExcluiUmaCategoriaUtilizandoOIdDoErpComoIdentificadorResponse500, ExcluiUmaImagemDeUmProdutoMetadataParam, ExcluiUmaImagemDeUmProdutoResponse200, ExcluiUmaImagemDeUmProdutoResponse404, ExcluiUmaImagemDeUmProdutoResponse500, ExcluiUmaInformacaoDeUmProdutoMetadataParam, ExcluiUmaInformacaoDeUmProdutoResponse200, ExcluiUmaInformacaoDeUmProdutoResponse404, ExcluiUmaInformacaoDeUmProdutoResponse500, ExcluiUmaTabelaDePrecosMetadataParam, ExcluiUmaTabelaDePrecosResponse200, ExcluiUmaTabelaDePrecosResponse500, ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasBodyParam, ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasMetadataParam, ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasResponse200, ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasResponse422, ExcluiVNculoDeGruposDeListaDeUmaListaDeComprasResponse500, ExcluiVNculoDeSeoDeUmaListaDeComprasMetadataParam, ExcluiVNculoDeSeoDeUmaListaDeComprasResponse200, ExcluiVNculoDeSeoDeUmaListaDeComprasResponse422, ExcluiVNculoDeSeoDeUmaListaDeComprasResponse500, ExcluiVNculoDosProdutosDeUmaListaDeComprasBodyParam, ExcluiVNculoDosProdutosDeUmaListaDeComprasMetadataParam, ExcluiVNculoDosProdutosDeUmaListaDeComprasResponse200, ExcluiVNculoDosProdutosDeUmaListaDeComprasResponse422, ExcluiVNculoDosProdutosDeUmaListaDeComprasResponse500, ExcluirUmaListaDeComprasMetadataParam, ExcluirUmaListaDeComprasResponse200, ExcluirUmaListaDeComprasResponse422, ExcluirUmaListaDeComprasResponse500, ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1BodyParam, ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1MetadataParam, ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1Response200, ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1Response422, ExecutaUmaAtualizacaoDaPrioridadeDoCentroDeDistribuicao1Response500, GeraUmNovoAccessTokenBaseadoEmUmAccessTokenExpiradoPorDataResponse200, GeraUmNovoAccessTokenBaseadoEmUmAccessTokenExpiradoPorDataResponse500, GeraUmNovoPedidoParaAAssinaturaMetadataParam, GeraUmNovoPedidoParaAAssinaturaResponse200, GeraUmNovoPedidoParaAAssinaturaResponse422, GeraUmNovoPedidoParaAAssinaturaResponse500, GetGruposCompreJuntosGrupoCompreJuntoIdMetadataParam, GetGruposCompreJuntosGrupoCompreJuntoIdResponse200, GetGruposCompreJuntosMetadataParam, GetGruposCompreJuntosResponse200, GetGruposCompreJuntosResponse500, GetNewEndpointMetadataParam, GetNewEndpointResponse200, GetNewEndpointResponse422, GetNewEndpointResponse500, IndicadorDoCarrinhoAbandonadoMetadataParam, IndicadorDoCarrinhoAbandonadoResponse200, IndicadorDoCarrinhoAbandonadoResponse422, IndicadorDoCarrinhoAbandonadoResponse500, IndicadorDosNovosCompradoresMetadataParam, IndicadorDosNovosCompradoresResponse200, IndicadorDosNovosCompradoresResponse422, IndicadorDosNovosCompradoresResponse500, IndicadoresDosProdutosNoEstoqueMetadataParam, IndicadoresDosProdutosNoEstoqueResponse200, IndicadoresDosProdutosNoEstoqueResponse422, IndicadoresDosProdutosNoEstoqueResponse500, InserODeUmaRegiOBodyParam, InserODeUmaRegiOResponse200, InserODeUmaRegiOResponse400, InsereDadosBSicosDeUmaNovaListaDeComprasBodyParam, InsereDadosBSicosDeUmaNovaListaDeComprasResponse201, InsereDadosBSicosDeUmaNovaListaDeComprasResponse500, InsereDadosDeSeoEmUmaListaDeComprasBodyParam, InsereDadosDeSeoEmUmaListaDeComprasMetadataParam, InsereDadosDeSeoEmUmaListaDeComprasResponse200, InsereDadosDeSeoEmUmaListaDeComprasResponse400, InsereDadosDeUmOuMaisGruposDeListaDeComprasBodyParam, InsereDadosDeUmOuMaisGruposDeListaDeComprasResponse201, InsereDadosDeUmOuMaisGruposDeListaDeComprasResponse500, InsereLimiteDeCreditoParaUmUsuarioMetadataParam, InsereLimiteDeCreditoParaUmUsuarioResponse200, InsereLimiteDeCreditoParaUmUsuarioResponse500, InsereUmEndereOParaUmUsuarioPeloEMailBodyParam, InsereUmEndereOParaUmUsuarioPeloEMailMetadataParam, InsereUmEndereOParaUmUsuarioPeloEMailResponse200, InsereUmEndereOParaUmUsuarioPeloEMailResponse500, InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioBodyParam, InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioMetadataParam, InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioResponse200, InsereUmEnderecoParaUmUsuarioPeloIdDoUsuarioResponse500, InsereUmNovoAtributoBodyParam, InsereUmNovoAtributoResponse201, InsereUmNovoAtributoResponse422, InsereUmNovoAtributoResponse501, InsereUmNovoAvatarParaOUsuarioBodyParam, InsereUmNovoAvatarParaOUsuarioMetadataParam, InsereUmNovoAvatarParaOUsuarioResponse201, InsereUmNovoAvatarParaOUsuarioResponse500, InsereUmNovoBannerBodyParam, InsereUmNovoBannerResponse200, InsereUmNovoBannerResponse422, InsereUmNovoBannerResponse500, InsereUmNovoCampoDeCadastroPersonalizadoBodyParam, InsereUmNovoCampoDeCadastroPersonalizadoResponse201, InsereUmNovoCampoDeCadastroPersonalizadoResponse500, InsereUmNovoCartaoDeCreditoParaOUsuarioBodyParam, InsereUmNovoCartaoDeCreditoParaOUsuarioMetadataParam, InsereUmNovoCartaoDeCreditoParaOUsuarioResponse201, InsereUmNovoCartaoDeCreditoParaOUsuarioResponse500, InsereUmNovoConteudoNaLojaBodyParam, InsereUmNovoConteudoNaLojaResponse201, InsereUmNovoConteudoNaLojaResponse422, InsereUmNovoConteudoNaLojaResponse500, InsereUmNovoContratoDeFreteBodyParam, InsereUmNovoContratoDeFreteResponse201, InsereUmNovoContratoDeFreteResponse422, InsereUmNovoContratoDeFreteResponse500, InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteBodyParam, InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteMetadataParam, InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteResponse201, InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteResponse422, InsereUmNovoDetalheDeFreteVinculadoAUmContratoDeFreteResponse500, InsereUmNovoFabricanteBodyParam, InsereUmNovoFabricanteResponse201, InsereUmNovoFabricanteResponse422, InsereUmNovoFabricanteResponse500, InsereUmNovoHotsiteBodyParam, InsereUmNovoHotsiteResponse200, InsereUmNovoHotsiteResponse422, InsereUmNovoHotsiteResponse500, InsereUmNovoParceiroBodyParam, InsereUmNovoParceiroResponse201, InsereUmNovoParceiroResponse500, InsereUmNovoPedidoBodyParam, InsereUmNovoPedidoResponse201, InsereUmNovoPedidoResponse422, InsereUmNovoPedidoResponse500, InsereUmNovoPortfolioBodyParam, InsereUmNovoPortfolioResponse201, InsereUmNovoPortfolioResponse500, InsereUmNovoProdutoNaAssinaturaBodyParam, InsereUmNovoProdutoNaAssinaturaMetadataParam, InsereUmNovoProdutoNaAssinaturaResponse201, InsereUmNovoProdutoNaAssinaturaResponse422, InsereUmNovoProdutoNaAssinaturaResponse500, InsereUmNovoScriptBodyParam, InsereUmNovoScriptResponse200, InsereUmNovoScriptResponse422, InsereUmNovoScriptResponse500, InsereUmNovoSellerNoMarketplaceBodyParam, InsereUmNovoSellerNoMarketplaceResponse201, InsereUmNovoSellerNoMarketplaceResponse500, InsereUmNovoTipoDeEventoBodyParam, InsereUmNovoTipoDeEventoResponse200, InsereUmNovoTipoDeEventoResponse500, InsereUmNovoUsuarioBodyParam, InsereUmNovoUsuarioResponse201, InsereUmNovoUsuarioResponse500, InsereUmOuMaisMetatagsParaUmProdutoBodyParam, InsereUmOuMaisMetatagsParaUmProdutoMetadataParam, InsereUmOuMaisMetatagsParaUmProdutoResponse200, InsereUmOuMaisMetatagsParaUmProdutoResponse500, InsereUmRangeDeCepEmUmaLojaFisicaBodyParam, InsereUmRangeDeCepEmUmaLojaFisicaMetadataParam, InsereUmRangeDeCepEmUmaLojaFisicaResponse200, InsereUmRangeDeCepEmUmaLojaFisicaResponse422, InsereUmRangeDeCepEmUmaLojaFisicaResponse500, InsereUmRastreamentoEStatusAUmPedidoBodyParam, InsereUmRastreamentoEStatusAUmPedidoMetadataParam, InsereUmRastreamentoEStatusAUmPedidoResponse200, InsereUmRastreamentoEStatusAUmPedidoResponse422, InsereUmRastreamentoEStatusAUmPedidoResponse500, InsereUmRastreamentoEStatusAUmProdutoVarianteBodyParam, InsereUmRastreamentoEStatusAUmProdutoVarianteMetadataParam, InsereUmRastreamentoEStatusAUmProdutoVarianteResponse200, InsereUmRastreamentoEStatusAUmProdutoVarianteResponse422, InsereUmRastreamentoEStatusAUmProdutoVarianteResponse500, InsereUmSeoParaUmProdutoEspecificoBodyParam, InsereUmSeoParaUmProdutoEspecificoMetadataParam, InsereUmSeoParaUmProdutoEspecificoResponse200, InsereUmSeoParaUmProdutoEspecificoResponse500, InsereUmaAvaliacaoParaUmProdutoVarianteBodyParam, InsereUmaAvaliacaoParaUmProdutoVarianteMetadataParam, InsereUmaAvaliacaoParaUmProdutoVarianteResponse200, InsereUmaAvaliacaoParaUmProdutoVarianteResponse422, InsereUmaAvaliacaoParaUmProdutoVarianteResponse500, InsereUmaInscricaoBodyParam, InsereUmaInscricaoResponse200, InsereUmaInscricaoResponse500, InsereUmaLojaFisicaBodyParam, InsereUmaLojaFisicaResponse200, InsereUmaLojaFisicaResponse422, InsereUmaLojaFisicaResponse500, InsereUmaNovaCategoriaBodyParam, InsereUmaNovaCategoriaResponse201, InsereUmaNovaCategoriaResponse422, InsereUmaNovaCategoriaResponse500, InsereUmaNovaTabelaDePrecosBodyParam, InsereUmaNovaTabelaDePrecosResponse201, InsereUmaNovaTabelaDePrecosResponse500, InsereUmaVersaoParaUmScriptExistenteBodyParam, InsereUmaVersaoParaUmScriptExistenteMetadataParam, InsereUmaVersaoParaUmScriptExistenteResponse200, InsereUmaVersaoParaUmScriptExistenteResponse422, InsereUmaVersaoParaUmScriptExistenteResponse500, InseriUmaListaDeProdutoVariantesEmUmaTabelaDePrecosBodyParam, InseriUmaListaDeProdutoVariantesEmUmaTabelaDePrecosMetadataParam, InseriUmaListaDeProdutoVariantesEmUmaTabelaDePrecosResponse201, InseriUmaListaDeProdutoVariantesEmUmaTabelaDePrecosResponse500, InseriUmaObservacaoAUmPedido1BodyParam, InseriUmaObservacaoAUmPedido1MetadataParam, InseriUmaObservacaoAUmPedido1Response200, InseriUmaObservacaoAUmPedido1Response422, InseriUmaObservacaoAUmPedido1Response500, InseriUmaObservacaoAUmPedidoMetadataParam, InseriUmaObservacaoAUmPedidoResponse200, InseriUmaObservacaoAUmPedidoResponse422, InseriUmaObservacaoAUmPedidoResponse500, InserirAutorBodyParam, InserirAutorResponse200, InserirAutorResponse422, InserirAutorResponse500, LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsBodyParam, LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsMetadataParam, LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsResponse201, LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsResponse400, LanAmentosNaContaCorrenteComUsoParcialDeCrDitosERetornoDeIdsResponse500, LiberarReservasDePedidosBodyParam, LiberarReservasDePedidosResponse200, LiberarReservasDePedidosResponse422, LiberarReservasDePedidosResponse500, ListarRegiEsComFiltrosEPaginaOMetadataParam, ListarRegiEsComFiltrosEPaginaOResponse200, ListarRegiEsComFiltrosEPaginaOResponse400, PatchGruposCompreJuntosGrupoCompreJuntoIdVincularProdutosBodyParam, PatchGruposCompreJuntosGrupoCompreJuntoIdVincularProdutosMetadataParam, PatchGruposCompreJuntosGrupoCompreJuntoIdVincularProdutosResponse200, PatchGruposCompreJuntosGrupoCompreJuntoIdVincularProdutosResponse404, PatchGruposCompreJuntosGrupoCompreJuntoIdVincularProdutosResponse500, PatchGruposCompreJuntosGrupoComprejuntoIdStatusBodyParam, PatchGruposCompreJuntosGrupoComprejuntoIdStatusMetadataParam, PatchGruposCompreJuntosGrupoComprejuntoIdStatusResponse200, PostGruposCompreJuntosBodyParam, PostGruposCompreJuntosResponse201, PostGruposCompreJuntosResponse500, PutCentrosdistribuicaoregraordenacaoBodyParam, PutCentrosdistribuicaoregraordenacaoResponse200, PutGruposCompreJuntosGrupoComprejuntoIdStatusMetadataParam, PutGruposCompreJuntosGrupoComprejuntoIdStatusResponse200, PutGruposCompreJuntosGrupoComprejuntoIdStatusResponse500, PutPedidosPedidoIdChangeorderenderecoBodyParam, PutPedidosPedidoIdChangeorderenderecoMetadataParam, PutPedidosPedidoIdChangeorderenderecoResponse200, PutProdutosexibirSiteBodyParam, PutProdutosexibirSiteMetadataParam, PutProdutosexibirSiteResponse200, PutProdutosexibirSiteResponse422, PutProdutosexibirSiteResponse500, RealizaAAutenticacaoDeUsuarioNoIdmIdentityManagerBodyParam, RealizaAAutenticacaoDeUsuarioNoIdmIdentityManagerResponse200, RealizaAAutenticacaoDeUsuarioNoIdmIdentityManagerResponse401, RealizaAAutenticacaoDeUsuarioNoIdmIdentityManagerResponse500, RealizaUmNovoLancamentoNaContaCorrenteDoClienteBodyParam, RealizaUmNovoLancamentoNaContaCorrenteDoClienteMetadataParam, RealizaUmNovoLancamentoNaContaCorrenteDoClienteResponse201, RealizaUmNovoLancamentoNaContaCorrenteDoClienteResponse422, RealizaUmNovoLancamentoNaContaCorrenteDoClienteResponse500, RealizaUmaCotacaoDeFreteBodyParam, RealizaUmaCotacaoDeFreteMetadataParam, RealizaUmaCotacaoDeFreteResponse200, RealizaUmaCotacaoDeFreteResponse422, RealizaUmaCotacaoDeFreteResponse500, RemoveOVinculoDeProdutosDeUmGrupoDePersonalizacaoBodyParam, RemoveOVinculoDeProdutosDeUmGrupoDePersonalizacaoMetadataParam, RemoveOVinculoDeProdutosDeUmGrupoDePersonalizacaoResponse200, RemoveOVinculoDeProdutosDeUmGrupoDePersonalizacaoResponse422, RemoveOVinculoDeProdutosDeUmGrupoDePersonalizacaoResponse500, RemoveOVinculoEntreUsuarioEParceiroBodyParam, RemoveOVinculoEntreUsuarioEParceiroMetadataParam, RemoveOVinculoEntreUsuarioEParceiroResponse200, RemoveOVinculoEntreUsuarioEParceiroResponse500, RemoveUmAtacarejoMetadataParam, RemoveUmAtacarejoResponse200, RemoveUmAtacarejoResponse422, RemoveUmAtacarejoResponse500, RemoveUmCampoDeCadastroPersonalizadoMetadataParam, RemoveUmCampoDeCadastroPersonalizadoResponse200, RemoveUmCampoDeCadastroPersonalizadoResponse500, RemoveUmProdutoDeUmaTabelaDePrecoMetadataParam, RemoveUmProdutoDeUmaTabelaDePrecoResponse200, RemoveUmProdutoDeUmaTabelaDePrecoResponse500, RemoveUmValorPreDefinidoMetadataParam, RemoveUmValorPreDefinidoResponse200, RemoveUmValorPreDefinidoResponse500, RemoveUmaListaDeRangeDeCepDeUmaLojaFisicaBodyParam, RemoveUmaListaDeRangeDeCepDeUmaLojaFisicaMetadataParam, RemoveUmaListaDeRangeDeCepDeUmaLojaFisicaResponse200, RemoveUmaListaDeRangeDeCepDeUmaLojaFisicaResponse422, RemoveUmaListaDeRangeDeCepDeUmaLojaFisicaResponse500, RemoveUmaLojaFisicaMetadataParam, RemoveUmaLojaFisicaResponse200, RemoveUmaLojaFisicaResponse422, RemoveUmaLojaFisicaResponse500, RetornaAListaDeProdutosDeUmPortfolioMetadataParam, RetornaAListaDeProdutosDeUmPortfolioResponse200, RetornaAListaDeProdutosDeUmPortfolioResponse500, RetornaAListaDeProdutosVinculadosCategoriaComPossibilidadeDeOrdenaODaListaDeProdutosComBaseNoCampoOrdemMetadataParam, RetornaAListaDeProdutosVinculadosCategoriaComPossibilidadeDeOrdenaODaListaDeProdutosComBaseNoCampoOrdemResponse200, RetornaAListaDeProdutosVinculadosCategoriaComPossibilidadeDeOrdenaODaListaDeProdutosComBaseNoCampoOrdemResponse400, RetornaASituacaoResellerDeUmProdutoMetadataParam, RetornaASituacaoResellerDeUmProdutoResponse200, RetornaASituacaoResellerDeUmProdutoResponse404, RetornaASituacaoResellerDeUmProdutoResponse500, RetornaAUrlDoAvatarDeUmUsuarioMetadataParam, RetornaAUrlDoAvatarDeUmUsuarioResponse200, RetornaAUrlDoAvatarDeUmUsuarioResponse500, RetornaAsAssinaturasComErrosMetadataParam, RetornaAsAssinaturasComErrosResponse200, RetornaAsAssinaturasComErrosResponse422, RetornaAsAssinaturasComErrosResponse500, RetornaAsAssinaturasDeUmDeterminadoUsuarioMetadataParam, RetornaAsAssinaturasDeUmDeterminadoUsuarioResponse200, RetornaAsAssinaturasDeUmDeterminadoUsuarioResponse422, RetornaAsAssinaturasDeUmDeterminadoUsuarioResponse500, RetornaAsListasDeComprasMetadataParam, RetornaAsListasDeComprasResponse200, RetornaAsListasDeComprasResponse422, RetornaAsListasDeComprasResponse500, RetornaAsRecorrenciasCadastradasNaLojaResponse200, RetornaAsRecorrenciasCadastradasNaLojaResponse422, RetornaAsRecorrenciasCadastradasNaLojaResponse500, RetornaDadosDaLojaResponse200, RetornaDadosDaLojaResponse400, RetornaDadosDaLojaResponse500, RetornaDadosDeUmGrupoDeListaDeComprasMetadataParam, RetornaDadosDeUmGrupoDeListaDeComprasResponse200, RetornaDadosDeUmGrupoDeListaDeComprasResponse422, RetornaDadosDeUmGrupoDeListaDeComprasResponse500, RetornaDadosParaAlimentarOGraficoFormaDePagamentoMetadataParam, RetornaDadosParaAlimentarOGraficoFormaDePagamentoResponse200, RetornaDadosParaAlimentarOGraficoFormaDePagamentoResponse422, RetornaDadosParaAlimentarOGraficoFormaDePagamentoResponse500, RetornaDadosParaCarregarOGraficoDoFaturamentoMetadataParam, RetornaDadosParaCarregarOGraficoDoFaturamentoResponse200, RetornaDadosParaCarregarOGraficoDoFaturamentoResponse422, RetornaDadosParaCarregarOGraficoDoFaturamentoResponse500, RetornaIndicadoresDeFaturamentoReceitaTicketMedioENumeroDePedidosDaLojaMetadataParam, RetornaIndicadoresDeFaturamentoReceitaTicketMedioENumeroDePedidosDaLojaResponse200, RetornaIndicadoresDeFaturamentoReceitaTicketMedioENumeroDePedidosDaLojaResponse422, RetornaIndicadoresDeFaturamentoReceitaTicketMedioENumeroDePedidosDaLojaResponse500, RetornaListaDeAtacarejosDoProdutoVarianteMetadataParam, RetornaListaDeAtacarejosDoProdutoVarianteResponse200, RetornaListaDeAtacarejosDoProdutoVarianteResponse422, RetornaListaDeAtacarejosDoProdutoVarianteResponse500, RetornaListaDeEventosMetadataParam, RetornaListaDeEventosResponse200, RetornaListaDeEventosResponse422, RetornaListaDeEventosResponse500, RetornaListaDeUsuariosCadastradosdescadastradosNaNewsletterMetadataParam, RetornaListaDeUsuariosCadastradosdescadastradosNaNewsletterResponse200, RetornaListaDeUsuariosCadastradosdescadastradosNaNewsletterResponse500, RetornaLojaFisicaPeloIdMetadataParam, RetornaLojaFisicaPeloIdResponse200, RetornaLojaFisicaPeloIdResponse422, RetornaLojaFisicaPeloIdResponse500, RetornaOEstoqueTotalEoEstoquePorCentroDeDistribuicaoMetadataParam, RetornaOEstoqueTotalEoEstoquePorCentroDeDistribuicaoResponse200, RetornaOEstoqueTotalEoEstoquePorCentroDeDistribuicaoResponse404, RetornaOEstoqueTotalEoEstoquePorCentroDeDistribuicaoResponse500, RetornaOHistoricoDeSituacoesDeUmPedidoMetadataParam, RetornaOHistoricoDeSituacoesDeUmPedidoResponse200, RetornaOHistoricoDeSituacoesDeUmPedidoResponse422, RetornaOHistoricoDeSituacoesDeUmPedidoResponse500, RetornaOLimiteDeCreditoDeUmUsuarioEspecifico1MetadataParam, RetornaOLimiteDeCreditoDeUmUsuarioEspecifico1Response200, RetornaOLimiteDeCreditoDeUmUsuarioEspecifico1Response500, RetornaOLimiteDeCreditoDeUmUsuarioEspecificoMetadataParam, RetornaOLimiteDeCreditoDeUmUsuarioEspecificoResponse200, RetornaOLimiteDeCreditoDeUmUsuarioEspecificoResponse500, RetornaOParceiroPeloIdMetadataParam, RetornaOParceiroPeloIdResponse200, RetornaOParceiroPeloIdResponse500, RetornaOParceiroPeloNomeMetadataParam, RetornaOParceiroPeloNomeResponse200, RetornaOParceiroPeloNomeResponse500, RetornaOPortfolioPeloIdMetadataParam, RetornaOPortfolioPeloIdResponse200, RetornaOPortfolioPeloIdResponse500, RetornaOPortfolioPeloNomeMetadataParam, RetornaOPortfolioPeloNomeResponse200, RetornaOPortfolioPeloNomeResponse500, RetornaOPrecodeEPrecoporDeUmProdutoMetadataParam, RetornaOPrecodeEPrecoporDeUmProdutoResponse200, RetornaOPrecodeEPrecoporDeUmProdutoResponse404, RetornaOPrecodeEPrecoporDeUmProdutoResponse500, RetornaORelatorioDeReceitasDeUmDeterminadoPeriodoMetadataParam, RetornaORelatorioDeReceitasDeUmDeterminadoPeriodoResponse200, RetornaORelatorioDeReceitasDeUmDeterminadoPeriodoResponse422, RetornaORelatorioDeReceitasDeUmDeterminadoPeriodoResponse500, RetornaORelatorioDeTicketMedioDeUmDeterminadoPeriodoMetadataParam, RetornaORelatorioDeTicketMedioDeUmDeterminadoPeriodoResponse200, RetornaORelatorioDeTicketMedioDeUmDeterminadoPeriodoResponse422, RetornaORelatorioDeTicketMedioDeUmDeterminadoPeriodoResponse500, RetornaORelatorioDeTransacoesDeUmDeterminadoPeriodoMetadataParam, RetornaORelatorioDeTransacoesDeUmDeterminadoPeriodoResponse200, RetornaORelatorioDeTransacoesDeUmDeterminadoPeriodoResponse422, RetornaORelatorioDeTransacoesDeUmDeterminadoPeriodoResponse500, RetornaOSaldoDeUmUsuarioMetadataParam, RetornaOSaldoDeUmUsuarioResponse200, RetornaOSaldoDeUmUsuarioResponse422, RetornaOSaldoDeUmUsuarioResponse500, RetornaOUltimoStatusDeUmPedidoMetadataParam, RetornaOUltimoStatusDeUmPedidoResponse200, RetornaOUltimoStatusDeUmPedidoResponse422, RetornaOUltimoStatusDeUmPedidoResponse500, RetornaOXmlComOsDadosDeTodasAsMidiasEntreDuasDatasMetadataParam, RetornaOXmlComOsDadosDeTodasAsMidiasEntreDuasDatasResponse200, RetornaOXmlComOsDadosDeTodasAsMidiasEntreDuasDatasResponse500, RetornaOXmlComOsDadosDeUmaMidiaEspecificasEntreDuasDatasMetadataParam, RetornaOXmlComOsDadosDeUmaMidiaEspecificasEntreDuasDatasResponse200, RetornaOXmlComOsDadosDeUmaMidiaEspecificasEntreDuasDatasResponse500, RetornaOsCamposDeCadastroPersonalizadoExistentesResponse201, RetornaOsCamposDeCadastroPersonalizadoExistentesResponse500, RetornaOsDadosDaListaDeDesejosDeUmUsuarioMetadataParam, RetornaOsDadosDaListaDeDesejosDeUmUsuarioResponse200, RetornaOsDadosDaListaDeDesejosDeUmUsuarioResponse500, RetornaOsDadosDeCartoesDeCreditoDeUmUsuarioMetadataParam, RetornaOsDadosDeCartoesDeCreditoDeUmUsuarioResponse200, RetornaOsDadosDeCartoesDeCreditoDeUmUsuarioResponse500, RetornaOsDadosDeRastreamentonfDeUmPedidoMetadataParam, RetornaOsDadosDeRastreamentonfDeUmPedidoResponse200, RetornaOsDadosDeRastreamentonfDeUmPedidoResponse422, RetornaOsDadosDeRastreamentonfDeUmPedidoResponse500, RetornaOsDadosDeRastreamentonfDosProdutosDeUmPedidoMetadataParam, RetornaOsDadosDeRastreamentonfDosProdutosDeUmPedidoResponse200, RetornaOsDadosDeRastreamentonfDosProdutosDeUmPedidoResponse422, RetornaOsDadosDeRastreamentonfDosProdutosDeUmPedidoResponse500, RetornaOsDadosDeUmaAssinaturaAPartirDoIdDoPedidoMetadataParam, RetornaOsDadosDeUmaAssinaturaAPartirDoIdDoPedidoResponse200, RetornaOsDadosDeUmaAssinaturaAPartirDoIdDoPedidoResponse422, RetornaOsDadosDeUmaAssinaturaAPartirDoIdDoPedidoResponse500, RetornaOsDadosDeUmaAssinaturaEspecificaMetadataParam, RetornaOsDadosDeUmaAssinaturaEspecificaResponse200, RetornaOsDadosDeUmaAssinaturaEspecificaResponse422, RetornaOsDadosDeUmaAssinaturaEspecificaResponse500, RetornaOsDetalhesDaTransacaoDeUmPedidoMetadataParam, RetornaOsDetalhesDaTransacaoDeUmPedidoResponse200, RetornaOsDetalhesDaTransacaoDeUmPedidoResponse422, RetornaOsDetalhesDaTransacaoDeUmPedidoResponse500, RetornaOsDetalhesDoServicoDeFreteMetadataParam, RetornaOsDetalhesDoServicoDeFreteResponse200, RetornaOsDetalhesDoServicoDeFreteResponse422, RetornaOsDetalhesDoServicoDeFreteResponse500, RetornaOsErrosDeUmaAssinaturaEspecificaMetadataParam, RetornaOsErrosDeUmaAssinaturaEspecificaResponse200, RetornaOsErrosDeUmaAssinaturaEspecificaResponse422, RetornaOsErrosDeUmaAssinaturaEspecificaResponse500, RetornaOsProdutosDeUmaAssinaturaEspecificaMetadataParam, RetornaOsProdutosDeUmaAssinaturaEspecificaResponse200, RetornaOsProdutosDeUmaAssinaturaEspecificaResponse422, RetornaOsProdutosDeUmaAssinaturaEspecificaResponse500, RetornaOsProdutosDeUmaTabelaDePrecosMetadataParam, RetornaOsProdutosDeUmaTabelaDePrecosResponse200, RetornaOsProdutosDeUmaTabelaDePrecosResponse500, RetornaOsUsuariosPeloIdDoParceiroMetadataParam, RetornaOsUsuariosPeloIdDoParceiroResponse200, RetornaOsUsuariosPeloIdDoParceiroResponse500, RetornaOsUsuariosPeloNomeDoParceiroMetadataParam, RetornaOsUsuariosPeloNomeDoParceiroResponse200, RetornaOsUsuariosPeloNomeDoParceiroResponse500, RetornaProdutosPorSellerMetadataParam, RetornaProdutosPorSellerResponse200, RetornaProdutosPorSellerResponse500, RetornaSeOProdutoVarianteEstaDisponivelOuNaoMetadataParam, RetornaSeOProdutoVarianteEstaDisponivelOuNaoResponse200, RetornaSeOProdutoVarianteEstaDisponivelOuNaoResponse404, RetornaSeOProdutoVarianteEstaDisponivelOuNaoResponse500, RetornaSeOUsusrioAtivouORecebimentoDeNewsletterMetadataParam, RetornaSeOUsusrioAtivouORecebimentoDeNewsletterResponse200, RetornaSeOUsusrioAtivouORecebimentoDeNewsletterResponse500, RetornaTodasAsAvaliacoesDosProdutosVariantesDaLojaMetadataParam, RetornaTodasAsAvaliacoesDosProdutosVariantesDaLojaResponse200, RetornaTodasAsAvaliacoesDosProdutosVariantesDaLojaResponse422, RetornaTodasAsAvaliacoesDosProdutosVariantesDaLojaResponse500, RetornaTodasAsCategoriasDeUmProdutoMetadataParam, RetornaTodasAsCategoriasDeUmProdutoResponse200, RetornaTodasAsCategoriasDeUmProdutoResponse404, RetornaTodasAsCategoriasDeUmProdutoResponse500, RetornaTodasAsCategoriasMetadataParam, RetornaTodasAsCategoriasResponse200, RetornaTodasAsCategoriasResponse422, RetornaTodasAsCategoriasResponse500, RetornaTodasAsFormasDePagamentoDaLojaResponse200, RetornaTodasAsFormasDePagamentoDaLojaResponse422, RetornaTodasAsFormasDePagamentoDaLojaResponse500, RetornaTodasAsInformacoesDeUmProdutoMetadataParam, RetornaTodasAsInformacoesDeUmProdutoResponse200, RetornaTodasAsInformacoesDeUmProdutoResponse404, RetornaTodasAsInformacoesDeUmProdutoResponse500, RetornaTodasAsLojasFisicasMetadataParam, RetornaTodasAsLojasFisicasResponse200, RetornaTodasAsLojasFisicasResponse422, RetornaTodasAsLojasFisicasResponse500, RetornaTodasAsPromocoesCadastradasMetadataParam, RetornaTodasAsPromocoesCadastradasResponse200, RetornaTodasAsPromocoesCadastradasResponse500, RetornaTodasAsSituacoesDePedidoDaLojaResponse200, RetornaTodasAsSituacoesDePedidoDaLojaResponse500, RetornaTodasAsTabelasDePrecosResponse200, RetornaTodasAsTabelasDePrecosResponse500, RetornaTodosOsAtributosResponse200, RetornaTodosOsAtributosResponse422, RetornaTodosOsAtributosResponse500, RetornaTodosOsCentrosDeDistribuicaoResponse200, RetornaTodosOsCentrosDeDistribuicaoResponse422, RetornaTodosOsCentrosDeDistribuicaoResponse500, RetornaTodosOsFabricantesResponse200, RetornaTodosOsFabricantesResponse422, RetornaTodosOsFabricantesResponse500, RetornaTodosOsGruposDeListasDeComprasMetadataParam, RetornaTodosOsGruposDeListasDeComprasResponse200, RetornaTodosOsGruposDeListasDeComprasResponse422, RetornaTodosOsGruposDeListasDeComprasResponse500, RetornaTodosOsParceirosComPedidosMetadataParam, RetornaTodosOsParceirosComPedidosResponse200, RetornaTodosOsParceirosComPedidosResponse500, RetornaTodosOsParceirosResponse200, RetornaTodosOsParceirosResponse500, RetornaTodosOsPortfoliosResponse200, RetornaTodosOsPortfoliosResponse500, RetornaTodosOsPrecosReferenteAoProdutoVarianteIncluindoOsPrecosDeTabelaDePrecoMetadataParam, RetornaTodosOsPrecosReferenteAoProdutoVarianteIncluindoOsPrecosDeTabelaDePrecoResponse200, RetornaTodosOsPrecosReferenteAoProdutoVarianteIncluindoOsPrecosDeTabelaDePrecoResponse404, RetornaTodosOsPrecosReferenteAoProdutoVarianteIncluindoOsPrecosDeTabelaDePrecoResponse500, RetornaTodosOsProdutos1MetadataParam, RetornaTodosOsProdutos1Response200, RetornaTodosOsProdutos1Response500, RetornaTodosOsProdutosMetadataParam, RetornaTodosOsProdutosResponse200, RetornaTodosOsProdutosResponse500, RetornaTodosOsSellersDaLojaResponse200, RetornaTodosOsSellersDaLojaResponse500, RetornaTodosOsTiposDeEventosMetadataParam, RetornaTodosOsTiposDeEventosResponse200, RetornaTodosOsTiposDeEventosResponse500, RetornaTodosOsUsuariosMetadataParam, RetornaTodosOsUsuariosResponse200, RetornaTodosOsUsuariosResponse500, RetornaTodosRangesDeCepQueEssaLojaAtendeMetadataParam, RetornaTodosRangesDeCepQueEssaLojaAtendeResponse200, RetornaTodosRangesDeCepQueEssaLojaAtendeResponse422, RetornaTodosRangesDeCepQueEssaLojaAtendeResponse500, RetornaUmAtacarejoPeloIdMetadataParam, RetornaUmAtacarejoPeloIdResponse200, RetornaUmAtacarejoPeloIdResponse422, RetornaUmAtacarejoPeloIdResponse500, RetornaUmAtributoEspecificoMetadataParam, RetornaUmAtributoEspecificoResponse200, RetornaUmAtributoEspecificoResponse422, RetornaUmAtributoEspecificoResponse500, RetornaUmContratoDeFreteMetadataParam, RetornaUmContratoDeFreteResponse200, RetornaUmContratoDeFreteResponse422, RetornaUmContratoDeFreteResponse500, RetornaUmEventoEspecificoMetadataParam, RetornaUmEventoEspecificoResponse200, RetornaUmEventoEspecificoResponse422, RetornaUmEventoEspecificoResponse500, RetornaUmFabricanteEspecificoPeloIdMetadataParam, RetornaUmFabricanteEspecificoPeloIdResponse200, RetornaUmFabricanteEspecificoPeloIdResponse422, RetornaUmFabricanteEspecificoPeloIdResponse500, RetornaUmFabricanteEspecificoPeloNomeMetadataParam, RetornaUmFabricanteEspecificoPeloNomeResponse200, RetornaUmFabricanteEspecificoPeloNomeResponse422, RetornaUmFabricanteEspecificoPeloNomeResponse500, RetornaUmPedidoEspecificoMetadataParam, RetornaUmPedidoEspecificoResponse200, RetornaUmPedidoEspecificoResponse422, RetornaUmPedidoEspecificoResponse500, RetornaUmProdutoBuscandoPeloSeuIdentificadorMetadataParam, RetornaUmProdutoBuscandoPeloSeuIdentificadorResponse200, RetornaUmProdutoBuscandoPeloSeuIdentificadorResponse404, RetornaUmProdutoBuscandoPeloSeuIdentificadorResponse422, RetornaUmProdutoBuscandoPeloSeuIdentificadorResponse500, RetornaUmRastreamentoDeProdutoMetadataParam, RetornaUmRastreamentoDeProdutoResponse200, RetornaUmRastreamentoDeProdutoResponse422, RetornaUmRastreamentoDeProdutoResponse500, RetornaUmSellerEspecificoDaLoja1MetadataParam, RetornaUmSellerEspecificoDaLoja1Response200, RetornaUmSellerEspecificoDaLoja1Response500, RetornaUmSellerEspecificoDaLojaResponse200, RetornaUmSellerEspecificoDaLojaResponse500, RetornaUmTipoDeEventoEspecificoMetadataParam, RetornaUmTipoDeEventoEspecificoResponse200, RetornaUmTipoDeEventoEspecificoResponse500, RetornaUmUsuarioEspecificoPeloCnpjMetadataParam, RetornaUmUsuarioEspecificoPeloCnpjResponse200, RetornaUmUsuarioEspecificoPeloCnpjResponse500, RetornaUmUsuarioEspecificoPeloCpfMetadataParam, RetornaUmUsuarioEspecificoPeloCpfResponse200, RetornaUmUsuarioEspecificoPeloCpfResponse500, RetornaUmUsuarioEspecificoPeloEMailMetadataParam, RetornaUmUsuarioEspecificoPeloEMailResponse200, RetornaUmUsuarioEspecificoPeloEMailResponse500, RetornaUmUsuarioEspecificoPeloIdMetadataParam, RetornaUmUsuarioEspecificoPeloIdResponse200, RetornaUmUsuarioEspecificoPeloIdResponse500, RetornaUmaCategoriaEspecificaMetadataParam, RetornaUmaCategoriaEspecificaResponse200, RetornaUmaCategoriaEspecificaResponse422, RetornaUmaCategoriaEspecificaResponse500, RetornaUmaCategoriaEspecificaUtilizandoOIdDoErpComoIdentificadorMetadataParam, RetornaUmaCategoriaEspecificaUtilizandoOIdDoErpComoIdentificadorResponse200, RetornaUmaCategoriaEspecificaUtilizandoOIdDoErpComoIdentificadorResponse422, RetornaUmaCategoriaEspecificaUtilizandoOIdDoErpComoIdentificadorResponse500, RetornaUmaCotacaoDeFreteParaOCarrinhoDoPedidoMetadataParam, RetornaUmaCotacaoDeFreteParaOCarrinhoDoPedidoResponse200, RetornaUmaCotacaoDeFreteParaOCarrinhoDoPedidoResponse422, RetornaUmaCotacaoDeFreteParaOCarrinhoDoPedidoResponse500, RetornaUmaListaComOsDadosDasAssinaturasMetadataParam, RetornaUmaListaComOsDadosDasAssinaturasResponse200, RetornaUmaListaComOsDadosDasAssinaturasResponse422, RetornaUmaListaComOsDadosDasAssinaturasResponse500, RetornaUmaListaContendoOIdDasAssinaturasDeUmUsuarioMetadataParam, RetornaUmaListaContendoOIdDasAssinaturasDeUmUsuarioResponse200, RetornaUmaListaContendoOIdDasAssinaturasDeUmUsuarioResponse500, RetornaUmaListaContendoOIdDosPedidosDeUmUsuario1MetadataParam, RetornaUmaListaContendoOIdDosPedidosDeUmUsuario1Response200, RetornaUmaListaContendoOIdDosPedidosDeUmUsuario1Response500, RetornaUmaListaContendoOIdDosPedidosDeUmUsuarioMetadataParam, RetornaUmaListaContendoOIdDosPedidosDeUmUsuarioResponse200, RetornaUmaListaContendoOIdDosPedidosDeUmUsuarioResponse500, RetornaUmaListaDeAvaliacoesReferenteAoIdentificadorInformadoMetadataParam, RetornaUmaListaDeAvaliacoesReferenteAoIdentificadorInformadoResponse200, RetornaUmaListaDeAvaliacoesReferenteAoIdentificadorInformadoResponse422, RetornaUmaListaDeAvaliacoesReferenteAoIdentificadorInformadoResponse500, RetornaUmaListaDeCompraMetadataParam, RetornaUmaListaDeCompraResponse200, RetornaUmaListaDeCompraResponse422, RetornaUmaListaDeCompraResponse500, RetornaUmaListaDeDetalhesDeUmContratoDeFreteMetadataParam, RetornaUmaListaDeDetalhesDeUmContratoDeFreteResponse200, RetornaUmaListaDeDetalhesDeUmContratoDeFreteResponse422, RetornaUmaListaDeDetalhesDeUmContratoDeFreteResponse500, RetornaUmaListaDeEnderecosDeUmUsuarioPeloEMailDoUsuarioMetadataParam, RetornaUmaListaDeEnderecosDeUmUsuarioPeloEMailDoUsuarioResponse200, RetornaUmaListaDeEnderecosDeUmUsuarioPeloEMailDoUsuarioResponse500, RetornaUmaListaDeEnderecosDeUmUsuarioPeloIdDoUsuarioMetadataParam, RetornaUmaListaDeEnderecosDeUmUsuarioPeloIdDoUsuarioResponse200, RetornaUmaListaDeEnderecosDeUmUsuarioPeloIdDoUsuarioResponse500, RetornaUmaListaDeFretesResponse200, RetornaUmaListaDeFretesResponse422, RetornaUmaListaDeFretesResponse500, RetornaUmaListaDeGruposDePersonalizacaoResponse200, RetornaUmaListaDeGruposDePersonalizacaoResponse422, RetornaUmaListaDeGruposDePersonalizacaoResponse500, RetornaUmaListaDeImagensDeUmProdutoMetadataParam, RetornaUmaListaDeImagensDeUmProdutoResponse200, RetornaUmaListaDeImagensDeUmProdutoResponse404, RetornaUmaListaDeImagensDeUmProdutoResponse500, RetornaUmaListaDePedidoBaseadoNasFormasDePagamentoMetadataParam, RetornaUmaListaDePedidoBaseadoNasFormasDePagamentoResponse200, RetornaUmaListaDePedidoBaseadoNasFormasDePagamentoResponse422, RetornaUmaListaDePedidoBaseadoNasFormasDePagamentoResponse500, RetornaUmaListaDePedidoBaseadoNasSituacoesDePedidosMetadataParam, RetornaUmaListaDePedidoBaseadoNasSituacoesDePedidosResponse200, RetornaUmaListaDePedidoBaseadoNasSituacoesDePedidosResponse422, RetornaUmaListaDePedidoBaseadoNasSituacoesDePedidosResponse500, RetornaUmaListaDePedidoNaOrdemDecrescenteDentroDoLimiteDeDatasPassadasMetadataParam, RetornaUmaListaDePedidoNaOrdemDecrescenteDentroDoLimiteDeDatasPassadasResponse200, RetornaUmaListaDePedidoNaOrdemDecrescenteDentroDoLimiteDeDatasPassadasResponse422, RetornaUmaListaDePedidoNaOrdemDecrescenteDentroDoLimiteDeDatasPassadasResponse500, RetornaUmaListaDeProdutosVinculadosAUmGrupoDePersonalizacaoMetadataParam, RetornaUmaListaDeProdutosVinculadosAUmGrupoDePersonalizacaoResponse200, RetornaUmaListaDeProdutosVinculadosAUmGrupoDePersonalizacaoResponse422, RetornaUmaListaDeProdutosVinculadosAUmGrupoDePersonalizacaoResponse500, RetornaUmaListaDeUsuariosComOLimiteDeCreditoDeCadaUmResponse200, RetornaUmaListaDeUsuariosComOLimiteDeCreditoDeCadaUmResponse500, RetornaUmaListaDeVinculosEntreUsuarioEParceiroMetadataParam, RetornaUmaListaDeVinculosEntreUsuarioEParceiroResponse200, RetornaUmaListaDeVinculosEntreUsuarioEParceiroResponse500, RetornaUmaListagemComDadosDosProdutosMaisVendidosPelaLojaOuParceiroMetadataParam, RetornaUmaListagemComDadosDosProdutosMaisVendidosPelaLojaOuParceiroResponse200, RetornaUmaListagemComDadosDosProdutosMaisVendidosPelaLojaOuParceiroResponse422, RetornaUmaListagemComDadosDosProdutosMaisVendidosPelaLojaOuParceiroResponse500, RetornaUmaListagemComOsUltimosDezPedidosDaLojaResponse200, RetornaUmaListagemComOsUltimosDezPedidosDaLojaResponse422, RetornaUmaListagemComOsUltimosDezPedidosDaLojaResponse500, RetornaUmaPromocaoCompletaPeloIdMetadataParam, RetornaUmaPromocaoCompletaPeloIdResponse200, RetornaUmaPromocaoCompletaPeloIdResponse500, RetornaUmaRegiOEspecFicaMetadataParam, RetornaUmaRegiOEspecFicaResponse200, RetornaUmaRegiOEspecFicaResponse500, RetornaUmaTabelaDePrecosMetadataParam, RetornaUmaTabelaDePrecosResponse200, RetornaUmaTabelaDePrecosResponse500, RetornandoOsDadosDeUmGrupoDeAssinaturaDeUmaLojaResponse200, RetornandoOsDadosDeUmGrupoDeAssinaturaDeUmaLojaResponse422, RetornandoOsDadosDeUmGrupoDeAssinaturaDeUmaLojaResponse500, SetaIdentificadorComoVariantePrincipalMetadataParam, SetaIdentificadorComoVariantePrincipalResponse200, SetaIdentificadorComoVariantePrincipalResponse404, SetaIdentificadorComoVariantePrincipalResponse500, SetaOPedidoComoIntegradoBodyParam, SetaOPedidoComoIntegradoResponse200, SetaOPedidoComoIntegradoResponse422, SetaOPedidoComoIntegradoResponse500, SetaStatusAtivoinativoDoProdutoVarianteBodyParam, SetaStatusAtivoinativoDoProdutoVarianteMetadataParam, SetaStatusAtivoinativoDoProdutoVarianteResponse200, SetaStatusAtivoinativoDoProdutoVarianteResponse404, SetaStatusAtivoinativoDoProdutoVarianteResponse500, TemplatesResponse200, TemplatesResponse500, TrocaOUsuarioDeLojaEGeraUmNovoAccessTokenParaAcessoANovaLojaMetadataParam, TrocaOUsuarioDeLojaEGeraUmNovoAccessTokenParaAcessoANovaLojaResponse200, TrocaOUsuarioDeLojaEGeraUmNovoAccessTokenParaAcessoANovaLojaResponse500, VinculaGruposDeListaAUmaListaDeComprasBodyParam, VinculaGruposDeListaAUmaListaDeComprasMetadataParam, VinculaGruposDeListaAUmaListaDeComprasResponse200, VinculaGruposDeListaAUmaListaDeComprasResponse422, VinculaGruposDeListaAUmaListaDeComprasResponse500, VinculaHotsitesComUmBannerEspecificoBodyParam, VinculaHotsitesComUmBannerEspecificoMetadataParam, VinculaHotsitesComUmBannerEspecificoResponse200, VinculaHotsitesComUmBannerEspecificoResponse422, VinculaHotsitesComUmBannerEspecificoResponse500, VinculaImagensAUmaListaDeComprasBodyParam, VinculaImagensAUmaListaDeComprasMetadataParam, VinculaImagensAUmaListaDeComprasResponse200, VinculaImagensAUmaListaDeComprasResponse404, VinculaImagensAUmaListaDeComprasResponse500, VinculaParceirosComUmBannerEspecificoBodyParam, VinculaParceirosComUmBannerEspecificoMetadataParam, VinculaParceirosComUmBannerEspecificoResponse200, VinculaParceirosComUmBannerEspecificoResponse422, VinculaParceirosComUmBannerEspecificoResponse500, VinculaProdutosAUmGrupoDePersonalizacaoBodyParam, VinculaProdutosAUmGrupoDePersonalizacaoMetadataParam, VinculaProdutosAUmGrupoDePersonalizacaoResponse201, VinculaProdutosAUmGrupoDePersonalizacaoResponse422, VinculaProdutosAUmGrupoDePersonalizacaoResponse500, VinculaProdutosAUmaListaDeComprasBodyParam, VinculaProdutosAUmaListaDeComprasMetadataParam, VinculaProdutosAUmaListaDeComprasResponse200, VinculaProdutosAUmaListaDeComprasResponse422, VinculaProdutosAUmaListaDeComprasResponse500, VinculaUmOuMaisBannersAUmHotsiteEspecificoBodyParam, VinculaUmOuMaisBannersAUmHotsiteEspecificoMetadataParam, VinculaUmOuMaisBannersAUmHotsiteEspecificoResponse200, VinculaUmOuMaisBannersAUmHotsiteEspecificoResponse422, VinculaUmOuMaisBannersAUmHotsiteEspecificoResponse500, VinculaUmOuMaisConteudosAUmHotsiteEspecificoBodyParam, VinculaUmOuMaisConteudosAUmHotsiteEspecificoMetadataParam, VinculaUmOuMaisConteudosAUmHotsiteEspecificoResponse200, VinculaUmOuMaisConteudosAUmHotsiteEspecificoResponse422, VinculaUmOuMaisConteudosAUmHotsiteEspecificoResponse500, VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteBodyParam, VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteMetadataParam, VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteResponse200, VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteResponse422, VinculaUmOuMaisProdutosAUmEventoSemRemoverOsProdutosVinculadosAnteriormenteResponse500, VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoBodyParam, VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoMetadataParam, VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoResponse200, VinculaUmOuMaisProdutosComoSugestaoParaUmTipoDeEventoResponse500, VinculaUmOuMaisProdutosEmUmaCategoriaBodyParam, VinculaUmOuMaisProdutosEmUmaCategoriaMetadataParam, VinculaUmOuMaisProdutosEmUmaCategoriaResponse201, VinculaUmOuMaisProdutosEmUmaCategoriaResponse500, VincularCuponsAUmaPromocaoBodyParam, VincularCuponsAUmaPromocaoMetadataParam, VincularCuponsAUmaPromocaoResponse500, VinculoDeProdutosAoPortfolioBodyParam, VinculoDeProdutosAoPortfolioMetadataParam, VinculoDeProdutosAoPortfolioResponse200, VinculoDeProdutosAoPortfolioResponse404, VinculoDeProdutosAoPortfolioResponse500 } from './types';
