const Rental = require('./rental');
const User = require('./user');

class FakeDb {
    constructor() {
        this.rentals = [{
            title: "Nice view on ocean",
            city: "San Francisco",
            street: "Main street",
            category: "condo",
            image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            bedrooms: 4,
            shared: true,
            description: "Very nice apartment in center of the city.",
            dailyRate: 43
        },
        {
            title: "Modern apartment in center",
            city: "New York",
            street: "Time Square",
            category: "apartment",
            image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            bedrooms: 1,
            shared: false,
            description: "Very nice apartment in center of the city.",
            dailyRate: 11
        },
        {
            title: "Old house in nature",
            city: "Spisska Nova Ves",
            street: "Banicka 1",
            category: "house",
            image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            bedrooms: 5,
            shared: true,
            description: "Very nice apartment in center of the city.",
            dailyRate: 23
        }]

        this.user = {
            username: 'testuser',
            email: 'testemail@gmail.com',
            password: 'test@123'
        }
    }

    async cleanDb() {
        // await User.deleteMany({});
        await Rental.deleteMany({});
    }

    pushRentalsToDb() {
        this.rentals.forEach((rental) => {
            var rental = new Rental(rental);
            rental.save();
        })
    }

    initPushRental() {
        this.cleanDb();
        this.pushRentalsToDb();
    }

}

module.exports = FakeDb;