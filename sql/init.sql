USE invox_t;

SET GLOBAL host_cache_size=0;
SET @@time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS `ai_analysis_log`
(
    `id`                 INT(11) NOT NULL AUTO_INCREMENT,
    `image_path`         VARCHAR(255)  DEFAULT NULL,
    `success`            BOOLEAN DEFAULT NULL,
    `message`            VARCHAR(255)  DEFAULT NULL,
    `class`              INT(11) DEFAULT NULL,
    `confidence`         DECIMAL(5, 4) DEFAULT NULL,
    `request_timestamp`  TIMESTAMP DEFAULT NULL,
    `response_timestamp` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;