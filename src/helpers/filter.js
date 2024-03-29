const createQuery = async (entity, filters) => {
  const table = entity.toLowerCase();
  let query = `SELECT * FROM ${table} WHERE`;
  console.log("filters", filters);

  const filterEntries = Object.entries(filters); //esto devuelve un array dentro de un array con las claves(key) y valores de los filtros
  console.log("filterEntries", filterEntries);

  const values = [];

  //Iterar sobre las claves y valores de los filtros
  for (const [key, value] of filterEntries) {
    console.log("key", key);
    console.log("value", value);

    if (key == "precio_min") {
      query += ` precio >= $${values.length + 1}`;
    } else if (key == "precio_max") {
      query += ` AND precio <= $${values.length + 1}`;
    } else if (key == "categoria") {
      query += ` AND ${key} = $${values.length + 1}`;
    } else if (key == "metal") {
      query += ` AND ${key} = $${values.length + 1}`;
    }

    values.push(`${value}`);
  }
  console.log("values", values);
  console.log("query final", query);

  return { query, values };
};

export default createQuery;
