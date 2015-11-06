-- MySQL dump 10.13  Distrib 5.6.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bpclight
-- ------------------------------------------------------
-- Server version	5.6.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `_bpcandroid`
--

DROP TABLE IF EXISTS `_bpcandroid`;
/*!50001 DROP VIEW IF EXISTS `_bpcandroid`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `_bpcandroid` AS SELECT 
 1 AS `Nom`,
 1 AS `Prenom`,
 1 AS `Matri`,
 1 AS `Telephone`,
 1 AS `LibMelA`,
 1 AS `LibBatC`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `accents`
--

DROP TABLE IF EXISTS `accents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accents` (
  `Kacc` int(11) NOT NULL AUTO_INCREMENT,
  `LibSAcc` varchar(250) DEFAULT NULL,
  `LibAcc` varchar(250) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kacc`)
) ENGINE=MyISAM AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `login` varchar(255) NOT NULL,
  `kage` int(11) NOT NULL,
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `activites`
--

DROP TABLE IF EXISTS `activites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activites` (
  `Kact` int(11) NOT NULL AUTO_INCREMENT,
  `Kage` int(11) NOT NULL,
  `Kann` int(11) NOT NULL,
  `LibAct` varchar(250) DEFAULT NULL,
  `ActLie` tinyint(4) NOT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kact`)
) ENGINE=MyISAM AUTO_INCREMENT=602 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `adresses`
--

DROP TABLE IF EXISTS `adresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adresses` (
  `Kadr` int(11) NOT NULL AUTO_INCREMENT,
  `Kpos` int(11) DEFAULT NULL,
  `Kdep` int(11) DEFAULT NULL,
  `Kpay` int(11) DEFAULT NULL,
  `Adresse` longtext,
  `Perso` tinyint(4) DEFAULT NULL,
  `Type` int(11) DEFAULT NULL,
  `Verrou` varchar(50) DEFAULT NULL,
  `Date_derniere_modif` datetime DEFAULT NULL,
  PRIMARY KEY (`Kadr`)
) ENGINE=MyISAM AUTO_INCREMENT=2420 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ageaut`
--

DROP TABLE IF EXISTS `ageaut`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ageaut` (
  `Kaat` int(11) NOT NULL AUTO_INCREMENT,
  `Kpie` int(11) NOT NULL,
  `Ksig` int(11) NOT NULL,
  `DatAutV` datetime DEFAULT NULL,
  `DatDebV` datetime DEFAULT NULL,
  `DatFinV` datetime DEFAULT NULL,
  `NumAut` varchar(50) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kaat`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ageautpers`
--

DROP TABLE IF EXISTS `ageautpers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ageautpers` (
  `Kaap` int(11) NOT NULL AUTO_INCREMENT,
  `Kpie` int(11) NOT NULL,
  `Kvmk` int(11) DEFAULT NULL,
  `Kvmd` int(11) DEFAULT NULL,
  `Kvas` int(11) DEFAULT NULL,
  `Ksig` int(11) NOT NULL,
  `DatAut` datetime DEFAULT NULL,
  `Ponct` tinyint(4) NOT NULL,
  `Immat` varchar(255) DEFAULT NULL,
  `NumPol` varchar(255) DEFAULT NULL,
  `Zone` int(11) DEFAULT NULL,
  `KmAut` double DEFAULT NULL,
  `KmAdd` double DEFAULT NULL,
  `DatDeb` datetime DEFAULT NULL,
  `DatFin` datetime DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kaap`)
) ENGINE=MyISAM AUTO_INCREMENT=3207 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `agecode`
--

DROP TABLE IF EXISTS `agecode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agecode` (
  `Kcod` int(11) NOT NULL AUTO_INCREMENT,
  `Kage` int(11) NOT NULL,
  `CodConf` varchar(4) DEFAULT NULL,
  `CodChauf` varchar(4) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kcod`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ageetat`
--

DROP TABLE IF EXISTS `ageetat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ageetat` (
  `Keta` int(11) NOT NULL AUTO_INCREMENT,
  `Kpst` int(11) NOT NULL,
  `Kage` int(11) NOT NULL,
  `Ketsnew` int(11) NOT NULL,
  `Kuninew` int(11) DEFAULT NULL,
  `Ksubnew` int(11) DEFAULT NULL,
  `Ksernew` int(11) DEFAULT NULL,
  `Ketsex` int(11) DEFAULT NULL,
  `Kuniex` int(11) DEFAULT NULL,
  `Ksubex` int(11) DEFAULT NULL,
  `Kserex` int(11) DEFAULT NULL,
  `DatCre` datetime DEFAULT NULL,
  `Arrivee` varchar(250) DEFAULT NULL,
  `Motif` varchar(250) DEFAULT NULL,
  `DatEta` datetime DEFAULT NULL,
  `DatCPA` date DEFAULT NULL,
  `DatCFA` datetime DEFAULT NULL,
  `DatRet` datetime DEFAULT NULL,
  `PosFutur` int(11) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Keta`)
) ENGINE=MyISAM AUTO_INCREMENT=8051 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `agents`
--

DROP TABLE IF EXISTS `agents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agents` (
  `Kage` int(11) NOT NULL AUTO_INCREMENT,
  `Kuni` int(11) DEFAULT NULL,
  `Ksub` int(11) DEFAULT NULL,
  `Kser` int(11) DEFAULT NULL,
  `Kbat` int(11) DEFAULT NULL,
  `Kgra` int(11) DEFAULT NULL,
  `Kbur` int(11) DEFAULT NULL,
  `Kres` int(11) DEFAULT NULL,
  `Ksec` int(11) DEFAULT NULL,
  `Nom` varchar(250) DEFAULT NULL,
  `Prenom` varchar(250) DEFAULT NULL,
  `Matri` varchar(10) NOT NULL,
  `DatCre` datetime DEFAULT NULL,
  `DatOuv` datetime DEFAULT NULL,
  `DatMod` datetime DEFAULT NULL,
  `DatClo` datetime DEFAULT NULL,
  `HorSect` varchar(10) DEFAULT NULL,
  `CodHie` smallint(6) DEFAULT NULL,
  `CodHor` varchar(6) DEFAULT NULL,
  `LibHor` varchar(100) DEFAULT NULL,
  `Telephone` varchar(20) DEFAULT NULL,
  `Poste` varchar(10) DEFAULT NULL,
  `Fax` varchar(20) DEFAULT NULL,
  `Portable` varchar(20) DEFAULT NULL,
  `Bureau` varchar(20) DEFAULT NULL,
  `RoleDeta` longtext,
  `DatMaj` datetime DEFAULT NULL,
  `DatNai` datetime DEFAULT NULL,
  `VilNai` varchar(250) DEFAULT NULL,
  `DepNai` varchar(5) DEFAULT NULL,
  `NomPre` varchar(30) DEFAULT NULL,
  `Actif` tinyint(4) NOT NULL,
  `IneTP` smallint(6) DEFAULT NULL,
  `HSLabo` smallint(6) DEFAULT NULL,
  `MissioLabo` tinyint(4) NOT NULL,
  `LogUse` varchar(100) DEFAULT NULL,
  `NumImmo` varchar(50) DEFAULT NULL,
  `INSEE` varchar(16) DEFAULT NULL,
  `Circe` tinyint(4) NOT NULL,
  `PaysNai` varchar(250) DEFAULT NULL,
  `Signat` tinyint(4) NOT NULL,
  `Temptation` tinyint(4) NOT NULL,
  `Verrou` varchar(50) DEFAULT NULL,
  `NumautCond` int(11) DEFAULT NULL,
  `Autorise` int(11) DEFAULT NULL,
  `INM` char(5) DEFAULT NULL,
  `AgGesper` varchar(12) DEFAULT NULL,
  `AgRe` varchar(20) DEFAULT NULL,
  `AgRisques` int(11) DEFAULT NULL,
  `Ksec2` int(11) DEFAULT NULL,
  `REHUCIT` varchar(255) DEFAULT NULL,
  `libelle_poste` longtext,
  `dossier_d` int(11) DEFAULT NULL,
  `dossier_r` int(11) DEFAULT NULL,
  `libelle_doc` longblob NOT NULL,
  PRIMARY KEY (`Kage`)
) ENGINE=MyISAM AUTO_INCREMENT=2701 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `agentsbpc`
--

DROP TABLE IF EXISTS `agentsbpc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agentsbpc` (
  `Kage` int(11) NOT NULL,
  `Kpos` int(11) DEFAULT NULL,
  `Kres` int(11) DEFAULT NULL,
  `Nom` varchar(250) DEFAULT NULL,
  `Prenom` varchar(250) DEFAULT NULL,
  `Matri` varchar(10) NOT NULL,
  `Adresse` longtext,
  `AdrePers` longtext
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ageperm`
--

DROP TABLE IF EXISTS `ageperm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ageperm` (
  `Kape` int(11) NOT NULL AUTO_INCREMENT,
  `Kcpe` int(11) DEFAULT NULL,
  `Kage` int(11) DEFAULT NULL,
  `NumPerm` varchar(255) DEFAULT NULL,
  `DatObt` datetime DEFAULT NULL,
  `Verrou` blob,
  PRIMARY KEY (`Kape`)
) ENGINE=MyISAM AUTO_INCREMENT=309 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `agepiece`
--

DROP TABLE IF EXISTS `agepiece`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agepiece` (
  `Kpie` int(11) NOT NULL AUTO_INCREMENT,
  `Kcpe` int(11) DEFAULT NULL,
  `Kage` int(11) NOT NULL,
  `TypPie` int(11) NOT NULL,
  `NumPie` varchar(255) DEFAULT NULL,
  `DatPie` datetime DEFAULT NULL,
  `DatVal` datetime DEFAULT NULL,
  `SignPie` varchar(255) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kpie`)
) ENGINE=MyISAM AUTO_INCREMENT=2838 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `agerol`
--

DROP TABLE IF EXISTS `agerol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agerol` (
  `Kagr` int(11) NOT NULL AUTO_INCREMENT,
  `Kage` int(11) NOT NULL,
  `Krol` int(11) NOT NULL,
  `Priorite` int(11) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kagr`)
) ENGINE=MyISAM AUTO_INCREMENT=5212 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `annexes`
--

DROP TABLE IF EXISTS `annexes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `annexes` (
  `Kann` int(11) NOT NULL AUTO_INCREMENT,
  `Krol` int(11) DEFAULT NULL,
  `LibAnnc` varchar(50) DEFAULT NULL,
  `LibAnn` varchar(200) DEFAULT NULL,
  `Lie` tinyint(4) NOT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kann`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `backupagents`
--

DROP TABLE IF EXISTS `backupagents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `backupagents` (
  `Kage` int(11) NOT NULL,
  `Kuni` int(11) DEFAULT NULL,
  `Ksub` int(11) DEFAULT NULL,
  `Kser` int(11) DEFAULT NULL,
  `Kbat` int(11) DEFAULT NULL,
  `Kgra` int(11) DEFAULT NULL,
  `Kbur` int(11) DEFAULT NULL,
  `Kres` int(11) DEFAULT NULL,
  `Ksec` int(11) DEFAULT NULL,
  `Nom` varchar(250) DEFAULT NULL,
  `Prenom` varchar(250) DEFAULT NULL,
  `Matri` varchar(10) NOT NULL,
  `DatCre` datetime DEFAULT NULL,
  `DatOuv` datetime DEFAULT NULL,
  `DatMod` datetime DEFAULT NULL,
  `DatClo` datetime DEFAULT NULL,
  `HorSect` varchar(10) DEFAULT NULL,
  `CodHie` smallint(6) DEFAULT NULL,
  `CodHor` varchar(6) DEFAULT NULL,
  `LibHor` varchar(100) DEFAULT NULL,
  `Telephone` varchar(20) DEFAULT NULL,
  `Poste` varchar(10) DEFAULT NULL,
  `Fax` varchar(20) DEFAULT NULL,
  `Portable` varchar(20) DEFAULT NULL,
  `Bureau` varchar(20) DEFAULT NULL,
  `RoleDeta` longtext,
  `DatMaj` datetime DEFAULT NULL,
  `DatNai` datetime DEFAULT NULL,
  `VilNai` varchar(250) DEFAULT NULL,
  `DepNai` varchar(5) DEFAULT NULL,
  `NomPre` varchar(30) DEFAULT NULL,
  `Actif` tinyint(4) NOT NULL,
  `IneTP` smallint(6) DEFAULT NULL,
  `HSLabo` smallint(6) DEFAULT NULL,
  `MissioLabo` tinyint(4) NOT NULL,
  `LogUse` varchar(100) DEFAULT NULL,
  `NumImmo` varchar(50) DEFAULT NULL,
  `INSEE` varchar(16) DEFAULT NULL,
  `Circe` tinyint(4) NOT NULL,
  `PaysNai` varchar(250) DEFAULT NULL,
  `Signat` tinyint(4) NOT NULL,
  `Temptation` tinyint(4) NOT NULL,
  `Verrou` tinyblob,
  `NumautCond` int(11) DEFAULT NULL,
  `Autorise` int(11) DEFAULT NULL,
  `INM` char(5) DEFAULT NULL,
  `AgGesper` varchar(12) DEFAULT NULL,
  `AgRe` varchar(20) DEFAULT NULL,
  `AgRisques` int(11) DEFAULT NULL,
  `Ksec2` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `batiments`
--

DROP TABLE IF EXISTS `batiments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `batiments` (
  `Kbat` int(11) NOT NULL AUTO_INCREMENT,
  `LibBatC` varchar(50) DEFAULT NULL,
  `LibBat` varchar(250) DEFAULT NULL,
  `Verrou` tinyblob,
  `GPS` varchar(50) NOT NULL,
  PRIMARY KEY (`Kbat`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `catgrad`
--

DROP TABLE IF EXISTS `catgrad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catgrad` (
  `Kcgr` int(11) NOT NULL AUTO_INCREMENT,
  `LibCgr` varchar(150) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kcgr`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `catperm`
--

DROP TABLE IF EXISTS `catperm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catperm` (
  `Kcpe` int(11) NOT NULL AUTO_INCREMENT,
  `CatPerm` char(10) DEFAULT NULL,
  `DefPerm` longtext,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kcpe`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `catpiece`
--

DROP TABLE IF EXISTS `catpiece`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catpiece` (
  `Kcpi` int(11) NOT NULL AUTO_INCREMENT,
  `TypPiece` int(11) DEFAULT NULL,
  `CatPiece` varchar(150) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kcpi`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacts` (
  `Kcon` int(11) NOT NULL AUTO_INCREMENT,
  `Ksoc` int(11) NOT NULL,
  `Nom` varchar(100) DEFAULT NULL,
  `Prenom` varchar(100) DEFAULT NULL,
  `Mel` varchar(250) DEFAULT NULL,
  `Telephone` varchar(20) DEFAULT NULL,
  `Portable` varchar(20) DEFAULT NULL,
  `Fax` varchar(20) DEFAULT NULL,
  `Fonction` varchar(100) DEFAULT NULL,
  `DatMaj` datetime DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kcon`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `db_interim`
--

DROP TABLE IF EXISTS `db_interim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `db_interim` (
  `PID` int(11) NOT NULL AUTO_INCREMENT,
  `Agent` int(11) DEFAULT NULL,
  `Interim` int(11) DEFAULT NULL,
  `Final` int(11) DEFAULT NULL,
  `D0` datetime DEFAULT NULL,
  `D1` datetime DEFAULT NULL,
  `VISA1` int(11) DEFAULT NULL,
  `VISA2` int(11) DEFAULT NULL,
  `VALID` int(11) DEFAULT NULL,
  `UID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `descripchamp`
--

DROP TABLE IF EXISTS `descripchamp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `descripchamp` (
  `Kdes` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `haut` int(11) DEFAULT NULL,
  `gauche` int(11) DEFAULT NULL,
  `largeur` int(11) DEFAULT NULL,
  `hauteur` int(11) DEFAULT NULL,
  `panel` varchar(100) DEFAULT NULL,
  `caption` varchar(100) DEFAULT NULL,
  `Descrip` longtext,
  `indice` int(11) DEFAULT NULL,
  PRIMARY KEY (`Kdes`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `domaines`
--

DROP TABLE IF EXISTS `domaines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `domaines` (
  `ID_DOMAINE` decimal(3,0) NOT NULL,
  `NOM_DOMAINE` int(11) NOT NULL,
  PRIMARY KEY (`ID_DOMAINE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `droit_consult`
--

DROP TABLE IF EXISTS `droit_consult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `droit_consult` (
  `KConsult` int(11) NOT NULL AUTO_INCREMENT,
  `CodeConsult` int(11) DEFAULT NULL,
  `LibConsultC` char(50) DEFAULT NULL,
  `LibConsult` char(50) DEFAULT NULL,
  PRIMARY KEY (`KConsult`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `etablissements`
--

DROP TABLE IF EXISTS `etablissements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etablissements` (
  `Kets` int(11) NOT NULL AUTO_INCREMENT,
  `Kadr` int(11) DEFAULT NULL,
  `LibEts` text CHARACTER SET latin1,
  `LibEtsC` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `Obs` longtext CHARACTER SET latin1,
  `etsGESPER` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `Archive` int(11) NOT NULL,
  PRIMARY KEY (`Kets`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `familles`
--

DROP TABLE IF EXISTS `familles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `familles` (
  `Kfam` int(11) NOT NULL AUTO_INCREMENT,
  `LibFam` varchar(100) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kfam`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feries`
--

DROP TABLE IF EXISTS `feries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feries` (
  `Kfer` int(11) NOT NULL AUTO_INCREMENT,
  `DateFerie` datetime DEFAULT NULL,
  `LibFerie` varchar(100) DEFAULT NULL,
  `RTT` tinyint(4) NOT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kfer`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gestion_droits`
--

DROP TABLE IF EXISTS `gestion_droits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gestion_droits` (
  `Kdts` int(11) NOT NULL AUTO_INCREMENT,
  `Kage` int(11) DEFAULT NULL,
  `DtValid` int(11) DEFAULT NULL,
  `DtConsultation` int(11) DEFAULT NULL,
  PRIMARY KEY (`Kdts`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grades` (
  `Kgra` int(11) NOT NULL AUTO_INCREMENT,
  `Kcgr` int(11) NOT NULL,
  `LibGrac` varchar(50) DEFAULT NULL,
  `LibGra` varchar(250) DEFAULT NULL,
  `Gesper` varchar(20) DEFAULT NULL,
  `Statut` varchar(100) DEFAULT NULL,
  `CatFP` varchar(50) DEFAULT NULL,
  `TechAdm` varchar(100) DEFAULT NULL,
  `HSDroit` tinyint(4) NOT NULL,
  `Verrou` int(11) DEFAULT NULL,
  PRIMARY KEY (`Kgra`)
) ENGINE=MyISAM AUTO_INCREMENT=113 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hierarchie`
--

DROP TABLE IF EXISTS `hierarchie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hierarchie` (
  `Khie` int(11) NOT NULL AUTO_INCREMENT,
  `Kuni` int(11) DEFAULT NULL,
  `Ksub` int(11) DEFAULT NULL,
  `Kser` int(11) DEFAULT NULL,
  `Kage` int(11) NOT NULL,
  `Krol` int(11) NOT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Khie`)
) ENGINE=MyISAM AUTO_INCREMENT=1617 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `historic`
--

DROP TABLE IF EXISTS `historic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historic` (
  `Khis` int(11) NOT NULL AUTO_INCREMENT,
  `LogUse` varchar(50) DEFAULT NULL,
  `LibHis` varchar(50) DEFAULT NULL,
  `LibSubc` varchar(50) DEFAULT NULL,
  `DatExe` datetime DEFAULT NULL,
  `TypExe` varchar(3) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Khis`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `interim`
--

DROP TABLE IF EXISTS `interim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interim` (
  `PID` int(11) NOT NULL AUTO_INCREMENT,
  `AGENT` int(11) DEFAULT NULL,
  `V1` int(11) DEFAULT NULL,
  `V2` int(11) DEFAULT NULL,
  PRIMARY KEY (`PID`)
) ENGINE=MyISAM AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medic_cat`
--

DROP TABLE IF EXISTS `medic_cat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medic_cat` (
  `id` int(11) NOT NULL,
  `cat` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medic_dossiers`
--

DROP TABLE IF EXISTS `medic_dossiers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medic_dossiers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kage` int(11) NOT NULL DEFAULT '-1',
  `poste_actuel` text,
  `traitements` text,
  `tabac` varchar(50) DEFAULT '0',
  `alcool` varchar(50) DEFAULT '0',
  `sport` varchar(50) DEFAULT '0',
  `orientations` varchar(255) DEFAULT NULL,
  `conclusions` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `cat` int(11) DEFAULT NULL,
  `Taille` float DEFAULT NULL,
  `Poids` float DEFAULT NULL,
  `Pouls` float DEFAULT NULL,
  `TA` varchar(50) DEFAULT NULL,
  `TA_ORD` varchar(50) DEFAULT NULL,
  `TA_ORG` varchar(50) DEFAULT NULL,
  `clinique` varchar(255) DEFAULT NULL,
  `vaccinations` text,
  `TA_CORRECTION` varchar(50) DEFAULT NULL,
  `TA_RQ` varchar(255) DEFAULT NULL,
  `CVF` float DEFAULT NULL,
  `VEMS` float DEFAULT NULL,
  `VEMS_CVF` float DEFAULT NULL,
  `DEMM` float DEFAULT NULL,
  `TU` varchar(50) DEFAULT NULL,
  `TU_RESULT` varchar(255) DEFAULT NULL,
  `TV_OD` varchar(2) DEFAULT NULL,
  `TV_OG` varchar(2) DEFAULT NULL,
  `TV_CORRECTION` varchar(50) DEFAULT NULL,
  `TV_RQ` varchar(255) DEFAULT NULL,
  `TV_ANOMALIE` varchar(255) DEFAULT NULL,
  `TV_STIGM` varchar(50) DEFAULT NULL,
  `commentaires` longtext,
  `_clinique` longtext,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medic_gen`
--

DROP TABLE IF EXISTS `medic_gen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medic_gen` (
  `kage` int(11) NOT NULL,
  `gen_perso` text NOT NULL,
  `gen_family` text NOT NULL,
  PRIMARY KEY (`kage`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medic_type`
--

DROP TABLE IF EXISTS `medic_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medic_type` (
  `id` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mela`
--

DROP TABLE IF EXISTS `mela`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mela` (
  `Kmela` int(11) NOT NULL AUTO_INCREMENT,
  `Kage` int(11) NOT NULL,
  `LibMelA` varchar(250) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kmela`)
) ENGINE=MyISAM AUTO_INCREMENT=3070 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mele`
--

DROP TABLE IF EXISTS `mele`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mele` (
  `Kmele` int(11) NOT NULL AUTO_INCREMENT,
  `Kets` int(11) NOT NULL,
  `LibMelE` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Kmele`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mels`
--

DROP TABLE IF EXISTS `mels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mels` (
  `Kmels` int(11) NOT NULL AUTO_INCREMENT,
  `Ksub` int(11) NOT NULL,
  `LibMelS` longtext,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kmels`)
) ENGINE=MyISAM AUTO_INCREMENT=95 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `melu`
--

DROP TABLE IF EXISTS `melu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `melu` (
  `Kmelu` int(11) NOT NULL AUTO_INCREMENT,
  `Kuni` int(11) NOT NULL,
  `LibMelU` longtext,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kmelu`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `melv`
--

DROP TABLE IF EXISTS `melv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `melv` (
  `Kmelv` int(11) NOT NULL AUTO_INCREMENT,
  `Kser` int(11) NOT NULL,
  `LibMelV` longtext,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kmelv`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `monblob`
--

DROP TABLE IF EXISTS `monblob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monblob` (
  `id_blob` int(11) NOT NULL AUTO_INCREMENT,
  `blob` blob NOT NULL,
  PRIMARY KEY (`id_blob`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `motif`
--

DROP TABLE IF EXISTS `motif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motif` (
  `kmof` int(11) NOT NULL AUTO_INCREMENT,
  `motif` varchar(255) NOT NULL,
  PRIMARY KEY (`kmof`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mpaagent`
--

DROP TABLE IF EXISTS `mpaagent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mpaagent` (
  `id_MPA` int(11) NOT NULL AUTO_INCREMENT,
  `Kage` int(11) NOT NULL,
  `idMPALOLF` int(11) DEFAULT NULL,
  `quotite_MPA` int(11) DEFAULT NULL,
  `debut_MPA` datetime DEFAULT NULL,
  `fin_MPA` datetime DEFAULT NULL,
  `delete_MPA` tinyint(4) NOT NULL,
  PRIMARY KEY (`id_MPA`)
) ENGINE=MyISAM AUTO_INCREMENT=1461 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mpalolf`
--

DROP TABLE IF EXISTS `mpalolf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mpalolf` (
  `idMPALOLF` int(11) NOT NULL AUTO_INCREMENT,
  `codeLOLF` varchar(16) DEFAULT NULL,
  `libMission` text,
  `libProgramme` text,
  `libAction` text,
  `libSousAction` text,
  PRIMARY KEY (`idMPALOLF`)
) ENGINE=MyISAM AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `old_grades`
--

DROP TABLE IF EXISTS `old_grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `old_grades` (
  `Kgra` int(11) NOT NULL AUTO_INCREMENT,
  `Kcgr` int(11) NOT NULL,
  `LibGrac` varchar(50) DEFAULT NULL,
  `LibGra` varchar(250) DEFAULT NULL,
  `Gesper` int(11) DEFAULT NULL,
  `Statut` varchar(100) DEFAULT NULL,
  `CatFP` varchar(50) DEFAULT NULL,
  `TechAdm` varchar(100) DEFAULT NULL,
  `HSDroit` tinyint(4) NOT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kgra`)
) ENGINE=MyISAM AUTO_INCREMENT=83 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `param`
--

DROP TABLE IF EXISTS `param`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `param` (
  `Kpar` int(11) NOT NULL AUTO_INCREMENT,
  `SauvSource` longtext,
  `ImagesCS` longtext,
  `ImagesWeb` longtext,
  `PhotosCS` longtext,
  `PhotoWeb` longtext,
  `TSource` varchar(100) DEFAULT NULL,
  `TUser` varchar(100) DEFAULT NULL,
  `TBDD` varchar(100) DEFAULT NULL,
  `TPasse` varchar(100) DEFAULT NULL,
  `TProprio` varchar(100) DEFAULT NULL,
  `TAcces` varchar(100) DEFAULT NULL,
  `TServer` varchar(100) DEFAULT NULL,
  `RSource` varchar(100) DEFAULT NULL,
  `RUser` varchar(100) DEFAULT NULL,
  `RBDD` varchar(100) DEFAULT NULL,
  `RPasse` varchar(100) DEFAULT NULL,
  `RProprio` varchar(100) DEFAULT NULL,
  `RAcces` varchar(100) DEFAULT NULL,
  `RServer` varchar(100) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kpar`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `param_droits`
--

DROP TABLE IF EXISTS `param_droits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `param_droits` (
  `Kparam` int(11) NOT NULL AUTO_INCREMENT,
  `Kage` int(11) DEFAULT NULL,
  `Param` varchar(100) DEFAULT NULL,
  `Value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Kparam`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `passeport`
--

DROP TABLE IF EXISTS `passeport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `passeport` (
  `Id` int(11) NOT NULL,
  `IdHabilitation` int(11) DEFAULT NULL,
  `IdAgent` int(11) DEFAULT NULL,
  `IdContact` int(11) DEFAULT NULL,
  `Login` tinytext,
  `Password` tinytext,
  `UID` tinytext,
  `Actif` bit(1) DEFAULT NULL,
  `DateDerCon` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo` (
  `PID` int(11) NOT NULL AUTO_INCREMENT,
  `MATRI` varchar(50) DEFAULT NULL,
  `PHOTO` varchar(50) DEFAULT NULL,
  `Verrou` tinyblob,
  `LOCK` int(11) DEFAULT NULL,
  PRIMARY KEY (`PID`)
) ENGINE=MyISAM AUTO_INCREMENT=1610 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position` (
  `Kpst` int(11) NOT NULL AUTO_INCREMENT,
  `IDPos` varchar(10) DEFAULT NULL,
  `Position` varchar(100) DEFAULT NULL,
  `Description` longtext,
  `Ordre` smallint(6) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kpst`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `postal`
--

DROP TABLE IF EXISTS `postal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `postal` (
  `Id` int(11) NOT NULL,
  `IdDepartement` int(11) DEFAULT NULL,
  `IdZone` int(11) DEFAULT NULL,
  `Code` varchar(50) DEFAULT NULL,
  `Ville` tinytext
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recapitulatif`
--

DROP TABLE IF EXISTS `recapitulatif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recapitulatif` (
  `id_recapitulatif` int(11) NOT NULL AUTO_INCREMENT,
  `Kage` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Session` varchar(10) NOT NULL,
  `Nom_organisme` varchar(100) NOT NULL,
  `type_formation` int(11) NOT NULL,
  `upload` longtext,
  PRIMARY KEY (`id_recapitulatif`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rolconsult`
--

DROP TABLE IF EXISTS `rolconsult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolconsult` (
  `kRolConsult` int(11) NOT NULL AUTO_INCREMENT,
  `krol` int(11) DEFAULT NULL,
  `KConsult` int(11) DEFAULT NULL,
  PRIMARY KEY (`kRolConsult`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `Krol` int(11) NOT NULL AUTO_INCREMENT,
  `CodRol` int(11) DEFAULT NULL,
  `LibRolc` varchar(50) DEFAULT NULL,
  `LibRol` varchar(150) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Krol`)
) ENGINE=MyISAM AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sauvage`
--

DROP TABLE IF EXISTS `sauvage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sauvage` (
  `Ksav` int(11) NOT NULL AUTO_INCREMENT,
  `Kuse` int(11) NOT NULL,
  `LibSavc` varchar(50) DEFAULT NULL,
  `LibSav` varchar(100) DEFAULT NULL,
  `DatSav` datetime DEFAULT NULL,
  `Troncage` smallint(6) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Ksav`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `Kser` int(11) NOT NULL AUTO_INCREMENT,
  `Ksub` int(11) NOT NULL,
  `Kadr` int(11) DEFAULT NULL,
  `LibSerC` varchar(50) DEFAULT NULL,
  `LibSer` varchar(250) DEFAULT NULL,
  `Telephone` varchar(20) DEFAULT NULL,
  `Fax` varchar(20) DEFAULT NULL,
  `Obs` longtext,
  `CodHie` int(11) DEFAULT NULL,
  `Chemin` longtext,
  `Archive` tinyint(4) DEFAULT NULL,
  `Verrou` tinyblob,
  `Code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Kser`)
) ENGINE=MyISAM AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `societes`
--

DROP TABLE IF EXISTS `societes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `societes` (
  `Ksoc` int(11) NOT NULL AUTO_INCREMENT,
  `Kfam` int(11) NOT NULL,
  `Kpos` int(11) NOT NULL,
  `LibSocc` varchar(50) DEFAULT NULL,
  `LibSoc` varchar(100) DEFAULT NULL,
  `Adresse` longtext,
  `Web` longtext,
  `Mel` longtext,
  `Telephone` varchar(20) DEFAULT NULL,
  `Fax` varchar(20) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Ksoc`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sous_domaines`
--

DROP TABLE IF EXISTS `sous_domaines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sous_domaines` (
  `ID_SOUS_DOMAINES` decimal(3,0) NOT NULL,
  `ID_DOMAINE` decimal(3,0) NOT NULL,
  `NOM_SOUS_DOMAINES` int(11) NOT NULL,
  PRIMARY KEY (`ID_SOUS_DOMAINES`),
  KEY `FK_APPARTENIR` (`ID_DOMAINE`),
  CONSTRAINT `FK_APPARTENIR` FOREIGN KEY (`ID_DOMAINE`) REFERENCES `domaines` (`ID_DOMAINE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `srhmel`
--

DROP TABLE IF EXISTS `srhmel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `srhmel` (
  `Ksrh` int(11) NOT NULL AUTO_INCREMENT,
  `Kage` int(11) NOT NULL,
  `Melanie` tinyint(4) NOT NULL,
  `SRHVac` tinyint(4) NOT NULL,
  `SRH` tinyint(4) NOT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Ksrh`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subdis`
--

DROP TABLE IF EXISTS `subdis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subdis` (
  `Ksub` int(11) NOT NULL AUTO_INCREMENT,
  `Kuni` int(11) NOT NULL,
  `Kadr` int(11) DEFAULT NULL,
  `LibSubC` varchar(50) DEFAULT NULL,
  `LibSub` varchar(250) DEFAULT NULL,
  `HorSect` char(10) DEFAULT NULL,
  `Code` char(10) DEFAULT NULL,
  `Telephone` varchar(20) DEFAULT NULL,
  `Fax` varchar(20) DEFAULT NULL,
  `Obs` longtext,
  `CodHie` int(11) DEFAULT NULL,
  `Chemin` longtext,
  `Archive` tinyint(4) DEFAULT NULL,
  `Verrou` tinyblob,
  `subGESPER` varchar(4) DEFAULT NULL,
  `Kets` int(11) DEFAULT NULL,
  PRIMARY KEY (`Ksub`)
) ENGINE=MyISAM AUTO_INCREMENT=174 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tempbpc`
--

DROP TABLE IF EXISTS `tempbpc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tempbpc` (
  `Matri` varchar(10) DEFAULT NULL,
  `NomPre` varchar(30) DEFAULT NULL,
  `DatCre` datetime DEFAULT NULL,
  `DatOuv` datetime DEFAULT NULL,
  `DatMod` datetime DEFAULT NULL,
  `DatClo` datetime DEFAULT NULL,
  `Horcode` varchar(6) DEFAULT NULL,
  `LibCourt` varchar(20) DEFAULT NULL,
  `IneTP` smallint(6) DEFAULT NULL,
  `InHS` smallint(6) DEFAULT NULL,
  `DatHophJou` datetime DEFAULT NULL,
  `Verrou` tinyblob
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `travaille`
--

DROP TABLE IF EXISTS `travaille`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `travaille` (
  `ID_SOUS_DOMAINES` decimal(3,0) NOT NULL,
  `ID_MATRICULE` int(11) NOT NULL,
  PRIMARY KEY (`ID_SOUS_DOMAINES`,`ID_MATRICULE`),
  KEY `FK_TRAVAILLE2` (`ID_MATRICULE`),
  CONSTRAINT `FK_TRAVAILLE` FOREIGN KEY (`ID_SOUS_DOMAINES`) REFERENCES `sous_domaines` (`ID_SOUS_DOMAINES`),
  CONSTRAINT `FK_TRAVAILLE2` FOREIGN KEY (`ID_MATRICULE`) REFERENCES `agents` (`ID_MATRICULE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trombi`
--

DROP TABLE IF EXISTS `trombi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trombi` (
  `kage` int(11) NOT NULL,
  `trombi` longtext,
  PRIMARY KEY (`kage`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `type_formation`
--

DROP TABLE IF EXISTS `type_formation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_formation` (
  `id_formation` int(11) NOT NULL AUTO_INCREMENT,
  `Libelle` varchar(100) NOT NULL,
  `frequence` int(11) NOT NULL,
  PRIMARY KEY (`id_formation`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `unites`
--

DROP TABLE IF EXISTS `unites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unites` (
  `Kuni` int(11) NOT NULL AUTO_INCREMENT,
  `Kadr` int(11) DEFAULT NULL,
  `LibUnic` varchar(50) DEFAULT NULL,
  `LibUni` varchar(250) DEFAULT NULL,
  `Telephone` varchar(20) DEFAULT NULL,
  `Fax` varchar(20) DEFAULT NULL,
  `Obs` longtext,
  `CodHie` int(11) DEFAULT NULL,
  `Chemin` longtext,
  `Archive` tinyint(4) DEFAULT NULL,
  `Verrou` tinyblob,
  `uniGESPER` varchar(8) DEFAULT NULL,
  `Code` varchar(10) DEFAULT NULL,
  `Kets` int(11) DEFAULT NULL,
  PRIMARY KEY (`Kuni`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `useannex`
--

DROP TABLE IF EXISTS `useannex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `useannex` (
  `Kuseann` int(11) NOT NULL AUTO_INCREMENT,
  `Kuse` int(11) NOT NULL,
  `Kann` int(11) NOT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kuseann`)
) ENGINE=MyISAM AUTO_INCREMENT=1203 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `Kuse` int(11) NOT NULL AUTO_INCREMENT,
  `Kage` int(11) NOT NULL,
  `IdPasseport` int(11) NOT NULL,
  `DatDerCon` datetime DEFAULT NULL,
  `Activite` tinyint(4) NOT NULL,
  `Admin` tinyint(4) NOT NULL,
  `Srh` tinyint(4) NOT NULL,
  `Unite` tinyint(4) NOT NULL,
  `SPMG` tinyint(4) NOT NULL,
  `Verrou` tinyblob,
  `Consult` tinyint(4) DEFAULT NULL,
  `CFA` tinyint(4) NOT NULL,
  PRIMARY KEY (`Kuse`)
) ENGINE=MyISAM AUTO_INCREMENT=227 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `v_anubis`
--

DROP TABLE IF EXISTS `v_anubis`;
/*!50001 DROP VIEW IF EXISTS `v_anubis`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_anubis` AS SELECT 
 1 AS `Nom`,
 1 AS `Prenom`,
 1 AS `Matri`,
 1 AS `Poste`,
 1 AS `Portable`,
 1 AS `LibMelA`,
 1 AS `LIBELLE_POSTE`,
 1 AS `FAMILLE_PROF`,
 1 AS `EMPLOI_TYPE`,
 1 AS `LibBatC`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_bpcandroid`
--

DROP TABLE IF EXISTS `v_bpcandroid`;
/*!50001 DROP VIEW IF EXISTS `v_bpcandroid`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_bpcandroid` AS SELECT 
 1 AS `Nom`,
 1 AS `Prenom`,
 1 AS `Matri`,
 1 AS `Telephone`,
 1 AS `LibMelA`,
 1 AS `LibBatC`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `vehassu`
--

DROP TABLE IF EXISTS `vehassu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehassu` (
  `Kvas` int(11) NOT NULL AUTO_INCREMENT,
  `NomAss` varchar(250) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kvas`)
) ENGINE=MyISAM AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vehmark`
--

DROP TABLE IF EXISTS `vehmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehmark` (
  `Kvmk` int(11) NOT NULL AUTO_INCREMENT,
  `Marque` varchar(250) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kvmk`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vehmod`
--

DROP TABLE IF EXISTS `vehmod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehmod` (
  `Kvmd` int(11) NOT NULL AUTO_INCREMENT,
  `Kvmk` int(11) NOT NULL,
  `Modele` varchar(250) DEFAULT NULL,
  `CV` int(11) DEFAULT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kvmd`)
) ENGINE=MyISAM AUTO_INCREMENT=342 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `versions`
--

DROP TABLE IF EXISTS `versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `versions` (
  `Kver` int(11) NOT NULL AUTO_INCREMENT,
  `LibVer` varchar(200) DEFAULT NULL,
  `DatVer` datetime DEFAULT NULL,
  `Numero` varchar(10) DEFAULT NULL,
  `Obs` longtext,
  `Activite` tinyint(4) NOT NULL,
  `Verrou` tinyblob,
  PRIMARY KEY (`Kver`)
) ENGINE=MyISAM AUTO_INCREMENT=74 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `visiom`
--

DROP TABLE IF EXISTS `visiom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visiom` (
  `kage` int(11) NOT NULL,
  `LIBELLE_POSTE` varchar(73) DEFAULT NULL,
  `FAMILLE_PROF` varchar(46) DEFAULT NULL,
  `EMPLOI_TYPE` varchar(64) DEFAULT NULL,
  `REHUCIT` varchar(23) DEFAULT NULL,
  `NOM` varchar(16) DEFAULT NULL,
  `PRENOM` varchar(15) DEFAULT NULL,
  `DATE_NAISSANCE` varchar(23) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vm`
--

DROP TABLE IF EXISTS `vm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vm` (
  `kvm` int(11) NOT NULL AUTO_INCREMENT,
  `kage` int(11) NOT NULL,
  `nature_visite` int(11) NOT NULL,
  `date_visite` date DEFAULT NULL,
  `heure_visite` time DEFAULT NULL,
  `resultats` int(11) DEFAULT NULL,
  `commentaires` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`kvm`)
) ENGINE=MyISAM AUTO_INCREMENT=813 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vm_natures`
--

DROP TABLE IF EXISTS `vm_natures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vm_natures` (
  `kvm_natures` int(11) NOT NULL AUTO_INCREMENT,
  `nature` varchar(255) NOT NULL,
  PRIMARY KEY (`kvm_natures`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vm_resultats`
--

DROP TABLE IF EXISTS `vm_resultats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vm_resultats` (
  `kvm_resultats` int(11) NOT NULL AUTO_INCREMENT,
  `resultat` varchar(255) NOT NULL,
  PRIMARY KEY (`kvm_resultats`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `_bpcandroid`
--

/*!50001 DROP VIEW IF EXISTS `_bpcandroid`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `_bpcandroid` AS select distinct `agents`.`Nom` AS `Nom`,`agents`.`Prenom` AS `Prenom`,`agents`.`Matri` AS `Matri`,`agents`.`Telephone` AS `Telephone`,`mela`.`LibMelA` AS `LibMelA`,`batiments`.`LibBatC` AS `LibBatC` from ((`agents` join `batiments`) join `mela`) where ((`agents`.`Kage` = `mela`.`Kage`) and (`agents`.`Kbat` = `batiments`.`Kbat`)) order by `agents`.`Nom` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_anubis`
--

/*!50001 DROP VIEW IF EXISTS `v_anubis`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_anubis` AS select distinct `agents`.`Nom` AS `Nom`,`agents`.`Prenom` AS `Prenom`,`agents`.`Matri` AS `Matri`,`agents`.`Poste` AS `Poste`,`agents`.`Portable` AS `Portable`,`mela`.`LibMelA` AS `LibMelA`,`visiom`.`LIBELLE_POSTE` AS `LIBELLE_POSTE`,`visiom`.`FAMILLE_PROF` AS `FAMILLE_PROF`,`visiom`.`EMPLOI_TYPE` AS `EMPLOI_TYPE`,`batiments`.`LibBatC` AS `LibBatC` from (((`agents` join `mela`) join `visiom`) join `batiments`) where ((`agents`.`Kage` = `mela`.`Kage`) and (`agents`.`Kage` = `visiom`.`kage`) and (`agents`.`Kbat` = `batiments`.`Kbat`) and (`agents`.`Actif` = 1) and (`mela`.`LibMelA` like '%@cerema%')) order by `agents`.`Nom` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_bpcandroid`
--

/*!50001 DROP VIEW IF EXISTS `v_bpcandroid`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_bpcandroid` AS select distinct `agents`.`Nom` AS `Nom`,`agents`.`Prenom` AS `Prenom`,`agents`.`Matri` AS `Matri`,`agents`.`Telephone` AS `Telephone`,`mela`.`LibMelA` AS `LibMelA`,`batiments`.`LibBatC` AS `LibBatC` from ((`agents` join `batiments`) join `mela`) where ((`agents`.`Kage` = `mela`.`Kage`) and (`agents`.`Kbat` = `batiments`.`Kbat`)) order by `agents`.`Nom` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-06 10:28:34
