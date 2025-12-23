import { useTranslations } from "next-intl";
import Image from "next/image";

export default function StepsList() {
  const t = useTranslations("homePage.howItWorks.steps");

  return (
    <ul className="flex flex-col md:flex-row md:flex-wrap gap-6 text-white">
      <li className="relative flex items-center md:w-[calc(50%-12px)] min-h-35 lg:min-h-50 p-4 rounded-[16px] bg-black overflow-hidden">
        <Image
          src="/images/homePage/steps/fingerprintOne.webp"
          alt="fingerprint"
          width={164}
          height={140}
          className="absolute top-0 left-0 object-cover w-[164px] h-[140px] lg:w-[164px] lg:h-45"
        />
        <p className="absolute top-2 left-[-47px] lg:left-6.5 font-actay text-[120px] lg:text-[180px] font-bold leading-[120%]">
          01
        </p>
        <div className="ml-30.5 lg:ml-[284px]">
          <h3 className="font-actay text-[16px] lg:text-[18px] font-bold leading-[120%] mb-3 lg:mb-6 uppercase">
            {t("titleOne")}
          </h3>
          <p className="text-[10px] lg:text-[12px] font-light leading-[120%]">
            {t("valueOne")}
          </p>
        </div>
      </li>

      <li className="relative flex items-center md:w-[calc(50%-12px)] min-h-35 lg:min-h-50 p-4 rounded-[16px] bg-accent overflow-hidden">
        <Image
          src="/images/homePage/steps/ellipseOne.webp"
          alt="ellipse"
          width={80}
          height={77}
          className="lg:hidden absolute bottom-0 left-0 object-cover lg:w-[118px] h-auto"
        />
        <Image
          src="/images/homePage/steps/ellipseOneDesk.webp"
          alt="ellipse"
          width={118}
          height={149}
          className="hidden lg:block absolute bottom-0 left-0 object-cover"
        />
        <p className="absolute top-2 left-[-47px] lg:left-6.5 font-actay text-[120px] lg:text-[180px] font-bold leading-[120%]">
          02
        </p>
        <div className="ml-30.5 lg:ml-[284px]">
          <h3 className="font-actay text-[16px] lg:text-[18px] font-bold leading-[120%] mb-3 lg:mb-6 uppercase">
            {t("titleTwo")}
          </h3>
          <p className="text-[10px] lg:text-[12px] font-light leading-[120%]">
            {t("valueTwo")}
          </p>
        </div>
      </li>

      <li className="relative flex items-center md:w-[calc(50%-12px)] min-h-35 lg:min-h-50 p-4 rounded-[16px] bg-accent overflow-hidden">
        <Image
          src="/images/homePage/steps/ellipseTwo.webp"
          alt="ellipse"
          width={80}
          height={60}
          className="lg:hidden absolute top-0 left-0 md:left-auto md:-right-2.5 lg:-right-4.5 object-cover md:rotate-90 lg:w-[138px] h-auto "
        />
        <Image
          src="/images/homePage/steps/ellipseTwoDesk.webp"
          alt="ellipse"
          width={138}
          height={107}
          className="hidden lg:block absolute top-0 right-0 object-cover"
        />
        <p className="absolute top-2 left-[-47px] lg:left-6.5 font-actay text-[120px] lg:text-[180px] font-bold leading-[120%]">
          03
        </p>
        <div className="ml-30.5 lg:ml-[284px]">
          <h3 className="font-actay text-[16px] lg:text-[18px] font-bold leading-[120%] mb-3 lg:mb-6 uppercase">
            {t("titleThree")}
          </h3>
          <p className="text-[10px] lg:text-[12px] font-light leading-[120%]">
            {t("valueThree")}
          </p>
        </div>
      </li>

      <li className="relative flex items-center md:w-[calc(50%-12px)] min-h-35 lg:min-h-50 p-4 rounded-[16px] bg-black overflow-hidden">
        <Image
          src="/images/homePage/steps/fingerprintTwo.webp"
          alt="fingerprint"
          width={82}
          height={123}
          className="absolute bottom-0 left-0 w-[82px] h-[123px] lg:h-[176px] lg:w-[149px] object-cover"
        />
        <p className="absolute top-2 left-[-47px] lg:left-6.5 font-actay text-[120px] lg:text-[180px] font-bold leading-[120%]">
          04
        </p>
        <div className="ml-30.5 lg:ml-[284px]">
          <h3 className="font-actay text-[14px] lg:text-[18px] font-bold leading-[120%] mb-3 lg:mb-6 uppercase">
            {t("titleFour")}
          </h3>
          <p className="text-[10px] lg:text-[12px] font-light leading-[120%]">
            {t("valueFour")}
          </p>
        </div>
      </li>
    </ul>
  );
}
