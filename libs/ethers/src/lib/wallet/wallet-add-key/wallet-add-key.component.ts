import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from "@angular/core";
import { KeyManagerService, Key, KeyManagerQuery } from "../../key-manager/+state";
import { WalletQuery } from "../+state";
import { Observable } from "rxjs";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

enum steps {
  PASSWORD,
  IMPORT,
  EXPORT,
  END
}
@Component({
  selector: 'wallet-add-key-tunnel',
  templateUrl: './wallet-add-key.component.html',
  styleUrls: ['./wallet-add-key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletAddKeyTunnelComponent implements OnInit {
  
  steps = steps; //retreive the enum defined above, so we can use it in html
  step = this.steps.PASSWORD;
  key: Key;
  loading$ = new Observable<boolean>();
  @ViewChild('downloadLink', {static: false}) downloadLink: ElementRef<HTMLAnchorElement>;

  constructor(
    private walletQuery: WalletQuery,
    private keyQuery: KeyManagerQuery,
    private KeyService: KeyManagerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loading$ = this.keyQuery.selectLoading();
  }

  async setPassword(password: string) {
    const { ensDomain } = this.walletQuery.getValue();
    const keyName = this.KeyService.getDefaultKeyName(ensDomain);
    this.key = await this.KeyService.createFromRandom(keyName, ensDomain, password);
    this.step = steps.EXPORT;

    // try to trigger an auto-download of the json file
    this.downloadLink.nativeElement.download = this.keyName;
    this.downloadLink.nativeElement.href = <string>this.jsonKeystore(false);
    this.downloadLink.nativeElement.click();
  }

  setKey(key: Key) {
    if (JSON.stringify(this.key) !== JSON.stringify(key)) { // object deep equal
      throw new Error(`You did not import the good file ! Please import the file named ${this.keyName}`);
    }
    this.KeyService.storeKey(key);
    delete this.key;
    this.step = steps.END;
  }

  /** create a name for the downloadable file */
  get keyName() {
    return `${this.key.ensDomain}_${this.key.name}.json`;
  }

  /**
  * create a downloadable data blob (json file) from this key
  * @param bypassSecurity `true` = return a SafeResourceUrl, `false` = return a string
  */
  jsonKeystore(bypassSecurity: boolean): SafeResourceUrl | string {
    const data = new Blob([JSON.stringify(this.key)], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(data);
    if (bypassSecurity) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url); // regular download link : bypass security to prevent angular from escaping our data
    }
    return url; // for auto-download we have to return a non-bypassed string
  }
}