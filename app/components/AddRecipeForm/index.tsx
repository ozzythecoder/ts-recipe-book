"use client";

import { useState } from "react";
import Button from "@ui/Button";
import Input from "@ui/Input";

import styles from "./style.module.css";

interface Props extends React.PropsWithChildren {
  url: string;
}

export default function AddRecipeForm({ url, children }: Props) {
  const [titleIn, setTitle] = useState<string>("");
  const [ratingIn, setRating] = useState<number>(0);
  const [prepTimeIn, setPrepTime] = useState<number>(0);
  const [cookTimeIn, setCookTime] = useState<number>(0);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await fetch(url, {
      body: JSON.stringify({
        title: titleIn,
        rating: ratingIn,
        prepTime: prepTimeIn,
        cookTime: cookTimeIn,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  };

  return (
    <form className={styles.flexContainer} onSubmit={handleSubmit}>
      <label htmlFor="">
        Title
        <Input
          className={styles.formItem}
          type="text"
          value={titleIn}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label htmlFor="">
        Rating
        <Input
          className={styles.formItem}
          type="number"
          min={0}
          max={5}
          value={ratingIn}
          onChange={(e) => setRating(parseInt(e.target.value))}
        />
      </label>
      <label htmlFor="">
        Prep Time
        <Input
          className={styles.formItem}
          type="number"
          value={prepTimeIn}
          onChange={(e) => setPrepTime(parseInt(e.target.value))}
        />
      </label>
      <label htmlFor="">
        Cook Time
        <Input
          className={styles.formItem}
          type="number"
          value={cookTimeIn}
          onChange={(e) => setCookTime(parseInt(e.target.value))}
        />
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
}
