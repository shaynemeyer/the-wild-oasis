import { useForm } from 'react-hook-form';

import { useCountries } from '../../hooks/useCountries';
import { useCreateGuest } from './useCreateGuest';
// import Spinner from '../../ui/Spinner';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Button from '../../ui/Button';
import styled from 'styled-components';
import { CountryCode } from '../../data/countryCodes';
import { guestItem } from '../../types/guests';

const FormSelect = styled(Select)`
  width: 100%;
`;

interface CreateGuestFormProps {
  onSuccessNewGuest?: (guest: guestItem) => void;
  closeModal?: () => void;
}

function CreateGuestForm({ onSuccessNewGuest, closeModal }: CreateGuestFormProps) {
  const { countries } = useCountries();
  const { isCreatingGuest, createGuest } = useCreateGuest()!;

  const { register, handleSubmit, formState } = useForm<guestItem>();
  const { errors } = formState;

  // if (isLoadingCountries) return <Spinner />;

  const countryOptions = countries.map((country: CountryCode) => {
    return {
      value: country.code,
      label: country.label,
    };
  });

  const onSubmit = function (data: guestItem) {
    const countryCode = countries.find(
      (country) => country.label === data.nationality
    );
    const countryFlag = countryCode ? `https://flagcdn.com/${countryCode}.svg` : undefined;

    createGuest(
      { ...data, countryFlag },
      {
        // In the mutate function, we can ALSO use the onSuccess handler, just like in useMutation. Both will get called. This one also gets access to the returned value of the mutation (new guest in this case)
        // This is how we can get access to the newly created object. Here we set it into state, because we want to display it in the UI
        onSuccess: (data) => {
          // We might want to reuse this form in another place, and then onSuccessNewGuest will not exist
          onSuccessNewGuest?.(data);

          // If this component is used OUTSIDE the Modal Context, this will return undefined, so we need to test for this. Instead of if
          closeModal?.();
        },
      }
    );
  };

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message as string}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreatingGuest}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message as string}>
        <Input
          type="email"
          id="email"
          disabled={isCreatingGuest}
          {...register('email', {
            required: 'Email address is required',
            pattern: {
              // google: email regex JavaScript
              value: /\S+@\S+\.\S+/,
              message: 'Please specify a valid email',
            },
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message as string}>
        <FormSelect
          id="nationality"
          disabled={isCreatingGuest}
          options={[
            { value: '', label: 'Select nationality...' },
            ...countryOptions,
          ]}
          {...register('nationality', { required: 'This field is required' })}
        ></FormSelect>
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message as string}>
        <Input
          type="text"
          disabled={isCreatingGuest}
          id="nationalID"
          {...register('nationalID', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          disabled={isCreatingGuest}
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreatingGuest}>Add new guest</Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
