"use client";

import { useState } from "react";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import CustomizedInput from "../formComponents/CustomizedInput";
import MainButton from "../buttons/MainButton";
import { twMerge } from "tailwind-merge";

interface OrderFormValues {
  productType: "sticker" | "bracelet";
  quantity: number;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  deliveryAddress: string;
}

interface OrderFormProps {
  className?: string;
  setIsError?: (error: boolean) => void;
  setIsNotificationShown?: (shown: boolean) => void;
  setIsModalShown?: (shown: boolean) => void;
}

export default function OrderForm({ 
  className = "",
  setIsError,
  setIsNotificationShown,
  setIsModalShown,
}: OrderFormProps) {
  const t = useTranslations();
  const [productType, setProductType] = useState<"sticker" | "bracelet">("sticker");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: OrderFormValues = {
    productType: "sticker",
    quantity: 1,
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
    deliveryAddress: "",
  };

  const handleSubmit = async (values: OrderFormValues) => {
    try {
      if (setIsError) setIsError(false);
      setIsLoading(true);
      
      // Логіка submit буде додана пізніше
      console.log("Order form submitted:", values);
      
      // Тимчасово імітуємо успішну відправку
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (setIsModalShown) {
        setIsModalShown(false);
      }
      if (setIsNotificationShown) {
        setIsNotificationShown(true);
      }
    } catch (error) {
      if (setIsError) setIsError(true);
      if (setIsModalShown) {
        setIsModalShown(false);
      }
      if (setIsNotificationShown) {
        setIsNotificationShown(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className={twMerge("px-6 lg:px-8 py-8 lg:py-12", className)}>
      <h2 className="mb-4 lg:mb-6 font-actay text-[24px] lg:text-[32px] font-bold leading-[120%] uppercase text-center text-black">
        {t("orderForm.title")}
      </h2>
      <p className="mb-10 lg:mb-16 text-center text-[12px] lg:text-[14px] font-light leading-[120%]">
        {t("orderForm.description")}
      </p>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ setFieldValue, values }) => {
          // Синхронізуємо productType та quantity зі станом
          if (values.productType !== productType) {
            setFieldValue("productType", productType);
          }
          if (values.quantity !== quantity) {
            setFieldValue("quantity", quantity);
          }

          return (
            <Form>
              {/* Вибір продукту та кількість */}
              <div className="flex gap-2 lg:gap-3 mb-6">
                {/* Вибір продукту */}
                <div className="relative flex flex-1 h-[49px] border border-black rounded-full p-0.5">
                  {/* Червоний слайдер */}
                  <div
                    className={twMerge(
                      "absolute top-0.5 left-0.5 w-[calc(50%-2px)] h-[calc(100%-4px)] bg-accent rounded-full transition duration-300 ease-out",
                      productType === "bracelet" && "translate-x-full"
                    )}
                  />
                  {/* Кнопки */}
                  <button
                    type="button"
                    onClick={() => {
                      setProductType("sticker");
                      setFieldValue("productType", "sticker");
                    }}
                    className={twMerge(
                      "cursor-pointer relative z-10 flex-1 h-full rounded-full font-actay text-[12px] lg:text-[16px] font-bold leading-none uppercase transition duration-300 ease-out",
                      productType === "sticker"
                        ? "text-white"
                        : "text-black",
                      
                    )}
                  >
                    {t("orderForm.sticker")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProductType("bracelet");
                      setFieldValue("productType", "bracelet");
                    }}
                    className={twMerge(
                      "cursor-pointer relative z-10 flex-1 h-full rounded-full font-actay text-[12px] lg:text-[16px] font-bold leading-none uppercase transition-colors duration-300",
                      productType === "bracelet"
                        ? "text-white"
                        : "text-black"
                    )}
                  >
                    {t("orderForm.bracelet")}
                  </button>
                </div>

                {/* Селектор кількості */}
                <div className="flex items-center gap-2 lg:gap-4 bg-white rounded-full border border-black p-2 h-[49px]">
                  <button
                    type="button"
                    onClick={handleQuantityDecrease}
                    disabled={quantity <= 1}
                    className={twMerge(
                      "size-8 rounded-full border border-black flex items-center justify-center transition duration-300",
                      quantity <= 1
                        ? ""
                        : "hover:bg-black/10 cursor-pointer"
                    )}
                  >
                    <span className="text-black text-[20px] leading-none">−</span>
                  </button>
                  <span className="font-actay text-[14px] lg:text-[16px] font-bold min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleQuantityIncrease}
                    className="size-8 rounded-full bg-accent border border-accent flex items-center justify-center text-white hover:bg-accent/80 transition duration-300 cursor-pointer"
                  >
                    <span className="text-white text-[20px] leading-none">+</span>
                  </button>
                </div>
              </div>

              {/* Поля форми */}
              <div className="flex flex-col gap-4 mb-6">
                {/* Ім'я та Прізвище */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <CustomizedInput
                      fieldName="name"
                      placeholder={t("forms.namePlaceholder")}
                      fieldClassName="bg-white"
                      isLabelHidden={true}
                    />
                  </div>
                  <div className="flex-1">
                    <CustomizedInput
                      fieldName="surname"
                      placeholder={t("orderForm.surnamePlaceholder")}
                      fieldClassName="bg-white"
                      isLabelHidden={true}
                    />
                  </div>
                </div>

                {/* По-батькові */}
                <CustomizedInput
                  fieldName="patronymic"
                  placeholder={t("orderForm.patronymicPlaceholder")}
                  fieldClassName="bg-white"
                  isLabelHidden={true}
                />

                {/* Телефон */}
                <CustomizedInput
                  fieldName="phone"
                  inputType="tel"
                  fieldClassName="bg-white px-6 py-0 lg:py-0"
                  isLabelHidden={true}
                />

                {/* Адреса доставки */}
                <CustomizedInput
                  fieldName="deliveryAddress"
                  placeholder={t("orderForm.deliveryAddressPlaceholder")}
                  fieldClassName="bg-white"
                  isLabelHidden={true}
                />
              </div>

              {/* Кнопки */}
              <div className="flex flex-col gap-4">
                <MainButton
                  type="submit"
                  variant="gradient"
                  className="w-full h-[48px] lg:h-[54px]"
                  disabled={isLoading}
                  isLoading={isLoading}
                  loadingText={t("forms.loading")}
                >
                  {t("orderForm.placeOrder")}
                </MainButton>
                <Link 
                  href="/dashboard" 
                  className="w-full"
                  onClick={() => {
                    if (setIsModalShown) {
                      setIsModalShown(false);
                    }
                  }}
                >
                  <MainButton
                    type="button"
                    variant="outlineBlack"
                    className="w-full h-[48px] lg:h-[54px] bg-transparent border-black text-black hover:bg-black/10"
                  >
                    {t("orderForm.goToDashboard")}
                  </MainButton>
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
