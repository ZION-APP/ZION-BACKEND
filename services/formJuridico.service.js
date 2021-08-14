const { FormJuridico } = require('../models');

class FormJuridicoService {
  constructor() {
    this.table = FormJuridico;
  }

  async createFormByUser({ user_id, form_juridico }) {
    const formJuridicoCreated = await this.table.create({
      ...form_juridico,
      user_id,
    });

    return formJuridicoCreated.id ? formJuridicoCreated : null;
  }

  async getAllForms() {
    const formJuridicos = await this.table.findAll({
      attributes: { exclude: ['updatedAt'] },
      where: {
        status: 'active',
      },
    });

    return formJuridicos;
  }

  async getFormsByUser({ user_id }) {
    const formJuridicos = await this.table.findAll({
      attributes: { exclude: ['updatedAt'] },
      where: {
        user_id: user_id,
        status: 'active',
      },
    });

    return formJuridicos;
  }

  async getFormByUser({ user_id, form_juridico_id }) {
    const formJuridico = await this.table.findOne({
      attributes: { exclude: ['updatedAt'] },
      where: {
        id: form_juridico_id,
        user_id: user_id,
        status: 'active',
      },
    });

    return formJuridico;
  }

  async updateFormByUser({ user_id, form_juridico_id, form_juridico }) {
    const formJuridicoUpdated = await this.table.update(form_juridico, {
      where: {
        id: form_juridico_id,
        user_id: user_id,
        status: 'active',
      },
    });
    return formJuridicoUpdated;
  }
  async deleteFormByUser({ user_id, form_juridico_id }) {
    const formDeleted = await this.table.destroy({
      where: {
        user_id: user_id,
        id: form_juridico_id,
      },
    });

    return formDeleted;
  }
}

module.exports = FormJuridicoService;
