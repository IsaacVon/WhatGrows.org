import apiKeys from "../apiKeys";

const trefleApiKey = apiKeys.trefleAPI;

if (!trefleApiKey) console.log("trefleApiKey Not importing to zipCodeToPlants");

// Takes in validated zip code number
// gets temp min, sends it to "Request plant List"
// Returns an object with 20 plants

const zipCodeToPlants = async (zipCode, filterString) => {
  try {
    const zipCodeData = await requestZipCodeData(zipCode);
    console.log("zipCodeData", zipCodeData)
    const usdaHardinessZone = zipCodeData.zone;
    const currentPage = 1;

    // Upper end of min temp range
    const tempMin = zipCodeData.rangemax;
    const dataForPlantRequest = {
      tempMin,
      currentPage,
      filterString,
    };
    const plantList = await requestPlantList(dataForPlantRequest);
    const plantsOnPage = plantList.data;
    const totalPlants = plantList.meta.total;
    const totalPages = Math.ceil(totalPlants / 20);

    const finalData = {
      usdaHardinessZone,
      tempMin,
      totalPlants,
      totalPages,
      currentPage,
      plantsOnPage,
    };
    return finalData;
  } catch (err) {}
};

const requestZipCodeData = async (zipCode) => {
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
};

// Takes in page number, temp min, filters
// Returns an object with 20 plants
async function requestPlantList(dataForPlantRequest) {
  try {
    let { tempMin, currentPage, filterString } = dataForPlantRequest;
    const plantListUrl =
      "https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?" +
      filterString +
      "&page=" +
      currentPage +
      "&order%5Bcommon_name%5D=asc" +
      "&range[minimum_temperature_deg_f]=," +
      tempMin +
      "&token=" +
      trefleApiKey;

    const response = await fetch(plantListUrl);
    const data = response.json();
    return data;
  } catch (error) {}
}

// Input: part of api call URL /api/v1/plants/penstemon-albertinus
// Goal: Do API call, Set state learnMore with plant info, Load thing with that

async function requestMorePlantInfo(plantLink) {
  // console.log("requestMorePlantInfo")
  try {
    const plantListUrl =
      "https://cors-anywhere.herokuapp.com/https://trefle.io/" +
      plantLink +
      "?token=" +
      trefleApiKey;

    // console.log("plantListUrl", plantListUrl)

    const response = await fetch(plantListUrl);
    const data = response.json();
    return data;
  } catch (error) {}
}

export { zipCodeToPlants, requestPlantList, requestMorePlantInfo };
