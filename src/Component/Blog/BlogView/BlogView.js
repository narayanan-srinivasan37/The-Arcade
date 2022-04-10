import React, { useEffect, useState } from "react";
import { EditorState, Editor, convertFromRaw } from "draft-js";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./BlogView.css";
const BlogView = ({ blog }) => {
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (blog.blog_content) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(blog.blog_content)))
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [blog]);
  const [editorState, setEditorState] = useState();
  function getBlockRendererFunction(block) {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false,
      };
    }

    return null;
  }

  const Media = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();
    return (
      <img
        src={src.url}
        style={{
          width: "100%",
          whiteSpace: "initial",
        }}
        alt="image"
      />
    );
  };

  return (
    <div style={{ paddingTop: "1rem", maxWidth: "100%" }}>
      {auth.isAuthenticated &&
        auth.user.roles === "admin" &&
        blog.user_id === auth.user_id && (
          <div
            className="edit-button"
            onClick={() => navigate(`/blog/${blog.id}/edit`)}
          >
            <span>
              <AiFillEdit />
            </span>
            <span className="edit-text">&nbsp;Edit</span>
          </div>
        )}
      <h2 style={{ textAlign: "center" }}>{blog.title}</h2>
      {editorState && (
        <div className="RichEditor-editor">
          <Editor
            editorState={editorState}
            blockRendererFn={getBlockRendererFunction}
            readOnly={true}
          />
        </div>
      )}
    </div>
  );
};

export default BlogView;
