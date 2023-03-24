const getDataBySort = () => async (context) => {
  return await context.app.service('/task').find({
    query:{
      $sort: { dueDate : -1}
    },paginate:false
  });   
};

export default getDataBySort;
