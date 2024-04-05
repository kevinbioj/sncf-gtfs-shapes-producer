import { downloadResource } from "./gtfs/download-resource";
import { filterResource } from "./gtfs/filter-resource";
import { writeResource } from "./gtfs/write-resource";

const feedUrl =
  "https://eu.ftp.opendatasoft.com/sncf/gtfs/export-ter-gtfs-last.zip";
const outputFile = process.env.OUTPUT_FILE ?? "~/sncf-ler-gtfs.zip";
const routeId = "FR:Line::325702f0-8067-4665-a0d8-5ebce7e59d0a:";

console.log("== LER GTFS Maker ==");
console.log("1. Downloading TER GTFS resource.");
const resource = await downloadResource(feedUrl);
console.log("2. Filtering resource by routes.");
filterResource(resource, [routeId]);
console.log("3. Writing GTFS resource back.");
writeResource(resource, outputFile);
console.log("Done! Goodbye.");
