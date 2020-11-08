import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    validation_messages = {
        'Nombre': [
            { type: 'required', message: 'Debe introducir un Nombre' },
            { type: 'minlength', message: 'El nombre debe ser como mínimo de 3 letras' },
            { type: 'maxlength', message: 'EL nombre no debe superar las 30 letras' },
            { type: 'pattern', message: 'Nombre admite solo letras' }
        ],
        'Apellido': [
            { type: 'required', message: 'Debe introducir un Apellido.' },
            { type: 'minlength', message: 'El apellido debe ser como mínimo de 3 letras' },
            { type: 'maxlength', message: 'EL apellido no debe superar las 30 letras' },
            { type: 'pattern', message: 'Apellido admite solo letras' }
        ],
        'DNI': [
            { type: 'validDNI', message: 'DNI inválido. La letra no corresponde con los números' },
            { type: 'required', message: 'DNI es requerido' },
            { type: 'minlength', message: 'DNI debe tener 9 caracteres' },
            { type: 'maxlength', message: 'DNI debe tener 9 caracteres' },
            { type: 'pattern', message: 'DNI debe tener el patrón correspondiente' }
        ],
        'fecha_nac': [
            { type: 'required', message: 'Debe introducir una fecha' },
            { type: 'validaFecha', message: 'Fecha Nacimiento Menor de edad, DNI no requerido.' },
        ]
    };

    validations_form: FormGroup;



    constructor(
        public formBuilder: FormBuilder,
        private navCtrl: NavController


    ) { }

    ngOnInit() {

        this.validations_form = this.formBuilder.group({
            Nombre: new FormControl('', Validators.compose([
                Validators.maxLength(30),
                Validators.minLength(3),
                Validators.pattern('^[a-zA-Z]{1}[a-zA-Z]+$'),
                Validators.required
            ])),

            Apellido: new FormControl('', Validators.compose([
                Validators.maxLength(30),
                Validators.minLength(3),
                Validators.pattern('^[a-zA-Z]{1}[a-zA-Z]+$'),
                Validators.required
            ])),

            fecha_nac: new FormControl('', Validators.compose([
                this.validaFecha,
                Validators.required

            ])),
            DNI: new FormControl('', Validators.compose([
                this.validDNI,
                Validators.maxLength(9),
                Validators.minLength(9),
                Validators.pattern('[0-9]{8,8}[A-Za-z]'),
                Validators.required
            ]))
        });

    }

    validaFecha(fc: FormControl) {
        if (2020 - fc.value.to < 18) {
            return ({ validaFecha: true });
        } else {
            return null;
        }

    }

    validDNI(fc: FormControl) {
        var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
        var numeros = fc.value.substring(0, fc.value.length - 1);
        var numero = numeros % 23;
        var letraCorr = letras.charAt(numero);
        var letra = fc.value.substring(8, 9);
        if (letraCorr != letra) {
          return ({ validDNI: true });
        } else {
          return (null);
        }
      }


    /*Al pulsar el botón submit se llama a este método que recibe como parámetro todos los valores introducidos en el formulario.
    Para pasar estos valores a la siguiente página se crea un objeto de la clase NavigationExtras.
    Este objeto es un array asociativo donde definimos un campo queryParams, que a su vez es otro array asociativo.
    Dentro de queryParams creamos una pareja clave-valor para cada parámetro que queramos pasar a la otra página
    El valor asociado a 'user' es un objeto. Siempre que queramos pasar un objeto como parámetro tenemos que pasarlo a JSON.
    */

    onSubmit(values) {
        console.log(values);
        let navigationExtras: NavigationExtras = {
            queryParams: {
                user: JSON.stringify(values),
                numero: 3
            }
        };
        this.navCtrl.navigateForward('/user', navigationExtras);
    }

}//end_class