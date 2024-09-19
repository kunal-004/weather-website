const axios = require("axios");

const getData = async (lat, lng, name, callback) => {
  const { data, error } = await axios.get(
    //has data property , destructure it
    `${process.env.API_BASE_URL2}/${process.env.API_ACCESS_KEY_WEATHER}/${lat},${lng}?units=si&lang=`
  );
  const currentData = data.currently;
  if (error) {
    return callback(error, "unble to connect weather network", undefined);
  } else if (data.statusCode === 400) {
    return callback("Invalid Location Specification", undefined);
  } else {
    callback(
      undefined, //no error
      {
        title: `Weather Forecast of ${name}`,
        summary: `${data.daily.data[0].summary}`,
        report: `It is currently ${currentData.temperature} degrees now. There is ${currentData.precipProbability}% of rain.`,
      }
      // `Weather Forecast of ${name}: ${data.daily.data[0].summary}, It is currently ${currentData.temperature} degrees now. There is ${currentData.precipProbability}% of rain.`
    );
  }
};

module.exports = getData;
