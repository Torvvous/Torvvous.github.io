export function verificareVizibilitate(switchVerification) {
  document.addEventListener("visibilitychange", function () {
    // BUG
    // la prima incarcare a paginii, stare de vizibilitate e hidden for some reason

    if (switchVerification) {
      if (document.visibilityState == "hidden") {
        alert(
          "Se pare ca ai incercat sa trisezi. Nu ai voie sa parasesti aplicatia cat timp o folosesti. \nImi pare rau dar va trebui sa resetam progresul."
        );
        location.reload(true);

        // Redirect to another page
        window.location.href = "index.html"; // Replace with the URL you want to load

        //console.log("reloadinggg");
      } else {
        document.title = "I'm here";
      }

      // document.title = document.visibilityState ? "I'm away" : "I'm here";
    }
  });
}
