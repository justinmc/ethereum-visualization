var dispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/blocks_constants');

module.exports = {

  intervalExpire: function() {
    var oReq = new XMLHttpRequest();
    oReq.open('get', 'http://api.blockapps.net/query/block/last/100', true);
    oReq.send();

    oReq.onreadystatechange = function() {
      if (oReq.readyState == 4 && oReq.status == 200) {
        var blocks = JSON.parse(oReq.responseText);
        
        dispatcher.dispatch({
          type: constants.ADD_BLOCKS,
          data: blocks
        });
      }
    };
  }

};
