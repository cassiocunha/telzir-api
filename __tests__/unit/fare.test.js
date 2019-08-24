const fareService = require('../../src/services/fare-service');
const { ERR_FARE_ALREADY_EXISTS } = require('../../src/utils/error-type');

describe('Testes para criacao de uma nova tarifa', () => {
    it('Deve lançar exceção para uma tarifa que já existe', async () => {
        expect.assertions(1);
        await expect(fareService.createFare({
            originCode : "018",
            destinationCode: "016",
            minutePrice: "50"
        })).rejects.toEqual(new Error(ERR_FARE_ALREADY_EXISTS));
    });
    it('Deve criar uma tarifa', async () => {
        const fareData = {originCode : "018", destinationCode: "021", minutePrice: "60"};
        const fare = await fareService.createFare(fareData);
        expect(fareData.originCode).toEqual(fare.originCode);
        expect(fareData.destinationCode).toEqual(fare.destinationCode);
    });
});

jest.mock('../../src/repositories/fare-repository', () => {
    return {
        create: jest.fn(() => {
            return Promise.resolve({originCode : "018", destinationCode: "021", minutePrice: "60"});
        }),
        
        fareExists: jest.fn((originCode, destinationCode) => {
            if (originCode === '018' && destinationCode === "016") {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        })
    }
})
