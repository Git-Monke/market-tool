import NewItemForm from "./NewItemForm";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function NewItem() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <Plus></Plus>Add Item
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
        </DialogHeader>
        <NewItemForm
          callback={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
