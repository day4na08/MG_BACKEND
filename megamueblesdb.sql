-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-11-2024 a las 19:24:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `megamueblesdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `estilo` varchar(255) DEFAULT NULL,
  `tela` varchar(255) DEFAULT NULL,
  `acabado` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `tapizMaterial` varchar(255) DEFAULT NULL,
  `materialInterno` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `requiereArmado` varchar(50) DEFAULT NULL,
  `alto` decimal(10,2) DEFAULT NULL,
  `ancho` decimal(10,2) DEFAULT NULL,
  `profundidad` decimal(10,2) DEFAULT NULL,
  `pesoNeto` decimal(10,2) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `autor` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `imagen1` varchar(255) DEFAULT NULL,
  `imagen2` varchar(255) DEFAULT NULL,
  `imagen3` varchar(255) DEFAULT NULL,
  `imagen4` varchar(255) DEFAULT NULL,
  `imagen3D` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `name`, `material`, `estilo`, `tela`, `acabado`, `color`, `tapizMaterial`, `materialInterno`, `precio`, `descripcion`, `requiereArmado`, `alto`, `ancho`, `profundidad`, `pesoNeto`, `cantidad`, `autor`, `userId`, `imagen1`, `imagen2`, `imagen3`, `imagen4`, `imagen3D`) VALUES
(2, 'dsadsa', 'dsadsa', 'dsadasdsa', 'dsadsa', 'dsadsa', 'dsadsad', 'dsadsa', 'dsadsa', 2332131.00, 'dsdsadsa', '3213213', 321312.00, 321321.00, 3213213.00, 213123.00, 3231231, '21dsadas', NULL, 'dsadsa', 'dsadasdsa', 'dsadsa', 'dsadsadsa', 'dsadsadsa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos2`
--

CREATE TABLE `productos2` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `material` varchar(25) NOT NULL,
  `color` varchar(25) NOT NULL,
  `precio` int(15) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen3D` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos2`
--

INSERT INTO `productos2` (`id`, `name`, `material`, `color`, `precio`, `descripcion`, `imagen3D`) VALUES
(1, 'sdsadsad', 'dsdads', 'dsadsa', 3231321, 'ead1e2121', 'd21d21dwd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `apellido`, `email`, `contrasena`, `role`) VALUES
(1, 'santiprueba', 'prueba', 'prueba@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'user'),
(2, 'santi', 'prueba 2', 'prueba2@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'admin'),
(3, 'santiii', 'xd', 'xd@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'user'),
(4, 'santi777', 'delgado', 'edpsantii328@gmail.com', '5a2d51109c298ba3060cfc1e16beece7', 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userId` (`userId`);

--
-- Indices de la tabla `productos2`
--
ALTER TABLE `productos2`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos2`
--
ALTER TABLE `productos2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
