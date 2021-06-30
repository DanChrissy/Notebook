import { useEffect, useState } from "react";
import styled, {css} from "styled-components";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '../../custom.css';

const WYSIWYG = ({onChange = () => {}, size = { height: 300}, content= ""}) => {
    const [wysiwygEditor, setWysiwygEditor] = useState();

    useEffect(() => {
        // get notes content
        if (wysiwygEditor) {
            console.log('Content: ', content);
            wysiwygEditor.setData(content);
        }
    }, [content])

    const handleData = (data) => {
        onChange(data);
    }

    console.log('Editor: ', wysiwygEditor);
    // TBD: Add plugins for toolbar items

    return (
        <EditorContainer size={size}>
            <CKEditor
                editor={ ClassicEditor }
                data="<p>Hello from CKEditor 5!</p>"
                size={size}
                config={{
                    toolbar: {
                        items: [
                            'heading', '|',
                            'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor','|',
                            'outdent', 'indent', 'alignment', '|',
                            'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                            'bulletedList', 'numberedList', 'todoList', '|',
                            'undo', 'redo',
                        ],
                        shouldNotGroupWhenFull: true
                    }
                }}
                onReady={ editor => {
                    setWysiwygEditor(editor);
                    editor.setData(content);
                    // handleSetData(editor);
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    handleData(data);
                    // console.log( { event, editor, data } );
                } }
                // onBlur={ ( event, editor ) => {
                //     console.log( 'Blur.', editor );
                // } }
                // onFocus={ ( event, editor ) => {
                //     console.log( 'Focus.', editor );
                // } }
            />
        </EditorContainer>
    )
}

export default WYSIWYG;

const EditorContainer = styled.div`
    width: 100%;

    /* .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
        background: pink;
        max-height: 10rem;
    } */

    .ck-editor__editable {
        height: ${props => `${(props.size.height || 200) - 10}px`};
        max-height: ${props => `${(props.size.height || 200) - 10}px`};
    }

`;