"use client";

import { useRef } from "react";
import styles from "./image-picker.module.css";

interface Props {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  function handlePickClick() {
    imageInputRef.current?.click();
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <input
          className={styles.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInputRef}
        />
        <button
          className={styles.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
