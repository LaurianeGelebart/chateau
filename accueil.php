<?php
    include("acces_BDD.php");
    session_start();
?>



<!DOCTYPE html>
<html lang="fr">

<head>
	<!-- Basic -->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<!-- Mobile Metas -->
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- Site Metas -->
	<title>Chateau</title>
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
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet"> 
    <link href="https://fonts.googleapis.com/css2?family=Combo&display=swap" rel="stylesheet">         

</head>

<body class="home">

<?php 
    require_once("navbar.php");
?>

    <main>

        <section class="desc">
            <h1 id="title-turn" class="title">Le Chateau d'Ouessant</h1>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <img id="chateau-turn" class="image-home" src="images/chateau.jpg">
            </div>
        </section>

        <section class="avis">
            <h2 class="">Ils en parlent...</h2>
            <div class="galery-comment">
<?php 
    $q=$BDD->prepare('select * from commentaires order by rand() limit 6;');
    $q->execute(array()); 
    if($q->rowCount() > 0){
        foreach($q as $result){;
?>
               <div class="comment">
                    <div class="stars"><?php for($i=0 ; $i<$result['NbEtoiles']; $i++){?><img src="images/etoile.svg"> <?php } ?></div>
                    <p class="text" ><?php echo $result['Commentaire'] ?></p>
                    <h3><?php echo $result['Nom'] ?> - <?php echo $result['Date'] ?>2</h3>
                </div>
<?php 
    }}else{ echo 'Pas de commenatires. ';}
?>
            </div>
        </section>

    </main>

    <footer>
        <p>Créé avec passion en septembre 2022</p>
    </footer>

</body>
</html>