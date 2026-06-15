'use strict';
const API = 'https://PortalUNAB.pythonanywhere.com';

class CarreraObj {
  constructor(id, nombre, tipo, pdfUrl, anios) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.pdfUrl = pdfUrl ? (pdfUrl.startsWith('http') ? pdfUrl : `${API}/${pdfUrl}`) : null;
    this.anios = anios;
  }
  get badgeClass() { return { tec:'tipo-tec', lic:'tipo-lic', ccc:'tipo-ccc' }[this.tipo]; }
  get tipoLabel()  { return { tec:'Tecnicatura', lic:'Licenciatura', ccc:'CCC' }[this.tipo]; }
}

const A = (label, cuatris) => ({ label, cuatris });
const Q = (label, mats, anual=false) => ({ label, mats, anual });
const M = (cod, nombre, corr=[], apro=[]) => ({ cod, nombre, corr, apro });

const CARRERAS = [
  new CarreraObj(14, 'Tec. Programación', 'tec', 'static/materiales/Programacion-PE-2023.pdf', [
    A('Primer Año', [
      Q('Cuatrimestre 1', [M(269,'Ciencia, Tecnología e Innovación'), M(2,'Matemática General'), M(184,'Algoritmos y Estructura de Datos')]),
      Q('Cuatrimestre 2', [M(270,'Organización de Computadoras'), M(177,'Álgebra',['Matemática General']), M(271,'Estructura de Datos',['Algoritmos y Estructura de Datos']), M(5,'Inglés')]),
    ]),
    A('Segundo Año', [
      Q('Cuatrimestre 1', [M(189,'Programación Avanzada',['Algoritmos y Estructura de Datos']), M(180,'Probabilidad y Estadística',['Álgebra'],['Matemática General']), M(273,'Desarrollo de Software',['Algoritmos y Estructura de Datos']), M(274,'Inglés Comunicacional',[],['Inglés'])]),
      Q('Cuatrimestre 2', [M(186,'Gestión de Datos',['Estructura de Datos'],['Algoritmos y Estructura de Datos']), M(183,'Inferencia Estadística y Reconoc. de Patrones',['Estructura de Datos','Probabilidad y Estadística'],['Algoritmos y Estructura de Datos']), M(188,'Visualización de la Información',['Estructura de Datos','Programación Avanzada'],['Algoritmos y Estructura de Datos'])]),
    ]),
    A('Tercer Año', [
      Q('Cuatrimestre 1', [M(275,'Sistemas Operativos',['Gestión de Datos']), M(276,'Redes de Computadoras'), M(277,'Conceptos y Paradigmas de Lenguajes de Prog.',[],['Estructura de Datos','Programación Avanzada'])]),
      Q('Cuatrimestre 2', [M(278,'Programación Concurrente',['Sistemas Operativos','Redes de Computadoras'],['Programación Avanzada']), M(191,'Inteligencia Artificial',['Inferencia Estadística y Reconoc. de Patrones']), M(279,'Metodologías Ágiles para el Desarrollo de Sw.',['Programación Avanzada','Gestión de Datos'],['Desarrollo de Software']), M(280,'Prácticas Profesionales Supervisadas (PPS)',[],[],true)]),
    ]),
  ]),
  new CarreraObj(9, 'Tec. Ciencias de Datos', 'tec', 'static/materiales/TEC_-UNIV_-CIENCIAS-DE-DATOS.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(269,'Ciencia, Tecnología e Innovación'), M(2,'Matemática General'), M(174,'Herramientas Computacionales')]), Q('Cuatrimestre 2', [M(281,'Lógica',['Matemática General']), M(175,'Introducción a la Programación',['Herramientas Computacionales']), M(173,'Análisis Matemático I')])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(5,'Inglés'), M(180,'Probabilidad y Estadística',['Lógica']), M(181,'Recolección de Datos y Análisis Primario')]), Q('Cuatrimestre 2', [M(183,'Inferencia Estadística y Reconoc. de Patrones',['Probabilidad y Estadística']), M(184,'Algoritmos y Estructuras de Datos',['Recolección de Datos y Análisis Primario'],['Análisis Matemático I']), M(186,'Gestión de Datos',['Recolección de Datos y Análisis Primario']), M(188,'Visualización de la Información',['Recolección de Datos y Análisis Primario'])])]),
    A('Tercer Año', [Q('Cuatrimestre 1', [M(187,'Modelado y Simulación',['Inferencia Estadística y Reconoc. de Patrones','Gestión de Datos'],['Recolección de Datos y Análisis Primario']), M(191,'Inteligencia Artificial',['Inferencia Estadística y Reconoc. de Patrones']), M(190,'Análisis Multivariado',['Algoritmos y Estructuras de Datos'],['Análisis Matemático I']), M(189,'Programación Avanzada',['Gestión de Datos'])])]),
  ]),
  new CarreraObj(13, 'Tec. Gestión de las Organizaciones', 'tec', 'static/materiales/GESTION-PE-2023.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(1,'Taller de Ciencia, Tecnología y Sociedad'), M(27,'Comunicación Institucional'), M(28,'Sistemas Contables I'), M(29,'Matemática'), M(5,'Inglés')]), Q('Cuatrimestre 2', [M(30,'Economía',['Matemática']), M(31,'Administración'), M(32,'Problemáticas Socio Contemporáneas'), M(33,'Teoría y Comportamiento Organizacional',['Administración'])])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(34,'Sociología de las Organizaciones',['Administración'],['Matemática']), M(35,'Sistemas Contables II',['Sistemas Contables I'],['Matemática']), M(36,'Gestión de la Producción',['Sistemas Contables I','Administración'],['Matemática']), M(37,'Estadística',['Administración'],['Matemática']), M(38,'Informática')]), Q('Cuatrimestre 2', [M(39,'Gestión de Cooperativas',[],['Administración','Sistemas Contables I','Problemáticas Socio Contemporáneas','Teoría y Comportamiento Organizacional']), M(40,'Gestión de Talento Humano y Relaciones Laborales',['Administración'],['Matemática']), M(41,'Gestión de Costos',['Sistemas Contables II']), M(42,'Gestión de la Comercialización e Inv. Comercial',['Administración'],['Matemática']), M(43,'Taller y Práctica Profesionalizante',['Administración','Gestión de la Producción'],['Sistemas Contables I','Estadística'])])]),
    A('Tercer Año', [Q('Cuatrimestre 1', [M(44,'Legislación Comercial y Tributaria',[],['Sistemas Contables I']), M(45,'Estrategia Empresarial',['Gestión de Costos'],['Sistemas Contables II','Gestión de la Producción']), M(46,'Sistemas de Información para la Gestión de las Org.',['Gestión de Costos'],['Sistemas Contables II','Gestión de la Producción']), M(47,'Práctica Supervisada 1.° cuatr. (anual)',['Administración','Gestión de la Producción'],['Sistemas Contables I','Estadística'])]), Q('Cuatrimestre 2', [M(48,'Higiene, Seguridad y Gestión Ambiental',[],['Sistemas Contables I']), M(49,'Evaluación y Administración de Proyecto',['Gestión de Costos'],['Estadística','Gestión de Costos']), M(50,'Control de Gestión',['Gestión de Costos'],['Estadística','Gestión de Costos']), M(47,'Práctica Supervisada 2.° cuatr. (anual)',['Administración','Gestión de la Producción'],['Sistemas Contables I','Estadística'])])]),
  ]),
  new CarreraObj(12, 'Tec. Logística y Transporte', 'tec', 'static/materiales/LOGISTICA-PE-2023.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(1,'Taller de Ciencia, Tecnología y Sociedad'), M(5,'Inglés'), M(51,'Logística I'), M(52,'Matemática'), M(53,'Sociología de las Organizaciones')]), Q('Cuatrimestre 2', [M(54,'Geografía e Integración Territorial'), M(55,'Distribución I',['Logística I']), M(56,'Economía',['Sociología de las organizaciones']), M(57,'Principios de Administración')])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(58,'Estadística Aplicada a la Logística',['Logística I'],['Matemática']), M(59,'Logística II',['Distribución I'],['Logística I']), M(60,'Informática'), M(61,'Gestión Organizacional',['Distribución I'],['Matemática'])]), Q('Cuatrimestre 2', [M(62,'Distribución II',['Logística II'],['Distribución I']), M(63,'Gestión de Calidad de Producción y Servicio',[],['Distribución I','Logística I']), M(64,'Administración de Inventario y Compras',['Logística II'],['Distribución I']), M(65,'Legislación Nacional e Internacional',[],['Logística I'])])]),
    A('Tercer Año', [Q('Cuatrimestre 1', [M(66,'Portugués'), M(67,'Logística III',[],['Logística II']), M(68,'Higiene, Seguridad y Gestión Ambiental',['Distribución II'],['Distribución I','Logística I']), M(69,'Práctica Supervisada (anual)',['Distribución II','Administración de Inventario y Compras'],['Distribución I','Logística I'])]), Q('Cuatrimestre 2', [M(70,'Sistemas de Información Aplicados',['Estadística Aplicada a la Logística','Distribución II'],['Gestión Organizacional']), M(71,'Marketing y Comercialización',[],['Distribución I','Distribución II']), M(72,'Diseño de Proyectos',['Logística III'],['Distribución I','Logística I']), M(69,'Práctica Supervisada 2.° cuatr.',['Distribución II','Administración de Inventario y Compras'],['Distribución I','Logística I'])])]),
  ]),
  new CarreraObj(7, 'Tec. Acompañamiento Terapéutico', 'tec', 'static/materiales/Acompanamiento-Terapeutico-PE-2023.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(1,'Taller de Ciencia, Tecnología y Sociedad'), M(73,'Contextualización del Campo Profesional del AT'), M(27,'Comunicación Institucional'), M(74,'Salud Pública y Salud Mental'), M(172,'Fundamentos de Psicología General y de Intervención Socio-comunitaria')]), Q('Cuatrimestre 2', [M(75,'Psicopatología y Neurociencias',['Fundamentos de Psicología General y de Intervención Socio-comunitaria']), M(76,'Modalidades de Intervención en el AT',['Contextualización del Campo Profesional del AT']), M(77,'Problemáticas Socio Contemporáneas'), M(78,'Taller y Prácticas Profesionalizantes I',['Contextualización del Campo Profesional del AT'],['Fundamentos de Psicología General y de Intervención Socio-comunitaria'])])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(79,'Investigación en Salud',[],['Contextualización del Campo Profesional del AT','Salud Pública y Salud Mental']), M(80,'Ética y Ocupación Humana',['Modalidades de Intervención en el AT'],['Fundamentos de Psicología General y de Intervención Socio-comunitaria']), M(81,'Bioética y Psicofarmacología',['Psicopatología y Neurociencias'],['Contextualización del Campo Profesional del AT','Salud Pública y Salud Mental']), M(82,'Psicología de Grupos I',['Fundamentos de Psicología General y de Intervención Socio-comunitaria'],['Contextualización del Campo Profesional del AT']), M(38,'Informática')]), Q('Cuatrimestre 2', [M(85,'Sistemas Familiares',['Psicología de Grupos I'],['Fundamentos de Psicología General y de Intervención Socio-comunitaria']), M(86,'Teorías del Desarrollo I. Infancia y Adolescencia',['Psicología de Grupos I'],['Fundamentos de Psicología General y de Intervención Socio-comunitaria']), M(87,'Taller y Prácticas Profesionalizantes II',['Psicología de Grupos I','Modalidades de Intervención en el AT'],['Taller y Prácticas Profesionalizantes I']), M(88,'Técnicas de Prevención',[],['Modalidades de Intervención en el AT'])])]),
    A('Tercer Año', [Q('Cuatrimestre 1', [M(89,'Teoría Psicosocial y Comunitaria',['Investigación en Salud'],['Modalidades de Intervención en el AT','Salud Pública y Salud Mental']), M(90,'Psicología de Grupos II',[],['Psicología de Grupos I','Fundamentos de Psicología General y de Intervención Socio-comunitaria','Modalidades de Intervención en el AT']), M(91,'Teorías del Desarrollo II. Adultos y Adultos Mayores',['Teorías del Desarrollo I. Infancia y Adolescencia'],['Fundamentos de Psicología General y de Intervención Socio-comunitaria']), M(92,'Acompañamiento Terapéutico en la Niñez y la Adolescencia',['Teorías del Desarrollo I. Infancia y Adolescencia'],['Modalidades de Intervención en el AT','Psicología de Grupos I'])]), Q('Cuatrimestre 2', [M(93,'Intervención Comunitaria y Recursos Sociales',['Taller y Prácticas Profesionalizantes II'],['Bioética y Psicofarmacología','Psicología de Grupos I']), M(94,'Acompañamiento Terapéutico del Adulto y del Adulto Mayor',['Teorías del Desarrollo II. Adultos y Adultos Mayores'],['Contextualización del Campo Profesional del AT','Modalidades de Intervención en el AT']), M(95,'Taller y Prácticas Profesionalizantes III',['Psicología de Grupos II','Taller y Prácticas Profesionalizantes II'],['Bioética y Psicofarmacología','Psicología de Grupos I']), M(171,'Acompañamiento Terapéutico en el Campo de las Adicciones',['Psicología de Grupos I'],['Teorías del Desarrollo I. Infancia y Adolescencia','Modalidades de Intervención en el AT'])])]),
  ]),
  new CarreraObj(8, 'Tec. Automatización y Control', 'tec', 'static/materiales/AUTOMATIZACION-PE-2023.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(1,'Taller de Ciencia, Tecnología y Sociedad'), M(2,'Matemática General'), M(3,'Medios de Representación y Dibujo Mecánico'), M(4,'Herramientas Computacionales y Programación para la Ingeniería y la Ciencia'), M(5,'Inglés')]), Q('Cuatrimestre 2', [M(6,'Automatización Industrial I'), M(7,'Circuitos Eléctricos'), M(8,'Metodología de Programación'), M(9,'Introducción a los Relés Inteligentes y Microprocesadores')])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(10,'Matemática Aplicada',[],['Matemática General']), M(11,'Sistemas de Control',['Circuitos Eléctricos','Automatización Industrial I'],['Metodología de Programación','Medios de Representación y Dibujo Mecánico']), M(12,'Electrónica e Instrumentación',['Circuitos Eléctricos'],['Medios de Representación y Dibujo Mecánico']), M(13,'Gestión de la Calidad',['Metodología de Programación'],['Taller de Ciencia, Tecnología y Sociedad']), M(14,'Taller y Práctica de Laboratorio (anual 1.° cuatr.)',['Automatización Industrial I','Circuitos Eléctricos','Metodología de Programación'],['Medios de Representación y Dibujo Mecánico'])]), Q('Cuatrimestre 2', [M(15,'Automatización Industrial II',['Sistemas de Control'],['Automatización Industrial I']), M(16,'Robótica Técnica',['Electrónica e Instrumentación'],['Metodología de Programación']), M(17,'Microcontroladores',['Sistemas de Control']), M(14,'Taller y Práctica de Laboratorio (anual 2.° cuatr.)',['Automatización Industrial I','Circuitos Eléctricos','Metodología de Programación'],['Medios de Representación y Dibujo Mecánico'])])]),
    A('Tercer Año', [Q('Cuatrimestre 1', [M(19,'Administración de la Producción y Mantenimiento',[],['Gestión de la Calidad']), M(20,'Control de Máquinas Eléctricas',['Automatización Industrial II','Robótica Técnica']), M(21,'Economía y Procesos Productivos',[],['Gestión de la Calidad']), M(22,'Práctica Supervisada (anual 1.° cuatr.)',[],['Todas las de 1.° y 2.° año'])]), Q('Cuatrimestre 2', [M(23,'Instrumentación y Comunicaciones Industriales',['Administración de la Producción y Mantenimiento']), M(24,'Higiene y Seguridad Industrial',[],['Economía y Procesos Productivos']), M(25,'Desarrollo de Proyectos',['Administración de la Producción y Mantenimiento'],['Microcontroladores']), M(22,'Práctica Supervisada (anual 2.° cuatr.)',[],['Todas las de 1.° y 2.° año'])])]),
  ]),
  new CarreraObj(10, 'Tec. Comunicación Digital', 'tec', 'static/materiales/Comunicacion-Digital-PE-2023.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(1,'Taller de Ciencia, Tecnología y Sociedad'), M(96,'Problemáticas de la Comunicación Social I'), M(97,'Tecnologías Digitales I'), M(5,'Inglés')]), Q('Cuatrimestre 2', [M(98,'Culturas Digitales I',['Tecnologías Digitales I']), M(99,'Psicología y Comunicación Social'), M(100,'Prácticas y Análisis del Discurso',['Tecnologías Digitales I'],['Problemáticas de la Comunicación Social I'])])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(101,'Tecnologías Digitales II',['Tecnologías Digitales I','Problemáticas de la Comunicación Social I']), M(102,'Problemáticas de la Comunicación Social II',['Tecnologías Digitales I','Problemáticas de la Comunicación Social I']), M(103,'Fundamentos del Big Data',['Tecnologías Digitales I']), M(104,'Narrativas Digitales',['Psicología y Comunicación Social','Problemáticas de la Comunicación Social I'],['Tecnologías Digitales I'])]), Q('Cuatrimestre 2', [M(105,'Culturas Digitales II',['Tecnologías Digitales I'],['Culturas Digitales I']), M(106,'Periodismo Digital y Nuevos Medios I',['Tecnologías Digitales II'],['Culturas Digitales I','Problemáticas de la Comunicación Social I']), M(107,'Pensamiento de Diseño I',['Psicología y Comunicación Social'],['Culturas Digitales I','Problemáticas de la Comunicación Social I']), M(108,'Comunicación Digital en Organizaciones',['Psicología y Comunicación Social','Problemáticas de la Comunicación Social I'],['Culturas Digitales I'])])]),
    A('Tercer Año', [Q('Cuatrimestre 1', [M(109,'Planificación y Marketing Digital',['Tecnologías Digitales II','Periodismo Digital y Nuevos Medios I'],['Psicología y Comunicación Social','Problemáticas de la Comunicación Social I']), M(110,'Gestión de la Comunicación Digital',['Tecnologías Digitales II','Culturas Digitales II'],['Psicología y Comunicación Social','Prácticas y Análisis del Discurso']), M(111,'Lenguajes de Programación',['Culturas Digitales II'],['Psicología y Comunicación Social','Prácticas y Análisis del Discurso']), M(112,'Producción de Materiales Educativos Digitales',['Tecnologías Digitales II','Psicología y Comunicación Social'],['Narrativas Digitales','Prácticas y Análisis del Discurso'])]), Q('Cuatrimestre 2', [M(113,'Periodismo Digital y Nuevos Medios II',['Tecnologías Digitales II','Periodismo Digital y Nuevos Medios I','Pensamiento de Diseño I'],['Prácticas y Análisis del Discurso','Narrativas Digitales','Culturas Digitales II']), M(114,'Pensamiento de Diseño II',['Pensamiento de Diseño I'],['Prácticas y Análisis del Discurso','Narrativas Digitales','Culturas Digitales II']), M(115,'Taller de Producción y Edición Multimedia',['Planificación y Marketing Digital','Gestión de la Comunicación Digital'],['Narrativas Digitales','Prácticas y Análisis del Discurso']), M(116,'Comunicación Digital de Gobierno y Ciudades Inteligentes',['Planificación y Marketing Digital','Gestión de la Comunicación Digital'],['Prácticas y Análisis del Discurso','Narrativas Digitales'])])]),
  ]),
  new CarreraObj(11, 'Tec. Diseño y Desarrollo de Producto', 'tec', 'static/materiales/Diseno-desarrollo-producto-PE-2023.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(132,'Fundamentos del Diseño'), M(3,'Medios de Representación y Dibujo Mecánico'), M(29,'Matemática'), M(5,'Inglés'), M(1,'Taller de Ciencia, Tecnología y Sociedad')]), Q('Cuatrimestre 2', [M(133,'Materiales',[],['Matemática']), M(139,'Morfología I',['Fundamentos del Diseño','Medios de Representación y Dibujo Mecánico']), M(135,'Historia del Arte y el Diseño',[],['Taller de Ciencia, Tecnología y Sociedad']), M(4,'Herramientas Computacionales y Programación para la Ingeniería y la Ciencia')])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(140,'Taller de Diseño I – Desarrollo de Producto',['Materiales','Medios de Representación y Dibujo Mecánico','Fundamentos del Diseño']), M(262,'Representación y Modelado Digital',['Medios de Representación y Dibujo Mecánico','Herramientas Computacionales y Programación para la Ingeniería y la Ciencia']), M(264,'Métodos del Diseño',['Fundamentos del Diseño'],['Taller de Ciencia, Tecnología y Sociedad']), M(263,'Diseño Industrial',['Historia del Arte y el Diseño'],['Taller de Ciencia, Tecnología y Sociedad']), M(147,'Tecnología y Producción I',['Materiales'],['Matemática'])]), Q('Cuatrimestre 2', [M(144,'Taller de Diseño II – Forma y Función',['Taller de Diseño I – Desarrollo de Producto','Representación y Modelado Digital'],['Materiales','Medios de Representación y Dibujo Mecánico']), M(265,'Ciencia Aplicada al Diseño y Desarrollo de Productos',[],['Matemática','Materiales']), M(143,'Morfología II',['Morfología I'],['Fundamentos del Diseño']), M(151,'Tecnología y Producción II',['Materiales','Tecnología y Producción I'],['Matemática'])])]),
    A('Tercer Año', [Q('Cuatrimestre 1', [M(148,'Taller de Diseño III – Concepto y Tecnología',['Taller de Diseño II – Forma y Función','Morfología II','Tecnología y Producción II'],['Taller de Diseño I – Desarrollo de Producto','Morfología I']), M(138,'Semiótica',['Morfología I'],['Taller de Ciencia, Tecnología y Sociedad']), M(150,'Ergonomía',['Taller de Diseño II – Forma y Función'],['Taller de Diseño I – Desarrollo de Producto']), M(266,'Gestión de Empresas de Diseño',['Tecnología y Producción I']), M(268,'Tecnología y Producción III',['Tecnología y Producción II','Taller de Diseño II – Forma y Función'],['Tecnología y Producción I'])]), Q('Cuatrimestre 2', [M(136,'Higiene y Seguridad Industrial',[],['Tecnología y Producción I']), M(267,'Gestión de la Calidad',['Tecnología y Producción II','Taller de Diseño II – Forma y Función']), M(152,'Práctica Profesional Supervisada',['Taller de Diseño III – Concepto y Tecnología'],['Taller de Diseño II – Forma y Función']), M(153,'Trabajo Final Integrador',['Tecnología y Producción III','Taller de Diseño III – Concepto y Tecnología'],['Representación y Modelado Digital'])])]),
  ]),
  new CarreraObj(15, 'Tec. Prótesis Dental', 'tec', 'static/materiales/Protesis-Dental-PE-2023.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(1,'Taller de Ciencia, Tecnología y Sociedad'), M(4,'Herramientas Computacionales y Programación para la Ingeniería y la Ciencia'), M(246,'Física-Química'), M(247,'Anatomía y Biología Bucal')]), Q('Cuatrimestre 2', [M(248,'Oclusión'), M(249,'Materiales Dentales'), M(5,'Inglés'), M(250,'Digitalización')])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(251,'Diagnóstico y Odontología Digital I',['Anatomía y Biología Bucal','Oclusión','Materiales Dentales']), M(252,'Prótesis Removible',['Anatomía y Biología Bucal','Oclusión','Materiales Dentales']), M(253,'Digitalización y Diseño I',['Anatomía y Biología Bucal','Oclusión','Materiales Dentales']), M(29,'Matemática')]), Q('Cuatrimestre 2', [M(254,'Prótesis Fija',['Diagnóstico y Odontología Digital I','Prótesis Removible','Digitalización y Diseño I']), M(255,'Digitalización y Diseño II',['Diagnóstico y Odontología Digital I','Prótesis Removible','Digitalización y Diseño I']), M(256,'Procesos de Gestión de Laboratorio Dental',['Diagnóstico y Odontología Digital I','Prótesis Removible','Digitalización y Diseño I']), M(257,'Metodología de la Investigación',['Diagnóstico y Odontología Digital I','Prótesis Removible','Digitalización y Diseño I'],['Matemática'])])]),
    A('Tercer Año', [Q('Cuatrimestre 1', [M(258,'Prótesis Implanto Asistida',['Prótesis Fija','Digitalización y Diseño II','Procesos de Gestión de Laboratorio Dental'],['Todas las de 1.° y 2.° año']), M(259,'Diagnóstico y Odontología Digital II',['Prótesis Fija','Digitalización y Diseño II','Procesos de Gestión de Laboratorio Dental'],['Todas las de 1.° y 2.° año']), M(260,'Digitalización y Diseño III',['Prótesis Fija','Digitalización y Diseño II','Procesos de Gestión de Laboratorio Dental'],['Todas las de 1.° y 2.° año']), M(261,'Práctica Profesional Supervisada (anual)',[],['Todas las de 1.° y 2.° año'])]), Q('Cuatrimestre 2', [M(262,'Cirugía Guiada',['Prótesis Implanto Asistida','Diagnóstico y Odontología Digital II','Digitalización y Diseño III'],['Todas las de 1.° y 2.° año']), M(263,'Ortodoncia y Ortopedia',['Prótesis Implanto Asistida','Diagnóstico y Odontología Digital II','Digitalización y Diseño III'],['Todas las de 1.° y 2.° año']), M(261,'Práctica Profesional Supervisada (anual)',[],['Todas las de 1.° y 2.° año'])])]),
  ]),
  new CarreraObj(1, 'Lic. en Enfermería', 'lic', 'static/materiales/PE-Lic-Enfermeria.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(282,'Enfermería Básica I'), M(283,'Ciencias Biológicas I'), M(284,'Enfermería Comunitaria I'), M(269,'Ciencia, Tecnología e Innovación'), M(285,'Psicología')]), Q('Cuatrimestre 2', [M(286,'Enfermería Básica II',['Enfermería Básica I']), M(287,'Ciencias Biológicas II',['Ciencias Biológicas I']), M(288,'Epidemiología'), M(289,'Microbiología y Parasitología',['Ciencias Biológicas I']), M(290,'Antropología')])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(291,'Cuidados de Enfermería en el Adulto y el Anciano I',['Enfermería Básica II','Ciencias Biológicas II'],['Enfermería Básica I','Ciencias Biológicas I']), M(292,'Enfermería Materno Infantil I',['Enfermería Básica II','Ciencias Biológicas II'],['Enfermería Básica I','Ciencias Biológicas I']), M(293,'Nutrición y Dietoterapia',['Ciencias Biológicas II'],['Ciencias Biológicas I']), M(294,'Introducción a la Sociología',['Antropología']), M(295,'Introducción a la Filosofía',['Antropología'])]), Q('Cuatrimestre 2', [M(296,'Cuidados de Enfermería en el Adulto y el Anciano II',['Cuidados de Enfermería en el Adulto y el Anciano I'],['Enfermería Básica I','Ciencias Biológicas I']), M(297,'Enfermería Materno Infantil II',['Enfermería Materno Infantil I'],['Enfermería Básica I','Ciencias Biológicas I']), M(298,'Farmacología',['Nutrición y Dietoterapia'],['Ciencias Biológicas I']), M(299,'Ética y Deontología Profesional',['Introducción a la Sociología','Introducción a la Filosofía'],['Antropología']), M(38,'Informática')])]),
    A('Tercer Año', [Q('Cuatrimestre 1', [M(300,'Cuidados de Enfermería en el Niño y el Adolescente',['Cuidados de Enfermería en el Adulto y el Anciano II','Enfermería Materno Infantil II']), M(301,'Gestión de los Servicios de Enfermería Hosp. y Com. I',['Ética y Deontología Profesional'],['Enfermería Comunitaria I','Epidemiología','Microbiología y Parasitología','Ciencias Biológicas I']), M(302,'Introducción a la Investigación en Enfermería',['Ética y Deontología Profesional'],['Cuidados de Enfermería en el Adulto y el Anciano I']), M(303,'UNaB I (Seminario Optativo I)')]), Q('Cuatrimestre 2', [M(304,'Enfermería en Salud Mental',['Cuidados de Enfermería en el Adulto y el Anciano II','Cuidados de Enfermería en el Niño y el Adolescente','Introducción a la Investigación en Enfermería'],['Enfermería Comunitaria I','Epidemiología','Microbiología y Parasitología','Ciencias Biológicas I']), M(305,'UNaB II (Seminario Optativo II)',['UNaB I (Seminario Optativo I)']), M(5,'Inglés'), M(306,'Práctica Integrada I',['Cuidados de Enfermería en el Adulto y el Anciano II','Cuidados de Enfermería en el Niño y el Adolescente','Introducción a la Investigación en Enfermería'],['Enfermería Comunitaria I','Epidemiología','Microbiología y Parasitología','Ciencias Biológicas I'])])]),
    A('Cuarto Año', [Q('Cuatrimestre 1', [M(307,'Enfermería en Cuidados Críticos I',['Enfermería en Salud Mental','UNaB II (Seminario Optativo II)','Inglés','Práctica Integrada I'],['Cuidados de Enfermería en el Adulto y el Anciano II','Cuidados de Enfermería en el Niño y el Adolescente','Introducción a la Investigación en Enfermería']), M(308,'Investigación I',['Enfermería en Salud Mental','UNaB II (Seminario Optativo II)','Inglés','Práctica Integrada I'],['Cuidados de Enfermería en el Adulto y el Anciano II','Cuidados de Enfermería en el Niño y el Adolescente','Introducción a la Investigación en Enfermería']), M(309,'Taller de Investigación I',['Enfermería en Salud Mental','UNaB II (Seminario Optativo II)','Inglés','Práctica Integrada I'],['Cuidados de Enfermería en el Adulto y el Anciano II','Cuidados de Enfermería en el Niño y el Adolescente','Introducción a la Investigación en Enfermería'])]), Q('Cuatrimestre 2', [M(310,'Enfermería en Cuidados Críticos II',['Enfermería en Cuidados Críticos I'],['Enfermería en Salud Mental','UNaB II (Seminario Optativo II)','Práctica Integrada I']), M(311,'Educación en Enfermería',[],['Enfermería en Salud Mental','UNaB II (Seminario Optativo II)','Práctica Integrada I']), M(312,'Filosofía del Cuidado',[],['Enfermería en Salud Mental','UNaB II (Seminario Optativo II)','Práctica Integrada I']), M(274,'Inglés Comunicacional',[],['Inglés'])])]),
    A('Quinto Año', [Q('Cuatrimestre 1', [M(313,'Gestión de los Servicios de Enfermería Hosp. y Com. II',['Investigación I']), M(314,'Taller de Investigación II',['Taller de Investigación I']), M(315,'Enfermería Comunitaria II',['Educación en Enfermería']), M(316,'Sociología de la Salud',['Filosofía del Cuidado'])]), Q('Cuatrimestre 2', [M(317,'Gestión de los Servicios de Enfermería Hosp. y Com. III',['Gestión de los Servicios de Enfermería Hosp. y Com. II']), M(318,'Enfermería Comunitaria III',['Enfermería Comunitaria II']), M(319,'Ética y Desarrollo Profesional',['Filosofía del Cuidado']), M(320,'Práctica Integrada II',['Investigación I','Taller de Investigación I','Investigación I','Enfermería Comunitaria II'],['Todas las de Enfermería en Cuidados Críticos II'])])]),
  ]),
  new CarreraObj(2, 'Lic. Administración', 'lic', 'static/materiales/LIC-Administracion-PE-2023.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(1,'Taller de Ciencia, Tecnología y Sociedad'), M(27,'Comunicación Institucional'), M(28,'Sistemas Contables I'), M(29,'Matemática'), M(5,'Inglés')]), Q('Cuatrimestre 2', [M(30,'Economía',['Matemática']), M(31,'Administración'), M(32,'Problemáticas Socio Contemporáneas'), M(33,'Teoría y Comportamiento Organizacional',['Administración']), M(154,'Historia Económica y Social')])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(34,'Sociología de las Organizaciones',['Administración'],['Matemática']), M(35,'Sistemas Contables II',['Sistemas Contables I'],['Matemática']), M(36,'Gestión de la Producción',['Sistemas Contables I','Administración'],['Matemática']), M(37,'Estadística',['Administración'],['Matemática']), M(38,'Informática')]), Q('Cuatrimestre 2', [M(39,'Gestión de Cooperativas',[],['Administración','Sistemas Contables I','Problemáticas Socio Contemporáneas','Teoría y Comportamiento Organizacional']), M(155,'Gestión de las Relaciones Laborales',['Sociología de las Organizaciones'],['Administración','Sistemas Contables I','Estadística']), M(41,'Gestión de Costos',['Sistemas Contables II']), M(42,'Gestión de la Comercialización e Inv. Comercial',['Sociología de las Organizaciones'],['Sistemas Contables I']), M(156,'Macroeconomía',['Economía'],['Matemática'])])]),
    A('Tercer Año', [Q('Cuatrimestre 1', [M(44,'Legislación Comercial y Tributaria',[],['Sistemas Contables I']), M(45,'Administración Pública'), M(46,'Estrategia Empresarial',['Gestión de Costos'],['Sistemas Contables II','Gestión de la Producción']), M(157,'Sistemas de Información para la Gestión de las Org.',['Gestión de Costos'],['Sistemas Contables II','Gestión de la Producción']), M(158,'Matemática Financiera',['Estadística'],['Matemática'])]), Q('Cuatrimestre 2', [M(48,'Higiene, Seguridad y Gestión Ambiental',[],['Sistemas Contables I']), M(49,'Evaluación y Administración de Proyecto',['Gestión de Costos'],['Estadística','Gestión de Costos']), M(50,'Control de Gestión',['Gestión de Costos'],['Estadística','Gestión de Costos']), M(159,'Métodos de Investigación en Ciencias Sociales',[],['Taller de Ciencia, Tecnología y Sociedad']), M(160,'Derecho del Trabajo y Seguridad Social',[],['Legislación Comercial y Tributaria'])])]),
    A('Cuarto Año', [Q('Cuatrimestre 1', [M(161,'Estadística Aplicada a la Administración',['Estadística'],['Matemática']), M(162,'Derecho Civil y Comercial',['Matemática Financiera'],['Legislación Comercial y Tributaria']), M(163,'Finanzas Públicas',[],['Administración','Sistemas Contables I','Estadística','Sistemas Contables II']), M(164,'Microeconomía',['Macroeconomía']), M(165,'Economía Social',[],['Economía'])]), Q('Cuatrimestre 2', [M(166,'Administración Financiera',['Control de Gestión'],['Administración','Sistemas Contables I','Estadística']), M(167,'Comercio Exterior',['Finanzas Públicas'],['Administración','Sistemas Contables I','Estadística']), M(168,'Administración de la Producción',['Gestión de Costos'],['Administración','Sistemas Contables I','Estadística']), M(169,'Marketing',['Gestión de la Comercialización e Inv. Comercial'],['Administración','Sistemas Contables I','Estadística'])])]),
    A('Quinto Año', [Q('Cuatrimestre 1', [M(170,'Taller Trabajo de Integración Final',['Administración Financiera','Comercio Exterior','Administración de la Producción'],['Control de Gestión','Evaluación y Administración de Proyecto'])])]),
  ]),
  new CarreraObj(3, 'Lic. Ciencia de Datos', 'lic', 'static/materiales/LIC-Ciencias-Datos-PE-2023.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(1,'Taller de Ciencia, Tecnología y Sociedad'), M(173,'Análisis Matemático I'), M(174,'Herramientas Computacionales'), M(5,'Inglés')]), Q('Cuatrimestre 2', [M(175,'Introducción a la Programación',['Herramientas Computacionales']), M(176,'Análisis Matemático II',['Análisis Matemático I']), M(177,'Álgebra',['Análisis Matemático I']), M(178,'Administración',[],['Taller de Ciencia, Tecnología y Sociedad'])])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(179,'Economía',['Álgebra'],['Taller de Ciencia, Tecnología y Sociedad']), M(180,'Probabilidad y Estadística',['Álgebra']), M(181,'Recolección de Datos y Análisis Primario de la Inf.',['Análisis Matemático II','Herramientas Computacionales']), M(182,'Introducción al Análisis Contable y Financiero',['Administración'])]), Q('Cuatrimestre 2', [M(183,'Inferencia Estadística y Reconoc. de Patrones',['Probabilidad y Estadística']), M(184,'Algoritmos y Estructuras de Datos',['Recolección de Datos y Análisis Primario de la Inf.'],['Análisis Matemático II']), M(185,'Metodologías de Investigación',['Recolección de Datos y Análisis Primario de la Inf.']), M(186,'Gestión de Datos',['Recolección de Datos y Análisis Primario de la Inf.'])])]),
    A('Tercer Año', [
      Q('Cuatrimestre 1', [
        M(187,'Modelado y Simulación',['Inferencia Estadística y Reconoc. de Patrones','Gestión de Datos'],['Recolección de Datos y Análisis Primario de la Inf.']),
        M(188,'Visualización de la Información',['Recolección de Datos y Análisis Primario de la Inf.']),
        M(189,'Programación Avanzada',['Gestión de Datos']),
        M(190,'Análisis Multivariado',['Algoritmos y Estructuras de Datos'],['Análisis Matemático I'])
      ]),
      Q('Cuatrimestre 2', [
        M(191,'Inteligencia Artificial',['Inferencia Estadística y Reconoc. de Patrones']),
        M(192,'Análisis en Redes Sociales',['Visualización de la Información']),
        M(193,'Taller I - Big Data y las Políticas Públicas'),
        M(194,'Técnicas de Investigación de Mercado')
      ])
    ]),
    A('Cuarto Año', [Q('Cuatrimestre 1', [M(195,'Computación en la Nube',['Programación Avanzada'],['Gestión de Datos']), M(196,'Comercio Electrónico',['Técnicas de Investigación de Mercado']), M(197,'Taller II - Big Data y la Salud',['Taller I - Big Data y las Políticas Públicas']), M(198,'Formulación y Evaluación de Proyectos Tecnológicos')]), Q('Cuatrimestre 2', [M(199,'Seminario Final',[],['Todas las materias de 3.° año']), M(200,'Práctica Profesional Supervisada (PPS)',[],['Todas las materias de 3.° año'])])]),
  ]),
  new CarreraObj(4, 'Lic. Ciencia Política', 'lic', 'static/materiales/Ciencia-Politica-PE-2023.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(1,'Taller de Ciencia, Tecnología y Sociedad'), M(32,'Problemáticas Socio Contemporáneas'), M(29,'Matemática'), M(221,'Introducción a la Ciencia Política'), M(27,'Comunicación Institucional')]), Q('Cuatrimestre 2', [M(222,'Teoría Política',['Introducción a la Ciencia Política']), M(154,'Historia Económica y Social',[],['Problemáticas Socio Contemporáneas']), M(30,'Economía',['Matemática']), M(223,'Derecho'), M(5,'Inglés')])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(224,'Sociología',['Teoría Política'],['Problemáticas Socio Contemporáneas','Introducción a la Ciencia Política']), M(225,'Epistemología',[],['Taller de Ciencia, Tecnología y Sociedad']), M(157,'Administración Pública',['Teoría Política'],['Introducción a la Ciencia Política']), M(226,'Historia Argentina y Latinoamericana',['Historia Económica y Social']), M(37,'Estadística',['Economía'],['Matemática'])]), Q('Cuatrimestre 2', [M(227,'Teoría Política Contemporánea',['Sociología'],['Teoría Política']), M(159,'Métodos de Investigación en Ciencias Sociales',['Epistemología'],['Taller de Ciencia, Tecnología y Sociedad']), M(34,'Sociología de las Organizaciones',[],['Problemáticas Socio Contemporáneas']), M(228,'Derecho Administrativo',['Teoría Política'],['Introducción a la Ciencia Política']), M(229,'Instituciones Políticas y de Gobierno',['Teoría Política Contemporánea'],['Teoría Política'])])]),
    A('Tercer Año', [Q('Cuatrimestre 1', [M(163,'Finanzas Públicas',[],['Economía','Estadística','Historia Argentina y Latinoamericana']), M(230,'Actores Sociales',['Teoría Política Contemporánea','Métodos de Investigación en Ciencias Sociales'],['Sociología']), M(231,'Relaciones Internacionales I',['Teoría Política Contemporánea'],['Sociología']), M(232,'Análisis de las Políticas Públicas',['Métodos de Investigación en Ciencias Sociales','Teoría Política Contemporánea'],['Administración Pública','Instituciones Políticas y de Gobierno']), M(38,'Informática')]), Q('Cuatrimestre 2', [M(233,'Gobierno Local',['Actores Sociales'],['Métodos de Investigación en Ciencias Sociales','Sociología']), M(234,'Opinión Pública',[],['Estadística','Historia Argentina y Latinoamericana','Teoría Política Contemporánea']), M(103,'Fundamentos del Big Data',['Estadística'],['Estadística','Historia Argentina y Latinoamericana','Teoría Política Contemporánea']), M(235,'Seminario I',[],['20 materias + CPU']), M(156,'Macroeconomía',[],['Economía','Estadística'])])]),
    A('Cuarto Año', [Q('Cuatrimestre 1', [M(236,'Teoría de los Partidos Políticos',[],['Sociología','Actores Sociales','Instituciones Políticas y de Gobierno']), M(237,'Teoría Política Analítica',[],['Sociología','Actores Sociales','Instituciones Políticas y de Gobierno']), M(238,'Relaciones Internacionales II',['Relaciones Internacionales I']), M(239,'Política Argentina',['Gobierno Local'],['Sociología','Actores Sociales','Instituciones Políticas y de Gobierno']), M(240,'Seminario II',[],['20 materias + CPU'])]), Q('Cuatrimestre 2', [M(241,'Institución Presidencial y Poder Ejecutivo',['Teoría de los Partidos Políticos'],['Sociología','Actores Sociales','Instituciones Políticas y de Gobierno']), M(242,'Análisis Político',['Teoría de los Partidos Políticos'],['Sociología','Actores Sociales','Instituciones Políticas y de Gobierno']), M(243,'Historia Argentina y Latinoamericana del S.XX',['Teoría Política Analítica'],['Sociología','Actores Sociales','Instituciones Políticas y de Gobierno']), M(244,'Comunicación Política',['Teoría Política Analítica'],['Gobierno Local','Opinión Pública']), M(245,'Seminario III',[],['20 materias + CPU'])])]),
  ]),
  new CarreraObj(5, 'Lic. Logística y Transporte', 'lic', 'static/materiales/LIC-Logistica-PE-2023.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(1,'Taller de Ciencia, Tecnología y Sociedad'), M(51,'Logística I'), M(52,'Matemática'), M(53,'Sociología de las Organizaciones'), M(5,'Inglés')]), Q('Cuatrimestre 2', [M(54,'Geografía e Integración Territorial'), M(55,'Distribución I',['Logística I']), M(56,'Economía',['Logística I']), M(57,'Principios de Administración'), M(117,'Transporte Terrestre')])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(58,'Estadística Aplicada a la Logística',['Logística I'],['Matemática']), M(59,'Logística II',['Distribución I'],['Logística I']), M(60,'Informática'), M(61,'Gestión Organizacional',['Distribución I'],['Matemática']), M(118,'Matemática Aplicada a la Logística',['Matemática'])]), Q('Cuatrimestre 2', [M(62,'Distribución II',['Logística II'],['Distribución I']), M(63,'Gestión de Calidad de Producción y Servicio',[],['Distribución I','Logística I']), M(64,'Administración de Inventario y Compras',['Logística II'],['Distribución I']), M(65,'Legislación Nacional e Internacional',[],['Logística I']), M(119,'Transporte Aéreo',['Transporte Terrestre'],['Distribución I'])])]),
    A('Tercer Año', [Q('Cuatrimestre 1', [M(66,'Portugués I'), M(67,'Logística III',[],['Logística II']), M(68,'Higiene, Seguridad y Gestión Ambiental',['Distribución II'],['Distribución I','Logística I']), M(120,'Metodología de las Ciencias'), M(121,'Práctica Supervisada (anual 1.° cuatr.)',['Distribución II','Administración de Inventario y Compras'],['Distribución I','Logística I'])]), Q('Cuatrimestre 2', [M(70,'Sistemas de Información Aplicados',['Estadística Aplicada a la Logística','Distribución II'],['Gestión Organizacional']), M(71,'Marketing y Comercialización',[],['Distribución I','Distribución II']), M(72,'Diseño de Proyectos',['Logística III'],['Distribución I','Logística I']), M(122,'Comercio Internacional',[],['Distribución I','Distribución II']), M(121,'Práctica Supervisada (anual 2.° cuatr.)',['Distribución II','Administración de Inventario y Compras'],['Distribución I','Logística I'])])]),
    A('Cuarto Año', [Q('Cuatrimestre 1', [M(123,'Transporte Marítimo y Fluvial',['Transporte Aéreo'],['Distribución I','Distribución II']), M(124,'Gestión con Materiales Peligrosos',[],['Distribución I','Distribución II']), M(125,'Administración de Personal',[],['Distribución I','Distribución II']), M(126,'Portugués II',['Portugués I']), M(127,'Taller de Problemáticas Contemporáneas de Logística y Transporte',['Diseño de Proyectos'],['Distribución I','Logística I'])]), Q('Cuatrimestre 2', [M(128,'Planeamiento Estratégico (cont.)',[],['Comercio Internacional','Marketing y Comercialización']), M(129,'Seguridad Operativa',['Administración de Personal'],['Distribución I','Distribución II']), M(130,'Logística Sustentable',[],['Distribución I','Distribución II']), M(131,'Taller Trabajo de Integración Final',[],['Todas las materias de 1.°, 2.° y 3.° año'])])]),
  ]),
  new CarreraObj(6, 'CCC. Lic. Enseñanza de la Matemática', 'ccc', 'static/materiales/LIC-Matematica-PE-2023.pdf', [
    A('Primer Año', [Q('Cuatrimestre 1', [M(201,'Didáctica de la Matemática'), M(202,'Epistemología e Historia de la Matemática'), M(203,'Álgebra Lineal y Fundamentos de la Geometría y su Enseñanza'), M(5,'Inglés'), M(204,'Taller de Intervención y Reflexión Pedagógica (anual 1.° cuatr.)')]), Q('Cuatrimestre 2', [M(205,'Diseño y Desarrollo Curricular'), M(206,'Sujetos de la Educación'), M(207,'Análisis Numérico y su Enseñanza'), M(208,'Análisis Vectorial I y su Enseñanza'), M(204,'Taller de Intervención y Reflexión Pedagógica (anual 2.° cuatr.)')])]),
    A('Segundo Año', [Q('Cuatrimestre 1', [M(209,'Inclusión Educativa y Discapacidad'), M(210,'Probabilidad y Estadística y su Enseñanza'), M(211,'Ecuaciones Diferenciales I y su Enseñanza'), M(212,'Análisis Complejo y su Enseñanza'), M(213,'Trayecto de Integración Formativa (anual 1.° cuatr.)',['Taller de Intervención y Reflexión Pedagógica (anual 2.° cuatr.)'])]), Q('Cuatrimestre 2', [M(214,'Evaluación'), M(215,'Ecuaciones Diferenciales II y su Enseñanza',['Ecuaciones Diferenciales I y su Enseñanza']), M(216,'Análisis Vectorial II y su Enseñanza',['Análisis Vectorial I y su Enseñanza']), M(217,'Tecnologías Aplicadas a la Enseñanza de la Matemática'), M(213,'Trayecto de Integración Formativa (anual 2.° cuatr.)',['Taller de Intervención y Reflexión Pedagógica (anual 2.° cuatr.)'],['Trayecto de Integración Formativa (anual 1.° cuatr.)'])])]),
  ]),
];

