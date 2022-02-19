import React, { useEffect, useState } from "react";
import { EditorState, Editor, convertFromRaw } from "draft-js";
import "./BlogView.css";

const BlogView = ({ blog }) => {
  useEffect(() => {
    if (blog.blog_content) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(blog.blog_content))
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
