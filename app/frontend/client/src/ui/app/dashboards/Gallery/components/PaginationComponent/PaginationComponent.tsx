import { Flowbite, Pagination } from "flowbite-react";
import { customTheme } from "../../../../../../components/Shared/FlowbiteCustomTheme/FlowbiteCustomTheme";

export function PaginationComponent({ currentPage, onPageChange, totalPages }) {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="flex sm:justify-center mx-auto items-center my-20">
        <Pagination
          currentPage={currentPage}
          showIcons
          previousLabel=""
          nextLabel=""
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </Flowbite>
  );
}
