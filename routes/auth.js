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

  if (!correo || !contra) {
    res.status(401).json({ mensaje: "Usuario a contrasena incorrecta" });
  }

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].usuario === nameKey) {
        return myArray[i];
      }
    }
  }

  let user = search(correo, users);

  if (!user) {
    res.status(401).json({ mensaje: "Usuario a contrasena incorrecta" });
  }

  if (user.contrasena === contra) {
    return next();
  } else {
    res.status(401).json({ mensaje: "Usuario a contrasena incorrecta" });
  }
};
