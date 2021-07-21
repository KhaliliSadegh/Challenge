const axios = require('axios');

/**
 * Call two API discovery-stub.comtravo.com and
 * merge the results as return value
 * 
 * @return {[mergedFlights]}      
 */
async function getFlightApi() {
    var result = null;
    var result2 = null;

    const apiUsername = 'ct_interviewee';
    const apiPassword = 'supersecret';

    try {
        result = await axios({
            method: 'get',
            url: `https://discovery-stub.comtravo.com/source1`,
            auth: { username: apiUsername, password: apiPassword }
        });
    }
    catch (error) { result = [] }
    try {
        result2 = await axios({
            method: 'get',
            url: `https://discovery-stub.comtravo.com/source2`,
            auth: { username: apiUsername, password: apiPassword }
        });
    }
    catch (error) { result2 = [] }

    if (result.data && !result2.data)
        return result.data.flights;
    else if (!result.data && result2.data)
        return result2.data.flights;
    else if (result.data && result2.data)
        return [...result.data.flights, ...result2.data.flights];
    else
        return [];
}



async function getFlights() {
    const flightRes = await getFlightApi();
    return removeDuplicates(flightRes);
}

/**
 * remove duplicate values from input item
 * based on departure_date_time_utc && flight_number
 * @param  {input} any mergedFlightes
 * @return {[uniqueFlights]}      [uniqueFlightes]
 */
const removeDuplicates = (input) => {
    if (!input)
        if (!input.length)
            return 'Nothing Found';



    const uniqueFlights = input.reduce((accu, current) => {
        const uniqueItems = accu.find(item => item.slices[0].flight_number === current.slices[0].flight_number &&
            item.slices[0].departure_date_time_utc === current.slices[0].departure_date_time_utc &&
            item.slices[1].flight_number === current.slices[1].flight_number &&
            item.slices[1].departure_date_time_utc === current.slices[1].departure_date_time_utc);
        if (!uniqueItems) {
            return accu.concat([current]);
        }
        return accu;
    }, []);

    return uniqueFlights;
}


exports.removeDuplicates = removeDuplicates;
exports.getFlights = getFlights;