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
      <h2 className="mb-3 lg:mb-4 font-actay text-[24px] lg:text-[32px] font-bold leading-[120%] uppercase text-center text-black">
        {t("orderForm.title")}
      </h2>
      <p className="mb-6 lg:mb-8 text-center text-black/80 text-[14px] lg:text-[16px] leading-[120%]">
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
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                {/* Вибір продукту */}
                <div className="flex gap-2 flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      setProductType("sticker");
                      setFieldValue("productType", "sticker");
                    }}
                    className={twMerge(
                      "flex-1 h-12 lg:h-[49px] rounded-full text-[12px] lg:text-[14px] font-medium leading-[120%] uppercase transition duration-300",
                      productType === "sticker"
                        ? "bg-accent text-white"
                        : "bg-white text-black border border-black/40"
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
                      "flex-1 h-12 lg:h-[49px] rounded-full text-[12px] lg:text-[14px] font-medium leading-[120%] uppercase transition duration-300",
                      productType === "bracelet"
                        ? "bg-accent text-white"
                        : "bg-white text-black border border-black/40"
                    )}
                  >
                    {t("orderForm.bracelet")}
                  </button>
                </div>

                {/* Селектор кількості */}
                <div className="flex items-center gap-3 bg-white rounded-full border border-black/40 px-4 h-12 lg:h-[49px]">
                  <button
                    type="button"
                    onClick={handleQuantityDecrease}
                    disabled={quantity <= 1}
                    className={twMerge(
                      "size-6 rounded-full border border-black/40 flex items-center justify-center transition duration-300",
                      quantity <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-black/10 cursor-pointer"
                    )}
                  >
                    <span className="text-black text-[16px] leading-none">−</span>
                  </button>
                  <span className="text-black text-[14px] lg:text-[16px] font-medium min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleQuantityIncrease}
                    className="size-6 rounded-full bg-accent border border-accent flex items-center justify-center text-white hover:bg-accent/80 transition duration-300 cursor-pointer"
                  >
                    <span className="text-white text-[16px] leading-none">+</span>
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
                      label={t("forms.name")}
                      placeholder={t("forms.namePlaceholder")}
                      fieldClassName="bg-white"
                      labelClassName="text-black"
                    />
                  </div>
                  <div className="flex-1">
                    <CustomizedInput
                      fieldName="surname"
                      label={t("orderForm.surname")}
                      placeholder={t("orderForm.surnamePlaceholder")}
                      fieldClassName="bg-white"
                      labelClassName="text-black"
                    />
                  </div>
                </div>

                {/* По-батькові */}
                <CustomizedInput
                  fieldName="patronymic"
                  label={t("orderForm.patronymic")}
                  placeholder={t("orderForm.patronymicPlaceholder")}
                  fieldClassName="bg-white"
                  labelClassName="text-white"
                />

                {/* Телефон */}
                <CustomizedInput
                  fieldName="phone"
                  label={t("forms.phone")}
                  inputType="tel"
                  fieldClassName="bg-white px-6 py-0 lg:py-0"
                  labelClassName="text-white"
                />

                {/* Адреса доставки */}
                <CustomizedInput
                  fieldName="deliveryAddress"
                  label={t("orderForm.deliveryAddress")}
                  placeholder={t("orderForm.deliveryAddressPlaceholder")}
                  fieldClassName="bg-white"
                  labelClassName="text-white"
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
                <Link href="/dashboard" className="w-full">
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
