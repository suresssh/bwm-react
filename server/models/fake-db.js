const Rental = require('./rental')

class FakeDb {
    constructor() {
        this.rentals = [{
            id: 1,
            title: "Central Apartment",
            city: "New York",
            street: "Times Sqaure",
            category: "apartment",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 3,
            description: "Very nice apartment",
            dailyRate: 34,
            shared: false,
            createdAt: new Date()
        },
        {
            id: 2,
            title: "Central Apartment 2",
            city: "San Francisco",
            street: "Main street",
            category: "condo",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 2,
            description: "Very nice apartment",
            dailyRate: 12,
            shared: true,
            createdAt: new Date()
        },
        {
            id: 3,
            title: "Central Apartment 3",
            city: "Bratislava",
            street: "Hlavna",
            category: "condo",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 2,
            description: "Very nice apartment",
            dailyRate: 334,
            shared: true,
            createdAt: new Date()
        },
        {
            id: 4,
            title: "Central Apartment 4",
            city: "Berlin",
            street: "Haupt strasse",
            category: "house",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 9,
            description: "Very nice apartment",
            dailyRate: 33,
            shared: true,
            createdAt: new Date()
        }]
    }

    async cleanDb() {
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