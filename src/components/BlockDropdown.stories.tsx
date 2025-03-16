import type { Meta, StoryObj } from '@storybook/react';

import BlockDropdown from './BlockDropdown';

const meta = {
  component: BlockDropdown,
} satisfies Meta<typeof BlockDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

type Block = {
  ID: string;
  Block_Name: string;
};

export const Default: Story = {
  args: {
    blocks: [
      { ID: "1", Block_Name: "block1" },
      { ID: "2", Block_Name: "block2" },
      { ID: "3", Block_Name: "block3" }
    ] as Block[],
    onBlockSelect: (id: string) => {
      console.log(`Block selected: ${id}`);
    }
  }
};