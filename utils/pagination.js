exports.paginate = ({page, pageSize}) => {
  const offset = page * pageSize;
  // console.log('pagsdgdsg');
  return (page && pageSize) ? {
      offset,
      limit: pageSize,
  } : {};
};
