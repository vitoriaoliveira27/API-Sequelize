/* eslint-disable linebreak-style */
const dataSource = require('../database/models');

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros(where = {}) {
    return dataSource[this.model].findAll({ where: { ...where } });
  }

  async pegaRegistrosPorEscopo(escopo) {
    return dataSource[this.model].scope(escopo).findAll();
  }

  async pegaUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  async pegaUmRegistro(where) {
    return dataSource[this.model].findOne({ where: {...where } });
  }

  async pegaEContaRegistros(options) {
    return dataSource[this.model].findAndCountAll({ ...options });
  }

  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
    const listadeRegistrosAtualizados = await dataSource[this.model]
      .update(dadosAtualizados, { 
        where: { ...where },
        transaction: transacao
      });
    if (listadeRegistrosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }

  async excluiRegistro(where) {
    return dataSource[this.model].destroy({ where: { ...where } });
  }
}

module.exports = Services;

/*transacao não gerenciada
const transacao = await sequelize.transaction();

try {
  const personagem = await Personagem.create({
    nome: 'Bart',
    sobrenome: 'Simpson'
  }, { transaction: transacao });
  await personagem.addParente({
    nome: 'Lisa',
    sobrenome: 'Simpson'
  }, { transaction: transacao });
  await transacao.commit();
} catch (error) {
  await transacao.rollback();
}*/