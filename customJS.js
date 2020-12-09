window.addEventListener('message', function (eventData) {
    console.log("CHECKING FOR EVENT : SHIV");
    console.log(eventData);
    try {
        if (JSON.parse(eventData.data)) {
            let event = JSON.parse(eventData.data);
            console.log(event)
            if (event.event_code === 'custom-event') {
                iframe = document.getElementById('ymIframeId');
                var eventData = event.data.data;
                console.log(eventData);
                switch (event.data.code) {
                    case "otp":
                        console.log("Within event block");
                        console.log(event.data)

                        var sourceFrame = null; // this is the IFRAME which send the postMessage

                        setTimeout(() => {
                            // window.top.postMessage('hello', '*');    
                            // myiframe.postMessage('hello', '*');
                            // myiframe.contentWindow.postMessage('otp', '*');
                            let myiframe = window.frames['ymIframe'].document.getElementById('webviewId')
                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'hello', data: JSON.stringify({
                                    event: {
                                        code: "personalinfo",
                                        data: 'Hi there user'
                                    }
                                })
                            }), '*');
                        }, 2000);

                        return;
                    case "surveryResponse":
                        setTimeout(() => {
                            let myiframe = window.frames['ymIframe'].document.getElementById('webviewId')

                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'surveryResponse', data:
                                    event.data.data
                            }), '*');
                        }, 2000);
                        return;
                    case "validationResponse":
                        console.log("validate otp custom JS")

                        let sourceIframe = 'webviewAccidentId';

                        switch (event.data.data.source)
                        {
                            case 'Illness':
                                sourceIframe = "webviewIllnessId";
                                break;
                            case 'Death':
                                sourceIframe = "webviewDeathId";
                                break;
                            default:
                                sourceIframe = sourceIframe;
                                break;
                        }
                         

                        setTimeout(() => {
                            let myiframe = window.frames['ymIframe'].document.getElementById(sourceIframe)

                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'validationResponse', data:
                                    event.data.data
                            }), '*');
                        }, 2000);
                        return;
                    case "resetResponse":
                        console.log("reset custom JS")
                        setTimeout(() => {
                            let myiframe = window.frames['ymIframe'].document.getElementById('webviewAccidentId')

                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'resetResponse', data:
                                    event.data.data
                            }), '*');
                        }, 2000);
                        return;

                    default:
                        console.log('No event handler defined for ' + event.data.code);
                        return;
                }
            }
        }

    } catch (error) {
        return;
    }
}, false);