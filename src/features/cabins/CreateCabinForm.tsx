import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useCreatingCabin } from './useCreatingCabin';
import { useEditingCabin } from './useEditingCabin';

interface FormData extends Omit<cabinItem, 'id' | 'created_at' | 'image'> {
  image: FileList | string;
}

interface CreateCabinFormProps {
  cabinToEdit?: cabinItem;
  closeModal?: () => void;
}

function CreateCabinForm({ cabinToEdit, closeModal }: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FormData>({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreatingCabin();
  const { isEditing, editCabin } = useEditingCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data: FormData) {
    console.log({ data });
    console.log(typeof data.image);
    const imageData =
      typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: imageData },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
          },
        }
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              (value && value <= getValues().regularPrice!) ||
              'Discount should be less than the regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button $variation="secondary" type="reset" disabled={isWorking}>
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? 'Edit cabin' : 'Create new cabin'}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
