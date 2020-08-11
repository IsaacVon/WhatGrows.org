import apiKeys from "../apiKeys";

const trefleApiKey = apiKeys.trefleAPI;

// Takes in validated zip code number
// gets temp min, sends it to "Request plant List"
// Returns an object with 20 plants

async function zipCodeToPlants(zipCode) {
  try {
    // console.log("1 zipCodeToPlants running...");

    const zipCodeData = await requestZipCodeData(zipCode);
    const zone = zipCodeData.zone;
    const currentPage = 1;

    // Upper end of min temp range
    const tempMin = zipCodeData.rangemax;
    const dataForPlantRequest = {
      tempMin,
      currentPage,
    };

    const plantList = await requestPlantList(dataForPlantRequest);
    const plantsOnPage = plantList.data;
    const totalPlants = plantList.meta.total;
    const totalPages = Math.ceil(totalPlants / 20);

    const finalData = {
      tempMin,
      totalPlants,
      plantsOnPage,
      totalPages,
      currentPage,
    };
    console.log("final data", finalData)
    return finalData;
  } catch (err) {}
}

async function requestZipCodeData(zipCode) {
  try {
    // console.log("2 requestZipCodeData running...");
    const zipCodeUrl =
      "https://c0bra.api.stdlib.com/zipcode-to-hardiness-zone/?zipcode=" +
      zipCode;
    const response = await fetch(zipCodeUrl);
    const data = response.json();
    return data;
  } catch (error) {
    console.log("requestZipCodeData error: ", error);
  }
}

// Takes in page number and temp min, from either state or zip code
// Returns an object with 20 plants

async function requestPlantList(dataForPlantRequest) {
  try {
    // console.log("3 requestPlantList running...");

    let { tempMin, currentPage } = dataForPlantRequest;

    const plantListUrl =
      "https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?page=" +
      currentPage +
      "&token=" +
      trefleApiKey +
      "&range[minimum_temperature_deg_f]=," +
      tempMin;

    const response = await fetch(plantListUrl);
    const data = response.json();
    return data;
  } catch (error) {
    console.log("requestPlantList error: ", error);
  }
}

export { zipCodeToPlants, requestPlantList };
