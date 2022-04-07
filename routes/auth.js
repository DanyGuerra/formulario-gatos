const users = [
  {
    usuario: "Artemis",
    contrasena: "Carlos",
  },
  {
    usuario: "Atenea de Belcebú",
    contrasena: "Luz",
  },
];

module.exports.isAuthorized = function (req, res, next) {
  const correo = req.body.user;
  const contra = req.body.password;

  console.log(correo);
  console.log(contra);

  if (!correo || !contra) {
    return res.sendStatus(401);
  }

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].usuario === nameKey) {
        return myArray[i];
      }
    }
  }

  let user = search(correo, users);

  if (user.contrasena === contra) {
    return next();
  } else {
    res.sendStatus(401);
  }

  // User.findById(req.session.userId).exec(function (error, user) {
  //   if (error) {
  //     return next(error);
  //   } else {
  //     if (user === null) {
  //       var err = new Error("Not authorized! Go back!");
  //       err.status = 401;
  //       return next(err);
  //     } else {
  //       return next();
  //     }
  //   }
  // });
};
