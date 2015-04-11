var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var constants = require('../constants/blocks_constants');
var dispatcher = require('../dispatcher/dispatcher');

var _blocks = {};

var BlocksStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(constants.CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(constants.CHANGE_EVENT, callback);
  },

  get: function() {
    var blocks = [];

    Object.keys(_blocks).forEach(function(id) {
      blocks.push(_blocks[id]);
    });

    return blocks;
  }
});


BlocksStore.dispatchToken = dispatcher.register(function(action) {
  switch(action.type) {
    case constants.ADD_BLOCKS:
      var blocks = action.data;

      blocks.forEach(function(block) {
        var id = block.blockData.number;

        if (!_blocks[id]) {
          _blocks[id] = block;
          BlocksStore.emitChange();
        }
      });
      break;

    default:
  }
});

module.exports = BlocksStore;