const mat = (carpeta, archivo) => ({ carpeta, archivo });
const MATERIAS_FALLBACK = [
  { id:269, nombre:"Ciencia, Tecnología e Innovación", anio:"1° Año", cuatrimestre:"Primer Cuatrimestre", correlativas:[], aprobada:[], materiales:[mat("CIENCIA, TECNOLOGIA E INNOVACION","Ciencia, política y cientificismo -Trabajo practico 2025.pdf"), mat("CIENCIA, TECNOLOGIA E INNOVACION","CTI - Jawtuschenko.pdf"), mat("CIENCIA, TECNOLOGIA E INNOVACION","CTI - Thomas.pdf"), mat("CIENCIA, TECNOLOGIA E INNOVACION","cti_digital.pdf"), mat("CIENCIA, TECNOLOGIA E INNOVACION","Libro Ciencia Tecnologia y Sociedad.pdf"), mat("CIENCIA, TECNOLOGIA E INNOVACION","mazzucato.pdf"), mat("CIENCIA, TECNOLOGIA E INNOVACION","Mensaje-Mensaje ambiental a los pueblos - JD Perón 1972.pdf"), mat("CIENCIA, TECNOLOGIA E INNOVACION","Metodologia de las Ciencias Sociales E. Diaz.pdf"), mat("CIENCIA, TECNOLOGIA E INNOVACION","Rothbard explica la respuesta apropiada al cambio climático.pdf")]},
  { id:2, nombre:"Matemática General", anio:"1° Año", cuatrimestre:"Primer Cuatrimestre", correlativas:[], aprobada:[], materiales:[mat("MATEMATICA GENERAL","Matemática general Teoria.pdf"), mat("MATEMATICA GENERAL","Practica_1_SumatoriasyProductorias.pdf"), mat("MATEMATICA GENERAL","Practica_Matrices y determinantes.pdf"), mat("MATEMATICA GENERAL","Trabajo Practico_Vectores y NúmerosComplejos.pdf")]},
  { id:184, nombre:"Algoritmos y Estructura de Datos", anio:"1° Año", cuatrimestre:"Primer Cuatrimestre", correlativas:[], aprobada:[], materiales:[mat("ALGORITMOS Y ESTRUCTURA DE DATOS","Algoritmos y estructuras de datos en Python.pdf"), mat("ALGORITMOS Y ESTRUCTURA DE DATOS","AyED-Clase04-U02-Funciones.pdf"), mat("ALGORITMOS Y ESTRUCTURA DE DATOS","AyED-Clase05-U02- IF MENU  20_04_2025-1.pdf"), mat("ALGORITMOS Y ESTRUCTURA DE DATOS","AyED-Clase8-U03-Recursion.pdf"), mat("ALGORITMOS Y ESTRUCTURA DE DATOS","Clase11-Archivos.pdf"), mat("ALGORITMOS Y ESTRUCTURA DE DATOS","Parcial 1  2025.pdf")]},
  { id:270, nombre:"Organización de Computadoras", anio:"1° Año", cuatrimestre:"Segundo Cuatrimestre", correlativas:[], aprobada:[], materiales:[mat("ORGANIZACION DE COMPUTADORAS","Conceptos de lenguajes de Bajo Nivel.pdf"), mat("ORGANIZACION DE COMPUTADORAS","Organización de una Computadora.pdf")]},
  { id:177, nombre:"Álgebra", anio:"1° Año", cuatrimestre:"Segundo Cuatrimestre", correlativas:["Matemática General"], aprobada:[], materiales:[]},
  { id:271, nombre:"Estructura de Datos", anio:"1° Año", cuatrimestre:"Segundo Cuatrimestre", correlativas:["Algoritmos y Estructura de Datos"], aprobada:[], materiales:[mat("ESTRUCTURA DE DATOS","Algoritmos y estructuras de datos en Python.pdf"), mat("ESTRUCTURA DE DATOS","Martin Fowler - UML Gota a Gota (2000, Addison Wesley Longman).pdf")]},
  { id:5, nombre:"Inglés", anio:"1° Año", cuatrimestre:"Segundo Cuatrimestre", correlativas:[], aprobada:[], materiales:[mat("INGLES","AFIJOS apuntes.pdf"), mat("INGLES","Estrategias de Lectura INGLÉS TÉCNICO I.pdf"), mat("INGLES","Estrategias léxicas (parte 1).pdf"), mat("INGLES","Estrategias léxicas (parte 2).pdf"), mat("INGLES","Pronombres Apunte.pdf"), mat("INGLES","Simulacro de parcial 2025.pdf")]},
  { id:189, nombre:"Programación Avanzada", anio:"2° Año", cuatrimestre:"Primer Cuatrimestre", correlativas:["Algoritmos y Estructura de Datos"], aprobada:[], materiales:[mat("PROGRAMACION AVANZADA","clase10_patrones_singleton_factory_repository.pdf"), mat("PROGRAMACION AVANZADA","guia_uml_unab_diagrama_clases.pdf"), mat("PROGRAMACION AVANZADA","UNAB-LCD-PA-Clase-N01.pdf"), mat("PROGRAMACION AVANZADA","UNAB-LCD-PA-Clase-N02.pdf"), mat("PROGRAMACION AVANZADA","UNAB-LCD-PA-Clase-N03.pdf"), mat("PROGRAMACION AVANZADA","UNAB-LCD-PA-Clase-N04.pdf"), mat("PROGRAMACION AVANZADA","UNAB-LCD-PA-Clase-N05.pdf")]},
  { id:180, nombre:"Probabilidad y Estadística", anio:"2° Año", cuatrimestre:"Primer Cuatrimestre", correlativas:["Álgebra"], aprobada:["Matemática General"], materiales:[mat("PROBABILIDAD Y ESTADISTICA","Probabilidad y Estadistica para Ingenieria y Ciencias.pdf")]},
  { id:273, nombre:"Desarrollo de Software", anio:"2° Año", cuatrimestre:"Primer Cuatrimestre", correlativas:["Algoritmos y Estructura de Datos"], aprobada:[], materiales:[mat("DESARROLLO DE SOFTWARE","Clase_IV_Fundamentos_Programacion_2026.pdf"), mat("DESARROLLO DE SOFTWARE","Clase_V_Paradigmas_Diseno_2026.pdf"), mat("DESARROLLO DE SOFTWARE","Clase_VI_Pruebas_Software_2026.pdf"), mat("DESARROLLO DE SOFTWARE","Clase_VII_Gestion_Proyectos_2026.pdf"), mat("DESARROLLO DE SOFTWARE","Ingenieria de Software-Somerville.pdf"), mat("DESARROLLO DE SOFTWARE","Ingenieria del Software. Un Enfoque Practico.pdf"), mat("DESARROLLO DE SOFTWARE","Patrones De Diseño - Libro Gamma helm johnson vlissides.pdf")]},
  { id:274, nombre:"Inglés Comunicacional", anio:"2° Año", cuatrimestre:"Primer Cuatrimestre", correlativas:[], aprobada:["Inglés"], materiales:[mat("INGLES COMUNICACIONAL","1_English_for_Information_Technology_Elementa.pdf")]},
  { id:186, nombre:"Gestión de Datos", anio:"2° Año", cuatrimestre:"Segundo Cuatrimestre", correlativas:["Estructura de Datos"], aprobada:["Algoritmos y Estructura de Datos"], materiales:[]},
  { id:183, nombre:"Inferencia Estadística y Reconocimiento de Patrones", anio:"2° Año", cuatrimestre:"Segundo Cuatrimestre", correlativas:["Estructura de Datos","Probabilidad y Estadística"], aprobada:["Algoritmos y Estructura de Datos"], materiales:[]},
  { id:188, nombre:"Visualización de la Información", anio:"2° Año", cuatrimestre:"Segundo Cuatrimestre", correlativas:["Estructura de Datos","Programación Avanzada"], aprobada:["Algoritmos y Estructura de Datos"], materiales:[]},
  { id:275, nombre:"Sistemas Operativos", anio:"3° Año", cuatrimestre:"Primer Cuatrimestre", correlativas:["Gestión de Datos"], aprobada:[], materiales:[]},
  { id:276, nombre:"Redes de Computadoras", anio:"3° Año", cuatrimestre:"Primer Cuatrimestre", correlativas:[], aprobada:[], materiales:[]},
  { id:277, nombre:"Conceptos y Paradigmas de Lenguajes de Programación", anio:"3° Año", cuatrimestre:"Primer Cuatrimestre", correlativas:[], aprobada:["Estructura de Datos","Programación Avanzada"], materiales:[]},
  { id:278, nombre:"Programación Concurrente", anio:"3° Año", cuatrimestre:"Segundo Cuatrimestre", correlativas:["Sistemas Operativos","Redes de Computadoras"], aprobada:["Programación Avanzada"], materiales:[]},
  { id:191, nombre:"Inteligencia Artificial", anio:"3° Año", cuatrimestre:"Segundo Cuatrimestre", correlativas:["Inferencia Estadística y Reconocimiento de Patrones"], aprobada:[], materiales:[]},
  { id:279, nombre:"Metodologías Ágiles para el Desarrollo de Software", anio:"3° Año", cuatrimestre:"Segundo Cuatrimestre", correlativas:["Programación Avanzada","Gestión de Datos"], aprobada:["Desarrollo de Software"], materiales:[]},
  { id:280, nombre:"Prácticas Profesionales Supervisadas (PPS)", anio:"3° Año", cuatrimestre:"Segundo Cuatrimestre", correlativas:[], aprobada:[], materiales:[]}
];

