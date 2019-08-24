const customerService = require('../../src/services/customer-service');
const { ERR_CUSTOMER_ALREADY_EXISTS } = require('../../src/utils/error-type');

describe('Testes para criacao de um novo cliente', () => {
    it('Deve lançar exceção para um cliente que já existe', async () => {
        expect.assertions(1);
        await expect(customerService.createCustomer({
            name : "Maria jose",
            email: "mariajose@gmail.com",
            password : "123456"
        })).rejects.toEqual(new Error(ERR_CUSTOMER_ALREADY_EXISTS));
    });
    it('Deve cadastrar um cliente', async () => {
        const customerData = {name : "Joao jose", email: "joao@gmail.com", password : "123456"};
        const customer = await customerService.createCustomer(customerData);
        expect(customerData.name).toEqual(customer.name);
        expect(customerData.email).toEqual(customer.email);
    });
});

jest.mock('../../src/repositories/customer-repository', () => {
    return {
        create: jest.fn(() => {
            return Promise.resolve({name : "Joao jose", email: "joao@gmail.com", password : "123456"});
        }),
        
        customerExists: jest.fn(email => {
            if (email === 'mariajose@gmail.com') {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        })
    }
})
