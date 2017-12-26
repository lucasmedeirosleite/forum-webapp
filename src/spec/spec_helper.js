import requestAnimationFrame from './support/temp_polyfills';
import LocalStorageMock from './support/local_storage_mock';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import dotenv from 'dotenv';
dotenv.config();

global.localStorage = new LocalStorageMock();

configure({ adapter: new Adapter(), disableLifecycleMethods: true });