class GestorMaterias {
  constructor() { this.materias = []; }
  _mergeExtras() {
    try {
      const extras = JSON.parse(localStorage.getItem('unab_admin_uploads')) || [];
      this.materias.forEach(m => {
        extras.filter(e => e.mid === m.id).forEach(e => {
          const yaExiste = m.materiales.some(x => (typeof x === 'string' ? x : x.archivo) === e.archivo);
          if (!yaExiste) m.materiales.push({ carpeta: e.carpeta, archivo: e.archivo, _local: true });
        });
      });
    } catch {}
  }
  async cargar() {
    try {
      const r = await fetch(`${API}/api/materias`);
      if (!r.ok) throw new Error();
      const lista = await r.json();
      this.materias = lista.map(d => new Materia(d));
    } catch {
      this.materias = MATERIAS_FALLBACK.map(d => new Materia(d));
    }
    this._mergeExtras();
    return this.materias;
  }
  buscarPorId(id) { return this.materias.find(m => m.id === id) || null; }
}

class Materia {
  constructor(d) {
    this.id = d.id;
    this.nombre = d.nombre;
    this.anio = d.anio || "";
    this.cuatrimestre = d.cuatrimestre || "";
    this.correlativas = d.correlativas || [];
    this.aprobada = d.aprobada || [];
    this.archivo_pdf = d.archivo_pdf || null;
    this.materiales = d.materiales || [];
  }
  get tieneArchivos() { return !!(this.archivo_pdf || this.materiales.length); }
  rutaPdf() {
    if (!this.archivo_pdf) return null;
    return `${API}/static/materiales/${encodeURIComponent(this.archivo_pdf)}`;
  }
  rutaMaterial(entry) {
    if (typeof entry === "string") {
      return `${API}/static/materiales/${encodeURIComponent(entry)}`;
    }
    const carpeta = encodeURIComponent(normalizarCarpeta(entry.carpeta || ""));
    const archivo = encodeURIComponent(entry.archivo || "");
    return `${API}/static/materiales/${carpeta}/${archivo}`;
  }
  labelMaterial(entry) {
    const n = typeof entry === "string" ? entry : entry.archivo;
    return n.replace(/_/g, " ").replace(/\.pdf$/i, "").trim();
  }
}

