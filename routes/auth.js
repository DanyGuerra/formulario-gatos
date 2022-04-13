const users = [
  { contrasena: "admin", usuario: "administradorSUB", tipo: "admin" },
  { contrasena: "Carlos", usuario: "Artemis" },
  { contrasena: "Atenea de Belcebú", usuario: "Luz" },
  { contrasena: "Carlos 3", usuario: "Felicia" },
  { contrasena: "Carlos 4", usuario: "Grizabella" },
  { contrasena: "Leticia 5", usuario: "Günter" },
  { contrasena: "Eva", usuario: "Lola" },
  { contrasena: "Arturo", usuario: "Maclovio" },
  { contrasena: "Gabriel", usuario: "Maria Luisa" },
  { contrasena: "Ninfa", usuario: "Merlina" },
  { contrasena: "Karina", usuario: "Micho" },
  { contrasena: "Leticia 11", usuario: "Moomin" },
  { contrasena: "Alina", usuario: "Nino" },
  { contrasena: "Cecilia", usuario: "Olaf" },
  { contrasena: "Ninfa 14", usuario: "Pericles" },
  { contrasena: "Gabriel 15", usuario: "Rigoberto" },
  { contrasena: "Luz", usuario: "Simone de Xibalba" },
  { contrasena: "Alan Sosa", usuario: "Sol" },
];

const isAuthorized = function (req, res, next) {
  const correo = req.body.user;
  const contra = req.body.password;

  if (!correo || !contra) {
    res.status(401).json({ mensaje: "Usuario o contraseña incorrecta" });
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
    res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
  }

  if (user.contrasena === contra) {
    return next();
  } else {
    res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
  }
};

const isAdmin = function (req, res, next) {
  const correo = req.body.user;
  const contra = req.body.password;

  if (!correo || !contra) {
    res.status(401).json({ mensaje: "Usuario o contraseña incorrecta" });
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
    res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
  }

  if (user.contrasena === contra && user.tipo === "admin") {
    return next();
  } else {
    res.status(401).json({ mensaje: "No tienes acceso" });
  }
};

module.exports = {
  isAuthorized,
  isAdmin,
};
