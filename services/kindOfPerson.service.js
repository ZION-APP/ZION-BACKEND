const { KindOfPerson } = require('../models');

class KindOfPersonService {
  constructor() {
    this.table = KindOfPerson;
  }

  async getCatalogue() {
    const kindOfPersons = await this.table.findAll({
      attributes: [
        ['id', 'value'],
        ['description', 'label'],
      ],
      where: {
        status: 'active',
      },
    });

    return kindOfPersons;
  }
}

module.exports = KindOfPersonService;