// Normaliza nombres de carpeta eliminando tildes y caracteres especiales
// para que coincidan con las rutas reales en el servidor (PythonAnywhere)
function normalizarCarpeta(nombre) {
  return nombre
    .normalize("NFD")                     // descompone tildes: Ó → O + ́
    .replace(/[\u0300-\u036f]/g, "")      // elimina los diacríticos
    .toUpperCase()
    .replace(/[,.']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const gestor = new GestorMaterias();

function toast(msg, tipo = "ok") {
  const wrap = document.getElementById("toast-wrap");
  if (!wrap) return;
  const el = document.createElement("div");
  el.className = `toast-item t-${tipo}`;
  el.innerHTML = `<i class="bi bi-${tipo==='ok'?'check-circle':'exclamation-triangle'} me-2"></i>${msg}`;
  wrap.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("show")));
  setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 400); }, 3000);
}

let _authModal = null, _planModal = null;
const authModal = () => { if (!_authModal) _authModal = new bootstrap.Modal(document.getElementById("modal-auth")); return _authModal; };
const planModal = () => { if (!_planModal) _planModal = new bootstrap.Modal(document.getElementById("modal-plan")); return _planModal; };

class Auth {
  static UK = "unab_users"; static CK = "unab_cur"; static TK = "unab_token";
  static DEF = [
    { id:1, name:"Admin UNAB", email:"admin@unab.edu.ar", password:"Admin1234", role:"admin", carrera:null },
    { id:2, name:"Juan Pérez", email:"estudiante@unab.edu.ar", password:"Estudiante123", role:"estudiante", carrera:"Tec. Programación" }
  ];
  static _users() { try { return JSON.parse(localStorage.getItem(Auth.UK)) || Auth.DEF; } catch { return Auth.DEF; } }
  static _save(u) { try { localStorage.setItem(Auth.UK, JSON.stringify(u)); } catch {} }
  static getCur() { try { return JSON.parse(localStorage.getItem(Auth.CK)); } catch { return null; } }
  static getToken() { return localStorage.getItem(Auth.TK); }
  static getAll() { return Auth._users(); }
  static async login(email, pass) {
    try {
      const r = await fetch(`${API}/api/auth/login`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({email, password:pass}) });
      if (r.ok) { const d = await r.json(); localStorage.setItem(Auth.CK, JSON.stringify(d.user)); localStorage.setItem(Auth.TK, d.token); return d.user; }
    } catch {}
    const u = Auth._users().find(x => x.email.toLowerCase()===email.toLowerCase() && x.password===pass);
    if (u) localStorage.setItem(Auth.CK, JSON.stringify(u));
    return u || null;
  }
  static async register(name, email, pass, carrera) {
    try {
      const r = await fetch(`${API}/api/auth/register`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({name,email,password:pass,carrera}) });
      const d = await r.json();
      if (!r.ok) return { error: d.error || "Error al registrarse" };
      localStorage.setItem(Auth.CK, JSON.stringify(d.user)); localStorage.setItem(Auth.TK, d.token);
      return { user: d.user };
    } catch {}
    const users = Auth._users();
    if (users.find(x => x.email.toLowerCase()===email.toLowerCase())) return { error:"Ese email ya está registrado" };
    if (pass.length < 8) return { error:"La contraseña debe tener al menos 8 caracteres" };
    const u = { id:Date.now(), name, email, password:pass, role:"estudiante", carrera };
    users.push(u); Auth._save(users); localStorage.setItem(Auth.CK, JSON.stringify(u));
    return { user:u };
  }
  static logout() { localStorage.removeItem(Auth.CK); localStorage.removeItem(Auth.TK); }
  static setRole(id, role) { const users = Auth._users(); const u = users.find(x=>x.id===id); if(u){u.role=role; Auth._save(users);} }
}

