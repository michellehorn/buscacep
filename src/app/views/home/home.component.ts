import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  constructor() { }

  loading = false;
  err = '';
  found = false;
  data = {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    unidade: '',
    ibge: '',
    gia: ''
  };

  ngOnInit() {
  }


  validaCep(cep) {
    if (cep.length < 9) {
      this.showErr('Informe o cep completo antes de pesquisar.');
      return false;
    } else {
      return true;
    }
  }

  async buscaCep(cep) {
    if (this.validaCep(cep)) {
      this.loading = true;
      await fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(response => {
          return response.json();
        })
        .then(obj => {
          if (obj.erro) {
            this.showErr('Cep inválido.');
            this.loading = false;
          } else {
            setTimeout(() => {
              this.loading = false;
              this.data = obj;
              this.found = true;
            }, 3000);
          }
        });
    }
  }


  showErr(msg) {
    this.err = msg;
    setTimeout(() => {
      this.err = '';
    }, 5000);
  }
}
