import apiKeys from "../apiKeys";

const trefleApiKey = apiKeys.trefleAPI;
const zipCode = 92618;

console.log(zipCode);

async function zipCodeToPlants(zipCode) {
  try {
    const zipCodeData = await requestZipCodeData(zipCode);
    const zone = zipCodeData.zone;

    // Upper end of min temp range
    const tempMin = zipCodeData.rangemax;
    const currentPage = 1;
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
    console.log("finalData", finalData);
    console.log("plantList", plantList);

    return finalData;
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
    console.log("requestZipCodeData error: ", error);
  }
}

async function requestPlantList(dataForPlantRequest) {
  try {
    console.log("dataForPlantRequest", dataForPlantRequest);
    const currentPage = dataForPlantRequest.currentPage;
    const plantListUrl =
      "https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?page=" +
      currentPage +
      "&token=" +
      trefleApiKey +
      "&range[minimum_temperature_deg_f]=," +
      dataForPlantRequest.tempMin;

    const response = await fetch(plantListUrl);
    const data = response.json();
    return data;
  } catch (error) {
    console.log("requestPlantList error: ", error);
  }
}

// Remove this after testing
zipCodeToPlants(zipCode);

export { zipCodeToPlants };
