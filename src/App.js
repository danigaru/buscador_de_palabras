import { useEffect, useState } from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Edit } from "@mui/icons-material";
import ResponseElement from "./principal/ResponseElement";

function App() {
  const [works, setWorks] = useState([]);
  const [general, setGeneral] = useState({isLoading: false, isError: true, messageError: ""});
  const [newWork, setNewWork] = useState({title: "", description: ""}),
  [responseData, setResponseData] = useState({ errorType: 'error', messageType: '', openResponse: true, });

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

    let newWorks = []
    const {title, description, id, label} = newWork;
    if(id) {
      newWorks = works.map((item) => item.id === id ? {...item, label: title?.toUpperCase()?.trim(), title: title, description: description} : item )
    } else {
      newWorks = [...works, {
        "id": new Date().getTime(),
        "title": title,
        "label": title?.toUpperCase()?.trim(),
        "description": description
      }]
    }
    localStorage.setItem("works", JSON.stringify(newWorks))
    setResponseData({errorType: "success", messageType: "Registro con éxito", openResponse: false})
    getData();
    setNewWork({title: "", description: ""});
  }

  const editItem = (rowData) => {
    console.log(rowData)
    const {title, description, id} = rowData;
    setNewWork({title, description, id})
  }

  const handClose = (_, reason) => {
    if (reason === 'clickaway') {return}
    setResponseData({errorType: "", messageType: "", openResponse: false})
  };

  const { errorType, messageType, openResponse} = responseData;

  return (
    <div className="">
      <ResponseElement type={errorType} content={messageType} open={openResponse} handClose={handClose}/>
        <div className="container mt-1">
          <div className="mt-1">
            <MaterialTable
              localization={{
                toolbar: {searchPlaceholder: "Buscar",searchTooltip: "Buscar "},
                pagination:{labelRowsSelect:"Registros",labelRowsPerPage:"Filas por pagina",
                            labelDisplayedRows: 'Registros {from} al {to} de {count}',
                            previousTooltip:'Pagina anterior', nextTooltip:'Página siguiente', lastTooltip:'Última página', firstTooltip:'Primera página'},
                body: {deleteTooltip: "Eliminar",emptyDataSourceMessage: "No existen registros"},
                header:{ actions: 'Opciones'}
              }}
              title="Buscador de palabras"
              columns={[
                { title: 'Titulo', field: 'title',  },
                { title: 'Descripción', field: 'description', },
                { title: 'Acción', field: 'accion', filtering: false,
                render: rowData=><div style={{minWidth: '100px'}}>
                    {
                        (<div>
                            <Tooltip title={"Editar registro"}>
                                <IconButton data-bs-toggle="modal" data-bs-target="#exampleModal" size={"medium"}  onClick={() => editItem(rowData)}><Edit/></IconButton>
                            </Tooltip>
                        </div>)
                    }
                    </div>
                },
              ]}
              data={works}
              options={{
                filtering: true,
                pageSize: 10,
                headerStyle: {
                  backgroundColor: '#01579b',
                  color: '#FFF',
                }
              }}
              components={{
                Toolbar: props => (
                  <div>
                     <MTableToolbar {...props} />
                    <div style={{padding: '0px 10px', marginBottom: '10px'}}>
                    <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setNewWork({title: "", description: ""})}> Nueva palabra </button>
                    </div>
                  </div>
                ),
              }}
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
                  <input value={newWork.title} onChange={(event) => setNewWork({...newWork, title: event.target.value})} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label  htmlFor="exampleInputPassword1" className="form-label">Descripción: *</label>
                  <input value={newWork.description} onChange={(event) => setNewWork({...newWork, description: event.target.value})} type="text" className="form-control" id="exampleInputPassword1" />
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
