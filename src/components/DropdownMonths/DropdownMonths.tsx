import { Button } from "@/components/ui/button";
import { MdArrowDropDown } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { monthNameToNumber } from "@/lib/data";

interface DropdownMonthsProps {
  selectedMonth: string;
  handleMonthChange: (value: any) => void;
}
function DropdownMonths({ selectedMonth, handleMonthChange }: DropdownMonthsProps) {
  const monthOptions = Object.keys(monthNameToNumber);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedMonth} <MdArrowDropDown /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select A Month</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedMonth}
          onValueChange={handleMonthChange}
        >
          {monthOptions.map((monthOption) => (
            <DropdownMenuRadioItem key={monthOption} value={monthOption}>
              {monthOption}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownMonths;