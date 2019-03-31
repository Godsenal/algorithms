import React, { useRef, useContext } from "react";
import { observer, useObservable } from "mobx-react-lite";
import { EditorFromTextArea } from "codemirror";
import { Input, Button } from "antd";
import styled from "styled-components";
import { Codemirror, SelectMode, SelectTag } from "../components";
import { IMode } from "../models/codemirror";
import { INewPost } from "../models/post";
import { MarginTop } from "../styles/Common";
import storeContext from "../contexts/storeContext";

const Title = styled(Input)`
  font-size: 20px;
`;
const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const initialPost: INewPost = {
  title: "",
  problem: "",
  code: "",
  description: "",
  mode: "c++"
};
const Editor = observer(() => {
  const { postStore } = useContext(storeContext);
  const post = useObservable(initialPost);
  const codeEditor = useRef<EditorFromTextArea | null>(null);
  const setCodeEditor = (editor: EditorFromTextArea) => {
    codeEditor.current = editor;
  };

  const handlePlainText = (type: "title" | "problem" | "description") => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    post[type] = e.target.value;
  };
  const setMode = (mode: IMode) => (post.mode = mode);

  const reset = () => {
    Object.keys(post).forEach(field => {
      const assert = field as keyof INewPost;
      post[assert] = initialPost[assert];
    });
  };
  const handleSubmit = () => {
    if (codeEditor.current) {
      const code = codeEditor.current.getValue();
      post.code = code;
      postStore.addPost(post);
      reset();
    }
  };
  return (
    <>
      <MarginTop>
        <label htmlFor="title">Title</label>
        <Title
          id="title"
          value={post.title}
          onChange={handlePlainText("title")}
          size="large"
        />
      </MarginTop>
      <MarginTop>
        <label htmlFor="problem">Problem</label>
        <Input.TextArea
          id="problem"
          autosize
          value={post.problem}
          onChange={handlePlainText("problem")}
          rows={6}
        />
      </MarginTop>
      <MarginTop>
        <label>Code</label>
        <Codemirror mode={post.mode} setCodeEditor={setCodeEditor} />
        <MarginTop>
          <AlignRight>
            <SelectMode
              mode={post.mode}
              showSearch
              placeholder="Select a mode"
              handleChange={setMode}
            />
          </AlignRight>
        </MarginTop>
      </MarginTop>
      <MarginTop>
        <label htmlFor="description">Description</label>
        <Input.TextArea
          id="problem"
          autosize
          value={post.description}
          onChange={handlePlainText("description")}
          rows={6}
        />
      </MarginTop>
      <MarginTop>
        <label>Tags</label>
        <SelectTag />
      </MarginTop>
      <MarginTop>
        <AlignRight>
          <Button onClick={handleSubmit}>Submit</Button>
        </AlignRight>
      </MarginTop>
    </>
  );
});

export default Editor;
