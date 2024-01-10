
document.querySelector('.container-move').addEventListener('mouseover', function() {
    document.querySelectorAll('.round-moving-thingy').forEach(function(div) {
      div.classList.add('animation-paused');
    });
  });
  
  document.querySelector('.container-move').addEventListener('mouseout', function() {
    document.querySelectorAll('.round-moving-thingy').forEach(function(div) {
      div.classList.remove('animation-paused');
    });
  });
