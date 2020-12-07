window.addEventListener('message', function(eventData) {
    console.log("CHECKING FOR EVENT : SHIV");
    console.log(eventData);
    try { 
        if (JSON.parse(eventData.data)) {
            let event = JSON.parse(eventData.data);
            //  if (event.event_code === "custom-event" && event.data && event.data.code === "otp") {
            //     jQuery.post('/cart/add.js', {
            //         items: event.data.data
            //     });
            //     return;
            // }
            // else if (event.event_code === "custom-event" && event.data && event.data.code === "submitClaim") {
            //     jQuery.post('/cart/update.js', {
            //       updates:event.data.data
            //     });
            //     return;
            // }
            // else{
            //     return;
            // }

            console.log(event)
            if (event.event_code === 'custom-event') {
                iframe = document.getElementById('ymIframeId');
                var eventData = event.data.data;
                console.log(eventData);
                switch (event.data.code) {
                    case "otp":
                        console.log("Within event block");
                        console.log(event.data)
                        // var myWindow = window.open(event.data.data, "new window", "height=500, width=500, top=400, left=400");
                        // window.top.postMessage('hello', '*')
                        setTimeout(() => {
                            window.top.postMessage(JSON.stringify({
                                event_code: 'otp', data: "OTP MSG"
                              }), '*');    
                        }, 2000);
                        
                        return;
                    case "pdf_download":
                        var name = eventData.doc_name;
                        var byteArray = convertToByteArray(eventData.body);
                        saveByteArray([byteArray], name + ".pdf");
                        return;
                    case "multiple_pdfs_download":
                        for (let index = 0; index < eventData.body.length; index++) {
                            var name = eventData.body[index].doc_name;
                            var byteArray = convertToByteArray(eventData.body[index].body);
                            saveByteArray([byteArray], name + ".pdf");    
                        }
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