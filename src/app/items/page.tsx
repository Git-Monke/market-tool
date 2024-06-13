"use client";

import { Separator } from "@/components/ui/separator";
import { useItemContext } from "@/lib/context/Items";

import { Card } from "@/components/ui/card";
import { Item } from "@/lib/context/Items";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";
import NewItem from "@/components/items/NewItem";
import Tag from "@/components/Tag";

import { minutesToHumanReadable } from "@/lib/formatting";

function CardFromItem(item: Item, i: number) {
  const time = minutesToHumanReadable(item.minutes_to_make);

  return (
    <Card className="p-4" key={i}>
      <div className="flex justify-between">
        <h1 className="text-2xl w-4/5">{item.name}</h1>
        <div className="grid w-1/5 grid-cols-2">
          <Button variant="ghost" className="p-0">
            <Edit></Edit>
          </Button>
          <Button variant="ghost" className="p-0">
            <Trash></Trash>
          </Button>
        </div>
      </div>

      <Separator className="my-4"></Separator>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="w-1/2">Cost: ${item.cost_to_produce.toFixed(2)}</p>
          <p className="w-1/2">Price: ${item.sell_price.toFixed(2)}</p>
        </div>

        <p>Time To Produce: {time}</p>

        <div className="flex">
          <p className="mr-2">Tags:</p>
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag, i) => {
              return <Tag key={i}>{tag}</Tag>;
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Items() {
  const context = useItemContext();
  const items = context ? context.items : [];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Your Items</h1>
        <NewItem />
      </div>

      <Separator className="my-8"></Separator>

      <div className="grid grid-cols-3 gap-8">
        {items.map((item, i) => CardFromItem(item, i))}
      </div>
    </div>
  );
}
