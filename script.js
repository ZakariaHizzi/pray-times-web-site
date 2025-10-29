var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();
function gettimepray() {
  document.getElementById("city").innerHTML = "مكة";
  fetch(
    "https://api.aladhan.com/v1/timingsByAddress/" +
      day +
      "-" +
      month +
      "-" +
      year +
      "?address=مكة"
  )
    .then((response) => response.json())
    .then((pray) => {
      console.log(pray);
      var get = pray.data.timings;
      var day =
        pray.data.date.hijri.weekday.ar +
        " " +
        pray.data.date.hijri.day +
        " " +
        pray.data.date.hijri.month.ar +
        " " +
        pray.data.date.hijri.year;
      document.getElementById("date").innerHTML = day;
      function gettime(nameofpray, id) {
        document.getElementById(id).innerHTML = nameofpray;
      }
      gettime(get.Fajr, "Fajr");
      gettime(get.Sunrise, "Sunrise");
      gettime(get.Dhuhr, "Dhuhr");
      gettime(get.Asr, "Asr");
      gettime(get.Maghrib, "Maghrib");
      gettime(get.Isha, "Isha");
    });
}
gettimepray();

gettimepray();
document.getElementById("btn").addEventListener("click", function () {
  var city = document.getElementById("shearch").value;
  fetch(
    "https://api.aladhan.com/v1/timingsByAddress/" +
      day +
      "-" +
      month +
      "-" +
      year +
      "?address=" +
      city
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return alert("صحح اسم المدينة");
      }
    })
    .then((pray) => {
      var get = pray.data.timings;
      console.log(pray.data.meta.method.name);
      function gettime(nameofpray, id) {
        document.getElementById(id).innerHTML = nameofpray;
      }
      if (city == null) {
      } else {
        document.getElementById("city").innerHTML = "   ";
        document.getElementById("city").innerHTML = `${city}`;
        gettime(get.Fajr, "Fajr");
        gettime(get.Sunrise, "Sunrise");
        gettime(get.Dhuhr, "Dhuhr");
        gettime(get.Asr, "Asr");
        gettime(get.Maghrib, "Maghrib");
        gettime(get.Isha, "Isha");
        document.getElementById("shearch").value = "";
      }
    });
});
