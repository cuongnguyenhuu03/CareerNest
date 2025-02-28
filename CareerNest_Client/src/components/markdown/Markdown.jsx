import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

// Initialize a markdown parser
const mdParser = new MarkdownIt();
const Markdown = (props) => {

    // onChange
    function handleEditorChange({ html, text }) {
        // console.log('handleEditorChange', html, text);
    }

    return (
        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
    );
};

export default Markdown;