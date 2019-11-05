const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("fetchIP didn't work!" , error);
    return;
  }
  console.log('IP worked! Returned IP:' , ip);
  

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("fetchCoords didn't work!", error);
      return;
    }
    console.log('Coords worked! Returned Coords: ', coords);
    

    fetchISSFlyOverTimes(coords, (error, passTimes) => {
      if(error) {
        console.log("fetchFlyover didn't work!", error);
        return;
      }
      console.log('Flyover worked! Returned flyover times:', passTimes);
    });
  });
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error); 
  }
  printPassTimes(passTimes);
});
