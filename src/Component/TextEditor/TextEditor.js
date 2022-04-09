import React, { useState } from "react";
import {
  Editor,
  RichUtils,
  getDefaultKeyBinding,
  AtomicBlockUtils,
} from "draft-js";
import { getSelectedBlocksMetadata, setBlockData } from "draftjs-utils";
import "draft-js/dist/Draft.css";
import "./TextEditor.css";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import {handlePastedText} from "../../utils/handlePastedTextUtil";
import ImageIcon from "@material-ui/icons/Image";
const StyleButton = (props) => {
  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = "RichEditor-styleButton";
  if (props.active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};

const StyledIcon = (props) => {
  const onChangeAlignment = () => {
    props.onChangeAlignment(props.Style);
  };

  let className = "RichEditor-styleButton";
  if (props.active) {
    className += " RichEditor-activeButton";
  }
  return (
    <span onClick={onChangeAlignment} className={className}>
      {props.label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

var ALIGN_STYLES = [
  { Style: "left", label: <FormatAlignLeftIcon /> },
  { Style: "right", label: <FormatAlignRightIcon /> },
  { Style: "center", label: <FormatAlignCenterIcon /> },
  { Style: "justify", label: <FormatAlignJustifyIcon /> },
];

const InlineAlignControls = (props) => {
  return (
    <div className="RichEditor-controls">
      {ALIGN_STYLES.map((type, index) => (
        <StyledIcon
          key={index}
          label={type.label}
          onToggle={props.onToggle}
          Style={type.Style}
          onChangeAlignment={props.onChangeAlignment}
        />
      ))}
    </div>
  );
};
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const TextEditor = ({ editorState, readOnly, onChange }) => {
  const [alignment, setAlignment] = useState(
    getSelectedBlocksMetadata(editorState).get("text-align")
  );
  const [url, setUrl] = useState("");
  const [showImage, setShowImage] = useState(false);
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };
  function handlePastedTextfn(text, html) {
    if (handlePastedText) {
      return handlePastedText(text, html, editorState, onChange);
      return false;
    }
  }
  function onChangeAlignment(value) {
    if (alignment !== value) {
      onChange(setBlockData(editorState, { "text-align": value }));
    } else {
      onChange(setBlockData(editorState, { "text-align": "left" }));
    }
  }
  function mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  function toggleBlockType(blockType) {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  }

  function toggleInlineStyle(inlineStyle) {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  const confirmMedia = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const source = { url };
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: source }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      " "
    );
    onChange(newEditorState);
  };
  const onURLInputKeyDown = (e) => {
    if (e.which === 13) {
      confirmMedia(e);
    }
  };

  function getBlockStyle(block) {
    if (block.getType() === "blockquote") {
      return "RichEditor-blockquote";
    }
    const blockAlignment = block.getData() && block.getData().get("text-align");

    if (blockAlignment) {
      return `rdw-${blockAlignment}-aligned-block`;
    }
    return "";
  }
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

  let className = "RichEditor-editor";
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <InlineAlignControls
        editorState={editorState}
        onChangeAlignment={onChangeAlignment}
      />
      <ImageIcon onClick={() => setShowImage(!showImage)} />
      {showImage && (
        <div style={{ marginBottom: 10 }}>
          <input
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            style={{
              fontFamily: "'Georgia', serif",
              marginRight: 10,
              padding: 3,
            }}
            type="text"
            value={url}
            onKeyDown={onURLInputKeyDown}
          />
          <button onMouseDown={confirmMedia}>Add</button>
        </div>
      )}
      <div className={className}>
        <Editor
          blockStyleFn={getBlockStyle}
          blockRendererFn={getBlockRendererFunction}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onChange}
          placeholder="Tell a story..."
          spellCheck={true}
          handlePastedText={handlePastedTextfn}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default TextEditor;
