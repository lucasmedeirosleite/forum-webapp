import '../spec_helper';
import React from 'react';
import { mount } from 'enzyme';
import CentralizedContainer from '../../app/components/centralized_container';

describe('CentralizedContainer', () => {
  let container = mount(
    <CentralizedContainer title="My title" description="My description">
    </CentralizedContainer>
  );

  it('renders the title', () => {
    expect(container.find('h3').text()).toEqual('My title');
  });

  it('renders the description', () => {
    expect(container.find('p.widget-login-info').text()).toEqual('My description');
  });

  describe('with no content', () => {
    expect(container.find('.children-content').text()).toEqual('');
  });

  describe('with content', () => {
    let container = mount(
      <CentralizedContainer>
        My content
      </CentralizedContainer>
    );

    it('renders the component children', () => {
      expect(container.find('.children-content').text()).toEqual('My content');
    });
  });
})