function renderNav() {
  const u = Auth.getCur();
  const wrap = document.getElementById("nav-auth");
  const admItem = document.getElementById("nav-admin-item");
  const admSec = document.getElementById("sec-admin");
  const ulibItem = document.getElementById("nav-ulib-item");
  const ulibSec = document.getElementById("sec-ulib");
  if (!u) {
    wrap.innerHTML = `<button class="btn btn-outline-light btn-sm fw-bold" onclick="showAuth('login')">Iniciar sesión</button> <button class="btn btn-light btn-sm fw-bold" onclick="showAuth('register')">Registrarse</button>`;
    admItem.classList.add("d-none"); admSec.style.display = "none";
    if (ulibItem) ulibItem.classList.add("d-none");
    if (ulibSec) ulibSec.style.display = "none";
    const admFiles = document.getElementById("sec-admin-files");
    if (admFiles) admFiles.style.display = "none";
  } else {
    wrap.innerHTML = `<div class="nav-user-chip" onclick="showAuth('profile')"><i class="bi bi-person-circle"></i> <span class="user-name">${u.name.split(" ")[0]}</span> <span class="role-badge ${u.role}">${u.role}</span></div> <button class="btn btn-outline-light btn-sm" title="Cerrar sesión" onclick="doLogout()"><i class="bi bi-box-arrow-right"></i></button>`;
    if (u.role === "admin") {
      admItem.classList.remove("d-none"); admSec.style.display = ""; renderAdmin();
      const admFiles = document.getElementById("sec-admin-files");
      if (admFiles) { admFiles.style.display = ""; AdminFiles.render(); }
      if (ulibItem) ulibItem.classList.add("d-none");
      if (ulibSec) ulibSec.style.display = "none";
    } else {
      admItem.classList.add("d-none"); admSec.style.display = "none";
      const admFiles = document.getElementById("sec-admin-files");
      if (admFiles) admFiles.style.display = "none";
      if (ulibItem) ulibItem.classList.remove("d-none");
      if (ulibSec) { ulibSec.style.display = ""; UserLib.renderPanel(); }
    }
  }
}
function doLogout() { Auth.logout(); renderNav(); toast("Sesión cerrada"); }

function renderAdmin() {
  document.getElementById("admin-tbody").innerHTML = Auth.getAll().map(u => `<tr><td>${u.id}</td><td><strong>${u.name}</strong></td><td>${u.email}</td><td>${u.carrera||"—"}</td><td><span class="role-badge ${u.role}">${u.role}</span></td><td><select class="form-select form-select-sm" style="width:130px;" onchange="changeRole(${u.id},this.value)"><option value="estudiante" ${u.role==="estudiante"?"selected":""}>estudiante</option><option value="admin" ${u.role==="admin"?"selected":""}>admin</option></select></td></tr>`).join("");
}
function changeRole(id, role) { Auth.setRole(id,role); renderAdmin(); toast("Rol actualizado"); }

