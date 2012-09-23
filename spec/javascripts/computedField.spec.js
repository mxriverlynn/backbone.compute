describe("computed fields", function(){

  describe("when computation is done for a single field", function(){
    var model, fieldList;

    var Model = Backbone.Model.extend({
      initialize: function(){
        Backbone.Compute(this);
      },

      computedField: Backbone.Compute("computedField", "anotherField", function(fields){
        fieldList = fields;
        return fields.anotherField + "-bar"
      })
    });

    beforeEach(function(){
      model = new Model({
        anotherField: "foo"
      });
    });

    it("should provide the specified field in the computation function", function(){
      expect(fieldList).toHaveOwnProperty("anotherField");
    });

    it("should `set` the computed field on the model to the returned value", function(){
      expect(model.get("computedField")).toEqual("foo-bar");
    });
  });

  describe("when computation is done for an array of fields", function(){
    var model, fieldList;

    var Model = Backbone.Model.extend({
      initialize: function(){
        Backbone.Compute(this);
      },

      computedField: Backbone.Compute("computedField", ["f1", "f2"], function(fields){
        fieldList = fields;
        return fields.f1 + "-" + fields.f2
      })
    });

    beforeEach(function(){
      model = new Model({
        f1: "foo",
        f2: "bar"
      });
    });

    it("should provide the specified field in the computation function", function(){
      expect(fieldList).toHaveOwnProperty("f1");
      expect(fieldList).toHaveOwnProperty("f2");
    });

    it("should `set` the computed field on the model to the returned value", function(){
      expect(model.get("computedField")).toEqual("foo-bar");
    });
  });

  describe("when calling the computed field attribute as a method", function(){
    var result;

    var Model = Backbone.Model.extend({
      initialize: function(){
        Backbone.Compute(this);
      },

      computedField: Backbone.Compute("computedField", ["f1", "f2"], function(fields){
        fieldList = fields;
        return fields.f1 + "-" + fields.f2
      })
    });

    beforeEach(function(){
      var model = new Model({
        f1: "foo",
        f2: "bar"
      });
      
      result = model.computedField();
    });

    it("return the computed value for the current values of the dependent attributes", function(){
      expect(result).toEqual("foo-bar");
    });
  });

  describe("when updating a field that is dependend upon by a computed field", function(){
    var handler;

    var Model = Backbone.Model.extend({
      initialize: function(){
        Backbone.Compute(this);
      },

      computedField: Backbone.Compute("computedField", ["f1", "f2"], function(fields){
        fieldList = fields;
        return fields.f1 + "-" + fields.f2
      })
    });

    beforeEach(function(){
      model = new Model({
        f1: "foo",
        f2: "bar"
      });

      handler = jasmine.createSpy("change handler");
      model.on("change:computedField", handler);
      
      model.set({
        f1: "boo"
      });
    });

    it("should `set` the computed field", function(){
      expect(model.get("computedField")).toEqual("boo-bar");
    });

    it("should trigger a `change` event for the computed field", function(){
      expect(handler).toHaveBeenCalled();
    });

  });

  describe("when updating multiple fields that are dependend upon by a computed field", function(){
    var handler;

    beforeEach(function(){
      handler = jasmine.createSpy("computed field func");

      var Model = Backbone.Model.extend({
        initialize: function(){
          Backbone.Compute(this);
        },

        computedField: Backbone.Compute("computedField", ["f1", "f2"], handler)
      });

      model = new Model({
        f1: "foo",
        f2: "bar"
      });

      model.set({
        f1: "boo",
        f2: "far"
      });
    });

    it("should call the computed field function once for the model initializer and once for setting all of the fields", function(){
      expect(handler.callCount).toBe(2);
    });

  });

});
