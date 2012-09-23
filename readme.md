# Backbone.Compute

Computed fields for Backbone.Models

## Downloads And Source

Grab the source from the `src` folder above. Grab the most recent builds
from the links below.

### Standard Builds

* Development: [backbone.marionette.js](https://raw.github.com/marionettejs/backbone.marionette/master/lib/backbone.marionette.js)

* Production: [backbone.marionette.min.js](https://raw.github.com/marionettejs/backbone.marionette/master/lib/backbone.marionette.min.js)

### RequireJS (AMD) Builds

* Development: [backbone.marionette.js](https://raw.github.com/marionettejs/backbone.marionette/master/lib/amd/backbone.marionette.js)

* Production: [backbone.marionette.min.js](https://raw.github.com/marionettejs/backbone.marionette/master/lib/amd/backbone.marionette.min.js)

## Basic Use

```js
var Model = Backbone.Model.extend({

  initialize: function(){
    // initialize all of the computed fields for this model
    Backbone.Compute(this);
  },

  // define a computed field.
  // tell it what field to `set` on the model
  // tell it what fields this one depends on
  // give it a callback function to compute the value when any dependent field changes
  computedField: Backbone.Compute("computedField", ["f1", "f2"], function(fields){
    fieldList = fields;
    return fields.f1 + "-" + fields.f2
  })

});

var model = new Model({
  f1: "foo",
  f2: "bar"
});

// get the current value
model.get("computedField"); // => "foo-bar"

// re-run the computation, `set` the current value and return it
model.computedField(); // => "foo-bar"


// Handle "change" events for the computed field
model.on("change:computedField", function(){
  // do stuff when the computed field changes
});

// `set` the fields that the computed field depends on
model.set({
  f1: "boo",
  f2: "far"
});

// get the updated value
model.get("computedField"); // => "boo-far"
model.computedField(); // => "boo-far"
```

## License

MIT license - see LICENSE.md
