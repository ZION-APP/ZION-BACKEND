module.exports = function (sequelize, Sequelize) {
  const Form = sequelize.define('form', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nombre_empresa: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ingreso_mensual: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    cargo_empresa: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ruc_empresa: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    direccion_empresa: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    identificacion: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    direccion_hogar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    nombre_conyuge: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    apellido_conyuge: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ingreso_mensual_conyuge: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },


    categoria: {
      type: Sequelize.TEXT,
      allowNull: true,
      
    },
    restringir_info: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_persona: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    nombres: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    nombre_1: {
      type: Sequelize.TEXT,
    },
    nombre_2: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    apellido_paterno: {
      type: Sequelize.TEXT,
    },
    apellido_materno: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_tipo_contribuyente: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    es_autoretenedor: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    cod_pais: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    nombre_correspondencia: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    nombre_usual: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_tipo: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_perfil_operativo: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_tipo_actividad_econ: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_perfil_financiero: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_segmento: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_subtipo_segmento: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_actividad: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    razon_social: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    observacion: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    fecha_nacimiento: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    cod_pais_nacimiento: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    secuencia_nacimiento: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    codigo_nacimiento: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    sexo: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    estado_civil: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    separacion_bien: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    num_cargas: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    tiene_capitulacion_bienes: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    tiene_disolucion_soc_conyugal: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    apellido_casada: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_profesion: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_tipo_empleo: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    lugar_trabajo: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    direccion_empresa_labora: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    telefono_empresa_labora: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_pais_labora: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    secuencia_labora: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    codigo_labora: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cargo: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_tipo_activ_econ_labora: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    fecha_ingreso_trabajo: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    sueldo_mensual: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    cod_moneda: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    ingresos_familiares: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    cod_moneda_ing_familiar: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    num_patronal_emp: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    capital_social_emp: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_moneda_capital: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    objeto_emp: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    escritura: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    fecha_constitucion_emp: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    fecha_registro: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    numero_empleados: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    numero_sucursales: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    fecha_nomina_accionistas: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    fecha_vencimiento_cia: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    registro_inscripcion: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_persona_notario: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    fecha_certif_oblig: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    ingresado_por: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    fecha_ingreso: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    modificado_por: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    fecha_modificacion: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    lista_negra: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    lista_negra_des: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    politicamente_expuesto: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_estado_persona: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    origen_fondos: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    modificable: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_tipo_forma_pago: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    num_cuenta_cliente: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_tipo_cuenta_cliente: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_entidad_cta_cliente: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_tipo_entidad_cta_cliente: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cod_moneda_fpago: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    observaciones: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    exonerado_imp: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    tipo_ingreso_patrimonio_partic: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    patrimonio_particular: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  });

  return Form;
};
