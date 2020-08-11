import apiKeys from "../apiKeys";

const trefleApiKey = apiKeys.trefleAPI;
const zipCode = 92618;

console.log(zipCode);

async function zipCodeToPlants(zipCode) {
  try {
    const zipCodeData = await requestZipCodeData(zipCode);
    console.log("zipCodeData",zipCodeData)
    const zone = zipCodeData.zone;
    // Upper end of min temp range
    const tempMin = zipCodeData.rangemax
    const plantList = await requestPlantList(tempMin)
    return zipCodeData;
  } catch (err) {}
}

async function requestZipCodeData(zipCode) {
  try {
    const zipCodeUrl =
      "https://c0bra.api.stdlib.com/zipcode-to-hardiness-zone/?zipcode=" +
      zipCode;
    const response = await fetch(zipCodeUrl);
    const data = response.json();
    return data;
  } catch (error) {
    console.log("requestGeoCoordinates error: ", error);
  }
}

async function requestPlantList(tempMin) {

  const plantListUrl = "https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?token=" +
  trefleApiKey + "&range[minimum_temperature_deg_f]=," + tempMin

  const response = await fetch(plantListUrl);


  console.log(plantListUrl)

}


// Remove this after testing
zipCodeToPlants(zipCode);

export { zipCodeToPlants };
