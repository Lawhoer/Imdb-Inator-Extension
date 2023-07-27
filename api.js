document.getElementById('button').addEventListener('click', fetchDataFromApi);

// Sunucuya on bellek istegi yolluyoruz
function UpdateCache(){
  fetch('http://localhost:3000/cache',{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
  }
  })
  .then(res => res.json())
  .then(res => {

var links = document.querySelectorAll('.card a');
var poster = document.querySelectorAll('.card img');

// ilk basta slider-2 resimlerini yerine koyuyoruz on bellekteki
for (let i = 0; i < res.length; i++) {
  poster[i].src = res[i].poster;
}

// Eger resimlere tiklanirsa filmin bilgilerini gostericegi ekrani hazirlama islemi
links.forEach(link => {
  link.addEventListener('click', (event) => {
    // Tiklanilan resmin onbellekteki hangi array indexi oldugunu buluyoruz
    var temp;
    for (let i = 0; i < res.length; i++) {
      if(res[i].poster==event.currentTarget.querySelector('img').src){
        temp=res[i];
      }
    }
    // Buldugumuz indexteki json bilgilerini logic()'e yolluyoruz ki ekrana yazdirsin
    // Sonrasinda acilicak kapanicak ekrani da toggleVisibility() ile ayarliyoruz
    logic(temp);
    toggleVisibility();
  })})
})}

// Extension baslatıldıgında sunucudaki onbellek verilerini de cekiyoruz
UpdateCache();

// Genel film bilgilerini aldigimiz yer
function fetchDataFromApi() {
  // Form objesine girdigimiz film adini aliyoruz
  var movieName = document.getElementById("form").value;
  
  // Bos ise uyari veriyoruz dolu ise isleme devam ediyoruz ve animasyon giriyor devreye biraz gecikmeyle de bir iki mekan acilip kapaniyor
  if (movieName == "") {
    alert("Lütfen geçerli bir değer giriniz!");
    return;
  }
  else{
    // Acilis ilk animasyon
    startAnimation(0.6,0.2);
    setTimeout(function(){
      toggleVisibility();
    }, 600);
  }

  // Sunucuya filmin adini yollayip response bekliyoruz
  fetch('http://localhost:3000/cache/'+ movieName,{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
  }
  })
  // Gelen respons'u json'a cevirip veriyi logic() fonksiyonuna gönderiyoruz ki ekrana yazdirma islemi yapilsin,
  // Ayni zamanda kapanis ikinci animasyonun da tetikliyoruz burda
.then(res => res.json())
.then(res => {
  window.devam=true;
  startAnimation(0.6,0.2);
  console.log(res);

  // logic() gönderip on bellegi güncelliyoruz UpdateCache() ile
  logic(res);
  UpdateCache();
})};

// Gelen json dosyasini ayiplayip verileri ekrana isliyoruz
function logic(res){
    // SET
    var name = document.querySelector('.Name div');
    var releaseDate = document.querySelector('.Years div');
    var rating = document.querySelector('.Rating div');
    var poster = document.querySelector('.pic img');
    var director = document.querySelector('.director');
    var actors= document.querySelector('.stars');
    var description = document.querySelector('.description');
    var writers = document.querySelector('.writers');
  
    // Other details
    name.innerHTML=res.title;
    releaseDate.innerHTML=res.releaseDate;
    rating.innerHTML=res.rating;
    poster.src=res.poster;
    director.innerHTML=res.director[0].name;
    description.innerHTML = res.description;
    
    // Writers
    var filtered_writers = res.writers.filter(item => item['@type'] === 'Person');
    var writers_text = "";
    filtered_writers.forEach(function(item, index) {
      if (index !== 0) {
        writers_text += ", ";
      }
      writers_text += item.name;
    });
    writers.innerHTML = writers_text;
  
    // Actors
    var actors_text = "";
    res.actors.forEach(function(item, index) {
      if (index !== 0) {
        actors_text += ", ";
      }
      actors_text += item.name;
    });
    actors.innerHTML=actors_text;
  
  };






