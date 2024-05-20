import { downloadResource } from "./gtfs/download-resource";
import { filterResource } from "./gtfs/filter-resource";
import { writeResource } from "./gtfs/write-resource";

const feedUrl =
  "https://eu.ftp.opendatasoft.com/sncf/gtfs/export-ter-gtfs-last.zip";
const outputFile = "/home/bustracker/gtfs-resources/nomad-train.zip";
const routeIds = [
  "FR:Line::468B44B7-C327-4154-B85E-25C67C32B61E:", // K1+ PARIS - ROUEN - LE HAVRE
  "FR:Line::66849E04-284F-47D7-8795-4C925C6ED66F:", // K2+ PARIS - CAEN - CHERBOURG
  "FR:Line::03A83359-7D9D-4301-9C87-92FED4666451:", // K3+ PARIS - DEAUVILLE-TROUVILLE
  "FR:Line::0ce8180c-0fb6-4cc1-80ba-53782622a5ce:", // K21+ PARIS - CAEN
  "FR:Line::3334AEE5-6669-4426-A9E8-1F7704E8F5BD:", // K2 CAEN - CHERBOURG
  "FR:Line::6155CD5F-AB2D-4274-A052-8C7462540578:", // K4 PARIS - GRANVILLE
  "FR:Line::a5e2106e-65d0-4abe-a726-bea36c38855b:", // K11 ROUEN - DIEPPE
  "FR:Line::960d5017-915b-4c7e-b452-2fd669ba48a5:", // K39 CAEN - LE MANS - TOURS
  "FR:Line::7BDE293E-0D29-48A4-8978-8ADB3FFEA340:", // K45 ROUEN - AMIENS - LILLE
  "FR:Line::97E911FA-C8F2-4861-AD3C-C36CF4750A49:", // C1 ROUEN - VERNON - PARIS
  "FR:Line::57AE0F48-2436-44BD-A2F0-AA45D4A483E7:", // C2 PARIS - EVREUX - SERQUIGNY
  "FR:Line::de778414-6e3d-4bc7-9d9a-6bac6aed673f:", // C10 ELBEUF - ROUEN - YVETOT
  "FR:Line::789690b9-0bee-4978-8bf9-f4810c9e16f2:", // C12 CAEN - COUTANCES - GRANVILLE (- RENNES)
  "FR:Line::d03091e3-31dd-4499-a71c-c61ef5399cc6:", // C13 CAEN - LISIEUX
  "FR:Line::A474D9C7-1A46-4870-8AAA-2A9C49F46F3D:", // P1 ROUEN - LE HAVRE
  "FR:Line::5E25F2B5-D15F-475F-B424-C7ED6748FE50:", // P3 LISIEUX - DEAUVILLE-TROUVILLE
  "FR:Line::A6CE6325-08D1-4C25-9D15-15C2DC5E7BD0:", // P10 CAEN - ROUEN
  "FR:Line::3e9229c5-ae84-4f9e-98df-93cc2e91b55c:", // P11 ROUEN - DIEPPE
  "FR:Line::b66ce399-d888-47de-897b-46f7f79fa5ad:", // P14 LE HAVRE - BREAUTE - FECAMP
  "FR:Line::99d814a0-f512-4df4-966c-8f8e12e4ef6d:", // P16 SERQUEUX - GISORS
  "FR:Line::A16522A1-3A9D-406B-B7AB-12E318E7CC92:", // P30 BEAUVAIS - ABANCOURT - LE TREPORT
  "FR:Line::DD461A4B-557A-4303-B639-AED4F7A5141B:", // P45 ROUEN - AMIENS
  "FR:Line::325702f0-8067-4665-a0d8-5ebce7e59d0a:", // LEZARD'EXPRESS REGIONALE
];

console.log("== LER GTFS Maker ==");
console.log("1. Downloading TER GTFS resource.");
const resource = await downloadResource(feedUrl);
console.log("2. Filtering resource by routes.");
filterResource(resource, routeIds);
console.log("3. Writing GTFS resource back.");
writeResource(resource, outputFile);
console.log("Done! Goodbye.");
