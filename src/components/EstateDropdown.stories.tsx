import type { Meta, StoryObj } from '@storybook/react';

import EstateDropdown from './EstateDropdown';

const meta = {
  component: EstateDropdown,
} satisfies Meta<typeof EstateDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    estates: [{
      ID: "1",
      Estate_Name: 'estate1'
    }, {
      ID: "2",
      Estate_Name: 'estate2'
    }, {
      ID: "3",
      Estate_Name: 'estate3'
    }],
    onEstateSelect: () => {}
  }
};