const AdminFiles = (() => {
  const LS_KEY = "unab_admin_uploads";
  const _blobUrls = {};
  function getExtra() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; } }
  function saveExtra(arr) { localStorage.setItem(LS_KEY, JSON.stringify(arr)); }
  function getMateriaOpts() { return gestor.materias.map(m => `<option value="${m.id}">${m.nombre} (${m.anio})</option>`).join(""); }
  function render() {
    const sec = document.getElementById("sec-admin-files");
    if (!sec) return;
    const extra = getExtra();
    const allMats = gestor.materias.map(m => {
      const extrasDeEsta = extra.filter(e => e.mid === m.id);
      const baseArchivos = new Set(m.materiales.map(e => e.archivo || e));
      return {
        id: m.id, nombre: m.nombre, anio: m.anio, cuatri: m.cuatrimestre,
        mats: [
          ...m.materiales.map(e => ({ carpeta: e.carpeta||"", archivo: e.archivo||e, source:"base" })),
          // Solo mostrar extras que NO estén ya en los datos del servidor
          ...extrasDeEsta.filter(e => !baseArchivos.has(e.archivo)).map(e => ({ carpeta: e.carpeta, archivo: e.archivo, source:"local" }))
        ]
      };
    });
    sec.innerHTML = `<div class="container"><h2 class="sec-title mt-4">Gestión de Archivos PDF</h2><p class="sec-sub">Subí materiales a cada materia o eliminá los existentes</p><div class="admin-upload-box mb-4"><div class="row g-3 align-items-end"><div class="col-md-4"><label class="form-label fw-bold">Materia</label><select class="form-select" id="adm-materia-sel"><option value="">— Seleccioná una materia —</option>${getMateriaOpts()}</select></div><div class="col-md-2"><label class="form-label fw-bold">Tipo</label><select class="form-select" id="adm-tipo-sel"><option value="material">Material / Apunte</option><option value="programa">Programa Oficial</option></select></div><div class="col-md-4"><label class="form-label fw-bold">Archivo PDF</label><input type="file" class="form-control" id="adm-file-inp" accept=".pdf"></div><div class="col-md-2"><button class="btn btn-primary w-100 fw-bold" onclick="AdminFiles.upload()"><i class="bi bi-cloud-upload me-1"></i>Subir</button></div></div><div class="msg-error mt-2" id="adm-err"></div><div class="msg-ok mt-2" id="adm-ok"></div></div><div id="adm-files-list">${allMats.map(m => renderMateriaRow(m, extra)).join("")}</div></div>`;
  }
  function renderMateriaRow(m, extra) {
    const totalMats = m.mats.length;
    const id = `adm-col-${m.id}`;
    return `<div class="adm-materia-block mb-2"><div class="adm-materia-header" onclick="this.nextElementSibling.classList.toggle('d-none')"><span class="fw-bold">${m.nombre}</span><span class="text-muted small ms-2">${m.anio} · ${m.cuatri}</span><span class="badge bg-primary ms-auto">${totalMats} archivo${totalMats!==1?"s":""}</span><i class="bi bi-chevron-down ms-2 small"></i></div><div class="adm-materia-body d-none" id="${id}">${m.mats.length === 0 ? '<p class="text-muted small mb-0">Sin archivos cargados.</p>' : m.mats.map(f => `<div class="adm-file-row"><i class="bi bi-file-earmark-pdf-fill text-danger me-2"></i><span class="adm-file-name">${f.archivo}</span><span class="adm-file-src badge ${f.source==="local"?"bg-success":"bg-secondary"} ms-2">${f.source==="local"?"Nuevo":"Base"}</span>${f.source==="local" ? `<button class="btn btn-outline-danger btn-sm ms-auto adm-del-btn" onclick="AdminFiles.deleteLocal(${m.id},'${encodeURIComponent(f.archivo)}','${encodeURIComponent(f.carpeta||"")}')"><i class="bi bi-trash3"></i></button>` : `<button class="btn btn-outline-danger btn-sm ms-auto adm-del-btn" onclick="AdminFiles.deleteBase(${m.id},'${encodeURIComponent(f.archivo)}','${encodeURIComponent(f.carpeta||"")}')"><i class="bi bi-trash3"></i></button>`}</div>`).join("")}</div></div>`;
  }
  return {
    render,
    getBlobUrl(archivo) { return _blobUrls[archivo] || null; },
    async upload() {
      const mid = document.getElementById("adm-materia-sel")?.value;
      const tipo = document.getElementById("adm-tipo-sel")?.value;
      const file = document.getElementById("adm-file-inp")?.files?.[0];
      const errEl = document.getElementById("adm-err");
      const okEl = document.getElementById("adm-ok");
      errEl.classList.remove("show"); okEl.classList.remove("show");
      if (file) _blobUrls[file.name] = URL.createObjectURL(file);
      if (!mid) { errEl.textContent="Seleccioná una materia."; errEl.classList.add("show"); return; }
      if (!file) { errEl.textContent="Seleccioná un archivo PDF."; errEl.classList.add("show"); return; }
      if (!file.name.toLowerCase().endsWith(".pdf")) { errEl.textContent="Solo se permiten archivos PDF."; errEl.classList.add("show"); return; }
      const tok = Auth.getToken();
      let usedBackend = false;
      if (tok) {
        try {
          const fd = new FormData();
          fd.append("materia_id", mid);
          fd.append("tipo", tipo);
          fd.append("file", file);
          const r = await fetch(`${API}/api/admin/upload`, { method:"POST", headers:{"Authorization":`Bearer ${tok}`}, body: fd });
          if (r.ok) {
            const d = await r.json();
            usedBackend = true;
            // Limpiar del localStorage para evitar duplicados al recargar
            const extra = getExtra().filter(e => !(e.mid === Number(mid) && e.archivo === file.name));
            saveExtra(extra);
            await gestor.cargar();
            Bib.init();
            okEl.textContent = `✓ ${d.message}: ${d.archivo}`;
            okEl.classList.add("show");
            toast("Archivo subido al servidor ✓");
          }
        } catch (e) { console.error(e); }
      }
      if (!usedBackend) {
        const materia = gestor.buscarPorId(Number(mid));
        const carpeta = materia ? normalizarCarpeta(materia.nombre) : "GENERAL";
        const extra = getExtra();
        const yaExiste = extra.some(e => e.mid===Number(mid) && e.archivo===file.name);
        if (!yaExiste) {
          extra.push({ mid:Number(mid), carpeta, archivo:file.name, tipo, subidoPor: Auth.getCur()?.name||"admin", fecha: new Date().toISOString().split("T")[0] });
          saveExtra(extra);
        }
        okEl.textContent = `✓ "${file.name}" registrado localmente (sin servidor activo).`;
        okEl.classList.add("show");
        toast("Archivo registrado localmente");
        gestor._mergeExtras();
        Bib.init();
      }
      document.getElementById("adm-file-inp").value = "";
      render();
    },
    deleteLocal(mid, archivoEnc, carpetaEnc) {
      const archivo = decodeURIComponent(archivoEnc);
      if (!confirm(`¿Eliminar "${archivo}"?`)) return;
      const extra = getExtra().filter(e => !(e.mid===mid && e.archivo===archivo));
      saveExtra(extra);
      UserLib.removeFromAllUsers(mid, archivo);
      const matObj = gestor.buscarPorId(mid);
      if (matObj) matObj.materiales = matObj.materiales.filter(x => (typeof x === 'string' ? x : x.archivo) !== archivo);
      Bib.init();
      toast("Material eliminado");
      render();
    },
    async deleteBase(mid, archivoEnc, carpetaEnc) {
      const archivo = decodeURIComponent(archivoEnc);
      const carpeta = decodeURIComponent(carpetaEnc);
      if (!confirm(`¿Eliminar "${archivo}" de la base? Esta acción no puede deshacerse.`)) return;
      const tok = Auth.getToken();
      if (tok) {
        try {
          const r = await fetch(`${API}/api/admin/materiales/${mid}`, { method:"DELETE", headers:{"Content-Type":"application/json","Authorization":`Bearer ${tok}`}, body: JSON.stringify({ carpeta, archivo }) });
          if (r.ok) {
            await gestor.cargar();
            UserLib.removeFromAllUsers(mid, archivo);
            toast("Material eliminado del servidor");
            render();
            return;
          }
        } catch {}
      }
      toast("Sin servidor activo — el archivo base no puede eliminarse localmente.", "err");
    }
  };
})();

const UserLib = (() => {
  function key(uid) { return `unab_ulib_${uid}`; }
  function load(uid) { try { return JSON.parse(localStorage.getItem(key(uid))) || { favMats:[], favPdfs:[], histMats:[], histPdfs:[] }; } catch { return { favMats:[], favPdfs:[], histMats:[], histPdfs:[] }; } }
  function save(uid, data) { localStorage.setItem(key(uid), JSON.stringify(data)); }
  function getUid() { return Auth.getCur()?.id; }
  function trackMat(mid, nombre) {
    const uid = getUid(); if (!uid) return;
    const d = load(uid);
    d.histMats = d.histMats.filter(x => x.mid !== mid);
    d.histMats.unshift({ mid, nombre, ts: Date.now() });
    if (d.histMats.length > 30) d.histMats = d.histMats.slice(0, 30);
    save(uid, d);
  }
  function trackPdf(mid, nombreMat, archivo, ruta) {
    const uid = getUid(); if (!uid) return;
    const d = load(uid);
    const pid = `${mid}::${archivo}`;
    d.histPdfs = d.histPdfs.filter(x => x.pid !== pid);
    d.histPdfs.unshift({ pid, mid, nombreMat, archivo, ruta, ts: Date.now() });
    if (d.histPdfs.length > 50) d.histPdfs = d.histPdfs.slice(0, 50);
    save(uid, d);
  }
  function toggleFavMat(mid, nombre) {
    const uid = getUid(); if (!uid) return false;
    const d = load(uid);
    const idx = d.favMats.findIndex(x => x.mid === mid);
    if (idx >= 0) { d.favMats.splice(idx, 1); save(uid, d); return false; }
    else { d.favMats.unshift({ mid, nombre, ts: Date.now() }); save(uid, d); return true; }
  }
  function toggleFavPdf(mid, nombreMat, archivo, ruta) {
    const uid = getUid(); if (!uid) return false;
    const d = load(uid);
    const pid = `${mid}::${archivo}`;
    const idx = d.favPdfs.findIndex(x => x.pid === pid);
    if (idx >= 0) { d.favPdfs.splice(idx, 1); save(uid, d); return false; }
    else { d.favPdfs.unshift({ pid, mid, nombreMat, archivo, ruta, ts: Date.now() }); save(uid, d); return true; }
  }
  function isFavMat(mid) { const uid=getUid(); if(!uid)return false; return load(uid).favMats.some(x=>x.mid===mid); }
  function isFavPdf(mid, archivo) { const uid=getUid(); if(!uid)return false; const pid=`${mid}::${archivo}`; return load(uid).favPdfs.some(x=>x.pid===pid); }
  function removeFromAllUsers(mid, archivo) {
    for (let i=0; i<localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("unab_ulib_")) {
        try {
          const d = JSON.parse(localStorage.getItem(k));
          const pid = `${mid}::${archivo}`;
          d.histPdfs = (d.histPdfs||[]).filter(x=>x.pid!==pid);
          d.favPdfs = (d.favPdfs||[]).filter(x=>x.pid!==pid);
          localStorage.setItem(k, JSON.stringify(d));
        } catch {}
      }
    }
  }
  function renderPanel() {
    const uid = getUid(); const u = Auth.getCur();
    if (!uid || !u) return;
    const d = load(uid);
    const fmHtml = d.favMats.length ? d.favMats.map(x=>`<div class="ulib-item" onclick="abrirMateriaSafe(${x.mid})"><span class="ulib-icon">📌</span><div class="ulib-info"><div class="ulib-name">${x.nombre}</div><div class="ulib-sub">Materia favorita</div></div><button class="ulib-fav-btn active" title="Quitar favorito" onclick="event.stopPropagation();UserLib.toggleFavMatUI(${x.mid},'${x.nombre.replace(/'/g,"\\'")}')"><i class="bi bi-bookmark-fill"></i></button></div>`).join("") : '<p class="text-muted small">Todavía no marcaste materias como favoritas.</p>';
    const fpHtml = d.favPdfs.length ? d.favPdfs.map(x=>`<div class="ulib-item"><span class="ulib-icon">⭐</span><div class="ulib-info"><div class="ulib-name">${x.archivo.replace(/\.pdf$/i,"").replace(/_/g," ")}</div><div class="ulib-sub">${x.nombreMat}</div></div><div class="d-flex gap-1 ms-auto"><a href="${x.ruta}" target="_blank" class="btn btn-sm btn-outline-primary py-0 px-2" onclick="UserLib.trackPdfUI(${x.mid},'${x.nombreMat.replace(/'/g,"\\'")}','${x.archivo.replace(/'/g,"\\'")}','${x.ruta}')"><i class="bi bi-eye"></i></a><button class="ulib-fav-btn active" title="Quitar favorito" onclick="UserLib.toggleFavPdfUI(${x.mid},'${x.nombreMat.replace(/'/g,"\\'")}','${x.archivo.replace(/'/g,"\\'")}','${x.ruta}')"><i class="bi bi-star-fill"></i></button></div></div>`).join("") : '<p class="text-muted small">Todavía no marcaste PDFs como favoritos.</p>';
    const hmHtml = d.histMats.length ? d.histMats.slice(0,10).map(x=>`<div class="ulib-item" onclick="abrirMateriaSafe(${x.mid})"><span class="ulib-icon">📖</span><div class="ulib-info"><div class="ulib-name">${x.nombre}</div><div class="ulib-sub">${new Date(x.ts).toLocaleDateString("es-AR")}</div></div></div>`).join("") : '<p class="text-muted small">Todavía no abriste ninguna materia.</p>';
    const hpHtml = d.histPdfs.length ? d.histPdfs.slice(0,10).map(x=>`<div class="ulib-item"><span class="ulib-icon">📄</span><div class="ulib-info"><div class="ulib-name">${x.archivo.replace(/\.pdf$/i,"").replace(/_/g," ")}</div><div class="ulib-sub">${x.nombreMat} · ${new Date(x.ts).toLocaleDateString("es-AR")}</div></div><a href="${x.ruta}" target="_blank" class="btn btn-sm btn-outline-primary py-0 px-2 ms-auto" onclick="UserLib.trackPdfUI(${x.mid},'${x.nombreMat.replace(/'/g,"\\'")}','${x.archivo.replace(/'/g,"\\'")}','${x.ruta}')"><i class="bi bi-eye"></i></a></div>`).join("") : '<p class="text-muted small">Todavía no abriste ningún PDF.</p>';
    document.getElementById("ulib-body").innerHTML = `<div class="row g-4"><div class="col-md-6"><div class="ulib-card"><div class="ulib-card-title"><i class="bi bi-bookmark-fill text-warning me-2"></i>Materias favoritas</div>${fmHtml}</div></div><div class="col-md-6"><div class="ulib-card"><div class="ulib-card-title"><i class="bi bi-star-fill text-warning me-2"></i>PDFs favoritos</div>${fpHtml}</div></div><div class="col-md-6"><div class="ulib-card"><div class="ulib-card-title"><i class="bi bi-clock-history text-primary me-2"></i>Materias vistas</div>${hmHtml}</div></div><div class="col-md-6"><div class="ulib-card"><div class="ulib-card-title"><i class="bi bi-file-earmark-text text-primary me-2"></i>PDFs vistos</div>${hpHtml}</div></div></div>`;
  }
  return {
    trackMat, trackPdf, isFavMat, isFavPdf, removeFromAllUsers, renderPanel,
    toggleFavMatUI(mid, nombre) { const added = toggleFavMat(mid, nombre); toast(added ? "Materia guardada en favoritos ⭐" : "Materia removida de favoritos"); refreshFavBtns(); if (document.getElementById("ulib-body")) renderPanel(); },
    toggleFavPdfUI(mid, nombreMat, archivo, ruta) { const added = toggleFavPdf(mid, nombreMat, archivo, ruta); toast(added ? "PDF guardado en favoritos ⭐" : "PDF removido de favoritos"); if (document.getElementById("ulib-body")) renderPanel(); },
    trackPdfUI(mid, nombreMat, archivo, ruta) { trackPdf(mid, nombreMat, archivo, ruta); }
  };
})();
function abrirMateriaSafe(cod) { abrirMateria(cod, 14); }
function refreshFavBtns() {
  document.querySelectorAll(".fav-mat-btn").forEach(btn => {
    const mid = Number(btn.dataset.mid);
    btn.classList.toggle("active", UserLib.isFavMat(mid));
    btn.innerHTML = UserLib.isFavMat(mid) ? '<i class="bi bi-bookmark-fill"></i> Favorita' : '<i class="bi bi-bookmark"></i> Favorita';
  });
}

