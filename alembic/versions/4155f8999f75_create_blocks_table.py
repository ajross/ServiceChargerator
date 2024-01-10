"""Create Blocks table

Revision ID: 4155f8999f75
Revises: 10a6f4f1b299
Create Date: 2024-01-03 16:12:28.838860

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4155f8999f75'
down_revision: Union[str, None] = '10a6f4f1b299'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


# Use the 'Blocks' table name
table_name = 'blocks'

def upgrade():
    op.create_table(
        table_name,
        sa.Column('ID', sa.Integer(), primary_key=True),
        sa.Column('Block_Name', sa.String(), nullable=False),
        sa.Column('Block_RV', sa.Integer(), nullable=False)
        # Add more columns as needed
    )

def downgrade():
    op.drop_table(table_name, if_exists=True)
