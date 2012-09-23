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

});
