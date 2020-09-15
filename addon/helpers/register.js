import { getOwner } from '@ember/application';
import Helper from '@ember/component/helper';
import { guidFor } from '@ember/object/internals';

// This property has type WeakMap<Owner, WeakMap<ComponentClass, string>>.
let nameMaps = new WeakMap();

function generateName(componentClass) {
  return `ember-register-helper-${guidFor(componentClass)}`;
}

/**
 *  This helper takes a component class as an argument, registers it with
 *  the application using a generated name and returns this name. It is
 *  intended to be used in conjunction with the {{component}} helper as in
 *
 *      {{component (register myClass)}}
 *
 *  This helper also takes care to memoize the result to avoid unnecessary
 *  rerenders and to support environments that have multiple owners. This is
 *  particularly relevant in testing because each test gets its own isolated
 *  owner instance.
 *
 *  The purpose of this helper is to ease the transition from the {{view}}
 *  helper, which supports directly rendering classes, to the {{component}}
 *  helper, which does not directly support rendering classes.
 */
export default Helper.extend({
  compute([componentClass]) {
    let owner = getOwner(this);
    return register(owner, componentClass);
  },
});

export function register(owner, componentClass) {
  if (!componentClass) {
    return null;
  } else if (typeof componentClass === 'string') {
    return componentClass;
  } else {
    let names = nameMaps.get(owner);
    if (names === undefined) {
      names = new WeakMap();
      nameMaps.set(owner, names);
    }

    let name = names.get(componentClass);
    if (name === undefined) {
      name = generateName(componentClass);
      names.set(componentClass, name);
      owner.register(`component:${name}`, componentClass);
    }

    return name;
  }
}
