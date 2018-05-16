import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Settings from './Settings';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let handleChange;
beforeEach(() => {
  handleChange = jest.fn();
  wrapper = shallow(<Settings onChange={handleChange} />);
});

it('should render header element', () => {
  expect(wrapper.find('.input-header').length).toEqual(1);
});

const testInputProps = (name) => {
  const inputWrapper = wrapper.find(`input#${name}`);
  expect(inputWrapper.length).toEqual(1);
  expect(inputWrapper.prop('type')).toEqual('number');
  expect(inputWrapper.prop('name')).toEqual(name);  
};
const describeInput = (name) => {
  it('`<input>` element should be rendered with expected props', () => testInputProps(name));
  it('should have a corresponding `<label>` element', () => {
    const labelWrapper = wrapper.find(`label[htmlFor="${name}"]`);
    expect(labelWrapper.length).toEqual(1);
  });
}
describe('world-height input', () => describeInput('world-height'));
describe('world-width input', () => describeInput('world-width'));

describe('when the value of the world height input is changed to 6', () => {
  it('should call props.onChange with "world-height" and "6"', () => {
    wrapper.find('input#world-height').simulate('change', { target: { name: 'world-height', value: '6' } })
    expect(handleChange).toHaveBeenCalledWith('world-height', '6');
  });
});

describe('when the value of the world width input is changed to 6', () => {
  it('should call props.onChange with "world-width" and "6"', () => {
    wrapper.find('input#world-width').simulate('change', { target: { name: 'world-width', value: '6' } })
    expect(handleChange).toHaveBeenCalledWith('world-width', '6');
  });
});
