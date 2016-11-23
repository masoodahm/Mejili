CREATE DATABASE  IF NOT EXISTS `mejili` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mejili`;
-- MySQL dump 10.13  Distrib 5.5.40, for debian-linux-gnu (x86_64)
--
-- Host: 199.193.116.14    Database: mejili
-- ------------------------------------------------------
-- Server version	5.5.32

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
-- Table structure for table `board_activities`
--

DROP TABLE IF EXISTS `board_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board_activities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `board_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_activities`
--

LOCK TABLES `board_activities` WRITE;
/*!40000 ALTER TABLE `board_activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `board_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board_members`
--

DROP TABLE IF EXISTS `board_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board_members` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admin` tinyint(1) NOT NULL,
  `board_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_members`
--

LOCK TABLES `board_members` WRITE;
/*!40000 ALTER TABLE `board_members` DISABLE KEYS */;
INSERT INTO `board_members` VALUES (1,0,1,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,0,2,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,1,3,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,1,4,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,1,5,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,1,6,1,'0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `board_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boards` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `open` tinyint(1) NOT NULL,
  `board_visibility` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
INSERT INTO `boards` VALUES (1,'Welcome Board','n',1,0,'2014-09-19 09:40:41','2014-09-19 09:40:41'),(2,'Work Board','n',1,0,'2014-09-19 09:50:28','2014-09-19 09:50:28'),(3,'Things to do in Free Time','n',1,0,'2014-09-19 09:51:05','2014-09-19 09:51:05'),(4,'Sign Board','n',1,0,'2014-09-19 10:46:29','2014-09-19 10:46:29');
/*!40000 ALTER TABLE `boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_activities`
--

DROP TABLE IF EXISTS `card_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `card_activities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `card_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_activities`
--

LOCK TABLES `card_activities` WRITE;
/*!40000 ALTER TABLE `card_activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_attachments`
--

DROP TABLE IF EXISTS `card_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `card_attachments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `file_extension` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `file_location` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `attachment_type` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_attachments`
--

LOCK TABLES `card_attachments` WRITE;
/*!40000 ALTER TABLE `card_attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_checklists`
--

DROP TABLE IF EXISTS `card_checklists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `card_checklists` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `card_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_checklists`
--

LOCK TABLES `card_checklists` WRITE;
/*!40000 ALTER TABLE `card_checklists` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_checklists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_comments`
--

DROP TABLE IF EXISTS `card_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `card_comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `card_id` int(11) NOT NULL,
  `commenter_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_comments`
--

LOCK TABLES `card_comments` WRITE;
/*!40000 ALTER TABLE `card_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_members`
--

DROP TABLE IF EXISTS `card_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `card_members` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `card_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_members`
--

LOCK TABLES `card_members` WRITE;
/*!40000 ALTER TABLE `card_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cards` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `due_date` datetime DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `list_id` int(11) DEFAULT NULL,
  `assignee_id` int(11) DEFAULT NULL,
  `archived` tinyint(1) DEFAULT NULL,
  `color` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'gray',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` VALUES (21,'Complete Card Editing','','0000-00-00 00:00:00',1,6,0,0,'red','2014-09-22 04:30:02','2014-10-09 12:47:12'),(22,'Make a repo on github','','0000-00-00 00:00:00',3,9,0,0,'blank','2014-09-22 04:30:26','2014-10-09 12:47:03'),(23,'Install a demo site','','0000-00-00 00:00:00',1,9,0,0,'red','2014-09-22 04:30:36','2014-10-09 12:46:55'),(24,'Create User Authentication System','','0000-00-00 00:00:00',4,9,0,0,'blue','2014-09-22 04:30:56','2014-10-09 12:47:03'),(25,'Create Card Editing','','0000-00-00 00:00:00',0,6,0,0,'yellow','2014-09-22 04:31:08','2014-10-09 12:47:13'),(26,'Create list Creation ','','0000-00-00 00:00:00',0,9,0,0,'blank','2014-09-22 04:31:17','2014-10-07 22:08:11'),(27,'Make Cards colorable','','0000-00-00 00:00:00',2,9,0,0,'blank','2014-09-22 04:31:43','2014-10-09 12:46:55'),(28,'Make Board Draggable','','0000-00-00 00:00:00',5,9,0,0,'blank','2014-09-22 04:31:53','2014-10-09 12:47:03'),(29,'Make Cards Draggable','','0000-00-00 00:00:00',6,9,0,0,'blank','2014-09-22 04:32:00','2014-10-09 12:47:03'),(30,'Sleep All Day','','0000-00-00 00:00:00',0,7,0,0,'blank','2014-09-22 04:32:54','2014-10-07 22:08:41'),(31,'Watch Doctor Who','','0000-00-00 00:00:00',1,7,0,0,'green','2014-09-22 04:33:21','2014-10-09 12:46:49'),(33,'Feeling Lazy','','0000-00-00 00:00:00',1,8,0,0,'blank','2014-09-22 11:05:35','2014-10-09 12:46:59'),(34,'Need to sleep','','0000-00-00 00:00:00',0,8,0,0,'blank','2014-09-22 11:06:39','2014-10-08 11:08:51'),(41,'This is supposed to be a welcome board but I am too lazy to write something here that would make sense','','0000-00-00 00:00:00',0,11,0,0,'red','2014-10-03 09:09:34','2014-10-09 12:40:04'),(50,'Add a color to a card: click on the card to open the card editing dialog and then click on the color button to change the card color','','0000-00-00 00:00:00',1,13,0,0,'','2014-10-03 09:15:14','2014-10-08 23:20:04'),(55,'You can change the tiitle of the card by clicking on the cards title in the card editing dialog.','','0000-00-00 00:00:00',0,13,0,0,'green','2014-10-03 09:18:19','2014-10-08 18:10:18'),(68,'This is a card','','0000-00-00 00:00:00',0,18,0,0,'','2014-10-03 09:33:41','2014-10-08 18:10:58'),(81,'You can drag a card','','0000-00-00 00:00:00',1,18,0,0,'','2014-10-03 10:33:22','2014-10-08 18:08:17'),(92,'Delete a card: click on the card to, in the card editing dialog click on delete','','0000-00-00 00:00:00',2,17,0,0,'orange','2014-10-03 11:35:14','2014-10-08 18:12:13'),(98,'You can edit the card by clicking on it','','0000-00-00 00:00:00',2,18,0,0,'blue','2014-10-03 12:13:28','2014-10-08 18:11:05'),(104,'Please Drag stuff around explore the app yourself -Thanks :)','Please explore the site by modifying cards and lists\n',NULL,1,11,NULL,NULL,'blank','2014-10-07 22:34:20','2014-10-08 18:01:42'),(105,'foobar','',NULL,3,18,NULL,NULL,'','2014-10-07 23:14:10','2014-10-08 18:10:20'),(106,'All Messages should go here, Please Don\'t delete others messages','',NULL,0,20,NULL,NULL,'red','2014-10-09 12:45:54','2014-10-09 14:04:48'),(107,'sdfsdf 123','asaas\n',NULL,0,19,NULL,NULL,'yellow','2014-10-09 14:04:42','2014-10-12 02:19:10'),(108,'12345','',NULL,1,20,NULL,NULL,'gray','2014-10-12 02:17:07','2014-10-12 02:17:07');
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checklist_items`
--

DROP TABLE IF EXISTS `checklist_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checklist_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `position` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `checked` tinyint(1) NOT NULL,
  `checklist_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklist_items`
--

LOCK TABLES `checklist_items` WRITE;
/*!40000 ALTER TABLE `checklist_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `checklist_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lists`
--

DROP TABLE IF EXISTS `lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lists` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `position` int(11) DEFAULT NULL,
  `board_id` int(11) DEFAULT NULL,
  `archived` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lists`
--

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;
INSERT INTO `lists` VALUES (6,'To do',0,2,0,'2014-09-22 04:29:16','2014-10-07 22:08:24'),(7,'Today',1,2,0,'2014-09-22 04:32:47','2014-10-07 22:08:25'),(8,'In Progress',2,2,0,'2014-09-22 04:33:00','2014-10-07 22:08:25'),(9,'Done',3,2,0,'2014-09-22 04:33:04','2014-10-07 22:08:25'),(10,'Todo',NULL,3,0,'2014-09-23 01:48:37','2014-09-23 01:48:37'),(11,'To Do',0,1,0,'2014-10-03 09:08:54','2014-10-09 20:27:28'),(13,'In Progress',2,1,0,'2014-10-03 09:09:20','2014-10-09 20:27:28'),(17,'Done',3,1,0,'2014-10-03 10:33:14','2014-10-09 20:11:31'),(18,'Today',1,1,0,'2014-10-03 10:48:44','2014-10-09 20:27:28'),(19,'Messages',0,4,NULL,'2014-10-09 12:45:45','2014-10-12 02:17:34'),(20,'sdf',1,4,NULL,'2014-10-09 14:04:31','2014-10-12 02:17:35');
/*!40000 ALTER TABLE `lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('2013_03_17_131246_verify_init',1),('2013_05_11_082613_use_soft_delete',1),('2014_09_18_082826_create_boards',2),('2014_09_18_083207_create_lists',2),('2014_09_18_083427_create_cards',2),('2014_09_18_083837_create_board_activities',2),('2014_09_18_084837_create_board_members',2),('2014_09_18_085459_create_card_members',2),('2014_09_18_085619_create_card_activities',2),('2014_09_18_085724_create_card_comments',2),('2014_09_18_091530_create_card_checklists',2),('2014_09_18_091651_create_checklist_items',2),('2014_09_18_093316_create_card_attachments',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_role` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `permission_role_permission_id_index` (`permission_id`),
  KEY `permission_role_role_id_index` (`role_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `permissions_name_index` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `role_user_user_id_index` (`user_id`),
  KEY `role_user_role_id_index` (`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,1,'2014-09-19 07:54:27','2014-09-19 07:54:27');
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `roles_name_index` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Super Admin',NULL,10,'2014-09-19 07:54:27','2014-09-19 07:54:27');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `salt` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_username_index` (`username`),
  KEY `users_password_index` (`password`),
  KEY `users_email_index` (`email`),
  KEY `users_remember_token_index` (`remember_token`),
  KEY `users_deleted_at_index` (`deleted_at`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2a$08$rqN6idpy0FwezH72fQcdqunbJp7GJVm8j94atsTOqCeuNvc3PzH3m','a227383075861e775d0af6281ea05a49','admin@example.com','GEmcGVOtymx0VLt5HbFdoACCTyCvhLTsCh1t9y5MYKK80Sho9dYehY1quUU4',1,0,'2014-09-19 07:54:27','2014-10-09 19:47:44',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-10-20 14:39:26
