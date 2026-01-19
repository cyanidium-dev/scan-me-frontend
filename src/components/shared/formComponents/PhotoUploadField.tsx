"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import CameraPlusIcon from "../icons/CameraPlusIcon";
import CrossIcon from "../icons/CrossIcon";

interface PhotoUploadFieldProps {
  fieldName: string;
  label?: string;
  className?: string;
}

export default function PhotoUploadField({ fieldName, label, className }: PhotoUploadFieldProps) {
  const { setFieldValue, setFieldTouched, values, errors, touched } = useFormikContext<any>();
  const t = useTranslations();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const hasError = !!(touched[fieldName] && errors[fieldName]);

  // Оновлюємо preview при зміні значення
  useEffect(() => {
    if (values[fieldName] instanceof File) {
      const objectUrl = URL.createObjectURL(values[fieldName]);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [values[fieldName]]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Перевірка типу файлу
      if (!file.type.startsWith("image/")) {
        setFieldValue(fieldName, null);
        setPreview(null);
        return;
      }

      // Перевірка розміру файлу (наприклад, максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFieldValue(fieldName, null);
        setPreview(null);
        return;
      }

      setFieldValue(fieldName, file);
      setFieldTouched(fieldName, true);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFieldValue(fieldName, null);
    setFieldTouched(fieldName, true);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={twMerge("flex flex-col relative", className)}>
      {label && (
        <label className="mb-2 text-[14px] font-medium leading-[120%]">
          {label}
        </label>
      )}
      <div
        onClick={handleClick}
        className={`
          relative w-full flex flex-col items-center justify-center
          cursor-pointer transition-opacity duration-300
          ${hasError ? "opacity-80" : "hover:opacity-90"}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        {preview ? (
          <div className="relative size-[97px] lg:size-[147px] rounded-full overflow-hidden border-2 border-accent cursor-pointer">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent/80 transition-colors cursor-pointer"
              aria-label="Remove photo"
            >
              <CrossIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="relative w-full flex flex-col items-center">
            <div className="size-[97px] lg:size-[147px] rounded-full bg-accent flex items-center justify-center">
              <CameraPlusIcon className="size-[65px] lg:size-[83px] text-white" />
            </div>
          </div>
        )}
        
        {!preview && (
          <p className="mt-3 text-[12px] font-medium leading-[120%] text-center text-black">
            {t("signUpPage.personalData.addPhoto")}
          </p>
        )}
      </div>
      
      {hasError && errors[fieldName] && (
        <p className="absolute bottom-[-12px] left-4 text-[8px] lg:text-[10px] lg:bottom-[-14px] font-light leading-[120%] text-accent">
          {errors[fieldName] as string}
        </p>
      )}
    </div>
  );
}

