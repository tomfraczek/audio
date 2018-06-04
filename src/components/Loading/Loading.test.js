import React from 'react';
import Loading from './Loading';
import renderer from 'react-test-renderer';

test('Has loading thing', () => {
  const component = renderer.create(
    <Loading text="Works" />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
