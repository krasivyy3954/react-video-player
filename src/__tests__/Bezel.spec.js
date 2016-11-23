import React from 'react';
import { shallow, mount } from 'enzyme';
import { Player, Bezel } from '../';

describe('Bezel', () => {
  it('should not render bezel by default', () => {
    const wrapper = mount(
      <Player
        source="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      >
        <Bezel />
      </Player>
    );
    expect(wrapper.find('div.video-react-bezel').length).toBe(0);
  });
});
