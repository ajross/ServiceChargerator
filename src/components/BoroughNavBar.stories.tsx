import type { Meta, StoryObj } from '@storybook/react';

import BoroughNavBar from './BoroughNavBar';

const meta = {
  component: BoroughNavBar,
} satisfies Meta<typeof BoroughNavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    borough: "lambeth"
  }
};