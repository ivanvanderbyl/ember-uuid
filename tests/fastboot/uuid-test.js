import { module, test } from 'qunit';
import { setup, visit, /* mockServer */ } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | uuid test', function(hooks) {
  setup(hooks);

  test('it renders v1 and v4 uuid', async function(assert) {
    await visit('/uuid');

    assert.ok((/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/).test(document.querySelector('#v1').textContent), 'v1');
    assert.ok((/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/).test(document.querySelector('#v4').textContent), 'v4');
  });

});
