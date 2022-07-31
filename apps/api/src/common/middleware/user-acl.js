const userAuth =
  (
    config = {
      whiteList: [],
      blackList: [],
      userAccessOthers: {
        set: false,
        param: 'id'
      }
    }
  ) =>
  (req, res, next) => {
    const role = req.user.role;
    whiteListDiff = whiteList
  };
