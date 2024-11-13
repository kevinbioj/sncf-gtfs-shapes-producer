import decompress from "decompress";

export async function downloadResource(url: string, destination: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to download feed (status ${response.status}).`);

  const buffer = Buffer.from(await response.arrayBuffer());
  await decompress(buffer, destination);
}