window.addEventListener('message', function(eventData) {
    console.log("CHECKING FOR EVENT : SHIV");
    console.log(eventData);
    try { 
        if (JSON.parse(eventData.data)) {
            let event = JSON.parse(eventData.data);
             if (event.event_code === "custom-event" && event.data && event.data.code === "otp") {
                jQuery.post('/cart/add.js', {
                    items: event.data.data
                });
                return;
            }
            else if (event.event_code === "custom-event" && event.data && event.data.code === "submitClaim") {
                jQuery.post('/cart/update.js', {
                  updates:event.data.data
                });
                return;
            }
            else{
                return;
            }
         }
    } catch (error) {
        return;
    }
}, false);