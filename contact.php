<?php
session_start();
	header("Content-Type: text/html; charset=utf-8") ;

	if(isset($_POST['submitcontact'])) {
        /*
        $from =  htmlspecialchars($_POST['email']);
        $to =  "laurianeglb@gmail.com";
        $subject = htmlspecialchars($_POST['sujet']);
        $message = htmlspecialchars($_POST['message']);
        $headers = "From:" . $from;

        
        mail($to,$subject,$message, $headers);
        */

        sleep(4); 
        echo "<script>alert('Rou-rou, je suis Raoul le pigeon, votre message a bien été délivré !')</script>";
            
	}
	
?>

<!DOCTYPE html>
<html>

<head>
     <!-- Basic -->
     <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Site Metas -->
    <title>Chateau - Contactez nous</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Site Icons -->
    <link rel="shortcut icon" href="images/Capture.jpg" type="image/x-icon" />

    <!-- Site CSS -->
    <link rel="stylesheet" href="style.css">

    <!-- Script -->
    <script src="script.js"></script>

    <!-- Font -->
    <link href="http://fonts.cdnfonts.com/css/ming" rel="stylesheet">
    <link href="http://fonts.cdnfonts.com/css/perfect-dark-brk" rel="stylesheet">

</head>

<body id="contact" class="contact">
<?php 
        require_once("navbar.php");
?>
    <main>
        <div class="content">
        <h1 class="title">Nous contacter</h1>
        <section>
            <form method="POST" action="" class="formulaire_contact" id="reused_form">
                <input name="email" type="email" placeholder="Email" required>
                <input name="sujet" type="text" placeholder="Sujet" required>
                <textarea class="formulaire_input" name="message" placeholder="Message" rows="8" cols="50"
                    required></textarea>
                <input class="btn" id="btn" type="submit" name="submitcontact" value="Envoyer le message">
            </form>
        </section>
    </div>

    <video autoplay muted loop id="BackgroundVideo">
            <source src="images/nuages.mp4" type="video/mp4">
    </video>

    <div id="pigeon" class="content-bird">
        <img class="piegon" src="images/pigeon.svg">
    </div>

    </main>

</body>


</html>

