const planRepository = require('../repositories/plan-repository');
const planService = require('../services/plan-service');
const boom = require('boom');
const {
    ERR_PLAN_NOT_FOUNT,
    ERR_INVALID_TOTAL_MINUTUES,
    ERR_FARE_NOT_FOUNT,
  } = require('../utils/error-type');

const create = async (req, h) => {
    const plan = await planRepository.create(req.payload);
    return h.response(plan).code(201);
};

const getPlanSummary = async (req, h) => {
    try {
        const { originCode, destinationCode, planSlug, totalMinutes } = req.payload;
        const summary = await planService.applyPlanRule(originCode, destinationCode, planSlug, totalMinutes);
        return h.response(summary).code(200);
    } catch (error) {
        switch(error.message) {
            case ERR_PLAN_NOT_FOUNT:
                throw boom.badData('Plano não encontrado');
            case ERR_FARE_NOT_FOUNT:
                throw boom.badData('Tarifa não encontrada');
            case ERR_INVALID_TOTAL_MINUTUES:
                throw boom.badData('Tempo em minutos inválido');
            default:
                throw boom.badImplementation(error);
        }
    }
};

module.exports = {
    create,
    getPlanSummary
};
