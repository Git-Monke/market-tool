import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import { FormControl } from "../../ui/form";

export default function TimeUnitSelector({ field }: any) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="rounded-s-none">
          <SelectValue placeholder="Hours" />
        </SelectTrigger>
      </FormControl>

      <SelectContent>
        <SelectItem value="Minutes">Minutes</SelectItem>
        <SelectItem value="Hours">Hours</SelectItem>
      </SelectContent>
    </Select>
  );
}
