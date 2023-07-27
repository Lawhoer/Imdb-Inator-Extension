// Slide-1'in main'i kapatip container'i aciyor
function toggleVisibility() {
    var main = document.querySelector('.main');
    var container = document.querySelector('.container');
    var sliderNav = document.querySelector('.slider-nav');
      main.style.display = 'none';
      container.style.display = 'grid';
      sliderNav.style.display = 'none';
  }

  // Arama yapildigindaki gecis animasyonu (tek seferlik,buranin kodu css ile ic ice oldugundan biraz igrenc oldu)
  function startAnimation(start,fark) {
    var array = document.querySelectorAll('.b1, .b2, .b3');

    // Biten animasyon bitis donüs animasyonuysa display'i kapiyor
    for (let i = 0; i < array.length; i++) {
      array[i].addEventListener('animationend',function(event){
        if (event.animationName === 'slideAnimationToBack') {
          array[i].style.display = 'none';
        }
      });

      // İzin verilirse donüs animasyonunu class ekliyerek calistiriyor tek seferlik
      if(devam){
          var j=0.0;
          if(array[i].classList.contains('b3')){
            array.forEach(element => {
              element.classList.add('backAnimation');
              element.style.animationDuration = start-j + 's';
              j=j+fark;
            });
          }
      }
      // İzin verilmezse direk ilk animasyonu baslatiyor
      else{
        array[i].style.animationPlayState = 'running';
        array[i].style.display="flex";
      }
    }
  }
// Basladiginda ilk animasyon baslasin diye false
window.devam=false;

// Mouse tekerlegini kontrol ediyoruz dikey hareketleri yataya uygulatiyoruz
const element = document.querySelector(".slider");
element.addEventListener('wheel', (event) => {
  event.preventDefault();

  // Kac birim eklenicegini ayarliyoruz scroll'a(burda 60 secmisim)
  element.scrollBy({
    left: event.deltaY < 0 ? 60 : -60,
  });
});
