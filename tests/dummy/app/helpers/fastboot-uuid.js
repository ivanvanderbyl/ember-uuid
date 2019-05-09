import { helper } from '@ember/component/helper';
import { v1, v4 } from "ember-uuid";

export function fastbootUuid(params/*, hash*/) {
  let [version] = params;
  return version === 'v1' ? v1() : v4();
}

export default helper(fastbootUuid);
