"use client";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Input from "@ui/Input";
import { Slider } from "@ui/slider";
import Button from "@ui/Button";
import type { Recipe } from "@prisma/client";

interface Props {}

interface FormData extends Recipe {}

const inputClasses = "border-solid border-2 p-2 rounded-md w-full mobile:w-3/5";
const inputErrorClasses = "border-red-500 focus:outline-red-500";

export default function AddRecipeForm({}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      cookTime: null,
      prepTime: null,
    },
  });

  const onSubmit = (data: any) => console.log(data);

  //TODO Learn React Hook Form

  return (
    <>
      <form
        className="flex flex-col items-center gap-4 outline outline-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className={clsx(inputClasses, errors.title && inputErrorClasses)}
          id="title"
          aria-invalid={!!errors.title}
          {...register("title", { required: "Required" })}
          placeholder="Recipe Name"
        />
        {errors.title?.message && (
          <span role="alert" className="text-red-500">{errors.title.message}</span>
        )}

        <input
          type="number"
          id="prep-time"
          aria-invalid={!!errors.prepTime}
          className={clsx(inputClasses, errors.prepTime && inputErrorClasses)}
          {...register("prepTime", {
            required: "Required",
            maxLength: {
              value: 3,
              message: "Cook time must be 3 digits or less",
            },
          })}
          placeholder="Prep Time"
        />
        {errors.prepTime?.message && (
          <span role="alert" className="text-red-500">{errors.prepTime.message}</span>
        )}

        <input
          type="number"
          id="cook-time"
          aria-invalid={!!errors.cookTime}
          className={clsx(inputClasses, errors.cookTime && inputErrorClasses)}
          {...register("cookTime", {
            required: "Required",
            maxLength: {
              value: 3,
              message: "Cook time must be 3 digits or less",
            },
          })}
          placeholder="Cook Time"
        />
        {errors.cookTime?.message && (
          <span role="alert" className="text-red-500">{errors.cookTime.message}</span>
        )}

        <Slider />

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
