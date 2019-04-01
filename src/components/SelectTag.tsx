import React, { useContext, useState, useEffect } from "react";
import { Select } from "antd";
import storeContext from "../contexts/storeContext";
import { INewTag, ITag } from "../models/tag";
import { observer } from "mobx-react-lite";

const Option = Select.Option;

const SelectTag: React.SFC<{
  handleChange: (tags: INewTag[]) => void;
}> = observer(({ handleChange }) => {
  const { tagStore } = useContext(storeContext);
  const [tags, setTags] = useState<ITag[]>([]);
  useEffect(() => {
    tagStore.fetchAllTags().then(() => {
      setTags(tagStore.tags);
    });
  }, []);
  const handleTagChange = (value: INewTag[]) => {
    handleChange(value);
  };
  return (
    <Select
      mode="tags"
      style={{ width: "100%" }}
      placeholder="Select Tags"
      onChange={handleTagChange}
      loading={tagStore.fetchState === "FETCHING"}
    >
      {tags.map(tag => (
        <Option key={tag.name}>{tag.name}</Option>
      ))}
    </Select>
  );
});

export default SelectTag;
