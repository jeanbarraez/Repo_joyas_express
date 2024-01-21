import {
    getAllJoyasModel,
    //getJoyas,
    //getLimitjoyas,
    //joyasById,
    getModelorderAndLimitjoya,
    getModeljoyaswithFilter,
  
      
    } from "../models/joyasModel.js";
  import { findError } from "../utils/util.js";
  import {prepareHateoas} from "../helpers/hateoas.js"

  import { pagination } from "../helpers/paginatorJoyas.js";

  //HATEOAS

  export const getControllerjoyasWithHateoas = async (req, res) => {
    try {
   const joyas = await getAllJoyasModel();
      const joyasWithHateoas = await prepareHateoas ("joyas", joyas);
      res.status(200).json({ joyasWithHateoas });
    } catch (error) {
      console.log("error", error);
    }
  }

  // creando filtros dinamicos por parametros

  export const filterControllerjoyas = async (req, res) => {
    try {
      const {filters} = req.query; 
console.log("req.body", req.query);
      const joyas = await getModeljoyaswithFilter(filters) 
     // console.log("joyas", joyas);
     // const paginationData = pagination(joyas, items, page);
      res.status(200).json(joyas);
    } catch (error) {
      console.log("error", error);
    }
  };


  export  const getOrderAndLimitjoya = async (req, res) => {
    try {
      // Extrae los parámetros de orden, límite y página de la solicitud HTTP
      const { order_by, limit, page,item } = req.query;

      console.log("req.query", req.query);
      // Llama a la función orderAndLimitTravels con los parámetros extraídos
      const joyas = await getModelorderAndLimitjoya(order_by, limit, page);

      const joyasWithHateoas = await prepareHateoas ("joyas", joyas)
     
     // const paginationData = pagination(joyas, limit,  page);
      // Establece el estado de la respuesta en 200 (OK)
      res.status(200).json(joyasWithHateoas);
    } catch (error) {
      // Si ocurre un error, lo muestra en la consola y devuelve una respuesta con un código de error y un mensaje de error
      console.log("error", error);
      const errorFound = findError(error.code);
      return res
        .status(errorFound[0]?.status)
        .json({ error: errorFound[0]?.message });
    }
  }