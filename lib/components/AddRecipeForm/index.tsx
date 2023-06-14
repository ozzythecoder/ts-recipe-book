"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import clsx from "clsx";
import { Slider } from "@ui/slider";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import type { Recipe } from "@prisma/client";

interface FormData extends Omit<Recipe, "instructions"> {
  instructions: { step: string }[];
}

const inputClasses = "border-solid border-2 border-border p-2 rounded-md";
const inputErrorClasses = "border-red-500 focus:outline-red-500";

const ErrorMessage = ({ msg }: { msg: string | undefined }) => {
  return msg
    ? <span role="alert" className="text-red-500 text-sm">{msg}</span>
    : null
}

export default function AddRecipeForm() {
  const {
    register,
    handleSubmit,
    clearErrors,
    watch,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      rating: 3,
      instructions: [{ step: "" }],
    },
  });

  const { fields, append, remove, } = useFieldArray(
    {
      control,
      name: "instructions",
      rules: {
        required: "Please add at least one step to the instructions.",
        validate: {
          noEmptySteps: (self) => self.every(({step}) => step.length > 0) || "No instructions can be empty."
        }
      }
    }
  );

  console.log("errors:", errors)

  const [ratingDisplay, setRatingDisplay] = useState<number>(3);

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <h2 className="text-2xl text-center">Add Recipe</h2>
      <form
        className="flex flex-col justify-center items-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Recipe Title</Label>
          <Input
            className={clsx(inputClasses, errors.title && inputErrorClasses)}
            id="title"
            aria-invalid={!!errors.title}
            {...register("title", { required: "Required" })}
          />
          <ErrorMessage msg={errors.title?.message} />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="prep-time">Prep Time</Label>
          <Input
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
          />
          <ErrorMessage msg={errors.prepTime?.message} />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="cook-time">Cook Time</Label>
          <Input
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
          />
          <ErrorMessage msg={errors.cookTime?.message} />
        </div>

        <div className="flex flex-col mobile:flex-row w-full justify-center items-center gap-4">
          <Label htmlFor="rating">Rating</Label>
          <Slider
            {...register("rating")}
            id="rating"
            className="max-w-xs mobile:w-1/2 hover:cursor-pointer"
            defaultValue={[3]}
            min={1}
            max={5}
            step={1}
            onValueChange={([e]) => {
              setValue("rating", e);
              setRatingDisplay(e);
            }}
          />
          <span className="w-2">{ratingDisplay}</span>
        </div>

        {/* //TODO: Ingredient selection */}

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="instruction-input">Instructions</Label>
          <ol>

            {fields.map((field, index) => (
              <li className="list-item list-decimal" key={field.id}>
                <div className=" flex flex-row mb-2">
                  <Input
                    className={clsx(inputClasses, errors.instructions?.root?.message && inputErrorClasses)}
                  {...register(`instructions.${index}.step`)} />
                  <Button
                    type="button"
                    className="ml-2 bg-destructive text-xs"
                    aria-label={`remove step ${index} from instructions`}
                    onClick={() => remove(index)}
                  >
                    Delete step
                  </Button>
                </div>
              </li>
            ))}

          </ol>
          <Button
            className="mx-auto"
            aria-label="add-step-to-instructions"
            type="button"
            onClick={() => append({ step: "" })}
          >
            Add Step
          </Button>
          <ErrorMessage msg={errors.instructions?.root?.message} />
        </div>

        <Button type="submit">Submit Recipe</Button>
      </form>
    </>
  );
}
