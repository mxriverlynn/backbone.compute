Backbone.Compute = (function(Backbone, _){

  function initializeModel(obj){
    for(var field in obj){
      if (obj[field] && obj[field].computedField){
        obj[field].call(obj);
      }
    }
  }

  function computeField(fieldName, fieldList, callback){
    fieldList = _.flatten([fieldList]);
    var length = fieldList.length;

    var fireCallback = function(){
      var fields = {};

      for (var i = 0; i<length; i++){
        var field = fieldList[i];
        fields[field] = this.get(field);
      }

      var value = callback.call(this, fields);
      this.set(fieldName, value);

      return value;
    }

    var computedFunc = function(){
      var cb = _.bind(fireCallback, this);

      for (var i = 0; i<length; i++){
        var field = fieldList[i];
        this.on("change:" + field, cb);
      }

      return cb();
    }

    computedFunc.computedField = true;

    return computedFunc;
  };

  var Compute = function(){
    if (arguments.length === 1){
      return initializeModel(arguments[0]);
    } else {
      return computeField.apply(null, arguments);
    }
  };

  return Compute;
})(Backbone, _);
