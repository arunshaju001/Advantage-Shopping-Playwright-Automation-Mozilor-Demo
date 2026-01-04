import { faker } from '@faker-js/faker';
import { UserData } from '../data/types';

export const generateRegistrationData = (): UserData => {
    const password = `Test@${faker.string.alphanumeric(6)}1`;
    
    return {
        // Account Details
        username: faker.internet.username().substring(0, 10) + faker.number.int(999),
        email: faker.internet.email(),
        password: password,
        
        // Personal Details
        firstName: faker.person.firstName().substring(0, 30),
        lastName: faker.person.lastName().substring(0, 30),
        phoneNumber: faker.phone.number({ style: 'national' }).substring(0, 20),

        // Address
        country: 'India',
        city: faker.location.city().substring(0, 25),
        address: faker.location.streetAddress().substring(0, 50),
        state: faker.location.state().substring(0, 10),
        postalCode: faker.location.zipCode().substring(0, 10)
    };
};