import '../../spec_helper';
import React from 'react';
import { mount } from 'enzyme';

import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import SignUp from '../../../app/pages/users/sign_up';

jest.mock('../../../app/domain/services/user_session');

describe('<SignUp />', () => {
  let store;
  let signUpPage;

  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    signUpPage = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
  });

  describe('rendering', () => {
    it('renders the form', () => {
      expect(signUpPage.find('form')).toBeDefined();
    });

    it('renders the email input', () => {
      expect(signUpPage.find('Input').at(0).prop('name')).toEqual('name');
    });

    it('renders the email input', () => {
      expect(signUpPage.find('Input').at(1).prop('name')).toEqual('email');
    });

    it('renders the password input', () => {
      expect(signUpPage.find('Input').at(2).prop('name')).toEqual('password');
    });

    it('renders back link', () => {
      expect(signUpPage.find('Link').text()).toEqual('Back');
    });

    it('renders sign up button', () => {
      expect(signUpPage.find('button').text()).toEqual('Create account');
    });
  });

  describe('actions', () => {
    describe('#sign_up', () => {
      describe('when sign up with wrong information', () => {
        it('fails', () => {
          signUpPage.find('input').at(1).simulate('change', {
            target: { value: 'email1@example.com' }
          });

          signUpPage.find('input').at(1).simulate('change', {
            target: { value: 'email1@example.com' }
          });

          signUpPage.find('input').at(2).simulate('change', {
            target: { value: '12345' }
          });

          signUpPage.find('form').simulate('submit');

          expect(localStorage.getItem('current_user')).toBeNull();
        });
      });

      describe('when sign up succeeds', () => {
        it('succeeds', () => {
          signUpPage.find('input').at(0).simulate('change', {
            target: { value: 'User' }
          });

          signUpPage.find('input').at(1).simulate('change', {
            target: { value: 'email@example.com' }
          });

          signUpPage.find('input').at(2).simulate('change', {
            target: { value: '12345678' }
          });

          signUpPage.find('form').simulate('submit');

          expect(localStorage.getItem('current_user')).not.toBeNull();
        });
      });
    });
  });
});
