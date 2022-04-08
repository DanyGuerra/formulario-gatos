const SubirVideo = () => {
  return (
    <form method="POST" action="/subir" enctype="multipart/form-data">
      <input type="file" name="file" id="input-video" accept="video/*" />
      <button type="submit" id="btn_subir">
        Subir
      </button>
    </form>
  );
};

export default SubirVideo;
