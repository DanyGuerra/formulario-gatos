function App() {
  return (
    <>
      <div>
        <a href="http://localhost:5000/formulario">Formulario</a>
      </div>

      <form method="POST" action="/subir" enctype="multipart/form-data">
        <input type="file" name="file" id="input-video" accept="video/*" />
        <button type="submit" id="btn_subir">
          Subir
        </button>
      </form>
    </>
  );
}

export default App;
