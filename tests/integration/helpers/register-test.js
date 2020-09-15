import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Component from '@ember/component';
import { register } from 'ember-register-helper/helpers/register';

module('Integration | Helper | register', function(hooks) {
  setupRenderingTest(hooks);

  test('it registers the class', async function(assert) {
    let TestComponent = Component.extend();
    let name = register(this.owner, TestComponent);
    let resolvedClass = this.owner.resolveRegistration(`component:${name}`);
    assert.strictEqual(
      resolvedClass,
      TestComponent,
      'component class is registered and resolved correctly'
    );
  });

  test('it memoizes the registration name', async function(assert) {
    let TestComponent = Component.extend();
    let name1 = register(this.owner, TestComponent);
    let name2 = register(this.owner, TestComponent);
    assert.strictEqual(name1, name2, 'two invocations return the same name');
  });

  test('it returns null when passed something nullish', async function(assert) {
    assert.strictEqual(register(this.owner, null), null, 'returns null when passed null');
    assert.strictEqual(register(this.owner, undefined), null, 'returns null when passed undefined');
  });

  // The next test is executed twice to ensure that the registration cache doesn't leak between tests.
  let TestComponent = Component.extend({
    layout: hbs`test`,
  });

  for (let i = 0; i < 2; i++) {
    test(`The registration cache is properly scoped to an owner (${i +
      1}/2)`, async function(assert) {
      this.set('testComponentClass', TestComponent);
      await this.render(hbs`{{component (register this.testComponentClass)}}`);
      assert.dom().hasText('test');
    });
  }

  test('it returns the same string when passed a string', async function(assert) {
    assert.strictEqual(
      register(this.owner, 'my-component'),
      'my-component',
      'returns the same string when passed a string'
    );
  });
});
