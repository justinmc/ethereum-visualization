var React = require('react');
require('seedrandom');

var Blocks = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
    this.fetchBlocks();
    setInterval(this.fetchBlocks, 5000);
  },

  fetchBlocks: function() {
    var oReq = new XMLHttpRequest();
    oReq.open('get', 'http://api.blockapps.net/query/block/last/100', true);
    oReq.send();

    oReq.onreadystatechange = function() {
      if (oReq.readyState == 4 && oReq.status == 200) {
        var blocks = JSON.parse(oReq.responseText);
        
        blocks.forEach(function(block) {
          var id = block.blockData.number;

          if (!this.state[id]) {
            console.log('adding new dude', Object.keys(this.state).length);
            var stateUpdate = {};
            stateUpdate[block.blockData.number] = block;
            this.setState(stateUpdate);
          }
        }.bind(this));
      }
    }.bind(this);
  },

  render: function() {
    var nodes = Object.keys(this.state).map(function(id) {
      var block = this.state[id];
      Math.seedrandom(block.blockData.number)
      var x = Math.random() * 100;
      var y = Math.random() * 100;

      return (
        <circle className="block" fill="tomato" cx={x} cy={y} r="1" key={id} />
      );
    }.bind(this));

    return (
      <g>
        {nodes}
      </g>
    );
  }
});

module.exports = Blocks;
