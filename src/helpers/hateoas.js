export const prepareHateoas = async (entity, data) => {
    //const totalStock = 0;
    const totalJoyas = data.length; 
     

     const results = data
       .map((v) => {
         return {
           nombre: v.metal,
           link:[{
           href: `http://localhost:5000/api/v1/${entity}/${v.id}`,
           }]
          
         };
        
       })
       .slice(0, totalJoyas);
     
 

     //const total = data.length;
     
     const HATEOAS = {
       totalJoyas,
       results,
     };
     return HATEOAS;
   };