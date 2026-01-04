export interface UserData {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string;
    city: string;
    address: string;
    state: string;
    postalCode: string;
}

export enum Category {
    Speakers = 'SPEAKERS',
    Tablets = 'TABLETS',
    Laptops = 'LAPTOPS',
    Mice = 'MICE',
    Headphones = 'HEADPHONES'
}