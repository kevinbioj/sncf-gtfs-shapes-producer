import { join } from "node:path";

import { $ } from "../utils/$.js";

export async function writeResource(directory: string, outputDirectory: string, filename: string) {
  await $(`zip -jr ${join(outputDirectory, filename)} ${directory}/*.txt`);
}
