import { Breadcrumb } from "flowbite-react";
import { FaHome } from "react-icons/fa";
import { getDeviceWidth } from "../../../../utils/getDeviceWidth";

interface BreadCrumbProps {
  home: [string, string];
  currentSection: [string, string];
  currentSubsection?: [string, string];
  currentSubsection2?: [string, string];
}

export default function BreadCrumb({
  home,
  currentSection,
  currentSubsection,
  currentSubsection2,
}: BreadCrumbProps) {
  const isMobile = getDeviceWidth() < 768;

  return (
    <Breadcrumb className="p-4 mx-auto">
      {isMobile ? (
        <Breadcrumb.Item>
          <a
            href={currentSubsection && currentSubsection[1]}
            className="text-[16px]"
          >
            {currentSubsection && currentSubsection[0]}
          </a>
        </Breadcrumb.Item>
      ) : (
        <>
          <Breadcrumb.Item icon={FaHome}>
            <a href={home[1]} className="text-[16px]">
              {home[0]}
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href={currentSection[1]} className="text-[16px]">
              {currentSection[0]}
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              href={currentSubsection && currentSubsection[1]}
              className="text-[16px]"
            >
              {currentSubsection && currentSubsection[0]}
            </a>
          </Breadcrumb.Item>
          {currentSubsection2 && (
            <Breadcrumb.Item>
              <a
                href={currentSubsection2 && currentSubsection2[1]}
                className="text-[16px]"
              >
                {currentSubsection2 && currentSubsection2[0]}
              </a>
            </Breadcrumb.Item>
          )}
        </>
      )}
    </Breadcrumb>
  );
}
