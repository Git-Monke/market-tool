"use client";

import { Item, useItemContext } from "@/lib/context/Items";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import TimeUnitSelector from "./newitemform/TimeUnitSelect";
import { Button } from "../ui/button";
import TagSearch from "./newitemform/TagSearch";

import { useState } from "react";
import { DialogTrigger } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(1, "Must have a name"),
  cost: z.string().min(1, "Must have a cost"),
  price: z.string().min(1, "Must have a price"),
  time: z.string().min(1, "Must have a time"),
  time_unit: z.string(),
});

export default function NewItemForm({ callback }: { callback?: () => void }) {
  const context = useItemContext();

  const [selectedTags, setSelectedTags] = useState<{ [key: string]: boolean }>(
    {}
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cost: "",
      price: "",
      time: "",
      time_unit: "Hours",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (!context) {
      return;
    }

    context.addItem({
      name: data.name,
      cost_to_produce: parseFloat(data.cost),
      sell_price: parseFloat(data.price),
      minutes_to_make:
        data.time_unit === "Hours"
          ? parseFloat(data.time) * 60
          : parseFloat(data.time),
      tags: Object.keys(selectedTags),
    } as Item);

    callback ? callback() : undefined;
  };

  const addTag = (tag: string) => {
    setSelectedTags((oldTags) => {
      let newTags = { ...oldTags };
      newTags[tag] = true;
      return newTags;
    });
  };

  const removeTag = (tag: string) => {
    setSelectedTags((oldTags) => {
      let newTags = { ...oldTags };
      newTags[tag] = false;
      return newTags;
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="Item Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex justify-between gap-4">
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => {
              return (
                <FormItem className="w-1/2">
                  <FormLabel>Cost $</FormLabel>
                  <FormControl>
                    <Input placeholder="5.50" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => {
              return (
                <FormItem className="w-1/2">
                  <FormLabel>Price $</FormLabel>
                  <FormControl>
                    <Input placeholder="12.50" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="flex w-full">
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Time to Make</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input
                        placeholder="1"
                        {...field}
                        className="rounded-e-none w-3/4"
                      />

                      <FormField
                        control={form.control}
                        name="time_unit"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/4 self-end">
                              <TimeUnitSelector field={field} />
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <FormLabel>Tags</FormLabel>
        <TagSearch
          selectedTags={selectedTags}
          addTag={addTag}
          removeTag={removeTag}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