function showAuth(mode) {
  const title = document.getElementById("auth-title");
  const body = document.getElementById("auth-body");
  const opts = CARRERAS.map(c=>`<option value="${c.nombre}">${c.nombre}</option>`).join("");
  if (mode==="login") {
    title.textContent = "Iniciar sesión";
    body.innerHTML = `<div class="msg-error" id="ae"></div><div class="mb-3"><label class="form-label">Email</label><input type="email" class="form-control" id="a-em" placeholder="tu@email.com"/></div><div class="mb-3"><label class="form-label">Contraseña</label><input type="password" class="form-control" id="a-pw" placeholder="••••••••" onkeydown="if(event.key==='Enter')doLogin()"/></div><button class="btn-primary-full mb-3" onclick="doLogin()">Entrar</button><div class="text-center d-flex justify-content-center gap-3"><span class="auth-link" onclick="showAuth('register')">Registrarse</span><span class="text-muted">·</span><span class="auth-link" onclick="showAuth('forgot')">Olvidé mi contraseña</span></div><div class="mt-3 p-2 rounded bg-light" style="font-size:.76rem;color:var(--gray);"><i class="bi bi-info-circle me-1"></i><b>Demo:</b> admin@unab.edu.ar / Admin1234 &nbsp;|&nbsp; estudiante@unab.edu.ar / Estudiante123</div>`;
  } else if (mode==="register") {
    title.textContent = "Crear cuenta";
    body.innerHTML = `<div class="msg-error" id="ae"></div><div class="mb-3"><label class="form-label">Nombre completo</label><input type="text" class="form-control" id="a-nm" placeholder="Tu nombre"/></div><div class="mb-3"><label class="form-label">Email</label><input type="email" class="form-control" id="a-em" placeholder="tu@email.com"/></div><div class="mb-3"><label class="form-label">Contraseña <small class="text-muted">(mín. 8 caracteres)</small></label><input type="password" class="form-control" id="a-pw" placeholder="••••••••"/></div><div class="mb-3"><label class="form-label">Carrera</label><select class="form-select" id="a-ca"><option value="">Seleccioná tu carrera</option>${opts}</select></div><button class="btn-primary-full mb-3" onclick="doRegister()">Registrarse</button><div class="text-center"><span class="auth-link" onclick="showAuth('login')">¿Ya tenés cuenta? Iniciá sesión</span></div>`;
  } else if (mode==="forgot") {
    title.textContent = "Recuperar contraseña";
    body.innerHTML = `<div class="msg-error" id="ae"></div><div class="msg-ok" id="ao"></div><p class="text-muted small mb-3">Ingresá tu email y te enviaremos las instrucciones.</p><div class="mb-3"><label class="form-label">Email</label><input type="email" class="form-control" id="a-em" placeholder="tu@email.com"/></div><button class="btn-primary-full mb-3" onclick="doForgot()">Enviar instrucciones</button><div class="text-center"><span class="auth-link" onclick="showAuth('login')">Volver al inicio de sesión</span></div>`;
  } else if (mode==="profile") {
    const u = Auth.getCur();
    title.textContent = "Mi perfil";
    body.innerHTML = `<div class="d-flex align-items-center gap-3 mb-4"><div style="width:50px;height:50px;border-radius:50%;background:var(--light);display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:var(--blue);"><i class="bi bi-person-fill"></i></div><div><div class="fw-bold">${u.name}</div><div class="text-muted small">${u.email}</div><span class="role-badge ${u.role} mt-1 d-inline-block">${u.role}</span></div></div>${u.carrera?`<p class="text-muted small mb-3"><i class="bi bi-mortarboard me-1"></i>${u.carrera}</p>`:""}<button class="btn-primary-full" onclick="doLogout();authModal().hide()"><i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión</button>`;
  }
  authModal().show();
}
function errAuth(msg) { const el=document.getElementById("ae"); if(el){el.textContent=msg;el.classList.add("show");} }
async function doLogin() {
  const email=document.getElementById("a-em")?.value?.trim();
  const pass=document.getElementById("a-pw")?.value;
  document.getElementById("ae")?.classList.remove("show");
  const u = await Auth.login(email,pass);
  if(!u){errAuth("Email o contraseña incorrectos");return;}
  authModal().hide(); renderNav(); toast("¡Bienvenido/a, "+u.name.split(" ")[0]+"!");
}
async function doRegister() {
  const name=document.getElementById("a-nm")?.value?.trim();
  const email=document.getElementById("a-em")?.value?.trim();
  const pass=document.getElementById("a-pw")?.value;
  const carr=document.getElementById("a-ca")?.value;
  document.getElementById("ae")?.classList.remove("show");
  if(!name||!email||!pass){errAuth("Completá todos los campos");return;}
  const res=await Auth.register(name,email,pass,carr);
  if(res.error){errAuth(res.error);return;}
  authModal().hide(); renderNav(); toast("¡Cuenta creada! Bienvenido/a ");
}
function doForgot() {
  const ok=document.getElementById("ao");
  document.getElementById("ae")?.classList.remove("show");
  if(ok){ok.textContent="Si el email existe, recibirás las instrucciones para restablecer tu contraseña.";ok.classList.add("show");}
}

function buildCarreras() {
  document.getElementById("dropdown-carreras").innerHTML = CARRERAS.map(c => `<li><a class="dropdown-item" href="#" onclick="abrirPlan(${c.id});return false;">${c.nombre}</a></li>`).join("");
  document.getElementById("grid-carreras").innerHTML = CARRERAS.map(c => `<div class="col-sm-6 col-lg-4"><div class="carrera-card" onclick="abrirPlan(${c.id})"><div class="card-body"><div class="mb-2"><span class="${c.badgeClass} tipo-badge">${c.tipoLabel}</span></div><div class="card-title">${c.nombre}</div><div class="d-flex justify-content-between align-items-center mt-3"><small class="text-muted"><i class="bi bi-list-ul me-1"></i>Plan por cuatrimestre</small><button class="btn-ver-plan" onclick="event.stopPropagation();abrirPlan(${c.id})">Ver →</button></div></div></div></div>`).join("");
}

function abrirPlan(cid) {
  const c = CARRERAS.find(x => x.id === cid);
  if (!c) return;
  document.getElementById("plan-nombre").textContent = c.nombre;
  const badge = document.getElementById("plan-badge");
  badge.textContent = c.tipoLabel;
  badge.className = `${c.badgeClass} tipo-badge me-2`;
  const pdfBtn = document.getElementById("plan-pdf-btn");
  if (pdfBtn) { pdfBtn.href = c.pdfUrl; pdfBtn.style.display = c.pdfUrl ? "" : "none"; }
  let html = "";
  c.anios.forEach(anio => {
    html += `<div class="year-block"><div class="year-title"><i class="bi bi-calendar3-week"></i>${anio.label}</div><div class="cuatri-cols">`;
    anio.cuatris.forEach(q => {
      html += `<div class="cuatri-block${q.anual?' anual':''}"><div class="cuatri-label"><i class="bi bi-calendar2"></i>${q.label}</div>`;
      q.mats.forEach(m => {
        const matObj = c.id === 14 ? gestor.buscarPorId(m.cod) : null;
        const tieneArchivos = matObj ? matObj.tieneArchivos : false;
        html += `<div class="mat-row" onclick="abrirMateria(${m.cod},${cid})"><span class="mat-dot"></span><span class="mat-name">${m.nombre}</span><span class="mat-code-pill">#${m.cod}</span>${tieneArchivos ? '<span class="mat-apunte"><i class="bi bi-folder2-open"></i>Archivos</span>' : ""}</div>`;
      });
      html += `</div>`;
    });
    html += `</div></div>`;
  });
  document.getElementById("plan-body").innerHTML = html;
  planModal().show();
}

