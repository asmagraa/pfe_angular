import {FormGroup} from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const cotrol = formGroup.controls[controlName]; //variable qui va prendre le password
        const matchingControl = formGroup.controls[matchingControlName]; // un autre variable pour la confirmation

        if(matchingControl.errors && ! matchingControl.errors.mustMatch){ //si le confirmpassword a des erreurs ou n'est pas
        //compatible avec le password 
            return;
        }
//
        if(cotrol.value!== matchingControl.value){
            matchingControl.setErrors({ MustMatch: true});
        } else {
            matchingControl.setErrors(null) //si tous va bien donc on a null erreur (pas d'erreur)
        }

    }
}
//must match c'est une fonction qui permet de faire la comparaison entre le password et le confirm password