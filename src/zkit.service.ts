import  { Utils } from './utils';

declare var zkit_sdk: any;

export class ZkitService {
    constructor () {
        zkit_sdk.setup("https://host-s9m5bg49sm.api.tresorit.io", "/tenant-vocvlgu3u4");
    }

    register(frame, alias) {
        var userIdResp;

        console.log('initialising user registration');
        // Step 1: reserve a unique user ID for the registration
        return Utils.callServer('init-user-reg', { alias: alias }, userIdResp => { 
            debugger;           
            // Step 2: register user through the sdk
            return frame.register(userIdResp.userId, userIdResp.regSessionId).then(succRegResp => {
                // Step 3: finish registration transaction
                // (and auto-approve user for demo purposes)
                Utils.callServer("finished-registration", {
                    userId: userIdResp.userId,
                    regValidationVerifier: succRegResp.RegValidationVerifier
                },  () => {
                    console.log('Registration successful');
                }, error => {
                    console.log(`error: ${error}`);
                });
            });
        }, error => {
            console.log('error:');
            console.log(error);
        });
    }
}