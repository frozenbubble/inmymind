import { Component } from '@angular/core';
import { RegisterComponent } from './register.component';


@Component({
    selector: 'onboarding-page',
    directives: [RegisterComponent],
    template: `
        <div class="text-center">
            <h3>Welcome to In my mind</h3>
        
            <p class="onboarding-text">
                To enable enable end to end encrypted cloud sync, create an account.
                You can also use In my mind offline for free and save you notes to files.
            </p>

            <register-form></register-form>
        </div>`
})
export class OnboardingComponent {

}