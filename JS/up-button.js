 
  window.addEventListener('scroll', function() {
    let upButton = document.querySelector('.up_btn');
    if (window.pageYOffset > 500) {
      upButton.classList.add('show-up-button');
    } else {
      upButton.classList.remove('show-up-button');
    }
  });
 
 
