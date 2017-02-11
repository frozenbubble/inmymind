import { Component } from '@angular/core';
import { ZkitService } from './zkit.service'

declare var zkit_sdk: any;

@Component({
    selector: 'register-form',
    providers: [ZkitService],
    template: `
        <div>
            <h3>Sign up for In my mind</h3>

            <!-- Username field -->
            <input type="text" id="alias" placeholder="Username" (keyup)="usernameChanged($event)" />

            <div id="regIframe"></div>

            <a class="btn btn-info" (click)="register(username)">Register</a>
        </div>`
})
export class RegisterComponent {
    username: string = "";
    regIframe: any;

    constructor (private zkit: ZkitService) { }

    ngOnInit() {
        this.regIframe =  zkit_sdk.getRegistrationIframe(document.getElementById('regIframe'));
    }

    register (userId: string) {
        this.zkit.register(this.regIframe, userId);
    }

    usernameChanged (event) {
        this.username = event.target.value;
    }
}