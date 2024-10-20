// Initialize CodeMirror editor with default mode (JavaScript) and auto-close brackets
var editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
    mode: "javascript",
    theme: "material-darker",
    lineNumbers: true,
    tabSize: 2,
    indentWithTabs: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    resizeHandle: true,
    extraKeys: { "Ctrl-Space": "autocomplete" } // Enable autocomplete on Ctrl-Space
});

// Function to switch editor mode based on selected language
document.addEventListener('DOMContentLoaded', function () {
    // Get the language selector and set the mode to the preselected value
    var languageSelector = document.getElementById('language-selector');
    var language = languageSelector.value;
    var mode = 'python';  // Set the default mode to Python

    // Set CodeMirror mode based on selected language (on load and on change)
    function setEditorMode(language) {
        switch (language) {
            case 'javascript':
                mode = 'javascript';
                break;
            case 'html':
                mode = 'htmlmixed';
                break;
            case 'css':
                mode = 'css';
                break;
            case 'python':
                mode = 'python';
                break;
            case 'php':
                mode = 'php';
                break;
            default:
                mode = 'javascript';  // Default to JavaScript
                break;
        }
        // Set the new mode for CodeMirror
        editor.setOption('mode', mode);
        document.getElementById('language-name').textContent = language
    }

    // Trigger mode setting for the initial preselected language (Python)
    setEditorMode(language);

    // Listen for changes in the dropdown and update the CodeMirror mode
    languageSelector.addEventListener('change', function () {
        setEditorMode(this.value);
    });
});