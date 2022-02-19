import React, { useState } from "react";
import { EditorState, convertFromHTML, convertToRaw } from "draft-js";
import { Button } from "@mui/material";
import TextEditor from "../../TextEditor/TextEditor";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./BlogEdit.css";
import { postABlog } from "../../../API_CALLS/Blog";

const BlogArticle = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [blogTitle, setBlogTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const onChange = (editor) => {
    setEditorState(editor);
  };
  const onClick = async () => {
    const content = editorState.getCurrentContent();
    const convert = convertToRaw(content);
    console.log(convert);
    if (blogTitle.length === 0 || description.length === 0) {
      setShowError(true);
    }
    const resp = await postABlog({
      user_id: 1,
      description: description,
      content: convertToRaw(content),
      title: blogTitle,
    });
  };
  return (
    <div style={{ paddingTop: "1rem", maxWidth: "100%" }}>
      <Box>
        <TextField
          style={{ width: "93%", display: "flex", margin: "1rem" }}
          id="title"
          value={blogTitle}
          onChange={(e) => {
            setBlogTitle(e.target.value);
            if (e.target.value.length > 0) setError(false);
          }}
          label="Title"
          required
          variant="outlined"
        />
        <TextField
          style={{ width: "93%", display: "flex", margin: "1rem" }}
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (e.target.value.length > 0) setError(false);
          }}
          label="Description"
          required
          variant="outlined"
        />
        {showError && <div style={{ color: "red" }}>{error}</div>}
      </Box>
      <span style={{ textAlign: "left" }}>Article</span>
      <TextEditor
        editorState={editorState}
        required
        setEditorState={setEditorState}
        onChange={onChange}
        readOnly={false}
      />
      <Button onClick={onClick}>Submit</Button>
    </div>
  );
};

export default BlogArticle;
