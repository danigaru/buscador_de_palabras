import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MaterialTable from "@material-table/core";

function App() {
  const [works, setWorks] = useState([]);
  const [general, setGeneral] = useState({isLoading: false, isError: true, messageError: ""});
  const [newWork, setNewWork] = useState({title: "", description: ""});

  useEffect( () => {
    getData()
  }, [])

  // const getData = async () => {
  //   try {
  //     setGeneral({isLoading: true, isError: false, messageError: ""})
  //     const response = await fetch('https://my-json-server.typicode.com/danigaru/buscador_de_palabras/db')
  //     const data = await response.json();

  //     console.log("Data", data)

  //     if(data?.error) {
  //       return setGeneral({isLoading: false, isError: true, messageError: data.error})
  //     }
  //     setGeneral({isLoading: false, isError: false, messageError: ""})
  //     setWorks(data.palabras);
  //   } catch (error) {
  //     setGeneral({isLoading: false, isError: true, messageError: error.response})
  //   }
  // }

  const getData = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("works"));
      if(data) {
        console.log("if")
        setWorks(data);
      }
    } catch (error) {
      setGeneral({isLoading: false, isError: true, messageError: error.response})
    }
  }

  const {isLoading, isError, messageError } = general;

  if(isLoading){
    return (
      <h1>cargando datos....!</h1>
    )
  }

  // if(!isLoading && isError) {
  //     return (
  //     <div class="alert alert-danger" role="alert">
  //       {messageError}
  //     </div>
  //   )
  // }

  const saveData = () => {
    console.log(newWork)
    const newWorks = [...works, {
      "id": new Date().getTime(),
      "title": newWork.title,
      "label": newWork.title?.toUpperCase()?.trim(),
      "description": newWork.description
    }]
    localStorage.setItem("works", JSON.stringify(newWorks))
    getData();
  }


  return (
    <div className="">
        <div className="container mt-5">
          <Grid container spacing={2} >
              <Grid item xs={2}>
                <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal"> Nueva palabra </button>
              </Grid>
          </Grid>
          <div className="mt-3">
            <MaterialTable
              title="Buscador de palabras"
              columns={[
                { title: 'Title', field: 'title' },
                { title: 'Descripción', field: 'description', type: 'numeric' },
              ]}
              data={works}
              actions={[]}
            />
          </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Formulario para nueva palabra</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Título: *</label>
                  <input onChange={(event) => setNewWork({...newWork, title: event.target.value})} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Descripción: *</label>
                  <input onChange={(event) => setNewWork({...newWork, description: event.target.value})} type="text" className="form-control" id="exampleInputPassword1" />
                </div>
              </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={saveData} data-bs-dismiss="modal" >Guardar datos</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
