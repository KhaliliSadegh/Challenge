const remove = require('../Middleware/removeDuplicates');
const source1 = [{
    "slices": [
        {
            "origin_name": "Schonefeld",
            "destination_name": "Stansted",
            "departure_date_time_utc": "2019-08-08T04:30:00.000Z",
            "arrival_date_time_utc": "2019-08-08T06:25:00.000Z",
            "flight_number": "144",
            "duration": 115
        },
        {
            "origin_name": "Stansted",
            "destination_name": "Schonefeld",
            "departure_date_time_utc": "2019-08-10T06:50:00.000Z",
            "arrival_date_time_utc": "2019-08-10T08:40:00.000Z",
            "flight_number": "145",
            "duration": 110
        }
    ],
    "price": 129
},
{
    "slices": [
        {
            "origin_name": "Schonefeld",
            "destination_name": "Stansted",
            "departure_date_time_utc": "2019-08-08T20:25:00.000Z",
            "arrival_date_time_utc": "2019-08-08T22:25:00.000Z",
            "flight_number": "8545",
            "duration": 120
        },
        {
            "origin_name": "Stansted",
            "destination_name": "Schonefeld",
            "departure_date_time_utc": "2019-08-10T18:00:00.000Z",
            "arrival_date_time_utc": "2019-08-10T20:00:00.000Z",
            "flight_number": "8544",
            "duration": 120
        }
    ],
    "price": 117.01
}
];
const source2 = [{
    "slices": [
        {
            "origin_name": "Schonefeld",
            "destination_name": "Stansted",
            "departure_date_time_utc": "2019-08-08T04:30:00.000Z",
            "arrival_date_time_utc": "2019-08-08T06:25:00.000Z",
            "flight_number": "144",
            "duration": 115
        },
        {
            "origin_name": "Stansted",
            "destination_name": "Schonefeld",
            "departure_date_time_utc": "2019-08-10T06:50:00.000Z",
            "arrival_date_time_utc": "2019-08-10T08:40:00.000Z",
            "flight_number": "145",
            "duration": 110
        }
    ],
    "price": 129
}];
const expectedResult = [{
    "slices": [
        {
            "origin_name": "Schonefeld",
            "destination_name": "Stansted",
            "departure_date_time_utc": "2019-08-08T04:30:00.000Z",
            "arrival_date_time_utc": "2019-08-08T06:25:00.000Z",
            "flight_number": "144",
            "duration": 115
        },
        {
            "origin_name": "Stansted",
            "destination_name": "Schonefeld",
            "departure_date_time_utc": "2019-08-10T06:50:00.000Z",
            "arrival_date_time_utc": "2019-08-10T08:40:00.000Z",
            "flight_number": "145",
            "duration": 110
        }
    ],
    "price": 129
},
{
    "slices": [
        {
            "origin_name": "Schonefeld",
            "destination_name": "Stansted",
            "departure_date_time_utc": "2019-08-08T20:25:00.000Z",
            "arrival_date_time_utc": "2019-08-08T22:25:00.000Z",
            "flight_number": "8545",
            "duration": 120
        },
        {
            "origin_name": "Stansted",
            "destination_name": "Schonefeld",
            "departure_date_time_utc": "2019-08-10T18:00:00.000Z",
            "arrival_date_time_utc": "2019-08-10T20:00:00.000Z",
            "flight_number": "8544",
            "duration": 120
        }
    ],
    "price": 117.01
}
];

describe('test=>removeDuplicates function', () => {

    test('1=> Should return uniqueFlights', () => {
        expect(remove.removeDuplicates([...source1, ...source2])).toStrictEqual(expectedResult);
    });

    test('2=> removeDuplicates of source2 when source1 is not respond', () => {
        expect(remove.removeDuplicates(source2)).toStrictEqual(source2);
    });

    test('3=> filter source1 when source2 is not respond', () => {
        expect(remove.removeDuplicates(source1)).toStrictEqual(source1);
    });

    test('4=> return [] when source1,source2 are undefined', () => {
        expect(remove.removeDuplicates(undefined)).toStrictEqual([]);
    });

    test('5=> Should return [] when source2,source1 are []', () => {
        expect(remove.removeDuplicates([])).toStrictEqual([]);
    });

});

