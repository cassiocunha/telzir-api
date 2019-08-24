const planService = require('../../src/services/plan-service');
const {
    ERR_PLAN_NOT_FOUNT,
    ERR_FARE_NOT_FOUNT,
    ERR_INVALID_TOTAL_MINUTUES
} = require('../../src/utils/error-type');

describe('Testes para o plano FaleMais 30', () => {
    it('Deve calcular tarifa FaleMais 30 sem minutos excedentes', async () => {
        const summary = await planService.applyPlanRule('011', '016', 'fale-mais-30', 20);
        expect(summary.originCode).toBe('011');
        expect(summary.destinationCode).toBe('016');
        expect(summary.totalMinutes).toBe(20);
        expect(summary.planName).toBe('FaleMais 30');
        expect(summary.planPrice).toBe(0);
        expect(summary.regularPrice).toBe(38);
    });
    it('Deve calcular tarifa FaleMais 30 com minutos excedentes', async () => {
        const summary = await planService.applyPlanRule('011', '016', 'fale-mais-30', 60);
        expect(summary.originCode).toBe('011');
        expect(summary.destinationCode).toBe('016');
        expect(summary.totalMinutes).toBe(60);
        expect(summary.planName).toBe('FaleMais 30');
        expect(summary.planPrice).toBe(62.70);
        expect(summary.regularPrice).toBe(114);
    });
});

describe('Testes para o plano FaleMais 60', () => {
    it('Deve calcular tarifa FaleMais 60 sem minutos excedentes', async () => {
        const summary = await planService.applyPlanRule('011', '017', 'fale-mais-60', 60);
        expect(summary.originCode).toBe('011');
        expect(summary.destinationCode).toBe('017');
        expect(summary.totalMinutes).toBe(60);
        expect(summary.planName).toBe('FaleMais 60');
        expect(summary.planPrice).toBe(0);
        expect(summary.regularPrice).toBe(102);
    });
    it('Deve calcular tarifa FaleMais 60 com minutos excedentes', async () => {
        const summary = await planService.applyPlanRule('011', '017', 'fale-mais-60', 80);
        expect(summary.originCode).toBe('011');
        expect(summary.destinationCode).toBe('017');
        expect(summary.totalMinutes).toBe(80);
        expect(summary.planName).toBe('FaleMais 60');
        expect(summary.planPrice).toBe(37.40);
        expect(summary.regularPrice).toBe(136);
    });
});

describe('Testes para o plano FaleMais 120', () => {
    it('Deve calcular tarifa FaleMais 120 sem minutos excedentes', async () => {
        const summary = await planService.applyPlanRule('018', '011', 'fale-mais-120', 60);
        expect(summary.originCode).toBe('018');
        expect(summary.destinationCode).toBe('011');
        expect(summary.totalMinutes).toBe(60);
        expect(summary.planName).toBe('FaleMais 120');
        expect(summary.planPrice).toBe(0);
        expect(summary.regularPrice).toBe(114);
    });
    it('Deve calcular tarifa FaleMais 120 com minutos excedentes', async () => {
        const summary = await planService.applyPlanRule('018', '011', 'fale-mais-120', 200);
        expect(summary.originCode).toBe('018');
        expect(summary.destinationCode).toBe('011');
        expect(summary.totalMinutes).toBe(200);
        expect(summary.planName).toBe('FaleMais 120');
        expect(summary.planPrice).toBe(167.20);
        expect(summary.regularPrice).toBe(380);
    });
});

describe('Testes com parametros invalidos', () => {
    it('Deve lancar excessao quando nao encontrar tarifas, planos ou total de minutos for invalido', async () => {
        expect.assertions(8);
        await expect(planService.applyPlanRule(undefined, '011', 'fale-mais-120', 200)).rejects.toEqual(new Error(ERR_FARE_NOT_FOUNT));
        await expect(planService.applyPlanRule('018', undefined, 'fale-mais-120', 200)).rejects.toEqual(new Error(ERR_FARE_NOT_FOUNT));
        await expect(planService.applyPlanRule(undefined, undefined, 'fale-mais-120', 200)).rejects.toEqual(new Error(ERR_FARE_NOT_FOUNT));
        await expect(planService.applyPlanRule('011', '016', undefined, 200)).rejects.toEqual(new Error(ERR_PLAN_NOT_FOUNT));
        await expect(planService.applyPlanRule('011', '016', 'fale-mais-120', undefined)).rejects.toEqual(new Error(ERR_INVALID_TOTAL_MINUTUES));
        await expect(planService.applyPlanRule('011', '016', 'fale-mais-120', 0)).rejects.toEqual(new Error(ERR_INVALID_TOTAL_MINUTUES));
        await expect(planService.applyPlanRule('011', '016', 'fale-mais-120', "")).rejects.toEqual(new Error(ERR_INVALID_TOTAL_MINUTUES));
        await expect(planService.applyPlanRule('011', '016', 'fale-mais-120', " ")).rejects.toEqual(new Error(ERR_INVALID_TOTAL_MINUTUES));
    });
});

jest.mock('../../src/repositories/fare-repository', () => {
    return {
        getFare: jest.fn((originCode, destinationCode) => {
            if (!originCode || !destinationCode) {
                return Promise.resolve(undefined); 
            }
            const fare = {originCode, destinationCode};
            if (originCode === '011' && destinationCode === '016') {
                fare.minutePrice = 1.9;
            } else if (originCode === '016' && destinationCode === '011') {
                fare.minutePrice = 2.9;
            } else if (originCode === '011' && destinationCode === '017') {
                fare.minutePrice = 1.7;
            } else if (originCode === '017' && destinationCode === '011') {
                fare.minutePrice = 2.7;
            } else if (originCode === '011' && destinationCode === '018') {
                fare.minutePrice = 0.9;
            } else if (originCode === '018' && destinationCode === '011') {
                fare.minutePrice = 1.9;
            }
            return Promise.resolve(fare);
        })
    }
})

jest.mock('../../src/repositories/plan-repository', () => {
    return {
        getBySlug: jest.fn(slug => {
            switch(slug) {
                case "fale-mais-30":
                    return Promise.resolve({name : "FaleMais 30", freeMinutes : 30, exceededMinutePercent : 0.1});
                case "fale-mais-60":
                    return Promise.resolve({name : "FaleMais 60", freeMinutes : 60, exceededMinutePercent : 0.1}); 
                case "fale-mais-120":
                    return Promise.resolve({name : "FaleMais 120", freeMinutes : 120, exceededMinutePercent : 0.1});
                default:
                    return undefined;        
            }
        })
    }
})