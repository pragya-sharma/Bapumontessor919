$(document).ready(function () {
  $.validator.addMethod(
    "customphone",
    function (value, element) {
      return this.optional(element) || /^[0-9 +-]+$/.test(value);
    },
    "Please enter a valid phone number"
  );

  $("#contact-form").validate({
    rules: {
      name: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      subject: {
        required: true,
      },
      phone: {
        required: true,
        minlength: 10,
        customphone: true,
      },
      message: {
        required: true,
      },
    },
    submitHandler: function (form) {
      $.ajax({
        url: "codepages/save.php",
        type: "POST",
        data: $("#contact-form").serialize() + "&act=save_data",
        cache: false,
        dataType: "json",
        success: function (dataResult) {
          if (dataResult["statusCode"] == 200) {
            swal("Thank You", "We will contacty you sortly!");

            $("#contact-form")[0].reset();
          } else {
            swal("Error", "Something went wrong, please try again");
          }
        },
        error: function (jqXHR, exception) {
          var msg = "";
          if (jqXHR.status === 0) {
            msg = "Not connect.\n Verify Network.";
          } else if (jqXHR.status == 404) {
            msg = "Requested page not found. [404]";
          } else if (jqXHR.status == 500) {
            msg = "Internal Server Error [500].";
          } else if (exception === "parsererror") {
            msg = "Requested JSON parse failed.";
          } else if (exception === "timeout") {
            msg = "Time out error.";
          } else if (exception === "abort") {
            msg = "Ajax request aborted.";
          } else {
            msg = "Uncaught Error.\n" + jqXHR.responseText;
          }
          swal("Error", msg);
        },
      });
      return false;
    },
  });
});
