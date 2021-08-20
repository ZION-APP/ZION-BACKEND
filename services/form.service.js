const { Form } = require('../models');

class FormService {
  constructor() {
    this.table = Form;
  }

  async createFormByUser({ user_id, form }) {
    const formCreated = await this.table.create({
      ...form,
      user_id,
    });

    return formCreated.id ? formCreated : null;
  }

  async getAllForms() {
    const forms = await this.table.findAll({
      attributes: { exclude: ['updatedAt'] },
      where: {
        status: 'active',
      },
    });

    return forms;
  }

  async getFormsByUser({ user_id }) {
    const forms = await this.table.findAll({
      attributes: { exclude: ['updatedAt'] },
      where: {
        user_id: user_id,
        status: 'active',
      },
    });

    return forms;
  }

  async getFormByUser({ user_id, form_id }) {
    const form = await this.table.findOne({
      attributes: { exclude: ['updatedAt'] },
      where: {
        id: form_id,
        user_id: user_id,
        status: 'active',
      },
    });

    return form;
  }

  async updateFormByUser({ user_id, form_id, form }) {
    const formUpdated = await this.table.update(form, {
      where: {
        id: form_id,
        user_id: user_id,
        status: 'active',
      },
    });
    return formUpdated;
  }
  async deleteFormByUser({ user_id, form_id }) {
    const formDeleted = await this.table.destroy({
      where: {
        user_id: user_id,
        id: form_id,
      },
    });

    return formDeleted;
  }
}

module.exports = FormService;
