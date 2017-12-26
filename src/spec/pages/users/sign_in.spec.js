import '../../spec_helper';
import React from 'react';
import { mount } from 'enzyme';

import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import SignIn from '../../../app/pages/users/sign_in';

jest.mock('../../../app/domain/services/user_session');

describe('<SignIn />', () => {
  let store;
  let signInPage;

  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    signInPage = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
  });

  describe('rendering', () => {
    it('renders the form', () => {
      expect(signInPage.find('form')).toBeDefined();
    });

    it('renders the email input', () => {
      expect(signInPage.find('Input').at(0).prop('name')).toEqual('email');
    });

    it('renders the password input', () => {
      expect(signInPage.find('Input').at(1).prop('name')).toEqual('password');
    });

    it('renders sign up link', () => {
      expect(signInPage.find('Link').text()).toEqual('Sign up');
    });

    it('renders sign in button', () => {
      expect(signInPage.find('button').text()).toEqual('Sign in');
    });
  });

  describe('actions', () => {
    describe('#sign_in', () => {
      describe('when sign in with wrong information', () => {
        it('fails', () => {
          signInPage.find('input').at(0).simulate('change', {
            target: { value: 'email1@example.com' }
          });

          signInPage.find('input').at(1).simulate('change', {
            target: { value: '12345' }
          });

          signInPage.find('form').simulate('submit');

          expect(localStorage.getItem('current_user')).toBeNull();
        });
      });

      describe('when sign in succeeds', () => {
        it('succeeds', () => {
          signInPage.find('input').at(0).simulate('change', {
            target: { value: 'email@example.com' }
          });

          signInPage.find('input').at(1).simulate('change', {
            target: { value: '12345678' }
          });

          signInPage.find('form').simulate('submit');

          expect(localStorage.getItem('current_user')).not.toBeNull();
        });
      });
    });
  });
});
