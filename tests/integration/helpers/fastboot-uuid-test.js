import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | fastboot-uuid', function(hooks) {
  setupRenderingTest(hooks);

  module('v1', function() {
    test('renders in fastboot without "window" object', async function(assert) {
      await render(hbs`{{fastboot-uuid 'v1'}}`);
      assert.ok((/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/).test(this.element.textContent.trim()));
    });
  });

  module('v4', function() {
    test('renders in fastboot without "window" object', async function(assert) {
      await render(hbs`{{fastboot-uuid 'v4'}}`);
      assert.ok((/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/).test(this.element.textContent.trim()));
    });
  });
});
