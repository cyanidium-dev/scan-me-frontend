import Image from "next/image";

export default function SocialBlock() {
  return (
    <div className="relative w-full h-45 lg:flex-1 rounded-[16px] overflow-hidden">
      <Image
        src="/images/homePage/contactUs/image.webp"
        fill
        alt="image"
        className="object-cover"
      />
    </div>
  );
}
