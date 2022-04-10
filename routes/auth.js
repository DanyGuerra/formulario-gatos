const users = [
  { usuario: "Artemis", contrasena: "Carlos" },
  { usuario: "Atenea de Belcebú", contrasena: "Luz" },
  { usuario: "Carlos 3", contrasena: "Felicia" },
  { usuario: "Carlos 4", contrasena: "Grizabella" },
  { usuario: "Leticia 5", contrasena: "Günter" },
  { usuario: "Eva", contrasena: "Lola" },
  { usuario: "Arturo", contrasena: "Maclovio" },
  { usuario: "Gabriel", contrasena: "Maria Luisa" },
  { usuario: "Ninfa", contrasena: "Merlina" },
  { usuario: "Karina", contrasena: "Micho" },
  { usuario: "Leticia 11", contrasena: "Moomin" },
  { usuario: "Alina", contrasena: "Nino" },
  { usuario: "Cecilia", contrasena: "Olaf" },
  { usuario: "Ninfa 14", contrasena: "Pericles" },
  { usuario: "Gabriel 15", contrasena: "Rigoberto" },
  { usuario: "Luz", contrasena: "Simone de Xibalba" },
  { usuario: "Alan Sosa", contrasena: "Sol" },
];




const isAuthorized = function (req, res, next) {
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



module.exports={
  isAuthorized
}