function abrirMateria(cod, cid) {
  const c = CARRERAS.find(x => x.id === cid);
  let mDef = null;
  if (c) {
    for (const anio of c.anios) {
      for (const q of anio.cuatris) {
        mDef = q.mats.find(m => m.cod === cod);
        if (mDef) break;
      }
      if (mDef) break;
    }
  }
  const matObj = cid === 14 ? gestor.buscarPorId(cod) : null;
  const nombre = mDef?.nombre || matObj?.nombre || `Materia #${cod}`;
  const corr = mDef?.corr || matObj?.correlativas || [];
  const apro = mDef?.apro || matObj?.aprobada || [];
  document.getElementById("m-code").textContent = `Código: ${String(cod).padStart(5,'0')}`;
  document.getElementById("m-nombre").textContent = nombre;
  document.getElementById("m-meta").textContent = c ? c.nombre : "";
  if (Auth.getCur()) UserLib.trackMat(cod, nombre);
  let html = "";
  if (corr.length) html += `<div class="sec-label"><i class="bi bi-link-45deg"></i>Correlativas para cursar</div><div class="mb-3">${corr.map(x => `<span class="corr-chip"><i class="bi bi-arrow-right-circle"></i>${x}</span>`).join("")}</div>`;
  if (apro.length) html += `<div class="sec-label"><i class="bi bi-check-circle"></i>Aprobadas para poder cursar</div><div class="mb-3">${apro.map(x => `<span class="apro-chip"><i class="bi bi-check2"></i>${x}</span>`).join("")}</div>`;
  if (matObj) {
    if (matObj.archivo_pdf) {
      const ruta = matObj.rutaPdf();
      html += `<div class="sec-label"><i class="bi bi-file-earmark-pdf"></i>Programa oficial</div><div class="file-item mb-3"><div class="file-item-name"><i class="bi bi-file-earmark-pdf-fill text-danger"></i>${matObj.archivo_pdf}</div><div class="d-flex gap-2"><a href="${ruta}" target="_blank" class="btn-file-outline"><i class="bi bi-eye"></i> Ver</a><a href="${ruta}" download class="btn-file"><i class="bi bi-download"></i> Bajar</a></div></div>`;
    }
    if (matObj.materiales.length) {
      html += `<div class="sec-label"><i class="bi bi-folder2-open"></i>Materiales de estudio (${matObj.materiales.length})</div>`;
      matObj.materiales.forEach(entry => {
        const ruta = matObj.rutaMaterial(entry);
        const label = matObj.labelMaterial(entry);
        const archivo = typeof entry === "string" ? entry : entry.archivo;
        const isLocal = !!(entry && entry._local);
        const esTP = /practica|tp|ejercicio/i.test(label);
        const isFav = UserLib.isFavPdf(cod, archivo);
        const curUser = Auth.getCur();
        const blobUrl = isLocal ? AdminFiles.getBlobUrl(archivo) : null;
        const viewHref = (isLocal && blobUrl) ? blobUrl : (isLocal ? "#" : ruta);
        const dlHref = (isLocal && blobUrl) ? blobUrl : (isLocal ? "#" : ruta);
        const localTag = isLocal ? '<span class="badge bg-success ms-1" style="font-size:.62rem;vertical-align:middle;">Nuevo</span>' : '';
        html += `<div class="file-item"><div class="file-item-name"><i class="bi ${esTP?'bi-file-earmark-check-fill':'bi-file-earmark-text-fill'}" style="color:${esTP?'#059669':'#7c3aed'};"></i>${label} ${localTag}</div><div class="d-flex gap-2 align-items-center flex-wrap"><a href="${viewHref}" target="_blank" class="btn-file-outline${isLocal&&!blobUrl?' disabled':''}" ${isLocal&&!blobUrl?'onclick="toast(\'Sin servidor activo: el archivo aún no es descargable\',\'err\');return false;"':''} onclick="UserLib.trackPdfUI(${cod},'${nombre.replace(/'/g,"\\'")}','${archivo.replace(/'/g,"\\'")}','${ruta}')"><i class="bi bi-eye"></i> Ver</a><a href="${dlHref}" download="${archivo}" class="btn-file${isLocal&&!blobUrl?' disabled':''}"><i class="bi bi-download"></i> Bajar</a>${curUser ? `<button class="btn-fav-pdf${isFav?' active':''}" title="${isFav?'Quitar de favoritos':'Agregar a favoritos'}" onclick="UserLib.toggleFavPdfUI(${cod},'${nombre.replace(/'/g,"'")}','${archivo.replace(/'/g,"'")}','${ruta}');this.classList.toggle('active');this.innerHTML=this.classList.contains('active')?'<i class=\'bi bi-star-fill\'></i>':'<i class=\'bi bi-star\'></i>';"><i class="bi bi-star${isFav?'-fill':''}"></i></button>` : ""}</div></div>`;
      });
    }
    if (!matObj.archivo_pdf && !matObj.materiales.length) html += `<div class="empty-state"><i class="bi bi-folder-x"></i><p>Todavía no hay materiales cargados para esta materia.</p></div>`;
  } else {
    if (!corr.length && !apro.length) html += `<div class="empty-state"><i class="bi bi-info-circle"></i><p>Sin correlativas registradas.</p></div>`;
  }
  document.getElementById("m-body").innerHTML = html;
  const curUser = Auth.getCur();
  const footerEl = document.getElementById("m-footer");
  if (curUser && footerEl) {
    const isFavM = UserLib.isFavMat(cod);
    footerEl.innerHTML = `<button class="btn btn-sm ${isFavM?'btn-warning':'btn-outline-warning'} fav-mat-btn me-auto fw-bold" data-mid="${cod}" onclick="UserLib.toggleFavMatUI(${cod},'${nombre.replace(/'/g,"\\'")}');this.classList.toggle('btn-warning');this.classList.toggle('btn-outline-warning');this.innerHTML=this.classList.contains('btn-warning')?'<i class=\\'bi bi-bookmark-fill\\'></i> Favorita':'<i class=\\'bi bi-bookmark\\'></i> Favorita';"><i class="bi bi-bookmark${isFavM?'-fill':''}"></i> Favorita</button><button class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cerrar</button>`;
  } else if (footerEl) {
    footerEl.innerHTML = `<button class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cerrar</button>`;
  }
  const pm = bootstrap.Modal.getInstance(document.getElementById("modal-plan"));
  if (pm) { pm.hide(); setTimeout(() => new bootstrap.Modal(document.getElementById("modal-materia")).show(), 250); }
  else { new bootstrap.Modal(document.getElementById("modal-materia")).show(); }
}

/* ══════════════════════════════════════════════════════
   MOTOR DE BÚSQUEDA INTELIGENTE
   - Normaliza texto: quita acentos, convierte a minúsculas
   - Busca por tokens: cada palabra de la query debe
     aparecer en algún campo (orden no importa)
   - Permite errores tipográficos leves (distancia ≤1)
   - Prioriza coincidencias exactas y de materia sobre archivos
════════════════════════════════════════════════════════ */
const Search = (() => {
  /** Quita tildes y pasa a minúsculas */
  function norm(s) {
    return String(s).toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s#]/g, " ")
      .trim();
  }

  /** Distancia de Levenshtein simplificada (solo para palabras cortas) */
  function levenshtein(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 99;
    const m = a.length, n = b.length;
    const dp = Array.from({length: m+1}, (_,i) => [i, ...Array(n).fill(0)]);
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    return dp[m][n];
  }

  /** ¿El token matchea contra alguna palabra del texto? */
  function tokenMatchesText(token, textWords) {
    // Coincidencia exacta parcial (substring)
    if (textWords.some(w => w.includes(token) || token.includes(w))) return true;
    // Tolerancia tipográfica para palabras largas (≥4 letras)
    if (token.length >= 4) {
      return textWords.some(w => w.length >= 3 && levenshtein(token, w) <= 1);
    }
    return false;
  }

  /**
   * Puntúa qué tan bien matchea la query contra un ítem.
   * Retorna un número mayor a 0 si hay match, 0 si no.
   */
  function score(item, tokens) {
    const tituloNorm  = norm(item.titulo);
    const materiaNorm = norm(item.materia);
    const idStr       = String(item.mid);
    const tituloWords  = tituloNorm.split(/\s+/);
    const materiaWords = materiaNorm.split(/\s+/);
    const allWords     = [...tituloWords, ...materiaWords];

    // Búsqueda por código (#184 o solo el número)
    const codeToken = tokens.find(t => /^#?\d+$/.test(t));
    if (codeToken) {
      const num = codeToken.replace("#", "");
      if (idStr === num) return 100;
      if (!tokens.filter(t => !/^#?\d+$/.test(t)).length) return 0;
    }

    // Cada token de la query debe matchear en algún campo
    const allMatch = tokens
      .filter(t => !/^#?\d+$/.test(t))
      .every(t => tokenMatchesText(t, allWords));

    if (!allMatch) return 0;

    // Calcular puntaje de relevancia
    let pts = 0;
    tokens.filter(t => !/^#?\d+$/.test(t)).forEach(t => {
      // Bonus por match en nombre de materia (más relevante)
      if (materiaWords.some(w => w === t))           pts += 10;
      else if (materiaWords.some(w => w.includes(t))) pts += 6;
      else if (tokenMatchesText(t, materiaWords))     pts += 3;
      // Match en título del archivo
      if (tituloWords.some(w => w === t))             pts += 5;
      else if (tituloWords.some(w => w.includes(t)))  pts += 3;
      else if (tokenMatchesText(t, tituloWords))       pts += 1;
    });

    // Bonus extra si la query completa aparece literalmente en algún campo
    const qFull = tokens.filter(t => !/^#?\d+$/.test(t)).join(" ");
    if (materiaNorm.includes(qFull)) pts += 20;
    if (tituloNorm.includes(qFull))  pts += 10;

    return pts;
  }

  /** Tokeniza la query */
  function tokenize(q) {
    return norm(q).split(/\s+/).filter(t => t.length > 0);
  }

  /** Filtra y ordena por relevancia */
  function query(items, rawQ) {
    const tokens = tokenize(rawQ);
    if (!tokens.length) return items;
    return items
      .map(r => ({ r, s: score(r, tokens) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map(x => x.r);
  }

  return { query, norm };
})();

const Bib = (() => {
  const CATS = ["Todos","Apunte","Práctica","Libro"];
  let cat = "Todos";
  function clasificar(nombre) {
    const n = nombre.toLowerCase();
    if (/practica|práctica|tp_|ejercicio|parcial|simulacro/.test(n)) return "Práctica";
    if (/apunte|teoria|teórico|resumen|clase/.test(n)) return "Apunte";
    return "Libro";
  }
  function iconoCat(c) { return { "Apunte":"📝", "Práctica":"", "Libro":"📚" }[c] || "📄"; }
  function getAll() {
    const items = [];
    gestor.materias.forEach(m => {
      if (m.archivo_pdf) items.push({ uid:`prog-${m.id}`, cat:"Apunte", icono:"", titulo:m.archivo_pdf.replace(/\.pdf$/i,""), materia:m.nombre, mid:m.id, ruta:m.rutaPdf() });
      m.materiales.forEach((entry,i) => {
        const label = m.labelMaterial(entry);
        const c = clasificar(label);
        items.push({ uid:`mat-${m.id}-${i}`, cat:c, icono:iconoCat(c), titulo:label, materia:m.nombre, mid:m.id, ruta:m.rutaMaterial(entry) });
      });
    });
    return items;
  }
  function filtered() { return cat==="Todos" ? getAll() : getAll().filter(r => r.cat===cat); }
  function render(items) {
    const grid = document.getElementById("grid-recursos");
    if (!items.length) { grid.innerHTML = '<div class="col-12"><div class="empty-state"><i class="bi bi-search"></i><p>No se encontraron recursos.</p></div></div>'; return; }
    grid.innerHTML = items.map(r => `<div class="col-sm-6 col-lg-4"><div class="recurso-card"><div class="recurso-head"><span class="recurso-icon">${r.icono}</span><div><div class="recurso-cat">${r.cat}</div><div class="recurso-code">#${r.mid}</div><div class="recurso-title">${r.titulo}</div></div></div><div class="recurso-materia"><i class="bi bi-book me-1"></i>${r.materia}</div><div class="recurso-footer"><a href="${r.ruta}" target="_blank" class="btn-apunte"><i class="bi bi-eye"></i> Ver</a><a href="${r.ruta}" download class="btn-apunte"><i class="bi bi-download"></i> Bajar</a></div></div></div>`).join("");
  }
  function buildCats() { document.getElementById("bib-cats").innerHTML = CATS.map(c => `<span class="cat-btn${c===cat?' active':''}" onclick="Bib.setCat('${c}')">${c}</span>`).join(""); }
  return {
    init() { buildCats(); render(filtered()); },
    setCat(c) { cat=c; buildCats(); render(filtered()); },
    _clasificar: clasificar,
    buscar() {
      document.getElementById("live-results").style.display="none";
      const q = document.getElementById("bib-input").value.trim();
      if (!q) { render(filtered()); return; }
      render(Search.query(getAll(), q));
    },
    live() {
      const q = document.getElementById("bib-input").value.trim();
      const wrap = document.getElementById("live-results");
      if (q.length < 2) { wrap.style.display="none"; return; }
      const res = Search.query(getAll(), q).slice(0, 7);
      wrap.innerHTML = res.length
        ? res.map(r => `<div class="live-item" onclick="Bib.pick('${r.uid}')"><span class="live-code">#${r.mid}</span><div><div class="live-name">${r.titulo}</div><div class="live-sub">${r.cat} · ${r.materia}</div></div></div>`).join("")
        : `<div class="no-live">Sin resultados para "${q}"</div>`;
      wrap.style.display = "block";
    },
    pick(uid) { document.getElementById("live-results").style.display="none"; document.getElementById("bib-input").value=""; const r=getAll().find(x=>x.uid===uid); if(r) render([r]); }
  };
})();

const HeroSearch = (() => {
  function getAll() {
    const items = [];
    gestor.materias.forEach(m => {
      if (m.archivo_pdf) items.push({ uid:`prog-${m.id}`, mid:m.id, titulo:m.archivo_pdf.replace(/\.pdf$/i,""), materia:m.nombre, cat:"Apunte" });
      m.materiales.forEach((entry,i) => {
        const label = m.labelMaterial(entry);
        items.push({ uid:`mat-${m.id}-${i}`, mid:m.id, titulo:label, materia:m.nombre, cat:Bib ? Bib._clasificar(label) : "Libro" });
      });
    });
    return items;
  }
  function scrollBib() { document.getElementById("biblioteca").scrollIntoView({ behavior:"smooth", block:"start" }); }
  return {
    live() {
      const q = document.getElementById("hero-input").value.trim();
      const wrap = document.getElementById("hero-live");
      if (q.length < 2) { wrap.style.display="none"; return; }
      const res = Search.query(getAll(), q).slice(0, 6);
      wrap.innerHTML = res.length
        ? res.map(r => `<div class="hero-live-item" onclick="HeroSearch.pick('${r.uid}')"><span class="hero-live-code">#${r.mid}</span><div><div class="hero-live-name">${r.titulo}</div><div class="hero-live-sub">${r.cat} · ${r.materia}</div></div></div>`).join("")
        : `<div style="padding:14px;text-align:center;color:#6c757d;font-size:.86rem;">Sin resultados para "${q}"</div>`;
      wrap.style.display = "block";
    },
    pick(uid) {
      document.getElementById("hero-live").style.display = "none";
      const all = getAll();
      const r = all.find(x => x.uid === uid);
      if (!r) return;
      document.getElementById("bib-input").value = r.titulo;
      scrollBib();
      setTimeout(() => Bib.buscar(), 400);
    },
    ir() {
      const q = document.getElementById("hero-input").value.trim();
      document.getElementById("hero-live").style.display = "none";
      if (!q) { scrollBib(); return; }
      document.getElementById("bib-input").value = q;
      scrollBib();
      setTimeout(() => Bib.buscar(), 400);
    }
  };
})();
document.addEventListener("click", e => {
  if (!e.target.closest(".hero-search-box")) document.getElementById("hero-live").style.display="none";
});

(async () => {
  await gestor.cargar();
  buildCarreras();
  Bib.init();
  renderNav();
})();
