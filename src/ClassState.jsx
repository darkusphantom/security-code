import React from 'react';

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      loading: true,
    };
  }

  componentWillMount(){
    if(this.state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");
        this.setState({ loading: false});
        console.log("Terminando la validacion");
      }, 3000)
    }
  }

  componentWillUnmount() {
    console.log("Componente desmontado");
  }

  componentDidMount() {
    console.log("Componente para desmontar");
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>

        <p>Por favor, escribe el código de seguridad</p>

        {this.state.error && (
          <p>Error: El codigo es incorrecto</p>
        )}

        {this.state.loading && (
          <p>Loading...</p>
        )}

        <input type="text" placeholder="Codigo de seguridad" />
        <button
          onClick={() => this.setState({ loading: false })}
        >Comprobar</button>
      </div>
    );
  }
};

export { ClassState };
