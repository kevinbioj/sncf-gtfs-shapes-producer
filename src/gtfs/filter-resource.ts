export function filterResource(
  resource: Map<string, Record<string, string>[]>,
  routeIds: string[]
) {
  const routes = resource
    .get("routes.txt")!
    .filter((r) => routeIds.includes(r.route_id));
  const agencyIds = [...routes.map((r) => r.agency_id)];
  const agency = resource
    .get("agency.txt")!
    .filter((a) => agencyIds.includes(a.agency_id));
  const trips = resource
    .get("trips.txt")!
    .filter((t) => routeIds.includes(t.route_id));
  const serviceIds = trips.map((t) => t.service_id);
  const calendarDates = resource
    .get("calendar_dates.txt")!
    .filter((cd) => serviceIds.includes(cd.service_id));
  const tripIds = trips.map((t) => t.trip_id);
  const stopTimes = resource
    .get("stop_times.txt")!
    .filter((st) => tripIds.includes(st.trip_id));
  const stopIds = stopTimes.map((st) => st.stop_id);
  const stops = resource
    .get("stops.txt")!
    .filter((s) => stopIds.includes(s.stop_id));
  stops.forEach((stop) => {
    delete stop.parent_station;
  });
  resource.clear();
  resource.set("agency.txt", agency);
  resource.set("calendar_dates.txt", calendarDates);
  resource.set("routes.txt", routes);
  resource.set("stop_times.txt", stopTimes);
  resource.set("stops.txt", stops);
  resource.set("trips.txt", trips);
}
