//elements
const startBTN = document.querySelector("#start");
const stopBTN = document.querySelector("#stop");
const speakBTN = document.querySelector("#speak");
const time = document.querySelector("#time");
const bettery = document.querySelector("#bettery");
const internet = document.querySelector('#internet');
const audio = document.getElementById('turn_on'); 
const msgs = document.querySelector(".messages");

//create a new chat


document.querySelector("#start_jarvis_btn").addEventListener("click", () => {
  recognation.start();
})

//jarvis commands
let jarvisComs = []
jarvisComs.push("hi friday");
jarvisComs.push("what are your commands");
jarvisComs.push("close this - to close opened popups");
jarvisComs.push(
  "change my information - information regarding your acoounts and you"
);
jarvisComs.push("whats the weather or temperature");
jarvisComs.push("show the full weather report");
jarvisComs.push("are you there - to check fridays presence");
jarvisComs.push("shut down - stop voice recognition");
jarvisComs.push("open google");
jarvisComs.push('search for "your keywords" - to search on google ');
jarvisComs.push("open whatsapp");
jarvisComs.push("open youtube");
jarvisComs.push('play "your keywords" - to search on youtube ');
jarvisComs.push("close this youtube tab - to close opened youtube tab");
jarvisComs.push("open firebase");
jarvisComs.push("open netlify");
jarvisComs.push("open twitter");
jarvisComs.push("open my twitter profile");
jarvisComs.push("open instagram");
jarvisComs.push("open my instagram profile");
jarvisComs.push("open github");
jarvisComs.push("open my github profile");




//weather setup
function weather(location) {
  // Directly reference each element by id
  const locationElement = document.getElementById("location");
  const countryElement = document.getElementById("country");
  const weatherTElement = document.getElementById("weatherT");
  const weatherDElement = document.getElementById("weatherD");
  const weatherIconElement = document.getElementById("weatherIcon");
  const oTempElement = document.getElementById("oTemp");
  const feelLikeTempElement = document.getElementById("feelLikeTemp");
  const minTElement = document.getElementById("minT");
  const maxTElement = document.getElementById("maxT");

 
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;

  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);

      locationElement.textContent = "Location: " + data.name;
      countryElement.textContent = "Country: " + data.sys.country;
      weatherTElement.textContent = "Weather type: " + data.weather[0].main;
      weatherDElement.textContent =
        "Weather description: " + data.weather[0].description;
      weatherIconElement.src =
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"; // Set the icon
      oTempElement.textContent = "Original Temperature: " + ktc(data.main.temp);
      feelLikeTempElement.textContent =
        "Feels like: " + ktc(data.main.feels_like);
      minTElement.textContent = "Min temperature: " + ktc(data.main.temp_min);
      maxTElement.textContent = "Max temperature: " + ktc(data.main.temp_max);

      weatherStatement =
        "Sir, the weather in " +
        data.name +
        " is " +
        data.weather[0].description +
        " and the temperature feels like " +
        ktc(data.main.feels_like);
    } else {
      locationElement.textContent = "Weather Info Not Found";
    }
  };

  xhr.send();
}

function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}

//autojarvis
function autoJarvis() {
  setTimeout(() => {
    recognation.start();
    
  },1000);
}

// window.onload = () => {
//   audio.play();
//   audio.addEventListener("onend", () => {
//     setTimeout(() => {
//       autoJarvis();
//       readOut("Jarvis is ready") ;
//       if (localStorage.getItem("jarvis_setup") === null) {
//         readOut("Sir, please fillout the form first");
//       }
      
//     },200);
//   })

  //jarvis commads adding
  // jarvisComs.forEach((e) => {
  //   document.querySelector(".commands").innerHTML += `<p>#${e}</p><br/>`;
    
  // })



//}


//time setup
function updateTime(){
  let date = new Date();
let hrs = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
time.innerHTML = `${hrs}:${min}:${sec}`;

}

updateTime();

setInterval(updateTime, 1000);

//bettery setup
if ('getBattery' in navigator) {
  navigator.getBattery().then(function(battery) {
      function updateBatteryStatus() {
          bettery.textContent = `${Math.round(battery.level * 100)}%`;
      }

      updateBatteryStatus();

      battery.addEventListener('levelchange', updateBatteryStatus);

      // Update battery status every minute (6seconds)
      setInterval(updateBatteryStatus, 60000);
  });
} else {
  bettery.textContent = 'N/A';
}

//internet setup
function updateInternetStatus() {
  if (navigator.onLine) {
      internet.textContent = 'Online';
  } else {
      internet.textContent = 'Offline';
  }
}

window.addEventListener('online', updateInternetStatus);
window.addEventListener('offline', updateInternetStatus);
// Initial check
updateInternetStatus();





//create a new chat
function createMsg(who, msg){
  let newmsg = document.createElement("p");
  newmsg.innerText = msg;
  newmsg.setAttribute("class", who);
  msgs.appendChild(newmsg);

}
//jarvis setup
if (localStorage.getItem("jarvis_setup") !== null) {
  weather(JSON.parse(localStorage.getItem("jarvis_setup")).location)
}

//jarvis information setup
const setup = document.querySelector(".jarvis_setup");
setup.style.display = "none";
if (localStorage.getItem("jarvis_setup") === null) {
  setup.style.display = "block";
  setup.querySelector("#submitBTN").addEventListener("click", userInfo);
}

