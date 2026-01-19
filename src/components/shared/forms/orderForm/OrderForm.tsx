"use client";

import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import axios from "axios";
import CustomizedInput from "../../formComponents/CustomizedInput";
import MainButton from "../../buttons/MainButton";
import { OrderFormValidation } from "@/schemas/OrderFormValidation";
import ProductTypeSelector from "./ProductTypeSelector";
import QuantitySelector from "./QuantitySelector";
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

  const validationSchema = OrderFormValidation();

  const initialValues: OrderFormValues = {
    productType: "sticker",
    quantity: 1,
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
    deliveryAddress: "",
  };

  const handleSubmit = async (
    values: OrderFormValues,
    formikHelpers: FormikHelpers<OrderFormValues>
  ) => {
    const { resetForm } = formikHelpers;

    const productTypeText = values.productType === "sticker" 
      ? t("orderForm.sticker") 
      : t("orderForm.bracelet");

    const data =
      `<b>Заявка "Форма замовлення"</b>\n` +
      `<b>Тип продукту:</b> ${productTypeText}\n` +
      `<b>Кількість:</b> ${values.quantity}\n` +
      `<b>Ім'я:</b> ${values.name.trim()}\n` +
      `<b>Прізвище:</b> ${values.surname.trim()}\n` +
      (values.patronymic.trim() ? `<b>По-батькові:</b> ${values.patronymic.trim()}\n` : "") +
      `<b>Телефон:</b> ${values.phone.trim().replace(/(?!^)\D/g, "")}\n` +
      `<b>Адреса доставки:</b> ${values.deliveryAddress.trim()}\n`;

    try {
      if (setIsError) setIsError(false);
      setIsLoading(true);
      
      await axios({
        method: "post",
        url: "/api/telegram",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      resetForm();
      setProductType("sticker");
      setQuantity(1);
      
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
      return error;
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

  const handleProductTypeChange = (type: "sticker" | "bracelet") => {
    setProductType(type);
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
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ setFieldValue, values, dirty, isValid }) => {
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
                <ProductTypeSelector
                  productType={productType}
                  onProductTypeChange={(type) => {
                    handleProductTypeChange(type);
                    setFieldValue("productType", type);
                  }}
                />
                <QuantitySelector
                  quantity={quantity}
                  onQuantityDecrease={handleQuantityDecrease}
                  onQuantityIncrease={handleQuantityIncrease}
                />
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
                  disabled={!(dirty && isValid) || isLoading}
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
