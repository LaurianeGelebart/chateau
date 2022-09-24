<?php
    include("acces_BDD.php");
    session_start();
    
    
    if(isset($_POST['connexion'])){
        
        if(!empty($_POST['Pseudo']) AND !empty($_POST['Motdepasse'])){
            $Pseudo = htmlspecialchars($_POST['Pseudo']);
            $Motdepasse= $_POST['Motdepasse'];
            //$Motdepasse=hash('sha256',$Motdepasse);
            
            $q=$BDD->prepare('SELECT * FROM utilisateur WHERE Pseudo = ? AND Motdepasse = ?');
            $q->execute(array($Pseudo,$Motdepasse)); 
            if($q->rowCount() > 0){
                $_SESSION['Pseudo']=$Pseudo;
                $_SESSION['Motdepasse']=$Motdepasse;
                $result=$q->fetch();
                $_SESSION['IdUtilisateur']=$result['IdUtilisateur'];
                header('Location: jeu.php'); 
            }else{
                echo 'Le Pseudo ou le mot de passe ne correspond pas. ';
            }
        }

    }
    

    if(isset($_POST['inscription'])){
       
        if(!empty($_POST['Pseudo']) AND !empty($_POST['Motdepasse'])AND !empty($_POST['Confirmermotdepasse'])){
            $Pseudo = (String) trim($_POST['Pseudo']);
            $Motdepasse=(String) trim($_POST['Motdepasse']);
            $Confirmermotdepasse=(String) trim($_POST['Confirmermotdepasse']);
            if($Motdepasse==$Confirmermotdepasse){
                $q=$BDD->prepare('SELECT Pseudo FROM utilisateur WHERE Pseudo=?');
                $q->execute(array($Pseudo));
                if($q->rowCount()==0){
                    $q=$BDD->prepare('INSERT INTO utilisateur(Pseudo,Motdepasse) VALUES (?,?)');
                    $q->execute(array($Pseudo,$Motdepasse));
                    header('Location: jeu.php'); 
                }
                else{
                    echo 'Un compte existe déjà avec ce pseudo';
                }

            }else{
                echo 'Les mots de passe sont différents';
            }
            


        }
 
    }
    $q=$BDD->prepare('SELECT Score FROM utilisateur WHERE IdUtilisateur=?');
    $q->execute(array($_SESSION['id']));
    if($q->rowCount()==0 AND ){
        $q=$BDD -> prepare('UPDATE utilisateur SET Score=? WHERE IdUtilisateur = ?');
        $q->execute(array($Score,$_SESSION['id']))
    }
?>


<!doctype html>
<html lang="fr">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Site Metas -->
    <title>Jeu</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Site Icons -->
    <link rel="shortcut icon" href="images/Capture.jpg" type="image/x-icon" />

    <!-- Site CSS -->
    <link rel="stylesheet" href="style.css">

    <!-- Script -->
    <script src="script.js"></script>
    <script src="game.js"></script>

    <!-- Font -->
    <link href="http://fonts.cdnfonts.com/css/ming" rel="stylesheet">
    <link href="http://fonts.cdnfonts.com/css/perfect-dark-brk" rel="stylesheet">
    
                

</head>

<body>

    <?php  require_once("navbar.php"); ?>

    <main>
        <?php if(!(isset($_SESSION['IdUtilisateur']))) { ?>
        <section id="connexion" class="connexion">
            <h1 class="title">Pour jouer connecte toi ;)</h1>
            <form method="post">
                <input type="text" name="Pseudo" placeholder="Pseudo" value="<?php if (isset($Pseudo)) echo $Pseudo; ?>"
                    required="required">
                <input type="password" name="Motdepasse" placeholder="Mot de passe"
                    value="<?php if (isset($Motdepasse)) echo $Motdepasse; ?>" required="required">
                <input type="submit" name="connexion" value="Se connecter">
            </form>
            <p id="go-inscription" class="go">Pas encore inscrit ?</p>
        </section>

        <section id="inscription" class="inscription">
            <h1 class="title">Inscription</h1>
            <form method="post">
                <input type="text" name="Pseudo" placeholder="Pseudo" value="<?php if (isset($Pseudo)) echo $Pseudo; ?>"
                    required="required">
                <input type="password" name="Motdepasse" placeholder="Mot de passe"
                    value="<?php if (isset($Motdepasse)) echo $Motdepasse; ?>" required="required">
                <input type="password" name="Confirmermotdepasse" placeholder="Confirmer le mot de passe"
                    value="<?php if (isset($Confirmermotdepasse)) echo $Confirmermotdepasse; ?>" required="required">
                <input type="submit" name="inscription" value="S'inscrire">
            </form>
            <p id="go-connexion" class="go">Déjà inscrit finalement ?</p>
        </section>

        <?php } else { ?>
        <section class="game">
            <canvas id="canvas" class="canvas" width="1500" height="750">

            </canvas>
        </section>
        <h1 id="title-turn" class="title titleLeaderboard"> Leaderboard </h1>
        <table>
            <thead>
                <tr>
                    <th> Pseudo </th>
                    <th> Score </th>
                </tr>
            </thead>
            <tbody>
                
            <?php 
                $q=$BDD->prepare('SELECT * FROM utilisateur WHERE Score > 0 ORDER BY Score DESC');
                $q->execute(array()); 
                foreach($q as $ligne){
            ?>
                <tr>
                    <td class="pseudoLeaderBoard">
                        <?php echo $ligne['Pseudo']; ?>
                    
                    <td>
                        <?php echo $ligne['Score'];?>
                    </td>
            <?php } ?>
            </tbody>
        </table>
            <?php } ?>

    </main>
</body>