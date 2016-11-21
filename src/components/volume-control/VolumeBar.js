import React, { Component, PropTypes } from 'react';
import Slider from '../Slider';
import VolumeLevel from './VolumeLevel';

const propTypes = {
  actions: PropTypes.object,
  player: PropTypes.object,
};

class VolumeBar extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      percentage: '0%',
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handlePercentageChange = this.handlePercentageChange.bind(this);
    this.checkMuted = this.checkMuted.bind(this);
    this.getPercent = this.getPercent.bind(this);
    this.stepForward = this.stepForward.bind(this);
    this.stepBack = this.stepBack.bind(this);
  }

  componentDidMount() {
  }

  getPercent() {
    const { player } = this.props;
    if (player.muted) {
      return 0;
    }
    return player.volume;
  }

  checkMuted() {
    const { player, actions } = this.props;
    if (player.muted) {
      actions.toggleMuted(false);
    }
  }

  handleMouseMove(event) {
    const { actions } = this.props;
    this.checkMuted();
    const distance = this.slider.calculateDistance(event);
    actions.changeVolume(distance);
  }

  stepForward() {
    const { player, actions } = this.props;
    this.checkMuted();
    actions.changeVolume(player.volume + 0.1);
  }

  stepBack() {
    const { player, actions } = this.props;
    this.checkMuted();
    actions.changeVolume(player.volume - 0.1);
  }

  handlePercentageChange(percentage) {
    if (percentage !== this.state.percentage) {
      this.setState({
        percentage,
      });
    }
  }

  render() {
    const { player } = this.props;

    const volume = (player.volume * 100).toFixed(2);
    return (
      <Slider
        ref={(c) => {
          this.slider = c;
        }}
        label="volume level"
        valuenow={volume}
        valuetext={`${volume}%`}
        onMouseMove={this.handleMouseMove}
        getPercent={this.getPercent}
        onPercentageChange={this.handlePercentageChange}
        className="video-react-volume-bar video-react-slider-bar"
        {...this.props}
      >
        <VolumeLevel
          {...this.props}
        />
      </Slider>
    );
  }
}

VolumeBar.propTypes = propTypes;

export default VolumeBar;
