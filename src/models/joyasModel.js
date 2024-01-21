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
    
    
       
        const {query, values} = await createQuery("inventario", filters);
       
        
       
        const result = await pool.query(query, values)
       
        //console.log("result",result)
        return result.rows;
      };

      // comienza el uso de pg format

   export const getModelorderAndLimitjoya = async (
    order_by = "stock_ASC",
    limit = null,
    page = null,
  ) => {
    
    const [attribute, direction] = order_by.split("_");

    
    const offset = page * limit;
  
    
    
    const formattedQuery = format(
      `SELECT * FROM inventario ORDER BY %s %s LIMIT %L OFFSET %s`,
      attribute,
      direction,
      limit,
      offset
    );
   
    console.log("query: ", formattedQuery);
    
    const response = await pool.query(formattedQuery);
   
    console.log("response", response);
   
    return response.rows;
  }