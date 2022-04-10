import React, { useState } from "react";
import { EditorState, convertFromHTML, convertToRaw } from "draft-js";
import { Button } from "@mui/material";
import TextEditor from "../../TextEditor/TextEditor";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./CreateBlog.css";
import { postABlog} from "../../../API_CALLS/Blog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThirtyFpsOutlined } from "@mui/icons-material";
const CreateBlog = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [blogTitle, setBlogTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate()
  const onChange = (editor) => {
    setEditorState(editor);
  };
  const onClick = async () => {
  try{  const content = editorState.getCurrentContent();
    const convert = convertToRaw(content);
    if (blogTitle.length === 0 || description.length === 0) {
      setShowError(true);
    }

    await postABlog({
      description: description,
      content: convert,
      title: blogTitle,
      displayImage: displayImage,
    });
   navigate("/blog")
  }
    catch(err)
    {
      setShowError(true)
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
          onChange={(e) => {
            setDescription(e.target.value);
            if (e.target.value.length > 0) setError(false);
          }}
          label="Description"
          required
          multiline
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
          aria-label="enter image url"
          variant="outlined"
        />
        {showError && <div style={{ color: "red" }}>{error}</div>}
      </Box>
      <span style={{ textAlign: "left", paddingLeft: "1rem" }}>Article</span>
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

export default CreateBlog;
