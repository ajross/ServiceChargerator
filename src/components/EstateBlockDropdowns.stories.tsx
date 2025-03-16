import type { Meta, StoryObj } from '@storybook/react';

import EstateBlockDropdowns from './EstateBlockDropdowns';

const meta = {
  component: EstateBlockDropdowns,
} satisfies Meta<typeof EstateBlockDropdowns>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    borough: 'exampleBorough'
  }
};