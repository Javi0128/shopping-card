import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import * as uuid from 'uuid';
import Swal from 'sweetalert';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  formulario: FormGroup;

  id: string;
  name: FormControl;
  surname: FormControl;
  address: FormControl;
  email: FormControl;
  password: FormControl;

  constructor(  private modalCtrl: ModalController,
                private toastCtrl: ToastController,
                private cartService: CartService,
                private router: Router) {}

  ngOnInit() {

    this.id = uuid.v4().substr(1,7).toUpperCase();
    this.buildForm();

  }

  buildForm(): void{

    this.formulario = new FormGroup( {

      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [  Validators.email,
                                    Validators.required]),
      password: new FormControl('', [ Validators.required,
                                      Validators.minLength(8)]),
    });

    this.rellenaVariables();

  }

  rellenaVariables(){

    this.name       =   this.formulario.controls.name as FormControl;
    this.surname    =   this.formulario.controls.surname as FormControl;
    this.address    =   this.formulario.controls.address as FormControl;
    this.email      =   this.formulario.controls.email as FormControl;
    this.password   =   this.formulario.controls.password as FormControl;

  }


  async onSubmit(){

    if (this.formulario.valid) {
      const toast = await this.toastCtrl.create({
        color: 'dark',
        message: this.name.value + ' su número de pedido es ' + this.id,
        duration: 3000
      });


      Swal(
        'Good job!',
        'Your order is done!',
        'success'
        )

      setTimeout(() => {
        toast.present();

      }, 2000);


      this.cartService.resetCart();
      this.modalCtrl.dismiss();
      this.router.navigate(['/home']);

    }
  }

}
