import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxProps } from '@/components/Checkbox/Checkbox';
import Form from '@/components/Forms/Form';
import FormCheckbox from '@/components/Forms/FormCheckbox/FormCheckbox';

const meta = {
  title: '@/components/Form/FormCheckbox',
  component: FormCheckbox,
  tags: ['autodocs'],
} satisfies Meta<typeof FormCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormCheckboxTemplate: Omit<Story, 'args'> = {
  render: ({ id, label, options, ...rest }: CheckboxProps) => {
    return (
      <Form
        initialValues={{
          [id ?? '']: [],
        }}
        onSubmit={() => {}}
      >
        <FormCheckbox id={id} label={label} options={options} {...rest} />
      </Form>
    );
  },
};

export const DefaultFormCheckbox: Story = {
  ...FormCheckboxTemplate,
  name: 'Default',
  args: {
    id: 'Default',
    label: 'Default',
    options: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
      { label: 'Devops', value: 'devops' },
    ],
  },
};

export const singleSelectFormCheckbox: Story = {
  ...FormCheckboxTemplate,
  name: 'Single Select',
  args: {
    ...DefaultFormCheckbox.args,
    singleSelect: true,
  },
};
