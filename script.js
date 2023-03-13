$(function () {
  // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
  // the code isn't run until the browser has finished rendering all the elements
  // in the html.

  // Apply jQuery UI button styling to all input[type=submit], a, and button elements within .widget
  $(".widget input[type=submit], .widget a, .widget button").button();

  // Add click event listener to all button, input, and a elements, prevent default behavior (i.e. form submission)
  $("button, input, a").on("click", function (event) {
    event.preventDefault();
  });

  // Add click event listener to all elements with class "saveBtn"
  $(".saveBtn").on("click", function (event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get the id of the parent time-block element (i.e. the containing hour)
    var hourId = $(this).closest(".time-block").attr("id");

    // Get the value of the textarea element within the same time-block
    var description = $(this).siblings(".description").val();

    // Save the description in localStorage using the hourId as the key
    localStorage.setItem(hourId, description);
  });

  // Apply past, present, or future class to each time-block based on the current time
  var currentHour = parseInt( dayjs().format( "H" ) );
  $( ".time-block" ).each( function() {
    var hourBlock = parseInt( $( this ).attr( "id" ).split( "-" )[1] );
    if ( hourBlock < currentHour ) {
      $( this ).addClass( "past" );
    } else if ( hourBlock === currentHour ) {
      $( this ).removeClass( "past" );
      $( this ).addClass( "present" );
    } else {
      $( this ).removeClass( "past" );
      $( this ).removeClass( "present" );
      $( this ).addClass( "future" );
    }
  });

  // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  $(".time-block").each(function () {
    var hourId = $(this).attr("id");
    var description = localStorage.getItem(hourId);

    if (description !== null) {
      $(this).find(".description").val(description);
    }
  });

  // Display the current date in the header of the page
  var today = new Date();
  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayOfWeek = daysOfWeek[today.getDay()];
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var currentDate1 = "0" + mm + "/" + "0" + dd + "/" + yyyy;
  var currentDate2 = mm + "/" + dd + "/" + yyyy;
  
  if (mm < 10 && dd < 10) {
    currentDate = currentDate1;
  } else {
    currentDate = currentDate2;
  }
  
  document.getElementById("date").innerHTML = dayOfWeek + ", " + currentDate;

  $("date").text(currentDate);
});
