const width = 20;
const height = 15;
var selectorClicked = false;
var images = [
    <img src="static/sprites/base.png" />,
    <img src="static/sprites/speed.png" />,
    <img src="static/sprites/slow.png" />,
    <img src="static/sprites/die.png" />,
    <img src="static/sprites/stop.png" />
];

class editorControl {
    constructor() {
        this.editorTable = [];
        this.selector = 0;
        for (var i = 0; i < height; i++) {
            var row = [];
            for (var j = 0; j < width; j++) {
                row.push(0);
            }
            this.editorTable.push(row);
        }
    }

    setPosition(x, y) {
        if(selectorClicked) {
            this.editorTable[x][y] =this.type;
        }
    }

    set type(j) {
        this.selector = j;
        selectorClicked = true;
    }

    get type() {
        return this.selector;
    }

}

var ed = new editorControl();

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imageSelector: 0};

        this.show = this.show.bind(this);
    }

    show() {
        this.props.onClicked(this.props.index);
        this.setState({imageSelector: ed.type});
    }

    render() {
        return (
            <div className="cell" onClick={this.show}>
            {images[this.state.imageSelector]}
            </div>
        );
    }
}

class CellBase extends React.Component {
    constructor(props) {
        super(props);
        

        this.show = this.show.bind(this);
    }

    show() {
        ed.type = this.props.type;   
    }

    render() {

        return (
            <div className="cell" onClick={this.show}>
                {this.props.img}
            </div>
        );
    }
}

class Row extends React.Component {
    constructor(props) {
        super(props);
        this.position = this.position.bind(this);
    }

    position(j) { 
        ed.setPosition(this.props.index, j);
    }

    render() {
        var row = [];
        for (var i = 0; i < width; i++) {
            row.push(<Cell index={i} onClicked={this.position} key={i * Math.random()}/>);
        }
        return (
            <div className="rowG">
            {row}
            </div>
        );
    }
}

class Table extends React.Component {
    render() {
        var table = [];
        for(var i = 0; i < height; i++) {
            table.push(<Row index={i} key={i * Math.random()}/>);
        }
        return (
            <div id="table">
            {table}
            </div>
        );
    }
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.resetSelection = this.resetSelection.bind(this);
        this.resetTable = this.resetTable.bind(this);
        this.show = this.show.bind(this);
    }

    resetSelection() {
        selectorClicked = false;
    }

    show() {
        console.log(ed.editorTable);
    }

    resetTable() {
        ed = new editorControl();
        this.forceUpdate();
    }
    render() {
        var cellBase = [];
        for (var i = 0; i < 5; i++) {
            cellBase.push(<CellBase type={i} img={images[i]} key={i * Math.random()} />);
        }
        return (
            <div id="menu" className="text-center">
                <button className="btn btn-default but">Guardar</button>
                <button className="btn btn-default but" onClick={this.show} >Show</button>
                <button className="btn btn-default but" onClick={this.resetTable} >Reiniciar</button>
                <button className="btn btn-default but" onClick={this.resetSelection} >Cancelar Seleccion</button>
                <button className="btn btn-default but">Salir</button>
                <div id="table-menu">
                    <div className="rowG-menu">
                        {cellBase}
                    </div>
                </div>  
            </div>
        );
    }
}

class Editor extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <Table />
                </div>
                <div className="col-md-3">
                    <br></br>
                    <Menu />
                </div>
            </div>
        );
    }
}
ReactDOM.render (
    <Editor />,
    document.getElementById('root')
);