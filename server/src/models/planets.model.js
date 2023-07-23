const fs = require("fs");
const path = require("path");
const parse = require("csv-parse");

const planets = require("./planets.mongo");

const livePLanet = (planet)=>{
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}


const loadPlanetsData = async () => {
    return result = fs
      .createReadStream(
        path.join(__dirname, "..", "..", "data", "kepler_data.csv")
      ).pipe(
        parse({
          comment: "#",
          columns: true,
        })
      ).on("data", async (data) => {
        livePLanet(data) && (await savePlanet(data));
      }).on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
      }).on("error", (error) => {
        console.log(error.message);
      });
};


const savePlanet = async (planet)=>{
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

const getAllPlanets = async ()=>{
  return await planets.find(
    {},
    {
      '_id': 0,
      '__v': 0,
    }
  );
}


module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
