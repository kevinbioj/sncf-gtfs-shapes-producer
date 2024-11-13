import { $ } from "../utils/$.js";

export function patchResource(directory: string, osmPath: string) {
  return $(`/usr/local/bin/pfaedle -D --inplace -x "${osmPath}" "${directory}"`);
}
