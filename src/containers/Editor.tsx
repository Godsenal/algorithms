import React, { useRef } from "react";
import { observer, useObservable } from "mobx-react-lite";
import { EditorFromTextArea } from "codemirror";
import { Input, Button } from "antd";
import { Codemirror, SelectMode } from "../components";
import { IMode } from "../models/codemirror";
import { Post, IPost } from "../models/post";
import postStore from "../store/postStore";

const Editor = observer(() => {
  const post = useObservable<IPost>({
    title: "",
    code: "",
    description: "",
    mode: "c++"
  });
  const codeEditor = useRef<EditorFromTextArea | null>(null);
  const setCodeEditor = (editor: EditorFromTextArea) => {
    codeEditor.current = editor;
  };

  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    (post.title = e.target.value);
  const setDescription = (description: string) =>
    (post.description = description);
  const setMode = (mode: IMode) => (post.mode = mode);

  const handleSubmit = () => {
    if (codeEditor.current) {
      const code = codeEditor.current.getValue();
      post.code = code;
      const newPost = new Post(postStore, { ...post }); // destructing 안하면 observer가 끝까지 붙어있음
      newPost.save();
    }
  };
  return (
    <>
      <Input value={post.title} onChange={setTitle} />
      <SelectMode
        mode={post.mode}
        showSearch
        placeholder="Select a mode"
        handleChange={setMode}
      />
      <Codemirror mode={post.mode} setCodeEditor={setCodeEditor} />
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
});

export default Editor;
