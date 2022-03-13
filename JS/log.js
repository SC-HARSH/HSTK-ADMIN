var error = "";

function check() {
  document.getElementById("error-form").innerHTML = "";
  if (document.getElementById("email-int").value == "") {
    error =
      '<div class="alert alert-danger"><strong>Error!</strong> Email Input Is Empty.</div>';
    document.getElementById("error-form").innerHTML += error;
  }
  if (document.getElementById("password-int").value == "") {
    error =
      '<div class="alert alert-danger"><strong>Error!</strong> Password Input Is Empty.</div>';
    document.getElementById("error-form").innerHTML += error;
  }
  if (
    !document.getElementById("email-int").value == "" &&
    !document.getElementById("password-int").value == ""
  ) {
    if (document.getElementById("email-int").value == "support@hstk.ml") {
      if (document.getElementById("password-int").value == "hstkiscoolenough") {
        localStorage.setItem("email", "support@hstk.ml");
        localStorage.setItem("password", "hstkiscoolenough");
        localStorage.setItem("log", "true");
        window.location = "index.html";
      } else {
        error =
          '<div class="alert alert-danger"><strong>Error!</strong> Wrong Password</div>';
        document.getElementById("error-form").innerHTML += error;
      }
    } else {
      error =
        '<div class="alert alert-danger"><strong>Error!</strong> Wrong Email</div>';
      document.getElementById("error-form").innerHTML += error;
    }
  }
  if (!document.getElementById("email-int").value == "support@hstk.ml") {
    error =
      '<div class="alert alert-danger"><strong>Error!</strong> Wrong Email</div>';
    document.getElementById("error-form").innerHTML += error;
  }
}

function autoEverything() {
  if(localStorage.getItem("log")=="true"){
    document.getElementById("email-int").value = localStorage.getItem("email");
    document.getElementById("password-int").value =
      localStorage.getItem("password");
      check();
  }
}