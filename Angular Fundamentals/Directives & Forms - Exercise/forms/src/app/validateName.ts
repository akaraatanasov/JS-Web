import { Injectable } from "@angular/core";

@Injectable()
export class DubCheck {
    private mails = ['pesho@abv.bg', 'gosho@abv.bg', 'ivan@abv.bg'];

    validateMail(userMail) {
        return this.mails.indexOf(userMail) === -1 ? false : true;
    }
}