const express = require('express');
const app = express();
var port = process.env.PORT || 3000;
var BlockSDK = require('blocksdk');
if (window.self === window.top) {
	document.body.innerText = 'This application is for use in the Salesforce Marketing Cloud Content Builder Editor only.';
} else {

var sdk = new BlockSDK();
        sdk.getContent(function (content) {
            var test = document.getElementById('#editor-container').innerHTML;
            console.log('Inside 1st Test' + test);
            test.root.innerHTML = content;
    
            function saveText() {
                console.log('Inside 1st saveText');
                var html = test.root.innerHTML;
                sdk.setContent(html);
                console.log('Inside HTML' + html);
                sdk.setSuperContent('This is super content: ' + html);
    
                sdk.getData(function (data) {
                    console.log('Inside 1st getData');
                    var numberOfEdits = data.numberOfEdits || 0;
                    sdk.setData({
                        numberOfEdits: numberOfEdits + 1
                    });
                });
            }
            test.on('text-change', saveText);
        });
}
app.listen(port, () => { console.log(`App listening on port ${port}`) });
