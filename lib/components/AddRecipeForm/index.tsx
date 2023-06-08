"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { Slider } from "@ui/slider";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import Button from "@ui/Button";
import type { Recipe } from "@prisma/client";

interface Props {}

interface FormData extends Recipe {}

const inputClasses =
  "border-solid border-2 border-border p-2 rounded-md";
const inputErrorClasses = "border-red-500 focus:outline-red-500";

export default function AddRecipeForm({}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      cookTime: null,
      prepTime: null,
      rating: 3,
    },
  });

  const [ ratingDisplay, setRatingDisplay ] = useState<number>(3)

  const onSubmit = (data: any) => console.log(data);


  return (
    <>
      <h2 className="text-2xl text-center">Add Recipe</h2>
      <form
        className="flex flex-col justify-center items-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Recipe Name</Label>
          <Input
            className={clsx(inputClasses, errors.title && inputErrorClasses)}
            id="title"
            aria-invalid={!!errors.title}
            {...register("title", { required: "Required" })}
          />
          {errors.title?.message && (
            <span role="alert" className="text-red-500">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="flex flex-row w-3/4 justify-evenly gap-4">
          <div className="grid w-1/2 mobile:w-1/3 max-w-sm items-center gap-1.5">
            <Label htmlFor="prep-time">Prep Time</Label>
            <Input
              type="number"
              id="prep-time"
              aria-invalid={!!errors.prepTime}
              className={clsx(
                inputClasses,
                errors.prepTime && inputErrorClasses,
                'max-w-[4rem]'
              )}
              {...register("prepTime", {
                required: "Required",
                maxLength: {
                  value: 3,
                  message: "Cook time must be 3 digits or less",
                },
              })}
            />
            {errors.prepTime?.message && (
              <span role="alert" className="text-red-500">
                {errors.prepTime.message}
              </span>
            )}
          </div>

          <div className="grid w-1/2 mobile:w-1/3 max-w-sm items-center gap-1.5">
            <Label htmlFor="cook-time">Cook Time</Label>
            <Input
              type="number"
              id="cook-time"
              aria-invalid={!!errors.cookTime}
              className={clsx(
                inputClasses,
                errors.cookTime && inputErrorClasses,
                'max-w-[4rem]'
              )}
              {...register("cookTime", {
                required: "Required",
                maxLength: {
                  value: 3,
                  message: "Cook time must be 3 digits or less",
                },
              })}
            />
            {errors.cookTime?.message && (
              <span role="alert" className="text-red-500">
                {errors.cookTime.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col mobile:flex-row w-full justify-center items-center gap-4">
          <Label htmlFor="rating">Rating</Label>
          <Slider
            {...register("rating")}
            id="rating"
            className="w-full mobile:w-1/2 hover:cursor-pointer"
            defaultValue={[3]}
            min={1}
            max={5}
            step={1}
            onValueChange={([e]) => {
              setValue("rating", e);
              setRatingDisplay(e);
            }}
          />
          <span className="w-2">
          {ratingDisplay}
          </span>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
