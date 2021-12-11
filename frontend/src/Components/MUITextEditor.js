import React, { useState } from 'react'
import { convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import MUIRichTextEditor from "mui-rte";

import { ThemeProvider } from '@material-ui/styles';

import { stateToHTML } from 'draft-js-export-html';
import { makeStylesGlobal } from '../theme/GlobalTheme';


const MuiTextEditor = ({ onChange, value, isShort }) => {

    const contentHTML = convertFromHTML(value ? value : "")
    const initialState = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap)

    const [content] = useState(JSON.stringify(convertToRaw(initialState)))

    const handleChange = (editorState) => {
        const html = stateToHTML(editorState.getCurrentContent())
        onChange(html)
    }


    const localTheme = {
        overrides: {
            MUIRichTextEditor: {
                root: {
                    height: isShort ? "10rem" : "15rem",
                    border: "1px solid rgba(224, 224, 224, 0.9)",
                },
                editorContainer: {
                    height: "90%",
                    paddingBottom: "18px",
                    overflowX: "auto",
                    overflowY: "auto",
                },
                container: {
                    height: "90%",
                },
                editor: {
                    height: "calc(100% - 48px)",
                    paddingRight: "18px",
                    paddingLeft:"18px"
                },
                placeHolder: {
                    paddingLeft: "18px"
                }
            }
        },
        
    };

    const localStyle = makeStylesGlobal((theme) => ({
        invisibleInputToTriggerFocus: {
            position: "absolute", 
            zIndex: -999
        },
    }));
    const muiEditorRef = React.createRef();
    const classes = localStyle();


    return (
        <>
            <ThemeProvider theme={localTheme}>
                <input className={classes.invisibleInputToTriggerFocus} onKeyUp={e => muiEditorRef.current.focus()}/>
                <MUIRichTextEditor
                    value={content}
                    label="Start writing some content here..."
                    controls={["title", "bold", "normal", "underline", "link", "undo", "redo"]}
                    id={"mui-rte"}
                    onChange={handleChange}
                    inlineToolbar={false}
                    ref={muiEditorRef}
                />
            </ThemeProvider>
        </>
    )
}

export default MuiTextEditor;
