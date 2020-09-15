ember-register-helper
==============================================================================

[![Build Status](https://travis-ci.org/mmun/ember-register-helper.svg?branch=main)](https://travis-ci.org/mmun/ember-register-helper)

This helper takes a component class as an argument, registers it with
the application using a generated name and returns this name. It is
intended to be used in conjunction with the `{{component}}` helper as in

    {{component (register myComponentClass)}}

This helper also takes care to memoize the result to avoid unnecessary
rerenders and to support environments that have multiple owners. This is
particularly relevant in testing because each test gets its own isolated
owner instance.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-register-helper
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
