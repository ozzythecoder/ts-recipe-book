// TODO:
// * submission logic
// * confirm validation
// * icons & aria labels
// * finalize responsive layout

"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import clsx from "clsx";

import { Slider } from "@ui/slider";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@ui/command";

import type { Ingredient, Recipe } from "@prisma/client";

import { Trash } from "lucide-react";
import { Textarea } from "@ui/textarea";

// FORM SHAPE
export interface FormData extends Omit<Recipe, "instructions"> {
  instructions: { step: string }[];
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
}

// DEFAULT CLASSES
const inputClasses = "border-solid border-2 border-border p-2 rounded-md";
const inputErrorClasses = "border-red-500 focus:outline-red-500";

// ERROR COMPONENT
const ErrorMessage = ({ msg }: { msg: string | undefined }) => {
  return msg ? (
    <span role="alert" className="text-red-500 text-sm">
      {msg}
    </span>
  ) : null;
};

interface Props extends React.PropsWithChildren {
  initIngredients: Ingredient[];
}

export default function AddRecipeForm({ initIngredients }: Props) {
  // FORM CONFIGURATION
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
      ingredients: [],
    },
  });

  // INSTRUCTION FIELD CONFIGURATION
  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
    rules: {
      required: "Please add at least one step to the instructions.",
      validate: {
        noEmptySteps: (self) => self.every(({ step }) => step.length > 0) || "No instructions can be empty.",
      },
    },
  });

  // INGREDIENT FIELD CONFIGURATION
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
    rules: {
      required: "Please add at least one ingredient.",
      validate: {
        noEmptyFields: (self) => {
          return self.every((ingredient) => ingredient.name && ingredient.amount && ingredient.unit);
        },
      },
    },
  });

  console.log("errors:", errors);

  // LOCAL STATE VARIABLES
  const [ratingDisplay, setRatingDisplay] = useState<number>(3);
  const [comboboxOpen, setComboboxOpen] = useState<boolean>(false);
  const [searchValueIn, setSearchValue] = useState<string>("");

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <h2 className="text-2xl text-center">Add Recipe</h2>
      <form className="flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit(onSubmit)}>

        {/* TITLE */}
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

        {/* PREP TIME */}
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

        {/* COOK TIME */}
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

        {/* RATING */}
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

        {/* 
          INGREDIENTS
        */}
        <div className="w-full max-w-sm">
          <Label htmlFor="ingredients">Ingredients</Label>
          {/* INGREDIENT LIST */}
          <div className="grid items-center gap-1.5">
            <ol>
              {ingredientFields.map((field, index) => (
                <li key={field.id}>
                  <div className="flex flex-row gap-2">
                    <Label className="invisible absolute" htmlFor={`ingredient-${index}-amount`}>
                      Ingredient {index} Amount
                    </Label>
                    <Input
                      id={`ingredient-${index}-amount`}
                      className={clsx(inputClasses, errors.ingredients?.root?.message && inputErrorClasses, "flex-[0.5]")}
                      placeholder="Amt"
                      type="number"
                      {...register(`ingredients.${index}.amount`)}
                    />
                    <Label className="invisible absolute" htmlFor={`ingredient-${index}-unit`}>
                      Ingredient {index} Unit
                    </Label>
                    <Input
                      id={`ingredient-${index}-unit`}
                      className={clsx(inputClasses, errors.ingredients?.root?.message && inputErrorClasses, "flex-1")}
                      placeholder="Unit"
                      {...register(`ingredients.${index}.unit`)}
                    />
                    <Label className="invisible absolute" htmlFor={`ingredient-${index}-name`}>
                      Ingredient {index} Name
                    </Label>
                    <Input
                      id={`ingredient-${index}-name`}
                      className={clsx(inputClasses, errors.instructions?.root?.message && inputErrorClasses, "flex-[3]")}
                      placeholder="Ingredient"
                      {...register(`ingredients.${index}.name`)}
                    />
                    <Button type="button" className="rounded-full text-xs bg-destructive" onClick={() => removeIngredient(index)}>
                      <Trash size={14} />
                    </Button>
                  </div>
                </li>
              ))}
            </ol>

            {/* INGREDIENT SEARCH & ADDITION */}
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full text-xs" type="button">
                  Add ingredient
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="Search ingredients..." onValueChange={(search) => setSearchValue(search)} />
                  <CommandList>
                    <CommandEmpty className="my-2 text-center">
                      {searchValueIn !== "" && (
                        <Button
                          variant="outline"
                          className="my-0 mx-auto"
                          type="button"
                          onClick={() => {
                            appendIngredient({
                              name: searchValueIn,
                              // @ts-ignore
                              amount: null,
                              unit: "",
                            });
                          }}
                        >
                          Create {searchValueIn}?
                        </Button>
                      )}
                    </CommandEmpty>
                    {initIngredients.map((ingredient) => (
                      <CommandItem
                        key={ingredient.id}
                        onSelect={(selection) => {
                          appendIngredient({
                            name: selection,
                            // @ts-ignore
                            amount: null,
                            unit: "",
                          });
                        }}
                      >
                        {ingredient.name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <ErrorMessage msg={errors.ingredients?.root?.message} />
          </div>
        </div>

        {/*
          INSTRUCTIONS
        */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="instruction-input">Instructions</Label>
          <ol>
            {instructionFields.map((field, index, array) => (
              <li className="list-item list-decimal list-inside mobile:list-outside" key={field.id}>
                <div className={"flex flex-row mb-2"}>
                  <Label className="invisible absolute" htmlFor={`instruction-${index}`}>
                    Step {index}
                  </Label>
                  <Textarea
                    id={`instruction-${index}`}
                    className={clsx(inputClasses, errors.instructions?.root?.message && inputErrorClasses, "resize-none")}
                    {...register(`instructions.${index}.step`)}
                  />
                  <Button
                    type="button"
                    className="ml-2 bg-destructive text-xs rounded-full"
                    aria-label={`remove step number ${index} from instructions`}
                    onClick={() => removeInstruction(index)}
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              </li>
            ))}
          </ol>
          <Button
            className="rounded-full text-xs mx-auto w-full -mt-2"
            variant="outline"
            aria-label="add step to instructions"
            type="button"
            onClick={() => appendInstruction({ step: "" })}
          >
            Add step
          </Button>
          <ErrorMessage msg={errors.instructions?.root?.message} />
        </div>

        <Button type="submit">Submit Recipe</Button>
      </form>
    </>
  );
}
