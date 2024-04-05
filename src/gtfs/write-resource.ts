import { join } from "node:path";
import { $ } from "../utils/$";

export async function writeResource(
  resource: Map<string, Record<string, string>[]>,
  outputFile: string
) {
  const tmpdir = await $("mktemp -d");
  for (const [filename, values] of resource) {
    const header = Object.keys(values[0]);
    const headerLine = header.join(",");
    const content = values.map((v) => header.map((h) => v[h] ?? "").join(","));
    await Bun.write(
      Bun.file(join(tmpdir, filename)),
      `${[headerLine, ...content].join("\r\n")}\r\n`
    );
  }
  if (typeof process.env.OSM_PATH === "undefined") {
    console.warn("No OSM path was supplied, skipping shapes generation.");
  } else {
    await $(
      `pfaedle -D --inplace -x "${process.env.OSM_PATH}" "${tmpdir}"`
    ).catch((e) =>
      console.error("Failed to generate shapes for this resource:", e)
    );
  }
  await $(`zip -jr "${outputFile}" ${tmpdir}/*.txt`);
}
