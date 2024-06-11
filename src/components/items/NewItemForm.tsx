"use client";

import { useItemContext } from "@/lib/context/Items";

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

const formSchema = z.object({
  name: z.string({
    required_error: "Item must have a name!",
  }),
  price: z.number().positive("Must be a positive amount"),
  time: z.number().positive("Must be a positive amount"),
  time_unit: z.string(),
});

export default function NewItemForm() {
  const context = useItemContext();
  const addItem = context ? context.addItem : [];

  const [selectedTags, setSelectedTags] = useState<{ [key: string]: boolean }>(
    {}
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      time: 1,
      time_unit: "Hours",
    },
  });

  const handleSubmit = () => {};

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

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Price $</FormLabel>
                <FormControl>
                  <Input placeholder="12.50" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex w-full">
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => {
              return (
                <FormItem className="w-3/4">
                  <FormLabel>Time to Make</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1"
                      {...field}
                      className="rounded-e-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
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