function userInfo() {
  let setupInfo = {
    name: setup.querySelectorAll("input")[0].value,
    bio: setup.querySelectorAll("input")[1].value,
    location: setup.querySelectorAll("input")[2].value,
    github: setup.querySelectorAll("input")[3].value,
    x: setup.querySelectorAll("input")[4].value,
    leetcode: setup.querySelectorAll("input")[5].value,
  };

  //console.log(setupInfo);    //for debug purposes

  let testArr = [];

  setup.querySelectorAll("input").forEach((e) => {
    testArr.push(e.value);
  });

  if (testArr.includes("")) {
    readOut("sir, please fill all the fields");
  } else {
    localStorage.clear();
    localStorage.setItem("jarvis_setup", JSON.stringify(setupInfo));
    setup.style.display = "none";
    weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
  }
}

//speech recognition set up
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognation = new SpeechRecognition();

//speech recognition start
recognation.onstart = () => {
  console.log("voice is activated, you can speak");
};

//speech recognition result
recognation.onresult = (event) => {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();
  console.log(transcript);
  let userdata = localStorage.getItem("jarvis_setup");
  createMsg("usermsg", transcript);

  if (transcript.includes("hello, jarvis.")) {
    readOut("hello sir");
  }
  if (transcript.includes("what are your commands?")) {
    readOut("my commands are");
    document.querySelector(".commands").style.display = "block";
    jarvisComs.forEach((e) => {
      document.querySelector(".commands").innerHTML += `<p>#${e}</p><br/>`;
      
    })
  }
  if (transcript.includes("close this.")) {
    readOut("closed sir");
    document.querySelector(".commands").style.display = "none";
    setup.style.display = "none";
    
  }
  
  if (transcript.includes("open youtube.")) {
    readOut("opening youtube,sir!");
    window.open("https://www.youtube.com/");
  }
  //search on youtubw
  if (transcript.includes("search video for")) {
    readOut("searching video on youtube");
    let search = transcript.split("search video for ")[1];
    window.open("https://www.youtube.com/results?search_query=" + search);
  }

  if (transcript.includes("open google.")) {
    readOut("opening google,sir!");
    window.open("https://www.google.com/");
  }
  //google search
  if (transcript.includes("search for")) {
    readOut("searching result");
    let search = transcript.split("search for ")[1];
    window.open("https://www.google.com/search?q=" + search);
  }
  if (transcript.includes("open facebook.")) {
    readOut("opening facebook,sir!");
    window.open("https://www.facebook.com/");
  }
  if (transcript.includes("open instagram.")) {
    readOut("opening instagram,sir!");
    window.open("https://www.instagram.com/");
  }
  if (transcript.includes("open twitter.")) {
    readOut("opening twitter,sir!");
    window.open("https://www.twitter.com/");
  }
  if (transcript.includes("open linkedin.")) {
    readOut("opening linkedin,sir!");
    window.open("https://www.linkedin.com/");
  }
  if (transcript.includes("open stackoverflow.")) {
    readOut("opening stackoverflow,sir!");
    window.open("https://www.stackoverflow.com/");
  }
  if (transcript.includes("open google maps.")) {
    readOut("opening google maps,sir!");
    window.open("https://www.googlemaps.com/");
  }
  if (transcript.includes("open whatsapp.")) {
    readOut("opening whatsapp,sir!");
    window.open("https://www.whatsapp.com/");
  }
  if (transcript.includes("open gmail.")) {
    readOut("opening gmail,sir!");
    window.open("https://www.gmail.com/");
  }
  if (transcript.includes("open amazon.")) {
    readOut("opening amazon,sir!");
    window.open("https://www.amazon.com/");
  }
  if (transcript.includes("open netflix.")) {
    readOut("opening netflix,sir!");
    window.open("https://www.netflix.com/");
  }

  //github
  if (transcript.includes("open github.")) {
    readOut("opening github,sir!");
    window.open("https://www.github.com/");
  }
  if (transcript.includes("open my github profile.")) {
    readOut("opening your github profile,sir!");
    window.open(`https://www.github.com/${JSON.parse(userdata).github}`);
  }

  //thankyou
  if (transcript.includes("thank you")) {
    readOut("you are welcome,sir!");
  }
};

//speech recognition end
recognation.onend = (event) => {
  console.log("voice ended");
};

//speech recognition continous
recognation.continuous = true;

startBTN.addEventListener("click", () => {
  recognation.start();
});

stopBTN.addEventListener("click", () => {
  recognation.stop();
});

//jarvis speech
function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  // different voices
  const allVoices = speechSynthesis.getVoices();
  speech.text = message;
  speech.voice = allVoices[1];
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
  console.log("speaking output");
  createMsg("jmsg", message);
}

//exaple
speakBTN.addEventListener("click", () => {
  readOut("hello! I hope you are doing well. how can i help you?");
});

//to change voice
//this function will override the default voice when the page loads
 window.onload = () => {
   readOut(" ");
 };

document.addEventListener("DOMContentLoaded", function () {
  let audio = document.getElementById("turn_on"); // Matches the audio tag in your HTML
  let startButton = document.getElementById("start_jarvis_btn"); // The Jarvis start button

  // Attempt to play audio immediately
  let playPromise = audio.play();

  if (playPromise !== undefined) {
      playPromise.then(() => {
          console.log("Audio autoplayed!");
      }).catch(() => {
          console.log("Autoplay blocked. Waiting for user interaction...");

          // Play audio when the user clicks the start button
          startButton.addEventListener("click", function () {
              audio.play();
              console.log("Audio played after user clicked!");
          }, { once: true });
      });
  }
});
