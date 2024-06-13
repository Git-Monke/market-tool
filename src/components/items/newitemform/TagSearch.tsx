import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Tag from "@/components/Tag";

import tags from "@/lib/tags.json";
import { FormLabel } from "@/components/ui/form";

interface Tags {
  categories: string[];
}

interface TagSearchProps {
  selectedTags: {
    [key: string]: boolean;
  };
  addTag: (key: string) => void;
  removeTag: (key: string) => void;
}

const tagsTyped: Tags = tags as Tags;

const TagSearch: React.FC<TagSearchProps> = ({
  selectedTags,
  addTag,
  removeTag,
}) => {
  const [input, setInput] = useState<string>("");

  return (
    <div>
      <Input
        onInput={(event) => setInput(event.currentTarget.value)}
        placeholder="Search for tags"
      ></Input>

      <div className="flex gap-4 flex-wrap mt-4">
        {Object.keys(selectedTags).map((key) => {
          return selectedTags[key] ? (
            <Tag
              clickable={true}
              key={key}
              filled={true}
              onClick={() => {
                removeTag(key);
              }}
            >
              {key}
            </Tag>
          ) : undefined;
        })}

        {tagsTyped.categories.sort().map((tag, i) => {
          if (
            input !== "" &&
            tag.toLowerCase().startsWith(input.toLowerCase()) &&
            !selectedTags[tag]
          ) {
            return (
              <Tag
                clickable={true}
                key={i}
                filled={false}
                onClick={() => {
                  addTag(tag);
                }}
              >
                {tag}
              </Tag>
            );
          }
        })}
      </div>
    </div>
  );
};

export default TagSearch;
