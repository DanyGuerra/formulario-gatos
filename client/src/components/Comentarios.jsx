const Comentarios = ({ setEnd }) => {
  return (
    <>
      <h2>¿Tienes algun comentario final?</h2>
      <textarea></textarea>
      <button onClick={setEnd(true)}> Guardar</button>
    </>
  );
};

export default Comentarios;
