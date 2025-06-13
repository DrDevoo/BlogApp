function NewPostBox({ onCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const content = formData.get("content");
    const author = localStorage.getItem("username");

    if (!title || !content) {
      alert("Kérjük, töltsd ki az összes mezőt.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Nem vagy bejelentkezve. Kérjük, jelentkezz be.");
      return;
    }

    fetch("http://localhost:5077/api/Posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, author }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hiba történt a poszt feltöltése során.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Sikeresen feltöltve:", data);
        onCancel();
      })
      .catch((error) => {
        console.error("Hiba a feltöltés során:", error);
        alert("Hiba történt a poszt feltöltése során. Kérjük, próbáld újra.");
      });
  }
  return (
    <section className="popup-box">
      <div className="box">
        <div>
          <button
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            onClick={onCancel}
          >
            MÉGSEM
          </button>
        </div>
        <article className="pa4 black-80">
          <form action="sign-up_submit" method="get" accept-charset="utf-8" onSubmit={handleSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="ph0 mh0 fw6 clip">Új blog bejegyzés</legend>
              <div className="mt3">
                <label className="db fw4 lh-copy f6" for="title">
                  A bejegyzés címe
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent w-100 measure"
                  type="text"
                  name="title"
                  id="title"
                />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f6" for="content">
                  A bejegyzés tartalma
                </label>
                <textarea
                  className="b pa2 input-reset ba bg-transparent"
                  name="content"
                  id="content"
                  rows="10"
                />
              </div>
            </fieldset>
            <div className="mt3">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                type="submit"
                value="Feltöltés"
              />
            </div>
          </form>
        </article>
      </div>
    </section>
  );
}

export default NewPostBox;
