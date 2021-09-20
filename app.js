$(document).ready(function() {

    let gameSelected = {};
    const peticion = $.ajax({
        type: "get",
        url: "./database.json",
        data: {},
        dataType: "json",
        beforeSend: function() {}
    });



    /* cambiar estilos de los botones de tipo link */
    $("a").addClass("btn btn-primary");


    $(".btn-princ").eq(0).click(function(e) {
        e.preventDefault();
        window.location = "https://educfisicaf010.github.io/appAlumnoF010/?utm_source=web_app_manifest";
    });


    playGame();
    let fondo = true;
    $(".btn-danger").click(function(e) {
        e.preventDefault();
        $(".audios").html("");
        $(".close-audio").remove();
        $(".audios").append(`<audio class="close-audio" src="audios/desliza.wav"></audio>`);
        $(".close-audio").prop("volume", 0.1);
        $("#main").removeClass("d-none");
        $("#segunda").addClass("d-none");
        $("#desc-game-selected").removeClass("d-block");
        $("#desc-game-selected").addClass("d-none");
        $("#desc-puzzle-play").removeClass("d-block");
        $("#desc-puzzle-play").addClass("d-none");
        $("#desc-game-reset").addClass("d-none");
        $("#desc-game-reset").removeClass("d-block");

    });

    $(".btn-danger").hover(function() {
        $(".close-audio").remove();
        $(".audios").append(`<audio class="close-audio" src="audios/desliza.wav" autoplay></audio>`);
        $(".close-audio").prop("volume", 0.1);
    }, function() {
        $(".close-audio").remove();
    });

    $(".btn-entrar").click(function(e) {
        e.preventDefault();
        $(".entrar-audio").remove();
        $(".audios").append(`<audio class="entrar-audio" src="audios/entrar.wav" autoplay></audio>`);
        $(".entrar-audio").prop("volume", 0.1);
        $("#main").removeClass("d-block");
        $("#main").addClass("d-none");
        $("#segunda").removeClass("d-none");
        peticion.done(function(response) {
            let htmlGame = '';
            try {
                if (response.length === 0) {
                    $("#segunda").children().children().find("#main").addClass("text-center");
                    $("#segunda").children().children().find("#horizontal-scroll").html(`
                    <div data-bs-hover-animate="flash" class="item bg-white rounded border-white game">
                    <div class="border rounded p-2"><img class="rounded-circle border shadow-lg pulse animated infinite mx-auto d-block m-1" src="assets/img/logo_juego_f010.jpg" height="100px" alt="100px"></div>
                    <div class="p-1">
                        <h4 class="text-secondary shadow-sm text-center"><strong>No&nbsp;hay&nbsp;juegos&nbsp;</strong><br></h4>
                        <h5 class="text-secondary text-center"><strong>disponibles&nbsp;</strong><br></h5>
                        <h6 class="text-center">...</h6>
                    </div>
                    <div class="bg-danger shadow-sm btn btn-info text-white mx-auto d-block m-3"><a class="text-light" href="#"><i class="fa fa-gamepad swing animated infinite" style="font-size: 28px;"></i></a></div>
                </div>
                    `);
                } else {
                    response.forEach(juego => {
                        htmlGame += `
                        <div data-bs-hover-animate="flash" class="item bg-white rounded border-white game">
                                <div class="border rounded p-2"><img class="rounded-circle border shadow-lg pulse animated infinite mx-auto d-block m-1" src="${juego.imagen_url}" height="100px" alt="100px"></div>
                                <div class="p-1">
                                    <h4>${juego.act}</h4>
                                    <h5>${juego.desc}</h5>
                                    <h6>${juego.apr_es}</h6>
                                </div>
                                <div class="btn btn-info text-white mx-auto d-block m-3 btn-init-game"><span hidden>${JSON.stringify(juego)}</span><i class="fa fa-gamepad swing animated infinite" style="font-size: 28px;"></i><a href="#"></a></div>
                            </div>
                        `;
                    });
                    $("#segunda").children().children().find("#main").removeClass("text-center");
                    $("#segunda").children().children().find("#horizontal-scroll").html(htmlGame);
                    cambiarEscenario();
                    initGame();
                }

            } catch (error) {
                console.error("ocurrio un error" + error);
            }

        });
    });

    function playGame() {
        /*  $(".audios").html(`<audio controls autoplay loop hidden class="fondo-audio"><source src="audios/fondo_juego.wav" type="audio/wav"></audio>`);
         $(".fondo-audio").prop("volume", 0.5);
         stopAudio(); */
    }

    function stopAudio() {
        /*   $(".btn-audio").click(function(e) {
              e.preventDefault();
              if (fondo) {
                  $(".fondo-audio").remove();
                  $(".btn-audio").find("i").addClass("text-danger");
                  fondo = false;
              } else {
                  $(".audios").html(`<audio class="fondo-audio" src="audios/fondo_juego.wav" autoplay loop></audio>`);
                  $(".fondo-audio").prop("volume", 0.5);
                  $(".btn-audio").find("i").removeClass("text-danger");
                  fondo = true;
              }
          }); */
    }

    /* cambiar de escenario */
    $(".game").hover(function() {
       // $(".audios").append(`<audio class="desliza-audio" src="audios/desliza.wav" autoplay></audio>`);
    }, function() {
        //$(".desliza-audio").remove();
    });
    /* evento para el cambio de escenario  */
    function cambiarEscenario() {
        $(".game").hover(function() {
            //$(".audios").append(`<audio class="desliza-audio" src="audios/desliza.wav" autoplay></audio>`);
        }, function() {
            //$(".desliza-audio").remove();
        });
    }



    /* function para iniciar el juego */
    $(".btn-init-game").click(function(e) {
        e.preventDefault();
        $(".audio-init-game").remove();
        $(".audios").append(`<audio class="audio-init-game" src="audios/jugar.wav" autoplay></audio>`);
        $("#segunda").addClass("d-none");
        $("#desc-game-selected").addClass("d-block");
    });

    function initGame() {
        $(".btn-init-game").click(function(e) {
            e.preventDefault();
            $(".audio-init-game").remove();
            $(".audios").append(`<audio class="audio-init-game" src="audios/entrar.wav" autoplay></audio>`);
            $("#segunda").addClass("d-none");
            $("#desc-game-selected").addClass("d-block");
            gameSelected = JSON.parse($(this).find("span").eq(0).text());
            let selectedGameOp = $("#desc-game-selected");
            selectedGameOp.find("img").eq(0).attr("src", gameSelected.imagen_url);
            selectedGameOp.find("h6").eq(0).text(gameSelected.act);
            selectedGameOp.find("h6").eq(1).text(gameSelected.desc);
        });
    }


    /* btn back */
    $(".btn-back").click(function(e) {
        e.preventDefault();
        $(".audios").html("");
        $(".entrar-audio").remove();
        $(".audios").append(`<audio class="entrar-audio" src="audios/desliza.wav" autoplay></audio>`);
        $(".entrar-audio").prop("volume", 0.1);
        $("#desc-game-selected").removeClass("d-block");
        $("#desc-game-selected").addClass("d-none");
        $("#segunda").removeClass("d-none");
        $("#desc-game-reset").removeClass("d-block");
        $("#desc-game-reset").addClass("d-none");
        $("#desc-puzzle-play").removeClass("d-block");
        $("#desc-puzzle-play").addClass("d-none");
    });

    /* iniciar juego */
    $(".btn-puzzle-start").click(function(e) {
        e.preventDefault();
        $(".div-del-juego").html("");
        $(".div-del-juego").append("<img>");

        $(".audio-init-game").remove();
        $(".audios").append(`<audio class="audio-init-game" src="${gameSelected.audio_juego_url}" autoplay loop></audio>`);
        $(".audio-init-game").prop("volume", 0.5);
        $(".btn-audio").eq(0).click();
        $("#desc-game-selected").removeClass("d-block");
        $("#desc-game-selected").addClass("d-none");
        $("#desc-puzzle-play").removeClass("d-block");
        $("#desc-puzzle-play").removeClass("d-none");
        $("#desc-puzzle-play").find("img").eq(0).attr("src", `${gameSelected.imagen_url}`);
        $("#desc-puzzle-play").find("img").eq(0).attr("id", `image${gameSelected.id}`);

        $("#desc-puzzle-play").find("img").eq(0).addClass("mx-auto d-block jqPuzzle ");
        $("#desc-puzzle-play").find("img").eq(0).css("width", "95%");
        var myTexts = {
            shuffleLabel: 'MEZCLA',
            toggleOriginalLabel: 'ORIGINAL',
            toggleNumbersLabel: 'NUMERO',
            confirmShuffleMessage: '¿DESEAS MEZCLAR IMAGEN?',
            movesLabel: 'MOVIMIENTOS',
            secondsLabel: 'SEGUNDOS'
        };

        let juego = $("#desc-puzzle-play").find("img").eq(0).jqPuzzle(confiGame(), myTexts);
        $("body").on("click", '.jqp-piece', function(e) {
            $(".play-chage-data").remove();
            $(".audios").append(`<audio class="play-chage-data" src="audios/cambia_cuadro.wav" autoplay></audio>`);
            /*  console.log($(this).html()); */
        });
        /* eventos sobre controles de jquery */
        $("body").on("click", '.jqp-controls', function(e) {
            //console.log($(this).find("a").eq(0));
            //console.log($(this).find("input"));

            $(this).find("a").click(function(e) {
                e.preventDefault();
                $(".play-chage-data").remove();
                $(".audios").append(`<audio class="play-chage-data" src="audios/cambia_cuadro.wav" autoplay></audio>`);
            })
        });


    });

    /* reproducir indicaciones */
    let entradaPortada = false;
    $(".btn-audio-adm").click(function(e) {
        e.preventDefault();

        if (entradaPortada == false) {
            $(".audio-indicaciones").remove();
            $(".audios").append(`<audio class="audio-indicaciones" src="${gameSelected.audio_url}" autoplay></audio>`);
            $(this).find("i").eq(0).addClass("text-success");
            entradaPortada = true;
        } else {
            $(".audio-indicaciones").remove();
            entradaPortada = false;
            $(this).find("i").eq(0).removeClass("text-success");
        }
    });



    /* JUEGO TERMINADO */
    function missionComplete() {
        let windowGame = $("#desc-game-reset");
        let puzzleGame = $("#desc-puzzle-play");
        windowGame.removeClass("d-none");
        $(".audios").html("");
        windowGame.find("img").eq(0).attr("src", gameSelected.imagen_url);
        puzzleGame.addClass("d-none");
        puzzleGame.removeClass("d-block");
        //Reiniciar nivel
        windowGame.find(".btn-puzzle-start").addClass("d-none");
        $(".btn-refresg-fame").click(function(e) {
            e.preventDefault();
            console.log("cerrar e iniciar juego de nuevo y ejecutar su audio de nuevo");
            windowGame.addClass("d-none");
            windowGame.removeClass("d-block");
            $(".btn-puzzle-start").eq(0).click();
        });
    }



    /* metodo que realiza limpieza extrema de audio */
    function extremClean() {
        $(".audios").eq(0).html("");
    }

    function confiGame() {
        let pocicionR = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
        let pocicionC = Math.floor(Math.random() * (6 - 3 + 1)) + 3
        return {
            rows: pocicionR, // number of rows [3 ... 8] 
            cols: pocicionC, // number of columns [3 ... 8] 
            hole: (pocicionC * pocicionR), // initial hole position [1 ... rows*columns] 
            shuffle: true, // initially show shuffled pieces [true|false] 
            numbers: false, // initially show numbers on pieces [true|false] 
            language: 'en', // language for gui elements [language code] 
            success: {
                fadeOriginal: false, // cross-fade original image [true|false] 
                callback: function(results) {
                    console.log(results);
                    alert('Movimientos' + results.moves + ' En ' +
                        +results.seconds + ' Segundos.');
                    missionComplete();
                }, // callback a user-defined function [function] 
                callbackTimeout: 300 // time in ms after which the callback is called 
            },
            animation: {
                shuffleRounds: 1, // number of shuffle rounds [1 ... ] 
                shuffleSpeed: 800, // time in ms to perform a shuffle round 
                slidingSpeed: 200, // time in ms for a single move 
                fadeOriginalSpeed: 600 // time in ms to cross-fade original image 
            },
            // additional style information not specified via css 
            style: {
                gridSize: 2, // space between two pieces in px 
                overlap: true, // if true, adjacent piece borders will overlap 
                // applies only if gridSize is set to 0 
                backgroundOpacity: 0.1 // opacity of the original image behind the pieces 
                    // [0 ... 1] (0 means no display) 
            }
        }
    }

});