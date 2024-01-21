import pool from "../../db/ConectionDb.js";
import format from "pg-format";
import createQuery from "../helpers/filter.js"; 
 

export const getAllJoyasModel = async () => {
  const SQLquery = { text: "SELECT * FROM inventario" };
  const response = await pool.query(SQLquery);
  return response.rows;
};

 //creando filtros dinamicos por parametro

 export const getModeljoyaswithFilter = async (filters) => {
    
    //    console.log("prueba funcion",createQuery("inventario", filters))
       
        const {query, values} = await createQuery("inventario", filters);
       //const values = createQuery("inventario", filters);
        
       // console.log("resultado query de prueba",query);
       // console.log("resultado  prueba", values);
        const result = await pool.query(query, values)
       
        //console.log("result",result)
        return result.rows;
      };

      // comienza el uso de pg format

   export const getModelorderAndLimitjoya = async (
    order_by = "stock_ASC",
    limits = 3,
    page = 0
  ) => {
    // Desestructura el parámetro order_by en attribute y direction
    const [attribute, direction] = order_by.split("_");//el metodo split separa el atributo y la dirección(id y ASC)
    //el split devuelve un arreglo con el atributo y la dirección.
  
    // Calcula el desplazamiento en función de la página y los límites
    const offset = page * limits;
  
    // Formatea la consulta con los parámetros proporcionados
    const formattedQuery = format(
      "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
      attribute,
      direction,
      limits,
      offset
    );
    // Muestra la consulta formateada en la consola
    console.log("query: ", formattedQuery);
    // Realiza la consulta a la base de datos utilizando la consulta formateada
    const response = await pool.query(formattedQuery);
    // Muestra la respuesta en la consola
    console.log("response", response);
    // Devuelve las filas de la respuesta
    return response.rows;
  }