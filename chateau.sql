-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : dim. 11 sep. 2022 à 15:58
-- Version du serveur : 5.7.24
-- Version de PHP : 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `chateau`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `IdCommentaire` int(11) NOT NULL,
  `Nom` text NOT NULL,
  `NbEtoiles` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Commentaire` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`IdCommentaire`, `Nom`, `NbEtoiles`, `Date`, `Commentaire`) VALUES
(1, 'Bicyclette amusante', 5, '2022-09-04', 'Lorsque nous avons effectué notre randonné sur le sentier côtier avec notre groupe des membres du club de poterie de Champigny-les-Fontaines, nous avons été surpris de la beauté de ce lieu. Impressionnant ! Un vieux pécheur qui passait par la nous raconta l\'histoire controversé, mais extrêmement passionnante du Chateau. Votant à gauche, je fus ravis d\'apprendre que cet édifice, construit sur un ancien sanctuaire de druide gaulois, fus destiné à protéger les petites gens du noble tyrannique qui régnait dans la région, Charles Magne, dit le malveillant. Ce fut une expérience inoubliable, je recommande.'),
(2, 'mariant enzo', 5, '2022-08-24', 'Endroit incontournable si vous passez sur l\'île, Monsieur De Célère, propriétaire des lieux, nous fit un bien bon accueil lors de notre passage dans son humble demeure, le gratin de bouts de verre était exquis'),
(3, 'Marquis de Chateau', 5, '2022-08-25', 'Bienvenue cher visiteurs dans mon humble demeure.\r\nJ’espère que vous saurez vous laisser bercer par le calme, la simplicité, le charme de son cadre authentique. Bercé par la douce brise bretonne et le chant des vagues, cette visite est une expérience relaxante qui pour sûr ne vous laissera pas indifférents. Puisse le plus beau pays du monde, épaulé par son fier drapeau noir et blanc vous permettre de trouver le repos de l’âme et la paix intérieure.\r\nBonne visite, mes chers orchidoclastes.'),
(4, 'Erell Le Gall', 4, '2022-09-08', 'Beaucoup de vent, j\'en suis ressortie décoiffée, il me semblerait que le propriétaire pourrait y faire quelques choses afin d\'améliorer nos visites.\r\nCependant, la vue était simpa !\r\nMerci à tous pour vos commentaires qui m\'ont convaincus de visiter ce sublime endroit, j\'ai ainsi pu rencontrer les hôtes,  très gentils !\r\nLa Bretagne est vraiment la plus jolie région de France !\r\nKenavo  !'),
(5, 'Anatole', 4, '2022-08-25', 'Un hôte chaleureux très pédagogue, accompagne ses récits de douces mélodies. J’en ressort bonifié et prêt à répandre les versets du prophète.\r\nPar contre, le sol mérite plus d’entretiens.'),
(6, 'Melodie Corbeau', 4, '2022-09-06', 'Très chouette,  en plus il y avait du beau temps qui est assez rare.\r\nLes graffitis en moins sur les mur du chateau auraient été un plus. Dommage  que certaines personnes s\'autorisent à détériorer des monuments aussi important que celui-ci :\'('),
(7, 'Byzef\'', 5, '2022-08-21', 'Quelle ne fut pas ma surprise lorsque ce lieu magique, ex résidence du roi Arthur, a guéri ma torsion par une simple pose de ces dernières  sur les créneaux, probablement bénis par les poils de barbe (ou autre, qu\'en sais-je) de Merlin l enchanteur lui même, qui étaient visibles en masse sur les hauts remparts de cette magnifique demeure.\r\nA moins que de nombreuses personnes viennent se faire guérir leurs torsions ici'),
(8, 'REMI LE RIGOLO', 5, '2022-08-25', 'Hyper énergétique ! Et regardez qui on a trouvé en concert privé à l\'intérieur !'),
(9, '', 5, '2022-08-10', 'Super lieu !!!! j’adore ;p'),
(10, 'Liluya', 5, '2022-09-09', 'Je suis venue visiter ce petit bout de continent suite à la sortie du Tube \"Belle-île-en-Mer, Marie-Galante\" de Laurent Voulzy, l\'île d\'Ouessant étant cité dans sa chanson.\r\n\r\nPour l\'occasion, j\'ai réservé ce Air BNB pour deux semaines, et quelle n\'en fut ma surprise !\r\nTout est incroyable !\r\nLa paille et les cailloux sont tellement confortable !\r\nNe parlons pas des baies vitrées donnant de la luminosité à la pièce de vie !\r\nQuand à la cuisine installée par le propriétaire, un petit feu de camp, j\'ai trouvé ça charmant et rustique !\r\nJe donne 5 étoiles !\r\n\r\nNB : Attention cependant à la moisissure sur les murs'),
(11, 'Jacques Célère', 5, '2022-08-04', 'Super lieu dépaysant, un endroit magnifique pour échapper à la réalité. Vous pourrez y retrouver Jésus de Nazareth, la boîte des 4 DVD (sans les DVD), parmi de nombreux tessons de bouteilles et pierres jonchant le sol.');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `IdUtilisateur` int(11) NOT NULL,
  `Nom` text NOT NULL,
  `Motdepasse` text NOT NULL,
  `Mail` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`IdUtilisateur`, `Nom`, `Motdepasse`, `Mail`) VALUES
(1, 'Jacques Célère', 'salut', 'JC@gmail.com');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`IdCommentaire`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`IdUtilisateur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `IdCommentaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `IdUtilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
