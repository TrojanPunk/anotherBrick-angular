import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller-cards',
  templateUrl: './seller-cards.component.html',
  styleUrls: ['./seller-cards.component.css']
})
export class SellerCardsComponent {
  @Input() image = "";
  @Input() title = "";
  @Input() subtitle = "";
}
