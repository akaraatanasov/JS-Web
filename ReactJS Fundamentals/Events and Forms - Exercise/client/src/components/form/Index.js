import React, {Component} from 'react'
import PokemonField from './formFields/PokemonField'
import Input from './formFields/Input'

class Index extends Component {
    constructor() {
        super()

        this.state = {
            pokemonName: '',
            pokemonImg: '',
            pokemonInfo: '',
            data: { pokemonColection: [] }
        }

    }

    createPokemon(e) {
        e.preventDefault()
        let payload = {
            pokemonName: this.state.pokemonName,
            pokemonImg: this.state.pokemonImg,
            pokemonInfo: this.state.pokemonInfo
        }

        this.createPokemonToServer(payload)
    }

    componentDidMount() {
        fetch('http://localhost:5000/pokedex/pokedex')
            .then(data => {
                return data.json()
            })
            .then(data => {
                this.state.data.pokemonColection = data.pokemonColection
                //this.setState({ data: data.pokemonColection })
            })
    }

    createPokemonToServer(payload) {
        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
            return res.json()
        }).then(d => {
            
        })
    }

    render() {
        let validName = this.state.pokemonName !== ''
        let validImg = true //this.state.pokemonImg.startsWith('http')
        let validContent = this.state.pokemonInfo.length > 3 && this.state.pokemonInfo.length < 50
        
        return (
            <div>
                <form onSubmit={this.createPokemon.bind(this)}>
                <fieldset className='App'>
                    <Input
                        type='text'
                        data='pokemonName'
                        name='Pokemon Name'
                        func={e => {
                            this.setState({ pokemonName: e.target.value })
                        }}
                        valid={validName}
                    />

                    <Input
                        type='text'
                        data='pokemonImage'
                        name='Pokemon Image'
                        func={e => {
                            this.setState({ pokemonImage: e.target.value })
                        }}
                        valid={validImg}
                    />

                    <Input
                        type='text'
                        data='pokemonInfo'
                        name='Pokemon Info'
                        func={e => {
                            this.setState({ pokemonInfo: e.target.value })
                        }}
                        valid={validContent}
                    />

                    <input
                        style={({ "display": (validName && validImg && validContent) ? '' : 'none' })}
                        type='submit'
                        value='Create Pokemon'
                    />
                </fieldset>
                </form>
                <div style={({ display: 'inline-block' })}>
                        {this.state.data.pokemonColection.map((p, i) => {
                            return <PokemonField key={i} data={p}/>
                        })}
                </div>
            </div>
        )
    }
}

export default Index;