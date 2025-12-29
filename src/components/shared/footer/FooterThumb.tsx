import { CODE_SITE_URL } from "@/constants/constants";
import TagIcon from "../icons/TagIcon";

export default function FooterThumb() {
  const year = new Date().getFullYear();

  return (
    <div className="flex justify-between items-center mt-12 text-white">
      <div>© {year} Scan Me</div>
      <div>
        <p className="text-[7px] font-normal leading-[200%] uppercase">
          Created by
        </p>
        <a
          href={CODE_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5"
        >
          <p className="text-[14px] font-medium leading-[180%] uppercase active:text-gray-300 xl:group-hover:text-gray-300 focus-visible:text-gray-300 transition duration-300 ease-in-out">
            Code-site.art
          </p>
          <TagIcon className="mb-1.5 xl:group-hover:text-gray-300 transition duration-300 ease-in-out" />
        </a>
      </div>
    </div>
  );
}
