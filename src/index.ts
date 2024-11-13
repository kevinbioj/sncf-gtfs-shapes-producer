import { mkdtemp } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { downloadResource } from "./gtfs/download-resource.js";
import { patchResource } from "./gtfs/patch-resource.js";
import { writeResource } from "./gtfs/write-resource.js";

const osmPath = process.env.OSM_PATH;
if (typeof osmPath === 'undefined') {
  throw new Error('Please provide the path to the OSM file to use!');
}

const outputDirectory = process.env.OUTPUT_DIRECTORY ?? '.';

const runs = [
  { sourceUrl: 'https://eu.ftp.opendatasoft.com/sncf/gtfs/export-ter-gtfs-last.zip', destinationFile: 'sncf-ter.zip' },
  { sourceUrl: 'https://eu.ftp.opendatasoft.com/sncf/gtfs/export_gtfs_voyages.zip', destinationFile: 'sncf-intercites.zip' },
  { sourceUrl: 'https://eu.ftp.opendatasoft.com/sncf/gtfs/export-intercites-gtfs-last.zip', destinationFile: 'sncf-tgv.zip' },
] as const;

for (const { sourceUrl, destinationFile } of runs) {
  const directory = await mkdtemp(join(tmpdir(), 'sncf-gtfs_'));

  console.log('========================');
  console.log("Source URL: '%s'", sourceUrl);
  console.log("Working directory: '%s'", directory);
  console.log("Destination file: '%s'", destinationFile);
  console.log('------------------------');

  console.log('Downloading resource.');
  await downloadResource(sourceUrl, directory);

  console.log('Patching resource.');
  try {
    await patchResource(directory, osmPath);
  } catch (cause) {
    console.error('Failed to generate shapes...', cause);
    continue;
  }

  console.log('Writing resource.');
  await writeResource(directory, outputDirectory, destinationFile);

  console.log('Done!');
  console.log('------------------------');
}
