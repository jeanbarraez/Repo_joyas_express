export const prepareHateoas = async (entity, data) => {
  //const totalStock = 0;
  const totalJoyas = data.length;

  const results = data.map((x) => {
    return { name: x.nombre, href: `/${entity}/joya/${x.id}` };
  });

  const stockTotal = data.map((x) => x.stock).reduce((a, b) => a + b, 0);

  const HATEOAS = {
    totalJoyas,
    stockTotal,
    results,
  };

  return HATEOAS;
};
