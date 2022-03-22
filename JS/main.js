// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE9TzLvkTyM-EptQc3c2Ane2g8RL3-MVU",
  authDomain: "hstk-8f4d7.firebaseapp.com",
  databaseURL: "https://hstk-8f4d7-default-rtdb.firebaseio.com",
  projectId: "hstk-8f4d7",
  storageBucket: "hstk-8f4d7.appspot.com",
  messagingSenderId: "526012939431",
  appId: "1:526012939431:web:04eb4c753fd12c7c756f82",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Make stuff easy
const database = firebase.database();
urlNameOfImage = "";

var WhatEdit = document.getElementById("changeWebsiteGroup").value;
function logCheck() {
  if (localStorage.getItem("log") == "true") {
    if (localStorage.getItem("email") == "support@hstk.ml") {
      if (localStorage.getItem("password") == "hstkiscoolenough") {
        var email = localStorage.getItem("email");
        console.log(email);
        document.getElementById("navbarDropdown").innerHTML =
          '<i class="fas fa-user me-2"></i>' + email;
        emailShow();
        deliveryShow();
        changeValue();
      } else {
        window.location = "log.html";
      }
    } else {
      window.location = "log.html";
    }
  } else {
    window.location = "log.html";
  }
}

function logout() {
  localStorage.setItem("log", "false");
  localStorage.removeItem("email");
  localStorage.removeItem("password");
  window.location = "log.html";
  console.warn("You just log out");
}

function websiteShow(valueOf) {
  console.log(valueOf);
  var WhatEdit = valueOf;
  console.log(WhatEdit);
  url = "https://www.hstk.ml/" + valueOf + ".html";
  console.log(url);
  document.getElementById("iframe").src = url;
}

function onClickOfPlusButton() {
  document.getElementById("fileUpload").click();
}

function uploadTimeData() {
  WhatEdit = document.getElementById("changeWebsiteGroup").value;
  console.log("Click On The Button");
  imageOfCloth = document.getElementById("fileUpload");
  codeOfCloth = document.getElementById("codeOfTheCloth").value;
  descriptionOfCloth = document.getElementById("descriptionOfTheCloth").value;
  nameOfCloth = document.getElementById("nameOfTheCloth").value;
  console.log(codeOfCloth, descriptionOfCloth, nameOfCloth);
  if (
    (!nameOfCloth == "") &
    (!codeOfCloth == "") &
    (!descriptionOfCloth == "") &
    (!document.getElementById("fileUpload").value == "")
  ) {
    ref = firebase.storage().ref();
    file = document.querySelector("#fileUpload").files[0];
    nameOfImage = codeOfCloth;
    metadata = {
      contentType: file.type,
    };

    task = ref.child(nameOfImage).put(file, metadata);
    task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        urlNameOfImage = url;
        console.log(url);
        document.getElementById("codeOfTheCloth").value = "";
      document.getElementById("descriptionOfTheCloth").value = "";
      document.getElementById("nameOfTheCloth").value = "";
      document.getElementById("fileUpload").value == "";
      console.log("Everything Is Filled");
      database.ref("HTML/" + WhatEdit + "/" + codeOfCloth).set({
        name: nameOfCloth,
        code: codeOfCloth,
        description: descriptionOfCloth,
        url: urlNameOfImage,
      });
      console.log("Uploaded Something");
      alert("Data Saved To The Server");
      localStorage.setItem("Code",document.getElementById("changeWebsiteGroup").value)
      window.location="./edit.html"
      });
  } else {
    console.log("Something Is Not Filled");
    window.alert("Something Is Not Filled");
  }
}

function deleteHtml() {
  firebase
    .database()
    .ref(
      "HTML/" +
        document.getElementById("changeWebsiteGroup").value +
        "/" +
        document.getElementById("whatToDelete").value
    )
    .remove();
  window.alert("Deleted", document.getElementById("whatToDelete").value);
  document.getElementById("whatToDelete").value = "";
  console.log("Deleted");
}

window.onload(emailShow());

function emailShow() {
  console.log(window.location);
  if(window.location.href=="https://sc-harsh.github.io/HSTK-ADMIN/" || window.location.href=="https://sc-harsh.github.io/HSTK-ADMIN"){
     window.location = "https://sc-harsh.github.io/HSTK-ADMIN/index.html"
  }
  if (window.location.href == "https://sc-harsh.github.io/HSTK-ADMIN/index.html") {
    document.getElementById("outputEmail").innerHTML = "";
    firebase
      .database()
      .ref("EMAIL")
      .once("value", function (snapshot) {
        snapshot.forEach(function (ChildSnapshot) {
          let emailStart = ChildSnapshot.val().emailStart;
          let emailEnd = ChildSnapshot.val().emailEnd;
          let email = emailStart + "@" + emailEnd;
          document.getElementById("outputEmail").innerHTML +=
            "<tr><td>" + email + "</td></tr>";
          console.log(email);
        });
      });
  }
}

function deliveryShow() {
  if (window.location.href == "https://sc-harsh.github.io/HSTK-ADMIN/delivery.html") {
    document.getElementById("outputDelivery").innerHTML = "";
    firebase
      .database()
      .ref("DELIVERY/emailDelivery")
      .once("value", function (snapshot) {
        snapshot.forEach(function (ChildSnapshot) {
          let emailStart = ChildSnapshot.val().emailStart;
          let emailEnd = ChildSnapshot.val().emailEnd;
          let email = emailStart + "@" + emailEnd;
          let code = ChildSnapshot.val().code;
          let time = ChildSnapshot.val().time;
          document.getElementById("outputDelivery").innerHTML +=
            "<tr id='"+ChildSnapshot.key+'-tr'+"'><td>" +
            email +
            "</td><td>" +
            code +
            "</td><td>" +
            time +
            "</td><td><button class='btn btn-danger' id='"+ChildSnapshot.key+"' onclick='deliveryDelete(this.id)'>Completed</button></td></tr>";
          console.log(email);
          console.log(ChildSnapshot.key);
        });
      });
  }
}

function deliveryDelete(keyOfTheButton) {
  console.log(keyOfTheButton)
  firebase.database().ref("DELIVERY/emailDelivery/"+keyOfTheButton).remove();
  document.getElementById(keyOfTheButton+"-tr").remove();
}


function changeValue(){
  if (window.location.href == "https://sc-harsh.github.io/HSTK-ADMIN/delivery.html" || window.location.href=="https://sc-harsh.github.io/HSTK-ADMIN/delivery") {
    document.getElementById("changeWebsiteGroup").value = localStorage.getItem("Code")
  }
}
