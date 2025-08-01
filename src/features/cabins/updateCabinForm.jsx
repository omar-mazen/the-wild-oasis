import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import useUpdateCabin from "./useUpdateCabin";
import Modal from "../../ui/Modal";

function UpdateCabinForm({ cabin, onClose }) {
  const { isUpdating, updateCabin } = useUpdateCabin();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: cabin });

  function onSubmit(data) {
    const img = typeof data.image === "string" ? data.image : data.image[0];
    updateCabin(
      {
        ...data,
        id: Number(data.id),
        image: img,
      },
      {
        onSuccess: () => {
          reset();
          onClose;
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={Modal}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isUpdating}
          {...register("name", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "price cannot be 0",
            },
          })}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={onClose}
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>update cabin</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateCabinForm;
