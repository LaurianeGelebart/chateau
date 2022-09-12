<?php
    include("acces_BDD.php");
    session_start();
    
    
    if(isset($_POST['connexion'])){
        
        if(!empty($_POST['Mail']) AND !empty($_POST['Motdepasse'])){
            $Mail = htmlspecialchars($_POST['Mail']);
            $Motdepasse= $_POST['Motdepasse'];
            //$Motdepasse=hash('sha256',$Motdepasse);
            
            $q=$BDD->prepare('SELECT * FROM utilisateur WHERE Mail = ? AND Motdepasse = ?');
            $q->execute(array($Mail,$Motdepasse)); 
            if($q->rowCount() > 0){
                $_SESSION['Mail']=$Mail;
                $_SESSION['Motdepasse']=$Motdepasse;
                $result=$q->fetch();
                $_SESSION['IdUtilisateur']=$result['IdUtilisateur'];
                header('Location: accueil.php'); 
            }else{
                echo 'Le mail ou le mot de passe ne correspond pas. ';
            }
        }

    }
    elseif(isset($_POST['inscription'])){
        
        if(!empty($_POST['Nom']) AND !empty($_POST['Mail']) AND !empty($_POST['Motdepasse'])AND !empty($_POST['Confirmermotdepasse'])){
            $Nom = (String) trim($_POST['Nom']);
            $Mail=(String) trim($_POST['Mail']);
            $Motdepasse=(String) trim($_POST['Motdepasse']);
            $Confirmermotdepasse=(String) trim($_POST['Confirmermotdepasse']);
            if($Motdepasse==$Confirmermotdepasse){
                $q=$BDD->prepare('SELECT Mail FROM utilisateur WHERE Mail=?');
                $q->execute(array($Mail));
                if($q->rowCount()==0){
                    $q=$BDD->prepare('INSERT INTO utilisateur(Nom,Motdepasse,Mail,Score) VALUES (?,?,?,0)');
                    $q->execute(array($Nom,$Motdepasse,$Mail));
                    header('Location: accueil.php'); 

                }else{
                    echo 'Un compte existe déjà avec cette adresse e-mail';
                }

            }else{
                echo 'Les mots de passe sont différents';
            }
            


        }

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
    <title>Connexion</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Site Icons -->
    <link rel="shortcut icon" href="images/Capture.jpg" type="image/x-icon" />

    <!-- Site CSS -->
    <link rel="stylesheet" href="style.css">

    <!-- Font -->
    <link href="http://fonts.cdnfonts.com/css/ming" rel="stylesheet">
    <link href="http://fonts.cdnfonts.com/css/perfect-dark-brk" rel="stylesheet">

</head>

<body>
    <h1 class="title">Connexion</h1>
    <form method="post">
        <input type="text" name="Mail" placeholder="Mail" value="<?php if (isset($Mail)) echo $Mail; ?>"
            required="required">
        <input type="password" name="Motdepasse" placeholder="Mot de passe"
            value="<?php if (isset($Motdepasse)) echo $Motdepasse; ?>" required="required">
        <input type="submit" name="connexion" value="Se connecter">
    </form>
    <h1 class="title">Inscription</h1>
    <form method="post">
        <input type="text" name="Nom" placeholder="Nom" value="<?php if (isset($Nom)) echo $Nom; ?>"
            required="required">
        <input type="text" name="Mail" placeholder="Mail" value="<?php if (isset($Mail)) echo $Mail; ?>"
            required="required">
        <input type="password" name="Motdepasse" placeholder="Mot de passe"
            value="<?php if (isset($Motdepasse)) echo $Motdepasse; ?>" required="required">
        <input type="password" name="Confirmermotdepasse" placeholder="Confirmer le mot de passe"
            value="<?php if (isset($Confirmermotdepasse)) echo $Confirmermotdepasse; ?>" required="required">
        <input type="submit" name="inscription" value="S'inscrire">
    </form>

</body>