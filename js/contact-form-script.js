    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // Handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            // Prevent the default form submission
            event.preventDefault();
            // Create an object with form values
            var formData = {
                "your_name": $("#name").val(),
                "Email": $("#email").val(),
                "Phone_number": $("input[name='Phone_number']").val(),
                "Message": $("#message").val()
            };
            // Send the data to the Google Apps Script using fetch
            sendDataToGoogleAppsScript(formData);
        }
    });


    function sendDataToGoogleAppsScript(formData) {fetch('https://script.google.com/macros/s/AKfycbxXEsxA8MkZpe5siICRG0oHryLmpjotMrM8FEiI-jJl5KbYxVAs32koX-cW90KovWUUvQ/exec', {
        redirect: "follow",
        method: 'POST',
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            formSuccess();
        } else {
            formError();
            submitMSG(false, data.message);
        }
    })
    .catch(error => {
        formError();
        submitMSG(false, 'An error occurred while submitting the form.');
        console.error(error);
    });

    }

    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!")
        $("#success-message").show();
    }

    function formError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg) {
        var msgClasses = valid ? "h3 text-center tada animated text-success" : "h3 text-center text-danger";
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
