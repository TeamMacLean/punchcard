import $ from 'jquery';
import showdown from 'showdown';
import marked from 'marked';
import moment from 'moment'

window.marked = marked;
window.moment = moment;

$(function () {

    const preview = $('#preview');
    const editor = $('#editor');

    function reload() {

        const text = editor.val() || "# New Document";
        const target = preview;
        const converter = new showdown.Converter({requireSpaceBeforeHeadingText:true});
        target.html(converter.makeHtml(text));
        console.log('reloading', target.innerHTML);
    }

    if (editor && editor.length && preview && preview.length) {
        editor.on('keyup paste', reload);
        reload();
    }
});