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
    setInterval(blocksActions.intervalExpire, 5000);
    blocksStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    blocksStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var nodes = this.state.blocks.map(function(block) {
      var id = block.blockData.number;

      Math.seedrandom(id);
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
  },

  _onChange: function() {
    this.setState({
      blocks: blocksStore.get()
    });
  }
});

module.exports = Blocks;
