import { FaBackward, FaForward } from "react-icons/fa";
import { HelperText } from "flowbite-react";

export default function DateRange({ currentDate, setCurrentDate, currentMonth, lastDayOfMonth, goToPreviousMonth, goToNextMonth }) {
  
  
  return (
    <>
      <div className="flex justify-center mx-auto lg:w-9/12 xxs:w-11/12 p-4 bg-gray-50 drop-shadow-sm rounded-3">
        <div className="">
          <button type="button" onClick={goToPreviousMonth}>
            <FaBackward
              size={20}
              className="text-primary text-xl hover:cursor-pointer"
            />
          </button>
        </div>
        <div className="w-max m-auto">
          <HelperText>
            01 -{" "}
            {lastDayOfMonth(currentDate.getMonth(), currentDate.getFullYear())}{" "}
            de {currentMonth} de {currentDate.getFullYear()}
          </HelperText>
        </div>
        <div className="">
          <button type="button" onClick={goToNextMonth}>
            <FaForward
              size={20}
              className="text-primary text-xl hover:cursor-pointer"
            />
          </button>
        </div>
      </div>
    </>
  );
}
