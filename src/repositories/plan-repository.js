const PlanModel = require('../models/plan-model');

const create = planData => {
    const planModel = new PlanModel(planData);
    return planModel.save();
};

const getBySlug = slug => {
    return PlanModel.findOne({active: true, slug: slug});
};

module.exports = {
    create,
    getBySlug
};


