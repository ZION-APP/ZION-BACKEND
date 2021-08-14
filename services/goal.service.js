const { Goal } = require('../models');

class GoalService {
  constructor() {
    this.table = Goal;
  }

  async getAllGoals() {
    const goals = await this.table.findAll();
    return goals;
  }

  async getGoalsByUser({ id }) {
    const goals = await this.table.findAll({
      attributes: { exclude: ['updatedAt'] },
      where: {
        user_id: id,
        status: 'active',
      },
    });

    return goals;
  }

  async getGoalByUser({ user_id, goal_id }) {
    const goal = await this.table.findOne({
      attributes: { exclude: ['updatedAt'] },
      where: {
        id: goal_id,
        user_id: user_id,
        status: 'active',
      },
    });

    return goal;
  }

  async createGoalByUser({ goal, user_id }) {
    const goalCreated = await this.table.create({
      ...goal,
      user_id,
    });
    return goalCreated.id ? goalCreated : null;
  }

  async updateGoalByUser({ user_id, goal_id, goal }) {
    const goalUpdated = await this.table.update(goal, {
      where: {
        id: goal_id,
        user_id: user_id,
        status: 'active',
      },
    });
    return goalUpdated;
  }
}

module.exports = GoalService;
