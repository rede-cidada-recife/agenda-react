import React, {useState} from 'react';
import { BiSearch } from "react-icons/bi";
import ApiCep from '../../service/ApiCep';
import "./Contato.css";

const Contato = () => {
    const [name , setName] = useState('');
    const [phone , setPhone] = useState('');
    const [email , setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState({});
    const [hasEndereco, setHasEndereco] = useState(false);
    const [mensagem, setMensagem] = useState('');
   
    const handleNameChange =(e)=>{
        e.preventDefault();

        setName(e.target.value);
    }

    const handlePhoneChange =(e)=>{
        e.preventDefault();

        setPhone(e.target.value);
    }

    const handleEmailChange =(e)=>{
        e.preventDefault();

        setEmail(e.target.value);
    }

    const handleCepChange =(e)=>{
        e.preventDefault();
        setHasEndereco(false);
        setMensagem('');
        setEndereco({})
        setCep(e.target.value);
    }
   
    const handleGetCep = (e) => {
        e.preventDefault();
        if(cep && cep.length === 8){
            ApiCep.getCep(cep)
            .then((res) => {
                if(!res.data.erro){
                    setHasEndereco(true);
                    setMensagem('');
                    setEndereco({
                        rua: res.data.logradouro,
                        bairro: res.data.bairro,
                        cidade: res.data.localidade,
                        estado: res.data.uf
                    });
                } else{
                    setHasEndereco(false);
                    setEndereco({});
                    setMensagem('Cep não encontrado!');
                }
            })
            .catch(err => console.log(err));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name || !phone || !email){
            alert("Nome, Telefone e e-mail são obrigatórios.")
        } else{
            // enviar dados para o backend
        }

    }

   return (
    <div>
        <form >
            <div className='div-form'>
                <div>
                    <input type="text" value={name} placeholder="Informe seu nome" onChange={(e) => {handleNameChange(e)}}/>
                </div>
                <div>
                    <input type="text" value={phone} placeholder="Informe seu telefone" onChange={(e) => {handlePhoneChange(e)}} />
                </div>
            </div>
            <div className='div-form'>
                <div>
                    <input type="text" value={email} placeholder="Informe seu e-mail" onChange={(e) => {handleEmailChange(e)}} />
                </div>
                <div className='div-form-cep'>
                    <input type="text" id="iptCep" maxLength={8} placeholder="Informe o CEP" value={cep} onChange={(e) => {handleCepChange(e)}} />
                    <button className="buttonSearch" onClick={handleGetCep}>
                        <BiSearch size={40} color="black" />
                    </button>
                    {
                        hasEndereco  
                        ?
                        <div>
                            <b>Endereço:</b> {endereco.rua}, {endereco.bairro}, {endereco.cidade} - {endereco.estado}
                        </div>
                        : 
                        <div>
                            {mensagem}
                        </div>

                    }
                    
                </div>
            </div>
            <div>
                <input type="submit" value="Enviar" onClick= {(e) => {handleSubmit(e)}} />
            </div>
        </form>
    </div>)
}

export default Contato;