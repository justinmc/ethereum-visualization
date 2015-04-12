require('seedrandom');
var React = require('react');
var blocksStore = require('../stores/blocks_store');
var blocksActions = require('../actions/blocks_actions');

var Blocks = React.createClass({
  getInitialState: function() {
    return {
      blocks: blocksStore.get()
    };
  },

  componentDidMount: function() {
    setInterval(blocksActions.intervalExpire, 10000);
    blocksStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    blocksStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var nodes = this.state.blocks.map(function(block) {
      var id = block.blockData.number;
      var r = 1;

      Math.seedrandom(id);
      var x = r / 2 + Math.random() * (100 - r);
      var y = r / 2 + Math.random() * (100 - r);

      return (
        <circle className="block" fill="tomato" cx={x} cy={y} r="1" key={id} />
      );
    }.bind(this));

    var loader;
    if (!nodes.length) {
      loader = (
        <circle className="loader" fill="rgb(71, 99, 255)" cx="50" cy="50" r="2" />
      );
    }

    return (
      <g>
        <g>
          {nodes}
        </g>
        {loader}
      </g>
    );
  },

  _onChange: function() {
    this.setState({
      blocks: blocksStore.get()
    });
  }
});

module.exports = Blocks;
