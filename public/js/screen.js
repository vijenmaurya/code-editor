// Get the query string from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the 'screen' parameter
const screenParam = urlParams.get('screen', 'code-screen');

// Function to show/hide the correct screen based on query parameter
function showEditorScreen(screen) {
    const outerEditorDiv = document.getElementById('editorContainer');
    const codeEditorDiv = document.getElementById('code-screen');
    const textEditorDiv = document.getElementById('text-screen');
    const languageEditorDiv = document.getElementById('language-select');
    const formatEditorDiv = document.getElementById('format-code');

    if (screen === 'code-screen') {
        codeEditorDiv.style.display = 'block';
        languageEditorDiv.style.display = 'block';
        formatEditorDiv.style.display = 'block';
        textEditorDiv.style.display = 'none';
        outerEditorDiv.classList.add('code');
    } else if (screen === 'text-screen') {
        codeEditorDiv.style.display = 'none';
        languageEditorDiv.style.display = 'none';
        formatEditorDiv.style.display = 'none';
        textEditorDiv.style.display = 'block';
        outerEditorDiv.classList.add('text');
        editorTextLoad();
    } else {
        // Default behavior if no valid query param is present
        codeEditorDiv.style.display = 'none';
        textEditorDiv.style.display = 'none';
        languageEditorDiv.style.display = 'none';
        formatEditorDiv.style.display = 'none';
        console.log('No valid screen parameter found.');
    }
}

// Call the function with the screen parameter from the URL
showEditorScreen(screenParam);

const screenWidthSlider = document.getElementById('screen-width');
const screenWidthDisplay = document.getElementById('screen-width-value');

// Listen to slider input events
screenWidthSlider.addEventListener('input', function () {
    const screenWidth = screenWidthSlider.value;

    // Update the displayed value
    screenWidthDisplay.textContent = screenWidth;

    // Update the CSS variable in :root dynamically
    document.documentElement.style.setProperty('--post-width', screenWidth + 'rem');
});


const screenBackgroundSlider = document.getElementById('screen-background');
const screenBackgroundDisplay = document.getElementById('screen-background-value');

// Listen to slider input events
screenBackgroundSlider.addEventListener('input', function () {
    const screenBackground = screenBackgroundSlider.value;

    // Update the displayed value
    screenBackgroundDisplay.textContent = screenBackground;

    // Update the CSS variable in :root dynamically
    document.documentElement.style.setProperty('--post-background', screenBackground);
});

function openEditTheme() {
    const editorOptions = document.getElementById('fixed-editor-options');
    const selectorOptions = document.getElementById('screen-selector');

    if (editorOptions.style.display === 'flex') {
        editorOptions.style.display = 'none';
        selectorOptions.style.display = 'flex';
    } else {
        editorOptions.style.display = 'flex';
        selectorOptions.style.display = 'none';
    }
}

function editorTextLoad() {
    const editor = document.getElementById('text-screen');
    editor.addEventListener('blur', function() {
        console.log('Focus lost from content-editable div');
    });

    editor.focus();  
    placeCaretAtEnd(editor);
}

window.onload = function() {
    const editor = document.getElementById('text-screen');
    editor.addEventListener('blur', function() {
        console.log('Focus lost from content-editable div');
    });

    editor.focus();  
    placeCaretAtEnd(editor);

    // Add keyboard shortcuts for text formatting
    editor.addEventListener('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            if (event.key === 'b') { // Bold
                event.preventDefault();
                document.execCommand('bold');
            } else if (event.key === 'i') { // Italic
                event.preventDefault();
                document.execCommand('italic');
            } else if (event.key === 'u') { // Underline
                event.preventDefault();
                document.execCommand('underline');
            } else if (event.key === 'ArrowUp' && event.shiftKey) { // Increase Font Size
                event.preventDefault();
                changeFontSize(editor, 'larger');
            } else if (event.key === 'ArrowDown' && event.shiftKey) { // Decrease Font Size
                event.preventDefault();
                changeFontSize(editor, 'smaller');
            } else if (event.key === 'U' && event.shiftKey) { // Unordered List
                event.preventDefault();
                document.execCommand('insertUnorderedList');
            } else if (event.key === 'O' && event.shiftKey) { // Ordered List
                event.preventDefault();
                document.execCommand('insertOrderedList');
            }
        }
    });
};

// Function to change font size
function changeFontSize(editor, size) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText) {
        const span = document.createElement('span');
        span.style.fontSize = size; // 'larger' or 'smaller'
        span.textContent = selectedText;

        range.deleteContents(); // Remove the selected text
        range.insertNode(span); // Insert the new span with changed font size
        range.setStartAfter(span); // Move the cursor after the new span
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

// Function to place the cursor at the end of the content
function placeCaretAtEnd(el) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false); // Collapse the range to the end
    selection.removeAllRanges();
    selection.addRange(range);
}