const planRepository = require('../repositories/plan-repository');
const fareRepository = require('../repositories/fare-repository');
const PlanSummary = require('../helpers/plan-summary');
const {
    ERR_PLAN_NOT_FOUNT,
    ERR_FARE_NOT_FOUNT,
    ERR_INVALID_TOTAL_MINUTUES
} = require('../utils/error-type');

const applyPlanRule = async (originCode, destinationCode, planSlug, totalMinutes) => {
    if (!totalMinutes || totalMinutes < 1) {
        throw new Error(ERR_INVALID_TOTAL_MINUTUES);
    }
    const fare = await getFare(originCode, destinationCode); // Busca tarifa regular com os codigos informados 
    const plan = await getPlan(planSlug); // Busca o plano informado
    let planPrice = 0; // Valor inical do plano 
    const regularPrice = fare.minutePrice * totalMinutes; // Calcula o valor da tarifa regular conforme o total de minutos informado
    if (totalMinutes > plan.freeMinutes) { // Caso os minutos informado exceda o total oferecido pelo plano o valor do plano deve ser recalculado
        const exceededMinutes = totalMinutes - plan.freeMinutes;
        const exceededPrice = fare.minutePrice + (fare.minutePrice * plan.exceededMinutePercent);
        planPrice = +(exceededPrice * exceededMinutes).toFixed(2);
    }
    return new PlanSummary(originCode, destinationCode, totalMinutes, plan.name, planPrice, regularPrice);
}

const getFare = async (originCode, destinationCode) => {
    const fare = await fareRepository.getFare(originCode, destinationCode); // Busca tarifa regular com os codigos informados
    if (!fare) {
        throw new Error(ERR_FARE_NOT_FOUNT);
    }
    return fare;
};

const getPlan = async slug => {
    const plan =  await planRepository.getBySlug(slug);
    if (!plan) {
        throw new Error(ERR_PLAN_NOT_FOUNT);
    }
    return plan;
};

module.exports = {
    applyPlanRule
};