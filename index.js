let net;

$(document).ready(function(){
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $('#uploaded-image').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#image-input").change(function() {
    readURL(this);
    $('#uploaded-image').show();
    $('#prediction-button').show();
    $('#result').hide();
  });

});

$("#prediction-button").click( async function app() {
  // Show loading animation
  $(this).hide();
  $('.loader').show();

  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');

  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('uploaded-image');
  const result = await net.classify(imgEl);
  console.log(result);

  $('.loader').hide();
  $('#result').fadeIn(600);
  $('#result').text(' Result:  ' + result[0].className);
  $(this).show();

});
