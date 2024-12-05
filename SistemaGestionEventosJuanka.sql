-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sistema_eventos05
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asiento_reserva`
--

DROP TABLE IF EXISTS `asiento_reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asiento_reserva` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(100) DEFAULT NULL,
  `idReserva` int DEFAULT NULL,
  `idZonaAsiento` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idReserva_idx` (`idReserva`),
  KEY `idZonaAsiento_idx` (`idZonaAsiento`),
  CONSTRAINT `idReserva` FOREIGN KEY (`idReserva`) REFERENCES `reserva` (`id`),
  CONSTRAINT `idZonaAsiento` FOREIGN KEY (`idZonaAsiento`) REFERENCES `zonasasientos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asiento_reserva`
--

LOCK TABLES `asiento_reserva` WRITE;
/*!40000 ALTER TABLE `asiento_reserva` DISABLE KEYS */;
INSERT INTO `asiento_reserva` VALUES (1,'reservado',1,13),(2,'reservado',2,13),(3,'reservado',3,11),(4,'reservado',3,11),(5,'reservado',3,11),(6,'reservado',4,13),(7,'reservado',4,13),(8,'reservado',5,14),(9,'reservado',5,14),(10,'reservado',5,14),(11,'reservado',5,14),(12,'reservado',5,14),(13,'reservado',5,14),(14,'reservado',5,14),(15,'reservado',5,14),(16,'reservado',5,14),(17,'reservado',5,14),(18,'reservado',6,13),(19,'reservado',6,13),(20,'reservado',6,13),(21,'reservado',10,15),(22,'reservado',10,15),(23,'reservado',10,15),(24,'reservado',10,15),(45,'reservado',17,15),(46,'reservado',17,15),(61,'reservado',30,15),(62,'reservado',30,15),(63,'reservado',34,15),(64,'reservado',34,15),(65,'reservado',35,15),(66,'reservado',36,5),(67,'reservado',37,6),(68,'reservado',38,19),(69,'reservado',38,19),(70,'reservado',38,19),(71,'reservado',39,19),(72,'reservado',39,19),(73,'reservado',40,23),(74,'reservado',40,23),(75,'reservado',40,23),(76,'reservado',40,23),(77,'reservado',40,23),(78,'reservado',40,23),(79,'reservado',40,23),(80,'reservado',40,23),(81,'reservado',40,23),(82,'reservado',40,23),(83,'reservado',41,23),(84,'reservado',41,23),(85,'reservado',41,23),(86,'reservado',41,23),(87,'reservado',41,23);
/*!40000 ALTER TABLE `asiento_reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asientos`
--

DROP TABLE IF EXISTS `asientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asientos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `zona_id` int NOT NULL,
  `fila` varchar(10) NOT NULL,
  `numero` int NOT NULL,
  `estado` enum('disponible','reservado','vendido') DEFAULT 'disponible',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `zona_id` (`zona_id`),
  CONSTRAINT `asientos_ibfk_1` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `asientos_chk_1` CHECK ((`numero` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asientos`
--

LOCK TABLES `asientos` WRITE;
/*!40000 ALTER TABLE `asientos` DISABLE KEYS */;
INSERT INTO `asientos` VALUES (2,1,'A',2,'reservado','2024-11-03 02:43:24','2024-11-03 02:43:24'),(3,2,'BBBBBBB',10,'vendido','2024-11-03 02:43:24','2024-11-11 11:23:42'),(4,1,'1',2,'vendido','2024-11-11 11:21:32','2024-11-11 11:21:32'),(5,1,'12',12,'disponible','2024-11-19 22:31:53','2024-11-19 22:31:53'),(6,4,'12',12,'disponible','2024-11-19 22:32:20','2024-11-19 22:32:20');
/*!40000 ALTER TABLE `asientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoriaeventos`
--

DROP TABLE IF EXISTS `categoriaeventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoriaeventos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_evento_id` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`),
  KEY `tipo_evento_id` (`tipo_evento_id`),
  CONSTRAINT `categoriaeventos_ibfk_1` FOREIGN KEY (`tipo_evento_id`) REFERENCES `tipoeventos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoriaeventos`
--

LOCK TABLES `categoriaeventos` WRITE;
/*!40000 ALTER TABLE `categoriaeventos` DISABLE KEYS */;
INSERT INTO `categoriaeventos` VALUES (1,1,'Concierto','Conciertos de diferentes géneros musicales'),(2,2,'Fútbol','Partidos de fútbol'),(3,3,'Tecnología','Conferencias relacionadas con tecnología');
/*!40000 ALTER TABLE `categoriaeventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entradas`
--

DROP TABLE IF EXISTS `entradas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entradas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `evento_id` int NOT NULL,
  `zona_id` int DEFAULT NULL,
  `asiento_id` int DEFAULT NULL,
  `fecha_entrada` datetime DEFAULT CURRENT_TIMESTAMP,
  `qr_code` text,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `evento_id` (`evento_id`),
  KEY `zona_id` (`zona_id`),
  KEY `asiento_id` (`asiento_id`),
  CONSTRAINT `entradas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entradas_ibfk_2` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entradas_ibfk_3` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`id`) ON DELETE SET NULL,
  CONSTRAINT `entradas_ibfk_4` FOREIGN KEY (`asiento_id`) REFERENCES `asientos` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entradas`
--

LOCK TABLES `entradas` WRITE;
/*!40000 ALTER TABLE `entradas` DISABLE KEYS */;
/*!40000 ALTER TABLE `entradas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadopagos`
--

DROP TABLE IF EXISTS `estadopagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadopagos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadopagos`
--

LOCK TABLES `estadopagos` WRITE;
/*!40000 ALTER TABLE `estadopagos` DISABLE KEYS */;
INSERT INTO `estadopagos` VALUES (1,'Pendiente'),(2,'Completado'),(3,'Fallido');
/*!40000 ALTER TABLE `estadopagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoria_evento_id` int NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `organizadores` varchar(255) DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `precio_base` decimal(10,2) NOT NULL,
  `cupo_disponible` int NOT NULL,
  `es_evento_virtual` tinyint(1) DEFAULT '0',
  `url_transmision` varchar(255) DEFAULT NULL,
  `plataforma_virtual` varchar(100) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `activo` tinyint(1) DEFAULT '1',
  `latitud` varchar(50) DEFAULT NULL,
  `longitud` varchar(50) DEFAULT NULL,
  `rutaImagen` varchar(255) DEFAULT NULL,
  `importanciaImagen` int DEFAULT NULL COMMENT '1.Importante\n2.No importante',
  PRIMARY KEY (`id`),
  KEY `categoria_evento_id` (`categoria_evento_id`),
  CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`categoria_evento_id`) REFERENCES `categoriaeventos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `eventos_chk_1` CHECK ((`precio_base` >= 0)),
  CONSTRAINT `eventos_chk_2` CHECK ((`cupo_disponible` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (1,1,'Concierto Rock Fest','http://rockfest.com','Festival de rock en vivo','RockFest Org','Estadio Nacional BOLIVIA UPDATE','2023-11-16 08:00:00',50.00,20,0,NULL,NULL,'2024-11-03 02:43:24','2024-12-05 04:53:19',0,NULL,NULL,NULL,NULL),(2,2,'Final de Liga UPDATE',NULL,'Partido final de la liga de fútbol','Liga Org','Estadio Metropolitano UPDATE','2023-12-01 21:00:00',30.00,500,0,NULL,NULL,'2024-11-03 02:43:24','2024-12-05 04:54:42',0,'-17.388583','-66.162839',NULL,NULL),(3,3,'Conferencia de IA','http://techconf.com','Conferencia sobre Inteligencia Artificial','TechConf','Online','2024-01-20 10:00:00',0.00,300,1,'http://streaming.techconf.com','Zoom','2024-11-03 02:43:24','2024-12-05 04:54:44',0,NULL,NULL,NULL,NULL),(4,1,'testing','http://localhost:3001/api/categorias','testing',NULL,'testing','2024-11-03 04:12:00',1.00,12,0,NULL,NULL,'2024-11-06 08:10:55','2024-11-06 08:44:19',0,NULL,NULL,NULL,NULL),(5,1,'aaaa','http://Univalle.edu','aaaa','aaaa','aaaa','2024-11-04 21:54:00',666.00,6666,0,'http://Univalle.edu','meet','2024-11-06 08:54:09','2024-11-21 00:45:12',0,NULL,NULL,NULL,NULL),(6,2,'DIANA','http://Univalle.edu','DIANA',NULL,'DIANA','2024-11-09 12:05:00',123.00,123,0,NULL,NULL,'2024-11-06 15:04:10','2024-11-06 15:14:04',0,NULL,NULL,NULL,NULL),(7,1,'a','http://Univalle.edu','a',NULL,'23','2024-11-11 23:23:00',1.00,1,0,NULL,NULL,'2024-11-11 08:31:08','2024-11-11 09:22:16',0,NULL,NULL,NULL,NULL),(8,1,'sd','http://localhost:3000/RegisterEvent','ssf','sdsf','ssds','2024-11-27 11:31:00',23.00,23,1,'','','2024-11-27 10:17:27','2024-12-05 04:53:23',0,NULL,NULL,NULL,NULL),(9,1,'sd','localhost:3000/RegisterEvent','ssf','sdsf','ssds','2024-11-27 11:31:00',23.00,23,1,'','','2024-11-27 10:18:00','2024-12-05 04:53:26',0,NULL,NULL,NULL,NULL),(10,1,'sd','localhost:3000/RegisterEvent','ssf','sdsf','ssds','2024-11-27 11:31:00',23.00,23,1,'','','2024-11-27 10:19:14','2024-12-05 04:53:28',0,NULL,NULL,NULL,NULL),(11,1,'sd','a:a','ssf','sdsf','ssds','2024-11-27 11:31:00',23.00,23,1,'','','2024-11-27 10:19:39','2024-12-05 04:53:31',0,NULL,NULL,NULL,NULL),(12,1,'DDS','a:a','SDSD','ds','sdsd','2024-11-27 13:29:00',23.00,20,1,'','','2024-11-27 10:26:18','2024-12-05 04:53:34',0,NULL,NULL,NULL,NULL),(13,1,'DDS','a:a','SDSD','ds','sdsd','2024-11-27 13:29:00',23.00,20,1,'','','2024-11-27 10:30:26','2024-12-05 04:53:37',0,NULL,NULL,NULL,NULL),(14,1,'DDS','a:a','SDSD','ds','sdsd','2024-11-27 13:29:00',23.00,20,1,'','','2024-11-27 10:31:42','2024-12-05 04:53:39',0,NULL,NULL,NULL,NULL),(15,1,'DDS','a:a','SDSD','ds','sdsd','2024-11-27 13:29:00',23.00,20,1,'','','2024-11-27 10:37:40','2024-12-05 04:53:42',0,NULL,NULL,NULL,NULL),(16,1,'SDDS','A:A','SDSD','ASAS','AADAD','2024-11-27 12:40:00',12.00,12,1,'','','2024-11-27 10:39:22','2024-12-05 04:53:44',0,NULL,NULL,NULL,NULL),(17,1,'Concierto de Rock','https://ejemplo.com/concierto-rock','Un increíble concierto de rock con bandas locales.','Rock Productions','Estadio Nacional','2024-12-01 20:00:00',50.00,500,0,NULL,NULL,'2024-11-27 10:47:04','2024-12-05 04:53:47',0,'-17.3895','-66.1568',NULL,NULL),(18,1,'SDDS','A:A','SDSD','ASAS','AADAD','2024-11-27 12:40:00',12.00,12,1,'','','2024-11-27 10:48:08','2024-12-05 04:53:49',0,NULL,NULL,NULL,NULL),(19,3,'xxzx','http://localhost:3000/RegisterEvent','xzx','zxzxz','sd','2024-11-27 10:53:00',2323.00,23,1,'','','2024-11-27 10:49:24','2024-12-05 04:54:47',0,NULL,NULL,NULL,NULL),(20,3,'xxzx','http://localhost:3000/RegisterEvent','xzx','zxzxz','sd','2024-11-27 10:53:00',2323.00,23,1,'','','2024-11-27 10:54:05','2024-12-05 04:54:51',0,NULL,NULL,NULL,NULL),(21,1,'hh','hh:hh','hh','hhhh','dd','2024-11-27 16:19:00',34.00,43,0,'','','2024-11-27 11:15:25','2024-12-05 04:53:51',0,'-17.460445','-66.202914',NULL,NULL),(22,1,'Juaankaaaaa','hh:hh','hh','hhhh','dd','2024-11-27 14:19:00',34.00,43,0,'','','2024-11-27 11:23:35','2024-12-05 04:53:54',0,'-17.349725','-66.115831',NULL,NULL),(23,1,'Nuevooooo','http://localhost:3000/RegisterEvent','dsda','sdad','asda','2024-11-27 00:41:00',23.00,22,0,'','','2024-11-27 21:38:23','2024-12-05 04:53:56',0,'-17.527260','-64.572240',NULL,NULL),(24,1,'Evento de ejemplo','https://mi-sitio.com/evento-ejemplo','Descripción del evento de ejemplo','Organizador Ejemplo','Ubicación Ejemplo','2024-12-01 18:00:00',100.00,50,0,NULL,NULL,'2024-11-27 23:14:17','2024-12-05 04:53:58',0,'19.432608','-99.133209','img/AlicePark.jpg',NULL),(25,1,'Conferencia Tech 2024','https://example.com/evento','Una conferencia sobre innovación tecnológica.','Tech Company Inc.','Centro de Convenciones','2024-12-10 10:00:00',100.00,200,0,NULL,NULL,'2024-11-28 00:42:58','2024-12-05 04:54:01',0,'-17.3895','-66.1568','img/conferencia-tech.jpg',1),(26,1,'Juaankaaaaadddddddddddddddddddddddd','sdsd:ds','dsdasd','dasdadadsasd','dsad','2024-11-28 04:48:00',23.00,23,0,'','','2024-11-28 00:44:17','2024-12-05 04:54:03',0,'-17.260367','-66.042339',NULL,1),(27,1,'dsadsad','hh:hh','dsfdf','asdasd','dd','2024-11-28 01:50:00',23.00,22,0,'','','2024-11-28 01:44:55','2024-12-05 04:54:05',0,'-17.151419','-66.886384',NULL,1),(28,1,'dsadsad','hh:hh','dsfdf','asdasd','dd','2024-11-28 01:50:00',23.00,22,0,'','','2024-11-28 01:50:13','2024-12-05 04:54:07',0,'-17.386096','-66.205659',NULL,1),(29,1,'Concierto de Rock','https://conciertorock.com','Un evento increíble con bandas locales.','Juan Pérez, Ana López','Auditorio Nacional, Ciudad de México','2024-12-15 20:00:00',500.00,200,0,'https://conciertorock.com/transmision','Zoom','2024-12-03 22:12:44','2024-12-05 04:54:10',0,'19.4326','-99.1332','ruta/a/imagen.jpg',1),(30,1,'Evento de Prueba',NULL,'Descripción del evento',NULL,NULL,'2024-12-01 10:00:00',50.00,100,0,'','','2024-12-04 00:12:45','2024-12-05 04:54:12',0,'-12.0464','-77.0428','',NULL),(31,1,'Juaankaaaaadddddddddddddddddddddddd',NULL,'adfdf','','','2024-12-20 06:22:00',23.00,23,0,'','','2024-12-04 00:22:10','2024-12-05 04:54:14',0,'-12.0464','-77.0428','',1),(32,1,'Juaankaaaaadddddddddddddddddddddddd23',NULL,'dsadasd','','','2024-12-20 01:24:00',23.00,23,0,'','','2024-12-04 00:24:54','2024-12-05 04:54:17',0,'-12.0464','-77.0428','',1),(33,1,'partido hh',NULL,'sdasd','','','2024-12-29 01:41:00',23.00,23,0,'','','2024-12-04 00:41:57','2024-12-05 04:54:20',0,'-12.0464','-77.0428','',1),(34,1,'Juaankaaaaadddddddddddddddddddddddd',NULL,'dffdfsdfd','','','2024-12-22 01:52:00',23.00,23,0,'','','2024-12-04 00:53:19','2024-12-05 04:54:22',0,'-12.0464','-77.0428','',1),(35,1,'Juaankaaaaadddddddddddddddddddddddd',NULL,'dsff','','mADNES','2024-12-14 04:58:00',23.00,22,0,'','','2024-12-04 00:55:42','2024-12-05 04:54:25',0,'-12.0464','-77.0428','',1),(36,1,'Juaankaaaaadddddddddddddddddddddddd',NULL,'dsaddf','','dsdsd','2024-12-13 05:06:00',23.00,23,0,'','','2024-12-04 01:02:55','2024-12-05 04:54:28',0,'-12.0464','-77.0428','',1),(37,1,'partido de futbol',NULL,'dfdsfs','','sad','2024-12-12 06:16:00',23.00,23,0,'','','2024-12-04 01:13:13','2024-12-05 04:54:31',0,'-12.0464','-77.0428','',1),(38,1,'dsadsad',NULL,'asdasd','','23','2024-12-22 22:32:00',23.00,21,0,'','','2024-12-04 21:32:22','2024-12-05 04:54:36',0,'-12.0464','-77.0428','',1),(39,1,'dsadsad',NULL,'dfdf','','2323','2024-12-12 03:09:00',32.00,23,0,'','','2024-12-05 02:09:33','2024-12-05 04:54:39',0,'-12.0464','-77.0428','',1),(40,1,'Concierto de Rock','http://rockconcert.com','Un evento para disfrutar del mejor rock.','Rock Corp','Auditorio Nacional','2024-12-15 18:00:00',50.00,500,0,NULL,NULL,'2024-12-05 04:58:17','2024-12-05 05:31:00',0,'19.432608','-99.133209','rock_concert.jpg',10),(41,2,'Conferencia de Tecnología','http://techtalk2024.com','Evento internacional sobre innovación tecnológica.','TechWorld','Centro de Convenciones','2024-12-20 09:00:00',100.00,300,1,'http://streaming.techtalk2024.com','Zoom','2024-12-05 04:58:17','2024-12-05 05:31:04',0,NULL,NULL,'tech_talk.jpg',8),(42,1,'Partido de Wilster',NULL,'Partido de Wilster','','Felix Capriles','2024-12-14 10:30:00',30.00,1200,0,'','','2024-12-05 05:27:17','2024-12-05 05:27:17',1,'-12.0464','-77.0428','',1),(43,1,'partido tigre',NULL,'partido del tigre','','estadio siles','2024-12-08 06:30:00',30.00,1200,0,'','','2024-12-05 05:30:54','2024-12-05 13:01:05',0,'-12.0464','-77.0428','',1),(44,1,'mi evento',NULL,'evento free','','direccion','2024-12-06 08:00:00',100.00,10,0,'','','2024-12-05 13:00:18','2024-12-05 13:00:18',1,'-12.0464','-77.0428','',1);
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialacciones`
--

DROP TABLE IF EXISTS `historialacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialacciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `entidad` varchar(50) NOT NULL,
  `accion` varchar(255) NOT NULL,
  `detalles` text,
  `fecha_accion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `historialacciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialacciones`
--

LOCK TABLES `historialacciones` WRITE;
/*!40000 ALTER TABLE `historialacciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodopagos`
--

DROP TABLE IF EXISTS `metodopagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodopagos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `metodo` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodopagos`
--

LOCK TABLES `metodopagos` WRITE;
/*!40000 ALTER TABLE `metodopagos` DISABLE KEYS */;
INSERT INTO `metodopagos` VALUES (1,'Tarjeta de Crédito'),(2,'PayPal'),(3,'Transferencia Bancaria');
/*!40000 ALTER TABLE `metodopagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `ticket_id` int DEFAULT NULL,
  `monto` decimal(10,2) NOT NULL,
  `metodo_pago_id` int DEFAULT NULL,
  `estado_pago_id` int DEFAULT NULL,
  `fecha_pago` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `metodo_pago_id` (`metodo_pago_id`),
  KEY `estado_pago_id` (`estado_pago_id`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`ticket_id`) REFERENCES `tipotickets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pagos_ibfk_3` FOREIGN KEY (`metodo_pago_id`) REFERENCES `metodopagos` (`id`),
  CONSTRAINT `pagos_ibfk_4` FOREIGN KEY (`estado_pago_id`) REFERENCES `estadopagos` (`id`),
  CONSTRAINT `pagos_chk_1` CHECK ((`monto` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` timestamp NULL DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `idUsuario` int DEFAULT NULL,
  `idEvent` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUsuario_fk_idx` (`idUsuario`),
  KEY `idEvento_fk_reserva_idx` (`idEvent`),
  CONSTRAINT `idEvento_fk_reserva` FOREIGN KEY (`idEvent`) REFERENCES `eventos` (`id`),
  CONSTRAINT `idUsuario_fk` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (1,'2024-12-04 11:05:09','pendiente',8,NULL),(2,'2024-12-04 11:08:39','pendiente',8,37),(3,'2024-12-04 16:14:28','pendiente',8,36),(4,'2024-12-04 20:21:41','pendiente',8,37),(5,'2024-12-04 20:23:03','pendiente',8,37),(6,'2024-12-04 21:02:45','pendiente',8,37),(10,'2024-12-04 21:47:38','pendiente',8,38),(17,'2024-12-04 22:52:36','pendiente',8,38),(30,'2024-12-05 01:38:29','pendiente',8,38),(34,'2024-12-05 01:56:47','pendiente',8,38),(35,'2024-12-05 01:59:49','asistido',8,38),(36,'2024-12-05 02:25:25','asistido',8,31),(37,'2024-12-05 02:32:23','asistido',8,32),(38,'2024-12-05 06:31:29','pendiente',8,43),(39,'2024-12-05 06:46:00','asistido',8,43),(40,'2024-12-05 13:02:56','asistido',8,44),(41,'2024-12-05 13:12:14','pendiente',8,44);
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador',1),(2,'Usuario',1),(3,'Organizador',1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoeventos`
--

DROP TABLE IF EXISTS `tipoeventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoeventos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoeventos`
--

LOCK TABLES `tipoeventos` WRITE;
/*!40000 ALTER TABLE `tipoeventos` DISABLE KEYS */;
INSERT INTO `tipoeventos` VALUES (1,'Musical','Eventos relacionados con música'),(2,'Deportivo','Eventos deportivos'),(3,'Conferencia','Conferencias de diferentes temas');
/*!40000 ALTER TABLE `tipoeventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipotickets`
--

DROP TABLE IF EXISTS `tipotickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipotickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `es_de_pago` tinyint(1) NOT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `limite_compra` int DEFAULT NULL,
  `stock` int NOT NULL,
  `fecha_inicio_venta` datetime DEFAULT NULL,
  `fecha_final_venta` datetime DEFAULT NULL,
  `es_por_fecha` tinyint(1) NOT NULL,
  `evento_id` int NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `evento_id` (`evento_id`),
  CONSTRAINT `tipotickets_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tipotickets_chk_1` CHECK ((`precio` >= 0)),
  CONSTRAINT `tipotickets_chk_2` CHECK ((`limite_compra` >= 0)),
  CONSTRAINT `tipotickets_chk_3` CHECK ((`stock` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipotickets`
--

LOCK TABLES `tipotickets` WRITE;
/*!40000 ALTER TABLE `tipotickets` DISABLE KEYS */;
INSERT INTO `tipotickets` VALUES (1,'Entrada General',1,50.00,5,100,'2023-11-01 08:00:00','2023-11-15 20:00:00',1,1,'2024-11-03 02:43:24','2024-11-03 02:43:24',1),(2,'Entrada VIP',1,70.00,2,50,'2023-11-01 08:00:00','2023-11-15 20:00:00',1,1,'2024-11-03 02:43:24','2024-11-03 02:43:24',1),(3,'Entrada Gratuita Conferencia',0,0.00,1,300,'2023-12-01 08:00:00','2024-01-20 09:00:00',1,3,'2024-11-03 02:43:24','2024-11-03 02:43:24',1),(4,'TEST',0,0.00,2,2,'2024-11-10 05:24:00','2024-11-10 00:00:00',1,5,'2024-11-11 03:18:19','2024-11-11 03:18:19',1),(5,'new ticket',1,123.00,123,123,'2024-11-11 00:00:00',NULL,1,5,'2024-11-11 08:27:46','2024-11-11 08:27:46',1),(6,'new ticket',1,123.00,123,123,'2024-11-11 00:00:00',NULL,1,5,'2024-11-11 08:32:32','2024-11-11 08:32:32',1),(7,'new ticket1111',0,123.00,123,123,'2024-11-11 00:00:00',NULL,1,7,'2024-11-11 08:33:37','2024-11-11 08:33:37',1),(8,'qwe123',0,123.00,123,121,'2024-11-11 00:00:00',NULL,0,1,'2024-11-11 08:35:19','2024-11-11 08:35:19',1),(9,'new ticket 22',0,2.00,2,2,'2024-11-11 00:00:00',NULL,1,1,'2024-11-11 08:39:09','2024-11-11 08:39:09',1),(10,'new ticket 333',0,123.00,123,123,'2024-11-11 00:00:00',NULL,1,7,'2024-11-11 08:41:51','2024-11-11 08:41:51',1),(11,'new ticket SIETE 66',1,123.00,123,122,'2024-11-11 05:01:00','2024-11-11 05:02:00',1,7,'2024-11-11 08:45:33','2024-11-11 09:02:04',1),(12,'new ticket 00',1,12.00,12,12,'2024-11-11 00:00:00','2024-11-11 00:00:00',1,7,'2024-11-11 08:49:15','2024-11-11 09:00:57',0);
/*!40000 ALTER TABLE `tipotickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `numero_celular` varchar(20) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `carnet` varchar(20) NOT NULL,
  `rol_id` int DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo_electronico` (`correo_electronico`),
  UNIQUE KEY `carnet` (`carnet`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (3,'Univalle@gmail.com','Univalle@gmail.com','123','Univalle@gmail.com','5ec246291612aa0cdd4ad1aae2481303e2d51c9e0710abd272c1f15743ed015f','123',1,'2024-11-10 23:55:17','2024-11-10 23:55:17'),(4,'Juan','Pérez','5551234567','juan.perez@example.com','ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f','ABC12345',1,'2024-11-21 01:56:18','2024-11-21 01:56:18'),(5,'María','González','5559876543','maria.gonzalez@example.com','c6ba91b90d922e159893f46c387e5dc1b3dc5c101a5a4522f03b987177a24a91','XYZ67890',2,'2024-11-21 01:56:18','2024-11-21 01:56:18'),(6,'Juan Carlos','Rojas','23232','juancarlosrojasvargas912@gmail.com','c266dfc5e9b91d9e7edbbf3ebb79e50f6b811391fc3594a6253b11d96d9d7202','232323',1,'2024-11-21 01:58:15','2024-11-21 01:58:15'),(7,'Juan','Pérez','123456789','juanka@gmail.com','1234','12345678',1,'2024-12-04 03:49:17','2024-12-04 03:49:17'),(8,'Juan Carlos','Rojas Vargas','77777777','juankaa@gmail.com','16df5fbd1b06774b0cd1649f3f87471f9a5db927b42d5e3014c75f50f8046102','1234567',2,'2024-12-04 04:19:38','2024-12-04 04:19:38'),(13,'Admin','Rojas','7878925','admin@admin.com','9f00e7d7157b5bae89d947c2245ed50043ccbd4a058ed83b76db9d3d30274b1c','23456789',1,'2024-12-05 21:28:50','2024-12-05 21:28:50');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zonas`
--

DROP TABLE IF EXISTS `zonas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zonas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `evento_id` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `capacidad` int NOT NULL,
  `precio_extra` decimal(10,2) DEFAULT '0.00',
  `descripcion` text,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `evento_id` (`evento_id`),
  CONSTRAINT `zonas_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `zonas_chk_1` CHECK ((`capacidad` >= 0)),
  CONSTRAINT `zonas_chk_2` CHECK ((`precio_extra` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zonas`
--

LOCK TABLES `zonas` WRITE;
/*!40000 ALTER TABLE `zonas` DISABLE KEYS */;
INSERT INTO `zonas` VALUES (1,1,'VIP UPDATEss',1,2.00,'Zona VIP con mejores asientos','2024-11-03 02:43:24','2024-11-11 12:37:56'),(2,1,'General',900,0.00,'Zona general','2024-11-03 02:43:24','2024-11-03 02:43:24'),(3,2,'Gradería',300,0.00,'Zona de gradas','2024-11-03 02:43:24','2024-11-03 02:43:24'),(4,2,'Palco',200,15.00,'Zona de palco','2024-11-03 02:43:24','2024-11-03 02:43:24'),(5,1,'test zona',123,123.00,NULL,'2024-11-11 10:18:46','2024-11-11 10:18:46'),(6,1,'test zon2a',123,123.00,NULL,'2024-11-11 10:19:12','2024-11-11 12:38:40'),(8,1,'123',123,123.00,'123','2024-11-11 12:36:49','2024-11-11 12:36:49'),(10,1,'wwd',333,33.00,'dsdasd','2024-11-19 22:25:57','2024-11-19 22:25:57');
/*!40000 ALTER TABLE `zonas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zonasasientos`
--

DROP TABLE IF EXISTS `zonasasientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zonasasientos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codAsiento` varchar(1500) DEFAULT NULL,
  `estado` int DEFAULT NULL,
  `idZonaEventos` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `zonaEventos_fk__idx` (`idZonaEventos`),
  CONSTRAINT `zonaEventos_fk_` FOREIGN KEY (`idZonaEventos`) REFERENCES `zonaseventos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=894 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zonasasientos`
--

LOCK TABLES `zonasasientos` WRITE;
/*!40000 ALTER TABLE `zonasasientos` DISABLE KEYS */;
INSERT INTO `zonasasientos` VALUES (1,'VIP-1',0,1),(2,'VIP-2',0,1),(3,'VIP-3',0,1),(4,'VIP-4',0,1),(5,'VIP-5',0,1),(6,'VIP-6',0,1),(7,'VIP-7',0,1),(8,'VIP-8',0,1),(9,'VIP-9',0,1),(10,'VIP-10',0,1),(11,'VIP-11',0,1),(12,'VIP-12',0,1),(13,'VIP-13',0,1),(14,'VIP-14',0,1),(15,'VIP-15',0,1),(16,'VIP-16',0,1),(17,'VIP-17',0,1),(18,'VIP-18',0,1),(19,'VIP-19',0,1),(20,'VIP-20',0,1),(21,'VIP-21',0,1),(22,'VIP-22',0,1),(23,'VIP-23',0,1),(24,'VIP-24',0,1),(25,'VIP-25',0,1),(26,'VIP-26',0,1),(27,'VIP-27',0,1),(28,'VIP-28',0,1),(29,'VIP-29',0,1),(30,'VIP-30',0,1),(31,'VIP-31',0,1),(32,'VIP-32',0,1),(33,'VIP-33',0,1),(34,'VIP-34',0,1),(35,'VIP-35',0,1),(36,'VIP-36',0,1),(37,'VIP-37',0,1),(38,'VIP-38',0,1),(39,'VIP-39',0,1),(40,'VIP-40',0,1),(41,'VIP-41',0,1),(42,'VIP-42',0,1),(43,'VIP-43',0,1),(44,'VIP-44',0,1),(45,'VIP-45',0,1),(46,'VIP-46',0,1),(47,'VIP-47',0,1),(48,'VIP-48',0,1),(49,'VIP-49',0,1),(50,'VIP-50',0,1),(51,'GEN-1',0,2),(52,'GEN-2',0,2),(53,'GEN-3',0,2),(54,'GEN-4',0,2),(55,'GEN-5',0,2),(56,'GEN-100',0,2),(57,'A-1',0,3),(58,'A-2',0,3),(59,'A-3',0,3),(60,'A-4',0,3),(61,'A-5',0,3),(62,'A-6',0,3),(63,'A-7',0,3),(64,'A-8',0,3),(65,'A-9',0,3),(66,'A-10',0,3),(67,'A-11',0,3),(68,'A-12',0,3),(69,'A-13',0,3),(70,'A-14',0,3),(71,'A-15',0,3),(72,'A-16',0,3),(73,'A-17',0,3),(74,'A-18',0,3),(75,'A-19',0,3),(76,'A-20',0,3),(77,'A-21',0,3),(78,'A-22',0,3),(79,'A-23',0,3),(80,'A-24',0,3),(81,'A-25',0,3),(82,'A-26',0,3),(83,'A-27',0,3),(84,'A-28',0,3),(85,'A-29',0,3),(86,'A-30',0,3),(87,'A-31',0,3),(88,'A-32',0,3),(89,'A-33',0,3),(90,'A-34',0,3),(91,'A-35',0,3),(92,'A-36',0,3),(93,'A-37',0,3),(94,'A-38',0,3),(95,'A-39',0,3),(96,'A-40',0,3),(97,'A-41',0,3),(98,'A-42',0,3),(99,'A-43',0,3),(100,'A-44',0,3),(101,'A-45',0,3),(102,'A-46',0,3),(103,'A-47',0,3),(104,'A-48',0,3),(105,'A-49',0,3),(106,'A-50',0,3),(107,'A-1',0,4),(108,'A-2',0,4),(109,'A-3',0,4),(110,'A-4',0,4),(111,'A-5',0,4),(112,'A-6',0,4),(113,'A-7',0,4),(114,'A-8',0,4),(115,'A-9',0,4),(116,'A-10',0,4),(117,'A-11',0,4),(118,'A-12',0,4),(119,'A-13',0,4),(120,'A-14',0,4),(121,'A-15',0,4),(122,'A-16',0,4),(123,'A-17',0,4),(124,'A-18',0,4),(125,'A-19',0,4),(126,'A-20',0,4),(127,'A-21',0,4),(128,'A-22',0,4),(129,'A-23',0,4),(130,'A-24',0,4),(131,'A-25',0,4),(132,'A-26',0,4),(133,'A-27',0,4),(134,'A-28',0,4),(135,'A-29',0,4),(136,'A-30',0,4),(137,'A-31',0,4),(138,'A-32',0,4),(139,'A-33',0,4),(140,'A-34',0,4),(141,'A-35',0,4),(142,'A-36',0,4),(143,'A-37',0,4),(144,'A-38',0,4),(145,'A-39',0,4),(146,'A-40',0,4),(147,'A-41',0,4),(148,'A-42',0,4),(149,'A-43',0,4),(150,'A-44',0,4),(151,'A-45',0,4),(152,'A-46',0,4),(153,'A-47',0,4),(154,'A-48',0,4),(155,'A-49',0,4),(156,'A-50',0,4),(157,'A-51',0,4),(158,'A-52',0,4),(159,'A-53',0,4),(160,'A-54',0,4),(161,'A-55',0,4),(162,'A-56',0,4),(163,'A-57',0,4),(164,'A-58',0,4),(165,'A-59',0,4),(166,'A-60',0,4),(167,'A-61',0,4),(168,'A-62',0,4),(169,'A-63',0,4),(170,'A-64',0,4),(171,'A-65',0,4),(172,'A-66',0,4),(173,'A-67',0,4),(174,'A-68',0,4),(175,'A-69',0,4),(176,'A-70',0,4),(177,'A-71',0,4),(178,'A-72',0,4),(179,'A-73',0,4),(180,'A-74',0,4),(181,'A-75',0,4),(182,'A-76',0,4),(183,'A-77',0,4),(184,'A-78',0,4),(185,'A-79',0,4),(186,'A-80',0,4),(187,'A-81',0,4),(188,'A-82',0,4),(189,'A-83',0,4),(190,'A-84',0,4),(191,'A-85',0,4),(192,'A-86',0,4),(193,'A-87',0,4),(194,'A-88',0,4),(195,'A-89',0,4),(196,'A-90',0,4),(197,'A-91',0,4),(198,'A-92',0,4),(199,'A-93',0,4),(200,'A-94',0,4),(201,'A-95',0,4),(202,'A-96',0,4),(203,'A-97',0,4),(204,'A-98',0,4),(205,'A-99',0,4),(206,'A-100',0,4),(207,'A-1',0,5),(208,'A-2',0,5),(209,'A-3',0,5),(210,'A-4',0,5),(211,'A-5',0,5),(212,'A-6',0,5),(213,'A-7',0,5),(214,'A-8',0,5),(215,'A-9',0,5),(216,'A-10',0,5),(217,'A-11',0,5),(218,'A-12',0,5),(219,'A-13',0,5),(220,'A-14',0,5),(221,'A-15',0,5),(222,'A-16',0,5),(223,'A-17',0,5),(224,'A-18',0,5),(225,'A-19',0,5),(226,'A-20',0,5),(227,'A-21',0,5),(228,'A-1',0,6),(229,'A-2',0,6),(230,'A-3',0,6),(231,'A-4',0,6),(232,'A-5',0,6),(233,'A-6',0,6),(234,'A-7',0,6),(235,'A-8',0,6),(236,'A-9',0,6),(237,'A-10',0,6),(238,'A-11',0,6),(239,'A-12',0,6),(240,'A-13',0,6),(241,'A-14',0,6),(242,'A-15',0,6),(243,'A-16',0,6),(244,'A-17',0,6),(245,'A-18',0,6),(246,'A-19',0,6),(247,'A-20',0,6),(248,'A-21',0,6),(249,'A-1',0,7),(250,'A-2',0,7),(251,'A-3',0,7),(252,'A-4',0,7),(253,'A-5',0,7),(254,'A-6',0,7),(255,'A-7',0,7),(256,'A-8',0,7),(257,'A-9',0,7),(258,'A-10',0,7),(259,'A-11',0,7),(260,'A-12',0,7),(261,'A-13',0,7),(262,'A-14',0,7),(263,'A-15',0,7),(264,'A-16',0,7),(265,'A-17',0,7),(266,'A-18',0,7),(267,'A-19',0,7),(268,'A-20',0,7),(269,'A-21',0,7),(270,'A-22',0,7),(271,'A-23',0,7),(272,'A-24',0,7),(273,'A-25',0,7),(274,'A-26',0,7),(275,'A-27',0,7),(276,'A-28',0,7),(277,'A-29',0,7),(278,'A-30',0,7),(279,'A-31',0,7),(280,'A-32',0,7),(281,'A-33',0,7),(282,'A-34',0,7),(283,'A-1',0,8),(284,'A-2',0,8),(285,'A-3',0,8),(286,'A-4',0,8),(287,'A-5',0,8),(288,'A-6',0,8),(289,'A-7',0,8),(290,'A-8',0,8),(291,'A-9',0,8),(292,'A-10',0,8),(293,'A-11',0,8),(294,'A-12',0,8),(295,'A-13',0,8),(296,'A-14',0,8),(297,'A-15',0,8),(298,'A-16',0,8),(299,'A-17',0,8),(300,'A-18',0,8),(301,'A-19',0,8),(302,'A-20',0,8),(303,'A-21',0,8),(304,'A-22',0,8),(305,'A-23',0,8),(306,'A-1',0,9),(307,'A-2',0,9),(308,'A-3',0,9),(309,'A-4',0,9),(310,'A-5',0,9),(311,'A-6',0,9),(312,'A-7',0,9),(313,'A-8',0,9),(314,'A-9',0,9),(315,'A-10',0,9),(316,'A-11',0,9),(317,'A-12',0,9),(318,'A-13',0,9),(319,'A-14',0,9),(320,'A-15',0,9),(321,'A-16',0,9),(322,'A-17',0,9),(323,'A-18',0,9),(324,'A-19',0,9),(325,'A-20',0,9),(326,'A-21',0,9),(327,'A-22',0,9),(328,'A-23',0,9),(329,'A-1',0,10),(330,'A-2',0,10),(331,'A-3',0,10),(332,'A-4',0,10),(333,'A-5',0,10),(334,'A-6',0,10),(335,'A-7',0,10),(336,'A-8',0,10),(337,'A-9',0,10),(338,'A-10',0,10),(339,'A-11',0,10),(340,'A-12',0,10),(341,'A-13',0,10),(342,'A-14',0,10),(343,'A-15',0,10),(344,'A-16',0,10),(345,'A-17',0,10),(346,'A-18',0,10),(347,'A-19',0,10),(348,'A-20',0,10),(349,'A-21',0,10),(350,'A-22',0,10),(351,'A-23',0,10),(352,'JUAAN-ZONACURVA-1-2024',0,11),(353,'JUAAN-ZONACURVA-2-2024',0,11),(354,'JUAAN-ZONACURVA-3-2024',0,11),(355,'JUAAN-ZONACURVA-4-2024',0,11),(356,'JUAAN-ZONACURVA-5-2024',0,11),(357,'JUAAN-ZONACURVA-6-2024',0,11),(358,'JUAAN-ZONACURVA-7-2024',0,11),(359,'JUAAN-ZONACURVA-8-2024',0,11),(360,'JUAAN-ZONACURVA-9-2024',0,11),(361,'JUAAN-ZONACURVA-10-2024',0,11),(362,'JUAAN-ZONACURVA-11-2024',0,11),(363,'JUAAN-ZONACURVA-12-2024',0,11),(364,'JUAAN-ZONACURVA-13-2024',0,11),(365,'JUAAN-ZONACURVA-14-2024',0,11),(366,'JUAAN-ZONACURVA-15-2024',0,11),(367,'JUAAN-ZONACURVA-16-2024',0,11),(368,'JUAAN-ZONACURVA-17-2024',0,11),(369,'JUAAN-ZONACURVA-18-2024',0,11),(370,'JUAAN-ZONACURVA-19-2024',0,11),(371,'JUAAN-ZONACURVA-20-2024',0,11),(372,'JUAAN-ZONACURVA-21-2024',0,11),(373,'JUAAN-ZONACURVA-22-2024',0,11),(374,'JUAAN-ZONACURVA-23-2024',0,11),(375,'JUAAN-ZONANORMAL-1-2024',0,12),(376,'JUAAN-ZONANORMAL-2-2024',0,12),(377,'JUAAN-ZONANORMAL-3-2024',0,12),(378,'JUAAN-ZONANORMAL-4-2024',0,12),(379,'JUAAN-ZONANORMAL-5-2024',0,12),(380,'JUAAN-ZONANORMAL-6-2024',0,12),(381,'JUAAN-ZONANORMAL-7-2024',0,12),(382,'JUAAN-ZONANORMAL-8-2024',0,12),(383,'JUAAN-ZONANORMAL-9-2024',0,12),(384,'JUAAN-ZONANORMAL-10-2024',0,12),(385,'JUAAN-ZONANORMAL-11-2024',0,12),(386,'JUAAN-ZONANORMAL-12-2024',0,12),(387,'JUAAN-ZONANORMAL-13-2024',0,12),(388,'JUAAN-ZONANORMAL-14-2024',0,12),(389,'JUAAN-ZONANORMAL-15-2024',0,12),(390,'JUAAN-ZONANORMAL-16-2024',0,12),(391,'JUAAN-ZONANORMAL-17-2024',0,12),(392,'JUAAN-ZONANORMAL-18-2024',0,12),(393,'JUAAN-ZONANORMAL-19-2024',0,12),(394,'JUAAN-ZONANORMAL-20-2024',0,12),(395,'JUAAN-ZONANORMAL-21-2024',0,12),(396,'JUAAN-ZONANORMAL-22-2024',0,12),(397,'JUAAN-ZONANORMAL-23-2024',0,12),(398,'JUAAN-ZONANORMAL-24-2024',0,12),(399,'JUAAN-ZONANORMAL-25-2024',0,12),(400,'JUAAN-ZONANORMAL-26-2024',0,12),(401,'JUAAN-ZONANORMAL-27-2024',0,12),(402,'JUAAN-ZONANORMAL-28-2024',0,12),(403,'JUAAN-ZONANORMAL-29-2024',0,12),(404,'JUAAN-ZONANORMAL-30-2024',0,12),(405,'JUAAN-ZONANORMAL-31-2024',0,12),(406,'JUAAN-ZONANORMAL-32-2024',0,12),(407,'JUAAN-ZONANORMAL-33-2024',0,12),(408,'JUAAN-ZONANORMAL-34-2024',0,12),(409,'JUAAN-ZONANORMAL-35-2024',0,12),(410,'JUAAN-ZONANORMAL-36-2024',0,12),(411,'JUAAN-ZONANORMAL-37-2024',0,12),(412,'JUAAN-ZONANORMAL-38-2024',0,12),(413,'JUAAN-ZONANORMAL-39-2024',0,12),(414,'JUAAN-ZONANORMAL-40-2024',0,12),(415,'JUAAN-ZONANORMAL-41-2024',0,12),(416,'JUAAN-ZONANORMAL-42-2024',0,12),(417,'JUAAN-ZONANORMAL-43-2024',0,12),(418,'JUAAN-ZONANORMAL-44-2024',0,12),(419,'JUAAN-ZONANORMAL-45-2024',0,12),(420,'EVT37-ZN13-AS1-2024',0,13),(421,'EVT37-ZN13-AS2-2024',0,13),(422,'EVT37-ZN13-AS3-2024',0,13),(423,'EVT37-ZN13-AS4-2024',0,13),(424,'EVT37-ZN13-AS5-2024',0,13),(425,'EVT37-ZN13-AS6-2024',0,13),(426,'EVT37-ZN13-AS7-2024',0,13),(427,'EVT37-ZN13-AS8-2024',0,13),(428,'EVT37-ZN13-AS9-2024',0,13),(429,'EVT37-ZN13-AS10-2024',0,13),(430,'EVT37-ZN13-AS11-2024',0,13),(431,'EVT37-ZN13-AS12-2024',0,13),(432,'EVT37-ZN13-AS13-2024',0,13),(433,'EVT37-ZN13-AS14-2024',0,13),(434,'EVT37-ZN13-AS15-2024',0,13),(435,'EVT37-ZN13-AS16-2024',0,13),(436,'EVT37-ZN13-AS17-2024',0,13),(437,'EVT37-ZN13-AS18-2024',0,13),(438,'EVT37-ZN13-AS19-2024',0,13),(439,'EVT37-ZN13-AS20-2024',0,13),(440,'EVT37-ZN13-AS21-2024',0,13),(441,'EVT37-ZN13-AS22-2024',0,13),(442,'EVT37-ZN13-AS23-2024',0,13),(443,'EVT37-ZN14-AS1-2024',0,14),(444,'EVT37-ZN14-AS2-2024',0,14),(445,'EVT37-ZN14-AS3-2024',0,14),(446,'EVT37-ZN14-AS4-2024',0,14),(447,'EVT37-ZN14-AS5-2024',0,14),(448,'EVT37-ZN14-AS6-2024',0,14),(449,'EVT37-ZN14-AS7-2024',0,14),(450,'EVT37-ZN14-AS8-2024',0,14),(451,'EVT37-ZN14-AS9-2024',0,14),(452,'EVT37-ZN14-AS10-2024',0,14),(453,'EVT37-ZN14-AS11-2024',0,14),(454,'EVT37-ZN14-AS12-2024',0,14),(455,'EVT37-ZN14-AS13-2024',0,14),(456,'EVT37-ZN14-AS14-2024',0,14),(457,'EVT37-ZN14-AS15-2024',0,14),(458,'EVT37-ZN14-AS16-2024',0,14),(459,'EVT37-ZN14-AS17-2024',0,14),(460,'EVT37-ZN14-AS18-2024',0,14),(461,'EVT37-ZN14-AS19-2024',0,14),(462,'EVT37-ZN14-AS20-2024',0,14),(463,'EVT37-ZN14-AS21-2024',0,14),(464,'EVT37-ZN14-AS22-2024',0,14),(465,'EVT37-ZN14-AS23-2024',0,14),(466,'EVT37-ZN14-AS24-2024',0,14),(467,'EVT37-ZN14-AS25-2024',0,14),(468,'EVT37-ZN14-AS26-2024',0,14),(469,'EVT37-ZN14-AS27-2024',0,14),(470,'EVT37-ZN14-AS28-2024',0,14),(471,'EVT37-ZN14-AS29-2024',0,14),(472,'EVT37-ZN14-AS30-2024',0,14),(473,'EVT37-ZN14-AS31-2024',0,14),(474,'EVT37-ZN14-AS32-2024',0,14),(475,'EVT37-ZN14-AS33-2024',0,14),(476,'EVT37-ZN14-AS34-2024',0,14),(477,'EVT37-ZN14-AS35-2024',0,14),(478,'EVT37-ZN14-AS36-2024',0,14),(479,'EVT37-ZN14-AS37-2024',0,14),(480,'EVT37-ZN14-AS38-2024',0,14),(481,'EVT37-ZN14-AS39-2024',0,14),(482,'EVT37-ZN14-AS40-2024',0,14),(483,'EVT37-ZN14-AS41-2024',0,14),(484,'EVT37-ZN14-AS42-2024',0,14),(485,'EVT37-ZN14-AS43-2024',0,14),(486,'EVT37-ZN14-AS44-2024',0,14),(487,'EVT37-ZN14-AS45-2024',0,14),(488,'EVT37-ZN14-AS46-2024',0,14),(489,'EVT37-ZN14-AS47-2024',0,14),(490,'EVT37-ZN14-AS48-2024',0,14),(491,'EVT37-ZN14-AS49-2024',0,14),(492,'EVT37-ZN14-AS50-2024',0,14),(493,'EVT38-ZN15-AS1-2024',0,15),(494,'EVT38-ZN15-AS2-2024',0,15),(495,'EVT38-ZN15-AS3-2024',0,15),(496,'EVT38-ZN15-AS4-2024',0,15),(497,'EVT38-ZN15-AS5-2024',0,15),(498,'EVT38-ZN15-AS6-2024',0,15),(499,'EVT38-ZN15-AS7-2024',0,15),(500,'EVT38-ZN15-AS8-2024',0,15),(501,'EVT38-ZN15-AS9-2024',0,15),(502,'EVT38-ZN15-AS10-2024',0,15),(503,'EVT38-ZN15-AS11-2024',0,15),(504,'EVT38-ZN15-AS12-2024',0,15),(505,'EVT38-ZN15-AS13-2024',0,15),(506,'EVT38-ZN15-AS14-2024',0,15),(507,'EVT38-ZN15-AS15-2024',0,15),(508,'EVT38-ZN15-AS16-2024',0,15),(509,'EVT38-ZN15-AS17-2024',0,15),(510,'EVT38-ZN15-AS18-2024',0,15),(511,'EVT38-ZN15-AS19-2024',0,15),(512,'EVT38-ZN15-AS20-2024',0,15),(513,'EVT38-ZN15-AS21-2024',0,15),(514,'EVT38-ZN15-AS22-2024',0,15),(515,'EVT38-ZN15-AS23-2024',0,15),(516,'EVT39-ZN16-AS1-2024',0,16),(517,'EVT39-ZN16-AS2-2024',0,16),(518,'EVT39-ZN16-AS3-2024',0,16),(519,'EVT39-ZN16-AS4-2024',0,16),(520,'EVT39-ZN16-AS5-2024',0,16),(521,'EVT39-ZN16-AS6-2024',0,16),(522,'EVT39-ZN16-AS7-2024',0,16),(523,'EVT39-ZN16-AS8-2024',0,16),(524,'EVT39-ZN16-AS9-2024',0,16),(525,'EVT39-ZN16-AS10-2024',0,16),(526,'EVT39-ZN16-AS11-2024',0,16),(527,'EVT39-ZN16-AS12-2024',0,16),(528,'EVT39-ZN16-AS13-2024',0,16),(529,'EVT39-ZN16-AS14-2024',0,16),(530,'EVT39-ZN16-AS15-2024',0,16),(531,'EVT39-ZN16-AS16-2024',0,16),(532,'EVT39-ZN16-AS17-2024',0,16),(533,'EVT39-ZN16-AS18-2024',0,16),(534,'EVT39-ZN16-AS19-2024',0,16),(535,'EVT39-ZN16-AS20-2024',0,16),(536,'EVT39-ZN16-AS21-2024',0,16),(537,'EVT39-ZN16-AS22-2024',0,16),(538,'EVT39-ZN16-AS23-2024',0,16),(539,'EVT42-ZN17-AS1-2024',0,17),(540,'EVT42-ZN17-AS2-2024',0,17),(541,'EVT42-ZN17-AS3-2024',0,17),(542,'EVT42-ZN17-AS4-2024',0,17),(543,'EVT42-ZN17-AS5-2024',0,17),(544,'EVT42-ZN17-AS6-2024',0,17),(545,'EVT42-ZN17-AS7-2024',0,17),(546,'EVT42-ZN17-AS8-2024',0,17),(547,'EVT42-ZN17-AS9-2024',0,17),(548,'EVT42-ZN17-AS10-2024',0,17),(549,'EVT42-ZN17-AS11-2024',0,17),(550,'EVT42-ZN17-AS12-2024',0,17),(551,'EVT42-ZN17-AS13-2024',0,17),(552,'EVT42-ZN17-AS14-2024',0,17),(553,'EVT42-ZN17-AS15-2024',0,17),(554,'EVT42-ZN17-AS16-2024',0,17),(555,'EVT42-ZN17-AS17-2024',0,17),(556,'EVT42-ZN17-AS18-2024',0,17),(557,'EVT42-ZN17-AS19-2024',0,17),(558,'EVT42-ZN17-AS20-2024',0,17),(559,'EVT42-ZN17-AS21-2024',0,17),(560,'EVT42-ZN17-AS22-2024',0,17),(561,'EVT42-ZN17-AS23-2024',0,17),(562,'EVT42-ZN17-AS24-2024',0,17),(563,'EVT42-ZN17-AS25-2024',0,17),(564,'EVT42-ZN17-AS26-2024',0,17),(565,'EVT42-ZN17-AS27-2024',0,17),(566,'EVT42-ZN17-AS28-2024',0,17),(567,'EVT42-ZN17-AS29-2024',0,17),(568,'EVT42-ZN17-AS30-2024',0,17),(569,'EVT42-ZN17-AS31-2024',0,17),(570,'EVT42-ZN17-AS32-2024',0,17),(571,'EVT42-ZN17-AS33-2024',0,17),(572,'EVT42-ZN17-AS34-2024',0,17),(573,'EVT42-ZN17-AS35-2024',0,17),(574,'EVT42-ZN17-AS36-2024',0,17),(575,'EVT42-ZN17-AS37-2024',0,17),(576,'EVT42-ZN17-AS38-2024',0,17),(577,'EVT42-ZN17-AS39-2024',0,17),(578,'EVT42-ZN17-AS40-2024',0,17),(579,'EVT42-ZN17-AS41-2024',0,17),(580,'EVT42-ZN17-AS42-2024',0,17),(581,'EVT42-ZN17-AS43-2024',0,17),(582,'EVT42-ZN17-AS44-2024',0,17),(583,'EVT42-ZN17-AS45-2024',0,17),(584,'EVT42-ZN17-AS46-2024',0,17),(585,'EVT42-ZN17-AS47-2024',0,17),(586,'EVT42-ZN17-AS48-2024',0,17),(587,'EVT42-ZN17-AS49-2024',0,17),(588,'EVT42-ZN17-AS50-2024',0,17),(589,'EVT42-ZN17-AS51-2024',0,17),(590,'EVT42-ZN17-AS52-2024',0,17),(591,'EVT42-ZN17-AS53-2024',0,17),(592,'EVT42-ZN17-AS54-2024',0,17),(593,'EVT42-ZN17-AS55-2024',0,17),(594,'EVT42-ZN17-AS56-2024',0,17),(595,'EVT42-ZN17-AS57-2024',0,17),(596,'EVT42-ZN17-AS58-2024',0,17),(597,'EVT42-ZN17-AS59-2024',0,17),(598,'EVT42-ZN17-AS60-2024',0,17),(599,'EVT42-ZN17-AS61-2024',0,17),(600,'EVT42-ZN17-AS62-2024',0,17),(601,'EVT42-ZN17-AS63-2024',0,17),(602,'EVT42-ZN17-AS64-2024',0,17),(603,'EVT42-ZN17-AS65-2024',0,17),(604,'EVT42-ZN17-AS66-2024',0,17),(605,'EVT42-ZN17-AS67-2024',0,17),(606,'EVT42-ZN17-AS68-2024',0,17),(607,'EVT42-ZN17-AS69-2024',0,17),(608,'EVT42-ZN17-AS70-2024',0,17),(609,'EVT42-ZN17-AS71-2024',0,17),(610,'EVT42-ZN17-AS72-2024',0,17),(611,'EVT42-ZN17-AS73-2024',0,17),(612,'EVT42-ZN17-AS74-2024',0,17),(613,'EVT42-ZN17-AS75-2024',0,17),(614,'EVT42-ZN17-AS76-2024',0,17),(615,'EVT42-ZN17-AS77-2024',0,17),(616,'EVT42-ZN17-AS78-2024',0,17),(617,'EVT42-ZN17-AS79-2024',0,17),(618,'EVT42-ZN17-AS80-2024',0,17),(619,'EVT42-ZN17-AS81-2024',0,17),(620,'EVT42-ZN17-AS82-2024',0,17),(621,'EVT42-ZN17-AS83-2024',0,17),(622,'EVT42-ZN17-AS84-2024',0,17),(623,'EVT42-ZN17-AS85-2024',0,17),(624,'EVT42-ZN17-AS86-2024',0,17),(625,'EVT42-ZN17-AS87-2024',0,17),(626,'EVT42-ZN17-AS88-2024',0,17),(627,'EVT42-ZN17-AS89-2024',0,17),(628,'EVT42-ZN17-AS90-2024',0,17),(629,'EVT42-ZN18-AS1-2024',0,18),(630,'EVT42-ZN18-AS2-2024',0,18),(631,'EVT42-ZN18-AS3-2024',0,18),(632,'EVT42-ZN18-AS4-2024',0,18),(633,'EVT42-ZN18-AS5-2024',0,18),(634,'EVT42-ZN18-AS6-2024',0,18),(635,'EVT42-ZN18-AS7-2024',0,18),(636,'EVT42-ZN18-AS8-2024',0,18),(637,'EVT42-ZN18-AS9-2024',0,18),(638,'EVT42-ZN18-AS10-2024',0,18),(639,'EVT42-ZN18-AS11-2024',0,18),(640,'EVT42-ZN18-AS12-2024',0,18),(641,'EVT42-ZN18-AS13-2024',0,18),(642,'EVT42-ZN18-AS14-2024',0,18),(643,'EVT42-ZN18-AS15-2024',0,18),(644,'EVT42-ZN18-AS16-2024',0,18),(645,'EVT42-ZN18-AS17-2024',0,18),(646,'EVT42-ZN18-AS18-2024',0,18),(647,'EVT42-ZN18-AS19-2024',0,18),(648,'EVT42-ZN18-AS20-2024',0,18),(649,'EVT42-ZN18-AS21-2024',0,18),(650,'EVT42-ZN18-AS22-2024',0,18),(651,'EVT42-ZN18-AS23-2024',0,18),(652,'EVT42-ZN18-AS24-2024',0,18),(653,'EVT42-ZN18-AS25-2024',0,18),(654,'EVT42-ZN18-AS26-2024',0,18),(655,'EVT42-ZN18-AS27-2024',0,18),(656,'EVT42-ZN18-AS28-2024',0,18),(657,'EVT42-ZN18-AS29-2024',0,18),(658,'EVT42-ZN18-AS30-2024',0,18),(659,'EVT42-ZN18-AS31-2024',0,18),(660,'EVT42-ZN18-AS32-2024',0,18),(661,'EVT42-ZN18-AS33-2024',0,18),(662,'EVT42-ZN18-AS34-2024',0,18),(663,'EVT42-ZN18-AS35-2024',0,18),(664,'EVT42-ZN18-AS36-2024',0,18),(665,'EVT42-ZN18-AS37-2024',0,18),(666,'EVT42-ZN18-AS38-2024',0,18),(667,'EVT42-ZN18-AS39-2024',0,18),(668,'EVT42-ZN18-AS40-2024',0,18),(669,'EVT42-ZN18-AS41-2024',0,18),(670,'EVT42-ZN18-AS42-2024',0,18),(671,'EVT42-ZN18-AS43-2024',0,18),(672,'EVT42-ZN18-AS44-2024',0,18),(673,'EVT42-ZN18-AS45-2024',0,18),(674,'EVT42-ZN18-AS46-2024',0,18),(675,'EVT42-ZN18-AS47-2024',0,18),(676,'EVT42-ZN18-AS48-2024',0,18),(677,'EVT42-ZN18-AS49-2024',0,18),(678,'EVT42-ZN18-AS50-2024',0,18),(679,'EVT42-ZN18-AS51-2024',0,18),(680,'EVT42-ZN18-AS52-2024',0,18),(681,'EVT42-ZN18-AS53-2024',0,18),(682,'EVT42-ZN18-AS54-2024',0,18),(683,'EVT42-ZN18-AS55-2024',0,18),(684,'EVT42-ZN18-AS56-2024',0,18),(685,'EVT42-ZN18-AS57-2024',0,18),(686,'EVT42-ZN18-AS58-2024',0,18),(687,'EVT42-ZN18-AS59-2024',0,18),(688,'EVT42-ZN18-AS60-2024',0,18),(689,'EVT42-ZN18-AS61-2024',0,18),(690,'EVT42-ZN18-AS62-2024',0,18),(691,'EVT42-ZN18-AS63-2024',0,18),(692,'EVT42-ZN18-AS64-2024',0,18),(693,'EVT42-ZN18-AS65-2024',0,18),(694,'EVT42-ZN18-AS66-2024',0,18),(695,'EVT42-ZN18-AS67-2024',0,18),(696,'EVT42-ZN18-AS68-2024',0,18),(697,'EVT42-ZN18-AS69-2024',0,18),(698,'EVT42-ZN18-AS70-2024',0,18),(699,'EVT42-ZN18-AS71-2024',0,18),(700,'EVT42-ZN18-AS72-2024',0,18),(701,'EVT42-ZN18-AS73-2024',0,18),(702,'EVT42-ZN18-AS74-2024',0,18),(703,'EVT42-ZN18-AS75-2024',0,18),(704,'EVT42-ZN18-AS76-2024',0,18),(705,'EVT42-ZN18-AS77-2024',0,18),(706,'EVT42-ZN18-AS78-2024',0,18),(707,'EVT42-ZN18-AS79-2024',0,18),(708,'EVT42-ZN18-AS80-2024',0,18),(709,'EVT42-ZN18-AS81-2024',0,18),(710,'EVT42-ZN18-AS82-2024',0,18),(711,'EVT42-ZN18-AS83-2024',0,18),(712,'EVT42-ZN18-AS84-2024',0,18),(713,'EVT42-ZN18-AS85-2024',0,18),(714,'EVT42-ZN18-AS86-2024',0,18),(715,'EVT42-ZN18-AS87-2024',0,18),(716,'EVT42-ZN18-AS88-2024',0,18),(717,'EVT42-ZN18-AS89-2024',0,18),(718,'EVT42-ZN18-AS90-2024',0,18),(719,'EVT43-ZN19-AS1-2024',0,19),(720,'EVT43-ZN19-AS2-2024',0,19),(721,'EVT43-ZN19-AS3-2024',0,19),(722,'EVT43-ZN19-AS4-2024',0,19),(723,'EVT43-ZN19-AS5-2024',0,19),(724,'EVT43-ZN19-AS6-2024',0,19),(725,'EVT43-ZN19-AS7-2024',0,19),(726,'EVT43-ZN19-AS8-2024',0,19),(727,'EVT43-ZN19-AS9-2024',0,19),(728,'EVT43-ZN19-AS10-2024',0,19),(729,'EVT43-ZN19-AS11-2024',0,19),(730,'EVT43-ZN19-AS12-2024',0,19),(731,'EVT43-ZN19-AS13-2024',0,19),(732,'EVT43-ZN19-AS14-2024',0,19),(733,'EVT43-ZN19-AS15-2024',0,19),(734,'EVT43-ZN19-AS16-2024',0,19),(735,'EVT43-ZN19-AS17-2024',0,19),(736,'EVT43-ZN19-AS18-2024',0,19),(737,'EVT43-ZN19-AS19-2024',0,19),(738,'EVT43-ZN19-AS20-2024',0,19),(739,'EVT43-ZN19-AS21-2024',0,19),(740,'EVT43-ZN19-AS22-2024',0,19),(741,'EVT43-ZN19-AS23-2024',0,19),(742,'EVT43-ZN19-AS24-2024',0,19),(743,'EVT43-ZN19-AS25-2024',0,19),(744,'EVT43-ZN19-AS26-2024',0,19),(745,'EVT43-ZN19-AS27-2024',0,19),(746,'EVT43-ZN19-AS28-2024',0,19),(747,'EVT43-ZN19-AS29-2024',0,19),(748,'EVT43-ZN19-AS30-2024',0,19),(749,'EVT43-ZN19-AS31-2024',0,19),(750,'EVT43-ZN19-AS32-2024',0,19),(751,'EVT43-ZN19-AS33-2024',0,19),(752,'EVT43-ZN19-AS34-2024',0,19),(753,'EVT43-ZN19-AS35-2024',0,19),(754,'EVT43-ZN19-AS36-2024',0,19),(755,'EVT43-ZN19-AS37-2024',0,19),(756,'EVT43-ZN19-AS38-2024',0,19),(757,'EVT43-ZN19-AS39-2024',0,19),(758,'EVT43-ZN19-AS40-2024',0,19),(759,'EVT43-ZN19-AS41-2024',0,19),(760,'EVT43-ZN19-AS42-2024',0,19),(761,'EVT43-ZN19-AS43-2024',0,19),(762,'EVT43-ZN19-AS44-2024',0,19),(763,'EVT43-ZN19-AS45-2024',0,19),(764,'EVT43-ZN19-AS46-2024',0,19),(765,'EVT43-ZN19-AS47-2024',0,19),(766,'EVT43-ZN19-AS48-2024',0,19),(767,'EVT43-ZN19-AS49-2024',0,19),(768,'EVT43-ZN19-AS50-2024',0,19),(769,'EVT43-ZN19-AS51-2024',0,19),(770,'EVT43-ZN19-AS52-2024',0,19),(771,'EVT43-ZN19-AS53-2024',0,19),(772,'EVT43-ZN19-AS54-2024',0,19),(773,'EVT43-ZN19-AS55-2024',0,19),(774,'EVT43-ZN19-AS56-2024',0,19),(775,'EVT43-ZN19-AS57-2024',0,19),(776,'EVT43-ZN19-AS58-2024',0,19),(777,'EVT43-ZN19-AS59-2024',0,19),(778,'EVT43-ZN19-AS60-2024',0,19),(779,'EVT43-ZN20-AS1-2024',0,20),(780,'EVT43-ZN20-AS2-2024',0,20),(781,'EVT43-ZN20-AS3-2024',0,20),(782,'EVT43-ZN20-AS4-2024',0,20),(783,'EVT43-ZN20-AS5-2024',0,20),(784,'EVT43-ZN20-AS6-2024',0,20),(785,'EVT43-ZN20-AS7-2024',0,20),(786,'EVT43-ZN20-AS8-2024',0,20),(787,'EVT43-ZN20-AS9-2024',0,20),(788,'EVT43-ZN20-AS10-2024',0,20),(789,'EVT43-ZN20-AS11-2024',0,20),(790,'EVT43-ZN20-AS12-2024',0,20),(791,'EVT43-ZN20-AS13-2024',0,20),(792,'EVT43-ZN20-AS14-2024',0,20),(793,'EVT43-ZN20-AS15-2024',0,20),(794,'EVT43-ZN20-AS16-2024',0,20),(795,'EVT43-ZN20-AS17-2024',0,20),(796,'EVT43-ZN20-AS18-2024',0,20),(797,'EVT43-ZN20-AS19-2024',0,20),(798,'EVT43-ZN20-AS20-2024',0,20),(799,'EVT43-ZN20-AS21-2024',0,20),(800,'EVT43-ZN20-AS22-2024',0,20),(801,'EVT43-ZN20-AS23-2024',0,20),(802,'EVT43-ZN20-AS24-2024',0,20),(803,'EVT43-ZN20-AS25-2024',0,20),(804,'EVT43-ZN20-AS26-2024',0,20),(805,'EVT43-ZN20-AS27-2024',0,20),(806,'EVT43-ZN20-AS28-2024',0,20),(807,'EVT43-ZN20-AS29-2024',0,20),(808,'EVT43-ZN20-AS30-2024',0,20),(809,'EVT43-ZN20-AS31-2024',0,20),(810,'EVT43-ZN20-AS32-2024',0,20),(811,'EVT43-ZN20-AS33-2024',0,20),(812,'EVT43-ZN20-AS34-2024',0,20),(813,'EVT43-ZN20-AS35-2024',0,20),(814,'EVT43-ZN20-AS36-2024',0,20),(815,'EVT43-ZN20-AS37-2024',0,20),(816,'EVT43-ZN20-AS38-2024',0,20),(817,'EVT43-ZN20-AS39-2024',0,20),(818,'EVT43-ZN20-AS40-2024',0,20),(819,'EVT43-ZN20-AS41-2024',0,20),(820,'EVT43-ZN20-AS42-2024',0,20),(821,'EVT43-ZN20-AS43-2024',0,20),(822,'EVT43-ZN20-AS44-2024',0,20),(823,'EVT43-ZN20-AS45-2024',0,20),(824,'EVT43-ZN20-AS46-2024',0,20),(825,'EVT43-ZN20-AS47-2024',0,20),(826,'EVT43-ZN20-AS48-2024',0,20),(827,'EVT43-ZN20-AS49-2024',0,20),(828,'EVT43-ZN20-AS50-2024',0,20),(829,'EVT43-ZN20-AS51-2024',0,20),(830,'EVT43-ZN20-AS52-2024',0,20),(831,'EVT43-ZN20-AS53-2024',0,20),(832,'EVT43-ZN20-AS54-2024',0,20),(833,'EVT43-ZN20-AS55-2024',0,20),(834,'EVT43-ZN20-AS56-2024',0,20),(835,'EVT43-ZN20-AS57-2024',0,20),(836,'EVT43-ZN20-AS58-2024',0,20),(837,'EVT43-ZN20-AS59-2024',0,20),(838,'EVT43-ZN20-AS60-2024',0,20),(839,'EVT44-ZN21-AS1-2024',0,21),(840,'EVT44-ZN21-AS2-2024',0,21),(841,'EVT44-ZN21-AS3-2024',0,21),(842,'EVT44-ZN21-AS4-2024',0,21),(843,'EVT44-ZN21-AS5-2024',0,21),(844,'EVT44-ZN21-AS6-2024',0,21),(845,'EVT44-ZN21-AS7-2024',0,21),(846,'EVT44-ZN21-AS8-2024',0,21),(847,'EVT44-ZN21-AS9-2024',0,21),(848,'EVT44-ZN21-AS10-2024',0,21),(849,'EVT44-ZN21-AS11-2024',0,21),(850,'EVT44-ZN21-AS12-2024',0,21),(851,'EVT44-ZN21-AS13-2024',0,21),(852,'EVT44-ZN21-AS14-2024',0,21),(853,'EVT44-ZN21-AS15-2024',0,21),(854,'EVT44-ZN21-AS16-2024',0,21),(855,'EVT44-ZN21-AS17-2024',0,21),(856,'EVT44-ZN21-AS18-2024',0,21),(857,'EVT44-ZN21-AS19-2024',0,21),(858,'EVT44-ZN21-AS20-2024',0,21),(859,'EVT44-ZN22-AS1-2024',0,22),(860,'EVT44-ZN22-AS2-2024',0,22),(861,'EVT44-ZN22-AS3-2024',0,22),(862,'EVT44-ZN22-AS4-2024',0,22),(863,'EVT44-ZN22-AS5-2024',0,22),(864,'EVT44-ZN22-AS6-2024',0,22),(865,'EVT44-ZN22-AS7-2024',0,22),(866,'EVT44-ZN22-AS8-2024',0,22),(867,'EVT44-ZN22-AS9-2024',0,22),(868,'EVT44-ZN22-AS10-2024',0,22),(869,'EVT44-ZN22-AS11-2024',0,22),(870,'EVT44-ZN22-AS12-2024',0,22),(871,'EVT44-ZN22-AS13-2024',0,22),(872,'EVT44-ZN22-AS14-2024',0,22),(873,'EVT44-ZN22-AS15-2024',0,22),(874,'EVT44-ZN22-AS16-2024',0,22),(875,'EVT44-ZN22-AS17-2024',0,22),(876,'EVT44-ZN22-AS18-2024',0,22),(877,'EVT44-ZN22-AS19-2024',0,22),(878,'EVT44-ZN22-AS20-2024',0,22),(879,'EVT44-ZN23-AS1-2024',0,23),(880,'EVT44-ZN23-AS2-2024',0,23),(881,'EVT44-ZN23-AS3-2024',0,23),(882,'EVT44-ZN23-AS4-2024',0,23),(883,'EVT44-ZN23-AS5-2024',0,23),(884,'EVT44-ZN23-AS6-2024',0,23),(885,'EVT44-ZN23-AS7-2024',0,23),(886,'EVT44-ZN23-AS8-2024',0,23),(887,'EVT44-ZN23-AS9-2024',0,23),(888,'EVT44-ZN23-AS10-2024',0,23),(889,'EVT44-ZN23-AS11-2024',0,23),(890,'EVT44-ZN23-AS12-2024',0,23),(891,'EVT44-ZN23-AS13-2024',0,23),(892,'EVT44-ZN23-AS14-2024',0,23),(893,'EVT44-ZN23-AS15-2024',0,23);
/*!40000 ALTER TABLE `zonasasientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zonaseventos`
--

DROP TABLE IF EXISTS `zonaseventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zonaseventos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `idEvento` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idEvento_fk_zonaEvento2_idx` (`idEvento`),
  CONSTRAINT `idEvento_fk_zonaEvento2` FOREIGN KEY (`idEvento`) REFERENCES `eventos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zonaseventos`
--

LOCK TABLES `zonaseventos` WRITE;
/*!40000 ALTER TABLE `zonaseventos` DISABLE KEYS */;
INSERT INTO `zonaseventos` VALUES (1,'VIP',100.00,1,50),(2,'General',50.00,1,100),(3,'VIP',100.00,30,50),(4,'General',50.00,30,100),(5,'zona curva',23.00,31,20),(6,'zona curva',23.00,32,20),(7,'zona curva',45.00,33,34),(8,'zona curva',23.00,34,23),(9,'Zona preferencia',23.00,34,23),(10,'zona curva',23.00,35,23),(11,'zona curva',23.00,36,20),(12,'zona normal',45.00,36,43),(13,'zona curva',23.00,37,2),(14,'zona preferencia',50.00,37,35),(15,'Juan Carlos',23.00,38,5),(16,'Juan Carlos',23.00,39,23),(17,'curva norte',30.00,42,90),(18,'curva sur',30.00,42,90),(19,'curva norte',35.00,43,55),(20,'curva sur',35.00,43,60),(21,'zona general',110.00,44,20),(22,'zona curva',100.00,44,20),(23,'zona curva vip',200.00,44,0);
/*!40000 ALTER TABLE `zonaseventos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-05 17:38:09
