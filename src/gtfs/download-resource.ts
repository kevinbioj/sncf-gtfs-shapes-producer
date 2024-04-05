import { join } from "node:path";
import { $ } from "../utils/$";

const files = [
  "agency.txt",
  "calendar_dates.txt",
  "routes.txt",
  "stop_times.txt",
  "stops.txt",
  "trips.txt",
];

export async function downloadResource(href: string) {
  const tmpdir = await $("mktemp -d");
  const sourcePath = join(tmpdir, "source.zip");
  await $(`wget -O "${sourcePath}" "${href}"`);
  await $(`unzip -o "${sourcePath}" -d "${tmpdir}"`);
  await $(`rm "${sourcePath}"`);
  const resource = new Map<string, Record<string, string>[]>();
  for (const file of files) {
    const content = await Bun.file(join(tmpdir, file)).text();
    const values = parseCsv(content);
    resource.set(file, values);
  }
  return resource;
}

// ---

function parseCsv<T = Record<string, string>>(input: string) {
  const [header, ...records] = input
    .trimEnd()
    .split(/\r?\n/)
    .map((line) => line.trim().split(","));
  return records.map((values) => {
    const record = {} as Record<string | number, unknown>;
    values.forEach((value, index) => {
      const key = header[index];
      record[key] = value.replace(/^\"(.*)\"$/, "$1");
    });
    return record as T;
  });
}
