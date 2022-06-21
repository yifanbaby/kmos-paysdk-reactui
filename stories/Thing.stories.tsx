import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Modal } from '../src';
import type { ModalProps } from '../src/components/modal';

const meta: Meta<ModalProps> = {
  title: 'Welcome',
  component: Modal,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ModalProps> = (props) => <Modal {...props} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  visible: false,
  mode: 'bottom',
  mask: true,
};
