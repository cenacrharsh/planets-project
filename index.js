// function parse returns an event emitter that deals with streams of data coming in from the file, but this function doesn't deals with files directly, it only knows about streams hence we use inbuilt "fs" module
const { parse } = require("csv-parse");

// allows us to open files as a readable stream which is a kind of event emitter which emits various named events depending on what's currently happening in the file
const fs = require("fs");

const isHabitablePlanet = (data) => {
  return data["koi_disposition"] === "CONFIRMED";
};

//* we pipe a readable stream (here createReadStream()) to a writeable stream (here parse())
//* readable.pipe(writeable)
const habitablePlanets = [];
fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true, // returns data as array of js objects with key value pairs instead of array of values in a row
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (err) => {
    console.log("Error occured while reading file");
    console.log(err);
  })
  .on("end", () => {
    console.log("Habitable Planets");
    console.log(habitablePlanets);
  });
