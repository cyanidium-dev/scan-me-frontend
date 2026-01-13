import * as yup from "yup";
import { useTranslations } from "next-intl";

export const EmergencyDataValidation = () => {
  const t = useTranslations("forms.errors");

  const emergencyDataValidationSchema = yup.object().shape({
    emergencyContacts: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string(),
          phone: yup.string(),
          relationship: yup.string(),
        })
      )
      .test(
        "at-least-one-complete",
        t("required"),
        function (contacts) {
          if (!contacts || contacts.length === 0) {
            return false;
          }
          // Перевіряємо, чи хоча б один контакт повністю заповнений
          const hasCompleteContact = contacts.some((contact) => {
            const name = String(contact?.name || "").trim();
            const phone = String(contact?.phone || "").trim();
            const relationship = String(contact?.relationship || "").trim();
            
            return name !== "" && phone !== "" && relationship !== "";
          });
          
          return hasCompleteContact;
        }
      ),
    sendSMS: yup.boolean(),
    allowGPS: yup.boolean(),
  });

  return emergencyDataValidationSchema;
};

