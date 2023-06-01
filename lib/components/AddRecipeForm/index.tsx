"use client";
import { useForm } from "react-hook-form";
import Input from "@ui/Input";
import Button from "@ui/Button";

interface Props {}

export default function AddRecipeForm({}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  //TODO Learn React Hook Form
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      <Input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <Button type="submit" onClick={e => e.preventDefault()}>Submit</Button>
    </form>
  );
}
