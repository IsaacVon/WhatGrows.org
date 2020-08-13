import apiKeys from "../apiKeys";

const trefleApiKey = apiKeys.trefleAPI;

// Takes in validated zip code number
// gets temp min, sends it to "Request plant List"
// Returns an object with 20 plants

const zipCodeToPlants = async (zipCode) => {
  try {
    // console.log("1 zipCodeToPlants running...");

    const zipCodeData = await requestZipCodeData(zipCode);
    const usdaHardinessZone = zipCodeData.zone;
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

// Takes in page number and temp min, from either state or zip code
// Returns an object with 20 plants

async function requestPlantList(dataForPlantRequest) {
  console.log("requestPlantList", dataForPlantRequest);
  try {
    // console.log("3 requestPlantList running...");
    // console.log("inside requestPlantList", dataForPlantRequest);

    let { tempMin, currentPage } = dataForPlantRequest;
    // console.log("tempMin", tempMin)
    // console.log("currentPage", currentPage)

    const filters =  `&filter%5Bfruit_conspicuous%5D=true`

    const plantListUrl =
      "https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?" +
      filters +
      "&page=" + currentPage + 
      "&order%5Bcommon_name%5D=asc" +
      "&range[minimum_temperature_deg_f]=," +
      tempMin +
      "&token=" +
      trefleApiKey;

    console.log("plantListUrl",plantListUrl)
    const response = await fetch(plantListUrl);
    const data = response.json();
    return data;
  } catch (error) {
    console.log("requestPlantList error: ", error);
  }
}

export { zipCodeToPlants, requestPlantList };
