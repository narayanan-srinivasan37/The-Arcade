import React, { useEffect, useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Button } from "@mui/material";
import TextEditor from "../../TextEditor/TextEditor";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./BlogEdit.css";
import { editABlog } from "../../../API_CALLS/Blog";

const BlogEdit = ({ blog }) => {


  useEffect(() => {
    if (blog.blog_content) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(blog.blog_content))
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, []);
  const [editorState, setEditorState] = useState();
  const [blogTitle, setBlogTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [displayImage, setDisplayImage] = useState(blog.display_image);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const onChange = (editor) => {
    setEditorState(editor);
  };
  const onClick = async () => {
    const content = editorState.getCurrentContent();
    const convert = convertToRaw(content);
  
    if (blogTitle.length === 0 || description.length === 0) {
      setShowError(true);
    }
    try {
      const resp = await editABlog({
        id: blog.id,
        description: description,
        content: convertToRaw(content),
        title: blogTitle,
      });
    } catch (err) {
      throw err;
    }
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
          multiline
          onChange={(e) => {
            setDescription(e.target.value);
            if (e.target.value.length > 0) setError(false);
          }}
          label="Description"
          required
          variant="outlined"
        />
        {showError && <div style={{ color: "red" }}>{error}</div>}
        <TextField
          style={{ width: "93%", display: "flex", margin: "1rem" }}
          id="displayimage"
          value={displayImage}
          onChange={(e) => {
            setDisplayImage(e.target.value);
            if (e.target.value.length > 0) setError(false);
          }}
          label="Display Image"
          required
          variant="outlined"
        />
        {showError && <div style={{ color: "red" }}>{error}</div>}
      </Box>
      <span style={{ textAlign: "left" }}>Article</span>
      {editorState && (
        <TextEditor
          editorState={editorState}
          required
          setEditorState={setEditorState}
          onChange={onChange}
          readOnly={false}
        />
      )}
      <Button onClick={onClick}>Submit</Button>
    </div>
  );
};

export default BlogEdit;
